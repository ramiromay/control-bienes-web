import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useAdministradorMueble } from "../../../../../../context/AdministradorMuebleContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import useFormPasos from "../../../../../../context/useFormPasos";
import AdministradorMuebleBajaDocumentoForm from "./AdministradorMuebleBajaDocumentoForm";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import { muebleBajaValidacion } from "../../../../../../settings/validacionConfig";
import { getBienesInventarioPorTipo } from "../../../../../../services/patrimonio";
import { getUnidadesAdministrativas } from "../../../../../../services/general";
import { compUnidadAdministrativaMappingRules } from "../../../../../../settings/mappingRulesConfig";
import { mapArray } from "../../../../../../settings/utils";
import { getDocumentos } from "../../../../../../services/catalogo";
import { useSnackbar } from "../../../../../../context/SnackbarContext";
import AdministradorMuebleBajaDatoGeneralForm from "../baja/AdministradorMuebleBajaDatoGeneralForm";
import { useEffect, useState } from "react";
import { CAMPOS_BAJA_MUEBLE } from "../../../../../../settings/formConfig";
import dayjs from "dayjs";

const formDatoGeneral = 0;
const pasosBajaMueble = ["Datos Generales", "Documentos"];

const AdministradorMuebleBajaForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleCargarTramites,
    handleEnviarBajaMueble,
    handleGetTramiteBajaMueble,
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
    documentos: [],
    unidadesAdministrativas: [],
    bienes: [],
    detalleBaja: null,
  });

  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Baja Bien Mueble");

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: muebleBajaValidacion,
    handleClose: handleCerrarDialogo,
    stepsLength: pasosBajaMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;
  const { showSnackbar } = useSnackbar();

  const handleSubmitBajaMueble = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarBajaMueble({
      filaSeleccionada: tablaInferior,
      formData: data,
      esCreacion: esCreacion,
    })
      .then(() => {
        handleCloseForm();
        const mensaje = esCreacion
          ? "Tramite de baja creado correctamente"
          : "Tramite de baja modificado correctamente";
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
      getDocumentos(),
      getBienesInventarioPorTipo({
        idTipoBien: 1,
        detalleSolicitud: idDetalleSolicitud,
      }),
      getUnidadesAdministrativas({ desdeNivel: 3, hastaNivel: 3 }),
      handleGetTramiteBajaMueble({ filaSeleccionada: tablaInferior }),
    ])
      .then(
        ([
          documentosData,
          bienes,
          unidadesAdministrativasData,
          detalleBaja,
        ]) => {
          const unidadesAdministrativas = mapArray(
            unidadesAdministrativasData,
            compUnidadAdministrativaMappingRules
          );
          const documentos = documentosData.filter(
            (e) =>
              e.idSubModulo === 1 &&
              e.idMotivoTramite === informacionTablaSuperior.idMotivoTramite
          );
          setComplementos({
            documentos: documentos,
            bienes: bienes,
            unidadesAdministrativas,
            detalleBaja: detalleBaja,
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
    const { detalleBaja, unidadesAdministrativas, bienes, documentos } =
      complementos;
    if (detalleBaja) {
      const bienesFolio = detalleBaja.folioBien.split(",");
      const documentosFolios = detalleBaja.documentos
        ? detalleBaja.documentos.split(",")
        : [];
      setValue(
        CAMPOS_BAJA_MUEBLE.FOLIO_SOLICITUD,
        detalleBaja.idSolicitud || null
      );
      setValue(
        CAMPOS_BAJA_MUEBLE.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleBaja.nivelUnidadAdministrativa
        ) || null
      );
      setValue(
        CAMPOS_BAJA_MUEBLE.FOLIO_BIEN,
        bienes.filter((e) => bienesFolio.includes(e.folioBien)) || null
      );
      setValue(
        CAMPOS_BAJA_MUEBLE.OBSERVACIONES,
        detalleBaja.observaciones || null
      );
      setValue(
        CAMPOS_BAJA_MUEBLE.FOLIO_DOCUMENTO,
        detalleBaja.folioDocumento || null
      );
      setValue(
        CAMPOS_BAJA_MUEBLE.FECHA_DOCUMENTO,
        detalleBaja.fehaDocumento ? dayjs(detalleBaja.fehaDocumento) : null
      ); // Puedes formatear la fecha si es necesario
      setValue(
        CAMPOS_BAJA_MUEBLE.LISTA_DOCUMENTO,
        documentos.filter((e) => documentosFolios.includes(e.id)) || null
      );
      setValue(
        CAMPOS_BAJA_MUEBLE.NOMBRE_SOLICITANTE,
        detalleBaja.nombreSolicitante || null
      );
      setValue(
        CAMPOS_BAJA_MUEBLE.LUGAR_RESGUARDO,
        detalleBaja.lugarResguardo || null
      );
    }
  }, [complementos.detalleBaja]);

  const getStepContent = (step) => {
    switch (step) {
      case formDatoGeneral:
        return (
          <AdministradorMuebleBajaDatoGeneralForm
            formManager={formManager}
            complementos={complementos}
            esVisualizacion={esVisualizacion}
            solicitudSeleccionada={tablaSuperior[0]}
          />
        );
      default:
        return (
          <AdministradorMuebleBajaDocumentoForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
          />
        );
    }
  };

  return (
    <DialogoEmergentePasos
      abierto={dialogo.abierto}
      titulo={tituloDialogo}
      pasos={pasosBajaMueble}
      indexActual={indexActual}
      indexError={indexError}
      cargando={cargando}
      handleEnviar={handleSubmitBajaMueble}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default AdministradorMuebleBajaForm;
