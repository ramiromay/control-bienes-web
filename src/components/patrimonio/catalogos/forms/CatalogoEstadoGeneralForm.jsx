import DialogoEmergente from "../../../utils/DialogoEmergente";
import { useForm } from "react-hook-form";
import { useCatalogo } from "../../../../context/CatalogoContext";
import FormCampoEntrada from "../../../utils/FormCampoEntrada";
import useTabla from "@context/Tabla/useTabla";
import { useEffect, useState } from "react";
import FormCheck from "../../../utils/FormCheck";
import { Stack } from "@mui/material";
import { useSistema } from "../../../../context/SistemaContext";
import { useSnackbar } from "@context/SnackbarContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { CAMPOS_ESTADO_GENERAL } from "../../../../settings/formConfig";
import { estadoGeneralValidacion } from "../../../../settings/validacionConfig";

const CatalogoEstadoGeneralForm = () => {
  const {
    dialogo,
    handleEnviar,
    handleGetRegistroCatalogo,
    handleCerrarDialogo,
    getTituloDialogo,
    esDialogoModificacion,
    esDialogoVisualizacion,
  } = useCatalogo();
  const { filaSeleccionada } = useTabla();
  const { showSnackbar } = useSnackbar();
  const { handleError } = useSistema();
  const { control, formState, handleSubmit, setValue } = useForm({
    resolver: yupResolver(estadoGeneralValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [claveVehicular, setClaveVehicular] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Estado General");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((claveVehicular) => {
        setClaveVehicular(claveVehicular);
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
    if (claveVehicular) {
      const {
        idEstadoGeneral,
        nombre,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = claveVehicular;

      setValue(CAMPOS_ESTADO_GENERAL.ID_ESTADO_GENERAL, idEstadoGeneral);
      setValue(CAMPOS_ESTADO_GENERAL.NOMBRE, nombre);
      setValue(CAMPOS_ESTADO_GENERAL.ACTIVO, activo);
      setValue(CAMPOS_ESTADO_GENERAL.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_ESTADO_GENERAL.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [claveVehicular]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Estado general modificado correctamente"
          : "Estado general guardado correctamente";
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
      cargando={cargando.activo}
      abierto={dialogo.abierto}
      disabledConfirmar={esVisualizacion}
      onClickConfirmar={onSubmit}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar={esVisualizacion ? "Cerrar" : "Cancelar"}
    >
      <FormCampoEntrada
        id={CAMPOS_ESTADO_GENERAL.ID_ESTADO_GENERAL}
        name={CAMPOS_ESTADO_GENERAL.ID_ESTADO_GENERAL}
        label="Id Estado General"
        control={control}
        defaultValue="Automatico"
        disabled
        required
      />
      <FormCampoEntrada
        id={CAMPOS_ESTADO_GENERAL.NOMBRE}
        name={CAMPOS_ESTADO_GENERAL.NOMBRE}
        label="Nombre"
        control={control}
        error={errors[CAMPOS_ESTADO_GENERAL.NOMBRE]}
        helperText={errors[CAMPOS_ESTADO_GENERAL.NOMBRE]?.message}
        disabled={esVisualizacion}
        required
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_ESTADO_GENERAL.FECHA_CREACION}
              name={CAMPOS_ESTADO_GENERAL.FECHA_CREACION}
              label="Fecha Creacion"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_ESTADO_GENERAL.FECHA_MODIFICACION}
              name={CAMPOS_ESTADO_GENERAL.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_ESTADO_GENERAL.ACTIVO}
            name={CAMPOS_ESTADO_GENERAL.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoEstadoGeneralForm;
