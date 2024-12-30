import {
  CAMPOS_LOGIN,
  CAMPOS_CARACTERISTICA,
  CAMPOS_CENTRO_TRABAJO,
  CAMPOS_CENTRO_TRABAJO_TURNO,
  CAMPOS_CLASE_VEHICULAR,
  CAMPOS_CLAVE_VEHICULAR,
  CAMPOS_COLOR,
  CAMPOS_COMBUSTIBLE,
  CAMPOS_DOCUMENTO,
  CAMPOS_ESTADO_FISICO,
  CAMPOS_ESTADO_GENERAL,
  CAMPOS_FAMILIA,
  CAMPOS_LINEA_VEHICULAR,
  CAMPOS_MARCA,
  CAMPOS_ORIGEN_VALOR,
  CAMPOS_RESGUARDNATE,
  CAMPOS_SUBFAMILIA,
  CAMPOS_TIPO_ADQUISICION,
  CAMPOS_TIPO_AFECTACION,
  CAMPOS_TIPO_BIEN,
  CAMPOS_TIPO_INMUEBLE,
  CAMPOS_TIPO_VEHICULAR,
  CAMPOS_TITULAR,
  CAMPOS_TURNO,
  CAMPOS_UBICACION,
  CAMPOS_USO_INMUEBLE,
  CAMPOS_VERSION_VEHICULAR,
  CAMPOS_EMPLEADO,
} from "./formConfig";

export const entResponseMappingRules = {
  generico: "generico",
  message: "message",
  hasError: "hasError",
  result: "result",
};

export const compColumnasTablaMappingRules = {
  field: "clave",
  headerName: "nombre",
  width: "tamanio",
  type: "tipoDato",
  headerClassName: "celdas-encabezado-tabla",
};

export const compCatalogosMappingRules = {
  id: "idCatalogo",
  name: "nombre",
};

export const compFamiliasMappingRules = {
  id: "idFamilia",
  name: "nombre",
};

export const compSubfamiliasMappingRules = {
  id: "idSubfamilia",
  name: "nombre",
  idFamilia: "idFamilia",
};

export const compTipoBienMappingRules = {
  id: "idTipoBien",
  name: "nombre",
};

export const compPeriodoMappingRules = {
  id: "idPeriodo",
  fechaInicio: "/fechaInicio",
  fechaFinal: "/fechaFinal",
};

export const compMunicipioMappingRules = {
  id: "idMunicipio",
  name: "nombre",
};

export const compUnidadAdministrativaMappingRules = {
  id: "idUnidadAdministrativa",
  name: "nombre",
  nivelCompleto: "nivelCompleto",
};

export const compTurnoMappingRules = {
  id: "idTurno",
  name: "nombre",
};

export const compCentroTrabajoMappingRules = {
  id: "idCentroTrabajo",
  name: "nombre",
};

export const compCentroTrabajoTurnoMappingRules = {
  id: "idCentroTrabajoTurno",
  name: "centroTrabajo",
  infoExtra: "turno",
};

export const compTipoResponsableMappingRules = {
  id: "idTipoResponsable",
  name: "nombre",
};

export const compPersonaMappingRules = {
  id: "idPersona",
  name: "nombreCompleto",
};

export const compSubModuloMapppingRules = {
  id: "idSubModulo",
  name: "nombre",
  idModulo: "idModulo",
};

export const compModuloMapppingRules = {
  id: "idModulo",
  name: "nombre",
};

export const compTipoTramiteMappingRules = {
  id: "idTipoTramite",
  name: "nombre",
  idSubModulo: "idSubModulo",
};

export const compMotivoTramiteMappingRules = {
  id: "idMotivoTramite",
  name: "nombre",
  idTipoTramite: "idTipoTramite",
};

export const compNombramientoMappingRules = {
  id: "idNombramiento",
  name: "nombre",
};

export const compNacionalidadesMappingRules = {
  id: "idNacionalidad",
  name: "nombre",
};

export const compRolesMappingRules = {
  id: "idRol",
  name: "nombre",
  infoExtra: "descripcion",
};

export const entEmpleadoMappingRules = {
  nombres: `${CAMPOS_EMPLEADO.NOMBRES}`,
  apellidoPaterno: `${CAMPOS_EMPLEADO.APELLIDO_PATERNO}`,
  apellidoMaterno: `${CAMPOS_EMPLEADO.APELLIDO_MATERNO}`,
  hombre: `${CAMPOS_EMPLEADO.HOMBRE}`,
  fechaNacimiento: `${CAMPOS_EMPLEADO.FECHA_NACIMIENTO}`,
  rfc: `${CAMPOS_EMPLEADO.RFC}`,
  fechaIngreso: `${CAMPOS_EMPLEADO.FECHA_INGRESO}`,
  idNacionalidad: `${CAMPOS_EMPLEADO.NACIONALIDAD}.id`,
  usuario: `${CAMPOS_EMPLEADO.USUARIO}`,
  contraseniaActual: `${CAMPOS_EMPLEADO.CONTRASENA_ACTUAL}`,
  nuevaContrasenia: `${CAMPOS_EMPLEADO.CONTRASENA_NUEVA}`,
  nuevaContraseniaConfirmacion: `${CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA}`,
  email: `${CAMPOS_EMPLEADO.EMAIL}`,
  telefono: `${CAMPOS_EMPLEADO.TELEFONO}`,
  idRol: `${CAMPOS_EMPLEADO.ROL}.id`,
  permisos: `${CAMPOS_EMPLEADO.PERMISOS}`,
  idNombramiento: `${CAMPOS_EMPLEADO.NOMBRAMIENTO}.id`,
};

export const entCaracteristicaBienMappingRules = {
  idFamilia: `${CAMPOS_CARACTERISTICA.FAMILIA}.id`,
  idSubfamilia: `${CAMPOS_CARACTERISTICA.SUBFAMILIA}.id`,
  etiqueta: `${CAMPOS_CARACTERISTICA.ETIQUETA}`,
  descripcion: `${CAMPOS_CARACTERISTICA.DESCRIPCION}`,
};

export const entCentroTrabajoMappingRules = {
  idPeriodo: `${CAMPOS_CENTRO_TRABAJO.PERIODO}.id`,
  idUnidadAdministrativa: `${CAMPOS_CENTRO_TRABAJO.UNIDAD_ADMINISTRATIVA}.id`,
  idMunicipio: `${CAMPOS_CENTRO_TRABAJO.MUNICIPIO}.id`,
  clave: `${CAMPOS_CENTRO_TRABAJO.CLAVE}`,
  nombre: `${CAMPOS_CENTRO_TRABAJO.NOMBRE}`,
  direccion: `${CAMPOS_CENTRO_TRABAJO.DIRECCION}`,
};

export const entDocumentoMappingRules = {
  abreviacion: `${CAMPOS_DOCUMENTO.ABREVIACION}`,
  nombre: `${CAMPOS_DOCUMENTO.NOMBRE}`,
  idTipoTramite: `${CAMPOS_DOCUMENTO.TIPO_TRAMITE}.id`,
  idMotivoTramite: `${CAMPOS_DOCUMENTO.MOTIVO_TRAMITE}.id`,
  idSubModulo: `${CAMPOS_DOCUMENTO.SUB_MODULO}.id`,
};

export const entResguardanteMappingRules = {
  idPeriodo: `${CAMPOS_RESGUARDNATE.PERIODO}.id`,
  idPersona: `${CAMPOS_RESGUARDNATE.PERSONA}.id`,
  idUnidadAdministrativa: `${CAMPOS_RESGUARDNATE.UNIDAD_ADMINISTRATIVA}.id`,
  idTipoResponsable: `${CAMPOS_RESGUARDNATE.TIPO_RESPONSABLE}.id`,
  observaciones: `${CAMPOS_RESGUARDNATE.OBSERVACIONES}`,
  noConvenio: `${CAMPOS_RESGUARDNATE.NO_CONVENIO}`,
  responsable: `${CAMPOS_RESGUARDNATE.RESPONSABLE}`,
};

export const entCentroTrabajoTurnoMappingRules = {
  idCentroTrabajo: `${CAMPOS_CENTRO_TRABAJO_TURNO.CENTRO_TRABAJO}.id`,
  idTurno: `${CAMPOS_CENTRO_TRABAJO_TURNO.TURNO}.id`,
};

export const entTitularMappingRules = {
  nombre: `${CAMPOS_TITULAR.NOMBRE}`,
  idCentroTrabajoTurno: `${CAMPOS_TITULAR.CENTRO_TRABAJO_TURNO}.id`,
};

export const entClaseVehicularMappingRules = {
  nombre: `${CAMPOS_CLASE_VEHICULAR.NOMBRE}`,
  descripcion: `${CAMPOS_CLASE_VEHICULAR.DESCRIPCION}`,
};

export const entClaveVehicularMappingRules = {
  nombre: `${CAMPOS_CLAVE_VEHICULAR.NOMBRE}`,
  descripcion: `${CAMPOS_CLAVE_VEHICULAR.DESCRIPCION}`,
};

export const entColorMappingRules = {
  nombre: `${CAMPOS_COLOR.NOMBRE}`,
  codigoRGB: `${CAMPOS_COLOR.CODIGO_RGB}`,
};

export const entCombustibleVehicularMappingRules = {
  nombre: `${CAMPOS_COMBUSTIBLE.NOMBRE}`,
  descripcion: `${CAMPOS_COMBUSTIBLE.DESCRIPCION}`,
};

export const entEstadoFisicoMappingRules = {
  nombre: `${CAMPOS_ESTADO_FISICO.NOMBRE}`,
  descripcion: `${CAMPOS_ESTADO_FISICO.DESCRIPCION}`,
};

export const entEstadoGeneralMappingRules = {
  nombre: `${CAMPOS_ESTADO_GENERAL.NOMBRE}`,
};

export const entFamiliaMappingRules = {
  idFamilia: `${CAMPOS_FAMILIA.FAMILIA}.id`,
  idTipoBien: `${CAMPOS_FAMILIA.TIPO_BIEN}.id`,
  nombre: `${CAMPOS_FAMILIA.NOMBRE}`,
  descripcion: `${CAMPOS_FAMILIA.DESCRIPCION}`,
};

export const entLineaVehicularMappingRules = {
  nombre: `${CAMPOS_LINEA_VEHICULAR.NOMBRE}`,
  descripcion: `${CAMPOS_LINEA_VEHICULAR.DESCRIPCION}`,
};

export const entMarcaVehicularMappingRules = {
  nombre: `${CAMPOS_MARCA.NOMBRE}`,
  observaciones: `${CAMPOS_MARCA.OBSERVACIONES}`,
};

export const entOrigenValorMappingRules = {
  origen: `${CAMPOS_ORIGEN_VALOR.ORIGEN}`,
  descripcion: `${CAMPOS_ORIGEN_VALOR.DESCRIPCION}`,
};

export const entSubFamiliaMappingRules = {
  idSubfamilia: `${CAMPOS_SUBFAMILIA.SUBFAMILIA}.id`,
  idFamilia: `${CAMPOS_SUBFAMILIA.FAMILIA}.id`,
  nombre: `${CAMPOS_SUBFAMILIA.NOMBRE}`,
  descripcion: `${CAMPOS_SUBFAMILIA.DESCRIPCION}`,
  valorRecuperable: `${CAMPOS_SUBFAMILIA.VALOR_RECUPERABLE}`,
};

export const entTipoAdquisicionMappingRules = {
  nombre: `${CAMPOS_TIPO_ADQUISICION.NOMBRE}`,
};

export const entTipoAfectacionMappingRules = {
  nombre: `${CAMPOS_TIPO_AFECTACION.NOMBRE}`,
};

export const entTipoBienMappingRules = {
  nombre: `${CAMPOS_TIPO_BIEN.NOMBRE}`,
  descripcion: `${CAMPOS_TIPO_BIEN.DESCRIPCION}`,
};

export const entTipoInmuebleMappingRules = {
  nombre: `${CAMPOS_TIPO_INMUEBLE.NOMBRE}`,
  descripcion: `${CAMPOS_TIPO_INMUEBLE.DESCRIPCION}`,
};

export const entTipoVehicularMappingRules = {
  nombre: `${CAMPOS_TIPO_VEHICULAR.NOMBRE}`,
  descripcion: `${CAMPOS_TIPO_VEHICULAR.DESCRIPCION}`,
};

export const entTurnoMappingRules = {
  nombre: `${CAMPOS_TURNO.NOMBRE}`,
};

export const entUbicacionMappingRules = {
  descripcion: `${CAMPOS_UBICACION.DESCRIPCION}`,
};

export const entUsoInmuebleMappingRules = {
  nombre: `${CAMPOS_USO_INMUEBLE.NOMBRE}`,
};

export const entVersionVehicularMappingRules = {
  nombre: `${CAMPOS_VERSION_VEHICULAR.NOMBRE}`,
  descripcion: `${CAMPOS_VERSION_VEHICULAR.DESCRIPCION}`,
};

export const entAutentificacionMappingRules = {
  usuario: CAMPOS_LOGIN.USUARIO,
  contrasenia: CAMPOS_LOGIN.CONTRASENA,
  recordarme: CAMPOS_LOGIN.RECORDARME,
};
