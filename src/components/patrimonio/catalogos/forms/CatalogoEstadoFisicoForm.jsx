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
import { CAMPOS_ESTADO_FISICO } from "../../../../settings/formConfig";
import { estadoFisicoValidacion } from "../../../../settings/validacionConfig";
import { yupResolver } from "@hookform/resolvers/yup";

const CatalogoEstadoFisicoForm = () => {
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
    resolver: yupResolver(estadoFisicoValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [estadoFisico, setEstadoFisico] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Estado Físico");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((estadoFisico) => {
        setEstadoFisico(estadoFisico);
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
    if (estadoFisico) {
      const {
        idEstadoFisico,
        nombre,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = estadoFisico;

      setValue(CAMPOS_ESTADO_FISICO.ID_ESTADO_FISICO, idEstadoFisico);
      setValue(CAMPOS_ESTADO_FISICO.NOMBRE, nombre);
      setValue(CAMPOS_ESTADO_FISICO.DESCRIPCION, descripcion);
      setValue(CAMPOS_ESTADO_FISICO.ACTIVO, activo);
      setValue(CAMPOS_ESTADO_FISICO.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_ESTADO_FISICO.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [estadoFisico]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Estado fisico modificado correctamente"
          : "Estado fisico guardado correctamente";
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
        id={CAMPOS_ESTADO_FISICO.ID_ESTADO_FISICO}
        name={CAMPOS_ESTADO_FISICO.ID_ESTADO_FISICO}
        label="Id Estado Físico"
        control={control}
        defaultValue="Automatico"
        disabled={true}
        required={true}
      />
      <FormCampoEntrada
        id={CAMPOS_ESTADO_FISICO.NOMBRE}
        name={CAMPOS_ESTADO_FISICO.NOMBRE}
        label="Nombre"
        control={control}
        error={errors[CAMPOS_ESTADO_FISICO.NOMBRE]}
        helperText={errors[CAMPOS_ESTADO_FISICO.NOMBRE]?.message}
        disabled={esVisualizacion}
        required={true}
      />
      <FormCampoEntrada
        id={CAMPOS_ESTADO_FISICO.DESCRIPCION}
        name={CAMPOS_ESTADO_FISICO.DESCRIPCION}
        label="Descripción"
        control={control}
        error={errors[CAMPOS_ESTADO_FISICO.DESCRIPCION]}
        helperText={errors[CAMPOS_ESTADO_FISICO.DESCRIPCION]?.message}
        disabled={esVisualizacion}
        required={true}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_ESTADO_FISICO.FECHA_CREACION}
              name={CAMPOS_ESTADO_FISICO.FECHA_CREACION}
              label="Fecha Creacion"
              control={control}
              disabled={true}
            />
            <FormCampoEntrada
              id={CAMPOS_ESTADO_FISICO.FECHA_MODIFICACION}
              name={CAMPOS_ESTADO_FISICO.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled={true}
            />
          </Stack>
          <FormCheck
            id={CAMPOS_ESTADO_FISICO.ACTIVO}
            name={CAMPOS_ESTADO_FISICO.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled={true}
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoEstadoFisicoForm;
