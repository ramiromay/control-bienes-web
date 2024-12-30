import { createContext, useContext, useState } from "react";
import { PropTypes } from "prop-types";
import { catalogosConfig } from "@settings/catalogosConfig";
import { useSistema } from "./SistemaContext";
import { MODO_DIALOGO } from "../settings/appConstants";
import {
  compCatalogosMappingRules,
  compColumnasTablaMappingRules,
} from "@settings/mappingRulesConfig";
import { mapArray, mapObject } from "../settings/utils";
import { ENDPOINTS_SISTEMA } from "@settings/apiConfig";
import {
  getRegistroCatalogo,
  getTodosRegistrosCatalogo,
  invertirEstadoRegistroCatalogo,
  crearRegistroCatalogo,
  modificarRegistroCatalogo,
} from "../services/catalogo";
import { getListaCatalogos, getColumnasTabla } from "../services/sistema";

const CatalogoContext = createContext();

export const useCatalogo = () => {
  return useContext(CatalogoContext);
};

export const CatalogoProvider = ({ children }) => {
  const [dialogo, setDialogo] = useState({
    abierto: false,
    modo: MODO_DIALOGO.CREACION,
    idCatalogo: 0,
  });
  const [tabla, setTabla] = useState({
    columnas: [],
    datos: [],
    campoId: "id",
    titulo: "Titulo",
  });
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const [listaCatalogos, setListaCatalogos] = useState([]);
  const [registro, setRegistro] = useState({});
  const { sleep } = useSistema();

  const handleAbrirDialogoCreacion = () => {
    setDialogo({
      abierto: true,
      modo: MODO_DIALOGO.CREACION,
      idCatalogo: parseInt(itemSeleccionado),
    });
  };

  const handleAbrirDialogoModificacion = () => {
    setDialogo({
      abierto: true,
      modo: MODO_DIALOGO.MODIFICACION,
      idCatalogo: parseInt(itemSeleccionado),
    });
  };

  const handleAbrirDialogoVisualizacion = () => {
    setDialogo({
      abierto: true,
      modo: MODO_DIALOGO.VISUALIZACION,
      idCatalogo: parseInt(itemSeleccionado),
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

  const handleItemSeleccionado = (nuevoItem) => {
    setItemSeleccionado(nuevoItem);
  };

  const handleListaCatalogo = (lista) => {
    setListaCatalogos(lista);
  };

  const handleResetearTabla = () => {
    setTabla({
      columnas: [],
      datos: [],
      campoId: "",
      titulo: "Titulo",
    });
  };

  const getCatalogo = (id = 0) => {
    const idCatalogo = id || parseInt(itemSeleccionado);
    return catalogosConfig.get(idCatalogo);
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

  const handleCargarListaCatalogos = async (idSistema) => {
    const endpoint = `${ENDPOINTS_SISTEMA.CATALOGO}/${idSistema}`;
    const responseResult = await getListaCatalogos(endpoint);
    const listaCatalogos = mapArray(responseResult, compCatalogosMappingRules);
    setListaCatalogos(listaCatalogos);
  };

  const handleRefrescarCatalogo = async ()=> {
    const idCatalogo = parseInt(itemSeleccionado);
    const catalogoModel = getCatalogo(idCatalogo);
    const endpoint = `${catalogoModel.endpoint}`;
    const responseResult = await getTodosRegistrosCatalogo(endpoint);
    setTabla((prevTabla) => ({
      ...prevTabla,
      datos: responseResult,
    }));
  }

  const handleDobleClicCatalogo = async () => {
    const idCatalogo = parseInt(itemSeleccionado);
    if (idCatalogo !== 0) {
      const catalogoModel = getCatalogo(idCatalogo);
      const endpoint = `${ENDPOINTS_SISTEMA.COLUMNA_CATALOGO}/${idCatalogo}`;
      const columnasResult = await getColumnasTabla(endpoint);

      if (columnasResult.length === 0) {
        throw new Error("No se encontraron columnas");
      }

      const columnas = mapArray(columnasResult, compColumnasTablaMappingRules, {
        headerClassName: "celdas-encabezado-tabla",
      });
      await handleRefrescarCatalogo();

      setTabla((prevTabla) => ({
        ...prevTabla,
        columnas: columnas,
        campoId: columnas[0].field,
        titulo: catalogoModel.titulo,
      }));
    } else {
      await sleep(200);
      handleResetearTabla();
    }
  };

  const handleInvertirEstado = async (filaSeleccionada) => {
    const idRegistro = parseInt(filaSeleccionada);
    const idCatalogo = parseInt(itemSeleccionado);
    const catalogoModel = getCatalogo(idCatalogo);
    const endpoint = `${catalogoModel.endpoint}/${idRegistro}`;
    await invertirEstadoRegistroCatalogo(endpoint);
    await handleRefrescarCatalogo();
  };

  const handleCrearRegistro = async (data) => {
    const idCatalogo = parseInt(itemSeleccionado);
    const catalogoModel = getCatalogo(idCatalogo);
    const endpoint = `${catalogoModel.endpoint}`;
    console.log(data);
    console.log(catalogoModel.mappingRules);
    const entidad = mapObject(data, catalogoModel.mappingRules);
    console.log(entidad);
    await crearRegistroCatalogo(endpoint, entidad);
    await handleDobleClicCatalogo();
  };

  const handleModificarRegistro = async (filaSeleccionada, data) => {
    const idRegistro = parseInt(filaSeleccionada);
    const idCatalogo = parseInt(itemSeleccionado);
    const catalogoModel = getCatalogo(idCatalogo);
    const endpoint = `${catalogoModel.endpoint}/${idRegistro}`;
    const entidad = mapObject(data, catalogoModel.mappingRules);
    console.log(entidad);
    await modificarRegistroCatalogo(endpoint, entidad);
    await handleRefrescarCatalogo();
  };

  const handleGetRegistroCatalogo = async (filaSeleccionada) => {
    if (dialogo.modo === MODO_DIALOGO.CREACION) {
      return null;
    }
    const idRegistro = parseInt(filaSeleccionada);
    const idCatalogo = parseInt(itemSeleccionado);
    const catalogoModel = getCatalogo(idCatalogo);
    const endpoint = `${catalogoModel.endpoint}/${idRegistro}`;
    return await getRegistroCatalogo(endpoint);
  };

  const handleEnviar = async (filaSeleccionada, data) => {
    if (dialogo.modo === MODO_DIALOGO.CREACION) {
      await handleCrearRegistro(data);
    } else {
      await handleModificarRegistro(filaSeleccionada, data);
    }
  };

  return (
    <CatalogoContext.Provider
      value={{
        listaCatalogos,
        itemSeleccionado,
        tabla,
        dialogo,
        registro,
        handleAbrirDialogoCreacion,
        handleAbrirDialogoModificacion,
        handleAbrirDialogoVisualizacion,
        handleListaCatalogo,
        handleItemSeleccionado,
        handleCargarListaCatalogos,
        handleDobleClicCatalogo,
        handleInvertirEstado,
        handleGetRegistroCatalogo,
        handleCerrarDialogo,
        handleResetearTabla,
        getCatalogo,
        handleEnviar,
        getTituloDialogo,
        esDialogoModificacion,
        esDialogoVisualizacion,
      }}
    >
      {children}
    </CatalogoContext.Provider>
  );
};

CatalogoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
