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
import { ubicacionValidacion } from "../../../../settings/validacionConfig";
import { CAMPOS_UBICACION } from "../../../../settings/formConfig";

const CatalogoUbicacionForm = () => {
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
    resolver: yupResolver(ubicacionValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [ubicacion, setUbicacion] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Ubicación");

  console.log("SE CARGo")

  useEffect(() => {
    console.log("SE EJECUTO UBICACION");
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((data) => {
        setUbicacion(data);
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
    if (ubicacion) {
      const {
        idUbicacion,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = ubicacion;

      setValue(CAMPOS_UBICACION.ID_UBICACION, idUbicacion);
      setValue(CAMPOS_UBICACION.DESCRIPCION, descripcion);
      setValue(CAMPOS_UBICACION.ACTIVO, activo);
      setValue(CAMPOS_UBICACION.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_UBICACION.FECHA_MODIFICACION, fechaModificacion);
    }

    // eslint-disable-next-line
  }, [ubicacion]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? `Ubicación modificado correctamente`
          : "Ubicación guardado correctamente";
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
      disabledConfirmar={esVisualizacion}
      onClickConfirmar={onSubmit}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar={esVisualizacion ? "Cerrar" : "Cancelar"}
    >
      <FormCampoEntrada
        id={CAMPOS_UBICACION.ID_UBICACION}
        name={CAMPOS_UBICACION.ID_UBICACION}
        label="Id Ubicación"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_UBICACION.DESCRIPCION}
        name={CAMPOS_UBICACION.DESCRIPCION}
        label="Descripción"
        control={control}
        required
        disabled={esVisualizacion}
        error={errors[CAMPOS_UBICACION.DESCRIPCION]}
        helperText={errors[CAMPOS_UBICACION.DESCRIPCION]?.message}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_UBICACION.FECHA_CREACION}
              name={CAMPOS_UBICACION.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_UBICACION.FECHA_MODIFICACION}
              name={CAMPOS_UBICACION.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_UBICACION.ACTIVO}
            name={CAMPOS_UBICACION.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoUbicacionForm;
