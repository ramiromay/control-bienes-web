import { ENDPOINTS_GENERAL } from "../settings/apiConfig";
import { get } from "@context/requestConfig";
import { mapArray } from "../settings/utils";
import {
  compMunicipioMappingRules,
  compPeriodoMappingRules,
  compTipoResponsableMappingRules,
  compUnidadAdministrativaMappingRules,
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

export const getUnidadesAdministrativas = async () => {
  const response = await get(ENDPOINTS_GENERAL.UNIDAD_ADMINISTRATIVA);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de unidades administrativas."
        : response.message
    );
  }
  return mapArray(response.result, compUnidadAdministrativaMappingRules);
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