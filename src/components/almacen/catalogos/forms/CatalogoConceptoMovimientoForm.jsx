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
import { CAMPOS_CONCEPTO_MOVIMIENTO } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  almacenValidacion,
  caracteristicaValidacion,
  conceptoMovimientoValidacion,
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

const CatalogoConceptoMovimientoForm = () => {
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
    resolver: yupResolver(conceptoMovimientoValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [complemento, setComplemento] = useState({
    tiposMovimiento: [],
    conceptoMovimiento: null,
  });

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Concepto Movimiento");

  useEffect(() => {
    setCargando(true);
    Promise.all([
      getTiposMovimiento(),
      handleGetRegistroCatalogo(filaSeleccionada[0]),
    ])
      .then(([tiposMovimiento, conceptoMovimiento]) => {
        setComplemento({
          tiposMovimiento: tiposMovimiento,
          conceptoMovimiento: conceptoMovimiento,
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
    const { conceptoMovimiento, tiposMovimiento } = complemento;
    if (conceptoMovimiento) {
      console.log(conceptoMovimiento);
      setValue(
        CAMPOS_CONCEPTO_MOVIMIENTO.ID_CONCEPTO_MOVIMIENTO,
        conceptoMovimiento.idConceptoMovimiento
      );
      setValue(CAMPOS_CONCEPTO_MOVIMIENTO.NOMBRE, conceptoMovimiento.nombre);
      setValue(
        CAMPOS_CONCEPTO_MOVIMIENTO.DESCRIPCION,
        conceptoMovimiento.descripcion
      );
      setValue(
        CAMPOS_CONCEPTO_MOVIMIENTO.ID_TIPO_MOVIMIENTO,
        tiposMovimiento.find(
          (e) => e.id === conceptoMovimiento.idTipoMovimiento
        )
      );
      setValue(
        CAMPOS_CONCEPTO_MOVIMIENTO.FECHA_CREACION,
        conceptoMovimiento.fechaCreacion
      );
      setValue(
        CAMPOS_CONCEPTO_MOVIMIENTO.FECHA_MODIFICACION,
        conceptoMovimiento.fechaModificacion
      );
      setValue(CAMPOS_CONCEPTO_MOVIMIENTO.ACTIVO, conceptoMovimiento.activo);
    }
    // eslint-disable-next-line
  }, [complemento.conceptoMovimiento]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada[0], data)
      .then(() => {
        const mensaje = esModificacion
          ? "Concepto Movimiento modificado correctamente"
          : "Concepto Movimiento guardado correctamente";
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
        id={CAMPOS_CONCEPTO_MOVIMIENTO.ID_CONCEPTO_MOVIMIENTO}
        name={CAMPOS_CONCEPTO_MOVIMIENTO.ID_CONCEPTO_MOVIMIENTO}
        label="Id Concepto Movimiento"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_CONCEPTO_MOVIMIENTO.NOMBRE}
        name={CAMPOS_CONCEPTO_MOVIMIENTO.NOMBRE}
        label="Nombre"
        control={control}
        error={errors[CAMPOS_CONCEPTO_MOVIMIENTO.NOMBRE]}
        helperText={errors[CAMPOS_CONCEPTO_MOVIMIENTO.NOMBRE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_CONCEPTO_MOVIMIENTO.DESCRIPCION}
        name={CAMPOS_CONCEPTO_MOVIMIENTO.DESCRIPCION}
        label="Descripción"
        control={control}
        multiline
        rows={4}
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={CAMPOS_CONCEPTO_MOVIMIENTO.ID_TIPO_MOVIMIENTO}
        name={CAMPOS_CONCEPTO_MOVIMIENTO.ID_TIPO_MOVIMIENTO}
        label="Tipo de Movimiento"
        control={control}
        options={complemento.tiposMovimiento}
        error={errors[CAMPOS_CONCEPTO_MOVIMIENTO.ID_TIPO_MOVIMIENTO]}
        helperText={
          errors[CAMPOS_CONCEPTO_MOVIMIENTO.ID_TIPO_MOVIMIENTO]?.message
        }
        disabled={esVisualizacion}
        required
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_CONCEPTO_MOVIMIENTO.FECHA_CREACION}
              name={CAMPOS_CONCEPTO_MOVIMIENTO.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_CONCEPTO_MOVIMIENTO.FECHA_MODIFICACION}
              name={CAMPOS_CONCEPTO_MOVIMIENTO.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_CONCEPTO_MOVIMIENTO.ACTIVO}
            name={CAMPOS_CONCEPTO_MOVIMIENTO.ACTIVO}
            control={control}
            label="Registro Activo"
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoConceptoMovimientoForm;
