import { get, post, patch, put } from "@context/requestConfig";
import { ENDPOINTS_CATALOGOS } from "@settings/apiConfig";
import { mapArray } from "@settings/utils";
import {
  compFamiliasMappingRules,
  compSubfamiliasMappingRules,
  compTipoBienMappingRules,
} from "@settings/mappingRulesConfig";
import {
  compCaracteristicaMappingRules,
  compCentroTrabajoMappingRules,
  compCentroTrabajoTurnoMappingRules,
  compClaseMappingRules,
  compClaveMappingRules,
  compColorMappingRules,
  compCombustibleMappingRules,
  compDocumentoMappingRules,
  compEstadoFisicoMappingRules,
  compLineaMappingRules,
  compMarcaMappingRules,
  compResponsableMappingRules,
  compTipoAdquiscionMappingRules,
  compTipoMappingRules,
  compTurnoMappingRules,
  compUbicacionMappingRules,
  compVersionesMappingRules,
} from "../settings/mappingRulesConfig";
import { ENDPOINT_ALMACEN } from "../settings/apiConfig";

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

export const getTiposAdquisiciones = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.TIPO_ADQUISICION}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de tipos de adquisiciones"
        : response.message
    );
  }
  return mapArray(response.result, compTipoAdquiscionMappingRules);
};

export const getEstadoFisico = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.ESTADO_FISICO}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de estados fisicos"
        : response.message
    );
  }
  return mapArray(response.result, compEstadoFisicoMappingRules);
};

export const getMarcas = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.MARCA}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de marcas"
        : response.message
    );
  }
  return mapArray(response.result, compMarcaMappingRules);
};

export const getColores = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.COLOR}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de colores"
        : response.message
    );
  }
  return mapArray(response.result, compColorMappingRules);
};

export const getUbicaciones = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.UBICACION}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de ubicaciones"
        : response.message
    );
  }
  return mapArray(response.result, compUbicacionMappingRules);
};

export const getCaracteristicas = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.CARACTERISTICA_BIEN}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de caracteristicas"
        : response.message
    );
  }
  return mapArray(response.result, compCaracteristicaMappingRules);
};

export const getResponsables = async () => {
  const endpoint = `${ENDPOINTS_CATALOGOS.RESGUARDANTE}?activo=true`;
  const response = await get(endpoint);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de responsables"
        : response.message
    );
  }
  return mapArray(response.result, compResponsableMappingRules);
};

export const getDocumentos = async () => {
  const url = ENDPOINTS_CATALOGOS.DOCUMENTO;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de documentos"
        : response.message
    );
  }
  return mapArray(response.result, compDocumentoMappingRules);
};

export const getClavesVehiculares = async () => {
  const url = ENDPOINTS_CATALOGOS.CLAVE_VEHICULAR;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de claves vehiculares"
        : response.message
    );
  }
  return mapArray(response.result, compClaveMappingRules);
};

export const getLineasVehiculares = async () => {
  const url = ENDPOINTS_CATALOGOS.LINEA_VEHICULAR;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de lineas vehiculares"
        : response.message
    );
  }
  return mapArray(response.result, compLineaMappingRules);
};

export const getVersionesVehiculares = async () => {
  const url = ENDPOINTS_CATALOGOS.VERSION_VEHICULAR;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de lineas versiones vehiculares"
        : response.message
    );
  }
  return mapArray(response.result, compVersionesMappingRules);
};

export const getClasesVehiculares = async () => {
  const url = ENDPOINTS_CATALOGOS.CLASE_VEHICULAR;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de clases vehiculares"
        : response.message
    );
  }
  return mapArray(response.result, compClaseMappingRules);
};

export const getTiposVehiculares = async () => {
  const url = ENDPOINTS_CATALOGOS.TIPO_VEHICULAR;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de tipos vehiculares"
        : response.message
    );
  }
  return mapArray(response.result, compTipoMappingRules);
};

export const getCombustiblesVehiculares = async () => {
  const url = ENDPOINTS_CATALOGOS.COMBUSTIBLE_VEHICULAR;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de combustibles vehiculares"
        : response.message
    );
  }
  return mapArray(response.result, compCombustibleMappingRules);
};

export const getTiposInmuebles = async () => {
  const url = ENDPOINTS_CATALOGOS.TIPO_INMUEBLE;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el recursos de tipos de inmuebles"
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idTipoInmueble,
    name: item.nombre,
  }));
};

export const getUsosInmuebles = async () => {
  const url = ENDPOINTS_CATALOGOS.USO_INMUEBLE;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el recursos de usos de inmuebles"
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idUsoInmueble,
    name: item.nombre,
  }));
};

export const getTiposAfectacion = async () => {
  const url = ENDPOINTS_CATALOGOS.TIPO_AFECTACION;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el recursos de usos de inmuebles"
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idTipoAfectacion,
    name: item.nombre,
  }));
};

export const getOrigenesValor = async () => {
  const url = ENDPOINTS_CATALOGOS.ORIGEN_VALOR;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el recursos de usos de inmuebles"
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idOrigenValor,
    name: item.origen,
  }));
};

export const getMetodoCosteo = async () => {
  const url = `${ENDPOINT_ALMACEN.METODO_COSTEO}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar los metodos de costeo"
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idMetodoCosteo,
    name: item.nombre,
    infoExtra: item.abreviacion,
  }));
};
