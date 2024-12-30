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
import { CAMPOS_VERSION_VEHICULAR } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { versionVehicularValidacion } from "../../../../settings/validacionConfig";

const CatalogoVersionVehicularForm = () => {
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
    resolver: yupResolver(versionVehicularValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [versionVehicular, setVersionVehicular] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Versión Vehicular");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((data) => {
        setVersionVehicular(data);
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
    if (versionVehicular) {
      const {
        idVersionVehicular,
        nombre,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = versionVehicular;

      setValue(CAMPOS_VERSION_VEHICULAR.ID_VERSION_VEHICULAR,idVersionVehicular);
      setValue(CAMPOS_VERSION_VEHICULAR.NOMBRE, nombre);
      setValue(CAMPOS_VERSION_VEHICULAR.DESCRIPCION, descripcion);
      setValue(CAMPOS_VERSION_VEHICULAR.ACTIVO, activo);
      setValue(CAMPOS_VERSION_VEHICULAR.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_VERSION_VEHICULAR.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [versionVehicular]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Versión Vehicular modificado correctamente"
          : "Versión Vehicular guardado correctamente";
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
        id={CAMPOS_VERSION_VEHICULAR.ID_VERSION_VEHICULAR}
        name={CAMPOS_VERSION_VEHICULAR.ID_VERSION_VEHICULAR}
        label="Id Versión Vehicular"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_VERSION_VEHICULAR.NOMBRE}
        name={CAMPOS_VERSION_VEHICULAR.NOMBRE}
        label="Nombre"
        control={control}
        required
        disabled={esVisualizacion}
        error={errors[CAMPOS_VERSION_VEHICULAR.NOMBRE]}
        helperText={errors[CAMPOS_VERSION_VEHICULAR.NOMBRE]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_VERSION_VEHICULAR.DESCRIPCION}
        name={CAMPOS_VERSION_VEHICULAR.DESCRIPCION}
        label="Descripción"
        control={control}
        required
        disabled={esVisualizacion}
        error={errors[CAMPOS_VERSION_VEHICULAR.DESCRIPCION]}
        helperText={errors[CAMPOS_VERSION_VEHICULAR.DESCRIPCION]?.message}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_VERSION_VEHICULAR.FECHA_CREACION}
              name={CAMPOS_VERSION_VEHICULAR.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_VERSION_VEHICULAR.FECHA_MODIFICACION}
              name={CAMPOS_VERSION_VEHICULAR.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_VERSION_VEHICULAR.ACTIVO}
            name={CAMPOS_VERSION_VEHICULAR.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoVersionVehicularForm;
