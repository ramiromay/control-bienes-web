import { useEffect, useState } from "react";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import FormCampoAutocompletarMultiple from "../../../../../utils/FormCampoAutocompletarMultiple";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import {
  CAMPOS_BAJA_MUEBLE,
  CAMPOS_BAJA_VEHICULO,
} from "../../../../../../settings/formConfig";
import ItemInfoExtraAutocompletar from "../../../../../utils/ItemInfoExtraAutocompletar";

const AdministradorVehiculoBajaDatoGeneralForm = ({
  formManager = null,
  esVisualizacion = false,
  solicitudSeleccionada = 0,
  complementos = {},
}) => {
  const {
    FOLIO_SOLICITUD,
    UNIDAD_ADMINISTRATIVA,
    EMPLEADO,
    TIPO_BIEN,
    FOLIO_BIEN,
    OBSERVACIONES,
    FOLIO_DOCUMENTO,
    FECHA_DOCUMENTO,
  } = CAMPOS_BAJA_VEHICULO;
  const [bienesXUnidadAdministrativa, setBienesXUnidadAdministrativa] =
    useState([]);
  const { unidadesAdministrativas, bienes, empleados } = complementos;
  const { control, formState, setValue, watch } = formManager;
  const { errors } = formState;
  const unidadAdministrativa = watch(UNIDAD_ADMINISTRATIVA);

  const changeUnidadAdministrativa = (unidadAdministrativa) => {
    if (!unidadAdministrativa) {
      setBienesXUnidadAdministrativa([]);
      setValue(FOLIO_BIEN, null);
      return;
    }
    const bienesFiltrados = bienes.filter(
      (bien) => bien.nivelUnidadAdministrativa === unidadAdministrativa.id
    );
    setValue(FOLIO_BIEN, null);
    setBienesXUnidadAdministrativa(bienesFiltrados);
  };

  useEffect(() => {
    if (unidadAdministrativa) {
      const bienesFiltrados = bienes.filter(
        (bien) => bien.nivelUnidadAdministrativa === unidadAdministrativa.id
      );
      setBienesXUnidadAdministrativa(bienesFiltrados);
    }
  }, [unidadAdministrativa]);

  return (
    <>
      <FormCampoEntrada
        id={FOLIO_SOLICITUD}
        name={FOLIO_SOLICITUD}
        label="Folio Solicitud"
        control={control}
        defaultValue={solicitudSeleccionada}
        required
        disabled
      />
      <FormCampoEntrada
        id={TIPO_BIEN}
        name={TIPO_BIEN}
        label="Tipo de Bien"
        control={control}
        defaultValue="MAQUINARIA Y VEHICULOS"
        required
        disabled
      />
      <FormCampoAutocompletar
        id={UNIDAD_ADMINISTRATIVA}
        name={UNIDAD_ADMINISTRATIVA}
        label="Unidad Administrativa"
        control={control}
        options={unidadesAdministrativas}
        handleOnChange={changeUnidadAdministrativa}
        error={errors[UNIDAD_ADMINISTRATIVA]}
        helperText={errors[UNIDAD_ADMINISTRATIVA]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={EMPLEADO}
        name={EMPLEADO}
        label="Solicitante"
        control={control}
        options={empleados}
        renderOption={ItemInfoExtraAutocompletar}
        getOptionLabel={(option) => `${option.id} - ${option.name}`}
        isOptionEqualToValue={(option, value) =>
          option.id === value.id ||
          option.name === value.name ||
          option.infoExtra === value.infoExtra
        }
        error={errors[EMPLEADO]}
        helperText={errors[EMPLEADO]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletarMultiple
        id={FOLIO_BIEN}
        name={FOLIO_BIEN}
        label="Folio de Bien"
        control={control}
        options={bienesXUnidadAdministrativa}
        error={errors[FOLIO_BIEN]}
        helperText={errors[FOLIO_BIEN]?.message}
        getOptionLabel={(option) =>
          `${option.folioBien} - ${option.descripcion}`
        }
        isOptionEqualToValue={(option, value) =>
          option.folioBien === value.folioBien
        }
        disabled={esVisualizacion}
        multiple
        required
      />
      <FormCampoEntrada
        id={FOLIO_DOCUMENTO}
        name={FOLIO_DOCUMENTO}
        label="Folio Dictamen"
        control={control}
        error={errors[FOLIO_DOCUMENTO]}
        helperText={errors[FOLIO_DOCUMENTO]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoCalendario
        id={FECHA_DOCUMENTO}
        name={FECHA_DOCUMENTO}
        label="Fecha Documento"
        control={control}
        defaultValue={null}
        error={errors[FECHA_DOCUMENTO]}
        helperText={errors[FECHA_DOCUMENTO]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={OBSERVACIONES}
        name={OBSERVACIONES}
        label="Información Complementaria"
        control={control}
        error={errors[OBSERVACIONES]}
        helperText={errors[OBSERVACIONES]?.message}
        disabled={esVisualizacion}
        required
      />
    </>
  );
};

export default AdministradorVehiculoBajaDatoGeneralForm;
