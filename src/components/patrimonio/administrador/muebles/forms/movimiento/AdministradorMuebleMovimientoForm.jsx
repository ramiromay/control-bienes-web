import React, { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import useFormPasos from "../../../../../../context/useFormPasos";
import {
  mueveMovimientoValidacion,
  solicitudMuebleValidacion,
} from "../../../../../../settings/validacionConfig";
import { useAdministradorMueble } from "../../../../../../context/AdministradorMuebleContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import { CAMPOS_MOVIMIENTO_MUEBLE } from "../../../../../../settings/formConfig";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import FormCampoAutocompletarMultiple from "../../../../../utils/FormCampoAutocompletarMultiple";
import AdministradorMuebleMovimientoDatoGeneralForm from "./AdministradorMuebleMovimientoDatoGeneralForm";
import { useSnackbar } from "../../../../../../context/SnackbarContext";
import { compUnidadAdministrativaMappingRules } from "../../../../../../settings/mappingRulesConfig";
import { mapArray } from "../../../../../../settings/utils";
import {
  getMunicipios,
  getUnidadesAdministrativas,
} from "../../../../../../services/general";
import { getBienesInventarioPorTipo } from "../../../../../../services/patrimonio";
import {
  getResponsables,
  getUbicaciones,
} from "../../../../../../services/catalogo";

const pasosFormMovimientoMueble = ["Datos Generales"];

const AdministradorMuebleMovimientoForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleCargarTramites,
    handleGetTramiteMovimientoMueble,
    handleEnviarTramiteMomientoMueble,
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
    responsables: [],
    ubicaciones: [],
    municipios: [],
    detalleMovimiento: null,
  });

  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Movimiento Bien Mueble");
  const { showSnackbar } = useSnackbar();

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: mueveMovimientoValidacion(
      informacionTablaSuperior.idMotivoTramite
    ),
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormMovimientoMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  const handleSubmitMovimientoMueble = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarTramiteMomientoMueble({
      filaSeleccionada: tablaInferior,
      formData: data,
      esCreacion: esCreacion,
    })
      .then(() => {
        handleCloseForm();
        const mensaje = esCreacion
          ? "Tramite de movimiento creado correctamente"
          : "Tramite de movimiento modificado correctamente";
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
      getUbicaciones(),
      getMunicipios(),
      getResponsables(),
      getUnidadesAdministrativas({ desdeNivel: 3, hastaNivel: 3 }),
      getBienesInventarioPorTipo({
        idTipoBien: 1,
        detalleSolicitud: idDetalleSolicitud,
      }),
      handleGetTramiteMovimientoMueble({ filaSeleccionada: tablaInferior }),
    ])
      .then(
        ([
          ubicaciones,
          municipios,
          responsables,
          unidadesAdministrativasData,
          bienes,
          detalleMovimiento,
        ]) => {
          const unidadesAdministrativas = mapArray(
            unidadesAdministrativasData,
            compUnidadAdministrativaMappingRules
          );
          setValue(
            CAMPOS_MOVIMIENTO_MUEBLE.MOTIVO_TRAMITE,
            informacionTablaSuperior.idMotivoTramite
          );
          setComplementos({
            ubicaciones: ubicaciones,
            municipios: municipios,
            bienes: bienes,
            unidadesAdministrativas,
            responsables: responsables,
            detalleMovimiento: detalleMovimiento,
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
      detalleMovimiento,
      ubicaciones,
      responsables,
      unidadesAdministrativas,
      municipios,
      bienes,
    } = complementos;
    if (detalleMovimiento) {
      // {
      //   idSolicitud: 70012,
      //   nivelUnidadAdministrativa: '18.1.1',
      //   folioBien: 'BM00000007',
      //   nivelNuevaUnidadAdministrativa: '18.1.2',
      //   idMunicipio: 2,
      //   idUbicacion: 2,
      //   responsable: null
      // }

      console.log(detalleMovimiento.folioBien);
      console.log(informacionTablaInferior);
      const foliosBien = detalleMovimiento.folioBien.split(",");
      const idsResponsables = detalleMovimiento.responsable
        ? detalleMovimiento.responsable.split(",").map((e) => Number(e))
        : [];
      setValue(
        CAMPOS_MOVIMIENTO_MUEBLE.FOLIO_SOLICITUD,
        detalleMovimiento.idSolicitud
      );
      setValue(
        CAMPOS_MOVIMIENTO_MUEBLE.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleMovimiento.nivelUnidadAdministrativa
        )
      );
      setValue(
        CAMPOS_MOVIMIENTO_MUEBLE.FOLIO_BIEN,
        bienes.filter((e) => foliosBien.includes(e.folioBien))
      );
      if (
        informacionTablaSuperior.idMotivoTramite === 26 ||
        informacionTablaSuperior.idMotivoTramite === 24
      ) {
        setValue(
          CAMPOS_MOVIMIENTO_MUEBLE.NUEVO_CENTRO_COSTO,
          unidadesAdministrativas.find(
            (e) => e.id === detalleMovimiento.nivelNuevaUnidadAdministrativa
          )
        );
      }

      setValue(
        CAMPOS_MOVIMIENTO_MUEBLE.MUNICIPIO,
        municipios.find((e) => e.id === detalleMovimiento.idMunicipio)
      );
      setValue(
        CAMPOS_MOVIMIENTO_MUEBLE.UBICACION,
        ubicaciones.find((e) => e.id === detalleMovimiento.idUbicacion)
      );

      if (informacionTablaSuperior.idMotivoTramite === 25) {
        setValue(
          CAMPOS_MOVIMIENTO_MUEBLE.NUEVO_RESGUARDANTE,
          responsables.filter((e) => idsResponsables.includes(e.id))
        );
      }
    }
  }, [complementos.detalleMovimiento]);

  const getStepContent = (step) => {
    switch (step) {
      default:
        return (
          <AdministradorMuebleMovimientoDatoGeneralForm
            complementos={complementos}
            esVisualizacion={esVisualizacion}
            formManager={formManager}
            informacionExtra={informacionTablaSuperior}
          />
        );
    }
  };

  return (
    <DialogoEmergentePasos
      abierto={dialogo.abierto}
      titulo={tituloDialogo}
      pasos={pasosFormMovimientoMueble}
      indexActual={indexActual}
      indexError={indexError}
      cargando={cargando}
      handleEnviar={handleSubmitMovimientoMueble}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default AdministradorMuebleMovimientoForm;
