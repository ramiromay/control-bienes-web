import URI from "urijs";
import {
  ENDPOINT_ALMACEN,
  ENDPOINTS_CATALOGOS,
  ENDPOINTS_GENERAL,
} from "../settings/apiConfig";
import { get, post, patch, put } from "@context/requestConfig";

export const getTiposMovimiento = async () => {
  const url = `${ENDPOINT_ALMACEN.TIPO_MOVIMIENTO}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de tipos de movimientos"
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idTipoMovimiento,
    name: item.nombre,
  }));
};

export const getAlmacenes = async ({ isLabel = false } = {}) => {
  const url = `${ENDPOINTS_CATALOGOS.ALMACENES}?activo=true`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de almacenes"
        : response.message
    );
  }
  if (isLabel) {
    return response.result.map((item) => ({
      id: item.idAlmacen,
      label: item.nombre,
    }));
  }
  return response.result.map((item) => ({
    id: item.idAlmacen,
    name: item.nombre,
  }));
};

export const getMetodoAdquisicion = async () => {
  const url = `${ENDPOINTS_CATALOGOS.METODO_ADQUISICION}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de metodos de adquisicion"
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idMetodoAdquisicion,
    name: item.nombre,
  }));
};

export const getMovimientos = async ({
  periodo,
  almacen,
  busquedaPorFecha,
  fechaInicio,
  fechaFin,
}) => {
  const url = URI(ENDPOINT_ALMACEN.MOVIMIENTO)
    .addQuery({ periodo, almacen, busquedaPorFecha })
    .addQuery(fechaInicio ? { fechaInicio } : {})
    .addQuery(fechaFin ? { fechaFin } : {})
    .toString();
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de movimientos"
        : response.message
    );
  }

  return response.result;
};

export const getMovimiento = async ({ id }) => {
  const url = `${ENDPOINT_ALMACEN.MOVIMIENTO}/${id}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el movimiento"
        : response.message
    );
  }
  return response.result;
};

export const crearMovimiento = async ({ data }) => {
  const url = ENDPOINT_ALMACEN.MOVIMIENTO;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el movimiento."
        : response.message
    );
  }
};

export const actualizarMovimiento = async ({ id, data }) => {
  const url = `${ENDPOINT_ALMACEN.MOVIMIENTO}/${id}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el movimiento."
        : response.message
    );
  }
};

export const getEtapasMovimiento = async ({ idMovimiento }) => {
  const url = `${ENDPOINT_ALMACEN.MOVIMIENTO}/${idMovimiento}/Etapas`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de etapas del movimiento"
        : response.message
    );
  }
  return response.result;
};

export const cambiarEtapaMovimiento = async ({ idMovimiento, etapa }) => {
  const url = URI(`${ENDPOINT_ALMACEN.MOVIMIENTO}/${idMovimiento}`)
    .addQuery({ etapa })
    .toString();
  const response = await patch(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar la etapa del movimiento."
        : response.message
    );
  }
};

export const getConceptosMovimiento = async () => {
  const url = `${ENDPOINTS_CATALOGOS.CONCEPTOS_MOVIMIENTO}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de conceptos de movimiento"
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idConceptoMovimiento,
    name: item.nombre,
    idTipoMovimiento: item.idTipoMovimiento,
  }));
};

export const getProveedores = async () => {
  const url = `${ENDPOINT_ALMACEN.PROVEEDOR}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de proveedores"
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idProveedor,
    name: item.nombre,
  }));
};

export const getProgramas = async () => {
  const url = `${ENDPOINT_ALMACEN.PROGRAMAS}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de programas"
        : response.message
    );
  }
  return response.result.map((item) => ({
    id: item.idProgramaOperativo,
    name: item.nombre,
  }));
};

export const getBienesAlmacenPorFiltro = async ({
  periodo,
  almacen,
  busquedaPorFecha,
  fechaInicio,
  fechaFin,
}) => {
  const url = URI(`${ENDPOINT_ALMACEN.INVENTARIO}`)
    .addQuery({
      periodo: periodo,
      almacen: almacen,
    })
    .addQuery(busquedaPorFecha ? { busquedaPorFecha } : {})
    .addQuery(fechaInicio ? { fechaInicio } : {})
    .addQuery(fechaFin ? { fechaFin } : {})
    .toString();
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de bienes"
        : response.message
    );
  }
  return response.result;
};

export const getBienesAlmacen = async ({ idBien }) => {
  const url = `${ENDPOINT_ALMACEN.INVENTARIO}/${idBien}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el bien"
        : response.message
    );
  }
  return response.result;
};
