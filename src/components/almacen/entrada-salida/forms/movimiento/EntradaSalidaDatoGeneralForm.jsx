import FormCampoEntrada from "../../../../utils/FormCampoEntrada";
import { CAMPOS_MOVIMIENTO } from "../../../../../settings/formConfig";
import FormCampoAutocompletar from "../../../../utils/FormCampoAutocompletar";
import FormCampoCalendario from "../../../../utils/FormCampoCalendario";
import { useState } from "react";

const EntradaSalidaDatoGeneralForm = ({
  formManager = null,
  esVisualizacion = false,
  complementos = {},
}) => {
  const {
    ID_TIPO_MOVIMIENTO,
    FOLIO_MOVIMIENTO,
    FECHA_RECEPCION,
    ID_ALMACEN,
    ID_CONCEPTO_MOVIMIENTO,
    ID_METODO_ADQUISICION,
    ID_PROGRAMA_OPERATIVO,
    ID_PROVEEDOR,
    OBSERVACIONES,
    NUMERO_FACTURA,
    ARTICULOS,
    AUX_ARTICULOS,
    IMPORTE_TOTAL,
  } = CAMPOS_MOVIMIENTO;
  const [conceptoTipoMovimiento, setConceptoTipoMovimiento] = useState([]);
  const { control, formState, setValue } = formManager;
  const { errors } = formState;
  const {
    tiposMovimientos,
    conceptos,
    almacenes,
    programasOperativos,
    proveedores,
    metodosAdquisicion,
  } = complementos;

  const changeTipoMovimiento = (tipoMovimiento) => {
    setValue(IMPORTE_TOTAL, null);
    setValue(ARTICULOS, null);
    setValue(AUX_ARTICULOS, null);

    if (!tipoMovimiento) {
      setValue(ID_CONCEPTO_MOVIMIENTO, null);
      setValue(ID_CONCEPTO_MOVIMIENTO, null);
      setConceptoTipoMovimiento([]);
      return;
    }
    const itemsFiltrado = conceptos.filter(
      (e) => e.idTipoMovimiento === tipoMovimiento.id
    );
    setValue(ID_CONCEPTO_MOVIMIENTO, null);
    setConceptoTipoMovimiento(itemsFiltrado);
  };

  return (
    <>
      <FormCampoEntrada
        id={FOLIO_MOVIMIENTO}
        name={FOLIO_MOVIMIENTO}
        label="Folio Movimiento"
        defaultValue="Automatico"
        control={control}
        error={errors[FOLIO_MOVIMIENTO]}
        helperText={errors[FOLIO_MOVIMIENTO]?.message}
        disabled
      />
      <FormCampoAutocompletar
        id={ID_TIPO_MOVIMIENTO}
        name={ID_TIPO_MOVIMIENTO}
        label="Tipo de Movimiento"
        control={control}
        options={tiposMovimientos}
        handleOnChange={changeTipoMovimiento}
        error={errors[ID_TIPO_MOVIMIENTO]}
        helperText={errors[ID_TIPO_MOVIMIENTO]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_CONCEPTO_MOVIMIENTO}
        name={ID_CONCEPTO_MOVIMIENTO}
        label="Concepto Movimiento"
        control={control}
        options={conceptoTipoMovimiento}
        error={errors[ID_CONCEPTO_MOVIMIENTO]}
        helperText={errors[ID_CONCEPTO_MOVIMIENTO]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_ALMACEN}
        name={ID_ALMACEN}
        label="Almacen"
        control={control}
        options={almacenes}
        error={errors[ID_ALMACEN]}
        helperText={errors[ID_ALMACEN]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_METODO_ADQUISICION}
        name={ID_METODO_ADQUISICION}
        label="Tipo de Adquisición"
        control={control}
        options={metodosAdquisicion}
        error={errors[ID_METODO_ADQUISICION]}
        helperText={errors[ID_METODO_ADQUISICION]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_PROGRAMA_OPERATIVO}
        name={ID_PROGRAMA_OPERATIVO}
        label="Programa Operativo"
        control={control}
        options={programasOperativos}
        error={errors[ID_PROGRAMA_OPERATIVO]}
        helperText={errors[ID_PROGRAMA_OPERATIVO]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={NUMERO_FACTURA}
        name={NUMERO_FACTURA}
        label="Número Factura"
        control={control}
        error={errors[NUMERO_FACTURA]}
        helperText={errors[NUMERO_FACTURA]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoCalendario
        id={FECHA_RECEPCION}
        name={FECHA_RECEPCION}
        label="Fecha de Recepción"
        control={control}
        defaultValue={null}
        error={errors[FECHA_RECEPCION]}
        helperText={errors[FECHA_RECEPCION]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_PROVEEDOR}
        name={ID_PROVEEDOR}
        label="Proveedor"
        control={control}
        options={proveedores}
        error={errors[ID_PROVEEDOR]}
        helperText={errors[ID_PROVEEDOR]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={OBSERVACIONES}
        name={OBSERVACIONES}
        label="Observaciones"
        control={control}
        multiline
        rows={4}
        required
        error={errors[OBSERVACIONES]}
        helperText={errors[OBSERVACIONES]?.message}
        disabled={esVisualizacion}
      />
    </>
  );
};

export default EntradaSalidaDatoGeneralForm;
