import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import useFormPasos from "../../../../../../context/useFormPasos";
import {
  altaInmuebleValidacion,
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
} from "../../../../../../settings/formConfig";
import { useAdministradorInmueble } from "../../../../../../context/AdministradorInmuebleContext";
import { MOTIVO_TRAMITE } from "../../../../../../settings/sistemaConfig";
import AdministradorInmuebleAltaInfoInmuebleForm from "./AdministradorInmuebleAltaInfoInmuebleForm";
import AdministradorInmuebleAltaInfoRegistralForm from "./AdministradorInmuebleAltaInfoRegistralForm";
import AdministradorInmuebleAltaObservacionForm from "./AdministradorInmuebleAltaObservacionForm";
import {
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

const AdministradorInmuebleAltaForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarTramiteAltaInmueble,
    handleCargarTramites,
    handleGetTramiteAltaInmueble,
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
  const { informacionTablaSuperior } = filaSeleccionada;
  const { showSnackbar } = useSnackbar();
  const { tablaSuperior, tablaInferior } = filaSeleccionada;
  const [cargando, setCargando] = useState(true);
  const [complementos, setComplementos] = useState({
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
    detalleAlta: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Alta Bien Inmueble");

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: altaInmuebleValidacion(informacionTablaSuperior.idMotivoTramite),
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormAltaMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  const handleSubmitAltaVehiculo = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarTramiteAltaInmueble({
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
      getTiposInmuebles(),
      getUsosInmuebles(),
      getTiposDominios(),
      getEstadoFisico(),
      getTiposAfectacion(),
      getMunicipios(),
      getOrigenesValor(),
      getTiposAdquisiciones(),
      getClasificacionConac(),
      handleGetTramiteAltaInmueble({ filaSeleccionada: tablaInferior }),
    ])
      .then(
        ([
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
          detalleAlta,
        ]) => {
          const familias = familiasData.filter(
            (familia) => familia.id === 5800
          );
          setComplementos({
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
            detalleAlta, // Detalle de alta
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
      detalleAlta,
    } = complementos;
    if (detalleAlta) {
      setValue(CAMPOS_ALTA_INMUEBLE.ID_SOLICITUD, detalleAlta.idSolicitud);
      setValue(CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS, detalleAlta.valorLibros);
      setValue(
        CAMPOS_ALTA_INMUEBLE.VALOR_HISTORICO,
        detalleAlta.valorHistorico
      );
      setValue(CAMPOS_ALTA_INMUEBLE.DEPRECIACION, detalleAlta.depreciacion);
      setValue(CAMPOS_ALTA_INMUEBLE.ANIOS_VIDA_UTIL, detalleAlta.aniosVida);
      setValue(
        CAMPOS_ALTA_INMUEBLE.REFERENCIA_CONAC,
        clasificacionConac.find((e) => e.id === detalleAlta.referenciaConac) ??
          null
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.MUNICIPIO,
        municipios.find((e) => e.id === detalleAlta.idMunicipio) ?? null
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.ID_FAMILIA,
        familias.find((familia) => familia.id === detalleAlta.idFamilia) ?? null
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.ID_SUBFAMILIA,
        subfamilias.find(
          (subfamilia) => subfamilia.id === detalleAlta.idSubfamilia
        ) ?? null
      );
      setValue(CAMPOS_ALTA_INMUEBLE.NOMENCLATURA, detalleAlta.nomenclatura);
      setValue(CAMPOS_ALTA_INMUEBLE.DESCRIPCION, detalleAlta.descripcion);
      setValue(
        CAMPOS_ALTA_INMUEBLE.ID_TIPO_INMUEBLE,
        tiposInmuebles.find(
          (tipoInmueble) => tipoInmueble.id === detalleAlta.idTipoInmueble
        ) ?? null
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.ID_USO_INMUEBLE,
        usosInmuebles.find(
          (usoInmueble) => usoInmueble.id === detalleAlta.idUsoInmueble
        ) ?? null
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.ID_TIPO_DOMINIO,
        tiposDominios.find(
          (tipoDominio) => tipoDominio.id === detalleAlta.idTipoDominio
        ) ?? null
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.ID_ESTADO_FISICO,
        estadosFisicos.find(
          (estadoFisico) => estadoFisico.id === detalleAlta.idEstadoFisico
        ) ?? null
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.ID_TIPO_AFECTACION,
        tiposAfectacion.find(
          (tipoAfectacion) => tipoAfectacion.id === detalleAlta.idTipoAfectacion
        ) ?? null
      );
      setValue(CAMPOS_ALTA_INMUEBLE.AFECTANTE, detalleAlta.afectante);
      setValue(
        CAMPOS_ALTA_INMUEBLE.ID_TIPO_ADQUISICION,
        tiposAdquisicion.find(
          (tipoAdquisicion) =>
            tipoAdquisicion.id === detalleAlta.idTipoAdquisicion
        ) ?? null
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.DECRETO_PUBLICACION,
        detalleAlta.decretoPublicaicion
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.ESCRITURA_TITULO,
        detalleAlta.escrituraTitulo
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.FECHA_ADQUISICION,
        detalleAlta.fechaAdquisicion
          ? dayjs(detalleAlta.fechaAdquisicion)
          : null
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.FECHA_ALTA_SISTEMA,
        detalleAlta.fechaAltaSistema
          ? dayjs(detalleAlta.fechaAltaSistema)
          : null
      );
      setValue(CAMPOS_ALTA_INMUEBLE.EXPEDIENTE, detalleAlta.expediente);
      setValue(CAMPOS_ALTA_INMUEBLE.FOLIO_CATASTRO, detalleAlta.folioCatastro);
      setValue(CAMPOS_ALTA_INMUEBLE.CALLE, detalleAlta.calle);
      setValue(CAMPOS_ALTA_INMUEBLE.SUPERFICIE, detalleAlta.superficie);
      setValue(CAMPOS_ALTA_INMUEBLE.VALOR_TERRENO, detalleAlta.valorTerreno);

      setValue(
        CAMPOS_ALTA_INMUEBLE.NUMERO_EXTERIOR,
        detalleAlta.numeroExterior
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.NUMERO_INTERIOR,
        detalleAlta.numeroInterior
      );
      setValue(CAMPOS_ALTA_INMUEBLE.CRUZAMIENTO_1, detalleAlta.cruzamiento1);
      setValue(CAMPOS_ALTA_INMUEBLE.CRUZAMIENTO_2, detalleAlta.cruzamiento2);
      setValue(
        CAMPOS_ALTA_INMUEBLE.SUPERFICIE_CONSTRUCCION,
        detalleAlta.superficieConstruccion
      );
      setValue(CAMPOS_ALTA_INMUEBLE.TABLAJE, detalleAlta.tablaje);
      setValue(
        CAMPOS_ALTA_INMUEBLE.VALOR_CONSTRUCCION,
        detalleAlta.valorConstruccion
      );
      setValue(CAMPOS_ALTA_INMUEBLE.VALOR_INICIAL, detalleAlta.valorInicial);
      setValue(CAMPOS_ALTA_INMUEBLE.CODIGO_POSTAL, detalleAlta.codigoPostal);
      setValue(
        CAMPOS_ALTA_INMUEBLE.ID_ORIGEN_VALOR,
        origenesValor.find(
          (origenValor) => origenValor.id === detalleAlta.idOrigenValor
        ) ?? null
      );
      setValue(CAMPOS_ALTA_INMUEBLE.ASENTAMIENTO, detalleAlta.asentamiento);
      setValue(CAMPOS_ALTA_INMUEBLE.PROPIETARIO, detalleAlta.propietario);
      setValue(
        CAMPOS_ALTA_INMUEBLE.OBSERVACION_INMUEBLE,
        detalleAlta.observacionInmueble
      );
      setValue(
        CAMPOS_ALTA_INMUEBLE.OBSERVACION_SUPERVISION,
        detalleAlta.observacionSupervicion
      );
    }
  }, [complementos.detalleAlta]);

  const getStepContent = (step) => {
    switch (step) {
      case formInfoInmueble:
        return (
          <AdministradorInmuebleAltaInfoInmuebleForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esModificacion={!esVisualizacion && !esCreacion}
            informacionTablaSuperior={informacionTablaSuperior}
          />
        );
      case formInfoRegistral:
        return (
          <AdministradorInmuebleAltaInfoRegistralForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esModificacion={!esVisualizacion && !esCreacion}
            informacionTablaSuperior={informacionTablaSuperior}
          />
        );

      default:
        return (
          <AdministradorInmuebleAltaObservacionForm
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

export default AdministradorInmuebleAltaForm;
