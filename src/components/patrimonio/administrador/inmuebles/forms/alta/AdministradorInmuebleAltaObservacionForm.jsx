import React from "react";
import { CAMPOS_ALTA_INMUEBLE } from "../../../../../../settings/formConfig";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";

const AdministradorInmuebleAltaObservacionForm = ({
  formManager = null,
  esVisualizacion = false,
}) => {
  const { OBSERVACION_INMUEBLE, OBSERVACION_SUPERVISION } =
    CAMPOS_ALTA_INMUEBLE;
  const { control, formState } = formManager;
  const { errors } = formState;
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
        error={errors[OBSERVACION_INMUEBLE]}
        helperText={errors[OBSERVACION_INMUEBLE]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={OBSERVACION_SUPERVISION}
        name={OBSERVACION_SUPERVISION}
        label="Observaciones de Supervisión"
        control={control}
        required
        multiline
        rows={4}
        error={errors[OBSERVACION_SUPERVISION]}
        helperText={errors[OBSERVACION_SUPERVISION]?.message}
        disabled={esVisualizacion}
      />
    </>
  );
};

export default AdministradorInmuebleAltaObservacionForm;
