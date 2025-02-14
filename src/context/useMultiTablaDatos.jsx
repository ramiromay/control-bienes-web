import { useState } from "react";

const estadoInicialTabla = {
  columnas: [],
  datos: [],
  campoId: "id",
  titulo: "Titulo",
};

const useMultiTablaDatos = ({
  estadoInicialTablaSuperior = estadoInicialTabla,
  estadoInicialTablaInferior = estadoInicialTabla,
} = {}) => {
  const [tablaSuperior, setTablaSuperior] = useState(
    estadoInicialTablaSuperior
  );
  const [tablaInferior, setTablaInferior] = useState(
    estadoInicialTablaInferior
  );
  const [cargando, setCargando] = useState({
    tablaSuperior: false,
    tablaInferior: false,
  });

  const addDatosTablaInferior = (datos) => {
    setTablaInferior((prevState) => ({
      ...prevState,
      datos: datos,
    }));
  };

  const addDatosTablaSuperior = (datos) => {
    setTablaSuperior((prevState) => ({
      ...prevState,
      datos: datos,
    }));
  };

  const addColumnasTablaSuperior = (columnas) => {
    setTablaSuperior((prevState) => ({
      ...prevState,
      columnas: columnas,
      campoId: columnas[0].field,
    }));
  };

  const addColumnasTablaInferior = (columnas) => {
    setTablaInferior((prevState) => ({
      ...prevState,
      columnas: columnas,
      campoId: columnas[0].field,
    }));
  };

  const resetearTablas = () => {
    setTablaSuperior((prevState) => ({
      ...prevState,
      datos: [],
    }));
    setTablaInferior((prevState) => ({
      ...prevState,
      datos: [],
    }));
  };

  const resetearTablaSuperior = () => {
    setTablaSuperior((prevState) => ({
      ...prevState,
      datos: [],
    }));
  };

  const resetearTablaInferior = () => {
    setTablaInferior((prevState) => ({
      ...prevState,
      datos: [],
    }));
  };

  const iniciarCargaTablas = () => {
    setCargando({
      tablaInferior: true,
      tablaSuperior: true,
    });
  };

  const finalizarCargaTablas = () => {
    setCargando({
      tablaInferior: false,
      tablaSuperior: false,
    });
  };

  const iniciarCargaTablaInferior = () => {
    setCargando((prevState) => ({
      ...prevState,
      tablaInferior: true,
    }));
  };

  const finalizarCargaTablaInferior = () => {
    setCargando((prevState) => ({
      ...prevState,
      tablaInferior: false,
    }));
  };

  return {
    tablaSuperior,
    tablaInferior,
    cargando,
    addDatosTablaInferior,
    addDatosTablaSuperior,
    resetearTablas,
    resetearTablaSuperior,
    resetearTablaInferior,
    iniciarCargaTablas,
    finalizarCargaTablas,
    iniciarCargaTablaInferior,
    finalizarCargaTablaInferior,
    addColumnasTablaSuperior,
    addColumnasTablaInferior,
  };
};

export default useMultiTablaDatos;
