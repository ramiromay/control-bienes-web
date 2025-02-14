import { useState } from "react";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import {
  CAMPOS_ALTA_MUEBLE,
  CAMPOS_ALTA_VEHICULO,
} from "../../../../../../settings/formConfig";
import ItemInfoExtraAutocompletar from "../../../../../utils/ItemInfoExtraAutocompletar";

const AdministradorVehiculoAltaDatoBienForm = ({
  formManager = null,
  esVisualizacion = false,
  solicitudSeleccionada = 0,
  complementos = {},
}) => {
  const {
    SOLICITUD,
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
    FOLIO_ANTERIOR,
    CUENTA_POR_PAGAR,
    SUSTITUYE_BV,
    MUNICIPIO,
    UBICACION,
    PRECIO_DESECHABLE,
    PRECIO_UNITARIO,
    FECHA_INICIO_USO,
    VIDA_UTIL,
  } = CAMPOS_ALTA_VEHICULO;
  const { control, formState, setValue } = formManager;
  const { errors } = formState;
  const {
    familias,
    subfamilias,
    bms,
    unidadesAdministrativas,
    tiposAdquisicion,
    ubicaciones,
    municipios,
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
        id={TIPO_BIEN}
        name={TIPO_BIEN}
        label="Tipo de Bien"
        control={control}
        defaultValue="MAQUINARIA Y VEHICULOS"
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
      <FormCampoEntrada
        id={CUENTA_POR_PAGAR}
        name={CUENTA_POR_PAGAR}
        label="Cuentas Por Pagar"
        control={control}
        error={errors[CUENTA_POR_PAGAR]}
        helperText={errors[CUENTA_POR_PAGAR]?.message}
        disabled={esVisualizacion}
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
        id={SUSTITUYE_BV}
        name={SUSTITUYE_BV}
        label="Sustituye a BV"
        control={control}
        error={errors[SUSTITUYE_BV]}
        helperText={errors[SUSTITUYE_BV]?.message}
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
      <FormCampoEntrada
        id={PRECIO_UNITARIO}
        name={PRECIO_UNITARIO}
        label="Precio Unitario"
        type="number"
        defaultValue=".00"
        control={control}
        error={errors[PRECIO_UNITARIO]}
        helperText={errors[PRECIO_UNITARIO]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={VIDA_UTIL}
        name={VIDA_UTIL}
        label="Vida Util (Años)"
        type="number"
        defaultValue="0"
        control={control}
        error={errors[VIDA_UTIL]}
        helperText={errors[VIDA_UTIL]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoCalendario
        id={FECHA_INICIO_USO}
        name={FECHA_INICIO_USO}
        label="Inicio de Uso"
        control={control}
        defaultValue={null}
        error={errors[FECHA_INICIO_USO]}
        helperText={errors[FECHA_INICIO_USO]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={PRECIO_DESECHABLE}
        name={PRECIO_DESECHABLE}
        label="Precio Desechable"
        type="number"
        defaultValue=".00"
        control={control}
        error={errors[PRECIO_DESECHABLE]}
        helperText={errors[PRECIO_DESECHABLE]?.message}
        required
        disabled={esVisualizacion}
      />
    </>
  );
};

export default AdministradorVehiculoAltaDatoBienForm;
