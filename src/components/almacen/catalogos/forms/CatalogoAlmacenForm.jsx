import DialogoEmergente from "../../../utils/DialogoEmergente";
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import { useForm } from "react-hook-form";
import { useCatalogo } from "../../../../context/CatalogoContext";
import FormCampoEntrada from "../../../utils/FormCampoEntrada";
import useTabla from "@context/Tabla/useTabla";
import { useEffect, useState } from "react";
import { useSnackbar } from "@context/SnackbarContext";
import {
  getFamilias,
  getMetodoCosteo,
  getSubfamilias,
} from "../../../../services/catalogo";
import { Checkbox, MenuItem, Stack, Typography } from "@mui/material";
import FormCheck from "../../../utils/FormCheck";
import { useSistema } from "../../../../context/SistemaContext";
import { CAMPOS_ALMACEN } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  almacenValidacion,
  caracteristicaValidacion,
} from "../../../../settings/validacionConfig";
import ItemInfoExtraAutocompletar from "../../../utils/ItemInfoExtraAutocompletar";
import { getEmpleados } from "../../../../services/seguridad";
import { getCuentas, getPeriodos } from "../../../../services/general";
import { mapArray } from "../../../../settings/utils";
import {
  compEmpleadoMappingRules,
  compPeriodoMappingRules,
} from "../../../../settings/mappingRulesConfig";

const CatalogoAlmacenForm = () => {
  const { handleError } = useSistema();
  const {
    dialogo,
    handleEnviar,
    handleCerrarDialogo,
    getTituloDialogo,
    esDialogoModificacion,
    esDialogoVisualizacion,
    handleGetRegistroCatalogo,
  } = useCatalogo();
  const { filaSeleccionada } = useTabla();
  const { showSnackbar } = useSnackbar();
  const { control, formState, handleSubmit, setValue } = useForm({
    resolver: yupResolver(almacenValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [complemento, setComplemento] = useState({
    periodos: [],
    empleados: [],
    metodosCosteo: [],
    cuentas: [],
    almacen: null,
  });

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Almacen");

  useEffect(() => {
    setCargando(true);
    Promise.all([
      getPeriodos(),
      getEmpleados(),
      getMetodoCosteo(),
      getCuentas(),
      handleGetRegistroCatalogo(filaSeleccionada[0]),
    ])
      .then(
        ([periodosData, empleadosData, metodosCosteo, cuentas, almacen]) => {
          const empleados = mapArray(empleadosData, compEmpleadoMappingRules);
          console.log(periodosData);
          setComplemento({
            almacen: almacen,
            periodos: periodosData,
            empleados: empleados,
            metodosCosteo: metodosCosteo,
            cuentas: cuentas,
          });
        }
      )
      .catch((error) => {
        handleCerrarDialogo();
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { almacen, cuentas, empleados, metodosCosteo, periodos } =
      complemento;
    if (almacen) {
      setValue(CAMPOS_ALMACEN.ID_ALMACEN, almacen.idAlmacen);
      setValue(
        CAMPOS_ALMACEN.ID_PERIODO,
        periodos.find((e) => e.id === almacen.idPeriodo)
      );
      setValue(CAMPOS_ALMACEN.NOMBRE, almacen.nombre);
      setValue(CAMPOS_ALMACEN.DIRECCION, almacen.direccion);
      setValue(CAMPOS_ALMACEN.HORARIO, almacen.horario);
      setValue(
        CAMPOS_ALMACEN.ID_EMPLEADO,
        empleados.find((e) => e.id === almacen.idEmpleado)
      );
      setValue(
        CAMPOS_ALMACEN.ID_CUENTA,
        cuentas.find((e) => e.id === almacen.idCuenta)
      );
      setValue(
        CAMPOS_ALMACEN.ID_METODO_COSTEO,
        metodosCosteo.find((e) => e.id === almacen.idMetodoCosteo)
      );
      setValue(CAMPOS_ALMACEN.FOLIO_ENTRADA, almacen.folioEntrada);
      setValue(CAMPOS_ALMACEN.FOLIO_SALIDA, almacen.folioSalida);
      setValue(CAMPOS_ALMACEN.FECHA_CREACION, almacen.fechaCreacion);
      setValue(CAMPOS_ALMACEN.FECHA_MODIFICACION, almacen.fechaModificacion);
      setValue(CAMPOS_ALMACEN.ACTIVO, almacen.activo);
    }
    // eslint-disable-next-line
  }, [complemento.almacen]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada[0], data)
      .then(() => {
        const mensaje = esModificacion
          ? "Almacen modificado correctamente"
          : "Almacen guardado correctamente";
        handleCerrarDialogo();
        showSnackbar(mensaje, "success");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
  });

  return (
    <DialogoEmergente
      titulo={tituloDialogo}
      cargando={cargando}
      abierto={dialogo.abierto}
      onClickConfirmar={onSubmit}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar={esVisualizacion ? "Cerrar" : "Cancelar"}
      disabledConfirmar={esVisualizacion}
    >
      <FormCampoEntrada
        id={CAMPOS_ALMACEN.ID_ALMACEN}
        name={CAMPOS_ALMACEN.ID_ALMACEN}
        label="Id Almacen"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoAutocompletar
        id={CAMPOS_ALMACEN.ID_PERIODO}
        name={CAMPOS_ALMACEN.ID_PERIODO}
        label="Periodo"
        control={control}
        options={complemento.periodos}
        getOptionLabel={(option) =>
          `${option.id}. ${option.fechaInicio} - ${option.fechaFinal}`
        }
        isOptionEqualToValue={(option, value) =>
          option.id === value.id ||
          option.fechaInicio === value.fechaInicio ||
          option.fechaFinal === value.fechaFinal
        }
        error={errors[CAMPOS_ALMACEN.ID_PERIODO]}
        helperText={errors[CAMPOS_ALMACEN.ID_PERIODO]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_ALMACEN.NOMBRE}
        name={CAMPOS_ALMACEN.NOMBRE}
        label="Nombre del Almacen"
        control={control}
        error={errors[CAMPOS_ALMACEN.NOMBRE]}
        helperText={errors[CAMPOS_ALMACEN.NOMBRE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_ALMACEN.DIRECCION}
        name={CAMPOS_ALMACEN.DIRECCION}
        label="Dirección"
        control={control}
        multiline
        rows={4}
        error={errors[CAMPOS_ALMACEN.DIRECCION]}
        helperText={errors[CAMPOS_ALMACEN.DIRECCION]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={CAMPOS_ALMACEN.HORARIO}
        name={CAMPOS_ALMACEN.HORARIO}
        label="Horario"
        multiline
        rows={4}
        control={control}
        error={errors[CAMPOS_ALMACEN.HORARIO]}
        helperText={errors[CAMPOS_ALMACEN.HORARIO]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={CAMPOS_ALMACEN.ID_EMPLEADO}
        name={CAMPOS_ALMACEN.ID_EMPLEADO}
        label="Responsable"
        control={control}
        options={complemento.empleados}
        renderOption={ItemInfoExtraAutocompletar}
        getOptionLabel={(option) => `${option.id} - ${option.name}`}
        isOptionEqualToValue={(option, value) =>
          option.id === value.id ||
          option.name === value.name ||
          option.infoExtra === value.infoExtra
        }
        error={errors[CAMPOS_ALMACEN.ID_EMPLEADO]}
        helperText={errors[CAMPOS_ALMACEN.ID_EMPLEADO]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={CAMPOS_ALMACEN.ID_CUENTA}
        name={CAMPOS_ALMACEN.ID_CUENTA}
        label="Cuenta"
        control={control}
        options={complemento.cuentas}
        getOptionLabel={(option) => `${option.infoExtra} ${option.name}`}
        isOptionEqualToValue={(option, value) =>
          option.name === value.name || option.infoExtra === value.infoExtra
        }
        error={errors[CAMPOS_ALMACEN.ID_CUENTA]}
        helperText={errors[CAMPOS_ALMACEN.ID_CUENTA]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={CAMPOS_ALMACEN.ID_METODO_COSTEO}
        name={CAMPOS_ALMACEN.ID_METODO_COSTEO}
        label="Metodos de Costeo"
        renderOption={ItemInfoExtraAutocompletar}
        getOptionLabel={(option) => `${option.id} - ${option.name}`}
        isOptionEqualToValue={(option, value) =>
          option.id === value.id ||
          option.name === value.name ||
          option.infoExtra === value.infoExtra
        }
        control={control}
        options={complemento.metodosCosteo}
        error={errors[CAMPOS_ALMACEN.ID_METODO_COSTEO]}
        helperText={errors[CAMPOS_ALMACEN.ID_METODO_COSTEO]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_ALMACEN.FOLIO_ENTRADA}
        name={CAMPOS_ALMACEN.FOLIO_ENTRADA}
        label="Folio de Entrada"
        control={control}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={CAMPOS_ALMACEN.FOLIO_SALIDA}
        name={CAMPOS_ALMACEN.FOLIO_SALIDA}
        label="Folio de Salida"
        control={control}
        disabled={esVisualizacion}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_ALMACEN.FECHA_CREACION}
              name={CAMPOS_ALMACEN.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_ALMACEN.FECHA_MODIFICACION}
              name={CAMPOS_ALMACEN.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_ALMACEN.ACTIVO}
            name={CAMPOS_ALMACEN.ACTIVO}
            control={control}
            label="Registro Activo"
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoAlmacenForm;
