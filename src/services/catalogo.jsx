import { get, post, patch, put } from "@context/requestConfig";
import { ENDPOINTS_CATALOGOS } from "@settings/apiConfig";
import { mapArray } from "@settings/utils";
import {
  compFamiliasMappingRules,
  compSubfamiliasMappingRules,
  compTipoBienMappingRules,
} from "@settings/mappingRulesConfig";
import { compCentroTrabajoMappingRules, compCentroTrabajoTurnoMappingRules, compTurnoMappingRules } from "../settings/mappingRulesConfig";

export const getTodosRegistrosCatalogo = async (endpoint) => {
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar los registros del catalogo."
        : response.message
    );
  }
  return response.result;
};

export const getRegistroCatalogo = async (endpoint) => {
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el registro."
        : response.message
    );
  }
  return response.result;
};

export const invertirEstadoRegistroCatalogo = async (endpoint) => {
  const response = await patch(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y cambiar el estado del registro."
        : response.message
    );
  }
};

export const crearRegistroCatalogo = async (endpoint, data) => {
  const response = await post(endpoint, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el registro."
        : response.message
    );
  }
};

export const modificarRegistroCatalogo = async (endpoint, data) => {
  const response = await put(endpoint, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el registro."
        : response.message
    );
  }
};

export const getFamilias = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.FAMILIA}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar las Familias."
        : response.message
    );
  }
  return mapArray(response.result, compFamiliasMappingRules);
};

export const getSubfamilias = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.SUB_FAMILIA}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar las Su Familias."
        : response.message
    );
  }
  return mapArray(response.result, compSubfamiliasMappingRules);
};

export const getTipoBien = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.TIPO_BIEN}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar los Tipos de Bienes."
        : response.message
    );
  }
  return mapArray(response.result, compTipoBienMappingRules);
};

export const getCentroTrabajo = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.CENTRO_TRABAJO}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar los Centros de Trabajo."
        : response.message
    );
  }
  return mapArray(response.result, compCentroTrabajoMappingRules);
};

export const getTurno = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.TURNO}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar los Turnos."
        : response.message
    );
  }
  return mapArray(response.result, compTurnoMappingRules);
};


export const getCentroTrabajoTurno = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.CENTRO_TRABAJO_TURNO}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar los Turnos de cada Centros de Trabajo."
        : response.message
    );
  }
  return mapArray(response.result, compCentroTrabajoTurnoMappingRules);
};