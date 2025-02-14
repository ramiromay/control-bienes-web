import FormCampoAutocompletarMultiple from "../../../../utils/FormCampoAutocompletarMultiple";
import FormCampoEntrada from "../../../../utils/FormCampoEntrada";
import { useEffect, useState } from "react";
import { CAMPOS_INVENTARIO_VEHICULO } from "../../../../../settings/formConfig";

const InventarioVehiculoResponsableForm = ({
  formManager = null,
  complementos = {},
  esModificacion = false,
}) => {
  const { RESPONSABLES, OBSERVACION_RESPONSABLE, UNIDAD_ADMINISTRATIVA } =
    CAMPOS_INVENTARIO_VEHICULO;
  const { control, getValues, setValue } = formManager;
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
        disabled
        multiple
        required
      />
      <FormCampoEntrada
        id={OBSERVACION_RESPONSABLE}
        name={OBSERVACION_RESPONSABLE}
        label="Observaciones"
        control={control}
        disabled
      />
    </>
  );
};

export default InventarioVehiculoResponsableForm;
