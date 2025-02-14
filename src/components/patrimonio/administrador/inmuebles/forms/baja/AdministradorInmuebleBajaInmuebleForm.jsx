import React, { useState } from "react";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import {
  CAMPOS_ALTA_INMUEBLE,
  CAMPOS_BAJA_INMUEBLE,
} from "../../../../../../settings/formConfig";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import { MOTIVO_TRAMITE } from "../../../../../../settings/sistemaConfig";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";

const AdministradorInmuebleBajaInmuebleForm = ({
  formManager = null,
  esVisualizacion = false,
  complementos = {},
  informacionTablaSuperior = {},
}) => {
  const {
    ID_SOLICITUD,
    VALOR_BAJA,
    JUSTIFICACION_BAJA,
    A_FAVOR,
    DESTINO_BIEN,
    ESCRITURA_TITULO,
    FECHA_BAJA,
    FECHA_BAJA_SISTEMA,
    FECHA_DESINCORPORACION,
    FOLIO_BIEN,
    ID_BIEN_PATRIMONIO,
  } = CAMPOS_BAJA_INMUEBLE;
  const { control, formState, setValue } = formManager;
  const { errors } = formState;
  const { bienes } = complementos;

  const changeBien = (bien) => {
    if (!bien) {
      setValue(VALOR_BAJA, null);
      setValue(FOLIO_BIEN, null);
      return;
    }
    setValue(VALOR_BAJA, bien.precioUnitario);
    setValue(FOLIO_BIEN, bien.folioBien);
  };

  return (
    <>
      <FormCampoEntrada
        id={ID_SOLICITUD}
        name={ID_SOLICITUD}
        label="Folio Solicitud"
        type="number"
        defaultValue={informacionTablaSuperior.idSolicitud}
        control={control}
        error={errors[ID_SOLICITUD]}
        helperText={errors[ID_SOLICITUD]?.message}
        disabled
      />
      <FormCampoAutocompletar
        id={ID_BIEN_PATRIMONIO}
        name={ID_BIEN_PATRIMONIO}
        label="Bien Inmueble"
        control={control}
        options={bienes}
        handleOnChange={changeBien}
        getOptionLabel={(option) =>
          `${option.folioBien} - ${option.descripcion}`
        }
        isOptionEqualToValue={(option, value) =>
          option.folioBien === value.folioBien &&
          option.descripcion === value.descripcion
        }
        error={errors[ID_BIEN_PATRIMONIO]}
        helperText={errors[ID_BIEN_PATRIMONIO]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={FOLIO_BIEN}
        name={FOLIO_BIEN}
        label="Folio Bien"
        defaultValue="BIXXXXXXXX"
        control={control}
        error={errors[FOLIO_BIEN]}
        helperText={errors[FOLIO_BIEN]?.message}
        disabled
      />
      <FormCampoEntrada
        id={VALOR_BAJA}
        name={VALOR_BAJA}
        label="Valor Baja"
        type="number"
        defaultValue="0"
        control={control}
        error={errors[VALOR_BAJA]}
        helperText={errors[VALOR_BAJA]?.message}
        disabled
      />
      <FormCampoCalendario
        id={FECHA_DESINCORPORACION}
        name={FECHA_DESINCORPORACION}
        label="Fecha de Desincorporación"
        control={control}
        defaultValue={null}
        error={errors[FECHA_DESINCORPORACION]}
        helperText={errors[FECHA_DESINCORPORACION]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoCalendario
        id={FECHA_BAJA}
        name={FECHA_BAJA}
        label="Fecha de Baja"
        control={control}
        defaultValue={null}
        error={errors[FECHA_BAJA]}
        helperText={errors[FECHA_BAJA]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoCalendario
        id={FECHA_BAJA_SISTEMA}
        name={FECHA_BAJA_SISTEMA}
        label="Fecha de Baja del Sistema"
        control={control}
        defaultValue={null}
        error={errors[FECHA_BAJA_SISTEMA]}
        helperText={errors[FECHA_BAJA_SISTEMA]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={A_FAVOR}
        name={A_FAVOR}
        label="A Favor"
        control={control}
        error={errors[A_FAVOR]}
        helperText={errors[A_FAVOR]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={DESTINO_BIEN}
        name={DESTINO_BIEN}
        label="Destino Bien"
        control={control}
        error={errors[DESTINO_BIEN]}
        helperText={errors[DESTINO_BIEN]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={ESCRITURA_TITULO}
        name={ESCRITURA_TITULO}
        label="Escritura o Titulo"
        control={control}
        error={errors[ESCRITURA_TITULO]}
        helperText={errors[ESCRITURA_TITULO]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={JUSTIFICACION_BAJA}
        name={JUSTIFICACION_BAJA}
        label="Justificación"
        control={control}
        multiline
        rows={4}
        required
        error={errors[JUSTIFICACION_BAJA]}
        helperText={errors[JUSTIFICACION_BAJA]?.message}
        disabled={esVisualizacion}
      />
    </>
  );
};

export default AdministradorInmuebleBajaInmuebleForm;
