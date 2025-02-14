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
import { CAMPOS_METODO_ADQUISICION } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  almacenValidacion,
  caracteristicaValidacion,
  tipoAdquisicionValidacion,
} from "../../../../settings/validacionConfig";
import ItemInfoExtraAutocompletar from "../../../utils/ItemInfoExtraAutocompletar";
import { getEmpleados } from "../../../../services/seguridad";
import { getCuentas, getPeriodos } from "../../../../services/general";
import { mapArray } from "../../../../settings/utils";
import {
  compEmpleadoMappingRules,
  compPeriodoMappingRules,
} from "../../../../settings/mappingRulesConfig";
import { getTiposMovimiento } from "../../../../services/almacen";

const CatalogoTipoAdquisicionForm = () => {
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
    resolver: yupResolver(tipoAdquisicionValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [complemento, setComplemento] = useState({
    tipoAdquisicion: null,
  });

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Tipo de Adquisición");

  useEffect(() => {
    setCargando(true);
    Promise.all([handleGetRegistroCatalogo(filaSeleccionada[0])])
      .then(([tipoAdquisicion]) => {
        setComplemento({
          tipoAdquisicion: tipoAdquisicion,
        });
      })
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
    const { tipoAdquisicion } = complemento;
    if (tipoAdquisicion) {
      setValue(
        CAMPOS_METODO_ADQUISICION.ID_CONCEPTO_MOVIMIENTO,
        tipoAdquisicion.idtipoAdquisicion
      );
      setValue(CAMPOS_METODO_ADQUISICION.NOMBRE, tipoAdquisicion.nombre);
      setValue(
        CAMPOS_METODO_ADQUISICION.FECHA_CREACION,
        tipoAdquisicion.fechaCreacion
      );
      setValue(
        CAMPOS_METODO_ADQUISICION.FECHA_MODIFICACION,
        tipoAdquisicion.fechaModificacion
      );
      setValue(CAMPOS_METODO_ADQUISICION.ACTIVO, tipoAdquisicion.activo);
    }
    // eslint-disable-next-line
  }, [complemento.tipoAdquisicion]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada[0], data)
      .then(() => {
        const mensaje = esModificacion
          ? "Tipo de adquisición modificado correctamente"
          : "Tipo de adquisición guardado correctamente";
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
        id={CAMPOS_METODO_ADQUISICION.ID_METODO_ADQUISICION}
        name={CAMPOS_METODO_ADQUISICION.ID_METODO_ADQUISICION}
        label="Id Tipo Adquisición"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_METODO_ADQUISICION.NOMBRE}
        name={CAMPOS_METODO_ADQUISICION.NOMBRE}
        label="Nombre"
        control={control}
        error={errors[CAMPOS_METODO_ADQUISICION.NOMBRE]}
        helperText={errors[CAMPOS_METODO_ADQUISICION.NOMBRE]?.message}
        disabled={esVisualizacion}
        required
      />

      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_METODO_ADQUISICION.FECHA_CREACION}
              name={CAMPOS_METODO_ADQUISICION.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_METODO_ADQUISICION.FECHA_MODIFICACION}
              name={CAMPOS_METODO_ADQUISICION.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_METODO_ADQUISICION.ACTIVO}
            name={CAMPOS_METODO_ADQUISICION.ACTIVO}
            control={control}
            label="Registro Activo"
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoTipoAdquisicionForm;
