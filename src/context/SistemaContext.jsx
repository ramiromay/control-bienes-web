import { useLocation } from 'react-router-dom';
import { PropTypes } from "prop-types";
import { createContext, useContext, useState } from "react";
import { MODO_CARGA } from "@settings/appConstants";
import { useNavigate } from "react-router-dom";
import {
  IDS_SECCIONES,
  IDS_SUBMODULOS,
  modulosConfig,
  navInfoInicioConfig,
  subModulosConfig,
} from "../settings/sistemaConfig";

const SistemaContext = createContext();

export const useSistema = () => {
  return useContext(SistemaContext);
};

const informacionInicial = {
  idSubModulo: 0,
  nombre: "Modulo de Inicio",
  abreviacion: "AC",
  modulo: "Administrador de Catalogos",
};

const modulosIniciales = [
  {
    idModulo: 1,
    nombre: "Modulo 1",
    abreviacion: "M1",
    descripcion: "Descripción del Módulo 1",
  },
  {
    idModulo: 2,
    nombre: "Modulo 2",
    abreviacion: "M2",
    descripcion: "Descripción del Módulo 2",
  },
  {
    idModulo: 3,
    nombre: "Modulo 3",
    abreviacion: "M3",
    descripcion: "Descripción del Módulo 3",
  },
];

const subModulosIniciales = [
  {
    idSubModulo: 1,
    nombre: "Submodulo 1A",
    abreviacion: "S1A",
    idModulo: 1, // Coincide con el IdModulo de los módulos anteriores
    idSeccion: 1, // Puede ser 1 o 2
  },
  {
    idSubModulo: 2,
    nombre: "Submodulo 1B",
    abreviacion: "S1B",
    idModulo: 1, // Coincide con el IdModulo de los módulos anteriores
    idSeccion: 2, // Puede ser 1 o 2
  },
  {
    idSubModulo: 3,
    nombre: "Submodulo 2A",
    abreviacion: "S2A",
    idModulo: 2, // Coincide con el IdModulo de los módulos anteriores
    idSeccion: 1, // Puede ser 1 o 2
  },
  {
    idSubModulo: 4,
    nombre: "Submodulo 2B",
    abreviacion: "S2B",
    idModulo: 2, // Coincide con el IdModulo de los módulos anteriores
    idSeccion: 2, // Puede ser 1 o 2
  },
  {
    idSubModulo: 5,
    nombre: "Submodulo 3A",
    abreviacion: "S3A",
    idModulo: 3, // Coincide con el IdModulo de los módulos anteriores
    idSeccion: 1, // Puede ser 1 o 2
  },
];

const usuarioInicial = {
  nombre: "Ramiro May",
  usuario: "ramiromay",
  email: "ramiromay1@gmail.com",
  rol: "Administrador",
  id: -1,
  permisos: [],
};

export const SistemaProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navBarOpen, setNavBarOpen] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [servidorOnline, setServidorOnline] = useState(false);
  const [informacionSistema, setInformacionSistema] =
    useState(informacionInicial);
  const [modulos, setModulos] = useState(modulosIniciales);
  const [subModulos, setSubModulos] = useState(subModulosIniciales);
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [cargando, setCargando] = useState({
    activo: false,
    modo: MODO_CARGA.MODULO,
  });
  const [error, setError] = useState({
    hasError: false,
    message: "",
  });

  const getOpcionesMenuPrincipal = ({ idModulo }) => {
    return subModulos.filter(
      (subModulo) =>
        subModulo.idModulo === idModulo &&
        subModulo.idSeccion === IDS_SECCIONES.MENU_PRINCIPAL
    );
  };

  const getOpcionesCatalogos = ({ idModulo }) => {
    return subModulos.filter(
      (subModulo) =>
        subModulo.idModulo === idModulo &&
        subModulo.idSeccion === IDS_SECCIONES.CATALOGOS
    );
  };

  const getModulo = ({ idModulo }) => {
    return modulos.find((modulo) => modulo.idModulo === idModulo);
  };

  const getIdMenuModulo = ({ pathname }) => {
    return Array.from(modulosConfig).find(
      ([, value]) => value.path === pathname
    );
  };

  const handleNavigateModulo = (idModulo) => {
    const path = modulosConfig.get(idModulo).path;
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const handleNavigateSubModulo = (idSubModulo) => {
    const path = subModulosConfig.get(idSubModulo).path;
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const handleUsuario = ({ id, nombre, usuario, email, rol, permisos }) => {
    setUsuario({
      permisos: permisos,
      nombre: nombre,
      usuario: usuario,
      email: email,
      rol: rol,
      id: id,
    });
  };

  const handleRegistrarSistemasDisponibles = (modulos, subModulos) => {
    setModulos(modulos);
    setSubModulos(subModulos);
    setServidorOnline(true);
  };

  const handleSubModulos = (subModulos) => {
    setSubModulos(subModulos);
  };

  const handleModulos = ({modulos}) => {
    setModulos(modulos);
  }

  const handleChangeModulo = ({ idSubModulo }) => {
    let infoModulo = null;
    if (idSubModulo === IDS_SUBMODULOS.INCIO) {
      infoModulo = navInfoInicioConfig;
    } else if (idSubModulo === IDS_SUBMODULOS.MENU) {
      const [idModulo] = getIdMenuModulo({ pathname: location.pathname });
      const moduloEncontrado = modulos.find((modulo) => modulo.idModulo === idModulo);
      infoModulo = {
        idSubModulo: IDS_SUBMODULOS.MENU,
        nombre: `Inicio ${moduloEncontrado.abreviacion}`,
        abreviacion: `I${moduloEncontrado.abreviacion[0]}`,
        modulo: `Menu ${moduloEncontrado.abreviacion}`,
      };  
    } else {
      const subModuloEncontrado = subModulos.find(
        (subModulo) => subModulo.idSubModulo === idSubModulo
      );
      const moduloEncontrado = modulos.find(
        (modulo) => modulo.idModulo === subModuloEncontrado.idModulo
      );
      infoModulo = {
        idSubModulo: subModuloEncontrado.idSubModulo,
        nombre: `Módulo ${moduloEncontrado.abreviacion}`,
        abreviacion: `${subModuloEncontrado.abreviacion}`,
        modulo: `${subModuloEncontrado.nombre}`,
      };
    }
    
    document.title = `${infoModulo.nombre} - ${infoModulo.modulo} (${infoModulo.abreviacion})`;
    setInformacionSistema(infoModulo);
    setNavBarOpen(true);
  };

  const handleActivarNavBar = () => {
    setNavBarOpen(true);
  };

  const handleDesactivarNavBar = () => {
    setNavBarOpen(false);
  };

  const handleError = (error) => {
    setError({
      message: error.message,
      hasError: true,
    });
    setAlerta(true);
  };

  const handleIniciarCarga = (modo = MODO_CARGA.MODULO) => {
    setCargando({
      activo: true,
      modo: modo,
    });
  };

  const handleFinalizarCarga = () => {
    setCargando({
      activo: false,
      modo: MODO_CARGA.MODULO,
    });
  };

  const handleEsCargaPagina = () => {
    return cargando.activo && cargando.modo === MODO_CARGA.PAGINA;
  };

  const handleEsCargaModulo = () => {
    return cargando.activo && cargando.modo === MODO_CARGA.MODULO;
  };

  const handleEsCargaDatos = () => {
    return cargando.activo && cargando.modo === MODO_CARGA.DATOS;
  };

  const handleEsCargaDialogo = () => {
    return cargando.activo && cargando.modo === MODO_CARGA.DIALOGO;
  };

  const handleCerrarAlerta = () => {
    setAlerta(false);
    setError({
      message: "",
      hasError: false,
    });
  };

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleProcesos = async (
    procesos,
    modo = MODO_CARGA.MODULO,
    cierreForzado = () => {}
  ) => {
    let isSuccess = false;
    handleIniciarCarga(modo);
    console.log("Iniciando procesos");
    try {
      if (Array.isArray(procesos)) {
        await Promise.all(procesos.map((proceso) => proceso()));
      } else {
        await procesos();
      }
      isSuccess = true;
    } catch (error) {
      console.error("Error en procesos:", error);
      cierreForzado();
      handleError(error);
    } finally {
      handleFinalizarCarga();
      console.log("Finalizando procesos");
    }
    return isSuccess;
  };

  return (
    <SistemaContext.Provider
      value={{
        alerta,
        error,
        handleCerrarAlerta,
        handleError,
        handleActivarNavBar,
        handleDesactivarNavBar,
        handleIniciarCarga,
        handleFinalizarCarga,
        handleEsCargaModulo,
        handleEsCargaDatos,
        handleEsCargaPagina,
        handleEsCargaDialogo,
        handleProcesos,
        sleep,
        handleRegistrarSistemasDisponibles,
        cargando,
        navBarOpen,
        informacionSistema,
        handleChangeModulo,
        handleUsuario,
        servidorOnline,
        usuario,
        modulos,
        subModulos,
        navigate,
        handleNavigateModulo,
        handleNavigateSubModulo,
        getOpcionesMenuPrincipal,
        getOpcionesCatalogos,
        getModulo,
        getIdMenuModulo,
        handleSubModulos,
        handleModulos,
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
};

SistemaProvider.propTypes = {
  children: PropTypes.node,
};
