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
import { CAMPOS_CLAVE_VEHICULAR } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { claveVehicularValidacion } from "../../../../settings/validacionConfig";

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
    resolver: yupResolver(claveVehicularValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [claveVehicular, setClaveVehicular] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Clave Vehicular");

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
        idClaseVehicular,
        nombre,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = claveVehicular;

      setValue(CAMPOS_CLAVE_VEHICULAR.ID_CLASE_VEHICULAR, idClaseVehicular);
      setValue(CAMPOS_CLAVE_VEHICULAR.NOMBRE, nombre);
      setValue(CAMPOS_CLAVE_VEHICULAR.DESCRIPCION, descripcion);
      setValue(CAMPOS_CLAVE_VEHICULAR.ACTIVO, activo);
      setValue(CAMPOS_CLAVE_VEHICULAR.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_CLAVE_VEHICULAR.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [claveVehicular]);

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
        id={CAMPOS_CLAVE_VEHICULAR.ID_CLAVE_VEHICULAR}
        name={CAMPOS_CLAVE_VEHICULAR.ID_CLAVE_VEHICULAR}
        label="Id Clave Vehicular"
        control={control}
        defaultValue="Automatico"
        disabled
        required
      />
      <FormCampoEntrada
        id={CAMPOS_CLAVE_VEHICULAR.NOMBRE}
        name={CAMPOS_CLAVE_VEHICULAR.NOMBRE}
        label="Nombre"
        control={control}
        error={errors[CAMPOS_CLAVE_VEHICULAR.NOMBRE]}
        helperText={errors[CAMPOS_CLAVE_VEHICULAR.NOMBRE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_CLAVE_VEHICULAR.DESCRIPCION}
        name={CAMPOS_CLAVE_VEHICULAR.DESCRIPCION}
        label="Descripción"
        control={control}
        error={errors[CAMPOS_CLAVE_VEHICULAR.DESCRIPCION]}
        helperText={errors[CAMPOS_CLAVE_VEHICULAR.DESCRIPCION]?.message}
        disabled={esVisualizacion}
        required
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_CLAVE_VEHICULAR.FECHA_CREACION}
              name={CAMPOS_CLAVE_VEHICULAR.FECHA_CREACION}
              label="Fecha Creacion"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_CLAVE_VEHICULAR.FECHA_MODIFICACION}
              name={CAMPOS_CLAVE_VEHICULAR.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            control={control}
            name={CAMPOS_CLAVE_VEHICULAR.ACTIVO}
            label="Registro Activo"
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoClaveVehicularForm;
