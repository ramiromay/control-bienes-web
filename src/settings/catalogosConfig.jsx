import { ENDPOINTS_CATALOGOS } from "@settings/apiConfig";
import {
  almacenMappingRules,
  entCaracteristicaBienMappingRules,
  entCentroTrabajoMappingRules,
  entCentroTrabajoTurnoMappingRules,
  entClaseVehicularMappingRules,
  entClaveVehicularMappingRules,
  entColorMappingRules,
  entCombustibleVehicularMappingRules,
  entConceptoMovimientoMappingRules,
  entDocumentoMappingRules,
  entEstadoFisicoMappingRules,
  entEstadoGeneralMappingRules,
  entFamiliaMappingRules,
  entLineaVehicularMappingRules,
  entMarcaVehicularMappingRules,
  entMetodoAdquisicionMappingRules,
  entOrigenValorMappingRules,
  entResguardanteMappingRules,
  entSubFamiliaMappingRules,
  entTipoAdquisicionMappingRules,
  entTipoAfectacionMappingRules,
  entTipoBienMappingRules,
  entTipoInmuebleMappingRules,
  entTipoVehicularMappingRules,
  entTitularMappingRules,
  entTurnoMappingRules,
  entUbicacionMappingRules,
  entUsoInmuebleMappingRules,
  entVersionVehicularMappingRules,
} from "./mappingRulesConfig";

export const IDS_CATALOGOS = {
  CARACTERISTICA_BIEN: 1,
  CENTRO_TRABAJO: 2,
  CENTRO_TRABAJO_TURNO: 3,
  CLASE_VEHICULAR: 4,
  CLAVE_VEHICULAR: 5,
  COLOR: 6,
  COMBUSTIBLE_VEHICULAR: 7,
  DOCUMENTO: 8,
  ESTADO_FISICO: 9,
  ESTADO_GENERAL: 10,
  FAMILIA: 11,
  LINEA_VEHICULAR: 12,
  MARCA: 13,
  ORIGEN_VALOR: 14,
  RESGUARDANTE: 15,
  SUB_FAMILIA: 16,
  TIPO_ADQUISICION: 17,
  TIPO_AFECTACION: 18,
  TIPO_BIEN: 19,
  TIPO_INMUEBLE: 20,
  TIPO_VEHICULAR: 21,
  TITULAR: 22,
  TURNO: 23,
  UBICACION: 24,
  USO_INMUEBLE: 25,
  VERSION_VEHICULAR: 26,
  ALMACENES: 27,
  METODO_ADQUISICION: 28,
  CATALOGO_ZONAS: 29,
  CONCEPTOS_MOVIMIENTO: 30,
};

export const catalogosConfig = new Map([
  [
    IDS_CATALOGOS.CARACTERISTICA_BIEN,
    {
      titulo: "Características Bienes",
      endpoint: ENDPOINTS_CATALOGOS.CARACTERISTICA_BIEN,
      mappingRules: entCaracteristicaBienMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.CENTRO_TRABAJO,
    {
      titulo: "Centros de Trabajo",
      endpoint: ENDPOINTS_CATALOGOS.CENTRO_TRABAJO,
      mappingRules: entCentroTrabajoMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.CENTRO_TRABAJO_TURNO,
    {
      titulo: "Centros de Trabajo - Turnos",
      endpoint: ENDPOINTS_CATALOGOS.CENTRO_TRABAJO_TURNO,
      mappingRules: entCentroTrabajoTurnoMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.CLASE_VEHICULAR,
    {
      titulo: "Clases Vehiculares",
      endpoint: ENDPOINTS_CATALOGOS.CLASE_VEHICULAR,
      mappingRules: entClaseVehicularMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.CLAVE_VEHICULAR,
    {
      titulo: "Claves Vehiculares",
      endpoint: ENDPOINTS_CATALOGOS.CLAVE_VEHICULAR,
      mappingRules: entClaveVehicularMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.COLOR,
    {
      titulo: "Color de Bien",
      endpoint: ENDPOINTS_CATALOGOS.COLOR,
      mappingRules: entColorMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.COMBUSTIBLE_VEHICULAR,
    {
      titulo: "Combustibles Vehiculares",
      endpoint: ENDPOINTS_CATALOGOS.COMBUSTIBLE_VEHICULAR,
      mappingRules: entCombustibleVehicularMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.DOCUMENTO,
    {
      titulo: "Documentos",
      endpoint: ENDPOINTS_CATALOGOS.DOCUMENTO,
      mappingRules: entDocumentoMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.ESTADO_FISICO,
    {
      titulo: "Estado Físico de un Bien",
      endpoint: ENDPOINTS_CATALOGOS.ESTADO_FISICO,
      mappingRules: entEstadoFisicoMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.ESTADO_GENERAL,
    {
      titulo: "Estado General",
      endpoint: ENDPOINTS_CATALOGOS.ESTADO_GENERAL,
      mappingRules: entEstadoGeneralMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.FAMILIA,
    {
      titulo: "Familias (Lineas)",
      endpoint: ENDPOINTS_CATALOGOS.FAMILIA,
      mappingRules: entFamiliaMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.LINEA_VEHICULAR,
    {
      titulo: "Lineas Vehiculares",
      endpoint: ENDPOINTS_CATALOGOS.LINEA_VEHICULAR,
      mappingRules: entLineaVehicularMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.MARCA,
    {
      titulo: "Marcas",
      endpoint: ENDPOINTS_CATALOGOS.MARCA,
      mappingRules: entMarcaVehicularMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.ORIGEN_VALOR,
    {
      titulo: "Origen del Valor",
      endpoint: ENDPOINTS_CATALOGOS.ORIGEN_VALOR,
      mappingRules: entOrigenValorMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.RESGUARDANTE,
    {
      titulo: "Resguardantes",
      endpoint: ENDPOINTS_CATALOGOS.RESGUARDANTE,
      mappingRules: entResguardanteMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.SUB_FAMILIA,
    {
      titulo: "Sub Familias (Sub Lineas)",
      endpoint: ENDPOINTS_CATALOGOS.SUB_FAMILIA,
      mappingRules: entSubFamiliaMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.TIPO_ADQUISICION,
    {
      titulo: "Tipo de Adquisición",
      endpoint: ENDPOINTS_CATALOGOS.TIPO_ADQUISICION,
      mappingRules: entTipoAdquisicionMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.TIPO_AFECTACION,
    {
      titulo: "Tipo de Afectación",
      endpoint: ENDPOINTS_CATALOGOS.TIPO_AFECTACION,
      mappingRules: entTipoAfectacionMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.TIPO_BIEN,
    {
      titulo: "Tipo de Bien",
      endpoint: ENDPOINTS_CATALOGOS.TIPO_BIEN,
      mappingRules: entTipoBienMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.TIPO_INMUEBLE,
    {
      titulo: "Tipo de Inmueble",
      endpoint: ENDPOINTS_CATALOGOS.TIPO_INMUEBLE,
      mappingRules: entTipoInmuebleMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.TIPO_VEHICULAR,
    {
      titulo: "Tipos Vehiculares",
      endpoint: ENDPOINTS_CATALOGOS.TIPO_VEHICULAR,
      mappingRules: entTipoVehicularMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.TITULAR,
    {
      titulo: "Titulares",
      endpoint: ENDPOINTS_CATALOGOS.TITULAR,
      mappingRules: entTitularMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.TURNO,
    {
      titulo: "Turnos",
      endpoint: ENDPOINTS_CATALOGOS.TURNO,
      mappingRules: entTurnoMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.UBICACION,
    {
      titulo: "Ubicación",
      endpoint: ENDPOINTS_CATALOGOS.UBICACION,
      mappingRules: entUbicacionMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.USO_INMUEBLE,
    {
      titulo: "Uso de Inmueble",
      endpoint: ENDPOINTS_CATALOGOS.USO_INMUEBLE,
      mappingRules: entUsoInmuebleMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.VERSION_VEHICULAR,
    {
      titulo: "Versiones Vehiculares",
      endpoint: ENDPOINTS_CATALOGOS.VERSION_VEHICULAR,
      mappingRules: entVersionVehicularMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.ALMACENES,
    {
      titulo: "Almacenes",
      endpoint: ENDPOINTS_CATALOGOS.ALMACENES,
      mappingRules: almacenMappingRules,
    },
  ],
  [
    IDS_CATALOGOS.METODO_ADQUISICION,
    {
      titulo: "Tipos de Adquisiciones",
      endpoint: ENDPOINTS_CATALOGOS.METODO_ADQUISICION,
      mappingRules: entMetodoAdquisicionMappingRules,
    },
  ],
  // [
  //   IDS_CATALOGOS.CATALOGO_ZONAS,
  //   {
  //     titulo: "Catálogo de Zonas",
  //     endpoint: ENDPOINTS_CATALOGOS.CATALOGO_ZONAS,
  //   },
  // ],
  [
    IDS_CATALOGOS.CONCEPTOS_MOVIMIENTO,
    {
      titulo: "Conceptos de Movimiento",
      endpoint: ENDPOINTS_CATALOGOS.CONCEPTOS_MOVIMIENTO,
      mappingRules: entConceptoMovimientoMappingRules,
    },
  ],
]);
