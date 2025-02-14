import { useState } from "react";
import { MODO_DIALOGO } from "../settings/appConstants";

const useDialogoControl = ({ estadoInicialDialogo }) => {
  const [dialogo, setDialogo] = useState(estadoInicialDialogo);

  const handleAbrirDialogo = (modo = MODO_DIALOGO.CREACION) => {
    setDialogo({
      abierto: true,
      modo: modo,
      id: 0,
    });
  };

  const handleAbrirDialogoCreacion = (id = 0) => {
    setDialogo({
      abierto: true,
      modo: MODO_DIALOGO.CREACION,
      id: id,
    });
  };

  const handleAbrirDialogoModificacion = (id = 0) => {
    setDialogo({
      abierto: true,
      modo: MODO_DIALOGO.MODIFICACION,
      id: id,
    });
  };

  const handleAbrirDialogoVisualizacion = (id = 0) => {
    setDialogo({
      abierto: true,
      modo: MODO_DIALOGO.VISUALIZACION,
      id: id,
    });
  };

  const handleCerrarDialogo = () => {
    setDialogo({
      abierto: false,
      modo: MODO_DIALOGO.CREACION,
      id: 0,
    });
  };

  const esDialogoCreacion = () => {
    return dialogo.modo === MODO_DIALOGO.CREACION;
  };

  const esDialogoModificacion = () => {
    return dialogo.modo === MODO_DIALOGO.MODIFICACION;
  };

  const esDialogoVisualizacion = () => {
    return dialogo.modo === MODO_DIALOGO.VISUALIZACION;
  };

  const esDialogoModo = (modo) => {
    return dialogo.modo === modo;
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

  return {
    dialogo,
    handleAbrirDialogoCreacion,
    handleAbrirDialogoModificacion,
    handleAbrirDialogoVisualizacion,
    handleCerrarDialogo,
    esDialogoCreacion,
    esDialogoModificacion,
    esDialogoVisualizacion,
    getTituloDialogo,
    esDialogoModo,
    handleAbrirDialogo,
  };
};

export default useDialogoControl;
