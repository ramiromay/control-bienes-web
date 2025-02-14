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
  CAMPOS_SOLICITUD_MUEBLE,
  CAMPOS_ALTA_MUEBLE,
  CAMPOS_BAJA_MUEBLE,
  CAMPOS_MODIFICACION_MUEBLE,
  CAMPOS_MOVIMIENTO_MUEBLE,
  CAMPOS_DESINCORPORACION_MUEBLE,
  CAMPOS_DESTINO_FINAL_MUEBLE,
  CAMPOS_SOLICITUD_VEHICULO,
  CAMPOS_ALTA_VEHICULO,
  CAMPOS_MODIFICACION_VEHICULO,
  CAMPOS_BAJA_VEHICULO,
  CAMPOS_MOVIMIENTO_VEHICULO,
  CAMPOS_DESINCORPORACION_VEHICULO,
  CAMPOS_DESTINO_FINAL_VEHICULO,
  CAMPOS_SOLICITUD_INMUEBLE,
  CAMPOS_ALTA_INMUEBLE,
  CAMPOS_MODIFICACION_INMUEBLE,
  CAMPOS_BAJA_INMUEBLE,
  CAMPOS_ALMACEN,
  CAMPOS_CONCEPTO_MOVIMIENTO,
  CAMPOS_METODO_ADQUISICION,
  CAMPOS_MOVIMIENTO,
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
  label: "nombre",
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
  id: "nivelCompleto",
  name: "nombre",
  nivelCompleto: "nivelCompleto",
};

export const compUnidadAdministrativaHierarchyMappingRules = {
  id: "idUnidadAdministrativa",
  name: (item) => `${item.nivelCompleto} ${item.nombre}`, // Función para generar el nombre
  nivelCompleto: "nivelCompleto",
};

export const compArticuloHierarchyMappingRules = {
  id: "id",
  name: (item) => `${item.id} ${item.name}`,
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

export const compBmsMapppingRules = {
  id: "idBMS",
  name: "nombre",
  idFamilia: "idFamilia",
  idSubfamilia: "idSubfamilia",
  infoExtra: "codigoArmonizado",
  precioUnitario: "precioUnitario",
};

export const compEmpleadoMappingRules = {
  id: "idEmpleado",
  name: "nombres",
  infoExtra: "usuario",
};

export const compEtapaMappingRules = {
  id: "idEtapa",
  label: "nombre",
};

export const compTipoAdquiscionMappingRules = {
  id: "idTipoAdquisicion",
  name: "nombre",
};

export const compEstadoFisicoMappingRules = {
  id: "idEstadoFisico",
  name: "nombre",
};

export const compMarcaMappingRules = {
  id: "idMarca",
  name: "nombre",
};

export const compColorMappingRules = {
  id: "idColor",
  name: "nombre",
};

export const compUbicacionMappingRules = {
  id: "idUbicacion",
  name: "descripcion",
};

export const compClaveMappingRules = {
  id: "idClaveVehicular",
  name: "nombre",
};

export const compLineaMappingRules = {
  id: "idLineaVehicular",
  name: "nombre",
};

export const compVersionesMappingRules = {
  id: "idVersionVehicular",
  name: "nombre",
};

export const compClaseMappingRules = {
  id: "idClaseVehicular",
  name: "nombre",
};

export const compTipoMappingRules = {
  id: "idTipoVehicular",
  name: "nombre",
};

export const compCombustibleMappingRules = {
  id: "idCombustibleVehicular",
  name: "nombre",
};

export const compCaracteristicaMappingRules = {
  id: "idCaracteristicaBien",
  name: "etiqueta",
  idFamilia: "idFamilia",
  idSubfamilia: "idSubfamilia",
};

export const compResponsableMappingRules = {
  id: "idResguardante",
  name: "persona",
  idUnidadAdministrativa: "nivelUnidadAdministrativa",
};

export const compDocumentoMappingRules = {
  id: "idDocumento",
  name: "nombre",
  idSubModulo: "idSubModulo",
  idMotivoTramite: "idMotivoTramite",
};

export const entSolicitudMueble = {
  idEmpleado: `${CAMPOS_SOLICITUD_MUEBLE.SOLICITANTE}.id`,
  nivelUnidadAdministrativa: `${CAMPOS_SOLICITUD_MUEBLE.UNIDAD_ADMINISTRATIVA}.id`,
  observaciones: `${CAMPOS_SOLICITUD_MUEBLE.OBSERVACIONES}`,
  idTipoTramite: `${CAMPOS_SOLICITUD_MUEBLE.TIPO_TRAMITE}.id`,
  idMotivoTramite: `${CAMPOS_SOLICITUD_MUEBLE.MOTIVO_TRAMITE}.id`,
};

export const entSolicitudVehiculo = {
  idEmpleado: `${CAMPOS_SOLICITUD_VEHICULO.SOLICITANTE}.id`,
  nivelUnidadAdministrativa: `${CAMPOS_SOLICITUD_VEHICULO.UNIDAD_ADMINISTRATIVA}.id`,
  observaciones: `${CAMPOS_SOLICITUD_VEHICULO.OBSERVACIONES}`,
  idTipoTramite: `${CAMPOS_SOLICITUD_VEHICULO.TIPO_TRAMITE}.id`,
  idMotivoTramite: `${CAMPOS_SOLICITUD_VEHICULO.MOTIVO_TRAMITE}.id`,
};

export const entSolicitudInmueble = {
  idEmpleado: `${CAMPOS_SOLICITUD_INMUEBLE.SOLICITANTE}.id`,
  nivelUnidadAdministrativa: `${CAMPOS_SOLICITUD_INMUEBLE.UNIDAD_ADMINISTRATIVA}.id`,
  observaciones: `${CAMPOS_SOLICITUD_INMUEBLE.OBSERVACIONES}`,
  documentoReferencia: `${CAMPOS_SOLICITUD_INMUEBLE.DOCUMENTO}`,
  idTipoTramite: `${CAMPOS_SOLICITUD_INMUEBLE.TIPO_TRAMITE}.id`,
  idMotivoTramite: `${CAMPOS_SOLICITUD_INMUEBLE.MOTIVO_TRAMITE}.id`,
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
  nivelUnidadAdministrativa: `${CAMPOS_CENTRO_TRABAJO.UNIDAD_ADMINISTRATIVA}.id`,
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
  nivelUnidadAdministrativa: `${CAMPOS_RESGUARDNATE.UNIDAD_ADMINISTRATIVA}.id`,
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

export const entAltaMuebleMappingRules = {
  idSolicitud: `${CAMPOS_ALTA_MUEBLE.SOLICITUD}`,
  numeroBienes: `${CAMPOS_ALTA_MUEBLE.NUMERO_BIENES}`,
  idFamilia: `${CAMPOS_ALTA_MUEBLE.FAMILIA}.id`,
  idSubfamilia: `${CAMPOS_ALTA_MUEBLE.SUBFAMILIA}.id`,
  idBms: `${CAMPOS_ALTA_MUEBLE.BMS}.id`,
  descripcion: `${CAMPOS_ALTA_MUEBLE.DESCRIPCION}`,
  nivelUnidadAdministrativa: `${CAMPOS_ALTA_MUEBLE.UNIDAD_ADMINISTRATIVA}.id`,
  requisicion: `${CAMPOS_ALTA_MUEBLE.REQUISICION}`,
  ordenCompra: `${CAMPOS_ALTA_MUEBLE.ORDEN_COMPRA}`,
  idTipoAdquisicion: `${CAMPOS_ALTA_MUEBLE.TIPO_ADQUISICION}.id`,
  noSeries: `${CAMPOS_ALTA_MUEBLE.NO_SERIES}`,
  folioAnterior: `${CAMPOS_ALTA_MUEBLE.FOLIO_ANTERIOR}`,
  noLicitacion: `${CAMPOS_ALTA_MUEBLE.NO_LICITACION}`,
  fechaLicitacion: `${CAMPOS_ALTA_MUEBLE.FECHA_LICITACION}`,
  observacionLicitacion: `${CAMPOS_ALTA_MUEBLE.OBSERVACION_LICITACION}`,
  idEstadoFisico: `${CAMPOS_ALTA_MUEBLE.ESTADO_FISICO}.id`,
  idMarca: `${CAMPOS_ALTA_MUEBLE.MARCA}.id`,
  idColor: `${CAMPOS_ALTA_MUEBLE.COLOR}.id`,
  folioFactura: `${CAMPOS_ALTA_MUEBLE.FOLIO_FACTURA}`,
  fechaFactura: `${CAMPOS_ALTA_MUEBLE.FECHA_FACTURA}`,
  precioUnitario: `${CAMPOS_ALTA_MUEBLE.PRECIO_UNITARIO}`,
  fechaCompra: `${CAMPOS_ALTA_MUEBLE.FECHA_COMPRA}`,
  diasGarantia: `${CAMPOS_ALTA_MUEBLE.DIAS_GARANTIA}`,
  vidaUtil: `${CAMPOS_ALTA_MUEBLE.VIDA_UTIL}`,
  fechaInicioUso: `${CAMPOS_ALTA_MUEBLE.FECHA_INICIO_USO}`,
  precioDesechable: `${CAMPOS_ALTA_MUEBLE.PRECIO_DESECHABLE}`,
  observacionBien: `${CAMPOS_ALTA_MUEBLE.OBSERVACION_BIEN}`,
  idUbicacion: `${CAMPOS_ALTA_MUEBLE.UBICACION}.id`,
  idMunicipio: `${CAMPOS_ALTA_MUEBLE.MUNICIPIO}.id`,
  caracteristicas: `${CAMPOS_ALTA_MUEBLE.AUX_CARACTERISTICA}Real`,
  responsables: `${CAMPOS_ALTA_MUEBLE.RESPONSABLES}Real`,
  observacionResponsable: `${CAMPOS_ALTA_MUEBLE.OBSERVACION_RESPONSABLE}`,
};

export const entAltaVehiculoMappingRules = {
  idSolicitud: `${CAMPOS_ALTA_VEHICULO.SOLICITUD}`,
  idFamilia: `${CAMPOS_ALTA_VEHICULO.FAMILIA}.id`,
  idSubfamilia: `${CAMPOS_ALTA_VEHICULO.SUBFAMILIA}.id`,
  idBms: `${CAMPOS_ALTA_VEHICULO.BMS}.id`,
  descripcion: `${CAMPOS_ALTA_VEHICULO.DESCRIPCION}`,
  nivelUnidadAdministrativa: `${CAMPOS_ALTA_VEHICULO.UNIDAD_ADMINISTRATIVA}.id`,
  requisicion: `${CAMPOS_ALTA_VEHICULO.REQUISICION}`,
  ordenCompra: `${CAMPOS_ALTA_VEHICULO.ORDEN_COMPRA}`,
  idTipoAdquisicion: `${CAMPOS_ALTA_VEHICULO.TIPO_ADQUISICION}.id`,
  noSeries: `${CAMPOS_ALTA_VEHICULO.NO_SERIES}`,
  folioAnterior: `${CAMPOS_ALTA_VEHICULO.FOLIO_ANTERIOR}`,
  noLicitacion: `${CAMPOS_ALTA_VEHICULO.NO_LICITACION}`,
  fechaLicitacion: `${CAMPOS_ALTA_VEHICULO.FECHA_LICITACION}`,
  observacionLicitacion: `${CAMPOS_ALTA_VEHICULO.OBSERVACION_LICITACION}`,
  idEstadoFisico: `${CAMPOS_ALTA_VEHICULO.ESTADO_FISICO}.id`,
  idMarca: `${CAMPOS_ALTA_VEHICULO.MARCA}.id`,
  idColor: `${CAMPOS_ALTA_VEHICULO.COLOR}.id`,
  folioFactura: `${CAMPOS_ALTA_VEHICULO.FOLIO_FACTURA}`,
  fechaFactura: `${CAMPOS_ALTA_VEHICULO.FECHA_FACTURA}`,
  precioUnitario: `${CAMPOS_ALTA_VEHICULO.PRECIO_UNITARIO}`,
  fechaCompra: `${CAMPOS_ALTA_VEHICULO.FECHA_FACTURA}`,
  diasGarantia: `${CAMPOS_ALTA_VEHICULO.DIAS_GARANTIA}`,
  vidaUtil: `${CAMPOS_ALTA_VEHICULO.VIDA_UTIL}`,
  fechaInicioUso: `${CAMPOS_ALTA_VEHICULO.FECHA_INICIO_USO}`,
  precioDesechable: `${CAMPOS_ALTA_VEHICULO.PRECIO_DESECHABLE}`,
  observacionBien: `${CAMPOS_ALTA_VEHICULO.OBSERVACION_BIEN}`,
  idUbicacion: `${CAMPOS_ALTA_VEHICULO.UBICACION}.id`,
  idMunicipio: `${CAMPOS_ALTA_VEHICULO.MUNICIPIO}.id`,
  caracteristicas: `${CAMPOS_ALTA_VEHICULO.AUX_CARACTERISTICA}Real`,
  responsables: `${CAMPOS_ALTA_VEHICULO.RESPONSABLES}Real`,
  observacionResponsable: `${CAMPOS_ALTA_VEHICULO.OBSERVACION_RESPONSABLE}`,

  cuentaPorPagar: `${CAMPOS_ALTA_VEHICULO.CUENTA_POR_PAGAR}`,
  sustituyeBV: `${CAMPOS_ALTA_VEHICULO.SUSTITUYE_BV}`,
  anioEmicion: `${CAMPOS_ALTA_VEHICULO.ANIO_EMICION}`,
  numeroPlaca: `${CAMPOS_ALTA_VEHICULO.NUMERO_PLACA}`,
  numeroMotor: `${CAMPOS_ALTA_VEHICULO.NUMERO_MOTOR}`,
  anioModelo: `${CAMPOS_ALTA_VEHICULO.ANIO_MODELO}`,
  numeroEconomico: `${CAMPOS_ALTA_VEHICULO.NUMERO_ECONOMICO}`,
  idClave: `${CAMPOS_ALTA_VEHICULO.ID_CLAVE}.id`,
  idLinea: `${CAMPOS_ALTA_VEHICULO.ID_LINEA}.id`,
  idVersion: `${CAMPOS_ALTA_VEHICULO.ID_VERSION}.id`,
  idClase: `${CAMPOS_ALTA_VEHICULO.ID_CLASE}.id`,
  idTipo: `${CAMPOS_ALTA_VEHICULO.ID_TIPO}.id`,
  idCombustible: `${CAMPOS_ALTA_VEHICULO.ID_COMBUSTIBLE}.id`,
};

export const entModificacionVehiculoMappingRules = {
  idSolicitud: `${CAMPOS_MODIFICACION_VEHICULO.SOLICITUD}`,
  idBienPatrimonio: `${CAMPOS_MODIFICACION_VEHICULO.BIEN}.idBien`,
  descripcion: `${CAMPOS_MODIFICACION_VEHICULO.DESCRIPCION}`,
  nivelUnidadAdministrativa: `${CAMPOS_MODIFICACION_VEHICULO.UNIDAD_ADMINISTRATIVA}.id`,
  requisicion: `${CAMPOS_MODIFICACION_VEHICULO.REQUISICION}`,
  ordenCompra: `${CAMPOS_MODIFICACION_VEHICULO.ORDEN_COMPRA}`,
  idTipoAdquisicion: `${CAMPOS_MODIFICACION_VEHICULO.TIPO_ADQUISICION}.id`,
  noSeries: `${CAMPOS_MODIFICACION_VEHICULO.NO_SERIES}`,
  folioAnterior: `${CAMPOS_MODIFICACION_VEHICULO.FOLIO_ANTERIOR}`,
  noLicitacion: `${CAMPOS_MODIFICACION_VEHICULO.NO_LICITACION}`,
  fechaLicitacion: `${CAMPOS_MODIFICACION_VEHICULO.FECHA_LICITACION}`,
  observacionLicitacion: `${CAMPOS_MODIFICACION_VEHICULO.OBSERVACION_LICITACION}`,
  idEstadoFisico: `${CAMPOS_MODIFICACION_VEHICULO.ESTADO_FISICO}.id`,
  idMarca: `${CAMPOS_MODIFICACION_VEHICULO.MARCA}.id`,
  idColor: `${CAMPOS_MODIFICACION_VEHICULO.COLOR}.id`,
  folioFactura: `${CAMPOS_MODIFICACION_VEHICULO.FOLIO_FACTURA}`,
  fechaFactura: `${CAMPOS_MODIFICACION_VEHICULO.FECHA_FACTURA}`,
  precioUnitario: `${CAMPOS_MODIFICACION_VEHICULO.PRECIO_UNITARIO}`,
  fechaCompra: `${CAMPOS_MODIFICACION_VEHICULO.FECHA_FACTURA}`,
  diasGarantia: `${CAMPOS_MODIFICACION_VEHICULO.DIAS_GARANTIA}`,
  vidaUtil: `${CAMPOS_MODIFICACION_VEHICULO.VIDA_UTIL}`,
  fechaInicioUso: `${CAMPOS_MODIFICACION_VEHICULO.FECHA_INICIO_USO}`,
  precioDesechable: `${CAMPOS_MODIFICACION_VEHICULO.PRECIO_DESECHABLE}`,
  observacionBien: `${CAMPOS_MODIFICACION_VEHICULO.OBSERVACION_BIEN}`,
  idUbicacion: `${CAMPOS_MODIFICACION_VEHICULO.UBICACION}.id`,
  idMunicipio: `${CAMPOS_MODIFICACION_VEHICULO.MUNICIPIO}.id`,
  caracteristicas: `${CAMPOS_MODIFICACION_VEHICULO.AUX_CARACTERISTICA}Real`,
  responsables: `${CAMPOS_MODIFICACION_VEHICULO.RESPONSABLES}Real`,
  observacionResponsable: `${CAMPOS_MODIFICACION_VEHICULO.OBSERVACION_RESPONSABLE}`,

  cuentaPorPagar: `${CAMPOS_MODIFICACION_VEHICULO.CUENTA_POR_PAGAR}`,
  sustituyeBV: `${CAMPOS_MODIFICACION_VEHICULO.SUSTITUYE_BV}`,
  anioEmicion: `${CAMPOS_MODIFICACION_VEHICULO.ANIO_EMICION}`,
  numeroPlaca: `${CAMPOS_MODIFICACION_VEHICULO.NUMERO_PLACA}`,
  numeroMotor: `${CAMPOS_MODIFICACION_VEHICULO.NUMERO_MOTOR}`,
  anioModelo: `${CAMPOS_MODIFICACION_VEHICULO.ANIO_MODELO}`,
  numeroEconomico: `${CAMPOS_MODIFICACION_VEHICULO.NUMERO_ECONOMICO}`,
  idClave: `${CAMPOS_MODIFICACION_VEHICULO.ID_CLAVE}.id`,
  idLinea: `${CAMPOS_MODIFICACION_VEHICULO.ID_LINEA}.id`,
  idVersion: `${CAMPOS_MODIFICACION_VEHICULO.ID_VERSION}.id`,
  idClase: `${CAMPOS_MODIFICACION_VEHICULO.ID_CLASE}.id`,
  idTipo: `${CAMPOS_MODIFICACION_VEHICULO.ID_TIPO}.id`,
  idCombustible: `${CAMPOS_MODIFICACION_VEHICULO.ID_COMBUSTIBLE}.id`,
  idMotivoTramite: `${CAMPOS_MODIFICACION_VEHICULO.MOTIVO_TRAMITE}`,
};

export const entModificacionMuebleMappingRules = {
  idSolicitud: `${CAMPOS_MODIFICACION_MUEBLE.SOLICITUD}`,
  descripcion: `${CAMPOS_MODIFICACION_MUEBLE.DESCRIPCION}`,
  nivelUnidadAdministrativa: `${CAMPOS_MODIFICACION_MUEBLE.UNIDAD_ADMINISTRATIVA}.id`,
  idBienPatrimonio: `${CAMPOS_MODIFICACION_MUEBLE.BIEN}.idBien`,
  requisicion: `${CAMPOS_MODIFICACION_MUEBLE.REQUISICION}`,
  ordenCompra: `${CAMPOS_MODIFICACION_MUEBLE.ORDEN_COMPRA}`,
  idTipoAdquisicion: `${CAMPOS_MODIFICACION_MUEBLE.TIPO_ADQUISICION}.id`,
  noSeries: `${CAMPOS_MODIFICACION_MUEBLE.NO_SERIES}`,
  folioAnterior: `${CAMPOS_MODIFICACION_MUEBLE.FOLIO_ANTERIOR}`,
  noLicitacion: `${CAMPOS_MODIFICACION_MUEBLE.NO_LICITACION}`,
  fechaLicitacion: `${CAMPOS_MODIFICACION_MUEBLE.FECHA_LICITACION}`,
  observacionLicitacion: `${CAMPOS_MODIFICACION_MUEBLE.OBSERVACION_LICITACION}`,
  idEstadoFisico: `${CAMPOS_MODIFICACION_MUEBLE.ESTADO_FISICO}.id`,
  idMarca: `${CAMPOS_MODIFICACION_MUEBLE.MARCA}.id`,
  idColor: `${CAMPOS_MODIFICACION_MUEBLE.COLOR}.id`,
  folioFactura: `${CAMPOS_MODIFICACION_MUEBLE.FOLIO_FACTURA}`,
  fechaFactura: `${CAMPOS_MODIFICACION_MUEBLE.FECHA_FACTURA}`,
  precioUnitario: `${CAMPOS_MODIFICACION_MUEBLE.PRECIO_UNITARIO}`,
  fechaCompra: `${CAMPOS_MODIFICACION_MUEBLE.FECHA_COMPRA}`,
  diasGarantia: `${CAMPOS_MODIFICACION_MUEBLE.DIAS_GARANTIA}`,
  vidaUtil: `${CAMPOS_MODIFICACION_MUEBLE.VIDA_UTIL}`,
  fechaInicioUso: `${CAMPOS_MODIFICACION_MUEBLE.FECHA_INICIO_USO}`,
  precioDesechable: `${CAMPOS_MODIFICACION_MUEBLE.PRECIO_DESECHABLE}`,
  observacionBien: `${CAMPOS_MODIFICACION_MUEBLE.OBSERVACION_BIEN}`,
  idUbicacion: `${CAMPOS_MODIFICACION_MUEBLE.UBICACION}.id`,
  idMunicipio: `${CAMPOS_MODIFICACION_MUEBLE.MUNICIPIO}.id`,
  caracteristicas: `${CAMPOS_MODIFICACION_MUEBLE.AUX_CARACTERISTICA}Real`,
  observacionResponsable: `${CAMPOS_MODIFICACION_MUEBLE.OBSERVACION_RESPONSABLE}`,
  idMotivoTramite: `${CAMPOS_MODIFICACION_MUEBLE.MOTIVO_TRAMITE}`,
};

export const entBajaMuebleMappingRules = {
  idSolicitud: `${CAMPOS_BAJA_MUEBLE.FOLIO_SOLICITUD}`,
  nivelUnidadAdministrativa: `${CAMPOS_BAJA_MUEBLE.UNIDAD_ADMINISTRATIVA}.id`,
  folioBien: `${CAMPOS_BAJA_MUEBLE.FOLIO_BIEN}Real`,
  observaciones: `${CAMPOS_BAJA_MUEBLE.OBSERVACIONES}`,
  folioDocumento: `${CAMPOS_BAJA_MUEBLE.FOLIO_DOCUMENTO}`,
  fechaDocumento: CAMPOS_BAJA_MUEBLE.FECHA_DOCUMENTO,
  documentos: `${CAMPOS_BAJA_MUEBLE.LISTA_DOCUMENTO}Real`,
  nombreSolicitante: CAMPOS_BAJA_MUEBLE.NOMBRE_SOLICITANTE,
  lugarResguardo: CAMPOS_BAJA_MUEBLE.LUGAR_RESGUARDO,
};

export const entBajaVehiculoMappingRules = {
  idSolicitud: `${CAMPOS_BAJA_VEHICULO.FOLIO_SOLICITUD}`,
  nivelUnidadAdministrativa: `${CAMPOS_BAJA_VEHICULO.UNIDAD_ADMINISTRATIVA}.id`,
  idEmpleado: `${CAMPOS_BAJA_VEHICULO.EMPLEADO}.id`,
  folioBien: `${CAMPOS_BAJA_VEHICULO.FOLIO_BIEN}Real`,
  observaciones: `${CAMPOS_BAJA_VEHICULO.OBSERVACIONES}`,
  folioDictamen: `${CAMPOS_BAJA_VEHICULO.FOLIO_DOCUMENTO}`,
  fechaDocumento: CAMPOS_BAJA_VEHICULO.FECHA_DOCUMENTO,
  documentos: `${CAMPOS_BAJA_VEHICULO.LISTA_DOCUMENTO}Real`,
};

export const entMovimientoMuebleMappingRules = {
  idSolicitud: `${CAMPOS_MOVIMIENTO_MUEBLE.FOLIO_SOLICITUD}`,
  nivelUnidadAdministrativa: `${CAMPOS_MOVIMIENTO_MUEBLE.UNIDAD_ADMINISTRATIVA}.id`,
  folioBien: `${CAMPOS_MOVIMIENTO_MUEBLE.FOLIO_BIEN}Real`,
  idMunicipio: `${CAMPOS_MOVIMIENTO_MUEBLE.MUNICIPIO}.id`,
  idUbicacion: `${CAMPOS_MOVIMIENTO_MUEBLE.UBICACION}.id`,
  responsable: `${CAMPOS_MOVIMIENTO_MUEBLE.NUEVO_RESGUARDANTE}Real`,
  nivelNuevaUnidadAdministrativa: `${CAMPOS_MOVIMIENTO_MUEBLE.NUEVO_CENTRO_COSTO}.id`,
  idMotivoTramite: CAMPOS_MOVIMIENTO_MUEBLE.MOTIVO_TRAMITE,
};

export const entMovimientoVehiculoMappingRules = {
  idSolicitud: `${CAMPOS_MOVIMIENTO_VEHICULO.FOLIO_SOLICITUD}`,
  nivelUnidadAdministrativa: `${CAMPOS_MOVIMIENTO_VEHICULO.UNIDAD_ADMINISTRATIVA}.id`,
  folioBien: `${CAMPOS_MOVIMIENTO_VEHICULO.FOLIO_BIEN}Real`,
  idMunicipio: `${CAMPOS_MOVIMIENTO_VEHICULO.MUNICIPIO}.id`,
  idUbicacion: `${CAMPOS_MOVIMIENTO_VEHICULO.UBICACION}.id`,
  responsable: `${CAMPOS_MOVIMIENTO_VEHICULO.NUEVO_RESGUARDANTE}Real`,
  nivelNuevaUnidadAdministrativa: `${CAMPOS_MOVIMIENTO_VEHICULO.NUEVO_CENTRO_COSTO}.id`,
  idMotivoTramite: CAMPOS_MOVIMIENTO_VEHICULO.MOTIVO_TRAMITE,
};

export const entDesincorporacionMuebleMappingRules = {
  idSolicitud: `${CAMPOS_DESINCORPORACION_MUEBLE.FOLIO_SOLICITUD}`,
  nivelUnidadAdministrativa: `${CAMPOS_DESINCORPORACION_MUEBLE.UNIDAD_ADMINISTRATIVA}.id`,
  folioBien: `${CAMPOS_DESINCORPORACION_MUEBLE.FOLIO_BIEN}Real`,
  observaciones: `${CAMPOS_DESINCORPORACION_MUEBLE.OBSERVACIONES}`,
  fechaPublicacion: `${CAMPOS_DESINCORPORACION_MUEBLE.FECHA_PUBLICACION}`,
  numeroPublicacion: `${CAMPOS_DESINCORPORACION_MUEBLE.NO_PUBLICACION}`,
  descripcionDesincorporacion: `${CAMPOS_DESINCORPORACION_MUEBLE.DESCRIPCION_DESINCORPORACION}`,
};

export const entDesincorporacionVehiculoMappingRules = {
  idSolicitud: `${CAMPOS_DESINCORPORACION_VEHICULO.FOLIO_SOLICITUD}`,
  idEmpleado: `${CAMPOS_DESINCORPORACION_VEHICULO.EMPLEADO}.id`,
  nivelUnidadAdministrativa: `${CAMPOS_DESINCORPORACION_VEHICULO.UNIDAD_ADMINISTRATIVA}.id`,
  folioBien: `${CAMPOS_DESINCORPORACION_VEHICULO.FOLIO_BIEN}Real`,
  observaciones: `${CAMPOS_DESINCORPORACION_VEHICULO.OBSERVACIONES}`,
  fechaPublicacion: `${CAMPOS_DESINCORPORACION_VEHICULO.FECHA_PUBLICACION}`,
  numeroPublicacion: `${CAMPOS_DESINCORPORACION_VEHICULO.NO_PUBLICACION}`,
  descripcionDesincorporacion: `${CAMPOS_DESINCORPORACION_VEHICULO.DESCRIPCION_DESINCORPORACION}`,
};

export const entDestinoFinalMuebleMappingRules = {
  idSolicitud: `${CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_SOLICITUD}`,
  nivelUnidadAdministrativa: `${CAMPOS_DESTINO_FINAL_MUEBLE.UNIDAD_ADMINISTRATIVA}.id`,
  folioBien: `${CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_BIEN}Real`,
  folioDestruccion: `${CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_DESTRUCCION}`,
  fechaDestruccion: `${CAMPOS_DESTINO_FINAL_MUEBLE.FECHA_DESTRUCCION}`,
  descripcionDestruccion: `${CAMPOS_DESTINO_FINAL_MUEBLE.DESCRIPCION_DESTRUCCION}`,
  folioEnajenacion: `${CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_ENAJENACION}`,
  fechaEnajenacion: `${CAMPOS_DESTINO_FINAL_MUEBLE.FECHA_ENAJENACION}`,
  avaluoEnajenacion: `${CAMPOS_DESTINO_FINAL_MUEBLE.AVALUO_ENAJENACION}`,
  importeAvaluoEnajenacion: `${CAMPOS_DESTINO_FINAL_MUEBLE.IMPORTE_ENAJENACION}`,
  descripcionEnajenacion: `${CAMPOS_DESTINO_FINAL_MUEBLE.DESCRIPCION_ENAJENACION}`,
  idMotivoTramite: `${CAMPOS_DESTINO_FINAL_MUEBLE.MOTIVO_TRAMITE}`,
};

export const entDestinoFinalVehiculoMappingRules = {
  idSolicitud: `${CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_SOLICITUD}`,
  idEmpleado: `${CAMPOS_DESTINO_FINAL_VEHICULO.EMPLEADO}.id`,
  nivelUnidadAdministrativa: `${CAMPOS_DESTINO_FINAL_VEHICULO.UNIDAD_ADMINISTRATIVA}.id`,
  folioBien: `${CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_BIEN}Real`,
  folioDestruccion: `${CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_DESTRUCCION}`,
  fechaDestruccion: `${CAMPOS_DESTINO_FINAL_VEHICULO.FECHA_DESTRUCCION}`,
  descripcionDestruccion: `${CAMPOS_DESTINO_FINAL_VEHICULO.DESCRIPCION_DESTRUCCION}`,
  folioEnajenacion: `${CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_ENAJENACION}`,
  fechaEnajenacion: `${CAMPOS_DESTINO_FINAL_VEHICULO.FECHA_ENAJENACION}`,
  avaluoEnajenacion: `${CAMPOS_DESTINO_FINAL_VEHICULO.AVALUO_ENAJENACION}`,
  importeAvaluoEnajenacion: `${CAMPOS_DESTINO_FINAL_VEHICULO.IMPORTE_ENAJENACION}`,
  descripcionEnajenacion: `${CAMPOS_DESTINO_FINAL_VEHICULO.DESCRIPCION_ENAJENACION}`,
  idMotivoTramite: `${CAMPOS_DESTINO_FINAL_VEHICULO.MOTIVO_TRAMITE}`,
};

export const entAltaInmuebleMappingRules = {
  idSolicitud: `${CAMPOS_ALTA_INMUEBLE.ID_SOLICITUD}`,
  referenciaConac: `${CAMPOS_ALTA_INMUEBLE.REFERENCIA_CONAC}.id`,
  idFamilia: `${CAMPOS_ALTA_INMUEBLE.ID_FAMILIA}.id`,
  idSubfamilia: `${CAMPOS_ALTA_INMUEBLE.ID_SUBFAMILIA}.id`,
  nomenclatura: `${CAMPOS_ALTA_INMUEBLE.NOMENCLATURA}`,
  descripcion: `${CAMPOS_ALTA_INMUEBLE.DESCRIPCION}`,
  idTipoInmueble: `${CAMPOS_ALTA_INMUEBLE.ID_TIPO_INMUEBLE}.id`,
  idUsoInmueble: `${CAMPOS_ALTA_INMUEBLE.ID_USO_INMUEBLE}.id`,
  idTipoDominio: `${CAMPOS_ALTA_INMUEBLE.ID_TIPO_DOMINIO}.id`,
  idEstadoFisico: `${CAMPOS_ALTA_INMUEBLE.ID_ESTADO_FISICO}.id`,
  idTipoAfectacion: `${CAMPOS_ALTA_INMUEBLE.ID_TIPO_AFECTACION}.id`,
  afectante: `${CAMPOS_ALTA_INMUEBLE.AFECTANTE}`,
  idTipoAdquisicion: `${CAMPOS_ALTA_INMUEBLE.ID_TIPO_ADQUISICION}.id`,
  idMunicipio: `${CAMPOS_ALTA_INMUEBLE.MUNICIPIO}.id`,
  valorHistorico: `${CAMPOS_ALTA_INMUEBLE.VALOR_HISTORICO}`,
  valorLibros: `${CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS}`,
  depreciacion: `${CAMPOS_ALTA_INMUEBLE.DEPRECIACION}`,
  aniosVida: `${CAMPOS_ALTA_INMUEBLE.ANIOS_VIDA_UTIL}`,
  decretoPublicacion: `${CAMPOS_ALTA_INMUEBLE.DECRETO_PUBLICACION}`,
  escrituraTitulo: `${CAMPOS_ALTA_INMUEBLE.ESCRITURA_TITULO}`,
  fechaAdquisicion: `${CAMPOS_ALTA_INMUEBLE.FECHA_ADQUISICION}`,
  fechaAltaSistema: `${CAMPOS_ALTA_INMUEBLE.FECHA_ALTA_SISTEMA}`,
  expediente: `${CAMPOS_ALTA_INMUEBLE.EXPEDIENTE}`,
  folioCatastro: `${CAMPOS_ALTA_INMUEBLE.FOLIO_CATASTRO}`,
  calle: `${CAMPOS_ALTA_INMUEBLE.CALLE}`,
  superficie: `${CAMPOS_ALTA_INMUEBLE.SUPERFICIE}`,
  valorTerreno: `${CAMPOS_ALTA_INMUEBLE.VALOR_TERRENO}`,
  numeroExterior: `${CAMPOS_ALTA_INMUEBLE.NUMERO_EXTERIOR}`,
  numeroInterior: `${CAMPOS_ALTA_INMUEBLE.NUMERO_INTERIOR}`,
  cruzamiento1: `${CAMPOS_ALTA_INMUEBLE.CRUZAMIENTO_1}`,
  cruzamiento2: `${CAMPOS_ALTA_INMUEBLE.CRUZAMIENTO_2}`,
  superficieConstruccion: `${CAMPOS_ALTA_INMUEBLE.SUPERFICIE_CONSTRUCCION}`,
  tablaje: `${CAMPOS_ALTA_INMUEBLE.TABLAJE}`,
  valorConstruccion: `${CAMPOS_ALTA_INMUEBLE.VALOR_CONSTRUCCION}`,
  valorInicial: `${CAMPOS_ALTA_INMUEBLE.VALOR_INICIAL}`,
  codigoPostal: `${CAMPOS_ALTA_INMUEBLE.CODIGO_POSTAL}`,
  idOrigenValor: `${CAMPOS_ALTA_INMUEBLE.ID_ORIGEN_VALOR}.id`,
  asentamiento: `${CAMPOS_ALTA_INMUEBLE.ASENTAMIENTO}`,
  propietario: `${CAMPOS_ALTA_INMUEBLE.PROPIETARIO}`,
  observacionInmueble: `${CAMPOS_ALTA_INMUEBLE.OBSERVACION_INMUEBLE}`,
  observacionSupervicion: `${CAMPOS_ALTA_INMUEBLE.OBSERVACION_SUPERVISION}`,
};

export const entModificacionInmuebleMappingRules = {
  idSolicitud: `${CAMPOS_MODIFICACION_INMUEBLE.ID_SOLICITUD}`,
  idBienPatrimonio: `${CAMPOS_MODIFICACION_INMUEBLE.BIEN}.idBien`,
  referenciaConac: `${CAMPOS_MODIFICACION_INMUEBLE.REFERENCIA_CONAC}.id`,
  idFamilia: `${CAMPOS_MODIFICACION_INMUEBLE.ID_FAMILIA}.id`,
  idSubfamilia: `${CAMPOS_MODIFICACION_INMUEBLE.ID_SUBFAMILIA}.id`,
  nomenclatura: `${CAMPOS_MODIFICACION_INMUEBLE.NOMENCLATURA}`,
  descripcion: `${CAMPOS_MODIFICACION_INMUEBLE.DESCRIPCION}`,
  idTipoInmueble: `${CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_INMUEBLE}.id`,
  idUsoInmueble: `${CAMPOS_MODIFICACION_INMUEBLE.ID_USO_INMUEBLE}.id`,
  idTipoDominio: `${CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_DOMINIO}.id`,
  idEstadoFisico: `${CAMPOS_MODIFICACION_INMUEBLE.ID_ESTADO_FISICO}.id`,
  idTipoAfectacion: `${CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_AFECTACION}.id`,
  afectante: `${CAMPOS_MODIFICACION_INMUEBLE.AFECTANTE}`,
  idTipoAdquisicion: `${CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_ADQUISICION}.id`,
  idMunicipio: `${CAMPOS_MODIFICACION_INMUEBLE.MUNICIPIO}.id`,
  valorHistorico: `${CAMPOS_MODIFICACION_INMUEBLE.VALOR_HISTORICO}`,
  valorLibros: `${CAMPOS_MODIFICACION_INMUEBLE.VALOR_LIBROS}`,
  depreciacion: `${CAMPOS_MODIFICACION_INMUEBLE.DEPRECIACION}`,
  aniosVida: `${CAMPOS_MODIFICACION_INMUEBLE.ANIOS_VIDA_UTIL}`,
  decretoPublicacion: `${CAMPOS_MODIFICACION_INMUEBLE.DECRETO_PUBLICACION}`,
  escrituraTitulo: `${CAMPOS_MODIFICACION_INMUEBLE.ESCRITURA_TITULO}`,
  fechaAdquisicion: `${CAMPOS_MODIFICACION_INMUEBLE.FECHA_ADQUISICION}`,
  fechaAltaSistema: `${CAMPOS_MODIFICACION_INMUEBLE.FECHA_ALTA_SISTEMA}`,
  expediente: `${CAMPOS_MODIFICACION_INMUEBLE.EXPEDIENTE}`,
  folioCatastro: `${CAMPOS_MODIFICACION_INMUEBLE.FOLIO_CATASTRO}`,
  calle: `${CAMPOS_MODIFICACION_INMUEBLE.CALLE}`,
  superficie: `${CAMPOS_MODIFICACION_INMUEBLE.SUPERFICIE}`,
  valorTerreno: `${CAMPOS_MODIFICACION_INMUEBLE.VALOR_TERRENO}`,
  numeroExterior: `${CAMPOS_MODIFICACION_INMUEBLE.NUMERO_EXTERIOR}`,
  numeroInterior: `${CAMPOS_MODIFICACION_INMUEBLE.NUMERO_INTERIOR}`,
  cruzamiento1: `${CAMPOS_MODIFICACION_INMUEBLE.CRUZAMIENTO_1}`,
  cruzamiento2: `${CAMPOS_MODIFICACION_INMUEBLE.CRUZAMIENTO_2}`,
  superficieConstruccion: `${CAMPOS_MODIFICACION_INMUEBLE.SUPERFICIE_CONSTRUCCION}`,
  tablaje: `${CAMPOS_MODIFICACION_INMUEBLE.TABLAJE}`,
  valorConstruccion: `${CAMPOS_MODIFICACION_INMUEBLE.VALOR_CONSTRUCCION}`,
  valorInicial: `${CAMPOS_MODIFICACION_INMUEBLE.VALOR_INICIAL}`,
  codigoPostal: `${CAMPOS_MODIFICACION_INMUEBLE.CODIGO_POSTAL}`,
  idOrigenValor: `${CAMPOS_MODIFICACION_INMUEBLE.ID_ORIGEN_VALOR}.id`,
  asentamiento: `${CAMPOS_MODIFICACION_INMUEBLE.ASENTAMIENTO}`,
  propietario: `${CAMPOS_MODIFICACION_INMUEBLE.PROPIETARIO}`,
  observacionInmueble: `${CAMPOS_MODIFICACION_INMUEBLE.OBSERVACION_INMUEBLE}`,
  observacionSupervicion: `${CAMPOS_MODIFICACION_INMUEBLE.OBSERVACION_SUPERVISION}`,
};

export const entBajaInmuebleMappingRules = {
  idSolicitud: `${CAMPOS_BAJA_INMUEBLE.ID_SOLICITUD}`,
  folioBien: `${CAMPOS_BAJA_INMUEBLE.FOLIO_BIEN}`,
  idBienPatrimonio: `${CAMPOS_BAJA_INMUEBLE.ID_BIEN_PATRIMONIO}.idBien`,
  fechaDesincorporacion: `${CAMPOS_BAJA_INMUEBLE.FECHA_DESINCORPORACION}`,
  fechaBaja: `${CAMPOS_BAJA_INMUEBLE.FECHA_BAJA}`,
  fechaBajaSistema: `${CAMPOS_BAJA_INMUEBLE.FECHA_BAJA_SISTEMA}`,
  valorBaja: `${CAMPOS_BAJA_INMUEBLE.VALOR_BAJA}`,
  aFavor: `${CAMPOS_BAJA_INMUEBLE.A_FAVOR}`,
  destinoBien: `${CAMPOS_BAJA_INMUEBLE.DESTINO_BIEN}`,
  escrituraTitulo: `${CAMPOS_BAJA_INMUEBLE.ESCRITURA_TITULO}`,
  justificacionBaja: `${CAMPOS_BAJA_INMUEBLE.JUSTIFICACION_BAJA}`,
};

export const almacenMappingRules = {
  idPeriodo: `${CAMPOS_ALMACEN.ID_PERIODO}.id`,
  nombre: `${CAMPOS_ALMACEN.NOMBRE}`,
  direccion: `${CAMPOS_ALMACEN.DIRECCION}`,
  horario: `${CAMPOS_ALMACEN.HORARIO}`,
  idEmpleado: `${CAMPOS_ALMACEN.ID_EMPLEADO}.id`,
  idCuenta: `${CAMPOS_ALMACEN.ID_CUENTA}.id`,
  idMetodoCosteo: `${CAMPOS_ALMACEN.ID_METODO_COSTEO}.id`,
  folioEntrada: `${CAMPOS_ALMACEN.FOLIO_ENTRADA}`,
  folioSalida: `${CAMPOS_ALMACEN.FOLIO_SALIDA}`,
};

export const entConceptoMovimientoMappingRules = {
  nombre: `${CAMPOS_CONCEPTO_MOVIMIENTO.NOMBRE}`,
  descripcion: `${CAMPOS_CONCEPTO_MOVIMIENTO.DESCRIPCION}`,
  idTipoMovimiento: `${CAMPOS_CONCEPTO_MOVIMIENTO.ID_TIPO_MOVIMIENTO}.id`,
};

export const entMetodoAdquisicionMappingRules = {
  nombre: `${CAMPOS_METODO_ADQUISICION.NOMBRE}`,
};

export const entMovimientoBienMappingRules = {
  idTipoMovimiento: `${CAMPOS_MOVIMIENTO.ID_TIPO_MOVIMIENTO}.id`,
  idAlmacen: `${CAMPOS_MOVIMIENTO.ID_ALMACEN}.id`,
  idMetodoAdquisicion: `${CAMPOS_MOVIMIENTO.ID_METODO_ADQUISICION}.id`,
  idProgramaOperativo: `${CAMPOS_MOVIMIENTO.ID_PROGRAMA_OPERATIVO}.id`,
  numeroFactura: `${CAMPOS_MOVIMIENTO.NUMERO_FACTURA}`,
  fechaResepcion: `${CAMPOS_MOVIMIENTO.FECHA_RECEPCION}`,
  idConceptoMovimiento: `${CAMPOS_MOVIMIENTO.ID_CONCEPTO_MOVIMIENTO}.id`,
  idProveedor: `${CAMPOS_MOVIMIENTO.ID_PROVEEDOR}.id`,
  idFamilia: `${CAMPOS_MOVIMIENTO.ID_FAMILIA}.id`,
  observaciones: `${CAMPOS_MOVIMIENTO.OBSERVACIONES}`,
  importeTotal: `${CAMPOS_MOVIMIENTO.IMPORTE_TOTAL}`,
  articulos: `${CAMPOS_MOVIMIENTO.ARTICULOS}Real`,
};
