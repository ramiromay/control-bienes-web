import React, { useEffect, useState } from "react";
import {
  CAMPOS_DESTINO_FINAL_MUEBLE,
  CAMPOS_DESTINO_FINAL_VEHICULO,
} from "../../../../../../settings/formConfig";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import FormCampoAutocompletarMultiple from "../../../../../utils/FormCampoAutocompletarMultiple";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import ItemInfoExtraAutocompletar from "../../../../../utils/ItemInfoExtraAutocompletar";

const AdministradorVehiculoDestinoFinalDatoGeneralForm = ({
  formManager = null,
  complementos = {},
  esVisualizacion = false,
  esEnajenacion = false,
  informacionExtra = null,
}) => {
  const {
    FOLIO_SOLICITUD,
    EMPLEADO,
    UNIDAD_ADMINISTRATIVA,
    TIPO_BIEN,
    FOLIO_BIEN,
    FOLIO_ENAJENACION,
    FECHA_ENAJENACION,
    AVALUO_ENAJENACION,
    IMPORTE_ENAJENACION,
    DESCRIPCION_ENAJENACION,
    FOLIO_DESTRUCCION,
    FECHA_DESTRUCCION,
    DESCRIPCION_DESTRUCCION,
  } = CAMPOS_DESTINO_FINAL_VEHICULO;
  const { control, formState, setValue, watch } = formManager;
  const { errors } = formState;
  const { unidadesAdministrativas, bienes, empleados } = complementos;
  const observerUnidad = watch(UNIDAD_ADMINISTRATIVA);
  const [bienesXUnidadAdministrativa, setBienesXUnidadAdministrativa] =
    useState([]);

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
        type="number"
        defaultValue={informacionExtra.idSolicitud}
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
        id={UNIDAD_ADMINISTRATIVA}
        name={UNIDAD_ADMINISTRATIVA}
        label="Unidad Administrativa"
        control={control}
        options={unidadesAdministrativas}
        error={errors[UNIDAD_ADMINISTRATIVA]}
        handleOnChange={changeUnidadAdministrativa}
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
      {esEnajenacion ? (
        <>
          <FormCampoEntrada
            id={FOLIO_ENAJENACION}
            name={FOLIO_ENAJENACION}
            label="Folio Enajenación"
            control={control}
            error={errors[FOLIO_ENAJENACION]}
            helperText={errors[FOLIO_ENAJENACION]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoCalendario
            id={FECHA_ENAJENACION}
            name={FECHA_ENAJENACION}
            label="Fecha de Enajenación"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ENAJENACION]}
            helperText={errors[FECHA_ENAJENACION]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoEntrada
            id={AVALUO_ENAJENACION}
            name={AVALUO_ENAJENACION}
            label="Avalúo Enajenación"
            control={control}
            error={errors[AVALUO_ENAJENACION]}
            helperText={errors[AVALUO_ENAJENACION]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoEntrada
            id={IMPORTE_ENAJENACION}
            name={IMPORTE_ENAJENACION}
            label="Folio Enajenación"
            control={control}
            type="number"
            defaultValue=".00"
            error={errors[IMPORTE_ENAJENACION]}
            helperText={errors[IMPORTE_ENAJENACION]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoEntrada
            id={DESCRIPCION_ENAJENACION}
            name={DESCRIPCION_ENAJENACION}
            label="Descripción Enajenación"
            control={control}
            error={errors[DESCRIPCION_ENAJENACION]}
            helperText={errors[DESCRIPCION_ENAJENACION]?.message}
            disabled={esVisualizacion}
            required
          />
        </>
      ) : (
        <>
          <FormCampoEntrada
            id={FOLIO_DESTRUCCION}
            name={FOLIO_DESTRUCCION}
            label="Folio Destrucción"
            control={control}
            error={errors[FOLIO_DESTRUCCION]}
            helperText={errors[FOLIO_DESTRUCCION]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoCalendario
            id={FECHA_DESTRUCCION}
            name={FECHA_DESTRUCCION}
            label="Fecha de Destrucción"
            control={control}
            defaultValue={null}
            error={errors[FECHA_DESTRUCCION]}
            helperText={errors[FECHA_DESTRUCCION]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoEntrada
            id={DESCRIPCION_DESTRUCCION}
            name={DESCRIPCION_DESTRUCCION}
            label="Descripción Destrucción"
            control={control}
            error={errors[DESCRIPCION_DESTRUCCION]}
            helperText={errors[DESCRIPCION_DESTRUCCION]?.message}
            disabled={esVisualizacion}
            required
          />
        </>
      )}
    </>
  );
};

export default AdministradorVehiculoDestinoFinalDatoGeneralForm;
