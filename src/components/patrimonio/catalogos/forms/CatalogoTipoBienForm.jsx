import { yupResolver } from "@hookform/resolvers/yup";
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
import { CAMPOS_TIPO_BIEN } from "../../../../settings/formConfig";
import { tipoAdquisicionValidacion } from "../../../../settings/validacionConfig";
const CatalogoTipoBienForm = () => {
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
  const [tipoBien, setTipoBien] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Tipo de Bien");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((data) => {
        setTipoBien(data);
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
    if (tipoBien) {
      const { idTipoBien, nombre, activo, fechaCreacion, fechaModificacion } =
        tipoBien;

      setValue(CAMPOS_TIPO_BIEN.ID_TIPO_BIEN, idTipoBien);
      setValue(CAMPOS_TIPO_BIEN.NOMBRE, nombre);
      setValue(CAMPOS_TIPO_BIEN.ACTIVO, activo);
      setValue(CAMPOS_TIPO_BIEN.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_TIPO_BIEN.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [tipoBien]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? `Tipo de bien modificado correctamente`
          : "Tipo de bien guardado correctamente";
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
        id={CAMPOS_TIPO_BIEN.ID_TIPO_BIEN}
        name={CAMPOS_TIPO_BIEN.ID_TIPO_BIEN}
        label="Id Tipo Bien"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />

      <FormCampoEntrada
        id={CAMPOS_TIPO_BIEN.NOMBRE}
        name={CAMPOS_TIPO_BIEN.NOMBRE}
        label="Nombre"
        control={control}
        required
        disabled={esVisualizacion}
        error={errors[CAMPOS_TIPO_BIEN.NOMBRE]}
        helperText={errors[CAMPOS_TIPO_BIEN.NOMBRE]?.message}
      />

      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_TIPO_BIEN.FECHA_CREACION}
              name={CAMPOS_TIPO_BIEN.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_TIPO_BIEN.FECHA_MODIFICACION}
              name={CAMPOS_TIPO_BIEN.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_TIPO_BIEN.ACTIVO}
            name={CAMPOS_TIPO_BIEN.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoTipoBienForm;
