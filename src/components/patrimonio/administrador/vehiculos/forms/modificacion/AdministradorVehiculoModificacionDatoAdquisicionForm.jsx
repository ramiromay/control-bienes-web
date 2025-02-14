import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import {
  CAMPOS_ALTA_VEHICULO,
  CAMPOS_MODIFICACION_VEHICULO,
} from "../../../../../../settings/formConfig";

const AdministradorVehiculoModificacionDatoAdquisicionForm = ({
  formManager = null,
  esVisualizacion = false,
  complementos = {},
  esModificacionFactura = false,
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
  } = CAMPOS_MODIFICACION_VEHICULO;
  const { control, formState } = formManager;
  const { errors } = formState;
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
        error={errors[ANIO_EMICION]}
        helperText={errors[ANIO_EMICION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoEntrada
        id={NUMERO_PLACA}
        name={NUMERO_PLACA}
        label="Número Placa Vehículo"
        control={control}
        error={errors[NUMERO_PLACA]}
        helperText={errors[NUMERO_PLACA]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoEntrada
        id={NO_SERIES}
        name={NO_SERIES}
        label="No. Serie"
        control={control}
        error={errors[NO_SERIES]}
        helperText={errors[NO_SERIES]?.message}
        disabled={esVisualizacion || esModificacionFactura}
        required
      />
      <FormCampoEntrada
        id={NUMERO_MOTOR}
        name={NUMERO_MOTOR}
        label="No. Motor"
        type="number"
        control={control}
        error={errors[NUMERO_MOTOR]}
        helperText={errors[NUMERO_MOTOR]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoEntrada
        id={FOLIO_FACTURA}
        name={FOLIO_FACTURA}
        label="Folio Factura"
        control={control}
        error={errors[FOLIO_FACTURA]}
        helperText={errors[FOLIO_FACTURA]?.message}
        disabled={esVisualizacion || !esModificacionFactura}
      />
      <FormCampoCalendario
        id={FECHA_FACTURA}
        name={FECHA_FACTURA}
        label="Fecha (Compra/Factura)"
        control={control}
        defaultValue={null}
        error={errors[FECHA_FACTURA]}
        helperText={errors[FECHA_FACTURA]?.message}
        disabled={esVisualizacion || !esModificacionFactura}
        required
      />
      <FormCampoEntrada
        id={ANIO_MODELO}
        name={ANIO_MODELO}
        label="Año Modelo"
        type="number"
        defaultValue="0"
        control={control}
        error={errors[ANIO_MODELO]}
        helperText={errors[ANIO_MODELO]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />

      <FormCampoEntrada
        id={NUMERO_ECONOMICO}
        name={NUMERO_ECONOMICO}
        label="Número Economico"
        type="number"
        control={control}
        error={errors[NUMERO_ECONOMICO]}
        helperText={errors[NUMERO_ECONOMICO]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />

      <FormCampoEntrada
        id={DIAS_GARANTIA}
        name={DIAS_GARANTIA}
        label="Garantía (Días)"
        type="number"
        defaultValue="0"
        control={control}
        error={errors[DIAS_GARANTIA]}
        helperText={errors[DIAS_GARANTIA]?.message}
        disabled={esVisualizacion || !esModificacionFactura}
      />

      <FormCampoAutocompletar
        id={ESTADO_FISICO}
        name={ESTADO_FISICO}
        label="Estado Físico"
        control={control}
        options={estadosFisicos}
        error={errors[ESTADO_FISICO]}
        helperText={errors[ESTADO_FISICO]?.message}
        required
        disabled={esVisualizacion || esModificacionFactura}
      />

      <FormCampoEntrada
        id={NO_LICITACION}
        name={NO_LICITACION}
        label="No.Licitacion"
        type="number"
        control={control}
        error={errors[NO_LICITACION]}
        helperText={errors[NO_LICITACION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoCalendario
        id={FECHA_LICITACION}
        name={FECHA_LICITACION}
        label="Fecha de Licitación"
        control={control}
        defaultValue={null}
        error={errors[FECHA_LICITACION]}
        helperText={errors[FECHA_LICITACION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoEntrada
        id={OBSERVACION_LICITACION}
        name={OBSERVACION_LICITACION}
        label="Observación de la Licitación"
        control={control}
        error={errors[OBSERVACION_LICITACION]}
        helperText={errors[OBSERVACION_LICITACION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
    </>
  );
};

export default AdministradorVehiculoModificacionDatoAdquisicionForm;
