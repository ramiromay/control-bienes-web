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
import { CAMPOS_TIPO_VEHICULAR } from "../../../../settings/formConfig";
import { tipoVehicularValidacion } from "../../../../settings/validacionConfig";

const CatalogoTipoVehicularForm = () => {
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
    resolver: yupResolver(tipoVehicularValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [tipoVehicular, setTipoVehicular] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Tipo Vehicular");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((data) => {
        setTipoVehicular(data);
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
    if (tipoVehicular) {
      const {
        idTipoVehicular,
        nombre,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = tipoVehicular;

      setValue(CAMPOS_TIPO_VEHICULAR.ID_TIPO_VEHICULAR, idTipoVehicular);
      setValue(CAMPOS_TIPO_VEHICULAR.NOMBRE, nombre);
      setValue(CAMPOS_TIPO_VEHICULAR.DESCRIPCION, descripcion);
      setValue(CAMPOS_TIPO_VEHICULAR.ACTIVO, activo);
      setValue(CAMPOS_TIPO_VEHICULAR.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_TIPO_VEHICULAR.FECHA_MODIFICACION, fechaModificacion);
    }

    // eslint-disable-next-line
  }, [tipoVehicular]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Tipo vehicular modificado correctamente"
          : "Tipo vehicular Vehicular guardado correctamente";
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
        id={CAMPOS_TIPO_VEHICULAR.ID_TIPO_VEHICULAR}
        name={CAMPOS_TIPO_VEHICULAR.ID_TIPO_VEHICULAR}
        label="Id Tipo Vehicular"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_TIPO_VEHICULAR.NOMBRE}
        name={CAMPOS_TIPO_VEHICULAR.NOMBRE}
        label="Nombre"
        control={control}
        required
        disabled={esVisualizacion}
        error={errors[CAMPOS_TIPO_VEHICULAR.NOMBRE]}
        helperText={errors[CAMPOS_TIPO_VEHICULAR.NOMBRE]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_TIPO_VEHICULAR.DESCRIPCION}
        name={CAMPOS_TIPO_VEHICULAR.DESCRIPCION}
        label="Descripción"
        control={control}
        required={true}
        disabled={esVisualizacion}
        error={errors[CAMPOS_TIPO_VEHICULAR.DESCRIPCION]}
        helperText={errors[CAMPOS_TIPO_VEHICULAR.DESCRIPCION]?.message}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_TIPO_VEHICULAR.FECHA_CREACION}
              name={CAMPOS_TIPO_VEHICULAR.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_TIPO_VEHICULAR.FECHA_MODIFICACION}
              name={CAMPOS_TIPO_VEHICULAR.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_TIPO_VEHICULAR.ACTIVO}
            name={CAMPOS_TIPO_VEHICULAR.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoTipoVehicularForm;
