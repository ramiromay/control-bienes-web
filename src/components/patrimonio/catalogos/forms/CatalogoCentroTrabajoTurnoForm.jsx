import DialogoEmergente from "../../../utils/DialogoEmergente";
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import { useForm } from "react-hook-form";
import { useCatalogo } from "../../../../context/CatalogoContext";
import FormCampoEntrada from "../../../utils/FormCampoEntrada";
import useTabla from "@context/Tabla/useTabla";
import { useEffect, useState } from "react";
import { useSnackbar } from "@context/SnackbarContext";
import { Stack } from "@mui/material";
import FormCheck from "../../../utils/FormCheck";
import { useSistema } from "../../../../context/SistemaContext";
import { CAMPOS_CENTRO_TRABAJO_TURNO } from "../../../../settings/formConfig";
import { getCentroTrabajo, getTurno } from "../../../../services/catalogo";
import { yupResolver } from "@hookform/resolvers/yup";
import { centroTrabajoTurnoValidacion } from "../../../../settings/validacionConfig";

const CatalogoCentroTrabajoTurnoForm = () => {
  const { handleError } = useSistema();
  const {
    dialogo,
    handleEnviar,
    handleCerrarDialogo,
    getTituloDialogo,
    esDialogoModificacion,
    esDialogoVisualizacion,
    handleGetRegistroCatalogo,
  } = useCatalogo();
  const { filaSeleccionada } = useTabla();
  const { showSnackbar } = useSnackbar();
  const { control, formState, handleSubmit, setValue } = useForm({
    resolver: yupResolver(centroTrabajoTurnoValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [centroTrabajoTurno, setCentroTrabajoTurno] = useState();
  const [centroTrabajos, setCentroTrabajos] = useState([]);
  const [turnos, setTurnos] = useState([]);

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Centro de Trabajo - Turno");

  useEffect(() => {
    setCargando(true);
    Promise.all([
      getCentroTrabajo(),
      getTurno(),
      handleGetRegistroCatalogo(filaSeleccionada[0]),
    ])
      .then(
        ([centroTrabajos, turnos, centroTrabajoTurno]) => {
          setCentroTrabajos(centroTrabajos);
          setTurnos(turnos);
          setCentroTrabajoTurno(centroTrabajoTurno);
        }
      )
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
    if (centroTrabajoTurno) {
      const {
        idCentroTrabajoTurno,
        idCentroTrabajo,
        idTurno,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = centroTrabajoTurno;
      
      const centroTrabajoSeleccionado = centroTrabajos.find(
        (entidad) => entidad.id === idCentroTrabajo
      );
      const turnoSeleccionado = turnos.find(
        (entidad) => entidad.id === idTurno
      );

      setValue(CAMPOS_CENTRO_TRABAJO_TURNO.ID_CENTRO_TRABAJO_TURNO, idCentroTrabajoTurno);
      setValue(CAMPOS_CENTRO_TRABAJO_TURNO.CENTRO_TRABAJO, centroTrabajoSeleccionado);
      setValue(CAMPOS_CENTRO_TRABAJO_TURNO.TURNO, turnoSeleccionado);
      setValue(CAMPOS_CENTRO_TRABAJO_TURNO.ACTIVO, activo);
      setValue(CAMPOS_CENTRO_TRABAJO_TURNO.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_CENTRO_TRABAJO_TURNO.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [centroTrabajoTurno]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada[0], data)
      .then(() => {
        const mensaje = esModificacion
          ? "Centro trabajo - turno modificada correctamente"
          : "Centro trabajo - turno guardada correctamente";
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
      onClickConfirmar={onSubmit}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar={esVisualizacion ? "Cerrar" : "Cancelar"}
      disabledConfirmar={esVisualizacion}
    >
      <FormCampoEntrada
        id={CAMPOS_CENTRO_TRABAJO_TURNO.ID_CENTRO_TRABAJO_TURNO}
        name={CAMPOS_CENTRO_TRABAJO_TURNO.ID_CENTRO_TRABAJO_TURNO}
        label="Id Centro Trabajo"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoAutocompletar
        id={CAMPOS_CENTRO_TRABAJO_TURNO.CENTRO_TRABAJO}
        name={CAMPOS_CENTRO_TRABAJO_TURNO.CENTRO_TRABAJO}
        label="Centro Trabajo"
        control={control}
        options={centroTrabajos}
        error={errors[CAMPOS_CENTRO_TRABAJO_TURNO.CENTRO_TRABAJO]}
        helperText={errors[CAMPOS_CENTRO_TRABAJO_TURNO.CENTRO_TRABAJO]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={CAMPOS_CENTRO_TRABAJO_TURNO.TURNO}
        name={CAMPOS_CENTRO_TRABAJO_TURNO.TURNO}
        label="Turno"
        control={control}
        options={turnos}
        error={errors[CAMPOS_CENTRO_TRABAJO_TURNO.TURNO]}
        helperText={errors[CAMPOS_CENTRO_TRABAJO_TURNO.TURNO]?.message}
        disabled={esVisualizacion}
        required
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_CENTRO_TRABAJO_TURNO.FECHA_CREACION}
              name={CAMPOS_CENTRO_TRABAJO_TURNO.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_CENTRO_TRABAJO_TURNO.FECHA_MODIFICACION}
              name={CAMPOS_CENTRO_TRABAJO_TURNO.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_CENTRO_TRABAJO_TURNO.ACTIVO}
            name={CAMPOS_CENTRO_TRABAJO_TURNO.ACTIVO}
            control={control}
            label="Registro Activo"
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoCentroTrabajoTurnoForm;
