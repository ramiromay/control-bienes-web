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
import { CAMPOS_TIPO_INMUEBLE } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { tipoInmuebleValidacion } from "../../../../settings/validacionConfig";

const CatalogoTipoInmuebleForm = () => {
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
    resolver: yupResolver(tipoInmuebleValidacion)
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [tipoInmueble, setTipoInmueble] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Tipo Inmueble");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((data) => {
        setTipoInmueble(data);
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
    if (tipoInmueble) {
      const {
        idTipoInmueble,
        nombre,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = tipoInmueble;

      setValue(CAMPOS_TIPO_INMUEBLE.ID_TIPO_INMUEBLE, idTipoInmueble);
      setValue(CAMPOS_TIPO_INMUEBLE.NOMBRE, nombre);
      setValue(CAMPOS_TIPO_INMUEBLE.DESCRIPCION, descripcion);
      setValue(CAMPOS_TIPO_INMUEBLE.ACTIVO, activo);
      setValue(CAMPOS_TIPO_INMUEBLE.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_TIPO_INMUEBLE.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [tipoInmueble]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Tipo inmueble modificado correctamente"
          : "Tipo inmueble Vehicular guardado correctamente";
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
      disabledCofirmar={esVisualizacion}
      onClickConfirmar={onSubmit}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar={esVisualizacion ? "Cerrar" : "Cancelar"}
    >
      <FormCampoEntrada
        id={CAMPOS_TIPO_INMUEBLE.ID_TIPO_INMUEBLE}
        name={CAMPOS_TIPO_INMUEBLE.ID_TIPO_INMUEBLE}
        label="Id Tipo Inmueble"
        control={control}
        defaultValue="Automatico"
        required={true}
        disabled={true}
      />
      <FormCampoEntrada
        id={CAMPOS_TIPO_INMUEBLE.NOMBRE}
        name={CAMPOS_TIPO_INMUEBLE.NOMBRE}
        label="Nombre"
        control={control}
        required={true}
        disabled={esVisualizacion}
        error={errors[CAMPOS_TIPO_INMUEBLE.NOMBRE]}
        helperText={errors[CAMPOS_TIPO_INMUEBLE.NOMBRE]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_TIPO_INMUEBLE.DESCRIPCION}
        name={CAMPOS_TIPO_INMUEBLE.DESCRIPCION}
        label="Descripción"
        control={control}
        required={true}
        disabled={esVisualizacion}
        error={errors[CAMPOS_TIPO_INMUEBLE.DESCRIPCION]}
        helperText={errors[CAMPOS_TIPO_INMUEBLE.DESCRIPCION]?.message}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_TIPO_INMUEBLE.FECHA_CREACION}
              name={CAMPOS_TIPO_INMUEBLE.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_TIPO_INMUEBLE.FECHA_MODIFICACION}
              name={CAMPOS_TIPO_INMUEBLE.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_TIPO_INMUEBLE.ACTIVO}
            name={CAMPOS_TIPO_INMUEBLE.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoTipoInmuebleForm;
