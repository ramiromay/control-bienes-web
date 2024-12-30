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
import { CAMPOS_TURNO } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { turnoValidacion } from "../../../../settings/validacionConfig";

const CatalogoTurnoForm = () => {
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
    resolver: yupResolver(turnoValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [turno, setTurno] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Turno");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((data) => {
        setTurno(data);
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
    if (turno) {
      const { idTurno, nombre, activo, fechaCreacion, fechaModificacion } =
        turno;

      setValue(CAMPOS_TURNO.ID_TURNO, idTurno);
      setValue(CAMPOS_TURNO.NOMBRE, nombre);
      setValue(CAMPOS_TURNO.ACTIVO, activo);
      setValue(CAMPOS_TURNO.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_TURNO.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [turno]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? `Turno modificado correctamente`
          : "Turno guardado correctamente";
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
        id={CAMPOS_TURNO.ID_TURNO}
        name={CAMPOS_TURNO.ID_TURNO}
        label="Id Turno"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_TURNO.NOMBRE}
        name={CAMPOS_TURNO.NOMBRE}
        label="Nombre"
        control={control}
        required={true}
        disabled={esVisualizacion}
        error={errors[CAMPOS_TURNO.NOMBRE]}
        helperText={errors[CAMPOS_TURNO.NOMBRE]?.message}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_TURNO.FECHA_CREACION}
              name={CAMPOS_TURNO.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_TURNO.FECHA_MODIFICACION}
              name={CAMPOS_TURNO.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_TURNO.ACTIVO}
            name={CAMPOS_TURNO.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoTurnoForm;
