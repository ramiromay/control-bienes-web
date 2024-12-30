export const MODO_CARGA = {
  MODULO: 0,
  DATOS: 1,
  DIALOGO: 2,
  PAGINA: 3
};

export const MODO_DIALOGO = {
  CREACION: 0,
  MODIFICACION: 1,
  VISUALIZACION: 2
};

export const REGEX ={
  DIGITO: /[0-9]/,
  MINUSCULA: /[a-z]/,
  MAYUSCULA: /[A-Z]/,
  NO_ALFANUMERICO: /[^a-zA-Z0-9]/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

export const DATE_FORMAT = {
  DEFAULT: "DD/MM/YYYY"
}