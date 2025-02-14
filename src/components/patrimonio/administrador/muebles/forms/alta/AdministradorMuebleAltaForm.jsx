import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useAdministradorMueble } from "../../../../../../context/AdministradorMuebleContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import useFormPasos from "../../../../../../context/useFormPasos";
import { muebleAltaValidacion } from "../../../../../../settings/validacionConfig";

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
import { CAMPOS_ALTA_MUEBLE } from "../../../../../../settings/formConfig";
import dayjs from "dayjs";
import AdministradorMuebleAltaDatoGeneralForm from "./AdministradorMuebleAltaDatoGeneralForm";
import AdministradorMuebleAltaDatoMuebleForm from "./AdministradorMuebleAltaDatoMuebleForm";
import AdministradorMuebleAltaCaracteristicasForm from "./AdministradorMuebleAltaCaracteristicasForm";
import AdministradorMuebleAltaResponsableForm from "./AdministradorMuebleAltaResponsableForm";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

const formDatosGenerales = 0;
const formDatosMueble = 1;
const formCaracteristicas = 2;
const pasosFormAltaMueble = [
  "Datos Generales",
  "Datos del Mueble",
  "Características",
  "Responsable",
];

const AdministradorMuebleAltaForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarTramiteAltaMueble,
    handleCargarTramites,
    handleGetTramiteAltaMueble,
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
    ubicaciones: [],
    municipios: [],
    caracteristicas: [],
    responsables: [],
    detalleAlta: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Alta Bien Mueble");

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
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  const handleSubmitAltaMueble = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarTramiteAltaMueble({
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
      getUbicaciones(),
      getMunicipios(),
      getCaracteristicas(),
      getResponsables(),
      handleGetTramiteAltaMueble({ filaSeleccionada: tablaInferior }),
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
      console.log(idsCaracteristicas);
      const caracteristicasSelect = caracteristicas.filter((e) =>
        idsCaracteristicas.includes(e.id)
      );
      console.log(caracteristicasSelect);
      const filasTabla = stringToRow(detalleAlta.caracteristicas);
      const idsResponsables = detalleAlta.responsables
        .split(",")
        .map((e) => Number(e));
      const responsablesSelect = responsables.filter((e) =>
        idsResponsables.includes(e.id)
      );
      setValue(CAMPOS_ALTA_MUEBLE.SOLICITUD, detalleAlta.idSolicitud ?? "");
      setValue(
        CAMPOS_ALTA_MUEBLE.NUMERO_BIENES,
        detalleAlta.numeroBienes ?? ""
      );
      setValue(CAMPOS_ALTA_MUEBLE.PARTIDA, detalleAlta.partida ?? "");
      setValue(
        CAMPOS_ALTA_MUEBLE.PARTIDA_ESPECIFICA,
        detalleAlta.partidaEspecifica ?? ""
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.CUENTA_ACTIVO,
        detalleAlta.referenciaActivo ?? ""
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.CUENTA_ACTUALIZACION,
        detalleAlta.referenciaActualizacion ?? ""
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.FAMILIA,
        familias.find((e) => e.id === detalleAlta.idFamilia)
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.SUBFAMILIA,
        subfamilias.find((e) => e.id === detalleAlta.idSubfamilia)
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.BMS,
        bms.find((bien) => bien.id === detalleAlta.idBms)
      );
      setValue(CAMPOS_ALTA_MUEBLE.DESCRIPCION, detalleAlta.descripcion ?? "");
      setValue(
        CAMPOS_ALTA_MUEBLE.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleAlta.nivelUnidadAdministrativa
        )
      );
      setValue(CAMPOS_ALTA_MUEBLE.REQUISICION, detalleAlta.requisicion ?? "");
      setValue(CAMPOS_ALTA_MUEBLE.ORDEN_COMPRA, detalleAlta.ordenCompra ?? "");
      setValue(
        CAMPOS_ALTA_MUEBLE.TIPO_ADQUISICION,
        tiposAdquisicion.find((e) => e.id === detalleAlta.idTipoAdquisicion)
      );
      setValue(CAMPOS_ALTA_MUEBLE.NO_SERIES, detalleAlta.noSeries ?? "");
      setValue(
        CAMPOS_ALTA_MUEBLE.FOLIO_ANTERIOR,
        detalleAlta.folioAnterior ?? ""
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.NO_LICITACION,
        detalleAlta.noLicitacion ?? ""
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.FECHA_LICITACION,
        detalleAlta.fechaLicitacion ? dayjs(detalleAlta.fechaLicitacion) : null
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.OBSERVACION_LICITACION,
        detalleAlta.observacionLicitacion
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.ESTADO_FISICO,
        estadosFisicos.find((e) => e.id === detalleAlta.idEstadoFisico)
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.MARCA,
        marcas.find((e) => e.id === detalleAlta.idMarca)
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.COLOR,
        colores.find((e) => e.id === detalleAlta.idColor)
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.FOLIO_FACTURA,
        detalleAlta.folioFactura ?? ""
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.FECHA_FACTURA,
        dayjs(detalleAlta.fechaFactura)
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.PRECIO_UNITARIO,
        detalleAlta.precioUnitario ?? ""
      );
      setValue(CAMPOS_ALTA_MUEBLE.FECHA_COMPRA, dayjs(detalleAlta.fechaCompra));
      setValue(
        CAMPOS_ALTA_MUEBLE.DIAS_GARANTIA,
        detalleAlta.diasGarantia ?? ""
      );
      setValue(CAMPOS_ALTA_MUEBLE.VIDA_UTIL, detalleAlta.vidaUtil ?? "");
      setValue(
        CAMPOS_ALTA_MUEBLE.FECHA_INICIO_USO,
        dayjs(detalleAlta.fechaInicioUso)
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.PRECIO_DESECHABLE,
        detalleAlta.precioDesechable ?? ""
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.OBSERVACION_BIEN,
        detalleAlta.observacionBien ?? ""
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.UBICACION,
        ubicaciones.find((e) => e.id === detalleAlta.idUbicacion)
      );
      setValue(
        CAMPOS_ALTA_MUEBLE.MUNICIPIO,
        municipios.find((e) => e.id === detalleAlta.idMunicipio)
      );
      setValue(CAMPOS_ALTA_MUEBLE.CARACTERISTICAS, caracteristicasSelect);
      setValue(CAMPOS_ALTA_MUEBLE.AUX_CARACTERISTICA, filasTabla);
      setValue(CAMPOS_ALTA_MUEBLE.RESPONSABLES, responsablesSelect);
      setValue(
        CAMPOS_ALTA_MUEBLE.OBSERVACION_RESPONSABLE,
        detalleAlta.observacionResponsable ?? ""
      );
    }
  }, [complementos.detalleAlta]);

  const getStepContent = (step) => {
    switch (step) {
      case formDatosGenerales:
        return (
          <AdministradorMuebleAltaDatoGeneralForm
            formManager={formManager}
            complementos={complementos}
            esVisualizacion={esVisualizacion}
            solicitudSeleccionada={tablaSuperior[0]}
          />
        );
      case formDatosMueble:
        return (
          <AdministradorMuebleAltaDatoMuebleForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
          />
        );
      case formCaracteristicas:
        return (
          <AdministradorMuebleAltaCaracteristicasForm
            formManager={formManager}
            complementos={complementos}
            esVisualizacion={esVisualizacion}
          />
        );
      default:
        return (
          <AdministradorMuebleAltaResponsableForm
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
      handleEnviar={handleSubmitAltaMueble}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default AdministradorMuebleAltaForm;
