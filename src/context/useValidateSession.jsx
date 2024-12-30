import { useEffect, useState } from "react";
import { useSistema } from "./SistemaContext";
import autentificacionServicio from "../services/autentificacion";
import { getModulos, getSubModulos } from "../services/sistema";
import { CLAVE_TOKEN } from "../settings/sistemaConfig";

export function useValidateSession({ pathname = "/" }) {
  const {
    handleUsuario,
    handleRegistrarSistemasDisponibles,
    servidorOnline,
    handleError,
  } = useSistema();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = window.localStorage.getItem(CLAVE_TOKEN);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        setIsLoading(true);
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        const usuario = await autentificacionServicio.validarToken(token);
        if (!servidorOnline) {
          const [modulos, subModulos] = await Promise.all([
            getModulos(),
            getSubModulos(),
          ]);
          handleUsuario(usuario);
          handleRegistrarSistemasDisponibles(modulos, subModulos);
        }
        setIsAuthenticated(true);
      } catch (error) {
        handleError(error);
        setIsAuthenticated(false);
        window.localStorage.removeItem(CLAVE_TOKEN);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthData();
  }, [pathname]);

  return { isAuthenticated, isLoading };
}

export default useValidateSession;
