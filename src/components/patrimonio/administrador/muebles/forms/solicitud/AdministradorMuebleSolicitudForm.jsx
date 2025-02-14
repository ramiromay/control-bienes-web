import { useEffect, useState } from "react";
import DialogoEmergente from "../../../../../utils/DialogoEmergente";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import { CAMPOS_SOLICITUD_MUEBLE } from "../../../../../../settings/formConfig";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useAdministradorMueble } from "../../../../../../context/AdministradorMuebleContext";
import { useForm } from "react-hook-form";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { Stack } from "@mui/material";
import { getUnidadesAdministrativas } from "../../../../../../services/general";
import { getEmpleados } from "../../../../../../services/seguridad";
import {
  getMotivoTramite,
  getTipoTramite,
} from "../../../../../../services/patrimonio";
import { mapArray } from "../../../../../../settings/utils";
import {
  compEmpleadoMappingRules,
  compMotivoTramiteMappingRules,
  compTipoTramiteMappingRules,
  compUnidadAdministrativaMappingRules,
} from "../../../../../../settings/mappingRulesConfig";
import ItemInfoExtraAutocompletar from "../../../../../utils/ItemInfoExtraAutocompletar";
import { yupResolver } from "@hookform/resolvers/yup";
import { solicitudMuebleValidacion } from "../../../../../../settings/validacionConfig";

const AdministradorMuebleSolicitudForm = () => {
  const {
    ID_SOLICITUD_MUEBLE,
    SOLICITANTE,
    OBSERVACIONES,
    TIPO_TRAMITE,
    MOTIVO_TRAMITE,
    UNIDAD_ADMINISTRATIVA,
    FECHA_CREACION,
    FECHA_MODIFICACION,
  } = CAMPOS_SOLICITUD_MUEBLE;
  const { handleError } = useSistema();
  const {
    dialogoSolicitudes,
    multiTabla,
    handleEnviar,
    handleGetSolicitudMueble,
    handleGetSolicitudesMuebles,
  } = useAdministradorMueble();
  const {
    dialogo,
    esDialogoVisualizacion,
    esDialogoCreacion,
    handleCerrarDialogo,
    getTituloDialogo,
  } = dialogoSolicitudes;
  const { iniciarCargaTablas, finalizarCargaTablas, addDatosTablaSuperior } =
    multiTabla;
  const { filaSeleccionada } = useMultiTabla();
  const { tablaSuperior } = filaSeleccionada;
  const { control, formState, handleSubmit, setValue } = useForm({
    resolver: yupResolver(solicitudMuebleValidacion),
  });
  const { errors } = formState;
  const [cargando, setCargando] = useState(false);
  const [complementos, setComplementos] = useState({
    unidadesAdministrativas: [],
    empleados: [],
    tiposTramites: [],
    motivosTramites: [],
    solicitud: null,
  });
  const {
    unidadesAdministrativas,
    empleados,
    motivosTramites,
    tiposTramites,
    solicitud,
  } = complementos;
  const [motivosTramitesXTipoTramite, setMotivosTramitesXTipoTramite] =
    useState([]);
  const esVisualizacion = esDialogoVisualizacion();
  const tituloDialogo = getTituloDialogo("Solicitud Bien Mueble");

  const changeTipoTramite = (tipoTramite) => {
    if (!tipoTramite) {
      setMotivosTramitesXTipoTramite([]);
      setValue(MOTIVO_TRAMITE, null);
      return;
    }
    const subfamiliasFiltradas = motivosTramites.filter(
      (motivoTramite) => motivoTramite.idTipoTramite === tipoTramite.id
    );
    setMotivosTramitesXTipoTramite(subfamiliasFiltradas);
    setValue(MOTIVO_TRAMITE, null);
  };

  const handleSubmitSolicitud = handleSubmit((formData) => {
    setCargando(true);
    handleEnviar({
      formData: formData,
      filaSeleccionada: tablaSuperior,
      esCreacion: esDialogoCreacion(),
    })
      .then(() => {
        handleCerrarDialogo();
        iniciarCargaTablas();
        return handleGetSolicitudesMuebles();
      })
      .then((solicitudes) => {
        addDatosTablaSuperior(solicitudes);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
        finalizarCargaTablas();
      });
  });

  useEffect(() => {
    setCargando(true);
    const filtroUnidadAdministrariva = { desdeNivel: 3, hastaNivel: 3 };
    Promise.all([
      getUnidadesAdministrativas(filtroUnidadAdministrariva),
      getEmpleados(),
      getTipoTramite(),
      getMotivoTramite(),
      handleGetSolicitudMueble({ filaSeleccionada: tablaSuperior }),
    ])
      .then(
        ([
          unidadesAdministrativasData,
          empleadosData,
          tiposTramitesData,
          motivosTramitesData,
          solicitudData,
        ]) => {
          const empleados = mapArray(empleadosData, compEmpleadoMappingRules);
          const unidadesAdministrativas = mapArray(
            unidadesAdministrativasData,
            compUnidadAdministrativaMappingRules
          );
          const tiposTramites = mapArray(
            tiposTramitesData.filter((e) => e.idSubModulo === 1),
            compTipoTramiteMappingRules
          );
          const motivosTramites = mapArray(
            motivosTramitesData,
            compMotivoTramiteMappingRules
          );

          setComplementos({
            unidadesAdministrativas: unidadesAdministrativas,
            empleados: empleados,
            tiposTramites: tiposTramites,
            motivosTramites: motivosTramites,
            solicitud: solicitudData,
          });
        }
      )
      .catch((error) => {
        handleCerrarDialogo();
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    if (solicitud) {
      const {
        idSolicitud,
        idEmpleado,
        unidadAdministrativa,
        idTipoTramite,
        idMotivoTramite,
        observaciones,
        fechaCreacion,
        fechaModificacion,
      } = solicitud;

      const empleadoSeleccionado = empleados.find((e) => e.id === idEmpleado);
      const unidadAdministrativaSeleccionada = unidadesAdministrativas.find(
        (e) => unidadAdministrativa.includes(e.id)
      );
      const tipoTramiteSeleccionado = tiposTramites.find(
        (e) => e.id === idTipoTramite
      );
      const motivoTramiteSeleccionado = motivosTramites.find(
        (e) => e.id === idMotivoTramite
      );

      setValue(ID_SOLICITUD_MUEBLE, idSolicitud);
      setValue(SOLICITANTE, empleadoSeleccionado);
      setValue(UNIDAD_ADMINISTRATIVA, unidadAdministrativaSeleccionada);
      setValue(TIPO_TRAMITE, tipoTramiteSeleccionado);
      setValue(MOTIVO_TRAMITE, motivoTramiteSeleccionado);
      setValue(OBSERVACIONES, observaciones);
      setValue(FECHA_CREACION, fechaCreacion);
      setValue(FECHA_MODIFICACION, fechaModificacion);
    }
  }, [solicitud]);

  return (
    <DialogoEmergente
      titulo={tituloDialogo}
      cargando={cargando}
      abierto={dialogo.abierto}
      onClickConfirmar={handleSubmitSolicitud}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar={esVisualizacion ? "Cerrar" : "Cancelar"}
      disabledConfirmar={esVisualizacion}
    >
      <FormCampoEntrada
        id={ID_SOLICITUD_MUEBLE}
        name={ID_SOLICITUD_MUEBLE}
        label="Folio Solicitud"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoAutocompletar
        id={SOLICITANTE}
        name={SOLICITANTE}
        label="Solicitante"
        control={control}
        options={empleados}
        renderOption={ItemInfoExtraAutocompletar}
        getOptionLabel={(option) => `${option.id} - ${option.name}`}
        isOptionEqualToValue={(option, value) =>
          option.id === value.id ||
          option.name === value.name ||
          option.infoExtra === value.infoExtra
        }
        error={errors[SOLICITANTE]}
        helperText={errors[SOLICITANTE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={UNIDAD_ADMINISTRATIVA}
        name={UNIDAD_ADMINISTRATIVA}
        label="Unidad Administrativa"
        control={control}
        options={unidadesAdministrativas}
        getOptionLabel={(option) => `${option.id} ${option.name}`}
        error={errors[UNIDAD_ADMINISTRATIVA]}
        helperText={errors[UNIDAD_ADMINISTRATIVA]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={OBSERVACIONES}
        name={OBSERVACIONES}
        label="Observación"
        control={control}
        error={errors[OBSERVACIONES]}
        helperText={errors[OBSERVACIONES]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={TIPO_TRAMITE}
        name={TIPO_TRAMITE}
        label="Tipo Trámite"
        control={control}
        options={tiposTramites}
        handleOnChange={changeTipoTramite}
        error={errors[TIPO_TRAMITE]}
        helperText={errors[TIPO_TRAMITE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={MOTIVO_TRAMITE}
        name={MOTIVO_TRAMITE}
        label="Motivo Trámite"
        control={control}
        options={motivosTramitesXTipoTramite}
        error={errors[MOTIVO_TRAMITE]}
        helperText={errors[MOTIVO_TRAMITE]?.message}
        disabled={esVisualizacion}
        required
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={FECHA_CREACION}
              name={FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={FECHA_MODIFICACION}
              name={FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
        </>
      )}
    </DialogoEmergente>
  );
};

export default AdministradorMuebleSolicitudForm;
