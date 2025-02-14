import { useSistema } from "@context/SistemaContext";
import { useEffect, useState } from "react";
import DialogoEmergentePasos from "@components/utils/DialogoEmergentePasos";
import useFormPasos from "@context/useFormPasos";
import { muebleAltaValidacion } from "@settings/validacionConfig";

import {
  getCaracteristicas,
  getColores,
  getEstadoFisico,
  getFamilias,
  getMarcas,
  getResponsables,
  getSubfamilias,
  getTiposAdquisiciones,
  getUbicaciones,
} from "../../../../../services/catalogo";
import {
  getBMS,
  getMunicipios,
  getUnidadesAdministrativas,
} from "../../../../../services/general";
import {
  mapArray,
  stringToIDs,
  stringToRow,
} from "../../../../../settings/utils";
import {
  compBmsMapppingRules,
  compUnidadAdministrativaMappingRules,
} from "../../../../../settings/mappingRulesConfig";
import { CAMPOS_INVENTARIO_MUEBLE } from "../../../../../settings/formConfig";
import dayjs from "dayjs";
import { useInventarioMueble } from "../../../../../context/InventarioMuebleContext";
import useTabla from "../../../../../context/Tabla/useTabla";
import InventarioMuebleDatoMuebleForm from "./InventarioMuebleDatoMuebleForm";
import InventarioMuebleDatoGeneralForm from "./InventarioMuebleDatoGeneralForm";
import InventarioMuebleCaracteristicasForm from "./InventarioMuebleCaracteristicasForm";
import InventarioMuebleResponsableForm from "./InventarioMuebleResponsableForm";
import { getBienMueble } from "../../../../../services/patrimonio";

const formDatosGenerales = 0;
const formDatosMueble = 1;
const formCaracteristicas = 2;
const pasosFormAltaMueble = [
  "Datos Generales",
  "Datos del Mueble",
  "Características",
  "Responsable",
];

const InventarioMuebleForm = () => {
  const { handleError } = useSistema();
  const { dialogoManager } = useInventarioMueble();
  const {
    dialogo,
    esDialogoVisualizacion,
    esDialogoCreacion,
    handleCerrarDialogo,
    getTituloDialogo,
  } = dialogoManager;
  const { filaSeleccionadaData, filaSeleccionada } = useTabla();
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
    ubicaciones: [],
    municipios: [],
    caracteristicas: [],
    responsables: [],
    detalleAlta: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Bien Mueble");

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: muebleAltaValidacion,
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
      getBMS(),
      getUnidadesAdministrativas({ desdeNivel: 3, hastaNivel: 3 }),
      getTiposAdquisiciones(),
      getEstadoFisico(),
      getMarcas(),
      getColores(),
      getUbicaciones(),
      getMunicipios(),
      getCaracteristicas(),
      getResponsables(),
      getBienMueble({ idBien: filaSeleccionada[0] }),
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
            (familia) =>
              familia.id >= 5000 && familia.id <= 5600 && familia.id !== 5400
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
      const idsResponsables = detalleAlta.responsables
        .split(",")
        .map((e) => Number(e));

      const responsablesSelect = responsables.filter((e) =>
        idsResponsables.includes(e.id)
      );
      setValue(CAMPOS_INVENTARIO_MUEBLE.BIEN, detalleAlta.idBien ?? "");
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.FECHA_ALTA,
        detalleAlta.fechaAlta ? dayjs(detalleAlta.fechaAlta) : null
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.FECHA_BAJA,
        detalleAlta.fechaBaja ? dayjs(detalleAlta.fechaBaja) : null
      );
      setValue(CAMPOS_INVENTARIO_MUEBLE.MOTIVO_BAJA, detalleAlta.motivoBaja);
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.FOLIO_BIEN,
        detalleAlta.folioBien ?? ""
      );
      setValue(CAMPOS_INVENTARIO_MUEBLE.PARTIDA, detalleAlta.partida ?? "");
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.PARTIDA_ESPECIFICA,
        detalleAlta.partidaEspecifica ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.CUENTA_ACTIVO,
        detalleAlta.referenciaActivo ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.CUENTA_ACTUALIZACION,
        detalleAlta.referenciaActualizacion ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.FAMILIA,
        familias.find((e) => e.id === detalleAlta.idFamilia)
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.SUBFAMILIA,
        subfamilias.find((e) => e.id === detalleAlta.idSubfamilia)
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.BMS,
        bms.find((bien) => bien.id === detalleAlta.idBms)
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.DESCRIPCION,
        detalleAlta.descripcion ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleAlta.nivelUnidadAdministrativa
        )
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.REQUISICION,
        detalleAlta.requisicion ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.ORDEN_COMPRA,
        detalleAlta.ordenCompra ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.TIPO_ADQUISICION,
        tiposAdquisicion.find((e) => e.id === detalleAlta.idTipoAdquisicion)
      );
      setValue(CAMPOS_INVENTARIO_MUEBLE.NO_SERIES, detalleAlta.noSeries ?? "");
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.FOLIO_ANTERIOR,
        detalleAlta.folioAnterior ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.NO_LICITACION,
        detalleAlta.noLicitacion ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.FECHA_LICITACION,
        detalleAlta.fechaLicitacion ? dayjs(detalleAlta.fechaLicitacion) : null
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.OBSERVACION_LICITACION,
        detalleAlta.observacionLicitacion
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.ESTADO_FISICO,
        estadosFisicos.find((e) => e.id === detalleAlta.idEstadoFisico)
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.MARCA,
        marcas.find((e) => e.id === detalleAlta.idMarca)
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.COLOR,
        colores.find((e) => e.id === detalleAlta.idColor)
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.FOLIO_FACTURA,
        detalleAlta.folioFactura ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.FECHA_FACTURA,
        dayjs(detalleAlta.fechaFactura)
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.PRECIO_UNITARIO,
        detalleAlta.precioUnitario ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.FECHA_COMPRA,
        dayjs(detalleAlta.fechaCompra)
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.DIAS_GARANTIA,
        detalleAlta.diasGarantia ?? ""
      );
      setValue(CAMPOS_INVENTARIO_MUEBLE.VIDA_UTIL, detalleAlta.vidaUtil ?? "");
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.FECHA_INICIO_USO,
        dayjs(detalleAlta.fechaInicioUso)
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.PRECIO_DESECHABLE,
        detalleAlta.precioDesechable ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.OBSERVACION_BIEN,
        detalleAlta.observacionBien ?? ""
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.UBICACION,
        ubicaciones.find((e) => e.id === detalleAlta.idUbicacion)
      );
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.MUNICIPIO,
        municipios.find((e) => e.id === detalleAlta.idMunicipio)
      );
      setValue(CAMPOS_INVENTARIO_MUEBLE.CARACTERISTICAS, caracteristicasSelect);
      setValue(CAMPOS_INVENTARIO_MUEBLE.AUX_CARACTERISTICA, filasTabla);
      setValue(CAMPOS_INVENTARIO_MUEBLE.RESPONSABLES, responsablesSelect);
      setValue(
        CAMPOS_INVENTARIO_MUEBLE.OBSERVACION_RESPONSABLE,
        detalleAlta.observacionResponsable ?? ""
      );
    }
  }, [complementos.detalleAlta]);

  const getStepContent = (step) => {
    switch (step) {
      case formDatosGenerales:
        return (
          <InventarioMuebleDatoGeneralForm
            formManager={formManager}
            complementos={complementos}
            solicitudSeleccionada={filaSeleccionadaData[0]}
          />
        );
      case formDatosMueble:
        return (
          <InventarioMuebleDatoMuebleForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
          />
        );
      case formCaracteristicas:
        return (
          <InventarioMuebleCaracteristicasForm
            formManager={formManager}
            complementos={complementos}
          />
        );
      default:
        return (
          <InventarioMuebleResponsableForm
            formManager={formManager}
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
      handleEnviar={null}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default InventarioMuebleForm;
