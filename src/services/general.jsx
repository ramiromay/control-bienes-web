import { ENDPOINTS_GENERAL } from "../settings/apiConfig";
import { get } from "@context/requestConfig";
import { mapArray } from "../settings/utils";
import {
  compMunicipioMappingRules,
  compPeriodoMappingRules,
  compTipoResponsableMappingRules,
} from "../settings/mappingRulesConfig";

export const getMunicipios = async () => {
  const response = await get(ENDPOINTS_GENERAL.MUNICIPIO);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de municipios."
        : response.message
    );
  }
  return mapArray(response.result, compMunicipioMappingRules);
};

export const getPeriodos = async () => {
  const response = await get(ENDPOINTS_GENERAL.PERIODO);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de periodos."
        : response.message
    );
  }
  return mapArray(response.result, compPeriodoMappingRules);
};

export const getUnidadesAdministrativas = async ({
  desdeNivel = 1,
  hastaNivel = 3,
} = {}) => {
  const endpoint = `${ENDPOINTS_GENERAL.UNIDAD_ADMINISTRATIVA}?desdeNivel=${desdeNivel}&hastaNivel=${hastaNivel}`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de unidades administrativas."
        : response.message
    );
  }
  return response.result;
};

export const getTipoResponsable = async () => {
  const response = await get(ENDPOINTS_GENERAL.TIPO_RESPONSABLE);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de tipos de responsables."
        : response.message
    );
  }
  return mapArray(response.result, compTipoResponsableMappingRules);
};

export const getNacionalidades = async () => {
  const response = await get(ENDPOINTS_GENERAL.NACIONALIDAD);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de nacionalidades."
        : response.message
    );
  }
  return response.result;
};

export const getNombramientos = async () => {
  const response = await get(ENDPOINTS_GENERAL.NOMBRAMIENTO);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de nombramientos."
        : response.message
    );
  }
  return response.result;
};

export const getBMS = async () => {
  const url = `${ENDPOINTS_GENERAL.BMS}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de BMS."
        : response.message
    );
  }
  return response.result;
};

export const getCuentas = async () => {
  const url = `${ENDPOINTS_GENERAL.CUENTA}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de cuentas."
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idCuenta,
    name: item.nombre,
    infoExtra: item.nivelCompleto,
  }));
};
