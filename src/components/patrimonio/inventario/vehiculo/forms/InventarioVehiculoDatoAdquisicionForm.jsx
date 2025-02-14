import FormCampoAutocompletar from "../../../../utils/FormCampoAutocompletar";
import FormCampoEntrada from "../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../utils/FormCampoCalendario";
import { CAMPOS_INVENTARIO_VEHICULO } from "../../../../../settings/formConfig";

const InventarioVehiculoDatoAdquisicionForm = ({
  formManager = null,
  complementos = {},
}) => {
  const {
    ESTADO_FISICO,
    FOLIO_FACTURA,
    FECHA_FACTURA,
    NO_LICITACION,
    OBSERVACION_LICITACION,
    FECHA_LICITACION,
    ANIO_EMICION,
    NUMERO_PLACA,
    NO_SERIES,
    NUMERO_MOTOR,
    ANIO_MODELO,
    NUMERO_ECONOMICO,
    DIAS_GARANTIA,
  } = CAMPOS_INVENTARIO_VEHICULO;
  const { control } = formManager;
  const { estadosFisicos } = complementos;
  return (
    <>
      <FormCampoEntrada
        id={ANIO_EMICION}
        name={ANIO_EMICION}
        label="Año Emición"
        type="number"
        defaultValue="0"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={NUMERO_PLACA}
        name={NUMERO_PLACA}
        label="Número Placa Vehículo"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={NO_SERIES}
        name={NO_SERIES}
        label="No. Serie"
        control={control}
        disabled
        required
      />
      <FormCampoEntrada
        id={NUMERO_MOTOR}
        name={NUMERO_MOTOR}
        label="No. Motor"
        type="number"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={FOLIO_FACTURA}
        name={FOLIO_FACTURA}
        label="Folio Factura"
        control={control}
        disabled
      />
      <FormCampoCalendario
        id={FECHA_FACTURA}
        name={FECHA_FACTURA}
        label="Fecha (Compra/Factura)"
        control={control}
        defaultValue={null}
        disabled
        required
      />
      <FormCampoEntrada
        id={ANIO_MODELO}
        name={ANIO_MODELO}
        label="Año Modelo"
        type="number"
        defaultValue="0"
        control={control}
        disabled
      />

      <FormCampoEntrada
        id={NUMERO_ECONOMICO}
        name={NUMERO_ECONOMICO}
        label="Número Economico"
        type="number"
        control={control}
        disabled
      />

      <FormCampoEntrada
        id={DIAS_GARANTIA}
        name={DIAS_GARANTIA}
        label="Garantía (Días)"
        type="number"
        defaultValue="0"
        control={control}
        disabled
      />

      <FormCampoAutocompletar
        id={ESTADO_FISICO}
        name={ESTADO_FISICO}
        label="Estado Físico"
        control={control}
        options={estadosFisicos}
        required
        disabled
      />

      <FormCampoEntrada
        id={NO_LICITACION}
        name={NO_LICITACION}
        label="No.Licitacion"
        type="number"
        control={control}
        disabled
      />
      <FormCampoCalendario
        id={FECHA_LICITACION}
        name={FECHA_LICITACION}
        label="Fecha de Licitación"
        control={control}
        defaultValue={null}
        disabled
      />
      <FormCampoEntrada
        id={OBSERVACION_LICITACION}
        name={OBSERVACION_LICITACION}
        label="Observación de la Licitación"
        control={control}
        disabled
      />
    </>
  );
};

export default InventarioVehiculoDatoAdquisicionForm;
