import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import { CAMPOS_ALTA_MUEBLE } from "../../../../../../settings/formConfig";

const AdministradorMuebleModificacionDatoMuebleForm = ({
  formManager = null,
  complementos = {},
  esVisualizacion = false,
  esModificacionFactura = false,
}) => {
  const {
    ESTADO_FISICO,
    MARCA,
    COLOR,
    FOLIO_FACTURA,
    FECHA_FACTURA,
    PRECIO_UNITARIO,
    FECHA_COMPRA,
    DIAS_GARANTIA,
    VIDA_UTIL,
    FECHA_INICIO_USO,
    PRECIO_DESECHABLE,
    OBSERVACION_BIEN,
    UBICACION,
    MUNICIPIO,
  } = CAMPOS_ALTA_MUEBLE;
  const { control, formState } = formManager;
  const { errors } = formState;
  const { estadosFisicos, marcas, colores, ubicaciones, municipios } =
    complementos;
  return (
    <>
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
      <FormCampoAutocompletar
        id={MARCA}
        name={MARCA}
        label="Marca"
        control={control}
        options={marcas}
        error={errors[MARCA]}
        helperText={errors[MARCA]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoAutocompletar
        id={COLOR}
        name={COLOR}
        label="Color"
        control={control}
        options={colores}
        error={errors[COLOR]}
        helperText={errors[COLOR]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoEntrada
        id={FOLIO_FACTURA}
        name={FOLIO_FACTURA}
        label="Folio Factura"
        control={control}
        error={errors[FOLIO_FACTURA]}
        helperText={errors[FOLIO_FACTURA]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
      />
      <FormCampoCalendario
        id={FECHA_FACTURA}
        name={FECHA_FACTURA}
        label="Fecha de la Factura"
        control={control}
        defaultValue={null}
        error={errors[FECHA_FACTURA]}
        helperText={errors[FECHA_FACTURA]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
      />
      <FormCampoEntrada
        id={PRECIO_UNITARIO}
        name={PRECIO_UNITARIO}
        label="Precio Unitario"
        type="number"
        defaultValue=".00"
        control={control}
        error={errors[PRECIO_UNITARIO]}
        helperText={errors[PRECIO_UNITARIO]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
      />
      <FormCampoCalendario
        id={FECHA_COMPRA}
        name={FECHA_COMPRA}
        label="Fecha de la Compra"
        control={control}
        defaultValue={null}
        error={errors[FECHA_COMPRA]}
        helperText={errors[FECHA_COMPRA]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
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
      <FormCampoEntrada
        id={VIDA_UTIL}
        name={VIDA_UTIL}
        label="Vida Útil (Años)"
        type="number"
        defaultValue="0"
        control={control}
        error={errors[VIDA_UTIL]}
        helperText={errors[VIDA_UTIL]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
      />
      <FormCampoCalendario
        id={FECHA_INICIO_USO}
        name={FECHA_INICIO_USO}
        label="Inicio de Uso"
        control={control}
        defaultValue={null}
        error={errors[FECHA_INICIO_USO]}
        helperText={errors[FECHA_INICIO_USO]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
      />
      <FormCampoEntrada
        id={PRECIO_DESECHABLE}
        name={PRECIO_DESECHABLE}
        label="Precio Desechable"
        type="number"
        defaultValue=".00"
        control={control}
        error={errors[PRECIO_DESECHABLE]}
        helperText={errors[PRECIO_DESECHABLE]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
      />
      <FormCampoEntrada
        id={OBSERVACION_BIEN}
        name={OBSERVACION_BIEN}
        label="Observaciones sobre el Bien"
        control={control}
        error={errors[OBSERVACION_BIEN]}
        helperText={errors[OBSERVACION_BIEN]?.message}
        required
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoAutocompletar
        id={UBICACION}
        name={UBICACION}
        label="Ubicación"
        control={control}
        options={ubicaciones}
        error={errors[UBICACION]}
        helperText={errors[UBICACION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
        required
      />
      <FormCampoAutocompletar
        id={MUNICIPIO}
        name={MUNICIPIO}
        label="Municipio"
        control={control}
        options={municipios}
        error={errors[MUNICIPIO]}
        helperText={errors[MUNICIPIO]?.message}
        disabled={esVisualizacion || esModificacionFactura}
        required
      />
    </>
  );
};

export default AdministradorMuebleModificacionDatoMuebleForm;
