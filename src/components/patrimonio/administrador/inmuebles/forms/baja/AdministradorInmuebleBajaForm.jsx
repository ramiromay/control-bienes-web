import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import useFormPasos from "../../../../../../context/useFormPasos";
import {
  altaInmuebleValidacion,
  bajaInmuebleValidacion,
  muebleAltaValidacion,
  vehiculoAltaValidacion,
} from "../../../../../../settings/validacionConfig";

import {
  getCaracteristicas,
  getClasesVehiculares,
  getClavesVehiculares,
  getColores,
  getCombustiblesVehiculares,
  getEstadoFisico,
  getFamilias,
  getLineasVehiculares,
  getMarcas,
  getOrigenesValor,
  getResponsables,
  getSubfamilias,
  getTiposAdquisiciones,
  getTiposAfectacion,
  getTiposInmuebles,
  getTiposVehiculares,
  getUbicaciones,
  getUsosInmuebles,
  getVersionesVehiculares,
} from "../../../../../../services/catalogo";
import {
  getBMS,
  getMunicipios,
  getUnidadesAdministrativas,
} from "../../../../../../services/general";
import {
  mapArray,
  stringToIDs,
  stringToRow,
} from "../../../../../../settings/utils";
import {
  compBmsMapppingRules,
  compUnidadAdministrativaMappingRules,
} from "../../../../../../settings/mappingRulesConfig";
import { useSnackbar } from "../../../../../../context/SnackbarContext";
import {
  CAMPOS_ALTA_INMUEBLE,
  CAMPOS_ALTA_MUEBLE,
  CAMPOS_ALTA_VEHICULO,
  CAMPOS_BAJA_INMUEBLE,
} from "../../../../../../settings/formConfig";
import { useAdministradorInmueble } from "../../../../../../context/AdministradorInmuebleContext";
import { MOTIVO_TRAMITE } from "../../../../../../settings/sistemaConfig";
import AdministradorInmuebleBajaInmuebleForm from "./AdministradorInmuebleBajaInmuebleForm";
import {
  getBienesInventarioPorTipo,
  getClasificacionConac,
  getTiposDominios,
} from "../../../../../../services/patrimonio";
import { DATE_FORMAT } from "../../../../../../settings/appConstants";
import dayjs from "dayjs";

const pasosFormAltaMueble = ["Baja Inmueble"];

const AdministradorInmuebleBajaForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarBajaInmueble,
    handleCargarTramites,
    handleGetTramiteBajaInmueble,
  } = useAdministradorInmueble();
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
  const { showSnackbar } = useSnackbar();
  const { tablaSuperior, tablaInferior } = filaSeleccionada;
  const [cargando, setCargando] = useState(true);
  const [complementos, setComplementos] = useState({
    bienes: [],
    detalleBaja: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Baja Bien Inmueble");

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: bajaInmuebleValidacion,
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormAltaMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  const handleSubmitBajaInmueble = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarBajaInmueble({
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
      getBienesInventarioPorTipo({
        idTipoBien: 4,
        detalleSolicitud: idDetalleSolicitud,
      }),
      handleGetTramiteBajaInmueble({ filaSeleccionada: tablaInferior }),
    ])
      .then(([bienes, detalleBaja]) => {
        setComplementos({
          bienes,
          detalleBaja, // Detalle de alta
        });
      })
      .catch((error) => {
        handleCloseForm();
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    const { bienes, detalleBaja } = complementos;
    if (detalleBaja) {
      console.log(bienes);
      console.log(detalleBaja);
      setValue(CAMPOS_BAJA_INMUEBLE.ID_SOLICITUD, detalleBaja.idSolicitud);
      setValue(CAMPOS_BAJA_INMUEBLE.FOLIO_BIEN, detalleBaja.folioBien);
      setValue(
        CAMPOS_BAJA_INMUEBLE.ID_BIEN_PATRIMONIO,
        bienes.find((e) => e.idBien == detalleBaja.idBienPatrimonio)
      );
      setValue(
        CAMPOS_BAJA_INMUEBLE.FECHA_DESINCORPORACION,
        dayjs(detalleBaja.fechaDesincorporacion)
      );
      setValue(CAMPOS_BAJA_INMUEBLE.FECHA_BAJA, dayjs(detalleBaja.fechaBaja));
      setValue(
        CAMPOS_BAJA_INMUEBLE.FECHA_BAJA_SISTEMA,
        dayjs(detalleBaja.fechaBajaSistema)
      );
      setValue(CAMPOS_BAJA_INMUEBLE.VALOR_BAJA, detalleBaja.valorBaja);
      setValue(CAMPOS_BAJA_INMUEBLE.A_FAVOR, detalleBaja.aFavor);
      setValue(CAMPOS_BAJA_INMUEBLE.DESTINO_BIEN, detalleBaja.destinoBien);
      setValue(
        CAMPOS_BAJA_INMUEBLE.ESCRITURA_TITULO,
        detalleBaja.escrituraTitulo
      );
      setValue(
        CAMPOS_BAJA_INMUEBLE.JUSTIFICACION_BAJA,
        detalleBaja.justificacionBaja
      );
    }
  }, [complementos.detalleBaja]);

  const getStepContent = (step) => {
    switch (step) {
      default:
        return (
          <AdministradorInmuebleBajaInmuebleForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            informacionTablaSuperior={informacionTablaSuperior}
          />
        );
    }
  };

  return (
    <DialogoEmergentePasos
      abierto={dialogo.abierto}
      titulo={tituloDialogo}
      pasos={pasosFormAltaMueble}
      indexActual={indexActual}
      indexError={indexError}
      cargando={cargando}
      handleEnviar={handleSubmitBajaInmueble}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default AdministradorInmuebleBajaForm;
