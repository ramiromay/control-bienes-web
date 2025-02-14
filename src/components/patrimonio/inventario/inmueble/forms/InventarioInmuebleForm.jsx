import { useSistema } from "../../../../../context/SistemaContext";
import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../utils/DialogoEmergentePasos";
import useFormPasos from "../../../../../context/useFormPasos";
import { altaInmuebleValidacion } from "../../../../../settings/validacionConfig";

import {
  getEstadoFisico,
  getFamilias,
  getOrigenesValor,
  getSubfamilias,
  getTiposAdquisiciones,
  getTiposAfectacion,
  getTiposInmuebles,
  getUsosInmuebles,
} from "../../../../../services/catalogo";
import { getMunicipios } from "../../../../../services/general";
import { CAMPOS_INVENTARIO_INMUEBLE } from "../../../../../settings/formConfig";
import {
  getClasificacionConac,
  getTiposDominios,
} from "../../../../../services/patrimonio";
import dayjs from "dayjs";
import { getBienInmueble } from "../../../../../services/patrimonio";
import useTabla from "../../../../../context/Tabla/useTabla";
import { useInventarioInmueble } from "../../../../../context/InventarioInmuebleContext";
import InventarioInmuebleInfoInmuebleForm from "./InventarioInmuebleInfoInmuebleForm";
import InventarioInmuebleInfoRegistralForm from "./InventarioInmuebleInfoRegistralForm";
import InventarioInmuebleObservacionForm from "./InventarioInmuebleObservacionForm";

const formInfoInmueble = 0;
const formInfoRegistral = 1;
const pasosFormAltaMueble = [
  "Información del Inmueble",
  "Información Registral",
  "Observaciones",
];

const InventarioInmuebleForm = () => {
  const { handleError } = useSistema();
  const { dialogoManager } = useInventarioInmueble();
  const {
    dialogo,
    esDialogoVisualizacion,
    handleCerrarDialogo,
    getTituloDialogo,
  } = dialogoManager;
  const { filaSeleccionadaData, filaSeleccionada } = useTabla();
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
  const tituloDialogo = getTituloDialogo("Bien Inmueble");

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: altaInmuebleValidacion(filaSeleccionadaData.idMotivoTramite),
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormAltaMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, setValue } = formManager;
  const { errors } = formState;

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
      getBienInmueble({ idBien: filaSeleccionada[0] }),
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
      setValue(CAMPOS_INVENTARIO_INMUEBLE.BIEN, detalleAlta.idBien ?? "");
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.FECHA_ALTA,
        detalleAlta.fechaAlta ? dayjs(detalleAlta.fechaAlta) : null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.FECHA_BAJA,
        detalleAlta.fechaBaja ? dayjs(detalleAlta.fechaBaja) : null
      );
      setValue(CAMPOS_INVENTARIO_INMUEBLE.MOTIVO_BAJA, detalleAlta.motivoBaja);
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.FOLIO_BIEN,
        detalleAlta.folioBien ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.VALOR_LIBROS,
        detalleAlta.valorLibros
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.VALOR_HISTORICO,
        detalleAlta.valorHistorico
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.DEPRECIACION,
        detalleAlta.depreciacion
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ANIOS_VIDA_UTIL,
        detalleAlta.aniosVida
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.REFERENCIA_CONAC,
        clasificacionConac.find((e) => e.id === detalleAlta.referenciaConac) ??
          null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.MUNICIPIO,
        municipios.find((e) => e.id === detalleAlta.idMunicipio) ?? null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ID_FAMILIA,
        familias.find((familia) => familia.id === detalleAlta.idFamilia) ?? null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ID_SUBFAMILIA,
        subfamilias.find(
          (subfamilia) => subfamilia.id === detalleAlta.idSubfamilia
        ) ?? null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.NOMENCLATURA,
        detalleAlta.nomenclatura
      );
      setValue(CAMPOS_INVENTARIO_INMUEBLE.DESCRIPCION, detalleAlta.descripcion);
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ID_TIPO_INMUEBLE,
        tiposInmuebles.find(
          (tipoInmueble) => tipoInmueble.id === detalleAlta.idTipoInmueble
        ) ?? null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ID_USO_INMUEBLE,
        usosInmuebles.find(
          (usoInmueble) => usoInmueble.id === detalleAlta.idUsoInmueble
        ) ?? null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ID_TIPO_DOMINIO,
        tiposDominios.find(
          (tipoDominio) => tipoDominio.id === detalleAlta.idTipoDominio
        ) ?? null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ID_ESTADO_FISICO,
        estadosFisicos.find(
          (estadoFisico) => estadoFisico.id === detalleAlta.idEstadoFisico
        ) ?? null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ID_TIPO_AFECTACION,
        tiposAfectacion.find(
          (tipoAfectacion) => tipoAfectacion.id === detalleAlta.idTipoAfectacion
        ) ?? null
      );
      setValue(CAMPOS_INVENTARIO_INMUEBLE.AFECTANTE, detalleAlta.afectante);
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ID_TIPO_ADQUISICION,
        tiposAdquisicion.find(
          (tipoAdquisicion) =>
            tipoAdquisicion.id === detalleAlta.idTipoAdquisicion
        ) ?? null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.DECRETO_PUBLICACION,
        detalleAlta.decretoPublicaicion
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ESCRITURA_TITULO,
        detalleAlta.escrituraTitulo
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.FECHA_ADQUISICION,
        detalleAlta.fechaAdquisicion
          ? dayjs(detalleAlta.fechaAdquisicion)
          : null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.FECHA_ALTA_SISTEMA,
        detalleAlta.fechaAltaSistema
          ? dayjs(detalleAlta.fechaAltaSistema)
          : null
      );
      setValue(CAMPOS_INVENTARIO_INMUEBLE.EXPEDIENTE, detalleAlta.expediente);
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.FOLIO_CATASTRO,
        detalleAlta.folioCatastro
      );
      setValue(CAMPOS_INVENTARIO_INMUEBLE.CALLE, detalleAlta.calle);
      setValue(CAMPOS_INVENTARIO_INMUEBLE.SUPERFICIE, detalleAlta.superficie);
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.VALOR_TERRENO,
        detalleAlta.valorTerreno
      );

      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.NUMERO_EXTERIOR,
        detalleAlta.numeroExterior
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.NUMERO_INTERIOR,
        detalleAlta.numeroInterior
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.CRUZAMIENTO_1,
        detalleAlta.cruzamiento1
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.CRUZAMIENTO_2,
        detalleAlta.cruzamiento2
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.SUPERFICIE_CONSTRUCCION,
        detalleAlta.superficieConstruccion
      );
      setValue(CAMPOS_INVENTARIO_INMUEBLE.TABLAJE, detalleAlta.tablaje);
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.VALOR_CONSTRUCCION,
        detalleAlta.valorConstruccion
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.VALOR_INICIAL,
        detalleAlta.valorInicial
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.CODIGO_POSTAL,
        detalleAlta.codigoPostal
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ID_ORIGEN_VALOR,
        origenesValor.find(
          (origenValor) => origenValor.id === detalleAlta.idOrigenValor
        ) ?? null
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.ASENTAMIENTO,
        detalleAlta.asentamiento
      );
      setValue(CAMPOS_INVENTARIO_INMUEBLE.PROPIETARIO, detalleAlta.propietario);
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.OBSERVACION_INMUEBLE,
        detalleAlta.observacionInmueble
      );
      setValue(
        CAMPOS_INVENTARIO_INMUEBLE.OBSERVACION_SUPERVISION,
        detalleAlta.observacionSupervicion
      );
    }
  }, [complementos.detalleAlta]);

  const getStepContent = (step) => {
    switch (step) {
      case formInfoInmueble:
        return (
          <InventarioInmuebleInfoInmuebleForm
            formManager={formManager}
            complementos={complementos}
            informacionTablaSuperior={filaSeleccionadaData}
          />
        );
      case formInfoRegistral:
        return (
          <InventarioInmuebleInfoRegistralForm
            formManager={formManager}
            complementos={complementos}
          />
        );

      default:
        return (
          <InventarioInmuebleObservacionForm
            formManager={formManager}
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
      handleEnviar={() => {}}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default InventarioInmuebleForm;
