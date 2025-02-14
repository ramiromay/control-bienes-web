import React, { useEffect, useState } from "react";
import FormCampoAutocompletarMultiple from "../../../../../utils/FormCampoAutocompletarMultiple";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import {
  CAMPOS_DESINCORPORACION_MUEBLE,
  CAMPOS_DESINCORPORACION_VEHICULO,
} from "../../../../../../settings/formConfig";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import ItemInfoExtraAutocompletar from "../../../../../utils/ItemInfoExtraAutocompletar";

const AdministradorVehiculoDesincorporacionDatoGeneralForm = ({
  formManager = null,
  complementos = {},
  esVisualizacion = false,
  informacionExtra = null,
}) => {
  const {
    FOLIO_SOLICITUD,
    FOLIO_BIEN,
    EMPLEADO,
    UNIDAD_ADMINISTRATIVA,
    DESCRIPCION_DESINCORPORACION,
    FECHA_PUBLICACION,
    NO_PUBLICACION,
    OBSERVACIONES,
    TIPO_BIEN,
  } = CAMPOS_DESINCORPORACION_VEHICULO;
  const { bienes, unidadesAdministrativas, empleados } = complementos;
  const [bienesXUnidadAdministrativa, setBienesXUnidadAdministrativa] =
    useState([]);
  const { control, formState, setValue, watch } = formManager;
  const { errors } = formState;
  const observerUnidad = watch(UNIDAD_ADMINISTRATIVA);

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
    if (observerUnidad) {
      const bienesFiltrados = bienes.filter(
        (e) => e.nivelUnidadAdministrativa === observerUnidad.id
      );
      setBienesXUnidadAdministrativa(bienesFiltrados);
    }
  }, [observerUnidad]);

  return (
    <>
      <FormCampoEntrada
        id={FOLIO_SOLICITUD}
        name={FOLIO_SOLICITUD}
        label="Folio Solicitud"
        control={control}
        defaultValue={informacionExtra.idSolicitud}
        type="number"
        required
        disabled
      />
      <FormCampoEntrada
        id={TIPO_BIEN}
        name={TIPO_BIEN}
        label="Tipo de Bien"
        defaultValue="MAQUINARIA Y VEHICULOS"
        control={control}
        disabled
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
      <FormCampoAutocompletarMultiple
        id={FOLIO_BIEN}
        name={FOLIO_BIEN}
        label="Folio del Bien"
        control={control}
        options={bienesXUnidadAdministrativa}
        getOptionLabel={(option) =>
          `${option.folioBien} - ${option.descripcion}`
        }
        isOptionEqualToValue={(option, value) =>
          option.folioBien === value.folioBien
        }
        error={errors[FOLIO_BIEN]}
        helperText={errors[FOLIO_BIEN]?.message}
        disabled={esVisualizacion}
        multiple
        required
      />
      <FormCampoEntrada
        id={OBSERVACIONES}
        name={OBSERVACIONES}
        label="Observaciones"
        control={control}
        error={errors[OBSERVACIONES]}
        helperText={errors[OBSERVACIONES]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoCalendario
        id={FECHA_PUBLICACION}
        name={FECHA_PUBLICACION}
        label="Fecha de Publicacion"
        control={control}
        defaultValue={null}
        error={errors[FECHA_PUBLICACION]}
        helperText={errors[FECHA_PUBLICACION]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={NO_PUBLICACION}
        name={NO_PUBLICACION}
        label="No Publicación"
        control={control}
        error={errors[NO_PUBLICACION]}
        helperText={errors[NO_PUBLICACION]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={DESCRIPCION_DESINCORPORACION}
        name={DESCRIPCION_DESINCORPORACION}
        label="Descripción Desincorporación"
        control={control}
        error={errors[DESCRIPCION_DESINCORPORACION]}
        helperText={errors[DESCRIPCION_DESINCORPORACION]?.message}
        disabled={esVisualizacion}
        required
      />
    </>
  );
};

export default AdministradorVehiculoDesincorporacionDatoGeneralForm;
