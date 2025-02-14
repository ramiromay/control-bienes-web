import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useAdministradorMueble } from "../../../../../../context/AdministradorMuebleContext";
import {
  muebleDesincorporacionValidaicion,
  solicitudMuebleValidacion,
} from "../../../../../../settings/validacionConfig";
import useFormPasos from "../../../../../../context/useFormPasos";
import AdministradorMuebleDesincorporacionDatoGeneralForm from "./AdministradorMuebleDesincorporacionDatoGeneralForm";
import { useSnackbar } from "../../../../../../context/SnackbarContext";
import { getUnidadesAdministrativas } from "../../../../../../services/general";
import { getBienesInventarioPorTipo } from "../../../../../../services/patrimonio";
import { mapArray } from "../../../../../../settings/utils";
import { compUnidadAdministrativaMappingRules } from "../../../../../../settings/mappingRulesConfig";
import { CAMPOS_DESINCORPORACION_MUEBLE } from "../../../../../../settings/formConfig";
import dayjs from "dayjs";

const pasosFormDesincorporacionMueble = ["Datos Generales"];
const AdministradorMuebleDesincorporacionForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarTramiteDesincorporacionMueble,
    handleCargarTramites,
    handleGetTramiteDesincorporacionMueble,
  } = useAdministradorMueble();
  const {
    dialogo,
    esDialogoVisualizacion,
    esDialogoCreacion,
    handleCerrarDialogo,
    getTituloDialogo,
  } = dialogoTramites;
  const { filaSeleccionada, handleQuitarSeleccionTablaInferior } =
    useMultiTabla();
  const { informacionTablaSuperior, informacionTablaInferior } =
    filaSeleccionada;
  const { tablaSuperior, tablaInferior } = filaSeleccionada;
  const [cargando, setCargando] = useState(false);
  const [complementos, setComplementos] = useState({
    unidadesAdministrativas: [],
    bienes: [],
    detalleDesincorporacion: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Desincorporación Bien Mueble");
  const { showSnackbar } = useSnackbar();

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: muebleDesincorporacionValidaicion,
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormDesincorporacionMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  const handleSubmitDesincorporacionMueble = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarTramiteDesincorporacionMueble({
      filaSeleccionada: tablaInferior,
      formData: data,
      esCreacion: esCreacion,
    })
      .then(() => {
        handleCloseForm();
        const mensaje = esCreacion
          ? "Tramite de desincorporación creado correctamente"
          : "Tramite de desincorporación modificado correctamente";
        showSnackbar(mensaje);
        handleQuitarSeleccionTablaInferior();
        handleCargarTramites({ filaSeleccionada: tablaSuperior });
      })
      .catch((error) => {
        handlePasoAnterior();
        handleError(error);
        console.error(error);
      })
      .finally(() => {
        setCargando(false);
      });
  });

  useEffect(() => {
    const idDetalleSolicitud =
      informacionTablaInferior && informacionTablaInferior.idDetalleSolicitud
        ? informacionTablaInferior.idDetalleSolicitud
        : null;
    setCargando(true);
    Promise.all([
      getUnidadesAdministrativas({ desdeNivel: 3, hastaNivel: 3 }),
      getBienesInventarioPorTipo({
        idTipoBien: 1,
        detalleSolicitud: idDetalleSolicitud,
      }),
      handleGetTramiteDesincorporacionMueble({
        filaSeleccionada: tablaInferior,
      }),
    ])
      .then(
        ([unidadesAdministrativasData, bienes, detalleDesincorporacion]) => {
          const unidadesAdministrativas = mapArray(
            unidadesAdministrativasData,
            compUnidadAdministrativaMappingRules
          );

          setComplementos({
            bienes: bienes,
            unidadesAdministrativas: unidadesAdministrativas,
            detalleDesincorporacion: detalleDesincorporacion,
          });
        }
      )
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    const { detalleDesincorporacion, bienes, unidadesAdministrativas } =
      complementos;
    if (detalleDesincorporacion) {
      console.log(detalleDesincorporacion);
      // {
      //   idSolicitud: 70013,
      //   nivelUnidadAdministrativa: '18.1.2',
      //   idEmpleado: null,
      //   folioBien: 'BM00000011,BM00000012',
      //   observaciones: 'NA',
      //   fechaPublicacion: '2025-01-17T00:00:00',
      //   numeroPublicacion: '6736',
      //   descripcionDesincorporacion: 'aos'
      // }
      const foliosBien = detalleDesincorporacion.folioBien.split(",");
      setValue(
        CAMPOS_DESINCORPORACION_MUEBLE.FOLIO_SOLICITUD,
        detalleDesincorporacion.idSolicitud
      );
      setValue(
        CAMPOS_DESINCORPORACION_MUEBLE.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleDesincorporacion.nivelUnidadAdministrativa
        )
      );
      setValue(
        CAMPOS_DESINCORPORACION_MUEBLE.FOLIO_BIEN,
        bienes.filter((e) => foliosBien.includes(e.folioBien))
      );
      setValue(
        CAMPOS_DESINCORPORACION_MUEBLE.OBSERVACIONES,
        detalleDesincorporacion.observaciones
      );
      setValue(
        CAMPOS_DESINCORPORACION_MUEBLE.FECHA_PUBLICACION,
        detalleDesincorporacion.fechaPublicacion
          ? dayjs(detalleDesincorporacion.fechaPublicacion)
          : null
      );
      setValue(
        CAMPOS_DESINCORPORACION_MUEBLE.NO_PUBLICACION,
        detalleDesincorporacion.numeroPublicacion
      );
      setValue(
        CAMPOS_DESINCORPORACION_MUEBLE.DESCRIPCION_DESINCORPORACION,
        detalleDesincorporacion.descripcionDesincorporacion
      );
    }
  }, [complementos.detalleDesincorporacion]);

  const getStepContent = (step) => {
    switch (step) {
      default:
        return (
          <AdministradorMuebleDesincorporacionDatoGeneralForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            informacionExtra={informacionTablaSuperior}
          />
        );
    }
  };
  return (
    <DialogoEmergentePasos
      abierto={dialogo.abierto}
      titulo={tituloDialogo}
      pasos={pasosFormDesincorporacionMueble}
      indexActual={indexActual}
      indexError={indexError}
      cargando={cargando}
      handleEnviar={handleSubmitDesincorporacionMueble}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default AdministradorMuebleDesincorporacionForm;
