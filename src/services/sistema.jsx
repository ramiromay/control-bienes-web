import { get } from "@context/requestConfig";
import { ENDPOINTS_SISTEMA } from "../settings/apiConfig";
import { mapArray } from "../settings/utils";
import { compSubModuloMapppingRules } from "../settings/mappingRulesConfig";

export const getListaCatalogos = async (endpoint) => {
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de catálogos."
        : response.message
    );
  }
  return response.result;
};

export const getColumnasTabla = async (endpoint) => {
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar las columnas de la tabla."
        : response.message
    );
  }
  return response.result;
};

export const getColumnasTablaSubModulo = async (id) => {
  const response = await get(`${ENDPOINTS_SISTEMA.COLUMNA_SUB_MODULO}/${id}`);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar las columnas de la tabla."
        : response.message
    );
  }
  return response.result;
}

export const getSubModulos = async () => {
  const response = await get(ENDPOINTS_SISTEMA.SUB_MODULO);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar los sub módulos."
        : response.message
    );
  }
  return response.result;
};


export const getModulos = async () => {
  const response = await get(ENDPOINTS_SISTEMA.MODULOS);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar los módulos."
        : response.message
    );
  }
  return response.result;
};
