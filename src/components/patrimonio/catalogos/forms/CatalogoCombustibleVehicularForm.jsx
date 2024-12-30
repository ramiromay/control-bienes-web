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
import { CAMPOS_COMBUSTIBLE } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { combustibleValidacion } from "../../../../settings/validacionConfig";

const CatalogoCombustibleVehicularForm = () => {
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
    resolver: yupResolver(combustibleValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [combustibleVehicular, setCombustibleVehicular] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Combustible Vehicular");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((claveVehicular) => {
        setCombustibleVehicular(claveVehicular);
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
    if (combustibleVehicular) {
      const {
        idCombustibleVehicular,
        nombre,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = combustibleVehicular;

      setValue(CAMPOS_COMBUSTIBLE.ID_COMBUSTIBLE_VEHICULAR, idCombustibleVehicular);
      setValue(CAMPOS_COMBUSTIBLE.NOMBRE, nombre);
      setValue(CAMPOS_COMBUSTIBLE.DESCRIPCION, descripcion);
      setValue(CAMPOS_COMBUSTIBLE.ACTIVO, activo);
      setValue(CAMPOS_COMBUSTIBLE.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_COMBUSTIBLE.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [combustibleVehicular]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Clase vehicular modificado correctamente"
          : "Clase vehicular guardado correctamente";
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
        id={CAMPOS_COMBUSTIBLE.ID_COMBUSTIBLE}
        name={CAMPOS_COMBUSTIBLE.ID_COMBUSTIBLE}
        label="Id Combustible Vehicular"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_COMBUSTIBLE.NOMBRE}
        name={CAMPOS_COMBUSTIBLE.NOMBRE}
        label="Nombre"
        control={control}
        error={errors[CAMPOS_COMBUSTIBLE.NOMBRE]}
        helperText={errors[CAMPOS_COMBUSTIBLE.NOMBRE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_COMBUSTIBLE.DESCRIPCION}
        name={CAMPOS_COMBUSTIBLE.DESCRIPCION}
        label="Descripción"
        control={control}
        error={errors[CAMPOS_COMBUSTIBLE.DESCRIPCION]}
        helperText={errors[CAMPOS_COMBUSTIBLE.DESCRIPCION]?.message}
        disabled={esVisualizacion}
        required
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_COMBUSTIBLE.FECHA_CREACION}
              name={CAMPOS_COMBUSTIBLE.FECHA_CREACION}
              label="Fecha Creacion"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_COMBUSTIBLE.FECHA_MODIFICACION}
              name={CAMPOS_COMBUSTIBLE.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_COMBUSTIBLE.ACTIVO}
            name={CAMPOS_COMBUSTIBLE.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoCombustibleVehicularForm;
