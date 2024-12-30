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
  ALMACENES: "/Almacenes",
  ANAQUELES: "/Anaqueles",
  CATALOGO_ZONAS: "/CatalogoZonas",
  CONCEPTOS_MOVIMIENTO: "/ConceptosMovimiento",
};

export const ENDPOINTS_SISTEMA = {
  CATALOGO: "/Sistema/Catalogo",
  COLUMNA_CATALOGO: "/Sistema/ColumnaTabla/Catalogo",
  COLUMNA_SUB_MODULO: "/Sistema/ColumnaTabla/SubModulo",
  SUB_MODULO: "/Sistema/SubModulo",
  MODULOS: "/Sistema/Modulo"
};

export const ENDPOINTS_GENERAL = {
  NACIONALIDAD: "/General/Nacionalidad",
  NOMBRAMIENTO: "/General/Nombramiento",
  MUNICIPIO: "/Municipio",
  PERIODO: "/Periodo",
  UNIDAD_ADMINISTRATIVA: "/UnidadAdministrativa",
  TIPO_RESPONSABLE: "/TipoResponsable",
};

export const ENDPOINTS_PATRIMONIO = {
  TIPO_TRAMITE: "/TipoTramite",
  MOTIVO_TRAMITE: "/MotivoTramite",
};

export const ENDPOINTS_SEGURIDAD = {
  PERSONA: "/Persona",
  EMPLEADO: "/Empleado",
  PERMISO: "/Seguridad/Permiso",
  ROL: "/Seguridad/Rol",
  AUTENTIFICACION: "/Autentificacion",
  VALIDAR_TOKEN: "/Autentificacion/Validar"
};
