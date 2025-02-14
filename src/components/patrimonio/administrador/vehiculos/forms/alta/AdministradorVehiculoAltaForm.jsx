import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import useFormPasos from "../../../../../../context/useFormPasos";
import {
  muebleAltaValidacion,
  vehiculoAltaValidacion,
} from "../../../../../../settings/validacionConfig";
import AdministradorVehiculoAltaDatoBienForm from "./AdministradorVehiculoAltaDatoBienForm";
import AdministradorVehiculoAltaDatoAdquisicionForm from "./AdministradorVehiculoAltaDatoAdquisicionForm";
import AdministradorVehiculoAltaCaracteristicasForm from "./AdministradorVehiculoAltaCaracteristicasForm";
import AdministradorVehiculoAltaResponsableForm from "./AdministradorVehiculoAltaResponsableForm";

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
import {
  CAMPOS_ALTA_MUEBLE,
  CAMPOS_ALTA_VEHICULO,
} from "../../../../../../settings/formConfig";
import dayjs from "dayjs";
import AdministradorVehiculoAltaDatoGeneralForm from "./AdministradorVehiculoAltaDatoGeneralForm";
import { useAdministradorVehiculo } from "../../../../../../context/AdministradorVehiculoContext";

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

const AdministradorVehiculoAltaForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarTramiteAltaVehiculo,
    handleCargarTramites,
    handleGetTramiteAltaVehiculo,
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
  const { showSnackbar } = useSnackbar();
  const { tablaSuperior, tablaInferior } = filaSeleccionada;
  const [cargando, setCargando] = useState(true);
  const [complementos, setComplementos] = useState({
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
    detalleAlta: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Alta Bien Vehículo");

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

  const handleSubmitAltaVehiculo = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarTramiteAltaVehiculo({
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
    setCargando(true);
    Promise.all([
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
      handleGetTramiteAltaVehiculo({ filaSeleccionada: tablaInferior }),
    ])
      .then(
        ([
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
          detalleAltaData,
        ]) => {
          const bms = mapArray(bmsData, compBmsMapppingRules);
          const unidadesAdministrativas = mapArray(
            unidadesAdministrativasData,
            compUnidadAdministrativaMappingRules
          );
          const familias = familiasData.filter(
            (familia) => familia.id === 5400
          );
          setComplementos({
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
            detalleAlta: detalleAltaData,
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
      detalleAlta,
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
    } = complementos;
    if (detalleAlta) {
      const idsCaracteristicas = stringToIDs(
        detalleAlta.caracteristicas,
        "folio"
      );
      const caracteristicasSelect = caracteristicas.filter((e) =>
        idsCaracteristicas.includes(e.id)
      );
      const filasTabla = stringToRow(detalleAlta.caracteristicas);
      console.log(detalleAlta);

      const idsResponsables = detalleAlta.responsables
        .split(",")
        .map((e) => Number(e));
      const responsablesSelect = responsables.filter((e) =>
        idsResponsables.includes(e.id)
      );
      // cuentaPorPagar: null,
      // sustituyeBV: 'dsfdfdf',
      // anioEmicion: 0,
      // numeroPlaca: null,
      // numeroMotor: null,
      // anioModelo: 0,
      // numeroEconomico: 0,

      setValue(
        CAMPOS_ALTA_VEHICULO.CUENTA_POR_PAGAR,
        detalleAlta.cuentaPorPagar ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.SUSTITUYE_BV,
        detalleAlta.sustituyeBV ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.ANIO_EMICION,
        detalleAlta.anioEmicion ?? ""
      );
      //
      setValue(
        CAMPOS_ALTA_VEHICULO.NUMERO_PLACA,
        detalleAlta.numeroPlaca ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.NUMERO_MOTOR,
        detalleAlta.numeroMotor ?? ""
      );
      setValue(CAMPOS_ALTA_VEHICULO.ANIO_MODELO, detalleAlta.anioModelo ?? "");
      setValue(
        CAMPOS_ALTA_VEHICULO.NUMERO_ECONOMICO,
        detalleAlta.numeroEconomico ?? ""
      );
      // idClave: null,
      // idLinea: null,
      // idVersion: null,
      // idClase: null,
      // idTipo: null,
      // idCombustible: null,
      setValue(
        CAMPOS_ALTA_VEHICULO.ID_CLAVE,
        claves.find((e) => e.id === detalleAlta.idClave)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.ID_LINEA,
        lineas.find((e) => e.id === detalleAlta.idLinea)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.ID_VERSION,
        versiones.find((e) => e.id === detalleAlta.idVersion)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.ID_CLASE,
        clases.find((e) => e.id === detalleAlta.idClase)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.ID_TIPO,
        tipos.find((e) => e.id === detalleAlta.idTipo)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.ID_COMBUSTIBLE,
        combustibles.find((e) => e.id === detalleAlta.idCombustible)
      );

      setValue(CAMPOS_ALTA_VEHICULO.SOLICITUD, detalleAlta.idSolicitud ?? "");
      setValue(
        CAMPOS_ALTA_VEHICULO.NUMERO_BIENES,
        detalleAlta.numeroBienes ?? ""
      );
      setValue(CAMPOS_ALTA_VEHICULO.PARTIDA, detalleAlta.partida ?? "");
      setValue(
        CAMPOS_ALTA_VEHICULO.PARTIDA_ESPECIFICA,
        detalleAlta.partidaEspecifica ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.CUENTA_ACTIVO,
        detalleAlta.referenciaActivo ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.CUENTA_ACTUALIZACION,
        detalleAlta.referenciaActualizacion ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.FAMILIA,
        familias.find((e) => e.id === detalleAlta.idFamilia)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.SUBFAMILIA,
        subfamilias.find((e) => e.id === detalleAlta.idSubfamilia)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.BMS,
        bms.find((bien) => bien.id === detalleAlta.idBms)
      );
      setValue(CAMPOS_ALTA_VEHICULO.DESCRIPCION, detalleAlta.descripcion ?? "");
      setValue(
        CAMPOS_ALTA_VEHICULO.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleAlta.nivelUnidadAdministrativa
        )
      );
      setValue(CAMPOS_ALTA_VEHICULO.REQUISICION, detalleAlta.requisicion ?? "");
      setValue(
        CAMPOS_ALTA_VEHICULO.ORDEN_COMPRA,
        detalleAlta.ordenCompra ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.TIPO_ADQUISICION,
        tiposAdquisicion.find((e) => e.id === detalleAlta.idTipoAdquisicion)
      );
      setValue(CAMPOS_ALTA_VEHICULO.NO_SERIES, detalleAlta.noSeries ?? "");
      setValue(
        CAMPOS_ALTA_VEHICULO.FOLIO_ANTERIOR,
        detalleAlta.folioAnterior ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.NO_LICITACION,
        detalleAlta.noLicitacion ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.FECHA_LICITACION,
        detalleAlta.fechaLicitacion ? dayjs(detalleAlta.fechaLicitacion) : null
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.OBSERVACION_LICITACION,
        detalleAlta.observacionLicitacion
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.ESTADO_FISICO,
        estadosFisicos.find((e) => e.id === detalleAlta.idEstadoFisico)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.MARCA,
        marcas.find((e) => e.id === detalleAlta.idMarca)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.COLOR,
        colores.find((e) => e.id === detalleAlta.idColor)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.FOLIO_FACTURA,
        detalleAlta.folioFactura ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.FECHA_FACTURA,
        dayjs(detalleAlta.fechaFactura)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.PRECIO_UNITARIO,
        detalleAlta.precioUnitario ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.FECHA_COMPRA,
        dayjs(detalleAlta.fechaCompra)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.DIAS_GARANTIA,
        detalleAlta.diasGarantia ?? ""
      );
      setValue(CAMPOS_ALTA_VEHICULO.VIDA_UTIL, detalleAlta.vidaUtil ?? "");
      setValue(
        CAMPOS_ALTA_VEHICULO.FECHA_INICIO_USO,
        dayjs(detalleAlta.fechaInicioUso)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.PRECIO_DESECHABLE,
        detalleAlta.precioDesechable ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.OBSERVACION_BIEN,
        detalleAlta.observacionBien ?? ""
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.UBICACION,
        ubicaciones.find((e) => e.id === detalleAlta.idUbicacion)
      );
      setValue(
        CAMPOS_ALTA_VEHICULO.MUNICIPIO,
        municipios.find((e) => e.id === detalleAlta.idMunicipio)
      );
      setValue(CAMPOS_ALTA_VEHICULO.CARACTERISTICAS, caracteristicasSelect);
      setValue(CAMPOS_ALTA_VEHICULO.AUX_CARACTERISTICA, filasTabla);
      setValue(CAMPOS_ALTA_VEHICULO.RESPONSABLES, responsablesSelect);
      setValue(
        CAMPOS_ALTA_VEHICULO.OBSERVACION_RESPONSABLE,
        detalleAlta.observacionResponsable ?? ""
      );
    }
  }, [complementos.detalleAlta]);

  const getStepContent = (step) => {
    switch (step) {
      case formDatosBien:
        return (
          <AdministradorVehiculoAltaDatoBienForm
            formManager={formManager}
            complementos={complementos}
            esVisualizacion={esVisualizacion}
            solicitudSeleccionada={tablaSuperior[0]}
          />
        );
      case formDatosAdquisicion:
        return (
          <AdministradorVehiculoAltaDatoAdquisicionForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
          />
        );
      case formDatosGenerales:
        return (
          <AdministradorVehiculoAltaDatoGeneralForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
          />
        );
      case formCaracteristicas:
        return (
          <AdministradorVehiculoAltaCaracteristicasForm
            formManager={formManager}
            complementos={complementos}
            esVisualizacion={esVisualizacion}
          />
        );
      default:
        return (
          <AdministradorVehiculoAltaResponsableForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esModificacion={!esVisualizacion && !esCreacion}
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

export default AdministradorVehiculoAltaForm;
