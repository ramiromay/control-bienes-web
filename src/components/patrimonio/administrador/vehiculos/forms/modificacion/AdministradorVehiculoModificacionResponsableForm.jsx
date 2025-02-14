import FormCampoAutocompletarMultiple from "../../../../../utils/FormCampoAutocompletarMultiple";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import {
  CAMPOS_ALTA_VEHICULO,
  CAMPOS_MODIFICACION_VEHICULO,
} from "../../../../../../settings/formConfig";
import { useEffect, useState } from "react";

const AdministradorVehiculoModificacionResponsableForm = ({
  formManager = null,
  complementos = {},
  esVisualizacion = false,
  esModificacion = false,
  esModificacionFactura = false,
}) => {
  const { RESPONSABLES, OBSERVACION_RESPONSABLE, UNIDAD_ADMINISTRATIVA } =
    CAMPOS_MODIFICACION_VEHICULO;
  const { control, formState, getValues, setValue } = formManager;
  const { errors } = formState;
  const { responsables } = complementos;
  const unidadAdministrativa = getValues(UNIDAD_ADMINISTRATIVA);
  const [responsablesDetalleAlta, setResponsablesDetalleAlta] = useState([]);

  useEffect(() => {
    const responsablesFiltrados = responsables.filter((responsable) => {
      return (
        unidadAdministrativa &&
        responsable.idUnidadAdministrativa === unidadAdministrativa.id
      );
    });
    if (esModificacion) {
      setValue(RESPONSABLES, responsablesFiltrados);
    }
    setResponsablesDetalleAlta(responsablesFiltrados);
  }, [unidadAdministrativa]);

  return (
    <>
      <FormCampoAutocompletarMultiple
        id={RESPONSABLES}
        name={RESPONSABLES}
        label="Responsables"
        control={control}
        options={responsablesDetalleAlta}
        error={errors[RESPONSABLES]}
        helperText={errors[RESPONSABLES]?.message}
        disabled
        multiple
        required
      />
      <FormCampoEntrada
        id={OBSERVACION_RESPONSABLE}
        name={OBSERVACION_RESPONSABLE}
        label="Observaciones"
        control={control}
        error={errors[OBSERVACION_RESPONSABLE]}
        helperText={errors[OBSERVACION_RESPONSABLE]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
    </>
  );
};

export default AdministradorVehiculoModificacionResponsableForm;
