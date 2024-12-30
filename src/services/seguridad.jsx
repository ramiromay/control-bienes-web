import { ENDPOINTS_SEGURIDAD } from "../settings/apiConfig";
import { get,post, put, patch } from "@context/requestConfig";
import { mapArray } from "../settings/utils";
import { compPersonaMappingRules } from "../settings/mappingRulesConfig";

export const getPersonas = async () => {
  const response = await get(ENDPOINTS_SEGURIDAD.PERSONA);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de personas."
        : response.message
    );
  }
  return mapArray(response.result, compPersonaMappingRules);
};

export const getEmpleados = async () => {
  const response = await get(ENDPOINTS_SEGURIDAD.EMPLEADO);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de empleados."
        : response.message
    );
  }
  return response.result; 
};

export const getEmpleadoById = async (id) => {
  const response = await get(`${ENDPOINTS_SEGURIDAD.EMPLEADO}/${id}`);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el empleado."
        : response.message
    );
  }
  return response.result;
};

export const crearEmpleado = async (data) => {
  const response = await post(ENDPOINTS_SEGURIDAD.EMPLEADO, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el registro."
        : response.message
    );
  }
};

export const actualizarEmpleado = async (id, data) => {
  const response = await put(`${ENDPOINTS_SEGURIDAD.EMPLEADO}/${id}`, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el registro."
        : response.message
    );
  }
};

export const invertirEstadoEmpleado = async (id) => {
  const response = await patch(`${ENDPOINTS_SEGURIDAD.EMPLEADO}/${id}`);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y cambiar el estado del empleado."
        : response.message
    );
  }
}

export const getPermisos = async () => {
  const response = await get(ENDPOINTS_SEGURIDAD.PERMISO);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de personas."
        : response.message
    );
  }
  return response.result;
};

export const getRoles = async () => {
  const response = await get(ENDPOINTS_SEGURIDAD.ROL);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de roles."
        : response.message
    );
  }
  return response.result;
};