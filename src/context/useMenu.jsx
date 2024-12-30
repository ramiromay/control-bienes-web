import { useEffect, useState } from "react";
import { useSistema } from "./SistemaContext";
import { getModulos, getSubModulos } from "../services/sistema";

const useMenu = ({ idModulo }) => {
  const {
    handleError,
    handleRegistrarSistemasDisponibles,
    getOpcionesMenuPrincipal,
    getOpcionesCatalogos,
    getModulo,
  } = useSistema();
  const [cargando, setCargando] = useState(false);

  const [menu, setMenu] = useState({
    modulosPrincipales: [],
    catalogos: [],
    modulo: {},
    existenOpcionesModulosPrincipales: false,
    existenOpcionesCatalogos: false,
  });

  useEffect(() => {
    const cargarMenu = async () => {
      setCargando(true);
      try {
        const [modulos, subModulos] = await Promise.all([
          getModulos(),
          getSubModulos(),
        ]);
        const modulosPrincipales = getOpcionesMenuPrincipal({ idModulo });
        const catalogos = getOpcionesCatalogos({ idModulo });
        const modulo = getModulo({ idModulo });
        setMenu({
          modulosPrincipales: modulosPrincipales,
          catalogos: catalogos,
          modulo: modulo,
          existenOpcionesModulosPrincipales: modulosPrincipales.length !== 0,
          existenOpcionesCatalogos: catalogos.length !== 0,
        });
        handleRegistrarSistemasDisponibles(modulos, subModulos);
      } catch (error) {
        handleError(error);
      } finally {
        setCargando(false);
      }
    };

    cargarMenu();
  }, [idModulo]);

  return { cargando, menu };
};

export default useMenu;
