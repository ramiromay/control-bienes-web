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
import { CAMPOS_CENTRO_TRABAJO } from "../../../../settings/formConfig";
import {
  getMunicipios,
  getPeriodos,
  getUnidadesAdministrativas,
} from "../../../../services/general";
import { yupResolver } from "@hookform/resolvers/yup";
import { centroTrabajoValidacion } from "../../../../settings/validacionConfig";

const CatalogoCentroTrabajoForm = () => {
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
    resolver: yupResolver(centroTrabajoValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [centroTrabajo, setCentroTrabajo] = useState();
  const [municipios, setMunicipios] = useState([]);
  const [unidadesAdministrativas, setUnidadesAdministrativas] = useState([]);
  const [periodos, setPeriodos] = useState([]);

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Centro de Trabajo");

  useEffect(() => {
    setCargando(true);
    Promise.all([
      getMunicipios(),
      getPeriodos(),
      getUnidadesAdministrativas(),
      handleGetRegistroCatalogo(filaSeleccionada[0]),
    ])
      .then(
        ([municipios, periodos, unidadesAdministrativas, centroTrabajo]) => {
          setMunicipios(municipios);
          setPeriodos(periodos);
          setUnidadesAdministrativas(unidadesAdministrativas);
          setCentroTrabajo(centroTrabajo);
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
    if (centroTrabajo) {
      const {
        idCentroTrabajo,
        idPeriodo,
        idMunicipio,
        idUnidadAdministrativa,
        direccion,
        clave,
        nombre,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = centroTrabajo;
      
      const periodoSeleccionado = periodos.find(
        (entidad) => entidad.id === idPeriodo
      );
      const municipioSeleccionado = municipios.find(
        (entidad) => entidad.id === idMunicipio
      );
      const unidadAdministrativaSeleccionada = unidadesAdministrativas.find(
        (entidad) => entidad.id === idUnidadAdministrativa
      );

      setValue(CAMPOS_CENTRO_TRABAJO.ID_CENTRO_TRABAJO, idCentroTrabajo);
      setValue(CAMPOS_CENTRO_TRABAJO.PERIODO, periodoSeleccionado);
      setValue(CAMPOS_CENTRO_TRABAJO.CLAVE, clave);
      setValue(CAMPOS_CENTRO_TRABAJO.NOMBRE, nombre);
      setValue(CAMPOS_CENTRO_TRABAJO.DIRECCION, direccion);
      setValue(CAMPOS_CENTRO_TRABAJO.MUNICIPIO, municipioSeleccionado);
      setValue(
        CAMPOS_CENTRO_TRABAJO.UNIDAD_ADMINISTRATIVA,
        unidadAdministrativaSeleccionada
      );
      setValue(CAMPOS_CENTRO_TRABAJO.ACTIVO, activo);
      setValue(CAMPOS_CENTRO_TRABAJO.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_CENTRO_TRABAJO.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [centroTrabajo]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada[0], data)
      .then(() => {
        const mensaje = esModificacion
          ? "Centro de trabajo modificada correctamente"
          : "Centro de trabajo guardada correctamente";
        handleCerrarDialogo();
        showSnackbar(mensaje, "success");
      })
      .catch((error) => {
        console.log(error);
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
        id={CAMPOS_CENTRO_TRABAJO.ID_CENTRO_TRABAJO}
        name={CAMPOS_CENTRO_TRABAJO.ID_CENTRO_TRABAJO}
        label="Id Centro Trabajo"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoAutocompletar
        id={CAMPOS_CENTRO_TRABAJO.PERIODO}
        name={CAMPOS_CENTRO_TRABAJO.PERIODO}
        label="Periodo"
        control={control}
        options={periodos}
        error={errors[CAMPOS_CENTRO_TRABAJO.PERIODO]}
        helperText={errors[CAMPOS_CENTRO_TRABAJO.PERIODO]?.message}
        getOptionLabel={(option) =>
          `${option.id}. ${option.fechaInicio} - ${option.fechaFinal}`
        }
        isOptionEqualToValue={(option, value) =>
          option.id === value.id ||
          option.fechaInicio === value.fechaInicio ||
          option.fechaFinal === value.fechaFinal
        }
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_CENTRO_TRABAJO.CLAVE}
        name={CAMPOS_CENTRO_TRABAJO.CLAVE}
        label="Clave"
        control={control}
        error={errors[CAMPOS_CENTRO_TRABAJO.CLAVE]}
        helperText={errors[CAMPOS_CENTRO_TRABAJO.CLAVE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_CENTRO_TRABAJO.NOMBRE}
        name={CAMPOS_CENTRO_TRABAJO.NOMBRE}
        label="Nombre"
        control={control}
        error={errors[CAMPOS_CENTRO_TRABAJO.NOMBRE]}
        helperText={errors[CAMPOS_CENTRO_TRABAJO.NOMBRE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_CENTRO_TRABAJO.DIRECCION}
        name={CAMPOS_CENTRO_TRABAJO.DIRECCION}
        label="Dirección"
        control={control}
        error={errors[CAMPOS_CENTRO_TRABAJO.DIRECCION]}
        helperText={errors[CAMPOS_CENTRO_TRABAJO.DIRECCION]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={CAMPOS_CENTRO_TRABAJO.MUNICIPIO}
        name={CAMPOS_CENTRO_TRABAJO.MUNICIPIO}
        label="Municipio"
        control={control}
        options={municipios}
        error={errors[CAMPOS_CENTRO_TRABAJO.MUNICIPIO]}
        helperText={errors[CAMPOS_CENTRO_TRABAJO.MUNICIPIO]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={CAMPOS_CENTRO_TRABAJO.UNIDAD_ADMINISTRATIVA}
        name={CAMPOS_CENTRO_TRABAJO.UNIDAD_ADMINISTRATIVA}
        label="Unidad Administrativa"
        control={control}
        options={unidadesAdministrativas}
        error={errors[CAMPOS_CENTRO_TRABAJO.UNIDAD_ADMINISTRATIVA]}
        helperText={
          errors[CAMPOS_CENTRO_TRABAJO.UNIDAD_ADMINISTRATIVA]?.message
        }
        getOptionLabel={(option) => `${option.nivelCompleto} - ${option.name}`}
        isOptionEqualToValue={(option, value) =>
          option.nivelCompleto === value.nivelCompleto ||
          option.name === value.name
        }
        disabled={esVisualizacion}
        required
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_CENTRO_TRABAJO.FECHA_CREACION}
              name={CAMPOS_CENTRO_TRABAJO.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_CENTRO_TRABAJO.FECHA_MODIFICACION}
              name={CAMPOS_CENTRO_TRABAJO.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_CENTRO_TRABAJO.ACTIVO}
            name={CAMPOS_CENTRO_TRABAJO.ACTIVO}
            control={control}
            label="Registro Activo"
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoCentroTrabajoForm;
