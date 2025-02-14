import React, { useState } from "react";

const useTablaBotones = () => {
  const [cargandoBotones, setCargandoBotones] = useState({
    creacion: false,
    modificacion: false,
    visualizacion: false,
    enviar: false,
  });

  const handleIniciarCargaBotonEnviar = () => {
    setCargandoBotones((prevState) => ({
      ...prevState,
      enviar: true,
    }));
  };

  const handleIniciarCargaBotonModificacion = () => {
    setCargandoBotones((prevState) => ({
      ...prevState,
      modificacion: true,
    }));
  };

  const handleIniciarCargaBotonVisualizacion = () => {
    setCargandoBotones((prevState) => ({
      ...prevState,
      visualizacion: true,
    }));
  };

  const handleIniciarCargaBotonCreacion = () => {
    setCargandoBotones((prevState) => ({
      ...prevState,
      creacion: true,
    }));
  };

  const handleFinalizarCargaBotonEnviar = () => {
    setCargandoBotones((prevState) => ({
      ...prevState,
      enviar: false,
    }));
  };

  const handleFinalizarCargaBotonModificacion = () => {
    setCargandoBotones((prevState) => ({
      ...prevState,
      modificacion: false,
    }));
  };
  const handleFinalizarCargaBotonVisualizacion = () => {
    setCargandoBotones((prevState) => ({
      ...prevState,
      visualizacion: false,
    }));
  };
  const handleFinalizarCargaBotonCreacion = () => {
    setCargandoBotones((prevState) => ({
      ...prevState,
      creacion: false,
    }));
  };

  const existenBotonesCargando = () => {
    return Object.values(cargandoBotones).some((valor) => valor);
  };
  return {
    cargandoBotones,
    handleIniciarCargaBotonEnviar,
    handleIniciarCargaBotonModificacion,
    handleIniciarCargaBotonVisualizacion,
    handleIniciarCargaBotonCreacion,
    handleFinalizarCargaBotonEnviar,
    handleFinalizarCargaBotonModificacion,
    handleFinalizarCargaBotonVisualizacion,
    handleFinalizarCargaBotonCreacion,
    existenBotonesCargando,
  };
};

export default useTablaBotones;
