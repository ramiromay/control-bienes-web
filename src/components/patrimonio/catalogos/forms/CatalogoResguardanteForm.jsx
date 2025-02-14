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
import { CAMPOS_RESGUARDNATE } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { resguardanteValidacion } from "../../../../settings/validacionConfig";
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import {
  getPeriodos,
  getUnidadesAdministrativas,
  getTipoResponsable,
} from "../../../../services/general";
import { getPersonas } from "../../../../services/seguridad";
import { mapArray } from "../../../../settings/utils";
import { compUnidadAdministrativaMappingRules } from "../../../../settings/mappingRulesConfig";

const CatalogoResguardanteForm = () => {
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
    resolver: yupResolver(resguardanteValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [resguardante, setResguardante] = useState();
  const [personas, setPersonas] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [tiposResponsable, setTiposResponsable] = useState([]);
  const [unidadesAdministrativas, setUnidadesAdministrativas] = useState([]);

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Resguardante");

  useEffect(() => {
    Promise.all([
      getPersonas(),
      getPeriodos(),
      getTipoResponsable(),
      getUnidadesAdministrativas({ desdeNivel: 3, hastaNivel: 3 }),
      handleGetRegistroCatalogo(filaSeleccionada[0]),
    ])
      .then(
        ([
          personasData,
          periodosData,
          tiposResponsablesData,
          unidadesAdministrativasData,
          resguardanteData,
        ]) => {
          const unidadesAdministrativas = mapArray(
            unidadesAdministrativasData,
            compUnidadAdministrativaMappingRules
          );
          setPersonas(personasData);
          setPeriodos(periodosData);
          setTiposResponsable(tiposResponsablesData);
          setUnidadesAdministrativas(unidadesAdministrativas);
          setResguardante(resguardanteData);
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
    if (resguardante) {
      const {
        idResguardante,
        idPeriodo,
        idPersona,
        idTipoResponsable,
        nivelUnidadAdministrativa,
        noConvenio,
        observaciones,
        responsable,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = resguardante;

      console.log(resguardante);

      const periodoSeleccionado = periodos.find((e) => e.id === idPeriodo);

      const personaSeleccionada = personas.find((e) => e.id === idPersona);

      const tipoResponsableSeleccionado = tiposResponsable.find(
        (e) => e.id === idTipoResponsable
      );

      const unidadAdministrativaSeleccionada = unidadesAdministrativas.find(
        (e) => e.id === nivelUnidadAdministrativa
      );

      setValue(CAMPOS_RESGUARDNATE.ID_RESGUARDNATES, idResguardante);
      setValue(CAMPOS_RESGUARDNATE.PERIODO, periodoSeleccionado);
      setValue(
        CAMPOS_RESGUARDNATE.TIPO_RESPONSABLE,
        tipoResponsableSeleccionado
      );
      setValue(
        CAMPOS_RESGUARDNATE.UNIDAD_ADMINISTRATIVA,
        unidadAdministrativaSeleccionada
      );
      setValue(CAMPOS_RESGUARDNATE.PERSONA, personaSeleccionada);
      setValue(CAMPOS_RESGUARDNATE.NO_CONVENIO, noConvenio);
      setValue(CAMPOS_RESGUARDNATE.OBSERVACIONES, observaciones);
      setValue(CAMPOS_RESGUARDNATE.RESPONSABLE, responsable);
      setValue(CAMPOS_RESGUARDNATE.ACTIVO, activo);
      setValue(CAMPOS_RESGUARDNATE.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_RESGUARDNATE.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [resguardante]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Resguardante modificado correctamente"
          : "Resguardante guardado correctamente";
        handleCerrarDialogo();
        showSnackbar(mensaje);
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
        id={CAMPOS_RESGUARDNATE.ID_RESGUARDNATES}
        name={CAMPOS_RESGUARDNATE.ID_RESGUARDNATES}
        label="Id Resguardante"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoAutocompletar
        id={CAMPOS_RESGUARDNATE.PERIODO}
        name={CAMPOS_RESGUARDNATE.PERIODO}
        label="Periodo"
        control={control}
        required
        disabled={esVisualizacion}
        options={periodos}
        getOptionLabel={(option) =>
          `${option.id}. ${option.fechaInicio} - ${option.fechaFinal}`
        }
        isOptionEqualToValue={(option, value) =>
          option.id === value.id ||
          option.fechaInicio === value.fechaInicio ||
          option.fechaFinal === value.fechaFinal
        }
        error={errors[CAMPOS_RESGUARDNATE.PERIODO]}
        helperText={errors[CAMPOS_RESGUARDNATE.PERIODO]?.message}
      />
      <FormCampoAutocompletar
        id={CAMPOS_RESGUARDNATE.PERSONA}
        name={CAMPOS_RESGUARDNATE.PERSONA}
        label="Persona"
        control={control}
        required
        disabled={esVisualizacion}
        options={personas}
        error={errors[CAMPOS_RESGUARDNATE.PERSONA]}
        helperText={errors[CAMPOS_RESGUARDNATE.PERSONA]?.message}
      />
      <FormCampoAutocompletar
        id={CAMPOS_RESGUARDNATE.UNIDAD_ADMINISTRATIVA}
        name={CAMPOS_RESGUARDNATE.UNIDAD_ADMINISTRATIVA}
        label="Unidad Administrativa"
        control={control}
        required
        disabled={esVisualizacion}
        options={unidadesAdministrativas}
        getOptionLabel={(option) => `${option.nivelCompleto} - ${option.name}`}
        isOptionEqualToValue={(option, value) =>
          option.nivelCompleto === value.nivelCompleto ||
          option.name === value.name
        }
        error={errors[CAMPOS_RESGUARDNATE.UNIDAD_ADMINISTRATIVA]}
        helperText={errors[CAMPOS_RESGUARDNATE.UNIDAD_ADMINISTRATIVA]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_RESGUARDNATE.OBSERVACIONES}
        name={CAMPOS_RESGUARDNATE.OBSERVACIONES}
        label="Observaciones"
        control={control}
        disabled={esVisualizacion}
        error={errors[CAMPOS_RESGUARDNATE.OBSERVACIONES]}
        helperText={errors[CAMPOS_RESGUARDNATE.OBSERVACIONES]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_RESGUARDNATE.NO_CONVENIO}
        name={CAMPOS_RESGUARDNATE.NO_CONVENIO}
        label="No. Convenio"
        control={control}
        disabled={esVisualizacion}
        type="number"
        defaultValue="0"
        error={errors[CAMPOS_RESGUARDNATE.NO_CONVENIO]}
        helperText={errors[CAMPOS_RESGUARDNATE.NO_CONVENIO]?.message}
      />
      <FormCampoAutocompletar
        id={CAMPOS_RESGUARDNATE.TIPO_RESPONSABLE}
        name={CAMPOS_RESGUARDNATE.TIPO_RESPONSABLE}
        label="Tipo Responsable"
        control={control}
        required
        disabled={esVisualizacion}
        options={tiposResponsable}
        error={errors[CAMPOS_RESGUARDNATE.TIPO_RESPONSABLE]}
        helperText={errors[CAMPOS_RESGUARDNATE.TIPO_RESPONSABLE]?.message}
      />
      <FormCheck
        id={CAMPOS_RESGUARDNATE.RESPONSABLE}
        name={CAMPOS_RESGUARDNATE.RESPONSABLE}
        label="Responsable"
        control={control}
        disabled={esVisualizacion}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_RESGUARDNATE.FECHA_CREACION}
              name={CAMPOS_RESGUARDNATE.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_RESGUARDNATE.FECHA_MODIFICACION}
              name={CAMPOS_RESGUARDNATE.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_RESGUARDNATE.ACTIVO}
            name={CAMPOS_RESGUARDNATE.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoResguardanteForm;
