import React from "react";
import { CAMPOS_ALTA_INMUEBLE } from "../../../../../../settings/formConfig";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";

const AdministradorInmuebleModificacionInfoRegistralForm = ({
  formManager = null,
  esVisualizacion = false,
  complementos = {},
  informacionTablaSuperior = {},
  esModificacionDeDatos = false,
  esModificacionMedidas = false,
  esModificacionPorConstruccion = false,
  esModificacionPorMejoras = false,
  esModificacion = false,
}) => {
  const {
    FOLIO_CATASTRO,
    CALLE,
    SUPERFICIE,
    NUMERO_EXTERIOR,
    NUMERO_INTERIOR,
    VALOR_TERRENO,
    CRUZAMIENTO_1,
    CRUZAMIENTO_2,
    SUPERFICIE_CONSTRUCCION,
    TABLAJE,
    VALOR_CONSTRUCCION,
    VALOR_INICIAL,
    CODIGO_POSTAL,
    ID_ORIGEN_VALOR,
    MUNICIPIO,
    ASENTAMIENTO,
    PROPIETARIO,
    SECRETARIA,
    DEPARTAMENTO,
    DIRECCION,
  } = CAMPOS_ALTA_INMUEBLE;
  const { control, formState } = formManager;
  const { errors } = formState;
  const { municipios, origenesValor } = complementos;

  const changeValorTerreno = (valor) => {
    const valorConstruccion = Number(formManager.getValues(VALOR_CONSTRUCCION));
    const valorInicial = Number(valor) + valorConstruccion;
    formManager.setValue(VALOR_INICIAL, valorInicial);
  };

  const changeValorConstruccion = (valor) => {
    const valorTerreno = Number(formManager.getValues(VALOR_TERRENO));
    const valorInicial = Number(valor) + valorTerreno;
    formManager.setValue(VALOR_INICIAL, valorInicial);
  };

  return (
    <>
      <FormCampoEntrada
        id={FOLIO_CATASTRO}
        name={FOLIO_CATASTRO}
        label="Folio Catastro"
        type="number"
        control={control}
        error={errors[FOLIO_CATASTRO]}
        helperText={errors[FOLIO_CATASTRO]?.message}
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoEntrada
        id={CALLE}
        name={CALLE}
        label="Calle"
        control={control}
        error={errors[CALLE]}
        helperText={errors[CALLE]?.message}
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoEntrada
        id={SUPERFICIE}
        name={SUPERFICIE}
        label="Superficie del terreno"
        control={control}
        error={errors[SUPERFICIE]}
        helperText={errors[SUPERFICIE]?.message}
        disabled={
          esVisualizacion ||
          (!esModificacionMedidas &&
            !esModificacionPorConstruccion &&
            !esModificacionPorMejoras)
        }
        required
      />
      <FormCampoEntrada
        id={NUMERO_EXTERIOR}
        name={NUMERO_EXTERIOR}
        label="Número Exterior"
        control={control}
        error={errors[NUMERO_EXTERIOR]}
        helperText={errors[NUMERO_EXTERIOR]?.message}
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoEntrada
        id={NUMERO_INTERIOR}
        name={NUMERO_INTERIOR}
        label="Número Interior"
        control={control}
        error={errors[NUMERO_INTERIOR]}
        helperText={errors[NUMERO_INTERIOR]?.message}
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoEntrada
        id={VALOR_TERRENO}
        name={VALOR_TERRENO}
        label="Valor del Terreno"
        type="number"
        onValueChange={changeValorTerreno}
        control={control}
        error={errors[VALOR_TERRENO]}
        helperText={errors[VALOR_TERRENO]?.message}
        disabled={
          esVisualizacion ||
          (!esModificacionMedidas &&
            !esModificacionPorConstruccion &&
            !esModificacionPorMejoras)
        }
        required
      />
      <FormCampoEntrada
        id={CRUZAMIENTO_1}
        name={CRUZAMIENTO_1}
        label="Cruzamiento 1"
        control={control}
        error={errors[CRUZAMIENTO_1]}
        helperText={errors[CRUZAMIENTO_1]?.message}
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoEntrada
        id={CRUZAMIENTO_2}
        name={CRUZAMIENTO_2}
        label="Cruzamiento 2"
        control={control}
        error={errors[CRUZAMIENTO_2]}
        helperText={errors[CRUZAMIENTO_2]?.message}
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoEntrada
        id={SUPERFICIE_CONSTRUCCION}
        name={SUPERFICIE_CONSTRUCCION}
        label="Superficie de Construcción"
        type="number"
        control={control}
        error={errors[SUPERFICIE_CONSTRUCCION]}
        helperText={errors[SUPERFICIE_CONSTRUCCION]?.message}
        disabled={
          esVisualizacion ||
          (!esModificacionMedidas &&
            !esModificacionPorConstruccion &&
            !esModificacionPorMejoras)
        }
        required
      />
      <FormCampoEntrada
        id={TABLAJE}
        name={TABLAJE}
        label="Tablaje"
        control={control}
        error={errors[TABLAJE]}
        helperText={errors[TABLAJE]?.message}
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoEntrada
        id={VALOR_CONSTRUCCION}
        name={VALOR_CONSTRUCCION}
        label="Valor de Construcción"
        type="number"
        onValueChange={changeValorConstruccion}
        control={control}
        error={errors[VALOR_CONSTRUCCION]}
        helperText={errors[VALOR_CONSTRUCCION]?.message}
        disabled={
          esVisualizacion ||
          (!esModificacionMedidas &&
            !esModificacionPorConstruccion &&
            !esModificacionPorMejoras)
        }
        required
      />
      <FormCampoEntrada
        id={VALOR_INICIAL}
        name={VALOR_INICIAL}
        label="Valor Inicial"
        type="number"
        control={control}
        error={errors[VALOR_INICIAL]}
        helperText={errors[VALOR_INICIAL]?.message}
        disabled
        required
      />
      <FormCampoEntrada
        id={CODIGO_POSTAL}
        name={CODIGO_POSTAL}
        label="Codigo Postal"
        type="number"
        control={control}
        error={errors[CODIGO_POSTAL]}
        helperText={errors[CODIGO_POSTAL]?.message}
        disabled={esVisualizacion || !esModificacionDeDatos}
      />
      <FormCampoAutocompletar
        id={ID_ORIGEN_VALOR}
        name={ID_ORIGEN_VALOR}
        label="Origen del Valor"
        control={control}
        options={origenesValor}
        error={errors[ID_ORIGEN_VALOR]}
        helperText={errors[ID_ORIGEN_VALOR]?.message}
        required
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoAutocompletar
        id={MUNICIPIO}
        name={MUNICIPIO}
        label="Municipio"
        control={control}
        options={municipios}
        error={errors[MUNICIPIO]}
        helperText={errors[MUNICIPIO]?.message}
        required
        disabled={esVisualizacion || !esModificacionDeDatos}
      />
      <FormCampoEntrada
        id={ASENTAMIENTO}
        name={ASENTAMIENTO}
        label="Asentamiento"
        control={control}
        error={errors[ASENTAMIENTO]}
        helperText={errors[ASENTAMIENTO]?.message}
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoEntrada
        id={PROPIETARIO}
        name={PROPIETARIO}
        label="Propietario"
        control={control}
        error={errors[PROPIETARIO]}
        helperText={errors[PROPIETARIO]?.message}
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoEntrada
        id={SECRETARIA}
        name={SECRETARIA}
        label="Secretaria"
        defaultValue="55 SECRETARÍA DE ADMINISTRACIÓN Y FINANZAS"
        control={control}
        error={errors[SECRETARIA]}
        helperText={errors[SECRETARIA]?.message}
        disabled
      />
      <FormCampoEntrada
        id={DIRECCION}
        name={DIRECCION}
        label="Dirección"
        defaultValue="55.23 DIRECCIÓN GENERAL DE CONTROL PATRIMONIAL, INMOBILIARIO Y ALMACENES"
        control={control}
        error={errors[DIRECCION]}
        helperText={errors[DIRECCION]?.message}
        disabled
      />
      <FormCampoEntrada
        id={DEPARTAMENTO}
        name={DEPARTAMENTO}
        label="Departamento"
        control={control}
        defaultValue="55.23.3 DEPARTAMENTO DE CONTROL DE INMUEBLES"
        error={errors[DEPARTAMENTO]}
        helperText={errors[DEPARTAMENTO]?.message}
        disabled
      />
    </>
  );
};

export default AdministradorInmuebleModificacionInfoRegistralForm;
