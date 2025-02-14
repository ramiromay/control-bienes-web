import { useState } from "react";
import FormCampoEntrada from "../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../utils/FormCampoCalendario";
import FormCampoAutocompletar from "../../../../utils/FormCampoAutocompletar";
import ItemInfoExtraAutocompletar from "../../../../utils/ItemInfoExtraAutocompletar";
import { CAMPOS_INVENTARIO_VEHICULO } from "../../../../../settings/formConfig";
import { Stack } from "@mui/material";

const InventarioVehiculoDatoBienForm = ({
  formManager = null,
  complementos = {},
}) => {
  const {
    BIEN,
    FECHA_ALTA,
    FECHA_BAJA,
    MOTIVO_BAJA,
    FOLIO_BIEN,
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
  } = CAMPOS_INVENTARIO_VEHICULO;
  const { control } = formManager;
  const {
    familias,
    subfamilias,
    bms,
    unidadesAdministrativas,
    tiposAdquisicion,
    ubicaciones,
    municipios,
  } = complementos;

  return (
    <>
      <FormCampoEntrada
        id={BIEN}
        name={BIEN}
        label="Id Bien Maquinaria y Vehículo"
        control={control}
        type="number"
        required
        disabled
      />
      <FormCampoEntrada
        id={FOLIO_BIEN}
        name={FOLIO_BIEN}
        label="Folio Bien Mueble"
        control={control}
        disabled
        required
      />
      <Stack direction="row" gap={2}>
        <FormCampoCalendario
          id={FECHA_ALTA}
          name={FECHA_ALTA}
          label="Fecha Alta"
          control={control}
          defaultValue={null}
          disabled
        />
        <FormCampoCalendario
          id={FECHA_BAJA}
          name={FECHA_BAJA}
          label="Fecha Baja"
          control={control}
          defaultValue={null}
          disabled
        />
      </Stack>
      <FormCampoEntrada
        id={MOTIVO_BAJA}
        name={MOTIVO_BAJA}
        label="Motivo Baja"
        control={control}
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
        disabled
        required
      />
      <FormCampoAutocompletar
        id={SUBFAMILIA}
        name={SUBFAMILIA}
        label="Sub Familia"
        control={control}
        options={subfamilias}
        disabled
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
        options={bms}
        disabled
        required
      />
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
      <FormCampoEntrada
        id={DESCRIPCION}
        name={DESCRIPCION}
        label="Descripción"
        control={control}
        disabled
        required
      />
      <FormCampoAutocompletar
        id={UNIDAD_ADMINISTRATIVA}
        name={UNIDAD_ADMINISTRATIVA}
        label="Centro de Costo"
        control={control}
        options={unidadesAdministrativas}
        disabled
        required
      />
      <FormCampoEntrada
        id={REQUISICION}
        name={REQUISICION}
        label="Requisición"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={ORDEN_COMPRA}
        name={ORDEN_COMPRA}
        label="Orden de Compra"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={CUENTA_POR_PAGAR}
        name={CUENTA_POR_PAGAR}
        label="Cuentas Por Pagar"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={FOLIO_ANTERIOR}
        name={FOLIO_ANTERIOR}
        label="Folio Anterior"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={SUSTITUYE_BV}
        name={SUSTITUYE_BV}
        label="Sustituye a BV"
        control={control}
        disabled
        required
      />
      <FormCampoAutocompletar
        id={MUNICIPIO}
        name={MUNICIPIO}
        label="Municipio"
        control={control}
        options={municipios}
        disabled
        required
      />
      <FormCampoAutocompletar
        id={TIPO_ADQUISICION}
        name={TIPO_ADQUISICION}
        label="Tipo de Adquisición"
        control={control}
        options={tiposAdquisicion}
        disabled
        required
      />
      <FormCampoAutocompletar
        id={UBICACION}
        name={UBICACION}
        label="Ubicación"
        control={control}
        options={ubicaciones}
        disabled
        required
      />
      <FormCampoEntrada
        id={PRECIO_UNITARIO}
        name={PRECIO_UNITARIO}
        label="Precio Unitario"
        type="number"
        defaultValue=".00"
        control={control}
        required
        disabled
      />
      <FormCampoEntrada
        id={VIDA_UTIL}
        name={VIDA_UTIL}
        label="Vida Util (Años)"
        type="number"
        defaultValue="0"
        control={control}
        required
        disabled
      />
      <FormCampoCalendario
        id={FECHA_INICIO_USO}
        name={FECHA_INICIO_USO}
        label="Inicio de Uso"
        control={control}
        defaultValue={null}
        required
        disabled
      />
      <FormCampoEntrada
        id={PRECIO_DESECHABLE}
        name={PRECIO_DESECHABLE}
        label="Precio Desechable"
        type="number"
        defaultValue=".00"
        control={control}
        required
        disabled
      />
    </>
  );
};

export default InventarioVehiculoDatoBienForm;
