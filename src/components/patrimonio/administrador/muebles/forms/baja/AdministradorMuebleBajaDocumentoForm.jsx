import FormCampoAutocompletarMultiple from "../../../../../utils/FormCampoAutocompletarMultiple";
import { CAMPOS_BAJA_MUEBLE } from "../../../../../../settings/formConfig";

const AdministradorMuebleBajaDocumentoForm = ({
  formManager = null,
  esVisualizacion = false,
  complementos = {},
}) => {
  const { LISTA_DOCUMENTO: LISTA_DOCUMENTARIO } = CAMPOS_BAJA_MUEBLE;
  const { control, formState } = formManager;
  const { errors } = formState;
  const { documentos } = complementos;
  return (
    <>
      <FormCampoAutocompletarMultiple
        id={LISTA_DOCUMENTARIO}
        name={LISTA_DOCUMENTARIO}
        label="Documentos"
        control={control}
        options={documentos}
        error={errors[LISTA_DOCUMENTARIO]}
        helperText={errors[LISTA_DOCUMENTARIO]?.message}
        disabled={esVisualizacion}
        multiple
        required
      />
    </>
  );
};

export default AdministradorMuebleBajaDocumentoForm;
