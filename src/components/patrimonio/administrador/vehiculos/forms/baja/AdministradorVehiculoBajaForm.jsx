import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import useFormPasos from "../../../../../../context/useFormPasos";

import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import { vehiculoBajaValidacion } from "../../../../../../settings/validacionConfig";
import { getBienesInventarioPorTipo } from "../../../../../../services/patrimonio";
import { getUnidadesAdministrativas } from "../../../../../../services/general";
import {
  compEmpleadoMappingRules,
  compUnidadAdministrativaMappingRules,
} from "../../../../../../settings/mappingRulesConfig";
import { mapArray } from "../../../../../../settings/utils";
import { getDocumentos } from "../../../../../../services/catalogo";
import { useSnackbar } from "../../../../../../context/SnackbarContext";
import { useEffect, useState } from "react";
import { CAMPOS_BAJA_VEHICULO } from "../../../../../../settings/formConfig";
import dayjs from "dayjs";
import { useAdministradorVehiculo } from "../../../../../../context/AdministradorVehiculoContext";
import AdministradorVehiculoBajaDatoGeneralForm from "./AdministradorVehiculoBajaDatoGeneralForm";
import AdministradorVehiculoBajaDocumentoForm from "./AdministradorVehiculoBajaDocumentoForm";
import { getEmpleados } from "../../../../../../services/seguridad";

const formDatoGeneral = 0;
const pasosBajaMueble = ["Datos Generales", "Documentos"];

const AdministradorVehiculoBajaForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleCargarTramites,
    handleEnviarBajaVehiculo,
    handleGetTramiteBajaVehiculo,
  } = useAdministradorVehiculo();
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
    empleados: [],
    documentos: [],
    unidadesAdministrativas: [],
    bienes: [],
    detalleBaja: null,
  });

  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Baja Bien Vehículo");

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: vehiculoBajaValidacion,
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
    await handleEnviarBajaVehiculo({
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
      getEmpleados(),
      getDocumentos(),
      getBienesInventarioPorTipo({
        idTipoBien: 3,
        detalleSolicitud: idDetalleSolicitud,
      }),
      getUnidadesAdministrativas({ desdeNivel: 3, hastaNivel: 3 }),
      handleGetTramiteBajaVehiculo({ filaSeleccionada: tablaInferior }),
    ])
      .then(
        ([
          empleadosData,
          documentosData,
          bienes,
          unidadesAdministrativasData,
          detalleBaja,
        ]) => {
          const empleados = mapArray(empleadosData, compEmpleadoMappingRules);
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
            empleados: empleados,
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
    const {
      detalleBaja,
      empleados,
      unidadesAdministrativas,
      bienes,
      documentos,
    } = complementos;
    if (detalleBaja) {
      const bienesFolio = detalleBaja.folioBien.split(",");
      const documentosFolios = detalleBaja.documentos
        ? detalleBaja.documentos.split(",")
        : [];
      setValue(
        CAMPOS_BAJA_VEHICULO.FOLIO_SOLICITUD,
        detalleBaja.idSolicitud || null
      );
      setValue(
        CAMPOS_BAJA_VEHICULO.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleBaja.nivelUnidadAdministrativa
        ) || null
      );
      setValue(
        CAMPOS_BAJA_VEHICULO.EMPLEADO,
        empleados.find((e) => e.id === detalleBaja.idEmpleado) || null
      );
      setValue(
        CAMPOS_BAJA_VEHICULO.FOLIO_BIEN,
        bienes.filter((e) => bienesFolio.includes(e.folioBien)) || null
      );
      setValue(
        CAMPOS_BAJA_VEHICULO.OBSERVACIONES,
        detalleBaja.observaciones || null
      );
      setValue(
        CAMPOS_BAJA_VEHICULO.FOLIO_DOCUMENTO,
        detalleBaja.folioDictamen || null
      );
      setValue(
        CAMPOS_BAJA_VEHICULO.FECHA_DOCUMENTO,
        detalleBaja.fechaDocumento ? dayjs(detalleBaja.fechaDocumento) : null
      ); // Puedes formatear la fecha si es necesario
      setValue(
        CAMPOS_BAJA_VEHICULO.LISTA_DOCUMENTO,
        documentos.filter((e) => documentosFolios.includes(e.id)) || null
      );
    }
  }, [complementos.detalleBaja]);

  const getStepContent = (step) => {
    switch (step) {
      case formDatoGeneral:
        return (
          <AdministradorVehiculoBajaDatoGeneralForm
            formManager={formManager}
            complementos={complementos}
            esVisualizacion={esVisualizacion}
            solicitudSeleccionada={tablaSuperior[0]}
          />
        );
      default:
        return (
          <AdministradorVehiculoBajaDocumentoForm
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

export default AdministradorVehiculoBajaForm;
