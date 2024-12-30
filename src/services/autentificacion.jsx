import { post } from "@context/requestConfig";
import { ENDPOINTS_SEGURIDAD } from "../settings/apiConfig";

const login = async (data) => {
  const response = await post(ENDPOINTS_SEGURIDAD.AUTENTIFICACION, data);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor e inciar sesión."
        : response.message
    );
  }
  return response.result;
};

const validarToken = async (token) => {
  const response = await post(ENDPOINTS_SEGURIDAD.VALIDAR_TOKEN, token);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor para verificar su identidad, por lo que su sesión ha sido cerrada. Por favor, inicie sesión nuevamente."
        : response.message
    );
  }
  return response.result;
};

export default { login, validarToken };
