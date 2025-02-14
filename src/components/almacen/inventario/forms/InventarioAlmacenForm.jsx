import { useEffect, useState } from "react";
import { useSistema } from "../../../../context/SistemaContext";
import useTabla from "../../../../context/Tabla/useTabla";
import useFormPasos from "../../../../context/useFormPasos";
import { movimientoValidacion } from "../../../../settings/validacionConfig";
import { getBMS } from "../../../../services/general";
import { getAlmacenes, getBienesAlmacen } from "../../../../services/almacen";
import { getFamilias } from "../../../../services/catalogo";
import { mapArray } from "../../../../settings/utils";
import { compBmsMapppingRules } from "../../../../settings/mappingRulesConfig";
import DialogoEmergentePasos from "../../../utils/DialogoEmergentePasos";
import { useInventarioAlmacen } from "../../../../context/InventarioAlmacenContext";
import { CAMPOS_INVENTARIO_ALMACEN } from "../../../../settings/formConfig";
import InventarioAlmacenDatoGeneralForm from "./InventarioAlmacenDatoGeneralForm";

const pasosFormAltaMueble = ["Datos Generales"];

const InventarioAlmacenForm = () => {
  const { handleError } = useSistema();
  const { dialogoManager } = useInventarioAlmacen();
  const {
    dialogo,
    esDialogoVisualizacion,
    handleCerrarDialogo,
    getTituloDialogo,
  } = dialogoManager;
  const { filaSeleccionada } = useTabla();
  const [cargando, setCargando] = useState(true);
  const [complementos, setComplementos] = useState({
    bms: [],
    almacenes: [],
    familias: [],
    bien: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const tituloDialogo = getTituloDialogo("Bien");

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
  const { formState, setValue } = formManager;
  const { errors } = formState;

  useEffect(() => {
    setCargando(true);
    Promise.all([
      getBMS(),
      getAlmacenes(),
      getFamilias(),
      getBienesAlmacen({
        idBien: filaSeleccionada[0],
      }),
    ])
      .then(([bmsData, almacenes, familias, bien]) => {
        const bms = mapArray(bmsData, compBmsMapppingRules);
        setComplementos({
          bms: bms,
          almacenes: almacenes,
          familias: familias,
          bien: bien,
        });
      })
      .catch((error) => {
        handleCloseForm();
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    const { familias, almacenes, bms, bien } = complementos;
    if (bien) {
      const formateador = new Intl.NumberFormat("es-MX", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
      setValue(
        CAMPOS_INVENTARIO_ALMACEN.ID_ALMACEN,
        almacenes.find((e) => e.id === bien.idAlmacen)
      );
      setValue(
        CAMPOS_INVENTARIO_ALMACEN.ID_BMS,
        bms.find((e) => e.id === bien.idBms)
      );
      setValue(
        CAMPOS_INVENTARIO_ALMACEN.ID_FAMILIA,
        familias.find((e) => e.id === bien.idFamilia)
      );
      setValue(
        CAMPOS_INVENTARIO_ALMACEN.CODIGO_ARMONIZADO,
        bien.codigoArmonizado.toString()
      );
      setValue(
        CAMPOS_INVENTARIO_ALMACEN.EXISTENCIA,
        formateador.format(bien.existencia)
      );
      setValue(
        CAMPOS_INVENTARIO_ALMACEN.PRECIO_UNITARIO,
        formateador.format(bien.precioUnitario)
      );
      setValue(CAMPOS_INVENTARIO_ALMACEN.UNIDAD_MEDIDA, bien.unidadMedida);
    }
  }, [complementos.bien]);

  const getStepContent = (step) => {
    switch (step) {
      default:
        return (
          <InventarioAlmacenDatoGeneralForm
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

export default InventarioAlmacenForm;
