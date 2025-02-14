import { useMultiTabla } from "../../../../../context/MultiTablaContext";
import { useSistema } from "../../../../../context/SistemaContext";
import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../utils/DialogoEmergentePasos";
import useFormPasos from "../../../../../context/useFormPasos";
import {
  bajaInmuebleValidacion,
  movimientoValidacion,
} from "../../../../../settings/validacionConfig";
import {
  CAMPOS_BAJA_INMUEBLE,
  CAMPOS_MOVIMIENTO,
} from "../../../../../settings/formConfig";
import EntradaSalidaDatoGeneralForm from "./EntradaSalidaDatoGeneralForm";
import { DATE_FORMAT } from "../../../../../settings/appConstants";
import dayjs from "dayjs";
import { useEntradaSalida } from "../../../../../context/EntradaSalidaContext";
import { getBMS } from "../../../../../services/general";
import {
  getAlmacenes,
  getBienesAlmacenPorFiltro,
  getConceptosMovimiento,
  getMetodoAdquisicion,
  getProgramas,
  getProveedores,
  getTiposMovimiento,
} from "../../../../../services/almacen";
import { getFamilias } from "../../../../../services/catalogo";
import EntradaSalidaArticuloForm from "./EntradaSalidaArticuloForm";
import { compBmsMapppingRules } from "../../../../../settings/mappingRulesConfig";
import {
  mapArray,
  stringToIDs,
  stringToRow,
} from "../../../../../settings/utils";

const pasosFormAltaMueble = ["Datos Generales", "Artículos"];
const datoGeneral = 0;

const EntradaSalidaMovimientoForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoBienes,
    multiTabla,
    handleEnviar,
    handleGetMovimientos,
    handleGetMovimiento,
  } = useEntradaSalida();
  const { iniciarCargaTablas, finalizarCargaTablas, addDatosTablaSuperior } =
    multiTabla;
  const {
    dialogo,
    esDialogoVisualizacion,
    esDialogoCreacion,
    handleCerrarDialogo,
    getTituloDialogo,
  } = dialogoBienes;
  const { filaSeleccionada, handleQuitarSeleccion } = useMultiTabla();
  const { tablaSuperior } = filaSeleccionada;
  const [cargando, setCargando] = useState(true);
  const [complementos, setComplementos] = useState({
    bienes: [],
    bms: [],
    tiposMovimientos: [],
    almacenes: [],
    conceptos: [],
    metodosAdquisicion: [],
    programasOperativos: [],
    proveedores: [],
    familias: [],
    movimiento: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Movimiento");

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: movimientoValidacion,
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormAltaMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  const handleSubmitMovimiento = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar({
      filaSeleccionada: tablaSuperior,
      formData: data,
      esCreacion: esCreacion,
    })
      .then(() => {
        handleCloseForm();
        handleQuitarSeleccion();
        iniciarCargaTablas();
        return handleGetMovimientos();
      })
      .then((movimientos) => {
        addDatosTablaSuperior(movimientos);
      })
      .catch((error) => {
        handlePasoAnterior();
        handleError(error);
      })
      .finally(() => {
        finalizarCargaTablas();
        setCargando(false);
      });
  });

  useEffect(() => {
    setCargando(true);
    Promise.all([
      getBienesAlmacenPorFiltro({ periodo: 2024, almacen: 0 }),
      getBMS(),
      getTiposMovimiento(),
      getConceptosMovimiento(),
      getAlmacenes(),
      getProgramas(),
      getProveedores(),
      getFamilias(),
      getMetodoAdquisicion(),
      handleGetMovimiento({ filaSeleccionada: tablaSuperior }),
    ])
      .then(
        ([
          bienesData,
          bmsData,
          tipoMovimientos,
          conceptos,
          almacenes,
          programas,
          proveedores,
          familias,
          metodosAdquisicion,
          movimiento,
        ]) => {
          const bms = mapArray(bmsData, compBmsMapppingRules);
          const bienes = bienesData.map((e) => ({
            id: e.idBien,
            name: e.descripcion,
            infoExtra: `Cantidad: ${e.existencia} ${e.unidadMedida}`,
            idAlmacen: e.idAlmacen,
            idFamilia: e.idFamilia,
            precioUnitario: e.precioUnitario,
          }));
          console.log(bienes);
          setComplementos({
            bienes: bienes,
            bms: bms,
            tiposMovimientos: tipoMovimientos,
            conceptos: conceptos,
            almacenes: almacenes,
            programasOperativos: programas,
            proveedores: proveedores,
            familias: familias,
            metodosAdquisicion: metodosAdquisicion,
            movimiento: movimiento,
          });
        }
      )
      .catch((error) => {
        handleCloseForm();
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    const {
      tiposMovimientos,
      familias,
      programasOperativos,
      proveedores,
      almacenes,
      bms,
      conceptos,
      metodosAdquisicion,
      movimiento,
    } = complementos;
    if (movimiento) {
      console.log(movimiento);
      const idsArticulos = stringToIDs(movimiento.articulos, "idArticulo").map(
        (e) => Number(e.idArticulo)
      );
      const articulos = bms.filter((e) => idsArticulos.includes(e.id));
      const filasTabla = stringToRow(movimiento.articulos);
      setValue(CAMPOS_MOVIMIENTO.FOLIO_MOVIMIENTO, movimiento.idMovimiento);
      setValue(
        CAMPOS_MOVIMIENTO.ID_TIPO_MOVIMIENTO,
        tiposMovimientos.find((e) => e.id === movimiento.idTipoMovimiento)
      );
      setValue(
        CAMPOS_MOVIMIENTO.ID_ALMACEN,
        almacenes.find((e) => e.id === movimiento.idAlmacen)
      );
      setValue(
        CAMPOS_MOVIMIENTO.ID_METODO_ADQUISICION,
        metodosAdquisicion.find((e) => e.id === movimiento.idMetodoAdquisicion)
      );
      setValue(
        CAMPOS_MOVIMIENTO.ID_PROGRAMA_OPERATIVO,
        programasOperativos.find((e) => e.id === movimiento.idProgramaOperativo)
      );
      setValue(CAMPOS_MOVIMIENTO.NUMERO_FACTURA, movimiento.numeroFactura);
      setValue(
        CAMPOS_MOVIMIENTO.FECHA_RECEPCION,
        movimiento.fechaResepcion ? dayjs(movimiento.fechaResepcion) : null
      );

      setValue(
        CAMPOS_MOVIMIENTO.ID_CONCEPTO_MOVIMIENTO,
        conceptos.find((e) => e.id === movimiento.idConceptoMovimiento)
      );
      setValue(
        CAMPOS_MOVIMIENTO.ID_PROVEEDOR,
        proveedores.find((e) => e.id === movimiento.idProveedor)
      );

      setValue(
        CAMPOS_MOVIMIENTO.ID_FAMILIA,
        familias.find((e) => e.id === movimiento.idFamilia)
      );
      setValue(CAMPOS_MOVIMIENTO.OBSERVACIONES, movimiento.observaciones);
      setValue(CAMPOS_MOVIMIENTO.IMPORTE_TOTAL, movimiento.importeTotal);
      setValue(CAMPOS_MOVIMIENTO.ARTICULOS, articulos);
      setValue(CAMPOS_MOVIMIENTO.AUX_ARTICULOS, filasTabla);
    }
  }, [complementos.movimiento]);

  const getStepContent = (step) => {
    switch (step) {
      case datoGeneral:
        return (
          <EntradaSalidaDatoGeneralForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
          />
        );
      default:
        return (
          <EntradaSalidaArticuloForm
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
      handleEnviar={handleSubmitMovimiento}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default EntradaSalidaMovimientoForm;
