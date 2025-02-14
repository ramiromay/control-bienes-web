import React, { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useAdministradorMueble } from "../../../../../../context/AdministradorMuebleContext";
import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import useFormPasos from "../../../../../../context/useFormPasos";
import { muebleDestinoFinalValidacion } from "../../../../../../settings/validacionConfig";
import AdministradorMuebleDestinoFinalDatoGeneralForm from "./AdministradorMuebleDestinoFinalDatoGeneralForm";
import { useSnackbar } from "../../../../../../context/SnackbarContext";
import { getBienesInventarioPorTipo } from "../../../../../../services/patrimonio";
import { getUnidadesAdministrativas } from "../../../../../../services/general";
import { compUnidadAdministrativaMappingRules } from "../../../../../../settings/mappingRulesConfig";
import { mapArray } from "../../../../../../settings/utils";
import {
  CAMPOS_DESINCORPORACION_MUEBLE,
  CAMPOS_DESTINO_FINAL_MUEBLE,
} from "../../../../../../settings/formConfig";
import dayjs from "dayjs";

const pasosFormDestinoFinal = ["Datos Generales"];
const AdministradorMuebleDestinoFinalForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarDestinoFinalMueble,
    handleCargarTramites,
    handleGetTramiteDestinoFinalMueble,
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
    detalleDestinoFinal: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Destino Final Bien Mueble");
  const { showSnackbar } = useSnackbar();
  const esEnajenacion = informacionTablaSuperior.idMotivoTramite === 29;

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: muebleDestinoFinalValidacion(
      informacionTablaSuperior.idMotivoTramite
    ),
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormDestinoFinal.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  const handleSubmitDestinoFinalMueble = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarDestinoFinalMueble({
      filaSeleccionada: tablaInferior,
      formData: data,
      esCreacion: esCreacion,
    })
      .then(() => {
        handleCloseForm();
        const mensaje = esCreacion
          ? "Tramite de destino final creado correctamente"
          : "Tramite de destino final modificado correctamente";
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
      handleGetTramiteDestinoFinalMueble({ filaSeleccionada: tablaInferior }),
    ])
      .then(([unidadesAdministrativasData, bienes, detalleDestinoFinal]) => {
        const unidadesAdministrativas = mapArray(
          unidadesAdministrativasData,
          compUnidadAdministrativaMappingRules
        );
        setValue(
          CAMPOS_DESTINO_FINAL_MUEBLE.MOTIVO_TRAMITE,
          informacionTablaSuperior.idMotivoTramite
        );
        setComplementos({
          bienes: bienes,
          unidadesAdministrativas: unidadesAdministrativas,
          detalleDestinoFinal: detalleDestinoFinal,
        });
      })
      .catch((error) => {
        handleError(error);
        console.log(error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    const { detalleDestinoFinal, bienes, unidadesAdministrativas } =
      complementos;
    if (detalleDestinoFinal) {
      //   idSolicitud: 70014,
      // nivelUnidadAdministrativa: '18.1.2',
      // folioBien: 'BM00000011,BM00000010',
      // folioDestruccion: 'NA',
      // fechaDestruccion: '2025-11-17T00:00:00',
      // descripcionDestruccion: 'aos xd',
      console.log(detalleDestinoFinal);

      const foliosBien = detalleDestinoFinal.folioBien.split(",");
      console.log(detalleDestinoFinal);
      setValue(
        CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_SOLICITUD,
        detalleDestinoFinal.idSolicitud
      );
      setValue(
        CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_BIEN,
        bienes.filter((e) => foliosBien.includes(e.folioBien))
      );
      setValue(
        CAMPOS_DESTINO_FINAL_MUEBLE.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleDestinoFinal.nivelUnidadAdministrativa
        )
      );
      if (informacionTablaSuperior.idMotivoTramite === 28) {
        setValue(
          CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_DESTRUCCION,
          detalleDestinoFinal.folioDestruccion
        );
        setValue(
          CAMPOS_DESTINO_FINAL_MUEBLE.FECHA_DESTRUCCION,
          detalleDestinoFinal.fechaDestruccion
            ? dayjs(detalleDestinoFinal.fechaDestruccion)
            : null
        );
        setValue(
          CAMPOS_DESTINO_FINAL_MUEBLE.DESCRIPCION_DESTRUCCION,
          detalleDestinoFinal.descripcionDestruccion
        );
      } else if (informacionTablaSuperior.idMotivoTramite === 29) {
        // folioEnajenacion: null,
        // fechaEnajenacion: null,
        // avaluoEnajenacion: null,
        // importeAvaluoEnajenacion: null,
        // importeEnajenacion: null,
        // descripcionEnajenacion: null
        setValue(
          CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_ENAJENACION,
          detalleDestinoFinal.folioEnajenacion
        );
        setValue(
          CAMPOS_DESTINO_FINAL_MUEBLE.FECHA_ENAJENACION,
          detalleDestinoFinal.fechaEnajenacion
            ? dayjs(detalleDestinoFinal.fechaEnajenacion)
            : null
        );
        setValue(
          CAMPOS_DESTINO_FINAL_MUEBLE.AVALUO_ENAJENACION,
          detalleDestinoFinal.avaluoEnajenacion
        );
        setValue(
          CAMPOS_DESTINO_FINAL_MUEBLE.IMPORTE_ENAJENACION,
          detalleDestinoFinal.importeAvaluoEnajenacion
        );
        setValue(
          CAMPOS_DESTINO_FINAL_MUEBLE.DESCRIPCION_ENAJENACION,
          detalleDestinoFinal.descripcionEnajenacion
        );
      }
    }
  }, [complementos.detalleDestinoFinal]);

  const getStepContent = (step) => {
    switch (step) {
      default:
        return (
          <AdministradorMuebleDestinoFinalDatoGeneralForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esEnajenacion={esEnajenacion}
            informacionExtra={informacionTablaSuperior}
          />
        );
    }
  };
  return (
    <DialogoEmergentePasos
      abierto={dialogo.abierto}
      titulo={tituloDialogo}
      pasos={pasosFormDestinoFinal}
      indexActual={indexActual}
      indexError={indexError}
      cargando={cargando}
      handleEnviar={handleSubmitDestinoFinalMueble}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default AdministradorMuebleDestinoFinalForm;
