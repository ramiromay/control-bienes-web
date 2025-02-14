import * as yup from "yup";
import {
  CAMPOS_ALMACEN,
  CAMPOS_ALTA_INMUEBLE,
  CAMPOS_ALTA_MUEBLE,
  CAMPOS_ALTA_VEHICULO,
  CAMPOS_BAJA_INMUEBLE,
  CAMPOS_BAJA_MUEBLE,
  CAMPOS_BAJA_VEHICULO,
  CAMPOS_CARACTERISTICA,
  CAMPOS_CENTRO_TRABAJO,
  CAMPOS_CENTRO_TRABAJO_TURNO,
  CAMPOS_CLASE_VEHICULAR,
  CAMPOS_CLAVE_VEHICULAR,
  CAMPOS_COLOR,
  CAMPOS_COMBUSTIBLE,
  CAMPOS_CONCEPTO_MOVIMIENTO,
  CAMPOS_DEPRECIACION,
  CAMPOS_DESINCORPORACION_MUEBLE,
  CAMPOS_DESINCORPORACION_VEHICULO,
  CAMPOS_DESTINO_FINAL_MUEBLE,
  CAMPOS_DESTINO_FINAL_VEHICULO,
  CAMPOS_DOCUMENTO,
  CAMPOS_EMPLEADO,
  CAMPOS_ESTADO_FISICO,
  CAMPOS_ESTADO_GENERAL,
  CAMPOS_FAMILIA,
  CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES,
  CAMPOS_FILTRO_ENTRADA_SALIDA,
  CAMPOS_FILTRO_INVENTARIO,
  CAMPOS_LINEA_VEHICULAR,
  CAMPOS_LOGIN,
  CAMPOS_MARCA,
  CAMPOS_METODO_ADQUISICION,
  CAMPOS_MODIFICACION_INMUEBLE,
  CAMPOS_MODIFICACION_MUEBLE,
  CAMPOS_MOVIMIENTO,
  CAMPOS_MOVIMIENTO_MUEBLE,
  CAMPOS_MOVIMIENTO_VEHICULO,
  CAMPOS_ORIGEN_VALOR,
  CAMPOS_RESGUARDNATE,
  CAMPOS_SOLICITUD_INMUEBLE,
  CAMPOS_SOLICITUD_MUEBLE,
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
} from "./formConfig";
import { REGEX } from "./appConstants";
import { MOTIVO_TRAMITE } from "./sistemaConfig";

export const caracteristicaValidacion = yup.object().shape({
  [CAMPOS_CARACTERISTICA.FAMILIA]: yup
    .object()
    .required("Se requiere la Familia"),
  [CAMPOS_CARACTERISTICA.SUBFAMILIA]: yup
    .object()
    .required("Se requiere la Sub Familia"),
  [CAMPOS_CARACTERISTICA.ETIQUETA]: yup
    .string()
    .required("Se requiere la Etiqueta"),
});

export const centroTrabajoValidacion = yup.object().shape({
  [CAMPOS_CENTRO_TRABAJO.PERIODO]: yup
    .object()
    .required("Se requiere el Periodo"),
  [CAMPOS_CENTRO_TRABAJO.UNIDAD_ADMINISTRATIVA]: yup
    .object()
    .required("Se requiere la Unidad Administrativa"),
  [CAMPOS_CENTRO_TRABAJO.MUNICIPIO]: yup
    .object()
    .required("Se requiere el Municipio"),
  [CAMPOS_CENTRO_TRABAJO.CLAVE]: yup.string().required("Se requiere la Clave"),
  [CAMPOS_CENTRO_TRABAJO.NOMBRE]: yup
    .string()
    .required("Se requiere el Nombre"),
  [CAMPOS_CENTRO_TRABAJO.DIRECCION]: yup
    .string()
    .required("Se requiere la Dirección"),
});

export const centroTrabajoTurnoValidacion = yup.object().shape({
  [CAMPOS_CENTRO_TRABAJO_TURNO.CENTRO_TRABAJO]: yup
    .object()
    .required("Se requiere el Centro de Trabajo"),
  [CAMPOS_CENTRO_TRABAJO_TURNO.TURNO]: yup
    .object()
    .required("Se requiere el Turno"),
});

export const titularValidacion = yup.object().shape({
  [CAMPOS_TITULAR.NOMBRE]: yup.string().required("Se requiere el Nombre"),
  [CAMPOS_TITULAR.CENTRO_TRABAJO_TURNO]: yup
    .object()
    .required("Se requiere el Centro Trabajo - Turno"),
});

export const claseVehicularValidacion = yup.object().shape({
  [CAMPOS_CLASE_VEHICULAR.NOMBRE]: yup
    .string()
    .required("Se requiere el Nombre"),
  [CAMPOS_CLASE_VEHICULAR.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const claveVehicularValidacion = yup.object().shape({
  [CAMPOS_CLAVE_VEHICULAR.NOMBRE]: yup
    .string()
    .required("Se requiere el Nombre"),
  [CAMPOS_CLAVE_VEHICULAR.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const resguardanteValidacion = yup.object().shape({
  [CAMPOS_RESGUARDNATE.PERIODO]: yup
    .object()
    .required("Se requiere el Periodo"),
  [CAMPOS_RESGUARDNATE.UNIDAD_ADMINISTRATIVA]: yup
    .object()
    .required("Se requiere la Unidad Administrativa"),
  [CAMPOS_RESGUARDNATE.PERSONA]: yup
    .object()
    .required("Se requiere la Persona"),
  [CAMPOS_RESGUARDNATE.TIPO_RESPONSABLE]: yup
    .object()
    .required("Se requiere el Tipo de Responsable"),
});

export const colorValidacion = yup.object().shape({
  [CAMPOS_COLOR.NOMBRE]: yup.string().required("Se requiere el Nombre"),
  [CAMPOS_COLOR.CODIGO_RGB]: yup.string().required("Se requiere el Código RGB"),
});

export const combustibleValidacion = yup.object().shape({
  [CAMPOS_COMBUSTIBLE.NOMBRE]: yup.string().required("Se requiere el Nombre"),
  [CAMPOS_COMBUSTIBLE.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const estadoFisicoValidacion = yup.object().shape({
  [CAMPOS_ESTADO_FISICO.NOMBRE]: yup.string().required("Se requiere el Nombre"),
  [CAMPOS_ESTADO_FISICO.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const estadoGeneralValidacion = yup.object().shape({
  [CAMPOS_ESTADO_GENERAL.NOMBRE]: yup
    .string()
    .required("Se requiere el Nombre"),
});

export const familiaValidacion = yup.object().shape({
  [CAMPOS_FAMILIA.ID_FAMILIA]: yup
    .number()
    .required("Se requiere el IdFamilia"),
  [CAMPOS_FAMILIA.TIPO_BIEN]: yup
    .object()
    .required("Se requiere el Tipo de Bien"),
  [CAMPOS_FAMILIA.NOMBRE]: yup.string().required("Se requiere el Nombre"),
  [CAMPOS_FAMILIA.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const lineaVehicularValidacion = yup.object().shape({
  [CAMPOS_LINEA_VEHICULAR.NOMBRE]: yup
    .string()
    .required("Se requiere el Nombre"),
  [CAMPOS_LINEA_VEHICULAR.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const documentoValidacion = yup.object().shape({
  [CAMPOS_DOCUMENTO.ABREVIACION]: yup
    .string()
    .required("Se requiere el Abrevación"),
  [CAMPOS_DOCUMENTO.NOMBRE]: yup.string().required("Se requiere el Nombre"),
  [CAMPOS_DOCUMENTO.SUB_MODULO]: yup
    .object()
    .required("Se requiere el Sub Modulo"),
  [CAMPOS_DOCUMENTO.TIPO_TRAMITE]: yup
    .object()
    .required("Se requiere el Tipo de Tramite"),
  [CAMPOS_DOCUMENTO.MOTIVO_TRAMITE]: yup
    .object()
    .required("Se requiere el Motivo del Tramite"),
});

export const marcaValidacion = yup.object().shape({
  [CAMPOS_MARCA.NOMBRE]: yup.string().required("Se requiere el Nombre"),
  [CAMPOS_MARCA.OBSERVACIONES]: yup.string(),
});

export const origenValorValidacion = yup.object().shape({
  [CAMPOS_ORIGEN_VALOR.ORIGEN]: yup.string().required("Se requiere el Origen"),
  [CAMPOS_ORIGEN_VALOR.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const subFamiliaValidacion = yup.object().shape({
  [CAMPOS_SUBFAMILIA.FAMILIA]: yup.object().required("Se requiere la Familia"),
  [CAMPOS_SUBFAMILIA.NOMBRE]: yup.string().required("Se requiere el Nombre"),
  [CAMPOS_SUBFAMILIA.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
  [CAMPOS_SUBFAMILIA.VALOR_RECUPERABLE]: yup
    .number()
    .required("Se requiere el Valor Recuperable"),
});

export const tipoAdquisicionValidacion = yup.object().shape({
  [CAMPOS_TIPO_ADQUISICION.NOMBRE]: yup
    .string()
    .required("Se requiere el Nombre"),
});

export const tipoAfectacionValidacion = yup.object().shape({
  [CAMPOS_TIPO_AFECTACION.NOMBRE]: yup
    .string()
    .required("Se requiere el Nombre"),
});

export const tipoBienValidacion = yup.object().shape({
  [CAMPOS_TIPO_BIEN.NOMBRE]: yup.string().required("Se requiere el Nombre"),
});

export const tipoInmuebleValidacion = yup.object().shape({
  [CAMPOS_TIPO_INMUEBLE.NOMBRE]: yup.string().required("Se requiere el Nombre"),
  [CAMPOS_TIPO_INMUEBLE.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const tipoVehicularValidacion = yup.object().shape({
  [CAMPOS_TIPO_VEHICULAR.NOMBRE]: yup
    .string()
    .required("Se requiere el Nombre"),
  [CAMPOS_TIPO_VEHICULAR.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const turnoValidacion = yup.object().shape({
  [CAMPOS_TURNO.NOMBRE]: yup.string().required("Se requiere el Nombre"),
});

export const ubicacionValidacion = yup.object().shape({
  [CAMPOS_UBICACION.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const usoInmuebleValidacion = yup.object().shape({
  [CAMPOS_USO_INMUEBLE.NOMBRE]: yup.string().required("Se requiere el Nombre"),
});

export const versionVehicularValidacion = yup.object().shape({
  [CAMPOS_VERSION_VEHICULAR.NOMBRE]: yup
    .string()
    .required("Se requiere el Nombre"),
  [CAMPOS_VERSION_VEHICULAR.DESCRIPCION]: yup
    .string()
    .required("Se requiere la Descripción"),
});

export const autentificacionValidacion = yup.object().shape({
  [CAMPOS_LOGIN.USUARIO]: yup.string().required("Se requiere el Usuario"),
  [CAMPOS_LOGIN.CONTRASENA]: yup.string().required("Se requiere la Contraseña"),
  [CAMPOS_LOGIN.RECORDARME]: yup.boolean(),
});

const creacionEmpleadoValidacion = yup.object().shape({
  [CAMPOS_EMPLEADO.NOMBRES]: yup
    .string()
    .required("Se requiere el Nombre")
    .max(500, "El Nombre excede los 500 caracteres"),
  [CAMPOS_EMPLEADO.APELLIDO_PATERNO]: yup
    .string()
    .required("Se requiere el Apellido Paterno")
    .max(500, "El Apellido Paterno excede los 500 caracteres"),
  [CAMPOS_EMPLEADO.APELLIDO_MATERNO]: yup
    .string()
    .required("Se requiere el Apellido Materno")
    .max(500, "El Apellido Materno excede los 500 caracteres"),
  [CAMPOS_EMPLEADO.FECHA_NACIMIENTO]: yup
    .date()
    .required("Se requiere la Fecha de Nacimiento"),
  [CAMPOS_EMPLEADO.NACIONALIDAD]: yup
    .object()
    .required("Se requiere la Nacionalidad"),
  [CAMPOS_EMPLEADO.RFC]: yup
    .string()
    .required("Se requiere el Rfc")
    .max(20, "El Rfc excede los 20 caracteres"),
  [CAMPOS_EMPLEADO.FECHA_INGRESO]: yup
    .date()
    .required("Se requiere la Fecha de Ingreso")
    .test(
      "es-anterior-hoy",
      "La Fecha no puede ser anterior a hoy",
      (value) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const inputDate = new Date(value).setHours(0, 0, 0, 0);
        return inputDate >= today;
      }
    ),
  [CAMPOS_EMPLEADO.NOMBRAMIENTO]: yup
    .object()
    .required("Se requiere el Nombramiento"),
});

const modificacionEmpleadoValidacion = yup.object().shape({
  [CAMPOS_EMPLEADO.NOMBRES]: yup
    .string()
    .required("Se requiere el Nombre")
    .max(500, "El Nombre excede los 500 caracteres"),
  [CAMPOS_EMPLEADO.APELLIDO_PATERNO]: yup
    .string()
    .required("Se requiere el Apellido Paterno")
    .max(500, "El Apellido Paterno excede los 500 caracteres"),
  [CAMPOS_EMPLEADO.APELLIDO_MATERNO]: yup
    .string()
    .required("Se requiere el Apellido Materno")
    .max(500, "El Apellido Materno excede los 500 caracteres"),
  [CAMPOS_EMPLEADO.FECHA_NACIMIENTO]: yup
    .date()
    .required("Se requiere la Fecha de Nacimiento"),
  [CAMPOS_EMPLEADO.NACIONALIDAD]: yup
    .object()
    .required("Se requiere la Nacionalidad"),
  [CAMPOS_EMPLEADO.RFC]: yup
    .string()
    .required("Se requiere el Rfc")
    .max(20, "El Rfc excede los 20 caracteres"),
  [CAMPOS_EMPLEADO.NOMBRAMIENTO]: yup
    .object()
    .required("Se requiere el Nombramiento"),
});

const creacionUsuarioValidacion = yup.object().shape({
  [CAMPOS_EMPLEADO.USUARIO]: yup
    .string()
    .required("Se requiere el Usuario")
    .max(500, "El Usuario excede los 500 caracteres"),
  [CAMPOS_EMPLEADO.CONTRASENA_NUEVA]: yup
    .string()
    .required("Se requiere la nueva Contraseña")
    .min(8, "La Contraseña debe tener al menos 8 caracteres")
    .matches(REGEX.DIGITO, "La Contraseña debe contener al menos un dígito")
    .matches(
      REGEX.MINUSCULA,
      "La Contraseña debe contener al menos una letra minúscula"
    )
    .matches(
      REGEX.MAYUSCULA,
      "La Contraseña debe contener al menos una letra mayúscula"
    )
    .matches(
      REGEX.NO_ALFANUMERICO,
      "La Contraseña debe contener al menos un carácter no alfanumérico"
    )
    .test(
      "unique-characters",
      "La Contraseña debe tener al menos 1 carácter único",
      (value) => new Set(value || "").size >= 1
    ),
  [CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA]: yup
    .string()
    .required("Se requiere la confirmación de la Contraseña")
    .oneOf(
      [yup.ref(CAMPOS_EMPLEADO.CONTRASENA_NUEVA)],
      "Las Contraseña proporcionadas no coinciden"
    ),
  [CAMPOS_EMPLEADO.EMAIL]: yup
    .string()
    .required("Se requiere el Email")
    .max(250, "El Email excede los 250 caracteres")
    .matches(
      REGEX.EMAIL,
      "El correo electrónico no es válido. Ej: [usuario@dominio.com]"
    ),
  [CAMPOS_EMPLEADO.TELEFONO]: yup
    .string()
    .required("Se requiere el Telefono")
    .max(10, "El Telefono excede los 10 caracteres"),
});

const modificacionUsuarioValidacion = yup.object().shape({
  [CAMPOS_EMPLEADO.USUARIO]: yup
    .string()
    .required("Se requiere el Usuario")
    .max(500, "El Usuario excede los 500 caracteres"),
  [CAMPOS_EMPLEADO.CONTRASENA_ACTUAL]: yup
    .string()
    .test("validaciones-completas", "", function (value) {
      // Validación si el campo está vacío
      if (value === "") {
        return true; // No muestra error si está vacío
      }

      // Validación de longitud mínima
      if (value.length < 8) {
        return this.createError({
          message: "La Contraseña debe tener al menos 8 caracteres",
        });
      }

      // Validación de longitud máxima
      if (value.length > 20) {
        return this.createError({
          message: "La Contraseña debe tener como máximo 20 caracteres",
        });
      }

      // Validación de dígito
      if (!REGEX.DIGITO.test(value)) {
        return this.createError({
          message: "La Contraseña debe contener al menos un dígito",
        });
      }

      // Validación de letra minúscula
      if (!REGEX.MINUSCULA.test(value)) {
        return this.createError({
          message: "La Contraseña debe contener al menos una letra minúscula",
        });
      }

      // Validación de letra mayúscula
      if (!REGEX.MAYUSCULA.test(value)) {
        return this.createError({
          message: "La Contraseña debe contener al menos una letra mayúscula",
        });
      }

      // Validación de carácter no alfanumérico
      if (!REGEX.NO_ALFANUMERICO.test(value)) {
        return this.createError({
          message:
            "La Contraseña debe contener al menos un carácter no alfanumérico",
        });
      }

      // Validación de caracteres únicos
      if (new Set(value || "").size < 1) {
        return this.createError({
          message: "La Contraseña debe tener al menos 1 carácter único",
        });
      }

      return true; // Si pasa todas las validaciones, retorna true
    }),
  [CAMPOS_EMPLEADO.CONTRASENA_NUEVA]: yup
    .string()
    .nullable(true)
    .when([], {
      is: (value) => value && value !== "",
      then: () =>
        yup
          .string()
          .min(8, "La Contraseña debe tener al menos 8 caracteres")
          .matches(
            REGEX.DIGITO,
            "La Contraseña debe contener al menos un dígito"
          )
          .matches(
            REGEX.MINUSCULA,
            "La Contraseña debe contener al menos una letra minúscula"
          )
          .matches(
            REGEX.MAYUSCULA,
            "La Contraseña debe contener al menos una letra mayúscula"
          )
          .matches(
            REGEX.NO_ALFANUMERICO,
            "La Contraseña debe contener al menos un carácter no alfanumérico"
          )
          .test(
            "unique-characters",
            "La Contraseña debe tener al menos 1 carácter único",
            (value) => new Set(value || "").size >= 1
          ),
      otherwise: () => yup.string().nullable(true),
    }),
  [CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA]: yup
    .string()
    .nullable(true)
    .oneOf(
      [yup.ref(CAMPOS_EMPLEADO.CONTRASENA_NUEVA)],
      "Las Contraseña proporcionadas no coinciden"
    ),
  [CAMPOS_EMPLEADO.EMAIL]: yup
    .string()
    .required("Se requiere el Email")
    .max(250, "El Email excede los 250 caracteres")
    .matches(
      REGEX.EMAIL,
      "El correo electrónico no es válido. Ej: [usuario@dominio.com]"
    ),
  [CAMPOS_EMPLEADO.TELEFONO]: yup
    .string()
    .required("Se requiere el Telefono")
    .max(10, "El Telefono excede los 10 caracteres"),
});

export const empleadoValidacion = (esModificacion) => [
  esModificacion ? modificacionEmpleadoValidacion : creacionEmpleadoValidacion,
  esModificacion ? modificacionUsuarioValidacion : creacionUsuarioValidacion,
  yup.object().shape({
    [CAMPOS_EMPLEADO.ROL]: yup.object().required("Se requiere el Rol"),
  }),
];

export const administradorSolicitudesValidacion = yup.object().shape({
  [CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.PERIODO]: yup
    .object()
    .required("Se requiere el Periodo"),
  [CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.BUSQUEDA_FECHA]: yup.boolean(),

  [CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_INICIO]: yup
    .date()
    .when([CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.BUSQUEDA_FECHA], {
      is: (value) => value,
      then: () =>
        yup
          .date()
          .required("Se requiere la Fecha de Inicio")
          .max(
            yup.ref(CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_FIN),
            "La Fecha de Inicio no puede ser posterior a la Fecha de Fin"
          ),
      otherwise: () => yup.date().nullable(),
    }),

  [CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_FIN]: yup
    .date()
    .when(
      [
        CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.BUSQUEDA_FECHA,
        CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_INICIO,
      ],
      {
        is: (value, inicio) => value && inicio != null,
        then: () =>
          yup
            .date()
            .required("Se requiere la Fecha de Fin")
            .min(
              yup.ref(CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_INICIO),
              "La Fecha de Fin no puede ser anterior a la Fecha de Inicio"
            ),
        otherwise: () => yup.date().nullable(),
      }
    ),
});

export const solicitudMuebleValidacion = yup.object().shape({
  [CAMPOS_SOLICITUD_MUEBLE.SOLICITANTE]: yup
    .object()
    .required("Se requiere el Solicitante"),
  [CAMPOS_SOLICITUD_MUEBLE.UNIDAD_ADMINISTRATIVA]: yup
    .object()
    .required("Se requiere la Unidad Administrativa"),
  [CAMPOS_SOLICITUD_MUEBLE.OBSERVACIONES]: yup
    .string()
    .required("Se requiere las Observaciones"),
  [CAMPOS_SOLICITUD_MUEBLE.TIPO_TRAMITE]: yup
    .object()
    .required("Se requiere el Tipo de Trámite"),
  [CAMPOS_SOLICITUD_MUEBLE.MOTIVO_TRAMITE]: yup
    .object()
    .required("Se requiere el Motivo de Trámite"),
});

export const solicitudInmuebleValidacion = yup.object().shape({
  [CAMPOS_SOLICITUD_INMUEBLE.SOLICITANTE]: yup
    .object()
    .required("Se requiere el Solicitante"),
  [CAMPOS_SOLICITUD_INMUEBLE.UNIDAD_ADMINISTRATIVA]: yup
    .object()
    .required("Se requiere la Unidad Administrativa"),
  [CAMPOS_SOLICITUD_INMUEBLE.OBSERVACIONES]: yup
    .string()
    .required("Se requiere las Observaciones"),
  [CAMPOS_SOLICITUD_INMUEBLE.TIPO_TRAMITE]: yup
    .object()
    .required("Se requiere el Tipo de Trámite"),
  [CAMPOS_SOLICITUD_INMUEBLE.MOTIVO_TRAMITE]: yup
    .object()
    .required("Se requiere el Motivo de Trámite"),
});

export const muebleAltaValidacion = [
  yup.object().shape({
    [CAMPOS_ALTA_MUEBLE.SOLICITUD]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("El Folio de la Solicitud debe ser un número")
      .positive("El Folio de la Solicitud debe ser un número positivo")

      .required("Se requiere el Folio de la Solicitud"),
    [CAMPOS_ALTA_MUEBLE.NUMERO_BIENES]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("El Número de Bienes debe ser un número")
      .positive("El Número de Bienes debe ser un número positivo")
      .required("Se requiere el Número de Bienes"),
    [CAMPOS_ALTA_MUEBLE.FAMILIA]: yup
      .object()
      .required("Se requiere la Familia"),
    [CAMPOS_ALTA_MUEBLE.SUBFAMILIA]: yup
      .object()
      .required("Se requiere la SubFamilia"),
    [CAMPOS_ALTA_MUEBLE.BMS]: yup.object().required("Se requiere el BMS"),
    [CAMPOS_ALTA_MUEBLE.DESCRIPCION]: yup
      .string()
      .trim()
      .required("Se requiere la Descripción"),
    [CAMPOS_ALTA_MUEBLE.UNIDAD_ADMINISTRATIVA]: yup
      .object()
      .required("Se requiere la Unidad Administrativa"),
    [CAMPOS_ALTA_MUEBLE.TIPO_ADQUISICION]: yup
      .object()
      .required("Se requiere el Tipo de Adquisición"),
    [CAMPOS_ALTA_MUEBLE.NO_SERIES]: yup
      .string()
      .required("Se requiere el No Serie")
      .test(
        "match-numero-bienes",
        "El Número de Bienes y la cantidad de No de Serie no coinciden",
        function (value) {
          const { [CAMPOS_ALTA_MUEBLE.NUMERO_BIENES]: numeroBienes } =
            this.parent;
          return value?.split(",").length === numeroBienes;
        }
      ),
    [CAMPOS_ALTA_MUEBLE.FOLIO_ANTERIOR]: yup
      .string()
      .max(10, "El Folio Anterior excede los 10 caracteres"),
  }),
  yup.object().shape({
    [CAMPOS_ALTA_MUEBLE.ESTADO_FISICO]: yup
      .object()
      .required("Se requiere el Estado Físico"),
    [CAMPOS_ALTA_MUEBLE.FOLIO_FACTURA]: yup
      .string()
      .trim()
      .required("Se requiere el Folio de la Factura"),
    [CAMPOS_ALTA_MUEBLE.FECHA_FACTURA]: yup
      .date()
      .required("Se requiere la Fecha de la Factura"),
    [CAMPOS_ALTA_MUEBLE.PRECIO_UNITARIO]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("El Precio Unitario debe ser un número")
      .moreThan(0.0, "El Precio Unitario debe ser mayor a 0.0")
      .required("Se requiere el Precio Unitario"),
    [CAMPOS_ALTA_MUEBLE.FECHA_COMPRA]: yup
      .date()
      .required("Se requiere la Fecha de la Compra"),
    [CAMPOS_ALTA_MUEBLE.VIDA_UTIL]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("Se requiere la Vida Útil")
      .positive("La Vida Útil debe ser mayor a 0")
      .required("Se requiere la Vida Útil"),
    [CAMPOS_ALTA_MUEBLE.FECHA_INICIO_USO]: yup
      .date()
      .required("Se requiere la Fecha de Inicio de Uso"),
    [CAMPOS_ALTA_MUEBLE.PRECIO_DESECHABLE]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("Se requiere el Precio Desechable")
      .required("Se requiere el Precio Desechable"),
    [CAMPOS_ALTA_MUEBLE.OBSERVACION_BIEN]: yup
      .string()
      .trim()
      .required("Se requiere la Observación del Bien"),
    [CAMPOS_ALTA_MUEBLE.UBICACION]: yup
      .object()
      .required("Se requiere la Ubicación"),
    [CAMPOS_ALTA_MUEBLE.MUNICIPIO]: yup
      .object()
      .required("Se requiere el Municipio"),
  }),
  yup.object().shape({}),
  yup.object().shape({
    [CAMPOS_ALTA_MUEBLE.RESPONSABLES]: yup
      .array()
      .min(1, "Se requiere al menos un Responsable")
      .required("Se requieren los Responsables"),
  }),
];

export const vehiculoAltaValidacion = [
  yup.object().shape({
    [CAMPOS_ALTA_VEHICULO.SOLICITUD]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("El Folio de la Solicitud debe ser un número")
      .positive("El Folio de la Solicitud debe ser un número positivo")

      .required("Se requiere el Folio de la Solicitud"),
    [CAMPOS_ALTA_VEHICULO.FAMILIA]: yup
      .object()
      .required("Se requiere la Familia"),
    [CAMPOS_ALTA_VEHICULO.SUBFAMILIA]: yup
      .object()
      .required("Se requiere la SubFamilia"),
    [CAMPOS_ALTA_VEHICULO.BMS]: yup.object().required("Se requiere el BMS"),
    [CAMPOS_ALTA_VEHICULO.DESCRIPCION]: yup
      .string()
      .trim()
      .required("Se requiere la Descripción"),
    [CAMPOS_ALTA_VEHICULO.UNIDAD_ADMINISTRATIVA]: yup
      .object()
      .required("Se requiere la Unidad Administrativa"),
    [CAMPOS_ALTA_VEHICULO.TIPO_ADQUISICION]: yup
      .object()
      .required("Se requiere el Tipo de Adquisición"),

    [CAMPOS_ALTA_VEHICULO.FOLIO_ANTERIOR]: yup
      .string()
      .max(10, "El Folio Anterior excede los 10 caracteres"),
    [CAMPOS_ALTA_VEHICULO.SUSTITUYE_BV]: yup
      .string()
      .required("Se requiere el sustituye a BV"),
    [CAMPOS_ALTA_VEHICULO.UBICACION]: yup
      .object()
      .required("Se requiere la Ubicación"),
    [CAMPOS_ALTA_VEHICULO.MUNICIPIO]: yup
      .object()
      .required("Se requiere el Municipio"),
    [CAMPOS_ALTA_VEHICULO.PRECIO_UNITARIO]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("El Precio Unitario debe ser un número")
      .moreThan(0.0, "El Precio Unitario debe ser mayor a 0.0")
      .required("Se requiere el Precio Unitario"),
    [CAMPOS_ALTA_VEHICULO.VIDA_UTIL]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("Se requiere la Vida Útil")
      .positive("La Vida Útil debe ser mayor a 0")
      .required("Se requiere la Vida Útil"),
    [CAMPOS_ALTA_VEHICULO.FECHA_INICIO_USO]: yup
      .date()
      .required("Se requiere la Fecha de Inicio de Uso"),
    [CAMPOS_ALTA_VEHICULO.PRECIO_DESECHABLE]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("Se requiere el Precio Desechable"),
  }),
  yup.object().shape({
    [CAMPOS_ALTA_VEHICULO.ESTADO_FISICO]: yup
      .object()
      .required("Se requiere el Estado Físico"),
    [CAMPOS_ALTA_VEHICULO.NO_SERIES]: yup
      .string()
      .required("Se requiere el No Serie"),
    [CAMPOS_ALTA_VEHICULO.FECHA_FACTURA]: yup
      .date()
      .required("Se requiere la Fecha de la Factura/Compra"),
  }),
  yup.object().shape({}),
  yup.object().shape({}),
  yup.object().shape({
    [CAMPOS_ALTA_VEHICULO.RESPONSABLES]: yup
      .array()
      .min(1, "Se requiere al menos un Responsable")
      .required("Se requieren los Responsables"),
  }),
];

export const muebleModificacionValidacion = [
  yup.object().shape({
    [CAMPOS_MODIFICACION_MUEBLE.SOLICITUD]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("El Folio de la Solicitud debe ser un número")
      .positive("El Folio de la Solicitud debe ser un número positivo")
      .required("Se requiere el Folio de la Solicitud"),
    [CAMPOS_MODIFICACION_MUEBLE.DESCRIPCION]: yup
      .string()
      .trim()
      .required("Se requiere la Descripción"),
    [CAMPOS_MODIFICACION_MUEBLE.UNIDAD_ADMINISTRATIVA]: yup
      .object()
      .required("Se requiere la Unidad Administrativa"),
    [CAMPOS_MODIFICACION_MUEBLE.TIPO_ADQUISICION]: yup
      .object()
      .required("Se requiere el Tipo de Adquisición"),
    [CAMPOS_MODIFICACION_MUEBLE.FOLIO_ANTERIOR]: yup
      .string()
      .max(10, "El Folio Anterior excede los 10 caracteres"),
  }),
  yup.object().shape({
    [CAMPOS_MODIFICACION_MUEBLE.ESTADO_FISICO]: yup
      .object()
      .required("Se requiere el Estado Físico"),
    [CAMPOS_MODIFICACION_MUEBLE.FOLIO_FACTURA]: yup
      .string()
      .trim()
      .required("Se requiere el Folio de la Factura"),
    [CAMPOS_MODIFICACION_MUEBLE.FECHA_FACTURA]: yup
      .date()
      .required("Se requiere la Fecha de la Factura"),
    [CAMPOS_MODIFICACION_MUEBLE.PRECIO_UNITARIO]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("El Precio Unitario debe ser un número")
      .moreThan(0.0, "El Precio Unitario debe ser mayor a 0.0")
      .required("Se requiere el Precio Unitario"),
    [CAMPOS_MODIFICACION_MUEBLE.FECHA_COMPRA]: yup
      .date()
      .required("Se requiere la Fecha de la Compra"),
    [CAMPOS_MODIFICACION_MUEBLE.VIDA_UTIL]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("Se requiere la Vida Útil")
      .positive("La Vida Útil debe ser mayor a 0")
      .required("Se requiere la Vida Útil"),
    [CAMPOS_MODIFICACION_MUEBLE.FECHA_INICIO_USO]: yup
      .date()
      .required("Se requiere la Fecha de Inicio de Uso"),
    [CAMPOS_MODIFICACION_MUEBLE.PRECIO_DESECHABLE]: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("Se requiere el Precio Desechable")
      .moreThan(0.0, "El Precio Desechable debe ser mayor a 0.0")
      .required("Se requiere el Precio Desechable"),
    [CAMPOS_MODIFICACION_MUEBLE.OBSERVACION_BIEN]: yup
      .string()
      .trim()
      .required("Se requiere la Observación del Bien"),
    [CAMPOS_MODIFICACION_MUEBLE.UBICACION]: yup
      .object()
      .required("Se requiere la Ubicación"),
    [CAMPOS_MODIFICACION_MUEBLE.MUNICIPIO]: yup
      .object()
      .required("Se requiere el Municipio"),
  }),
  yup.object().shape({}),
  yup.object().shape({
    [CAMPOS_MODIFICACION_MUEBLE.RESPONSABLES]: yup
      .array()
      .min(1, "Se requiere al menos un Responsable")
      .required("Se requieren los Responsables"),
  }),
];

export const muebleBajaValidacion = [
  yup.object().shape({
    [CAMPOS_BAJA_MUEBLE.FOLIO_SOLICITUD]: yup
      .number()
      .min(0, "Se requiere el Id de la Solicitud")
      .required("Se requiere el Id de la Solicitud"),

    [CAMPOS_BAJA_MUEBLE.UNIDAD_ADMINISTRATIVA]: yup
      .object()
      .required("Se requiere la Unidad Administrativa."),

    [CAMPOS_BAJA_MUEBLE.TIPO_BIEN]: yup
      .string()
      .required("Se requiere el Tipo de Bien."),

    [CAMPOS_BAJA_MUEBLE.FOLIO_BIEN]: yup
      .array()
      .min(1, "Debe seleccionar al menos un Folio del Bien.")
      .required("Se requiere al menos un Folio del Bien."),

    [CAMPOS_BAJA_MUEBLE.OBSERVACIONES]: yup
      .string()
      .required("Se requiere la Información Complementaria."),

    [CAMPOS_BAJA_MUEBLE.FOLIO_DOCUMENTO]: yup
      .string()
      .required("Se requiere el Folio del Documento.")
      .max(255, "El Folio del Documento no debe exceder los 255 caracteres."),

    [CAMPOS_BAJA_MUEBLE.FECHA_DOCUMENTO]: yup
      .date()
      .required("Se requiere la Fecha del Documento."),

    [CAMPOS_BAJA_MUEBLE.NOMBRE_SOLICITANTE]: yup
      .string()
      .required("Se requiere el Nombre del Solicitante.")
      .max(
        255,
        "El Nombre del Solicitante no debe exceder los 255 caracteres."
      ),

    [CAMPOS_BAJA_MUEBLE.LUGAR_RESGUARDO]: yup
      .string()
      .required("Se requiere el Lugar del Resguardo.")
      .max(100, "El Lugar del Resguardo no debe exceder los 100 caracteres."),
  }),
  yup.object().shape({}),
];

export const vehiculoBajaValidacion = [
  yup.object().shape({
    [CAMPOS_BAJA_VEHICULO.FOLIO_SOLICITUD]: yup
      .number()
      .min(0, "Se requiere el Id de la Solicitud")
      .required("Se requiere el Id de la Solicitud"),
    [CAMPOS_BAJA_VEHICULO.EMPLEADO]: yup
      .object()
      .required("Se requiere el Id de la Solicitud"),
    [CAMPOS_BAJA_VEHICULO.UNIDAD_ADMINISTRATIVA]: yup
      .object()
      .required("Se requiere la Unidad Administrativa."),

    [CAMPOS_BAJA_VEHICULO.TIPO_BIEN]: yup
      .string()
      .required("Se requiere el Tipo de Bien."),

    [CAMPOS_BAJA_VEHICULO.FOLIO_BIEN]: yup
      .array()
      .min(1, "Debe seleccionar al menos un Folio del Bien.")
      .required("Se requiere al menos un Folio del Bien."),

    [CAMPOS_BAJA_VEHICULO.OBSERVACIONES]: yup
      .string()
      .required("Se requiere la Información Complementaria."),

    [CAMPOS_BAJA_VEHICULO.FOLIO_DOCUMENTO]: yup
      .string()
      .required("Se requiere el Folio del Documento.")
      .max(25, "El Folio del Dictamen no debe exceder los 25 caracteres."),

    [CAMPOS_BAJA_VEHICULO.FECHA_DOCUMENTO]: yup
      .date()
      .required("Se requiere la Fecha del Documento."),
  }),
  yup.object().shape({}),
];

export const mueveMovimientoValidacion = (idMotivoTramite) =>
  idMotivoTramite === 25
    ? [
        yup.object().shape({
          [CAMPOS_MOVIMIENTO_MUEBLE.FOLIO_SOLICITUD]: yup
            .number()
            .required("La solicitud es requerida")
            .positive("La solicitud debe ser un número positivo"),

          [CAMPOS_MOVIMIENTO_MUEBLE.MUNICIPIO]: yup
            .object()
            .required("El municipio es requerido"),

          [CAMPOS_MOVIMIENTO_MUEBLE.UBICACION]: yup
            .object()
            .required("La ubicación es requerida"),

          [CAMPOS_MOVIMIENTO_MUEBLE.FOLIO_BIEN]: yup
            .array()
            .min(1, "Debe seleccionar al menos un Folio del Bien.")
            .required("El folio del bien es requerido"),

          [CAMPOS_MOVIMIENTO_MUEBLE.UNIDAD_ADMINISTRATIVA]: yup
            .object()
            .required("Se requiere la unidad administrativa"),

          [CAMPOS_MOVIMIENTO_MUEBLE.NUEVO_RESGUARDANTE]: yup
            .array()
            .min(1, "Debe seleccionar al menos un resguardante.")
            .required("El resguardante del bien es requerido"),
        }),
      ]
    : [
        yup.object().shape({
          [CAMPOS_MOVIMIENTO_MUEBLE.FOLIO_SOLICITUD]: yup
            .number()
            .required("La solicitud es requerida")
            .positive("La solicitud debe ser un número positivo"),

          [CAMPOS_MOVIMIENTO_MUEBLE.MUNICIPIO]: yup
            .object()
            .required("El municipio es requerido"),

          [CAMPOS_MOVIMIENTO_MUEBLE.UBICACION]: yup
            .object()
            .required("La ubicación es requerida"),

          [CAMPOS_MOVIMIENTO_MUEBLE.FOLIO_BIEN]: yup
            .array()
            .min(1, "Debe seleccionar al menos un Folio del Bien.")
            .required("El folio del bien es requerido"),

          [CAMPOS_MOVIMIENTO_MUEBLE.UNIDAD_ADMINISTRATIVA]: yup
            .object()
            .required("Se requiere la unidad administrativa"),
          [CAMPOS_MOVIMIENTO_MUEBLE.NUEVO_CENTRO_COSTO]: yup
            .object()
            .required("Se requiere el nuevo centro de costo"),
        }),
      ];

export const vehiculoMovimientoValidacion = (idMotivoTramite) =>
  idMotivoTramite === 52
    ? [
        yup.object().shape({
          [CAMPOS_MOVIMIENTO_VEHICULO.FOLIO_SOLICITUD]: yup
            .number()
            .required("La solicitud es requerida")
            .positive("La solicitud debe ser un número positivo"),

          [CAMPOS_MOVIMIENTO_VEHICULO.MUNICIPIO]: yup
            .object()
            .required("El municipio es requerido"),

          [CAMPOS_MOVIMIENTO_VEHICULO.UBICACION]: yup
            .object()
            .required("La ubicación es requerida"),

          [CAMPOS_MOVIMIENTO_VEHICULO.FOLIO_BIEN]: yup
            .array()
            .min(1, "Debe seleccionar al menos un Folio del Bien.")
            .required("El folio del bien es requerido"),

          [CAMPOS_MOVIMIENTO_VEHICULO.UNIDAD_ADMINISTRATIVA]: yup
            .object()
            .required("Se requiere la unidad administrativa"),

          [CAMPOS_MOVIMIENTO_VEHICULO.NUEVO_RESGUARDANTE]: yup
            .array()
            .min(1, "Debe seleccionar al menos un resguardante.")
            .required("El resguardante del bien es requerido"),
        }),
      ]
    : [
        yup.object().shape({
          [CAMPOS_MOVIMIENTO_VEHICULO.FOLIO_SOLICITUD]: yup
            .number()
            .required("La solicitud es requerida")
            .positive("La solicitud debe ser un número positivo"),

          [CAMPOS_MOVIMIENTO_VEHICULO.MUNICIPIO]: yup
            .object()
            .required("El municipio es requerido"),

          [CAMPOS_MOVIMIENTO_VEHICULO.UBICACION]: yup
            .object()
            .required("La ubicación es requerida"),

          [CAMPOS_MOVIMIENTO_VEHICULO.FOLIO_BIEN]: yup
            .array()
            .min(1, "Debe seleccionar al menos un Folio del Bien.")
            .required("El folio del bien es requerido"),

          [CAMPOS_MOVIMIENTO_VEHICULO.UNIDAD_ADMINISTRATIVA]: yup
            .object()
            .required("Se requiere la unidad administrativa"),
          [CAMPOS_MOVIMIENTO_VEHICULO.NUEVO_CENTRO_COSTO]: yup
            .object()
            .required("Se requiere el nuevo centro de costo"),
        }),
      ];

export const muebleDesincorporacionValidaicion = [
  yup.object().shape({
    [CAMPOS_DESINCORPORACION_MUEBLE.FOLIO_SOLICITUD]: yup
      .number()
      .required("Se requiere la solicitud."),
    [CAMPOS_DESINCORPORACION_MUEBLE.UNIDAD_ADMINISTRATIVA]: yup
      .object()
      .required("Se requiere el nivel de unidad administrativa."),
    [CAMPOS_DESINCORPORACION_MUEBLE.FOLIO_BIEN]: yup
      .array()
      .min(1, "Debe seleccionar al menos un Folio del Bien.")
      .required("El folio del bien es requerido"),
    [CAMPOS_DESINCORPORACION_MUEBLE.OBSERVACIONES]: yup
      .string()
      .trim()
      .required("Se requieren las observaciones."),
    [CAMPOS_DESINCORPORACION_MUEBLE.FECHA_PUBLICACION]: yup
      .date()
      .required("Se requiere la fecha de publicación."),
    [CAMPOS_DESINCORPORACION_MUEBLE.NO_PUBLICACION]: yup
      .string()
      .trim()
      .required("Se requiere el número de publicación."),
    [CAMPOS_DESINCORPORACION_MUEBLE.DESCRIPCION_DESINCORPORACION]: yup
      .string()
      .trim()
      .required("Se requiere la descripción de la desincorporación."),
  }),
];

export const vehiculoDesincorporacionValidaicion = [
  yup.object().shape({
    [CAMPOS_DESINCORPORACION_VEHICULO.FOLIO_SOLICITUD]: yup
      .number()
      .required("Se requiere la solicitud."),
    [CAMPOS_DESINCORPORACION_VEHICULO.EMPLEADO]: yup
      .object()
      .required("Se requiere el solicitante."),
    [CAMPOS_DESINCORPORACION_VEHICULO.UNIDAD_ADMINISTRATIVA]: yup
      .object()
      .required("Se requiere el nivel de unidad administrativa."),
    [CAMPOS_DESINCORPORACION_VEHICULO.FOLIO_BIEN]: yup
      .array()
      .min(1, "Debe seleccionar al menos un Folio del Bien.")
      .required("El folio del bien es requerido"),
    [CAMPOS_DESINCORPORACION_VEHICULO.OBSERVACIONES]: yup
      .string()
      .trim()
      .required("Se requieren las observaciones."),
    [CAMPOS_DESINCORPORACION_VEHICULO.FECHA_PUBLICACION]: yup
      .date()
      .required("Se requiere la fecha de publicación."),
    [CAMPOS_DESINCORPORACION_VEHICULO.NO_PUBLICACION]: yup
      .string()
      .trim()
      .required("Se requiere el número de publicación."),
    [CAMPOS_DESINCORPORACION_VEHICULO.DESCRIPCION_DESINCORPORACION]: yup
      .string()
      .trim()
      .required("Se requiere la descripción de la desincorporación."),
  }),
];

export const muebleDestinoFinalValidacion = (idMotivoTramite) =>
  idMotivoTramite === 29
    ? [
        yup.object().shape({
          // Validaciones para Enajenación
          [CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_BIEN]: yup
            .array()
            .min(1, "Debe seleccionar al menos un Folio del Bien.")
            .required("El folio del bien es requerido"),
          [CAMPOS_DESTINO_FINAL_MUEBLE.UNIDAD_ADMINISTRATIVA]: yup
            .object()
            .required("La unidad administrativa es requerido."),
          [CAMPOS_DESTINO_FINAL_MUEBLE.AVALUO_ENAJENACION]: yup
            .string()
            .required("El avaluo de enajenación es requerido."),
          [CAMPOS_DESTINO_FINAL_MUEBLE.DESCRIPCION_ENAJENACION]: yup
            .string()
            .required("La descripción de enajenación es requerida."),
          [CAMPOS_DESTINO_FINAL_MUEBLE.FECHA_ENAJENACION]: yup
            .date()
            .required("La fecha de enajenación es requerida."),
          [CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_ENAJENACION]: yup
            .string()
            .required("El folio de enajenación es requerido."),
          [CAMPOS_DESTINO_FINAL_MUEBLE.IMPORTE_ENAJENACION]: yup
            .number()
            .required("El importe del avalúo de enajenación es requerido.")
            .moreThan(0, "El importe del avalúo debe ser mayor a 0."),
        }),
      ]
    : [
        yup.object().shape({
          [CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_BIEN]: yup
            .array()
            .min(1, "Debe seleccionar al menos un Folio del Bien.")
            .required("El folio del bien es requerido"),
          [CAMPOS_DESTINO_FINAL_MUEBLE.UNIDAD_ADMINISTRATIVA]: yup
            .object()
            .required("La unidad administrativa es requerido."),
          [CAMPOS_DESTINO_FINAL_MUEBLE.DESCRIPCION_DESTRUCCION]: yup
            .string()
            .required("La descripción de destrucción es requerida."),
          [CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_DESTRUCCION]: yup
            .string()
            .required("El folio de destrucción es requerido."),
          [CAMPOS_DESTINO_FINAL_MUEBLE.FECHA_DESTRUCCION]: yup
            .date()
            .required("La fecha de destrucción es requerida."),
        }),
      ];

export const vehiculoDestinoFinalValidacion = (idMotivoTramite) =>
  idMotivoTramite === MOTIVO_TRAMITE.ENAJENACION_VEHICULOS
    ? [
        yup.object().shape({
          // Validaciones para Enajenación
          [CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_BIEN]: yup
            .array()
            .min(1, "Debe seleccionar al menos un Folio del Bien.")
            .required("El folio del bien es requerido"),
          [CAMPOS_DESTINO_FINAL_VEHICULO.EMPLEADO]: yup
            .object()
            .required("El solicitante es requerido"),
          [CAMPOS_DESTINO_FINAL_VEHICULO.UNIDAD_ADMINISTRATIVA]: yup
            .object()
            .required("La unidad administrativa es requerido."),
          [CAMPOS_DESTINO_FINAL_VEHICULO.AVALUO_ENAJENACION]: yup
            .string()
            .required("El avaluo de enajenación es requerido."),
          [CAMPOS_DESTINO_FINAL_VEHICULO.DESCRIPCION_ENAJENACION]: yup
            .string()
            .required("La descripción de enajenación es requerida."),
          [CAMPOS_DESTINO_FINAL_VEHICULO.FECHA_ENAJENACION]: yup
            .date()
            .required("La fecha de enajenación es requerida."),
          [CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_ENAJENACION]: yup
            .string()
            .required("El folio de enajenación es requerido."),
          [CAMPOS_DESTINO_FINAL_VEHICULO.IMPORTE_ENAJENACION]: yup
            .number()
            .required("El importe del avalúo de enajenación es requerido.")
            .moreThan(0, "El importe del avalúo debe ser mayor a 0."),
        }),
      ]
    : [
        yup.object().shape({
          [CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_BIEN]: yup
            .array()
            .min(1, "Debe seleccionar al menos un Folio del Bien.")
            .required("El folio del bien es requerido"),
          [CAMPOS_DESTINO_FINAL_VEHICULO.EMPLEADO]: yup
            .object()
            .required("El solicitante es requerido"),
          [CAMPOS_DESTINO_FINAL_VEHICULO.UNIDAD_ADMINISTRATIVA]: yup
            .object()
            .required("La unidad administrativa es requerido."),
          [CAMPOS_DESTINO_FINAL_VEHICULO.DESCRIPCION_DESTRUCCION]: yup
            .string()
            .required("La descripción de destrucción es requerida."),
          [CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_DESTRUCCION]: yup
            .string()
            .required("El folio de destrucción es requerido."),
          [CAMPOS_DESTINO_FINAL_VEHICULO.FECHA_DESTRUCCION]: yup
            .date()
            .required("La fecha de destrucción es requerida."),
        }),
      ];

export const altaInmuebleValidacion = (idMotivoTramite) => [
  idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_DONACION
    ? yup.object().shape({
        [CAMPOS_ALTA_INMUEBLE.ID_SOLICITUD]: yup
          .string()
          .required("ID de solicitud es obligatorio"),
        [CAMPOS_ALTA_INMUEBLE.REFERENCIA_CONAC]: yup
          .object()
          .required("Referencia CONAC es obligatoria"),
        [CAMPOS_ALTA_INMUEBLE.ID_FAMILIA]: yup
          .object()
          .required("ID de familia es obligatorio"),
        [CAMPOS_ALTA_INMUEBLE.ID_SUBFAMILIA]: yup
          .object()
          .required("ID de subfamilia es obligatorio"),

        [CAMPOS_ALTA_INMUEBLE.DESCRIPCION]: yup
          .string()
          .required("Descripción es obligatoria"),
        [CAMPOS_ALTA_INMUEBLE.ID_TIPO_INMUEBLE]: yup
          .object()
          .required("ID de tipo de inmueble es obligatorio"),
        [CAMPOS_ALTA_INMUEBLE.ID_USO_INMUEBLE]: yup
          .object()
          .required("ID de uso de inmueble es obligatorio"),
        [CAMPOS_ALTA_INMUEBLE.ID_TIPO_DOMINIO]: yup
          .object()
          .required("ID de tipo de dominio es obligatorio"),
        [CAMPOS_ALTA_INMUEBLE.ID_ESTADO_FISICO]: yup
          .object()
          .required("ID de estado físico es obligatorio"),
        [CAMPOS_ALTA_INMUEBLE.ID_TIPO_AFECTACION]: yup
          .object()
          .required("ID de tipo de afectación es obligatorio"),
        [CAMPOS_ALTA_INMUEBLE.AFECTANTE]: yup
          .string()
          .required("Afectante es obligatorio"),
        [CAMPOS_ALTA_INMUEBLE.ID_TIPO_ADQUISICION]: yup
          .object()
          .required("ID de tipo de adquisición es obligatorio"),
        [CAMPOS_ALTA_INMUEBLE.DECRETO_PUBLICACION]: yup
          .string()
          .required("Decreto de publicación es obligatorio"),
        [CAMPOS_ALTA_INMUEBLE.FECHA_ADQUISICION]: yup
          .date()
          .required("Fecha de adquisición es obligatoria"),
        [CAMPOS_ALTA_INMUEBLE.FECHA_ALTA_SISTEMA]: yup
          .date()
          .required("Fecha de alta en el sistema es obligatoria"),
        [CAMPOS_ALTA_INMUEBLE.VALOR_HISTORICO]: yup
          .number()
          .required("Valor histórico es obligatorio")
          .positive("El valor histórico debe ser mayores a 0"),
        [CAMPOS_ALTA_INMUEBLE.DEPRECIACION]: yup
          .number()
          .required("Depreciación es obligatoria")
          .positive("La depreciación debe ser mayores a 0"),
        [CAMPOS_ALTA_INMUEBLE.ANIOS_VIDA_UTIL]: yup
          .number()
          .required("Años de vida útil es obligatorio")
          .positive("Los años de vida útil deben ser mayores a 0"),
        [CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS]: yup
          .number()
          .required("Valor libros es obligatorio")
          .positive("El valor inicial debe ser mayor a 0"),
      })
    : idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_COMPRAVENTA ||
        idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_INSCRIPCION_PRIMITIVA ||
        idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_COMPRAVENTA_JUDICIAL
      ? yup.object().shape({
          [CAMPOS_ALTA_INMUEBLE.ID_SOLICITUD]: yup
            .string()
            .required("ID de solicitud es obligatorio"),
          [CAMPOS_ALTA_INMUEBLE.REFERENCIA_CONAC]: yup
            .object()
            .required("Referencia CONAC es obligatoria"),
          [CAMPOS_ALTA_INMUEBLE.ID_FAMILIA]: yup
            .object()
            .required("ID de familia es obligatorio"),
          [CAMPOS_ALTA_INMUEBLE.ID_SUBFAMILIA]: yup
            .object()
            .required("ID de subfamilia es obligatorio"),

          [CAMPOS_ALTA_INMUEBLE.DESCRIPCION]: yup
            .string()
            .required("Descripción es obligatoria"),
          [CAMPOS_ALTA_INMUEBLE.ID_TIPO_INMUEBLE]: yup
            .object()
            .required("ID de tipo de inmueble es obligatorio"),
          [CAMPOS_ALTA_INMUEBLE.ID_USO_INMUEBLE]: yup
            .object()
            .required("ID de uso de inmueble es obligatorio"),
          [CAMPOS_ALTA_INMUEBLE.ID_TIPO_DOMINIO]: yup
            .object()
            .required("ID de tipo de dominio es obligatorio"),
          [CAMPOS_ALTA_INMUEBLE.ID_ESTADO_FISICO]: yup
            .object()
            .required("ID de estado físico es obligatorio"),
          [CAMPOS_ALTA_INMUEBLE.ID_TIPO_AFECTACION]: yup
            .object()
            .required("ID de tipo de afectación es obligatorio"),
          [CAMPOS_ALTA_INMUEBLE.AFECTANTE]: yup
            .string()
            .required("Afectante es obligatorio"),
          [CAMPOS_ALTA_INMUEBLE.ID_TIPO_ADQUISICION]: yup
            .object()
            .required("ID de tipo de adquisición es obligatorio"),
          [CAMPOS_ALTA_INMUEBLE.ESCRITURA_TITULO]: yup
            .string()
            .required("La escritura o publicación es obligatorio"),
          [CAMPOS_ALTA_INMUEBLE.FECHA_ADQUISICION]: yup
            .date()
            .required("Fecha de adquisición es obligatoria"),
          [CAMPOS_ALTA_INMUEBLE.FECHA_ALTA_SISTEMA]: yup
            .date()
            .required("Fecha de alta en el sistema es obligatoria"),
          [CAMPOS_ALTA_INMUEBLE.VALOR_HISTORICO]: yup
            .number()
            .required("Valor histórico es obligatorio")
            .positive("El valor histórico debe ser mayores a 0"),
          [CAMPOS_ALTA_INMUEBLE.DEPRECIACION]: yup
            .number()
            .required("Depreciación es obligatoria")
            .positive("La depreciación debe ser mayores a 0"),
          [CAMPOS_ALTA_INMUEBLE.ANIOS_VIDA_UTIL]: yup
            .number()
            .required("Años de vida útil es obligatorio")
            .positive("Los años de vida útil deben ser mayores a 0"),
          [CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS]: yup
            .number()
            .required("Valor libros es obligatorio")
            .positive("El valor inicial debe ser mayor a 0"),
        })
      : idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_DIVISION
        ? yup.object().shape({
            [CAMPOS_ALTA_INMUEBLE.ID_SOLICITUD]: yup
              .string()
              .required("ID de solicitud es obligatorio"),
            [CAMPOS_ALTA_INMUEBLE.REFERENCIA_CONAC]: yup
              .object()
              .required("Referencia CONAC es obligatoria"),
            [CAMPOS_ALTA_INMUEBLE.ID_FAMILIA]: yup
              .object()
              .required("ID de familia es obligatorio"),
            [CAMPOS_ALTA_INMUEBLE.ID_SUBFAMILIA]: yup
              .object()
              .required("ID de subfamilia es obligatorio"),

            [CAMPOS_ALTA_INMUEBLE.DESCRIPCION]: yup
              .string()
              .required("Descripción es obligatoria"),
            [CAMPOS_ALTA_INMUEBLE.ID_TIPO_INMUEBLE]: yup
              .object()
              .required("ID de tipo de inmueble es obligatorio"),
            [CAMPOS_ALTA_INMUEBLE.ID_USO_INMUEBLE]: yup
              .object()
              .required("ID de uso de inmueble es obligatorio"),
            [CAMPOS_ALTA_INMUEBLE.ID_TIPO_DOMINIO]: yup
              .object()
              .required("ID de tipo de dominio es obligatorio"),
            [CAMPOS_ALTA_INMUEBLE.ID_ESTADO_FISICO]: yup
              .object()
              .required("ID de estado físico es obligatorio"),
            [CAMPOS_ALTA_INMUEBLE.ID_TIPO_AFECTACION]: yup
              .object()
              .required("ID de tipo de afectación es obligatorio"),
            [CAMPOS_ALTA_INMUEBLE.AFECTANTE]: yup
              .string()
              .required("Afectante es obligatorio"),
            [CAMPOS_ALTA_INMUEBLE.ID_TIPO_ADQUISICION]: yup
              .object()
              .required("ID de tipo de adquisición es obligatorio"),
            [CAMPOS_ALTA_INMUEBLE.ESCRITURA_TITULO]: yup
              .string()
              .required("La escritura o publicación es obligatorio"),
            [CAMPOS_ALTA_INMUEBLE.FECHA_ADQUISICION]: yup
              .date()
              .required("Fecha de divicion es obligatoria"),
            [CAMPOS_ALTA_INMUEBLE.EXPEDIENTE]: yup
              .date()
              .required("El expediente de origen es obligatoria"),
            [CAMPOS_ALTA_INMUEBLE.VALOR_HISTORICO]: yup
              .number()
              .required("Valor histórico es obligatorio")
              .positive("El valor histórico debe ser mayores a 0"),
            [CAMPOS_ALTA_INMUEBLE.DEPRECIACION]: yup
              .number()
              .required("Depreciación es obligatoria")
              .positive("La depreciación debe ser mayores a 0"),
            [CAMPOS_ALTA_INMUEBLE.ANIOS_VIDA_UTIL]: yup
              .number()
              .required("Años de vida útil es obligatorio")
              .positive("Los años de vida útil deben ser mayores a 0"),
            [CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS]: yup
              .number()
              .required("Valor libros es obligatorio")
              .positive("El valor inicial debe ser mayor a 0"),
          })
        : idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_PERMUTA
          ? yup.object().shape({
              [CAMPOS_ALTA_INMUEBLE.ID_SOLICITUD]: yup
                .string()
                .required("ID de solicitud es obligatorio"),
              [CAMPOS_ALTA_INMUEBLE.REFERENCIA_CONAC]: yup
                .object()
                .required("Referencia CONAC es obligatoria"),
              [CAMPOS_ALTA_INMUEBLE.ID_FAMILIA]: yup
                .object()
                .required("ID de familia es obligatorio"),
              [CAMPOS_ALTA_INMUEBLE.ID_SUBFAMILIA]: yup
                .object()
                .required("ID de subfamilia es obligatorio"),

              [CAMPOS_ALTA_INMUEBLE.DESCRIPCION]: yup
                .string()
                .required("Descripción es obligatoria"),
              [CAMPOS_ALTA_INMUEBLE.ID_TIPO_INMUEBLE]: yup
                .object()
                .required("ID de tipo de inmueble es obligatorio"),
              [CAMPOS_ALTA_INMUEBLE.ID_USO_INMUEBLE]: yup
                .object()
                .required("ID de uso de inmueble es obligatorio"),
              [CAMPOS_ALTA_INMUEBLE.ID_TIPO_DOMINIO]: yup
                .object()
                .required("ID de tipo de dominio es obligatorio"),
              [CAMPOS_ALTA_INMUEBLE.ID_ESTADO_FISICO]: yup
                .object()
                .required("ID de estado físico es obligatorio"),
              [CAMPOS_ALTA_INMUEBLE.ID_TIPO_AFECTACION]: yup
                .object()
                .required("ID de tipo de afectación es obligatorio"),
              [CAMPOS_ALTA_INMUEBLE.AFECTANTE]: yup
                .string()
                .required("Afectante es obligatorio"),
              [CAMPOS_ALTA_INMUEBLE.ID_TIPO_ADQUISICION]: yup
                .object()
                .required("ID de tipo de adquisición es obligatorio"),
              [CAMPOS_ALTA_INMUEBLE.ESCRITURA_TITULO]: yup
                .string()
                .required("La escritura o publicación es obligatorio"),
              [CAMPOS_ALTA_INMUEBLE.FECHA_ADQUISICION]: yup
                .date()
                .required("Fecha de permuta es obligatoria"),
              [CAMPOS_ALTA_INMUEBLE.EXPEDIENTE]: yup
                .date()
                .required("El expediente permutado es obligatoria"),
              [CAMPOS_ALTA_INMUEBLE.VALOR_HISTORICO]: yup
                .number()
                .required("Valor histórico es obligatorio")
                .positive("El valor histórico debe ser mayores a 0"),
              [CAMPOS_ALTA_INMUEBLE.DEPRECIACION]: yup
                .number()
                .required("Depreciación es obligatoria")
                .positive("La depreciación debe ser mayores a 0"),
              [CAMPOS_ALTA_INMUEBLE.ANIOS_VIDA_UTIL]: yup
                .number()
                .required("Años de vida útil es obligatorio")
                .positive("Los años de vida útil deben ser mayores a 0"),
              [CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS]: yup
                .number()
                .required("Valor libros es obligatorio")
                .positive("El valor inicial debe ser mayor a 0"),
            })
          : idMotivoTramite ===
                MOTIVO_TRAMITE.ALTA_POR_ADJUDICACION_A_TITULO_GRATUITO ||
              idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_EXPROPIACION
            ? yup.object().shape({
                [CAMPOS_ALTA_INMUEBLE.ID_SOLICITUD]: yup
                  .string()
                  .required("ID de solicitud es obligatorio"),
                [CAMPOS_ALTA_INMUEBLE.REFERENCIA_CONAC]: yup
                  .object()
                  .required("Referencia CONAC es obligatoria"),
                [CAMPOS_ALTA_INMUEBLE.ID_FAMILIA]: yup
                  .object()
                  .required("ID de familia es obligatorio"),
                [CAMPOS_ALTA_INMUEBLE.ID_SUBFAMILIA]: yup
                  .object()
                  .required("ID de subfamilia es obligatorio"),

                [CAMPOS_ALTA_INMUEBLE.DESCRIPCION]: yup
                  .string()
                  .required("Descripción es obligatoria"),
                [CAMPOS_ALTA_INMUEBLE.ID_TIPO_INMUEBLE]: yup
                  .object()
                  .required("ID de tipo de inmueble es obligatorio"),
                [CAMPOS_ALTA_INMUEBLE.ID_USO_INMUEBLE]: yup
                  .object()
                  .required("ID de uso de inmueble es obligatorio"),
                [CAMPOS_ALTA_INMUEBLE.ID_TIPO_DOMINIO]: yup
                  .object()
                  .required("ID de tipo de dominio es obligatorio"),
                [CAMPOS_ALTA_INMUEBLE.ID_ESTADO_FISICO]: yup
                  .object()
                  .required("ID de estado físico es obligatorio"),
                [CAMPOS_ALTA_INMUEBLE.ID_TIPO_AFECTACION]: yup
                  .object()
                  .required("ID de tipo de afectación es obligatorio"),
                [CAMPOS_ALTA_INMUEBLE.AFECTANTE]: yup
                  .string()
                  .required("Afectante es obligatorio"),
                [CAMPOS_ALTA_INMUEBLE.ID_TIPO_ADQUISICION]: yup
                  .object()
                  .required("ID de tipo de adquisición es obligatorio"),
                [CAMPOS_ALTA_INMUEBLE.DECRETO_PUBLICACION]: yup
                  .string()
                  .required("El decreto o publicacion es obligatorio"),
                [CAMPOS_ALTA_INMUEBLE.FECHA_ADQUISICION]: yup
                  .date()
                  .required("Fecha de adquisición es obligatoria"),
                [CAMPOS_ALTA_INMUEBLE.FECHA_ALTA_SISTEMA]: yup
                  .date()
                  .required("La fecha de alta en el sistema es obligatoria"),
                [CAMPOS_ALTA_INMUEBLE.VALOR_HISTORICO]: yup
                  .number()
                  .required("Valor histórico es obligatorio")
                  .positive("El valor histórico debe ser mayores a 0"),
                [CAMPOS_ALTA_INMUEBLE.DEPRECIACION]: yup
                  .number()
                  .required("Depreciación es obligatoria")
                  .positive("La depreciación debe ser mayores a 0"),
                [CAMPOS_ALTA_INMUEBLE.ANIOS_VIDA_UTIL]: yup
                  .number()
                  .required("Años de vida útil es obligatorio")
                  .positive("Los años de vida útil deben ser mayores a 0"),
                [CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS]: yup
                  .number()
                  .required("Valor libros es obligatorio")
                  .positive("El valor inicial debe ser mayor a 0"),
              })
            : yup.object().shape({}),
  yup.object().shape({
    [CAMPOS_ALTA_INMUEBLE.SUPERFICIE]: yup
      .number()
      .required("Superficie es obligatoria")
      .positive("La superficie debe ser positiva"),
    [CAMPOS_ALTA_INMUEBLE.VALOR_TERRENO]: yup
      .number()
      .required("Valor del terreno es obligatorio")
      .positive("El valor del terreno debe ser positivo"),

    [CAMPOS_ALTA_INMUEBLE.SUPERFICIE_CONSTRUCCION]: yup
      .number()
      .required("Superficie de construcción es obligatoria")
      .positive("La superficie de construcción debe ser positiva"),

    [CAMPOS_ALTA_INMUEBLE.VALOR_CONSTRUCCION]: yup
      .number()
      .required("Valor de construcción es obligatorio")
      .positive("El valor de construcción debe ser positivo"),
    [CAMPOS_ALTA_INMUEBLE.VALOR_INICIAL]: yup
      .number()
      .required("Valor inicial es obligatorio")
      .positive("El valor inicial debe ser positivo"),

    [CAMPOS_ALTA_INMUEBLE.ID_ORIGEN_VALOR]: yup
      .object()
      .required("El origen de valor es obligatorio"),
    [CAMPOS_ALTA_INMUEBLE.MUNICIPIO]: yup
      .object()
      .required("Municipio es obligatorio"),
    [CAMPOS_ALTA_INMUEBLE.SECRETARIA]: yup
      .string()
      .required("Secretaría es obligatoria"),
    [CAMPOS_ALTA_INMUEBLE.DIRECCION]: yup
      .string()
      .required("Dirección es obligatoria"),
    [CAMPOS_ALTA_INMUEBLE.DEPARTAMENTO]: yup.string(),
  }),
  yup.object().shape({
    [CAMPOS_ALTA_INMUEBLE.OBSERVACION_INMUEBLE]: yup
      .string()
      .required("Observación de inmueble es obligatoria"),
    [CAMPOS_ALTA_INMUEBLE.OBSERVACION_SUPERVISION]: yup
      .string()
      .required("Observación de supervisión es obligatoria"),
  }),
];

export const modificacionInmuebleValidacion = (idMotivoTramite) => [
  idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_DONACION
    ? yup.object().shape({
        [CAMPOS_MODIFICACION_INMUEBLE.ID_SOLICITUD]: yup
          .string()
          .required("ID de solicitud es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.BIEN]: yup
          .object()
          .required("El bien es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.REFERENCIA_CONAC]: yup
          .object()
          .required("Referencia CONAC es obligatoria"),
        [CAMPOS_MODIFICACION_INMUEBLE.ID_FAMILIA]: yup
          .object()
          .required("ID de familia es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.ID_SUBFAMILIA]: yup
          .object()
          .required("ID de subfamilia es obligatorio"),

        [CAMPOS_MODIFICACION_INMUEBLE.DESCRIPCION]: yup
          .string()
          .required("Descripción es obligatoria"),
        [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_INMUEBLE]: yup
          .object()
          .required("ID de tipo de inmueble es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.ID_USO_INMUEBLE]: yup
          .object()
          .required("ID de uso de inmueble es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_DOMINIO]: yup
          .object()
          .required("ID de tipo de dominio es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.ID_ESTADO_FISICO]: yup
          .object()
          .required("ID de estado físico es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_AFECTACION]: yup
          .object()
          .required("ID de tipo de afectación es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.AFECTANTE]: yup
          .string()
          .required("Afectante es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_ADQUISICION]: yup
          .object()
          .required("ID de tipo de adquisición es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.DECRETO_PUBLICACION]: yup
          .string()
          .required("Decreto de publicación es obligatorio"),
        [CAMPOS_MODIFICACION_INMUEBLE.FECHA_ADQUISICION]: yup
          .date()
          .required("Fecha de adquisición es obligatoria"),
        [CAMPOS_MODIFICACION_INMUEBLE.FECHA_ALTA_SISTEMA]: yup
          .date()
          .required("Fecha de alta en el sistema es obligatoria"),
        [CAMPOS_MODIFICACION_INMUEBLE.VALOR_HISTORICO]: yup
          .number()
          .required("Valor histórico es obligatorio")
          .positive("El valor histórico debe ser mayores a 0"),
        [CAMPOS_MODIFICACION_INMUEBLE.DEPRECIACION]: yup
          .number()
          .required("Depreciación es obligatoria")
          .positive("La depreciación debe ser mayores a 0"),
        [CAMPOS_MODIFICACION_INMUEBLE.ANIOS_VIDA_UTIL]: yup
          .number()
          .required("Años de vida útil es obligatorio")
          .positive("Los años de vida útil deben ser mayores a 0"),
        [CAMPOS_MODIFICACION_INMUEBLE.VALOR_LIBROS]: yup
          .number()
          .required("Valor libros es obligatorio")
          .positive("El valor inicial debe ser mayor a 0"),
      })
    : idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_COMPRAVENTA ||
        idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_INSCRIPCION_PRIMITIVA ||
        idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_COMPRAVENTA_JUDICIAL
      ? yup.object().shape({
          [CAMPOS_MODIFICACION_INMUEBLE.ID_SOLICITUD]: yup
            .string()
            .required("ID de solicitud es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.BIEN]: yup
            .object()
            .required("El bien es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.REFERENCIA_CONAC]: yup
            .object()
            .required("Referencia CONAC es obligatoria"),
          [CAMPOS_MODIFICACION_INMUEBLE.ID_FAMILIA]: yup
            .object()
            .required("ID de familia es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.ID_SUBFAMILIA]: yup
            .object()
            .required("ID de subfamilia es obligatorio"),

          [CAMPOS_MODIFICACION_INMUEBLE.DESCRIPCION]: yup
            .string()
            .required("Descripción es obligatoria"),
          [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_INMUEBLE]: yup
            .object()
            .required("ID de tipo de inmueble es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.ID_USO_INMUEBLE]: yup
            .object()
            .required("ID de uso de inmueble es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_DOMINIO]: yup
            .object()
            .required("ID de tipo de dominio es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.ID_ESTADO_FISICO]: yup
            .object()
            .required("ID de estado físico es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_AFECTACION]: yup
            .object()
            .required("ID de tipo de afectación es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.AFECTANTE]: yup
            .string()
            .required("Afectante es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_ADQUISICION]: yup
            .object()
            .required("ID de tipo de adquisición es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.ESCRITURA_TITULO]: yup
            .string()
            .required("La escritura o publicación es obligatorio"),
          [CAMPOS_MODIFICACION_INMUEBLE.FECHA_ADQUISICION]: yup
            .date()
            .required("Fecha de adquisición es obligatoria"),
          [CAMPOS_MODIFICACION_INMUEBLE.FECHA_ALTA_SISTEMA]: yup
            .date()
            .required("Fecha de alta en el sistema es obligatoria"),
          [CAMPOS_MODIFICACION_INMUEBLE.VALOR_HISTORICO]: yup
            .number()
            .required("Valor histórico es obligatorio")
            .positive("El valor histórico debe ser mayores a 0"),
          [CAMPOS_MODIFICACION_INMUEBLE.DEPRECIACION]: yup
            .number()
            .required("Depreciación es obligatoria")
            .positive("La depreciación debe ser mayores a 0"),
          [CAMPOS_MODIFICACION_INMUEBLE.ANIOS_VIDA_UTIL]: yup
            .number()
            .required("Años de vida útil es obligatorio")
            .positive("Los años de vida útil deben ser mayores a 0"),
          [CAMPOS_MODIFICACION_INMUEBLE.VALOR_LIBROS]: yup
            .number()
            .required("Valor libros es obligatorio")
            .positive("El valor inicial debe ser mayor a 0"),
        })
      : idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_DIVISION
        ? yup.object().shape({
            [CAMPOS_MODIFICACION_INMUEBLE.ID_SOLICITUD]: yup
              .string()
              .required("ID de solicitud es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.BIEN]: yup
              .object()
              .required("El bien es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.REFERENCIA_CONAC]: yup
              .object()
              .required("Referencia CONAC es obligatoria"),
            [CAMPOS_MODIFICACION_INMUEBLE.ID_FAMILIA]: yup
              .object()
              .required("ID de familia es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.ID_SUBFAMILIA]: yup
              .object()
              .required("ID de subfamilia es obligatorio"),

            [CAMPOS_MODIFICACION_INMUEBLE.DESCRIPCION]: yup
              .string()
              .required("Descripción es obligatoria"),
            [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_INMUEBLE]: yup
              .object()
              .required("ID de tipo de inmueble es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.ID_USO_INMUEBLE]: yup
              .object()
              .required("ID de uso de inmueble es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_DOMINIO]: yup
              .object()
              .required("ID de tipo de dominio es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.ID_ESTADO_FISICO]: yup
              .object()
              .required("ID de estado físico es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_AFECTACION]: yup
              .object()
              .required("ID de tipo de afectación es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.AFECTANTE]: yup
              .string()
              .required("Afectante es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_ADQUISICION]: yup
              .object()
              .required("ID de tipo de adquisición es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.ESCRITURA_TITULO]: yup
              .string()
              .required("La escritura o publicación es obligatorio"),
            [CAMPOS_MODIFICACION_INMUEBLE.FECHA_ADQUISICION]: yup
              .date()
              .required("Fecha de divicion es obligatoria"),
            [CAMPOS_MODIFICACION_INMUEBLE.EXPEDIENTE]: yup
              .date()
              .required("El expediente de origen es obligatoria"),
            [CAMPOS_MODIFICACION_INMUEBLE.VALOR_HISTORICO]: yup
              .number()
              .required("Valor histórico es obligatorio")
              .positive("El valor histórico debe ser mayores a 0"),
            [CAMPOS_MODIFICACION_INMUEBLE.DEPRECIACION]: yup
              .number()
              .required("Depreciación es obligatoria")
              .positive("La depreciación debe ser mayores a 0"),
            [CAMPOS_MODIFICACION_INMUEBLE.ANIOS_VIDA_UTIL]: yup
              .number()
              .required("Años de vida útil es obligatorio")
              .positive("Los años de vida útil deben ser mayores a 0"),
            [CAMPOS_MODIFICACION_INMUEBLE.VALOR_LIBROS]: yup
              .number()
              .required("Valor libros es obligatorio")
              .positive("El valor inicial debe ser mayor a 0"),
          })
        : idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_PERMUTA
          ? yup.object().shape({
              [CAMPOS_MODIFICACION_INMUEBLE.ID_SOLICITUD]: yup
                .string()
                .required("ID de solicitud es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.BIEN]: yup
                .object()
                .required("El bien es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.REFERENCIA_CONAC]: yup
                .object()
                .required("Referencia CONAC es obligatoria"),
              [CAMPOS_MODIFICACION_INMUEBLE.ID_FAMILIA]: yup
                .object()
                .required("ID de familia es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.ID_SUBFAMILIA]: yup
                .object()
                .required("ID de subfamilia es obligatorio"),

              [CAMPOS_MODIFICACION_INMUEBLE.DESCRIPCION]: yup
                .string()
                .required("Descripción es obligatoria"),
              [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_INMUEBLE]: yup
                .object()
                .required("ID de tipo de inmueble es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.ID_USO_INMUEBLE]: yup
                .object()
                .required("ID de uso de inmueble es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_DOMINIO]: yup
                .object()
                .required("ID de tipo de dominio es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.ID_ESTADO_FISICO]: yup
                .object()
                .required("ID de estado físico es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_AFECTACION]: yup
                .object()
                .required("ID de tipo de afectación es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.AFECTANTE]: yup
                .string()
                .required("Afectante es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_ADQUISICION]: yup
                .object()
                .required("ID de tipo de adquisición es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.ESCRITURA_TITULO]: yup
                .string()
                .required("La escritura o publicación es obligatorio"),
              [CAMPOS_MODIFICACION_INMUEBLE.FECHA_ADQUISICION]: yup
                .date()
                .required("Fecha de permuta es obligatoria"),
              [CAMPOS_MODIFICACION_INMUEBLE.EXPEDIENTE]: yup
                .date()
                .required("El expediente permutado es obligatoria"),
              [CAMPOS_MODIFICACION_INMUEBLE.VALOR_HISTORICO]: yup
                .number()
                .required("Valor histórico es obligatorio")
                .positive("El valor histórico debe ser mayores a 0"),
              [CAMPOS_MODIFICACION_INMUEBLE.DEPRECIACION]: yup
                .number()
                .required("Depreciación es obligatoria")
                .positive("La depreciación debe ser mayores a 0"),
              [CAMPOS_MODIFICACION_INMUEBLE.ANIOS_VIDA_UTIL]: yup
                .number()
                .required("Años de vida útil es obligatorio")
                .positive("Los años de vida útil deben ser mayores a 0"),
              [CAMPOS_MODIFICACION_INMUEBLE.VALOR_LIBROS]: yup
                .number()
                .required("Valor libros es obligatorio")
                .positive("El valor inicial debe ser mayor a 0"),
            })
          : idMotivoTramite ===
                MOTIVO_TRAMITE.ALTA_POR_ADJUDICACION_A_TITULO_GRATUITO ||
              idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_EXPROPIACION
            ? yup.object().shape({
                [CAMPOS_MODIFICACION_INMUEBLE.ID_SOLICITUD]: yup
                  .string()
                  .required("ID de solicitud es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.BIEN]: yup
                  .object()
                  .required("El bien es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.REFERENCIA_CONAC]: yup
                  .object()
                  .required("Referencia CONAC es obligatoria"),
                [CAMPOS_MODIFICACION_INMUEBLE.ID_FAMILIA]: yup
                  .object()
                  .required("ID de familia es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.ID_SUBFAMILIA]: yup
                  .object()
                  .required("ID de subfamilia es obligatorio"),

                [CAMPOS_MODIFICACION_INMUEBLE.DESCRIPCION]: yup
                  .string()
                  .required("Descripción es obligatoria"),
                [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_INMUEBLE]: yup
                  .object()
                  .required("ID de tipo de inmueble es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.ID_USO_INMUEBLE]: yup
                  .object()
                  .required("ID de uso de inmueble es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_DOMINIO]: yup
                  .object()
                  .required("ID de tipo de dominio es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.ID_ESTADO_FISICO]: yup
                  .object()
                  .required("ID de estado físico es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_AFECTACION]: yup
                  .object()
                  .required("ID de tipo de afectación es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.AFECTANTE]: yup
                  .string()
                  .required("Afectante es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_ADQUISICION]: yup
                  .object()
                  .required("ID de tipo de adquisición es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.DECRETO_PUBLICACION]: yup
                  .string()
                  .required("El decreto o publicacion es obligatorio"),
                [CAMPOS_MODIFICACION_INMUEBLE.FECHA_ADQUISICION]: yup
                  .date()
                  .required("Fecha de adquisición es obligatoria"),
                [CAMPOS_MODIFICACION_INMUEBLE.FECHA_ALTA_SISTEMA]: yup
                  .date()
                  .required("La fecha de alta en el sistema es obligatoria"),
                [CAMPOS_MODIFICACION_INMUEBLE.VALOR_HISTORICO]: yup
                  .number()
                  .required("Valor histórico es obligatorio")
                  .positive("El valor histórico debe ser mayores a 0"),
                [CAMPOS_MODIFICACION_INMUEBLE.DEPRECIACION]: yup
                  .number()
                  .required("Depreciación es obligatoria")
                  .positive("La depreciación debe ser mayores a 0"),
                [CAMPOS_MODIFICACION_INMUEBLE.ANIOS_VIDA_UTIL]: yup
                  .number()
                  .required("Años de vida útil es obligatorio")
                  .positive("Los años de vida útil deben ser mayores a 0"),
                [CAMPOS_MODIFICACION_INMUEBLE.VALOR_LIBROS]: yup
                  .number()
                  .required("Valor libros es obligatorio")
                  .positive("El valor inicial debe ser mayor a 0"),
              })
            : yup.object().shape({}),
  yup.object().shape({
    [CAMPOS_MODIFICACION_INMUEBLE.SUPERFICIE]: yup
      .number()
      .required("Superficie es obligatoria")
      .positive("La superficie debe ser positiva"),
    [CAMPOS_MODIFICACION_INMUEBLE.VALOR_TERRENO]: yup
      .number()
      .required("Valor del terreno es obligatorio")
      .positive("El valor del terreno debe ser positivo"),

    [CAMPOS_MODIFICACION_INMUEBLE.SUPERFICIE_CONSTRUCCION]: yup
      .number()
      .required("Superficie de construcción es obligatoria")
      .positive("La superficie de construcción debe ser positiva"),

    [CAMPOS_MODIFICACION_INMUEBLE.VALOR_CONSTRUCCION]: yup
      .number()
      .required("Valor de construcción es obligatorio")
      .positive("El valor de construcción debe ser positivo"),
    [CAMPOS_MODIFICACION_INMUEBLE.VALOR_INICIAL]: yup
      .number()
      .required("Valor inicial es obligatorio")
      .positive("El valor inicial debe ser positivo"),

    [CAMPOS_MODIFICACION_INMUEBLE.ID_ORIGEN_VALOR]: yup
      .object()
      .required("El origen de valor es obligatorio"),
    [CAMPOS_MODIFICACION_INMUEBLE.MUNICIPIO]: yup
      .object()
      .required("Municipio es obligatorio"),
    [CAMPOS_MODIFICACION_INMUEBLE.SECRETARIA]: yup
      .string()
      .required("Secretaría es obligatoria"),
    [CAMPOS_MODIFICACION_INMUEBLE.DIRECCION]: yup
      .string()
      .required("Dirección es obligatoria"),
    [CAMPOS_MODIFICACION_INMUEBLE.DEPARTAMENTO]: yup.string(),
  }),
  yup.object().shape({
    [CAMPOS_MODIFICACION_INMUEBLE.OBSERVACION_INMUEBLE]: yup
      .string()
      .required("Observación de inmueble es obligatoria"),
    [CAMPOS_MODIFICACION_INMUEBLE.OBSERVACION_SUPERVISION]: yup
      .string()
      .required("Observación de supervisión es obligatoria"),
  }),
];

export const bajaInmuebleValidacion = [
  yup.object().shape({
    [CAMPOS_BAJA_INMUEBLE.ID_SOLICITUD]: yup
      .number()
      .required("El Id Solicitud es requerido"),
    [CAMPOS_BAJA_INMUEBLE.ID_BIEN_PATRIMONIO]: yup
      .object()
      .required("El Id del Bien es requerido"),
    [CAMPOS_BAJA_INMUEBLE.FECHA_DESINCORPORACION]: yup
      .date()
      .required("La Fecha de Desincorporación es requerida"),
    [CAMPOS_BAJA_INMUEBLE.FECHA_BAJA]: yup
      .date()
      .required("La Fecha de Baja es requerida"),
    [CAMPOS_BAJA_INMUEBLE.FECHA_BAJA_SISTEMA]: yup
      .date()
      .required("La Fecha de Baja del Sistema es requerida"),
    [CAMPOS_BAJA_INMUEBLE.VALOR_BAJA]: yup
      .number()
      .required("El Valor de la Baja es requerido"),
    [CAMPOS_BAJA_INMUEBLE.JUSTIFICACION_BAJA]: yup
      .string()
      .required("La Justificación de la Baja es requerida"),
  }),
];

export const inventarioValidacion = yup.object().shape({
  [CAMPOS_FILTRO_INVENTARIO.PERIODO]: yup
    .object()
    .required("Se requiere el Periodo"),
  [CAMPOS_FILTRO_INVENTARIO.BUSQUEDA_FECHA]: yup.boolean(),
  [CAMPOS_FILTRO_INVENTARIO.ESTADO_BIEN]: yup
    .object()
    .when([CAMPOS_FILTRO_INVENTARIO.BUSQUEDA_FECHA], {
      is: (value) => value,
      then: () => yup.object().required("Se requiere el Estado del Bien"),
      otherwise: () => yup.object().nullable(),
    }),
  [CAMPOS_FILTRO_INVENTARIO.FECHA_INICIO]: yup
    .date()
    .when([CAMPOS_FILTRO_INVENTARIO.BUSQUEDA_FECHA], {
      is: (value) => value,
      then: () =>
        yup
          .date()
          .required("Se requiere la Fecha de Inicio")
          .max(
            yup.ref(CAMPOS_FILTRO_INVENTARIO.FECHA_FIN),
            "La Fecha de Inicio no puede ser posterior a la Fecha de Fin"
          ),
      otherwise: () => yup.date().nullable(),
    }),

  [CAMPOS_FILTRO_INVENTARIO.FECHA_FIN]: yup
    .date()
    .when(
      [
        CAMPOS_FILTRO_INVENTARIO.BUSQUEDA_FECHA,
        CAMPOS_FILTRO_INVENTARIO.FECHA_INICIO,
      ],
      {
        is: (value, inicio) => value && inicio != null,
        then: () =>
          yup
            .date()
            .required("Se requiere la Fecha de Fin")
            .min(
              yup.ref(CAMPOS_FILTRO_INVENTARIO.FECHA_INICIO),
              "La Fecha de Fin no puede ser anterior a la Fecha de Inicio"
            ),
        otherwise: () => yup.date().nullable(),
      }
    ),
});

export const depreciacionValidacion = yup.object().shape({
  [CAMPOS_DEPRECIACION.PERIODO]: yup
    .object()
    .required("Se requiere el Periodo"),
  [CAMPOS_DEPRECIACION.MES]: yup
    .object()
    .required("Se requiere el mes a depreciar"),
  [CAMPOS_DEPRECIACION.TIPO_BIEN]: yup
    .object()
    .required("Se requiere el tipo de bien a depreciar"),

  [CAMPOS_DEPRECIACION.TIPO_DEPRECIACION]: yup
    .object()
    .required("Se requiere el tipo de depreciación"),

  [CAMPOS_DEPRECIACION.FOLIO_BMS]: yup
    .string()
    .when([CAMPOS_DEPRECIACION.TIPO_DEPRECIACION], {
      is: (value) => value && value.id === 2,
      then: () => yup.string().required("Se requiere el folio del bien"),
      otherwise: () => yup.date().nullable(),
    }),
});

export const almacenValidacion = yup.object().shape({
  [CAMPOS_ALMACEN.ID_PERIODO]: yup.object().required("Se requiere el periodo."),

  [CAMPOS_ALMACEN.NOMBRE]: yup
    .string()
    .required("Se requiere el nombre.")
    .max(255, "El campo Nombre no puede tener más de 255 caracteres."),

  [CAMPOS_ALMACEN.ID_EMPLEADO]: yup
    .object()
    .required("Se requiere el empleado."),

  [CAMPOS_ALMACEN.ID_CUENTA]: yup.object().required("Se requiere la cuenta."),

  [CAMPOS_ALMACEN.ID_METODO_COSTEO]: yup
    .object()
    .required("Se requiere el metodo de costeo."),
});

export const conceptoMovimientoValidacion = yup.object().shape({
  [CAMPOS_CONCEPTO_MOVIMIENTO.NOMBRE]: yup
    .string()
    .required("Se requiere el nombre del concepto.")
    .max(100, "El nombre del concepto no puede exceder los 100 caracteres."),

  [CAMPOS_CONCEPTO_MOVIMIENTO.ID_TIPO_MOVIMIENTO]: yup
    .object()
    .required("Se requiere el tipo de movimiento."),
});

export const metodoAdquisicionValidacion = yup.object().shape({
  [CAMPOS_METODO_ADQUISICION.NOMBRE]: yup
    .string()
    .required("Se requiere el nombre del metodo de adquisición.")
    .max(100, "El nombre del metodo no puede exceder los 100 caracteres."),
});

export const entradaSalidaValidacion = yup.object().shape({
  [CAMPOS_FILTRO_ENTRADA_SALIDA.PERIODO]: yup
    .object()
    .required("Se requiere el Periodo"),
  [CAMPOS_FILTRO_ENTRADA_SALIDA.BUSQUEDA_FECHA]: yup.boolean(),

  [CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_INICIO]: yup
    .date()
    .when([CAMPOS_FILTRO_ENTRADA_SALIDA.BUSQUEDA_FECHA], {
      is: (value) => value,
      then: () =>
        yup
          .date()
          .required("Se requiere la Fecha de Inicio")
          .max(
            yup.ref(CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_FIN),
            "La Fecha de Inicio no puede ser posterior a la Fecha de Fin"
          ),
      otherwise: () => yup.date().nullable(),
    }),

  [CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_FIN]: yup
    .date()
    .when(
      [
        CAMPOS_FILTRO_ENTRADA_SALIDA.BUSQUEDA_FECHA,
        CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_INICIO,
      ],
      {
        is: (value, inicio) => value && inicio != null,
        then: () =>
          yup
            .date()
            .required("Se requiere la Fecha de Fin")
            .min(
              yup.ref(CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_INICIO),
              "La Fecha de Fin no puede ser anterior a la Fecha de Inicio"
            ),
        otherwise: () => yup.date().nullable(),
      }
    ),
});

export const movimientoValidacion = [
  yup.object().shape({
    [CAMPOS_MOVIMIENTO.ID_TIPO_MOVIMIENTO]: yup
      .object()
      .required("Se requiere el campo Tipo de Movimiento."),

    [CAMPOS_MOVIMIENTO.ID_ALMACEN]: yup
      .object()
      .required("Se requiere el campo Almacén."),

    [CAMPOS_MOVIMIENTO.ID_METODO_ADQUISICION]: yup
      .object()
      .required("Se requiere el campo Método de Adquisición."),

    [CAMPOS_MOVIMIENTO.ID_CONCEPTO_MOVIMIENTO]: yup
      .object()
      .required("Se requiere el campo Concepto de Movimiento."),

    [CAMPOS_MOVIMIENTO.OBSERVACIONES]: yup
      .string()
      .required("Se requiere el campo observaciones."),
  }),
  yup.object().shape({
    [CAMPOS_MOVIMIENTO.ID_FAMILIA]: yup
      .object()
      .required("Se requiere el campo Familia."),

    [CAMPOS_MOVIMIENTO.IMPORTE_TOTAL]: yup
      .number()
      .min(0, "El campo Importe Total no puede ser negativo.")
      .required("Se requiere el campo Importe Total."),

    [CAMPOS_MOVIMIENTO.ARTICULOS]: yup
      .array()
      .min(1, "Se requiere al menos un articulo")
      .required("Se requiere al menos un articulo."),
  }),
];
