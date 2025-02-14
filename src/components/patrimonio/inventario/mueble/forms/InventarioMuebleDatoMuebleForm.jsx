import FormCampoAutocompletar from "@components/utils/FormCampoAutocompletar";
import FormCampoEntrada from "@components/utils/FormCampoEntrada";
import FormCampoCalendario from "@components/utils/FormCampoCalendario";
import { CAMPOS_ALTA_MUEBLE } from "@settings/formConfig";
import { CAMPOS_INVENTARIO_MUEBLE } from "../../../../../settings/formConfig";

const InventarioMuebleDatoMuebleForm = ({
  formManager = null,
  complementos = {},
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
  } = CAMPOS_INVENTARIO_MUEBLE;
  const { control } = formManager;
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
        required
        disabled
      />
      <FormCampoAutocompletar
        id={MARCA}
        name={MARCA}
        label="Marca"
        control={control}
        options={marcas}
        disabled
      />
      <FormCampoAutocompletar
        id={COLOR}
        name={COLOR}
        label="Color"
        control={control}
        options={colores}
        disabled
      />
      <FormCampoEntrada
        id={FOLIO_FACTURA}
        name={FOLIO_FACTURA}
        label="Folio Factura"
        control={control}
        required
        disabled
      />
      <FormCampoCalendario
        id={FECHA_FACTURA}
        name={FECHA_FACTURA}
        label="Fecha de la Factura"
        control={control}
        defaultValue={null}
        required
        disabled
      />
      <FormCampoEntrada
        id={PRECIO_UNITARIO}
        name={PRECIO_UNITARIO}
        label="Precio Unitario"
        type="number"
        defaultValue=".00"
        control={control}
        required
        disabled
      />
      <FormCampoCalendario
        id={FECHA_COMPRA}
        name={FECHA_COMPRA}
        label="Fecha de la Compra"
        control={control}
        defaultValue={null}
        required
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
      <FormCampoEntrada
        id={VIDA_UTIL}
        name={VIDA_UTIL}
        label="Vida Útil (Años)"
        type="number"
        defaultValue="0"
        control={control}
        required
        disabled
      />
      <FormCampoCalendario
        id={FECHA_INICIO_USO}
        name={FECHA_INICIO_USO}
        label="Inicio de Uso"
        control={control}
        defaultValue={null}
        required
        disabled
      />
      <FormCampoEntrada
        id={PRECIO_DESECHABLE}
        name={PRECIO_DESECHABLE}
        label="Precio Desechable"
        type="number"
        defaultValue=".00"
        control={control}
        required
        disabled
      />
      <FormCampoEntrada
        id={OBSERVACION_BIEN}
        name={OBSERVACION_BIEN}
        label="Observaciones sobre el Bien"
        control={control}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={UBICACION}
        name={UBICACION}
        label="Ubicación"
        control={control}
        options={ubicaciones}
        disabled
        required
      />
      <FormCampoAutocompletar
        id={MUNICIPIO}
        name={MUNICIPIO}
        label="Municipio"
        control={control}
        options={municipios}
        disabled
        required
      />
    </>
  );
};

export default InventarioMuebleDatoMuebleForm;
