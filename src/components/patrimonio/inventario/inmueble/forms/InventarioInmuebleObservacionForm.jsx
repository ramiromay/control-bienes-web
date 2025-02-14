import FormCampoEntrada from "../../../../utils/FormCampoEntrada";
import { CAMPOS_INVENTARIO_INMUEBLE } from "../../../../../settings/formConfig";

const InventarioInmuebleObservacionForm = ({ formManager = null }) => {
  const { OBSERVACION_INMUEBLE, OBSERVACION_SUPERVISION } =
    CAMPOS_INVENTARIO_INMUEBLE;
  const { control } = formManager;
  return (
    <>
      <FormCampoEntrada
        id={OBSERVACION_INMUEBLE}
        name={OBSERVACION_INMUEBLE}
        label="Observaciones del Inmueble"
        control={control}
        required
        multiline
        rows={4}
        disabled
      />
      <FormCampoEntrada
        id={OBSERVACION_SUPERVISION}
        name={OBSERVACION_SUPERVISION}
        label="Observaciones de Supervisión"
        control={control}
        required
        multiline
        rows={4}
        disabled
      />
    </>
  );
};

export default InventarioInmuebleObservacionForm;
