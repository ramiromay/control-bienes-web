import { get, post, put, patch } from "@context/requestConfig";
import { ENDPOINTS_PATRIMONIO } from "../settings/apiConfig";
import URI from "urijs";
import { parseTemplate } from "url-template";

export const getTipoTramite = async () => {
  const url = ENDPOINTS_PATRIMONIO.TIPO_TRAMITE;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de tipos de tramite."
        : response.message
    );
  }
  return response.result;
};

export const getMotivoTramite = async () => {
  const url = ENDPOINTS_PATRIMONIO.MOTIVO_TRAMITE;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de motivos de tramite."
        : response.message
    );
  }
  return response.result;
};

export const getSolicitudesMuebles = async ({
  periodo,
  unidadAdministrativa,
  busquedaPorFecha,
  fechaInicio,
  fechaFin,
}) => {
  const url = URI(ENDPOINTS_PATRIMONIO.SOLICITUD_MUEBLE)
    .addQuery({ periodo, unidadAdministrativa, busquedaPorFecha })
    .addQuery(fechaInicio ? { fechaInicio } : {})
    .addQuery(fechaFin ? { fechaFin } : {})
    .toString();

  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de solicitudes de los bienes muebles."
        : response.message
    );
  }
  return response.result;
};

export const crearSolicitud = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.SOLICITUD_MUEBLE;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear la solicitud."
        : response.message
    );
  }
};

export const modificarSolicitudMueble = async ({ idSolicitud, data }) => {
  const url = `${ENDPOINTS_PATRIMONIO.SOLICITUD_MUEBLE}/${idSolicitud}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y modificar la solicitud."
        : response.message
    );
  }
};

export const getSolicitudMueble = async ({ idSolicitud }) => {
  const url = `${ENDPOINTS_PATRIMONIO.SOLICITUD_MUEBLE}/${idSolicitud}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la solicitud."
        : response.message
    );
  }
  return response.result;
};

export const getSolicitudPemiteModificaciones = async ({ idSolicitud }) => {
  const template = parseTemplate(
    ENDPOINTS_PATRIMONIO.VALIDAR_MODIFICACION_SOLICITUD
  );
  const url = template.expand({ idSolicitud });
  console.log(url);
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y validar si la solicitud esta abierto a modificaciones en la etapa actual."
        : response.message
    );
  }
  return response.result;
};

export const getEtapasPorSolicitud = async ({ idSolicitud }) => {
  const template = parseTemplate(ENDPOINTS_PATRIMONIO.ETAPAS_SOLICITUD);
  const url = template.expand({ idSolicitud });
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de etapas de la solicitud."
        : response.message
    );
  }
  return response.result;
};

export const cambiarEtapaSolicitudMueble = async ({ idSolicitud, etapa }) => {
  const template = `${ENDPOINTS_PATRIMONIO.SOLICITUD_MUEBLE}/${idSolicitud}`;
  const url = URI(template).addQuery({ etapa }).toString();
  const response = await patch(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y cambiar la etapa de la solicitud."
        : response.message
    );
  }
};

export const getTramitesPorSolicitud = async ({ idSolicitud }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MUEBLE}/${idSolicitud}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de tramites de la solicitud."
        : response.message
    );
  }
  return response.result;
};

export const getSeguimiento = async ({ idTramite }) => {
  const url = `${ENDPOINTS_PATRIMONIO.SEGUIMIENTO_TRAMITE}/${idTramite}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el seguimiento del tramite."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteAltaMueble = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_ALTA_MUEBLE;
  console.log(data);
  console.log(url);
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteAltaMueble = async ({ idTramiteAlta, data }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_ALTA_MUEBLE}/${idTramiteAlta}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteAltaMueble = async ({ idTramiteAlta }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_ALTA_MUEBLE}/${idTramiteAlta}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite de mueble."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteModificacionMueble = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_MODIFICACION_MUEBLE;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteModificacionMueble = async ({
  idTramiteModificacion,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MODIFICACION_MUEBLE}/${idTramiteModificacion}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteModificacionMueble = async ({
  idTramiteModificacion,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MODIFICACION_MUEBLE}/${idTramiteModificacion}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite de mueble."
        : response.message
    );
  }
  return response.result;
};

export const getBienesInventarioPorTipo = async ({
  idTipoBien,
  detalleSolicitud,
}) => {
  const template = ENDPOINTS_PATRIMONIO.INVENTARIO;
  const url = URI(template)
    .addQuery({ tipoBien: idTipoBien })
    .addQuery(detalleSolicitud ? { detalleSolicitud: detalleSolicitud } : {})
    .toString();
  console.log(url);
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de bienes en el inventario"
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteBajaMueble = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_BAJA_MUEBLE;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteBajaMueble = async ({ idTramiteBaja, data }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_BAJA_MUEBLE}/${idTramiteBaja}`;
  console.log(url);
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteBajaMueble = async ({ idTramiteBaja }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_BAJA_MUEBLE}/${idTramiteBaja}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite de mueble."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteMovimientoMueble = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_MOVIMIENTO_MUEBLE;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteMovimientoMueble = async ({
  idTramiteMovimiento,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MOVIMIENTO_MUEBLE}/${idTramiteMovimiento}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteMovimientoMueble = async ({ idTramiteMovimiento }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MOVIMIENTO_MUEBLE}/${idTramiteMovimiento}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite de mueble."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteDesincorporacionMueble = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_DESINCORPORACION_MUEBLE;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteDesincorporacionMueble = async ({
  idTramiteDesincorporacion,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_DESINCORPORACION_MUEBLE}/${idTramiteDesincorporacion}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteDesincorporacionMueble = async ({
  idTramiteDesincorporacion,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_DESINCORPORACION_MUEBLE}/${idTramiteDesincorporacion}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite de mueble."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteDestinoFinalMueble = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_DESTINO_FINAL_MUEBLE;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteDestinoFinalMueble = async ({
  idTramiteDestinoFinal,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_DESTINO_FINAL_MUEBLE}/${idTramiteDestinoFinal}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteDestinoFinalMueble = async ({
  idTramiteDestinoFinal,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_DESTINO_FINAL_MUEBLE}/${idTramiteDestinoFinal}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite de mueble."
        : response.message
    );
  }
  return response.result;
};

export const getEtapasPorTramite = async ({ idTramite }) => {
  const template = parseTemplate(ENDPOINTS_PATRIMONIO.ETAPAS_TRAMITE);
  const url = template.expand({ idTramite });
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de etapas del tramite."
        : response.message
    );
  }
  return response.result;
};

export const cambiarEtapaTramiteMueble = async ({ idTramite, etapa }) => {
  const template = `${ENDPOINTS_PATRIMONIO.TRAMITE_MUEBLE}/${idTramite}`;
  const url = URI(template).addQuery({ etapa }).toString();
  const response = await patch(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y cambiar la etapa del tramite."
        : response.message
    );
  }
};

export const cambiarEtapaTramiteVehiculo = async ({ idTramite, etapa }) => {
  const template = `${ENDPOINTS_PATRIMONIO.TRAMITE_VEHICULO}/${idTramite}`;
  const url = URI(template).addQuery({ etapa }).toString();
  const response = await patch(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y cambiar la etapa del tramite."
        : response.message
    );
  }
};

export const getSolicitudesVehiculos = async ({
  periodo,
  unidadAdministrativa,
  busquedaPorFecha,
  fechaInicio,
  fechaFin,
}) => {
  const url = URI(ENDPOINTS_PATRIMONIO.SOLICITUD_VEHICULO)
    .addQuery({ periodo, unidadAdministrativa, busquedaPorFecha })
    .addQuery(fechaInicio ? { fechaInicio } : {})
    .addQuery(fechaFin ? { fechaFin } : {})
    .toString();

  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de solicitudes de los bienes."
        : response.message
    );
  }
  return response.result;
};

export const crearSolicitudVehiculo = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.SOLICITUD_VEHICULO;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear la solicitud."
        : response.message
    );
  }
};

export const modificarSolicitudVehiculo = async ({ idSolicitud, data }) => {
  const url = `${ENDPOINTS_PATRIMONIO.SOLICITUD_VEHICULO}/${idSolicitud}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y modificar la solicitud."
        : response.message
    );
  }
};

export const getSolicitudVehiculo = async ({ idSolicitud }) => {
  const url = `${ENDPOINTS_PATRIMONIO.SOLICITUD_VEHICULO}/${idSolicitud}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la solicitud."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteAltaVehiculo = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_ALTA_VEHICULO;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteAltaVehiculo = async ({
  idTramiteAlta,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_ALTA_VEHICULO}/${idTramiteAlta}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteAltaVehiculo = async ({ idTramiteAlta }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_ALTA_VEHICULO}/${idTramiteAlta}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite de mueble."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteModificacionVehiculo = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_MODIFICACION_VEHICULO;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteModificacionVehiculo = async ({
  idTramite,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MODIFICACION_VEHICULO}/${idTramite}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteModificacionVehiculo = async ({ idTramite }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MODIFICACION_VEHICULO}/${idTramite}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteBajaVehiculo = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_BAJA_VEHICULO;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteBajaVehiculo = async ({
  idTramiteBaja,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_BAJA_VEHICULO}/${idTramiteBaja}`;
  console.log(url);
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteBajaVehiculo = async ({ idTramite }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_BAJA_VEHICULO}/${idTramite}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteMovimientoVehiculo = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_MOVIMIENTO_VEHICULO;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteMovimientoVehiculo = async ({
  idTramite,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MOVIMIENTO_VEHICULO}/${idTramite}`;
  console.log(url);
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteMovimientoVehiculo = async ({ idTramite }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MOVIMIENTO_VEHICULO}/${idTramite}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteDesincorporacionVehiculo = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_DESINCORPORACION_VEHICULO;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteDesincorporacionVehiculo = async ({
  idTramite,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_DESINCORPORACION_VEHICULO}/${idTramite}`;
  console.log(url);
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteDesincorporacionVehiculo = async ({ idTramite }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_DESINCORPORACION_VEHICULO}/${idTramite}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteDestinoFinalVehiculo = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_DESTINO_FINAL_VEHICULO;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear el tramite."
        : response.message
    );
  }
};

export const actualizarTramiteDestinoFinalVehiculo = async ({
  idTramite,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_DESTINO_FINAL_VEHICULO}/${idTramite}`;
  console.log(url);
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y actualizar el tramite."
        : response.message
    );
  }
};

export const getTramiteDestinoFinalVehiculo = async ({ idTramite }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_DESTINO_FINAL_VEHICULO}/${idTramite}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el tramite."
        : response.message
    );
  }
  return response.result;
};

export const getSolicitudesInmuebles = async ({
  periodo,
  unidadAdministrativa,
  busquedaPorFecha,
  fechaInicio,
  fechaFin,
}) => {
  const url = URI(ENDPOINTS_PATRIMONIO.SOLICITUD_INMUEBLE)
    .addQuery({ periodo, unidadAdministrativa, busquedaPorFecha })
    .addQuery(fechaInicio ? { fechaInicio } : {})
    .addQuery(fechaFin ? { fechaFin } : {})
    .toString();

  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de solicitudes."
        : response.message
    );
  }
  return response.result;
};

export const crearSolicitudInmueble = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.SOLICITUD_INMUEBLE;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear la solicitud."
        : response.message
    );
  }
};

export const modificarSolicitudInmueble = async ({ idSolicitud, data }) => {
  const url = `${ENDPOINTS_PATRIMONIO.SOLICITUD_INMUEBLE}/${idSolicitud}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y modificar la solicitud."
        : response.message
    );
  }
};

export const getSolicitudInmueble = async ({ idSolicitud }) => {
  const url = `${ENDPOINTS_PATRIMONIO.SOLICITUD_INMUEBLE}/${idSolicitud}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la solicitud."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteAltaInmueble = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_ALTA_INMUEBLE;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear la solicitud."
        : response.message
    );
  }
};

export const actualizarTramiteAltaInmueble = async ({ idTramite, data }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_ALTA_INMUEBLE}/${idTramite}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y modificar la solicitud."
        : response.message
    );
  }
};

export const getTramiteAltaInmueble = async ({ idTramite }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_ALTA_INMUEBLE}/${idTramite}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la solicitud."
        : response.message
    );
  }
  return response.result;
};

export const getTiposDominios = async () => {
  const url = `${ENDPOINTS_PATRIMONIO.TIPO_DOMINIO}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la solicitud."
        : response.message
    );
  }
  return response.result.map((tipoDominio) => ({
    id: tipoDominio.idTipoDominio,
    name: tipoDominio.nombre,
  }));
};

export const getClasificacionConac = async () => {
  const url = `${ENDPOINTS_PATRIMONIO.CLASIFICACION_CONAC}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la solicitud."
        : response.message
    );
  }
  return response.result.map((tipoDominio) => ({
    id: tipoDominio.nivelCompleto,
    name: tipoDominio.nombre,
  }));
};

export const cambiarEtapaTramiteInmueble = async ({ idTramite, etapa }) => {
  const template = `${ENDPOINTS_PATRIMONIO.TRAMITE_INMUEBLE}/${idTramite}`;
  const url = URI(template).addQuery({ etapa }).toString();
  const response = await patch(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y cambiar la etapa del tramite."
        : response.message
    );
  }
};

export const crearTramiteModificacionInmueble = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_MODIFICACION_INMUEBLE;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear la solicitud."
        : response.message
    );
  }
};

export const actualizarTramiteModificacionInmueble = async ({
  idTramite,
  data,
}) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MODIFICACION_INMUEBLE}/${idTramite}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y modificar la solicitud."
        : response.message
    );
  }
};

export const getTramiteModificacionInmueble = async ({ idTramite }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_MODIFICACION_INMUEBLE}/${idTramite}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la solicitud."
        : response.message
    );
  }
  return response.result;
};

export const crearTramiteBajaInmueble = async ({ data }) => {
  const url = ENDPOINTS_PATRIMONIO.TRAMITE_BAJA_INMUEBLE;
  const response = await post(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y crear la solicitud."
        : response.message
    );
  }
};

export const actualizarTramiteBajaInmueble = async ({ idTramite, data }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_BAJA_INMUEBLE}/${idTramite}`;
  const response = await put(url, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y modificar la solicitud."
        : response.message
    );
  }
};

export const getTramiteBajaInmueble = async ({ idTramite }) => {
  const url = `${ENDPOINTS_PATRIMONIO.TRAMITE_BAJA_INMUEBLE}/${idTramite}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la solicitud."
        : response.message
    );
  }
  return response.result;
};

export const getArticulos = async ({ tipoBien }) => {
  const url = `${ENDPOINTS_PATRIMONIO.INVENTARIO_ARTICULO}/${tipoBien}`;
  console.log(url);
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de articulos."
        : response.message
    );
  }
  return response.result;
};

export const getBienesMuebles = async ({
  periodo,
  unidadAdministrativa,
  estadoBien,
  busquedaPorTipoBien,
  idBusqueda,
  nivelArticulo,
  busquedaPorFecha,
  fechaInicio,
  fechaFin,
}) => {
  const url = URI(ENDPOINTS_PATRIMONIO.INVENTARIO_MUEBLE)
    .addQuery({
      periodo,
      busquedaPorTipoBien,
    })
    .addQuery(unidadAdministrativa ? { unidadAdministrativa } : {})
    .addQuery(estadoBien !== null ? { estadoBien } : {})
    .addQuery(idBusqueda ? { idBusqueda } : {})
    .addQuery(nivelArticulo ? { nivelArticulo } : {})
    .addQuery(busquedaPorFecha ? { busquedaPorFecha } : {})
    .addQuery(fechaInicio ? { fechaInicio } : {})
    .addQuery(fechaFin ? { fechaFin } : {})
    .toString();
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de bienes."
        : response.message
    );
  }
  return response.result;
};

export const getBienMueble = async ({ idBien }) => {
  const url = `${ENDPOINTS_PATRIMONIO.INVENTARIO_MUEBLE}/${idBien}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el bien."
        : response.message
    );
  }
  return response.result;
};

export const getHistorialBienMueble = async ({ idBien }) => {
  const url = `${ENDPOINTS_PATRIMONIO.INVENTARIO_MUEBLE}/${idBien}/Historial`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el historial."
        : response.message
    );
  }
  return response.result;
};

export const getBienesVehiculos = async ({
  periodo,
  unidadAdministrativa,
  estadoBien,
  busquedaPorTipoBien,
  idBusqueda,
  nivelArticulo,
  busquedaPorFecha,
  fechaInicio,
  fechaFin,
}) => {
  const url = URI(ENDPOINTS_PATRIMONIO.INVENTARIO_VEHICULO)
    .addQuery({
      periodo,
      busquedaPorTipoBien,
    })
    .addQuery(unidadAdministrativa ? { unidadAdministrativa } : {})
    .addQuery(estadoBien !== null ? { estadoBien } : {})
    .addQuery(idBusqueda ? { idBusqueda } : {})
    .addQuery(nivelArticulo ? { nivelArticulo } : {})
    .addQuery(busquedaPorFecha ? { busquedaPorFecha } : {})
    .addQuery(fechaInicio ? { fechaInicio } : {})
    .addQuery(fechaFin ? { fechaFin } : {})
    .toString();
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de bienes."
        : response.message
    );
  }
  return response.result;
};

export const getBienVehiculo = async ({ idBien }) => {
  const url = `${ENDPOINTS_PATRIMONIO.INVENTARIO_VEHICULO}/${idBien}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el bien."
        : response.message
    );
  }
  return response.result;
};

export const getHistorialBienVehiculo = async ({ idBien }) => {
  const url = `${ENDPOINTS_PATRIMONIO.INVENTARIO_VEHICULO}/${idBien}/Historial`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el historial."
        : response.message
    );
  }
  return response.result;
};

export const getBienesInmuebles = async ({
  periodo,
  unidadAdministrativa,
  estadoBien,
  busquedaPorTipoBien,
  idBusqueda,
  nivelArticulo,
  busquedaPorFecha,
  fechaInicio,
  fechaFin,
}) => {
  const url = URI(ENDPOINTS_PATRIMONIO.INVENTARIO_INMUEBLE)
    .addQuery({
      periodo,
      busquedaPorTipoBien,
    })
    .addQuery(unidadAdministrativa ? { unidadAdministrativa } : {})
    .addQuery(estadoBien !== null ? { estadoBien } : {})
    .addQuery(idBusqueda ? { idBusqueda } : {})
    .addQuery(nivelArticulo ? { nivelArticulo } : {})
    .addQuery(busquedaPorFecha ? { busquedaPorFecha } : {})
    .addQuery(fechaInicio ? { fechaInicio } : {})
    .addQuery(fechaFin ? { fechaFin } : {})
    .toString();
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de bienes."
        : response.message
    );
  }
  return response.result;
};

export const getBienInmueble = async ({ idBien }) => {
  const url = `${ENDPOINTS_PATRIMONIO.INVENTARIO_INMUEBLE}/${idBien}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el bien."
        : response.message
    );
  }
  return response.result;
};

export const getHistorialBienInmueble = async ({ idBien }) => {
  const url = `${ENDPOINTS_PATRIMONIO.INVENTARIO_INMUEBLE}/${idBien}/Historial`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar el historial."
        : response.message
    );
  }
  return response.result;
};

export const aplicarDepreciacion = async ({
  periodo,
  mes,
  tipoBien,
  tipoDepreciacion,
  folioBien,
  unidadAdministrativa,
}) => {
  const url = URI(`${ENDPOINTS_PATRIMONIO.DEPRECIACION_BIENES}`)
    .addQuery({
      periodo,
      mes,
      tipoBien,
      tipoDepreciacion,
    })
    .addQuery(folioBien ? { folioBien } : {})
    .addQuery(unidadAdministrativa ? { unidadAdministrativa } : {})
    .toString();

  const response = await post(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y aplicar la depreciacion."
        : response.message
    );
  }
  return response.result;
};

export const getDepreciacionPorBien = async ({ idBien }) => {
  const url = `${ENDPOINTS_PATRIMONIO.DEPRECIACION_BIENES}/${idBien}`;
  const response = await get(url);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la depreciaciones aplicadas."
        : response.message
    );
  }
  return response.result;
};
