import { useState } from "react";
import FormCampoEntrada from "@components/utils/FormCampoEntrada";
import FormCampoCalendario from "@components/utils/FormCampoCalendario";
import FormCampoAutocompletar from "@components/utils/FormCampoAutocompletar";
import { CAMPOS_ALTA_MUEBLE } from "@settings/formConfig";
import ItemInfoExtraAutocompletar from "@components/utils/ItemInfoExtraAutocompletar";
import { CAMPOS_INVENTARIO_MUEBLE } from "../../../../../settings/formConfig";
import { Stack } from "@mui/material";

const InventarioMuebleDatoGeneralForm = ({
  formManager = null,
  solicitudSeleccionada = 0,
  complementos = {},
}) => {
  const {
    BIEN,
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
    NO_SERIES,
    FOLIO_ANTERIOR,
    NO_LICITACION,
    FECHA_LICITACION,
    OBSERVACION_LICITACION,
    FECHA_ALTA,
    FECHA_BAJA,
    MOTIVO_BAJA,
  } = CAMPOS_INVENTARIO_MUEBLE;
  const { control } = formManager;
  const {
    familias,
    subfamilias,
    bms,
    unidadesAdministrativas,
    tiposAdquisicion,
  } = complementos;

  return (
    <>
      <FormCampoEntrada
        id={BIEN}
        name={BIEN}
        label="Id Bien Mueble"
        control={control}
        type="number"
        defaultValue={solicitudSeleccionada}
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
      <FormCampoAutocompletar
        id={TIPO_ADQUISICION}
        name={TIPO_ADQUISICION}
        label="Tipo de Adquisición"
        control={control}
        options={tiposAdquisicion}
        disabled
        required
      />
      <FormCampoEntrada
        id={NO_SERIES}
        name={NO_SERIES}
        label="No. Serie"
        control={control}
        disabled
        required
      />
      <FormCampoEntrada
        id={FOLIO_ANTERIOR}
        name={FOLIO_ANTERIOR}
        label="Folio Anterior"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={NO_LICITACION}
        name={NO_LICITACION}
        label="No.Licitacion"
        type="number"
        control={control}
        disabled
      />
      <FormCampoCalendario
        id={FECHA_LICITACION}
        name={FECHA_LICITACION}
        label="Fecha de Licitación"
        control={control}
        defaultValue={null}
        disabled
      />
      <FormCampoEntrada
        id={OBSERVACION_LICITACION}
        name={OBSERVACION_LICITACION}
        label="Observación de la Licitación"
        control={control}
        disabled
      />
    </>
  );
};

export default InventarioMuebleDatoGeneralForm;
