import DialogoEmergente from "../../../../../utils/DialogoEmergente";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useForm } from "react-hook-form";
import { useAdministradorMueble } from "../../../../../../context/AdministradorMuebleContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import useFormPasos from "../../../../../../context/useFormPasos";
import {
  muebleAltaValidacion,
  muebleModificacionValidacion,
} from "../../../../../../settings/validacionConfig";
import AdministradorMuebleModificacionDatoGeneralForm from "./AdministradorMuebleModificacionDatoGeneralForm";
import AdministradorMuebleModificacionDatoMuebleForm from "./AdministradorMuebleModificacionDatoMuebleForm";
import AdministradorMuebleModificacionCaracteristicasForm from "./AdministradorMuebleModificacionCaracteristicasForm";
import AdministradorMuebleModificacionResponsableForm from "./AdministradorMuebleModificacionResponsableForm";
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
import { CAMPOS_MODIFICACION_MUEBLE } from "../../../../../../settings/formConfig";
import dayjs from "dayjs";
import { getBienesInventarioPorTipo } from "../../../../../../services/patrimonio";
import { MOTIVO_TRAMITE } from "../../../../../../settings/sistemaConfig";

const formDatosGenerales = 0;
const formDatosMueble = 1;
const formCaracteristicas = 2;
const pasosFormAltaMueble = [
  "Datos Generales",
  "Datos del Mueble",
  "Características",
  "Responsable",
];

const AdministradorMuebleModificacionForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarTramiteModificacionMueble,
    handleCargarTramites,
    handleGetTramiteModificacionMueble,
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
    bienes: [],
    detalleModificacion: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Modificación Bien Mueble");
  const esModificacionFactura =
    informacionTablaSuperior.idMotivoTramite ===
    MOTIVO_TRAMITE.MODIFICACION_DE_DATOS_DE_FACTURA;

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: muebleModificacionValidacion,
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormAltaMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  const handleSubmitAltaMueble = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarTramiteModificacionMueble({
      filaSeleccionada: tablaInferior,
      formData: data,
      esCreacion: esCreacion,
    })
      .then(() => {
        handleCloseForm();
        const mensaje = esCreacion
          ? "Tramite de modificación creado correctamente"
          : "Tramite de modificación modificado correctamente";
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
        idTipoBien: 1,
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
      getUbicaciones(),
      getMunicipios(),
      getCaracteristicas(),
      getResponsables(),
      handleGetTramiteModificacionMueble({ filaSeleccionada: tablaInferior }),
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
            (familia) =>
              familia.id >= 5000 && familia.id <= 5600 && familia.id !== 5400
          );
          setValue(
            CAMPOS_MODIFICACION_MUEBLE.MOTIVO_TRAMITE,
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
      console.log(detalleModificacion);
      console.log(bienes);
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.SOLICITUD,
        detalleModificacion.idSolicitud ?? ""
      );
      setValue(CAMPOS_MODIFICACION_MUEBLE.BIEN, bien);
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.PARTIDA,
        detalleModificacion.partida ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.PARTIDA_ESPECIFICA,
        detalleModificacion.partidaEspecifica ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.CUENTA_ACTIVO,
        detalleModificacion.referenciaActivo ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.CUENTA_ACTUALIZACION,
        detalleModificacion.referenciaActualizacion ?? ""
      );
      setValue(CAMPOS_MODIFICACION_MUEBLE.FOLIO_BIEN, bien.folioBien ?? "");
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.FAMILIA,
        familias.find((e) => e.id === detalleModificacion.idFamilia)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.SUBFAMILIA,
        subfamilias.find((e) => e.id === detalleModificacion.idSubfamilia)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.BMS,
        bms.find((bien) => bien.id === detalleModificacion.idBms)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.DESCRIPCION,
        detalleModificacion.descripcion ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleModificacion.nivelUnidadAdministrativa
        )
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.CENTRO_COSTO,
        unidadesAdministrativas.find(
          (e) => e.id === detalleModificacion.nivelUnidadAdministrativa
        )
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.REQUISICION,
        detalleModificacion.requisicion ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.ORDEN_COMPRA,
        detalleModificacion.ordenCompra ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.TIPO_ADQUISICION,
        tiposAdquisicion.find(
          (e) => e.id === detalleModificacion.idTipoAdquisicion
        )
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.NO_SERIES,
        detalleModificacion.noSeries ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.FOLIO_ANTERIOR,
        detalleModificacion.folioAnterior ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.NO_LICITACION,
        detalleModificacion.noLicitacion ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.FECHA_LICITACION,
        detalleModificacion.fechaLicitacion
          ? dayjs(detalleModificacion.fechaLicitacion)
          : null
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.OBSERVACION_LICITACION,
        detalleModificacion.observacionLicitacion
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.ESTADO_FISICO,
        estadosFisicos.find((e) => e.id === detalleModificacion.idEstadoFisico)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.MARCA,
        marcas.find((e) => e.id === detalleModificacion.idMarca)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.COLOR,
        colores.find((e) => e.id === detalleModificacion.idColor)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.FOLIO_FACTURA,
        detalleModificacion.folioFactura ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.FECHA_FACTURA,
        dayjs(detalleModificacion.fechaFactura)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.PRECIO_UNITARIO,
        detalleModificacion.precioUnitario ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.FECHA_COMPRA,
        dayjs(detalleModificacion.fechaCompra)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.DIAS_GARANTIA,
        detalleModificacion.diasGarantia ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.VIDA_UTIL,
        detalleModificacion.vidaUtil ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.FECHA_INICIO_USO,
        dayjs(detalleModificacion.fechaInicioUso)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.PRECIO_DESECHABLE,
        detalleModificacion.precioDesechable ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.OBSERVACION_BIEN,
        detalleModificacion.observacionBien ?? ""
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.UBICACION,
        ubicaciones.find((e) => e.id === detalleModificacion.idUbicacion)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.MUNICIPIO,
        municipios.find((e) => e.id === detalleModificacion.idMunicipio)
      );
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.CARACTERISTICAS,
        caracteristicasSelect
      );
      setValue(CAMPOS_MODIFICACION_MUEBLE.AUX_CARACTERISTICA, filasTabla);
      setValue(CAMPOS_MODIFICACION_MUEBLE.RESPONSABLES, responsablesSelect);
      setValue(
        CAMPOS_MODIFICACION_MUEBLE.OBSERVACION_RESPONSABLE,
        detalleModificacion.observacionResponsable ?? ""
      );
    }
  }, [complementos.detalleModificacion]);

  const getStepContent = (step) => {
    switch (step) {
      case formDatosGenerales:
        return (
          <AdministradorMuebleModificacionDatoGeneralForm
            formManager={formManager}
            complementos={complementos}
            esVisualizacion={esVisualizacion}
            solicitudSeleccionada={tablaSuperior[0]}
            setCargando={setCargando}
            esModificacionFactura={esModificacionFactura}
          />
        );
      case formDatosMueble:
        return (
          <AdministradorMuebleModificacionDatoMuebleForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esModificacionFactura={esModificacionFactura}
          />
        );
      case formCaracteristicas:
        return (
          <AdministradorMuebleModificacionCaracteristicasForm
            formManager={formManager}
            complementos={complementos}
            esVisualizacion={esVisualizacion}
            esModificacionFactura={esModificacionFactura}
          />
        );
      default:
        return (
          <AdministradorMuebleModificacionResponsableForm
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

export default AdministradorMuebleModificacionForm;
