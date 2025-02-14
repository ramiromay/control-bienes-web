import FormCampoAutocompletar from "../../../../utils/FormCampoAutocompletar";
import { CAMPOS_INVENTARIO_VEHICULO } from "../../../../../settings/formConfig";

const InventarioVehiculoDatoGeneralForm = ({
  formManager = null,
  complementos = {},
}) => {
  const {
    MARCA,
    COLOR,
    ID_CLAVE,
    ID_CLASE,
    ID_COMBUSTIBLE,
    ID_TIPO,
    ID_VERSION,
    ID_LINEA,
  } = CAMPOS_INVENTARIO_VEHICULO;
  const { control } = formManager;
  const {
    marcas,
    colores,
    claves,
    clases,
    combustibles,
    tipos,
    versiones,
    lineas,
  } = complementos;
  return (
    <>
      <FormCampoAutocompletar
        id={ID_CLAVE}
        name={ID_CLAVE}
        label="Clave"
        control={control}
        options={claves}
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
        id={ID_LINEA}
        name={ID_LINEA}
        label="Linea"
        control={control}
        options={lineas}
        disabled
      />
      <FormCampoAutocompletar
        id={ID_VERSION}
        name={ID_VERSION}
        label="Versión"
        control={control}
        options={versiones}
        disabled
      />
      <FormCampoAutocompletar
        id={ID_CLASE}
        name={ID_CLASE}
        label="Clase"
        control={control}
        options={clases}
        disabled
      />
      <FormCampoAutocompletar
        id={ID_TIPO}
        name={ID_TIPO}
        label="Tipo"
        control={control}
        options={tipos}
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
      <FormCampoAutocompletar
        id={ID_COMBUSTIBLE}
        name={ID_COMBUSTIBLE}
        label="Combustible"
        control={control}
        options={combustibles}
        disabled
      />
    </>
  );
};

export default InventarioVehiculoDatoGeneralForm;
