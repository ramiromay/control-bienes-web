import DialogoEmergente from "../../../utils/DialogoEmergente";
import { useForm } from "react-hook-form";
import { useCatalogo } from "../../../../context/CatalogoContext";
import FormCampoEntrada from "../../../utils/FormCampoEntrada";
import useTabla from "@context/Tabla/useTabla";
import { useEffect, useState } from "react";
import { MODO_CARGA } from "../../../../settings/appConstants";
import FormCheck from "../../../utils/FormCheck";
import { Stack } from "@mui/material";
import { useSistema } from "../../../../context/SistemaContext";
import { useSnackbar } from "@context/SnackbarContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { lineaVehicularValidacion } from "../../../../settings/validacionConfig";
import { CAMPOS_LINEA_VEHICULAR } from "../../../../settings/formConfig";

const CatalogoLineaVehicularForm = () => {
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
    resolver: yupResolver(lineaVehicularValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [lineaVehicular, setLineaVehicular] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Linea Vehicular");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((claveVehicular) => {
        setLineaVehicular(claveVehicular);
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
    if (lineaVehicular) {
      const {
        idLineaVehicular,
        nombre,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = lineaVehicular;

      setValue(CAMPOS_LINEA_VEHICULAR.ID_LINEA_VEHICULAR, idLineaVehicular);
      setValue(CAMPOS_LINEA_VEHICULAR.NOMBRE, nombre);
      setValue(CAMPOS_LINEA_VEHICULAR.DESCRIPCION, descripcion);
      setValue(CAMPOS_LINEA_VEHICULAR.ACTIVO, activo);
      setValue(CAMPOS_LINEA_VEHICULAR.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_LINEA_VEHICULAR.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [lineaVehicular]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Linea vehicular modificado correctamente"
          : "Linea vehicular guardado correctamente";
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
        id={CAMPOS_LINEA_VEHICULAR.ID_LINEA_VEHICULAR}
        name={CAMPOS_LINEA_VEHICULAR.ID_LINEA_VEHICULAR}
        label="Id Línea Vehicular"
        control={control}
        defaultValue="Automatico"
        required
        disabled
        error={errors[CAMPOS_LINEA_VEHICULAR.ID_LINEA_VEHICULAR]}
        helperText={errors[CAMPOS_LINEA_VEHICULAR.ID_LINEA_VEHICULAR]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_LINEA_VEHICULAR.NOMBRE}
        name={CAMPOS_LINEA_VEHICULAR.NOMBRE}
        label="Nombre"
        control={control}
        disabled={esVisualizacion}
        required
        error={errors[CAMPOS_LINEA_VEHICULAR.NOMBRE]}
        helperText={errors[CAMPOS_LINEA_VEHICULAR.NOMBRE]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_LINEA_VEHICULAR.DESCRIPCION}
        name={CAMPOS_LINEA_VEHICULAR.DESCRIPCION}
        label="Descripción"
        control={control}
        disabled={esVisualizacion}
        required
        error={errors[CAMPOS_LINEA_VEHICULAR.DESCRIPCION]}
        helperText={errors[CAMPOS_LINEA_VEHICULAR.DESCRIPCION]?.message}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_LINEA_VEHICULAR.FECHA_CREACION}
              name={CAMPOS_LINEA_VEHICULAR.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_LINEA_VEHICULAR.FECHA_MODIFICACION}
              name={CAMPOS_LINEA_VEHICULAR.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_LINEA_VEHICULAR.ACTIVO}
            name={CAMPOS_LINEA_VEHICULAR.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoLineaVehicularForm;
