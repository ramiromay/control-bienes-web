import { PropTypes } from "prop-types";
import { mapObject } from "../settings/utils";
import { entAutentificacionMappingRules } from "../settings/mappingRulesConfig";
import { useSistema } from "./SistemaContext";
import { createContext, useContext } from "react";
import useCargando from "./useCargando";
import autentificacionServices from "../services/autentificacion";

const LoginContext = createContext();

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
  const { handleUsuario, navigate } = useSistema();
  const { handleFinalizarCarga, handleIniciarCarga } = useCargando();

  const handleLogin = async (data) => {
    const credenciales = mapObject(data, entAutentificacionMappingRules);
    const response = await autentificacionServices.login(credenciales);
    localStorage.setItem("auth_token", response.token);
    handleUsuario(response);
    navigate("/");
  };

  return (
    <LoginContext.Provider
      value={{
        handleLogin,
        handleFinalizarCarga,
        handleIniciarCarga,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
