import React, { useEffect, useState } from "react";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import FormCampoAutocompletarMultiple from "../../../../../utils/FormCampoAutocompletarMultiple";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import { CAMPOS_BAJA_MUEBLE } from "../../../../../../settings/formConfig";

const AdministradorMuebleBajaDatoGeneralForm = ({
  formManager = null,
  esVisualizacion = false,
  solicitudSeleccionada = 0,
  complementos = {},
}) => {
  const {
    FOLIO_SOLICITUD,
    UNIDAD_ADMINISTRATIVA,
    TIPO_BIEN,
    FOLIO_BIEN,
    OBSERVACIONES,
    FOLIO_DOCUMENTO,
    FECHA_DOCUMENTO,
    NOMBRE_SOLICITANTE,
    LUGAR_RESGUARDO,
  } = CAMPOS_BAJA_MUEBLE;
  const [bienesXUnidadAdministrativa, setBienesXUnidadAdministrativa] =
    useState([]);
  const { unidadesAdministrativas, bienes } = complementos;
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
    setValue(CAMPOS_BAJA_MUEBLE.FOLIO_BIEN, null);
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
        defaultValue="BIENES MUEBLES"
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
        label="Folio Documento"
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
        id={NOMBRE_SOLICITANTE}
        name={NOMBRE_SOLICITANTE}
        label="Nombre"
        control={control}
        error={errors[NOMBRE_SOLICITANTE]}
        helperText={errors[NOMBRE_SOLICITANTE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={LUGAR_RESGUARDO}
        name={LUGAR_RESGUARDO}
        label="Lugar"
        control={control}
        error={errors[LUGAR_RESGUARDO]}
        helperText={errors[LUGAR_RESGUARDO]?.message}
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

export default AdministradorMuebleBajaDatoGeneralForm;
