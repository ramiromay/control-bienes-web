import FormCampoAutocompletarMultiple from "../../../../../utils/FormCampoAutocompletarMultiple";
import { CAMPOS_BAJA_VEHICULO } from "../../../../../../settings/formConfig";

const AdministradorVehiculoBajaDocumentoForm = ({
  formManager = null,
  esVisualizacion = false,
  complementos = {},
}) => {
  const { LISTA_DOCUMENTO } = CAMPOS_BAJA_VEHICULO;
  const { control, formState } = formManager;
  const { errors } = formState;
  const { documentos } = complementos;
  return (
    <>
      <FormCampoAutocompletarMultiple
        id={LISTA_DOCUMENTO}
        name={LISTA_DOCUMENTO}
        label="Documentos"
        control={control}
        options={documentos}
        error={errors[LISTA_DOCUMENTO]}
        helperText={errors[LISTA_DOCUMENTO]?.message}
        disabled={esVisualizacion}
        multiple
      />
    </>
  );
};

export default AdministradorVehiculoBajaDocumentoForm;
