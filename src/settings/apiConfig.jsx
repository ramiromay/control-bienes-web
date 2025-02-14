export const API_URL = "https://localhost:7067/api/v1";

export const ENDPOINTS_CATALOGOS = {
  CARACTERISTICA_BIEN: "/CaracteristicaBien",
  CENTRO_TRABAJO: "/CentroTrabajo",
  CENTRO_TRABAJO_TURNO: "/CentroTrabajoTurno",
  CLASE_VEHICULAR: "/ClaseVehicular",
  CLAVE_VEHICULAR: "/ClaveVehicular",
  COLOR: "/Color",
  COMBUSTIBLE_VEHICULAR: "/CombustibleVehicular",
  DOCUMENTO: "/Documento",
  ESTADO_FISICO: "/EstadoFisico",
  ESTADO_GENERAL: "/EstadoGeneral",
  FAMILIA: "/Familia",
  LINEA_VEHICULAR: "/LineaVehicular",
  MARCA: "/Marca",
  ORIGEN_VALOR: "/OrigenValor",
  RESGUARDANTE: "/Resguardante",
  SUB_FAMILIA: "/SubFamilia",
  TIPO_ADQUISICION: "/TipoAdquisicion",
  TIPO_AFECTACION: "/TipoAfectacion",
  TIPO_BIEN: "/TipoBien",
  TIPO_INMUEBLE: "/TipoInmueble",
  TIPO_VEHICULAR: "/TipoVehiculo",
  TITULAR: "/Titular",
  TURNO: "/Turno",
  UBICACION: "/Ubicacion",
  USO_INMUEBLE: "/UsoInmueble",
  VERSION_VEHICULAR: "/VersionVehicular",
  ALMACENES: "/Almacen",
  METODO_ADQUISICION: "/MetodoAdquisicion",
  CATALOGO_ZONAS: "/CatalogoZonas",
  CONCEPTOS_MOVIMIENTO: "/ConceptoMovimiento",
};

export const ENDPOINTS_SISTEMA = {
  CATALOGO: "/Sistema/Catalogo",
  COLUMNA_CATALOGO: "/Sistema/ColumnaTabla/Catalogo",
  COLUMNA_SUB_MODULO: "/Sistema/ColumnaTabla/SubModulo",
  SUB_MODULO: "/Sistema/SubModulo",
  MODULOS: "/Sistema/Modulo",
};

export const ENDPOINTS_GENERAL = {
  BMS: "/General/Bms",
  NACIONALIDAD: "/General/Nacionalidad",
  NOMBRAMIENTO: "/General/Nombramiento",
  MUNICIPIO: "/Municipio",
  PERIODO: "/Periodo",
  UNIDAD_ADMINISTRATIVA: "/UnidadAdministrativa",
  TIPO_RESPONSABLE: "/TipoResponsable",
  CUENTA: "/General/Cuenta",
};

export const ENDPOINTS_PATRIMONIO = {
  TIPO_DOMINIO: "/Patrimonio/TipoDominio",
  CLASIFICACION_CONAC: "/Patrimonio/ClasificacionConac",

  TIPO_TRAMITE: "/TipoTramite",
  MOTIVO_TRAMITE: "/MotivoTramite",
  ETAPAS_SOLICITUD: "/Patrimonio/Solicitud/{idSolicitud}/Etapas",
  ETAPAS_TRAMITE: "/Patrimonio/Tramite/{idTramite}/Etapas",
  VALIDAR_MODIFICACION_SOLICITUD:
    "/Patrimonio/Solicitud/{idSolicitud}/PermiteModificacion",
  INVENTARIO: "/Patrimonio/Inventario/Bien",
  INVENTARIO_ARTICULO: "/Patrimonio/Articulo",

  INVENTARIO_MUEBLE: "/Patrimonio/InventarioMueble",
  INVENTARIO_VEHICULO: "/Patrimonio/InventarioVehiculo",
  INVENTARIO_INMUEBLE: "/Patrimonio/InventarioInmueble",
  DEPRECIACION_BIENES: "/Patrimonio/Depreciacion",
  SOLICITUD_MUEBLE: "/Patrimonio/SolicitudMueble",
  SOLICITUD_VEHICULO: "/Patrimonio/SolicitudVehiculo",
  SOLICITUD_INMUEBLE: "/Patrimonio/SolicitudInmueble",
  TRAMITE_MUEBLE: "/Patrimonio/TramiteMueble",
  TRAMITE_VEHICULO: "/Patrimonio/TramiteVehiculo",
  TRAMITE_INMUEBLE: "/Patrimonio/TramiteInmueble",
  SEGUIMIENTO_TRAMITE: "/Patrimonio/TramiteMueble/Seguimiento",
  TRAMITE_ALTA_MUEBLE: "/Patrimonio/TramiteMueble/Alta",
  TRAMITE_MODIFICACION_MUEBLE: "/Patrimonio/TramiteMueble/Modificacion",
  TRAMITE_BAJA_MUEBLE: "/Patrimonio/TramiteMueble/Baja",
  TRAMITE_MOVIMIENTO_MUEBLE: "/Patrimonio/TramiteMueble/Movimiento",
  TRAMITE_DESINCORPORACION_MUEBLE: "/Patrimonio/TramiteMueble/Desincorporacion",
  TRAMITE_DESTINO_FINAL_MUEBLE: "/Patrimonio/TramiteMueble/DestinoFinal",
  TRAMITE_ALTA_VEHICULO: "/Patrimonio/TramiteVehiculo/Alta",
  TRAMITE_MODIFICACION_VEHICULO: "/Patrimonio/TramiteVehiculo/Modificacion",
  TRAMITE_BAJA_VEHICULO: "/Patrimonio/TramiteVehiculo/Baja",
  TRAMITE_MOVIMIENTO_VEHICULO: "/Patrimonio/TramiteVehiculo/Movimiento",
  TRAMITE_DESINCORPORACION_VEHICULO:
    "/Patrimonio/TramiteVehiculo/Desincorporacion",
  TRAMITE_DESTINO_FINAL_VEHICULO: "/Patrimonio/TramiteVehiculo/DestinoFinal",
  TRAMITE_ALTA_INMUEBLE: "/Patrimonio/TramiteInmueble/Alta",
  TRAMITE_MODIFICACION_INMUEBLE: "/Patrimonio/TramiteInmueble/Modificacion",
  TRAMITE_BAJA_INMUEBLE: "/Patrimonio/TramiteInmueble/Baja",
};

export const ENDPOINTS_SEGURIDAD = {
  PERSONA: "/Persona",
  EMPLEADO: "/Empleado",
  PERMISO: "/Seguridad/Permiso",
  ROL: "/Seguridad/Rol",
  AUTENTIFICACION: "/Autentificacion",
  VALIDAR_TOKEN: "/Autentificacion/Validar",
};

export const ENDPOINT_ALMACEN = {
  METODO_COSTEO: "/Almacen/MetodoCosteo",
  TIPO_MOVIMIENTO: "/Almacen/TipoMovimiento",
  MOVIMIENTO: "/Almacen/Movimiento",
  CONCEPTOS_MOVIMIENTO: "/Almacen/ConceptoMovimiento",
  PROVEEDOR: "/Almacen/Proveedor",
  PROGRAMAS: "/Almacen/ProgramaOperativo",
  INVENTARIO: "/Almacen/Inventario",
};
