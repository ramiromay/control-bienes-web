import FormCampoAutocompletarMultiple from "../../../../../utils/FormCampoAutocompletarMultiple";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import { CAMPOS_MOVIMIENTO_MUEBLE } from "../../../../../../settings/formConfig";
import { useEffect, useState } from "react";

const AdministradorMuebleMovimientoDatoGeneralForm = ({
  formManager = null,
  complementos = {},
  esVisualizacion = false,
  informacionExtra = null,
}) => {
  const {
    FOLIO_SOLICITUD,
    FOLIO_BIEN,
    MUNICIPIO,
    NUEVO_CENTRO_COSTO,
    NUEVO_RESGUARDANTE,
    TIPO_BIEN,
    UBICACION,
    UNIDAD_ADMINISTRATIVA,
  } = CAMPOS_MOVIMIENTO_MUEBLE;
  const {
    unidadesAdministrativas,
    bienes,
    ubicaciones,
    municipios,
    responsables,
  } = complementos;
  const { control, formState, setValue, watch } = formManager;
  const { errors } = formState;
  const observerUnidad = watch(UNIDAD_ADMINISTRATIVA);
  const [bienesXUnidadAdministrativa, setBienesXUnidadAdministrativa] =
    useState([]);
  const [centrosXUnidadAdministrativa, setCentrosXUnidadAdministrativa] =
    useState([]);
  const [
    responsablesXUnidadAdministrativa,
    setResponsablesXUnidadAdministrativa,
  ] = useState([]);

  const filtrarPorCentroCosto = (array, baseId) => {
    // Extraer la base de los dos primeros dígitos de la versión
    const base = baseId.split(".").slice(0, 2).join(".");

    // Filtrar los objetos cuyo `id` tenga los mismos dos primeros dígitos
    return array.filter((obj) => {
      const objBase = obj.id.split(".").slice(0, 2).join(".");
      return objBase === base;
    });
  };

  const changeUnidadAdministrativa = (unidadAdministrativa) => {
    if (!unidadAdministrativa) {
      setBienesXUnidadAdministrativa([]);
      setCentrosXUnidadAdministrativa([]);
      setValue(FOLIO_BIEN, null);
      return;
    }
    const bienesFiltrados = bienes.filter(
      (bien) => bien.nivelUnidadAdministrativa === unidadAdministrativa.id
    );
    setValue(FOLIO_BIEN, null);
    setBienesXUnidadAdministrativa(bienesFiltrados);

    // cambio centro costo
    if (informacionExtra.idMotivoTramite === 24) {
      setValue(NUEVO_CENTRO_COSTO, null);
      const unidadesFiltradas = filtrarPorCentroCosto(
        unidadesAdministrativas,
        unidadAdministrativa.id
      );
      setCentrosXUnidadAdministrativa(unidadesFiltradas);
    } else if (informacionExtra.idMotivoTramite === 25) {
      setValue(NUEVO_RESGUARDANTE, null);
      const responsablesFiltradas = responsables.filter(
        (e) => e.idUnidadAdministrativa === unidadAdministrativa.id
      );
      setResponsablesXUnidadAdministrativa(responsablesFiltradas);
    }
  };

  useEffect(() => {
    if (observerUnidad) {
      const bienesFiltrados = bienes.filter(
        (e) => e.nivelUnidadAdministrativa === observerUnidad.id
      );
      setBienesXUnidadAdministrativa(bienesFiltrados);
      if (informacionExtra.idMotivoTramite === 24) {
        const centrosCostoFiltrados = filtrarPorCentroCosto(
          unidadesAdministrativas,
          observerUnidad.id
        );
        setCentrosXUnidadAdministrativa(centrosCostoFiltrados);
      }
      if (informacionExtra.idMotivoTramite === 25) {
        const responsablesFiltrados = responsables.filter(
          (e) => e.idUnidadAdministrativa === observerUnidad.id
        );
        setResponsablesXUnidadAdministrativa(responsablesFiltrados);
      }
    }
  }, [observerUnidad]);
  console.log(informacionExtra.idMotivoTramite);

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
        defaultValue="BIENES MUEBLES"
        control={control}
        error={errors[TIPO_BIEN]}
        helperText={errors[TIPO_BIEN]?.message}
        disabled
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
      {(informacionExtra.idMotivoTramite === 26 ||
        informacionExtra.idMotivoTramite === 24) && (
        <FormCampoAutocompletar
          id={NUEVO_CENTRO_COSTO}
          name={NUEVO_CENTRO_COSTO}
          label="Nuevo Centro de Costo"
          control={control}
          options={
            informacionExtra.idMotivoTramite === 26
              ? unidadesAdministrativas
              : centrosXUnidadAdministrativa
          }
          error={errors[NUEVO_CENTRO_COSTO]}
          helperText={errors[NUEVO_CENTRO_COSTO]?.message}
          disabled={esVisualizacion}
          required
        />
      )}

      <FormCampoAutocompletar
        id={UBICACION}
        name={UBICACION}
        label="Ubicación"
        control={control}
        options={ubicaciones}
        error={errors[UBICACION]}
        helperText={errors[UBICACION]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={MUNICIPIO}
        name={MUNICIPIO}
        label="Municipio"
        control={control}
        options={municipios}
        error={errors[MUNICIPIO]}
        helperText={errors[MUNICIPIO]?.message}
        disabled={esVisualizacion}
        required
      />
      {informacionExtra.idMotivoTramite === 25 && (
        <FormCampoAutocompletarMultiple
          id={NUEVO_RESGUARDANTE}
          name={NUEVO_RESGUARDANTE}
          label="Nuevo Resguardante"
          control={control}
          options={responsablesXUnidadAdministrativa}
          error={errors[NUEVO_RESGUARDANTE]}
          helperText={errors[NUEVO_RESGUARDANTE]?.message}
          disabled={esVisualizacion}
          multiple
          required
        />
      )}
    </>
  );
};

export default AdministradorMuebleMovimientoDatoGeneralForm;
