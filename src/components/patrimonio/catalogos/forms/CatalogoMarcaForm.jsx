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
import { CAMPOS_MARCA } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { marcaValidacion } from "../../../../settings/validacionConfig";

const CatalogoMarcaForm = () => {
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
    resolver: yupResolver(marcaValidacion)
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [marca, setMarca] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Marca");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((claveVehicular) => {
        setMarca(claveVehicular);
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
    if (marca) {
      const {
        idMarca,
        nombre,
        observaciones,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = marca;

      setValue(CAMPOS_MARCA.ID_MARCA, idMarca);
      setValue(CAMPOS_MARCA.NOMBRE, nombre);
      setValue(CAMPOS_MARCA.OBSERVACIONES, observaciones);
      setValue(CAMPOS_MARCA.ACTIVO, activo);
      setValue(CAMPOS_MARCA.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_MARCA.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [marca]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Marca modificada correctamente"
          : "Marca guardada correctamente";
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
        id={CAMPOS_MARCA.ID_MARCA}
        name={CAMPOS_MARCA.ID_MARCA}
        label="Id Marca"
        control={control}
        defaultValue="Automatico"
        required={true}
        disabled={true}
      />
      <FormCampoEntrada
        id={CAMPOS_MARCA.NOMBRE}
        name={CAMPOS_MARCA.NOMBRE}
        label="Nombre"
        control={control}
        error={errors[CAMPOS_MARCA.NOMBRE]}
        helperText={errors[CAMPOS_MARCA.NOMBRE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_MARCA.OBSERVACIONES}
        name={CAMPOS_MARCA.OBSERVACIONES}
        label="Observaciones"
        control={control}
        disabled={esVisualizacion}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_MARCA.FECHA_CREACION}
              name={CAMPOS_MARCA.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_MARCA.FECHA_MODIFICACION}
              name={CAMPOS_MARCA.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            control={control}
            name={CAMPOS_MARCA.ACTIVO}
            label="Registro Activo"
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoMarcaForm;
