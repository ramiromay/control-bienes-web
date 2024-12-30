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
import { CAMPOS_TITULAR } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { titularValidacion } from "../../../../settings/validacionConfig";
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import { getCentroTrabajoTurno } from "../../../../services/catalogo";
import ItemInfoExtraAutocompletar from "../../../utils/ItemInfoExtraAutocompletar";

const CatalogoTitularForm = () => {
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
    resolver: yupResolver(titularValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [titular, setTitulares] = useState();
  const [centroTrabajoTurnos, setCentroTrabajoTurnos] = useState([]);

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Titular");

  useEffect(() => {
    Promise.all([
      getCentroTrabajoTurno(),
      handleGetRegistroCatalogo(filaSeleccionada[0]),
    ])
      .then(([centroTrabajoTurno, data]) => {
        setCentroTrabajoTurnos(centroTrabajoTurno);
        setTitulares(data);
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
    if (titular) {
      const {
        idTitular,
        nombre,
        idCentroTrabajoTurno,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = titular;

      const centroTrabajoTurnoSeleccionado = centroTrabajoTurnos.find(
        (ct) => ct.id === idCentroTrabajoTurno
      );

      console.log(centroTrabajoTurnoSeleccionado)

      setValue(CAMPOS_TITULAR.ID_TITULAR, idTitular);
      setValue(CAMPOS_TITULAR.NOMBRE, nombre);
      setValue(
        CAMPOS_TITULAR.CENTRO_TRABAJO_TURNO,
        centroTrabajoTurnoSeleccionado
      );
      setValue(CAMPOS_TITULAR.CENTRO_TRABAJO, centroTrabajoTurnoSeleccionado.name);
      setValue(CAMPOS_TITULAR.TURNO, centroTrabajoTurnoSeleccionado.infoExtra);
      setValue(CAMPOS_TITULAR.ACTIVO, activo);
      setValue(CAMPOS_TITULAR.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_TITULAR.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [titular]);

  const changeCentroTrabajoTurno = (centroTrabajoTurno) => {
    if (!centroTrabajoTurno) {
      setValue(CAMPOS_TITULAR.CENTRO_TRABAJO, "");
      setValue(CAMPOS_TITULAR.TURNO, "");
      return;
    }
    setValue(CAMPOS_TITULAR.CENTRO_TRABAJO, centroTrabajoTurno.name);
    setValue(CAMPOS_TITULAR.TURNO, centroTrabajoTurno.infoExtra);
  };

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Titular modificado correctamente"
          : "Titular guardado correctamente";
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
        id={CAMPOS_TITULAR.ID_TITULAR}
        name={CAMPOS_TITULAR.ID_TITULAR}
        label="Id Titular"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_TITULAR.NOMBRE}
        name={CAMPOS_TITULAR.NOMBRE}
        label="Nombre"
        control={control}
        required
        disabled={esVisualizacion}
        error={errors[CAMPOS_TITULAR.NOMBRE]}
        helperText={errors[CAMPOS_TITULAR.NOMBRE]?.message}
      />
      <FormCampoAutocompletar
        id={CAMPOS_TITULAR.CENTRO_TRABAJO_TURNO}
        name={CAMPOS_TITULAR.CENTRO_TRABAJO_TURNO}
        label="Id Centro Trabajo - Turno"
        control={control}
        required
        disabled={esVisualizacion}
        options={centroTrabajoTurnos}
        handleOnChange={changeCentroTrabajoTurno}
        renderOption={ItemInfoExtraAutocompletar}
        getOptionLabel={(option) => `${option.id}`}
        isOptionEqualToValue={(option, value) => option.id === value.id || option.name === value.name || option.infoExtra === value.infoExtra}
        error={errors[CAMPOS_TITULAR.CENTRO_TRABAJO_TURNO]}
        helperText={errors[CAMPOS_TITULAR.CENTRO_TRABAJO_TURNO]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_TITULAR.CENTRO_TRABAJO}
        name={CAMPOS_TITULAR.CENTRO_TRABAJO}
        label="CentroTrabajo"
        control={control}
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_TITULAR.TURNO}
        name={CAMPOS_TITULAR.TURNO}
        label="Turno"
        control={control}
        required
        disabled
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_TITULAR.FECHA_CREACION}
              name={CAMPOS_TITULAR.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_TITULAR.FECHA_MODIFICACION}
              name={CAMPOS_TITULAR.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_TITULAR.ACTIVO}
            name={CAMPOS_TITULAR.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoTitularForm;
