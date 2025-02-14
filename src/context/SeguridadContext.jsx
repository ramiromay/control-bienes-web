import { createContext, useContext, useEffect, useState } from "react";
import { MODO_CARGA, MODO_DIALOGO } from "../settings/appConstants";
import { getColumnasTablaSubModulo } from "../services/sistema";
import { IDS_SUBMODULOS } from "../settings/sistemaConfig";
import {
  actualizarEmpleado,
  crearEmpleado,
  getEmpleadoById,
  getEmpleados,
  invertirEstadoEmpleado,
} from "../services/seguridad";
import { mapArray, mapObject } from "../settings/utils";
import {
  compColumnasTablaMappingRules,
  entEmpleadoMappingRules,
} from "../settings/mappingRulesConfig";
import { useSistema } from "./SistemaContext";

const SeguridadContext = createContext();

export const useSeguridad = () => {
  return useContext(SeguridadContext);
};

export const SeguridadProvider = ({ children }) => {
  const { handleError, handleIniciarCarga, handleFinalizarCarga, sleep } =
    useSistema();
  const [dialogo, setDialogo] = useState({
    abierto: false,
    modo: MODO_DIALOGO.CREACION,
  });
  const [tabla, setTabla] = useState({
    columnas: [],
    datos: [],
    campoId: "id",
    titulo: "Empleados y Usuarios",
  });
  const [registro, setRegistro] = useState({});
  const handleAbrirDialogoCreacion = () => {
    setDialogo({
      abierto: true,
      modo: MODO_DIALOGO.CREACION,
    });
  };

  const handleAbrirDialogoModificacion = () => {
    setDialogo({
      abierto: true,
      modo: MODO_DIALOGO.MODIFICACION,
    });
  };

  const handleAbrirDialogoVisualizacion = () => {
    setDialogo({
      abierto: true,
      modo: MODO_DIALOGO.VISUALIZACION,
    });
  };

  const handleCerrarDialogo = () => {
    setDialogo({
      abierto: false,
      modo: MODO_DIALOGO.CREACION,
      idCatalogo: 0,
    });
    setRegistro({});
  };

  const handleResetearTabla = () => {
    setTabla({
      columnas: [],
      datos: [],
      campoId: "",
      titulo: "Titulo",
    });
  };

  const esDialogoModificacion = () => {
    return dialogo.modo === MODO_DIALOGO.MODIFICACION;
  };

  const esDialogoVisualizacion = () => {
    return dialogo.modo === MODO_DIALOGO.VISUALIZACION;
  };

  const getTituloDialogo = (nombreCatalogo) => {
    switch (dialogo.modo) {
      case MODO_DIALOGO.MODIFICACION:
        return `Modificar ${nombreCatalogo}`;
      case MODO_DIALOGO.VISUALIZACION:
        return `Visualizar ${nombreCatalogo}`;
      case MODO_DIALOGO.CREACION:
        return `Crear ${nombreCatalogo}`;
      default:
        return "Titulo";
    }
  };

  const handleRefrescarListaEmpleados = async () => {
    const empleados = await getEmpleados();
    setTabla((prevTabla) => ({
      ...prevTabla,
      datos: empleados,
    }));
  };

  const handleInvertirEstadoEmpleado = async (filaSeleccionada) => {
    const idRegistro = parseInt(filaSeleccionada);
    await invertirEstadoEmpleado(idRegistro);
    await handleRefrescarListaEmpleados();
  };

  const handleCrearEmpleado = async (data) => {
    const entidad = mapObject(data, entEmpleadoMappingRules);
    console.log(entidad);
    await crearEmpleado(entidad);
    await handleRefrescarListaEmpleados();
  };

  const handleModificarEmpleado = async (filaSeleccionada, data) => {
    const idEmpleado = parseInt(filaSeleccionada);
    const entidad = mapObject(data, entEmpleadoMappingRules);
    console.log(entidad);
    await actualizarEmpleado(idEmpleado, entidad);
    await handleRefrescarListaEmpleados();
  };

  const handleGetEmpleadoById = async (filaSeleccionada) => {
    if (dialogo.modo === MODO_DIALOGO.CREACION) {
      return null;
    }
    const idEmpleado = parseInt(filaSeleccionada);
    return await getEmpleadoById(idEmpleado);
  };

  const handleEnviar = async (filaSeleccionada, data) => {
    if (dialogo.modo === MODO_DIALOGO.CREACION) {
      await handleCrearEmpleado(data);
    } else {
      await handleModificarEmpleado(filaSeleccionada, data);
    }
  };

  useEffect(() => {
    handleIniciarCarga(MODO_CARGA.DATOS);
    Promise.all([
      getColumnasTablaSubModulo(
        IDS_SUBMODULOS.ADMINISTRADOR_EMPLEADOS_USUARIOS
      ),
      getEmpleados(),
    ])
      .then(([columnas, empleados]) => {
        const columnasMap = mapArray(columnas, compColumnasTablaMappingRules, {
          headerClassName: "celdas-encabezado-tabla",
        });
        setTabla({
          columnas: columnasMap,
          datos: empleados,
          campoId: columnasMap[0].field,
          titulo: "Empleados y Usuarios",
        });
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        handleFinalizarCarga();
      });
  }, []);

  return (
    <SeguridadContext.Provider
      value={{
        dialogo,
        tabla,
        registro,
        handleRefrescarListaEmpleados,
        handleInvertirEstadoEmpleado,
        handleCrearEmpleado,
        handleModificarEmpleado,
        handleEnviar,
        handleGetEmpleadoById,
        handleAbrirDialogoCreacion,
        handleAbrirDialogoModificacion,
        handleAbrirDialogoVisualizacion,
        handleResetearTabla,
        handleCerrarDialogo,
        getTituloDialogo,
        esDialogoModificacion,
        esDialogoVisualizacion,
      }}
    >
      {children}
    </SeguridadContext.Provider>
  );
};
