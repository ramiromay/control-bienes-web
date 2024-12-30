import * as yup from "yup";
import {
  CAMPOS_CARACTERISTICA,
  CAMPOS_CENTRO_TRABAJO,
  CAMPOS_CENTRO_TRABAJO_TURNO,
  CAMPOS_CLASE_VEHICULAR,
  CAMPOS_CLAVE_VEHICULAR,
  CAMPOS_COLOR,
  CAMPOS_COMBUSTIBLE,
  CAMPOS_DOCUMENTO,
  CAMPOS_EMPLEADO,
  CAMPOS_ESTADO_FISICO,
  CAMPOS_ESTADO_GENERAL,
  CAMPOS_FAMILIA,
  CAMPOS_LINEA_VEHICULAR,
  CAMPOS_LOGIN,
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
} from "./formConfig";
import { REGEX } from "./appConstants";

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
    .test("es-anterior-hoy", "La Fecha debe de hoy o posterior", (value) => {
      const today = new Date().setHours(0, 0, 0, 0);
      const inputDate = new Date(value).setHours(0, 0, 0, 0);
      return inputDate >= today;
    }),
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
