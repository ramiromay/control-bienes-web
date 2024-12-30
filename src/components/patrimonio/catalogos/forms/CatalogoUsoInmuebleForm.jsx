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
import { tipoAdquisicionValidacion } from "../../../../settings/validacionConfig";
import { CAMPOS_USO_INMUEBLE } from "../../../../settings/formConfig";

const CatalogoUsoInmuebleForm = () => {
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
    resolver: yupResolver(tipoAdquisicionValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [usoInmueble, setUsoInmueble] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Uso Inmueble");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((data) => {
        setUsoInmueble(data);
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
    if (usoInmueble) {
      const {
        idUsoInmueble,
        nombre,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = usoInmueble;

      setValue(CAMPOS_USO_INMUEBLE.ID_USO_INMUEBLE, idUsoInmueble);
      setValue(CAMPOS_USO_INMUEBLE.NOMBRE, nombre);
      setValue(CAMPOS_USO_INMUEBLE.ACTIVO, activo);
      setValue(CAMPOS_USO_INMUEBLE.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_USO_INMUEBLE.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [usoInmueble]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? `Uso inmueble modificado correctamente`
          : "Uso inmueble guardado correctamente";
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
        id={CAMPOS_USO_INMUEBLE.ID_USO_INMUEBLE}
        name={CAMPOS_USO_INMUEBLE.ID_USO_INMUEBLE}
        label="Id Uso Inmueble"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_USO_INMUEBLE.NOMBRE}
        name={CAMPOS_USO_INMUEBLE.NOMBRE}
        label="Nombre"
        control={control}
        required
        disabled={esVisualizacion}
        error={errors[CAMPOS_USO_INMUEBLE.NOMBRE]}
        helperText={errors[CAMPOS_USO_INMUEBLE.NOMBRE]?.message}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_USO_INMUEBLE.FECHA_CREACION}
              name={CAMPOS_USO_INMUEBLE.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_USO_INMUEBLE.FECHA_MODIFICACION}
              name={CAMPOS_USO_INMUEBLE.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_USO_INMUEBLE.ACTIVO}
            name={CAMPOS_USO_INMUEBLE.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoUsoInmuebleForm;
