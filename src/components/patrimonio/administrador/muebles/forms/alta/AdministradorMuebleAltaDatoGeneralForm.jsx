import { useState } from "react";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import { CAMPOS_ALTA_MUEBLE } from "../../../../../../settings/formConfig";
import ItemInfoExtraAutocompletar from "../../../../../utils/ItemInfoExtraAutocompletar";

const AdministradorMuebleAltaDatoGeneralForm = ({
  formManager = null,
  esVisualizacion = false,
  solicitudSeleccionada = 0,
  complementos = {},
}) => {
  const {
    SOLICITUD,
    NUMERO_BIENES,
    TIPO_BIEN,
    FAMILIA,
    SUBFAMILIA,
    BMS,
    PARTIDA,
    PARTIDA_ESPECIFICA,
    CUENTA_ACTIVO,
    CUENTA_ACTUALIZACION,
    DESCRIPCION,
    UNIDAD_ADMINISTRATIVA,
    REQUISICION,
    ORDEN_COMPRA,
    TIPO_ADQUISICION,
    NO_SERIES,
    FOLIO_ANTERIOR,
    NO_LICITACION,
    FECHA_LICITACION,
    OBSERVACION_LICITACION,
  } = CAMPOS_ALTA_MUEBLE;
  const { control, formState, setValue } = formManager;
  const { errors } = formState;
  const {
    familias,
    subfamilias,
    bms,
    unidadesAdministrativas,
    tiposAdquisicion,
  } = complementos;
  const [bmsXSubfamilia, setBmsXSubfamilia] = useState([]);
  const [subfamiliasXFamilia, setSubfamiliasXFamilia] = useState([]);

  const changeFamilia = (familia) => {
    if (!familia) {
      setSubfamiliasXFamilia([]);
      setValue(SUBFAMILIA, null);
      setBmsXSubfamilia([]);
      setValue(BMS, null);
      return;
    }
    const subfamiliasFiltradas = subfamilias.filter(
      (subfamilia) => subfamilia.idFamilia === familia.id
    );
    setSubfamiliasXFamilia(subfamiliasFiltradas);
    setValue(SUBFAMILIA, null);
    setBmsXSubfamilia([]);
    setValue(BMS, null);
  };

  const changeSubfamilia = (subfamilia) => {
    if (!subfamilia) {
      setBmsXSubfamilia([]);
      setValue(BMS, null);
      return;
    }
    const bmsFiltrados = bms.filter(
      (bms) =>
        bms.idFamilia === subfamilia.idFamilia &&
        subfamilia.id === bms.idSubfamilia
    );
    setBmsXSubfamilia(bmsFiltrados);
    setValue(BMS, null);
  };

  return (
    <>
      <FormCampoEntrada
        id={SOLICITUD}
        name={SOLICITUD}
        label="Folio Solicitud"
        control={control}
        type="number"
        defaultValue={solicitudSeleccionada}
        required
        disabled
      />
      <FormCampoEntrada
        id={NUMERO_BIENES}
        name={NUMERO_BIENES}
        label="Numero Bienes"
        control={control}
        type="number"
        defaultValue="0"
        error={errors[NUMERO_BIENES]}
        helperText={errors[NUMERO_BIENES]?.message}
        disabled={esVisualizacion}
        required
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
        id={FAMILIA}
        name={FAMILIA}
        label="Familia"
        control={control}
        options={familias}
        handleOnChange={changeFamilia}
        error={errors[FAMILIA]}
        helperText={errors[FAMILIA]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={SUBFAMILIA}
        name={SUBFAMILIA}
        label="Sub Familia"
        control={control}
        handleOnChange={changeSubfamilia}
        options={subfamiliasXFamilia}
        error={errors[SUBFAMILIA]}
        helperText={errors[SUBFAMILIA]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={BMS}
        name={BMS}
        label="Folio BMS"
        control={control}
        renderOption={ItemInfoExtraAutocompletar}
        getOptionLabel={(option) => `${option.id} - ${option.name}`}
        isOptionEqualToValue={(option, value) =>
          option.id === value.id ||
          option.name === value.name ||
          option.infoExtra === value.infoExtra
        }
        options={bmsXSubfamilia}
        error={errors[BMS]}
        helperText={errors[BMS]?.message}
        disabled={esVisualizacion}
        required
      />
      {esVisualizacion && (
        <>
          <FormCampoEntrada
            id={PARTIDA}
            name={PARTIDA}
            label="Partida"
            control={control}
            required
            disabled
          />
          <FormCampoEntrada
            id={PARTIDA_ESPECIFICA}
            name={PARTIDA_ESPECIFICA}
            label="Partida Especifica"
            control={control}
            required
            disabled
          />
          <FormCampoEntrada
            id={CUENTA_ACTIVO}
            name={CUENTA_ACTIVO}
            label="Cuenta Activo"
            control={control}
            required
            disabled
          />
          <FormCampoEntrada
            id={CUENTA_ACTUALIZACION}
            name={CUENTA_ACTUALIZACION}
            label="Cuenta Actualización"
            control={control}
            required
            disabled
          />
        </>
      )}
      <FormCampoEntrada
        id={DESCRIPCION}
        name={DESCRIPCION}
        label="Descripción"
        control={control}
        error={errors[DESCRIPCION]}
        helperText={errors[DESCRIPCION]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={UNIDAD_ADMINISTRATIVA}
        name={UNIDAD_ADMINISTRATIVA}
        label="Centro de Costo"
        control={control}
        options={unidadesAdministrativas}
        error={errors[UNIDAD_ADMINISTRATIVA]}
        helperText={errors[UNIDAD_ADMINISTRATIVA]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={REQUISICION}
        name={REQUISICION}
        label="Requisición"
        control={control}
        error={errors[REQUISICION]}
        helperText={errors[REQUISICION]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={ORDEN_COMPRA}
        name={ORDEN_COMPRA}
        label="Orden de Compra"
        control={control}
        error={errors[ORDEN_COMPRA]}
        helperText={errors[ORDEN_COMPRA]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={TIPO_ADQUISICION}
        name={TIPO_ADQUISICION}
        label="Tipo de Adquisición"
        control={control}
        options={tiposAdquisicion}
        error={errors[TIPO_ADQUISICION]}
        helperText={errors[TIPO_ADQUISICION]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={NO_SERIES}
        name={NO_SERIES}
        label="No. Serie"
        control={control}
        error={errors[NO_SERIES]}
        helperText={errors[NO_SERIES]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={FOLIO_ANTERIOR}
        name={FOLIO_ANTERIOR}
        label="Folio Anterior"
        control={control}
        error={errors[FOLIO_ANTERIOR]}
        helperText={errors[FOLIO_ANTERIOR]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={NO_LICITACION}
        name={NO_LICITACION}
        label="No.Licitacion"
        type="number"
        control={control}
        error={errors[NO_LICITACION]}
        helperText={errors[NO_LICITACION]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoCalendario
        id={FECHA_LICITACION}
        name={FECHA_LICITACION}
        label="Fecha de Licitación"
        control={control}
        defaultValue={null}
        error={errors[FECHA_LICITACION]}
        helperText={errors[FECHA_LICITACION]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={OBSERVACION_LICITACION}
        name={OBSERVACION_LICITACION}
        label="Observación de la Licitación"
        control={control}
        error={errors[OBSERVACION_LICITACION]}
        helperText={errors[OBSERVACION_LICITACION]?.message}
        disabled={esVisualizacion}
      />
    </>
  );
};

export default AdministradorMuebleAltaDatoGeneralForm;
