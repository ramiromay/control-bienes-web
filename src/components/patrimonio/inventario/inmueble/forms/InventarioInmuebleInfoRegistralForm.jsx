import FormCampoEntrada from "../../../../utils/FormCampoEntrada";
import FormCampoAutocompletar from "../../../../utils/FormCampoAutocompletar";
import { CAMPOS_INVENTARIO_INMUEBLE } from "../../../../../settings/formConfig";

const InventarioInmuebleInfoRegistralForm = ({
  formManager = null,
  complementos = {},
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
  } = CAMPOS_INVENTARIO_INMUEBLE;
  const { control } = formManager;
  const { municipios, origenesValor } = complementos;

  return (
    <>
      <FormCampoEntrada
        id={FOLIO_CATASTRO}
        name={FOLIO_CATASTRO}
        label="Folio Catastro"
        type="number"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={CALLE}
        name={CALLE}
        label="Calle"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={SUPERFICIE}
        name={SUPERFICIE}
        label="Superficie del terreno"
        control={control}
        disabled
        required
      />
      <FormCampoEntrada
        id={NUMERO_EXTERIOR}
        name={NUMERO_EXTERIOR}
        label="Número Exterior"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={NUMERO_INTERIOR}
        name={NUMERO_INTERIOR}
        label="Número Interior"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={VALOR_TERRENO}
        name={VALOR_TERRENO}
        label="Valor del Terreno"
        type="number"
        control={control}
        disabled
        required
      />
      <FormCampoEntrada
        id={CRUZAMIENTO_1}
        name={CRUZAMIENTO_1}
        label="Cruzamiento 1"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={CRUZAMIENTO_2}
        name={CRUZAMIENTO_2}
        label="Cruzamiento 2"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={SUPERFICIE_CONSTRUCCION}
        name={SUPERFICIE_CONSTRUCCION}
        label="Superficie de Construcción"
        type="number"
        control={control}
        disabled
        required
      />
      <FormCampoEntrada
        id={TABLAJE}
        name={TABLAJE}
        label="Tablaje"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={VALOR_CONSTRUCCION}
        name={VALOR_CONSTRUCCION}
        label="Valor de Construcción"
        type="number"
        control={control}
        disabled
        required
      />
      <FormCampoEntrada
        id={VALOR_INICIAL}
        name={VALOR_INICIAL}
        label="Valor Inicial"
        type="number"
        control={control}
        disabled
        required
      />
      <FormCampoEntrada
        id={CODIGO_POSTAL}
        name={CODIGO_POSTAL}
        label="Codigo Postal"
        type="number"
        control={control}
        disabled
      />
      <FormCampoAutocompletar
        id={ID_ORIGEN_VALOR}
        name={ID_ORIGEN_VALOR}
        label="Origen del Valor"
        control={control}
        options={origenesValor}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={MUNICIPIO}
        name={MUNICIPIO}
        label="Municipio"
        control={control}
        options={municipios}
        required
        disabled
      />
      <FormCampoEntrada
        id={ASENTAMIENTO}
        name={ASENTAMIENTO}
        label="Asentamiento"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={PROPIETARIO}
        name={PROPIETARIO}
        label="Propietario"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={SECRETARIA}
        name={SECRETARIA}
        label="Secretaria"
        defaultValue="55 SECRETARÍA DE ADMINISTRACIÓN Y FINANZAS"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={DIRECCION}
        name={DIRECCION}
        label="Dirección"
        defaultValue="55.23 DIRECCIÓN GENERAL DE CONTROL PATRIMONIAL, INMOBILIARIO Y ALMACENES"
        control={control}
        disabled
      />
      <FormCampoEntrada
        id={DEPARTAMENTO}
        name={DEPARTAMENTO}
        label="Departamento"
        control={control}
        defaultValue="55.23.3 DEPARTAMENTO DE CONTROL DE INMUEBLES"
        disabled
      />
    </>
  );
};

export default InventarioInmuebleInfoRegistralForm;
