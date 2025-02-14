import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import {
  CAMPOS_ALTA_MUEBLE,
  CAMPOS_ALTA_VEHICULO,
  CAMPOS_MODIFICACION_VEHICULO,
} from "../../../../../../settings/formConfig";

const AdministradorVehiculoModificacionDatoGeneralForm = ({
  formManager = null,
  complementos = {},
  esVisualizacion = false,
  esModificacionFactura = false,
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
  } = CAMPOS_MODIFICACION_VEHICULO;
  const { control, formState } = formManager;
  const { errors } = formState;
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
        error={errors[ID_CLAVE]}
        helperText={errors[ID_CLAVE]?.message}
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
        id={ID_LINEA}
        name={ID_LINEA}
        label="Linea"
        control={control}
        options={lineas}
        error={errors[ID_LINEA]}
        helperText={errors[ID_LINEA]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoAutocompletar
        id={ID_VERSION}
        name={ID_VERSION}
        label="Versión"
        control={control}
        options={versiones}
        error={errors[ID_VERSION]}
        helperText={errors[ID_VERSION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoAutocompletar
        id={ID_CLASE}
        name={ID_CLASE}
        label="Clase"
        control={control}
        options={clases}
        error={errors[ID_CLASE]}
        helperText={errors[ID_CLASE]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoAutocompletar
        id={ID_TIPO}
        name={ID_TIPO}
        label="Tipo"
        control={control}
        options={tipos}
        error={errors[ID_TIPO]}
        helperText={errors[ID_TIPO]?.message}
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
      <FormCampoAutocompletar
        id={ID_COMBUSTIBLE}
        name={ID_COMBUSTIBLE}
        label="Combustible"
        control={control}
        options={combustibles}
        error={errors[ID_COMBUSTIBLE]}
        helperText={errors[ID_COMBUSTIBLE]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
    </>
  );
};

export default AdministradorVehiculoModificacionDatoGeneralForm;
