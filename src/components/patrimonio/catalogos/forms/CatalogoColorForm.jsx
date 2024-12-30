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
import FormCampoColor from "../../../utils/FormCampoColor";
import { CAMPOS_COLOR } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { colorValidacion } from "../../../../settings/validacionConfig";
const CatalogoClaveVehicularForm = () => {
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
    resolver: yupResolver(colorValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [color, setColor] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Color");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((color) => {
        setColor(color);
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
    if (color) {
      const {
        idColor,
        nombre,
        codigoRGB,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = color;

      setValue(CAMPOS_COLOR.ID_COLOR, idColor);
      setValue(CAMPOS_COLOR.NOMBRE, nombre);
      setValue(CAMPOS_COLOR.CODIGO_RGB, codigoRGB);
      setValue(CAMPOS_COLOR.ACTIVO, activo);
      setValue(CAMPOS_COLOR.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_COLOR.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [color]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Color modificado correctamente"
          : "Color guardado correctamente";
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
        id={CAMPOS_COLOR.ID_COLOR}
        name={CAMPOS_COLOR.ID_COLOR}
        label="Id Color"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_COLOR.NOMBRE}
        name={CAMPOS_COLOR.NOMBRE}
        label="Nombre"
        control={control}
        error={errors[CAMPOS_COLOR.NOMBRE]}
        helperText={errors[CAMPOS_COLOR.NOMBRE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoColor
        id={CAMPOS_COLOR.CODIGO_RGB}
        name={CAMPOS_COLOR.CODIGO_RGB}
        label="Código RGB"
        control={control}
        error={errors[CAMPOS_COLOR.CODIGO_RGB]}
        helperText={errors[CAMPOS_COLOR.CODIGO_RGB]?.message}
        disabled={esVisualizacion}
        required
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_COLOR.FECHA_CREACION}
              name={CAMPOS_COLOR.FECHA_CREACION}
              label="Fecha Creacion"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_COLOR.FECHA_MODIFICACION}
              name={CAMPOS_COLOR.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_COLOR.ACTIVO}
            name={CAMPOS_COLOR.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoClaveVehicularForm;
