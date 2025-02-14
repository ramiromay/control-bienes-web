import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import useFormPasos from "../../../../../../context/useFormPasos";
import {
  muebleAltaValidacion,
  vehiculoAltaValidacion,
} from "../../../../../../settings/validacionConfig";
import AdministradorVehiculoModificacionCaracteristicasForm from "./AdministradorVehiculoModificacionCaracteristicasForm";

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
  getResponsables,
  getSubfamilias,
  getTiposAdquisiciones,
  getTiposVehiculares,
  getUbicaciones,
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
import { CAMPOS_MODIFICACION_VEHICULO } from "../../../../../../settings/formConfig";
import dayjs from "dayjs";
import { useAdministradorVehiculo } from "../../../../../../context/AdministradorVehiculoContext";
import AdministradorVehiculoModificacionDatoBienForm from "./AdministradorVehiculoModificacionDatoBienForm";
import AdministradorVehiculoModificacionDatoAdquisicionForm from "./AdministradorVehiculoModificacionDatoAdquisicionForm";
import AdministradorVehiculoModificacionDatoGeneralForm from "./AdministradorVehiculoModificacionDatoGeneralForm";
import AdministradorVehiculoModificacionResponsableForm from "./AdministradorVehiculoModificacionResponsableForm";
import { getBienesInventarioPorTipo } from "../../../../../../services/patrimonio";
import { MOTIVO_TRAMITE } from "../../../../../../settings/sistemaConfig";

const formDatosBien = 0;
const formDatosAdquisicion = 1;
const formDatosGenerales = 2;
const formCaracteristicas = 3;
const pasosFormAltaMueble = [
  "Datos del Bien",
  "Datos de Adquisición",
  "Datos Generales",
  "Características",
  "Responsable",
];

const AdministradorVehiculoModificacionForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarTramiteModificacionVehiculo,
    handleCargarTramites,
    handleGetTramiteModificacionVehiculo,
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
  const { showSnackbar } = useSnackbar();
  const { tablaSuperior, tablaInferior } = filaSeleccionada;
  const [cargando, setCargando] = useState(true);
  const [complementos, setComplementos] = useState({
    bienes: [],
    familias: [],
    subfamilias: [],
    bms: [],
    unidadesAdministrativas: [],
    tiposAdquisicion: [],
    estadosFisicos: [],
    marcas: [],
    colores: [],
    claves: [],
    clases: [],
    combustibles: [],
    tipos: [],
    versiones: [],
    lineas: [],
    ubicaciones: [],
    municipios: [],
    caracteristicas: [],
    responsables: [],
    detalleModificacion: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Modificación Bien Vehículo");

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: vehiculoAltaValidacion,
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormAltaMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;
  const esModificacionFactura =
    informacionTablaSuperior.idMotivoTramite ===
    MOTIVO_TRAMITE.ACTUALIZACION_DE_DATOS_DE_LA_FACTURA_DE_BIENES_VEHICULOS;

  const handleSubmitAltaVehiculo = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarTramiteModificacionVehiculo({
      filaSeleccionada: tablaInferior,
      formData: data,
      esCreacion: esCreacion,
    })
      .then(() => {
        handleCloseForm();
        const mensaje = esCreacion
          ? "Tramite de alta creado correctamente"
          : "Tramite de alta modificado correctamente";
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
        idTipoBien: 3,
        detalleSolicitud: idDetalleSolicitud,
      }),
      getFamilias(),
      getSubfamilias(),
      getBMS(),
      getUnidadesAdministrativas({ desdeNivel: 3, hastaNivel: 3 }),
      getTiposAdquisiciones(),
      getEstadoFisico(),
      getMarcas(),
      getColores(),
      getClavesVehiculares(),
      getClasesVehiculares(),
      getCombustiblesVehiculares(),
      getTiposVehiculares(),
      getVersionesVehiculares(),
      getLineasVehiculares(),
      getUbicaciones(),
      getMunicipios(),
      getCaracteristicas(),
      getResponsables(),
      handleGetTramiteModificacionVehiculo({ filaSeleccionada: tablaInferior }),
    ])
      .then(
        ([
          bienes,
          familiasData,
          subfamilias,
          bmsData,
          unidadesAdministrativasData,
          tiposAdquisiciones,
          estadosFisicos,
          marcas,
          colores,
          claves,
          clases,
          combustibles,
          tipos,
          versiones,
          lineas,
          ubicaciones,
          municipios,
          caracteristicas,
          responsables,
          detalleModificacionData,
        ]) => {
          const bms = mapArray(bmsData, compBmsMapppingRules);
          const unidadesAdministrativas = mapArray(
            unidadesAdministrativasData,
            compUnidadAdministrativaMappingRules
          );
          const familias = familiasData.filter(
            (familia) => familia.id === 5400
          );
          setValue(
            CAMPOS_MODIFICACION_VEHICULO.MOTIVO_TRAMITE,
            informacionTablaSuperior.idMotivoTramite
          );
          setComplementos({
            bienes: bienes,
            familias: familias,
            subfamilias: subfamilias,
            bms: bms,
            unidadesAdministrativas: unidadesAdministrativas,
            tiposAdquisicion: tiposAdquisiciones,
            estadosFisicos: estadosFisicos,
            marcas: marcas,
            colores: colores,
            ubicaciones: ubicaciones,
            municipios: municipios,
            caracteristicas: caracteristicas,
            responsables: responsables,
            detalleModificacion: detalleModificacionData,
            claves: claves,
            clases: clases,
            combustibles: combustibles,
            tipos: tipos,
            versiones: versiones,
            lineas: lineas,
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
      detalleModificacion,
      familias,
      subfamilias,
      tiposAdquisicion,
      bms,
      caracteristicas,
      estadosFisicos,
      marcas,
      colores,
      ubicaciones,
      municipios,
      unidadesAdministrativas,
      responsables,
      clases,
      claves,
      versiones,
      tipos,
      lineas,
      combustibles,
      bienes,
    } = complementos;
    if (detalleModificacion) {
      const idsCaracteristicas = stringToIDs(
        detalleModificacion.caracteristicas,
        "folio"
      );
      const caracteristicasSelect = caracteristicas.filter((e) =>
        idsCaracteristicas.includes(e.id)
      );
      const filasTabla = stringToRow(detalleModificacion.caracteristicas);
      const idsResponsables = detalleModificacion.responsables
        .split(",")
        .map((e) => Number(e));
      const responsablesSelect = responsables.filter((e) =>
        idsResponsables.includes(e.id)
      );
      const bien = bienes.find(
        (e) => e.idBien === detalleModificacion.idBienPatrimonio
      );
      setValue(CAMPOS_MODIFICACION_VEHICULO.BIEN, bien);
      setValue(CAMPOS_MODIFICACION_VEHICULO.FOLIO_BIEN, bien.folioBien);
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.CUENTA_POR_PAGAR,
        detalleModificacion.cuentaPorPagar ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.SUSTITUYE_BV,
        detalleModificacion.sustituyeBV ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.ANIO_EMICION,
        detalleModificacion.anioEmicion ?? ""
      );
      //
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.NUMERO_PLACA,
        detalleModificacion.numeroPlaca ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.NUMERO_MOTOR,
        detalleModificacion.numeroMotor ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.ANIO_MODELO,
        detalleModificacion.anioModelo ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.NUMERO_ECONOMICO,
        detalleModificacion.numeroEconomico ?? ""
      );
      // idClave: null,
      // idLinea: null,
      // idVersion: null,
      // idClase: null,
      // idTipo: null,
      // idCombustible: null,
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.ID_CLAVE,
        claves.find((e) => e.id === detalleModificacion.idClave)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.ID_LINEA,
        lineas.find((e) => e.id === detalleModificacion.idLinea)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.ID_VERSION,
        versiones.find((e) => e.id === detalleModificacion.idVersion)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.ID_CLASE,
        clases.find((e) => e.id === detalleModificacion.idClase)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.ID_TIPO,
        tipos.find((e) => e.id === detalleModificacion.idTipo)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.ID_COMBUSTIBLE,
        combustibles.find((e) => e.id === detalleModificacion.idCombustible)
      );

      setValue(
        CAMPOS_MODIFICACION_VEHICULO.SOLICITUD,
        detalleModificacion.idSolicitud ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.NUMERO_BIENES,
        detalleModificacion.numeroBienes ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.PARTIDA,
        detalleModificacion.partida ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.PARTIDA_ESPECIFICA,
        detalleModificacion.partidaEspecifica ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.CUENTA_ACTIVO,
        detalleModificacion.referenciaActivo ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.CUENTA_ACTUALIZACION,
        detalleModificacion.referenciaActualizacion ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.FAMILIA,
        familias.find((e) => e.id === detalleModificacion.idFamilia)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.SUBFAMILIA,
        subfamilias.find((e) => e.id === detalleModificacion.idSubfamilia)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.BMS,
        bms.find((bien) => bien.id === detalleModificacion.idBms)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.DESCRIPCION,
        detalleModificacion.descripcion ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleModificacion.nivelUnidadAdministrativa
        )
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.CENTRO_COSTO,
        unidadesAdministrativas.find(
          (e) => e.id === detalleModificacion.nivelUnidadAdministrativa
        )
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.REQUISICION,
        detalleModificacion.requisicion ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.ORDEN_COMPRA,
        detalleModificacion.ordenCompra ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.TIPO_ADQUISICION,
        tiposAdquisicion.find(
          (e) => e.id === detalleModificacion.idTipoAdquisicion
        )
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.NO_SERIES,
        detalleModificacion.noSeries ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.FOLIO_ANTERIOR,
        detalleModificacion.folioAnterior ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.NO_LICITACION,
        detalleModificacion.noLicitacion ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.FECHA_LICITACION,
        detalleModificacion.fechaLicitacion
          ? dayjs(detalleModificacion.fechaLicitacion)
          : null
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.OBSERVACION_LICITACION,
        detalleModificacion.observacionLicitacion
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.ESTADO_FISICO,
        estadosFisicos.find((e) => e.id === detalleModificacion.idEstadoFisico)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.MARCA,
        marcas.find((e) => e.id === detalleModificacion.idMarca)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.COLOR,
        colores.find((e) => e.id === detalleModificacion.idColor)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.FOLIO_FACTURA,
        detalleModificacion.folioFactura ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.FECHA_FACTURA,
        dayjs(detalleModificacion.fechaFactura)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.PRECIO_UNITARIO,
        detalleModificacion.precioUnitario ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.FECHA_COMPRA,
        dayjs(detalleModificacion.fechaCompra)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.DIAS_GARANTIA,
        detalleModificacion.diasGarantia ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.VIDA_UTIL,
        detalleModificacion.vidaUtil ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.FECHA_INICIO_USO,
        dayjs(detalleModificacion.fechaInicioUso)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.PRECIO_DESECHABLE,
        detalleModificacion.precioDesechable ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.OBSERVACION_BIEN,
        detalleModificacion.observacionBien ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.UBICACION,
        ubicaciones.find((e) => e.id === detalleModificacion.idUbicacion)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.MUNICIPIO,
        municipios.find((e) => e.id === detalleModificacion.idMunicipio)
      );
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.CARACTERISTICAS,
        caracteristicasSelect
      );
      setValue(CAMPOS_MODIFICACION_VEHICULO.AUX_CARACTERISTICA, filasTabla);
      setValue(CAMPOS_MODIFICACION_VEHICULO.RESPONSABLES, responsablesSelect);
      setValue(
        CAMPOS_MODIFICACION_VEHICULO.OBSERVACION_RESPONSABLE,
        detalleModificacion.observacionResponsable ?? ""
      );
    }
  }, [complementos.detalleModificacion]);

  const getStepContent = (step) => {
    switch (step) {
      case formDatosBien:
        return (
          <AdministradorVehiculoModificacionDatoBienForm
            formManager={formManager}
            complementos={complementos}
            esVisualizacion={esVisualizacion}
            solicitudSeleccionada={tablaSuperior[0]}
            setCargando={setCargando}
            esModificacionFactura={esModificacionFactura}
          />
        );
      case formDatosAdquisicion:
        return (
          <AdministradorVehiculoModificacionDatoAdquisicionForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esModificacionFactura={esModificacionFactura}
          />
        );
      case formDatosGenerales:
        return (
          <AdministradorVehiculoModificacionDatoGeneralForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esModificacionFactura={esModificacionFactura}
          />
        );
      case formCaracteristicas:
        return (
          <AdministradorVehiculoModificacionCaracteristicasForm
            formManager={formManager}
            complementos={complementos}
            esVisualizacion={esVisualizacion}
            esModificacionFactura={esModificacionFactura}
          />
        );
      default:
        return (
          <AdministradorVehiculoModificacionResponsableForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esModificacion={!esVisualizacion && !esCreacion}
            esModificacionFactura={esModificacionFactura}
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
      handleEnviar={handleSubmitAltaVehiculo}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default AdministradorVehiculoModificacionForm;
