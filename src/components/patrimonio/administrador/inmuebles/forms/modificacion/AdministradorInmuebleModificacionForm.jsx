import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import useFormPasos from "../../../../../../context/useFormPasos";
import {
  altaInmuebleValidacion,
  modificacionInmuebleValidacion,
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
import { useSnackbar } from "../../../../../../context/SnackbarContext";
import { CAMPOS_MODIFICACION_INMUEBLE } from "../../../../../../settings/formConfig";
import { useAdministradorInmueble } from "../../../../../../context/AdministradorInmuebleContext";
import { MOTIVO_TRAMITE } from "../../../../../../settings/sistemaConfig";
import AdministradorInmuebleModificacionInfoInmuebleForm from "./AdministradorInmuebleModificacionInfoInmuebleForm";
import AdministradorInmuebleModificacionInfoRegistralForm from "./AdministradorInmuebleModificacionInfoRegistralForm";
import AdministradorInmuebleModificacionObservacionForm from "./AdministradorInmuebleModificacionObservacionForm";
import {
  getBienesInventarioPorTipo,
  getClasificacionConac,
  getTiposDominios,
} from "../../../../../../services/patrimonio";
import { DATE_FORMAT } from "../../../../../../settings/appConstants";
import dayjs from "dayjs";

const formInfoInmueble = 0;
const formInfoRegistral = 1;
const pasosFormAltaMueble = [
  "Información del Inmueble",
  "Información Registral",
  "Observaciones",
];

const AdministradorInmuebleModificacionForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarTramiteModificacionInmueble,
    handleCargarTramites,
    handleGetTramiteModificacionInmueble,
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
  const [motivoTramite, setMotivoTramite] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [complementos, setComplementos] = useState({
    bienes: [],
    familias: [],
    clasificacionConac: [],
    subfamilias: [],
    tiposInmuebles: [],
    usosInmuebles: [],
    tiposDominios: [],
    estadosFisicos: [],
    tiposAfectacion: [],
    municipios: [],
    origenesValor: [],
    tiposAdquisicion: [],
    detalleModificacion: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Modificación Bien Inmueble");

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: modificacionInmuebleValidacion(motivoTramite),
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormAltaMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;
  const esModificacionDeDatos =
    informacionTablaSuperior.idMotivoTramite ===
    MOTIVO_TRAMITE.MODIFICACION_DE_DATOS_DEL_INMUEBLE;
  const esModificacionMedidas =
    informacionTablaSuperior.idMotivoTramite ===
    MOTIVO_TRAMITE.MODIFICACION_POR_CORRECCION_DE_MEDIDAS;
  const esModificacionPorConstruccion =
    informacionTablaSuperior.idMotivoTramite ===
    MOTIVO_TRAMITE.MODIFICACION_POR_CONSTRUCCION;
  const esModificacionPorMejoras =
    informacionTablaSuperior.idMotivoTramite ===
    MOTIVO_TRAMITE.MODIFICACION_POR_MEJORAS;
  const esModificacionPorAfectacion =
    informacionTablaSuperior.idMotivoTramite ===
    MOTIVO_TRAMITE.MODIFICACION_POR_AFECTACION;

  const handleSubmitModificacionInmueble = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarTramiteModificacionInmueble({
      filaSeleccionada: tablaInferior,
      formData: data,
      esCreacion: esCreacion,
    })
      .then(() => {
        handleCloseForm();
        const mensaje = esCreacion
          ? "Tramite de modificacion creado correctamente"
          : "Tramite de modificacion modificado correctamente";
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
      getFamilias(),
      getSubfamilias(),
      getTiposInmuebles(),
      getUsosInmuebles(),
      getTiposDominios(),
      getEstadoFisico(),
      getTiposAfectacion(),
      getMunicipios(),
      getOrigenesValor(),
      getTiposAdquisiciones(),
      getClasificacionConac(),
      handleGetTramiteModificacionInmueble({ filaSeleccionada: tablaInferior }),
    ])
      .then(
        ([
          bienes,
          familiasData,
          subfamilias,
          tiposInmuebles,
          usosInmuebles,
          tiposDominios,
          estadosFisicos,
          tiposAfectacion,
          municipios,
          origenesValor,
          tiposAdquisicion,
          clasificacionConac,
          detalleModificacion,
        ]) => {
          const familias = familiasData.filter(
            (familia) => familia.id === 5800
          );

          setComplementos({
            bienes, // Bienes filtrados
            familias, // Familias filtradas
            subfamilias, // Subfamilias
            tiposInmuebles, // Tipos de inmuebles
            usosInmuebles, // Usos de inmuebles
            tiposDominios, // Tipos de dominios
            estadosFisicos, // Estados físicos
            tiposAfectacion, // Tipos de afectación
            municipios, // Municipios
            origenesValor, // Orígenes de valor
            tiposAdquisicion, // Tipos de adquisición
            clasificacionConac,
            detalleModificacion, // Detalle de alta
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
      bienes,
      familias,
      subfamilias,
      tiposInmuebles,
      usosInmuebles,
      tiposDominios,
      estadosFisicos,
      tiposAfectacion,
      municipios,
      origenesValor,
      tiposAdquisicion,
      clasificacionConac,
      detalleModificacion,
    } = complementos;
    if (detalleModificacion) {
      const bien =
        bienes.find((bien) => bien.id === detalleModificacion.idBien) ?? null;
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ID_SOLICITUD,
        detalleModificacion.idSolicitud
      );
      setValue(CAMPOS_MODIFICACION_INMUEBLE.BIEN, bien);
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.VALOR_LIBROS,
        detalleModificacion.valorLibros
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.VALOR_HISTORICO,
        detalleModificacion.valorHistorico
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.DEPRECIACION,
        detalleModificacion.depreciacion
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ANIOS_VIDA_UTIL,
        detalleModificacion.aniosVida
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.REFERENCIA_CONAC,
        clasificacionConac.find(
          (e) => e.id === detalleModificacion.referenciaConac
        ) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.MUNICIPIO,
        municipios.find((e) => e.id === detalleModificacion.idMunicipio) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ID_FAMILIA,
        familias.find(
          (familia) => familia.id === detalleModificacion.idFamilia
        ) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ID_SUBFAMILIA,
        subfamilias.find(
          (subfamilia) => subfamilia.id === detalleModificacion.idSubfamilia
        ) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.NOMENCLATURA,
        detalleModificacion.nomenclatura
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.DESCRIPCION,
        detalleModificacion.descripcion
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_INMUEBLE,
        tiposInmuebles.find(
          (tipoInmueble) =>
            tipoInmueble.id === detalleModificacion.idTipoInmueble
        ) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ID_USO_INMUEBLE,
        usosInmuebles.find(
          (usoInmueble) => usoInmueble.id === detalleModificacion.idUsoInmueble
        ) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_DOMINIO,
        tiposDominios.find(
          (tipoDominio) => tipoDominio.id === detalleModificacion.idTipoDominio
        ) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ID_ESTADO_FISICO,
        estadosFisicos.find(
          (estadoFisico) =>
            estadoFisico.id === detalleModificacion.idEstadoFisico
        ) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_AFECTACION,
        tiposAfectacion.find(
          (tipoAfectacion) =>
            tipoAfectacion.id === detalleModificacion.idTipoAfectacion
        ) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.AFECTANTE,
        detalleModificacion.afectante
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_ADQUISICION,
        tiposAdquisicion.find(
          (tipoAdquisicion) =>
            tipoAdquisicion.id === detalleModificacion.idTipoAdquisicion
        ) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.DECRETO_PUBLICACION,
        detalleModificacion.decretoPublicaicion
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ESCRITURA_TITULO,
        detalleModificacion.escrituraTitulo
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.FECHA_ADQUISICION,
        detalleModificacion.fechaAdquisicion
          ? dayjs(detalleModificacion.fechaAdquisicion)
          : null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.FECHA_ALTA_SISTEMA,
        detalleModificacion.fechaAltaSistema
          ? dayjs(detalleModificacion.fechaAltaSistema)
          : null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.EXPEDIENTE,
        detalleModificacion.expediente
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.FOLIO_CATASTRO,
        detalleModificacion.folioCatastro
      );
      setValue(CAMPOS_MODIFICACION_INMUEBLE.CALLE, detalleModificacion.calle);
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.SUPERFICIE,
        detalleModificacion.superficie
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.VALOR_TERRENO,
        detalleModificacion.valorTerreno
      );

      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.NUMERO_EXTERIOR,
        detalleModificacion.numeroExterior
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.NUMERO_INTERIOR,
        detalleModificacion.numeroInterior
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.CRUZAMIENTO_1,
        detalleModificacion.cruzamiento1
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.CRUZAMIENTO_2,
        detalleModificacion.cruzamiento2
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.SUPERFICIE_CONSTRUCCION,
        detalleModificacion.superficieConstruccion
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.TABLAJE,
        detalleModificacion.tablaje
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.VALOR_CONSTRUCCION,
        detalleModificacion.valorConstruccion
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.VALOR_INICIAL,
        detalleModificacion.valorInicial
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.CODIGO_POSTAL,
        detalleModificacion.codigoPostal
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ID_ORIGEN_VALOR,
        origenesValor.find(
          (origenValor) => origenValor.id === detalleModificacion.idOrigenValor
        ) ?? null
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.ASENTAMIENTO,
        detalleModificacion.asentamiento
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.PROPIETARIO,
        detalleModificacion.propietario
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.OBSERVACION_INMUEBLE,
        detalleModificacion.observacionInmueble
      );
      setValue(
        CAMPOS_MODIFICACION_INMUEBLE.OBSERVACION_SUPERVISION,
        detalleModificacion.observacionSupervicion
      );
      setMotivoTramite(bien.idMotivoTramite);
    }
  }, [complementos.detalleModificacion]);

  const getStepContent = (step) => {
    switch (step) {
      case formInfoInmueble:
        return (
          <AdministradorInmuebleModificacionInfoInmuebleForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            setCargando={setCargando}
            setMotivoTramite={setMotivoTramite}
            informacionTablaSuperior={informacionTablaSuperior}
            esModificacionDeDatos={esModificacionDeDatos}
            esModificacionMedidas={esModificacionMedidas}
            esModificacionPorConstruccion={esModificacionPorConstruccion}
            esModificacionPorMejoras={esModificacionPorMejoras}
            esModificacionPorAfectacion={esModificacionPorAfectacion}
            esModificacion={esCreacion || !esVisualizacion}
            idMotivoTramite={motivoTramite}
          />
        );
      case formInfoRegistral:
        return (
          <AdministradorInmuebleModificacionInfoRegistralForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esModificacion={esCreacion || !esVisualizacion}
            informacionTablaSuperior={informacionTablaSuperior}
            esModificacionDeDatos={esModificacionDeDatos}
            esModificacionMedidas={esModificacionMedidas}
            esModificacionPorConstruccion={esModificacionPorConstruccion}
            esModificacionPorMejoras={esModificacionPorMejoras}
            esModificacionPorAfectacion={esModificacionPorAfectacion}
          />
        );

      default:
        return (
          <AdministradorInmuebleModificacionObservacionForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esModificacionDeDatos={esModificacionDeDatos}
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
      handleEnviar={handleSubmitModificacionInmueble}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default AdministradorInmuebleModificacionForm;
