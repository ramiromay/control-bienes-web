import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const MultiTablaContext = createContext();

export const useMultiTabla = () => {
  const context = useContext(MultiTablaContext);
  if (!context) {
    throw new Error(
      "useMultiTabla debe ser usado dentro de un MultiTablaProvider"
    );
  }
  return context;
};

export const MultiTablaProvider = ({
  children,
  handleCargarDatosTabla,
  unidadAdministrativa,
  multiTabla,
}) => {
  const { tablaSuperior, tablaInferior } = multiTabla;
  const [filaSeleccionada, setFilaSeleccionada] = useState({
    informacionTablaSuperior: {},
    informacionTablaInferior: {},
    tablaSuperior: [],
    tablaInferior: [],
  });

  const handleQuitarSeleccion = () => {
    setFilaSeleccionada({
      informacionTablaSuperior: {},
      informacionTablaInferior: {},
      tablaSuperior: [],
      tablaInferior: [],
    });
  };

  const handleQuitarSeleccionTablaSuperior = () => {
    setFilaSeleccionada({
      ...filaSeleccionada,
      informacionTablaSuperior: {},
      tablaSuperior: [],
    });
  };

  const handleQuitarSeleccionTablaInferior = () => {
    setFilaSeleccionada({
      ...filaSeleccionada,
      informacionTablaInferior: {},
      tablaInferior: [],
    });
  };

  const handleSeleccionarTablaSuperior = (filaModel) => {
    const idFila = filaModel[0];
    const informacion = tablaSuperior.datos.find(
      (fila) => fila[tablaSuperior.campoId] === idFila
    );
    setFilaSeleccionada({
      informacionTablaInferior: {},
      tablaInferior: [],
      informacionTablaSuperior: informacion,
      tablaSuperior: filaModel,
    });
  };

  const handleSeleccionarTablaInferior = (filaModel) => {
    const idFila = filaModel[0];
    const informacion = tablaInferior.datos.find(
      (fila) => fila[tablaInferior.campoId] === idFila
    );
    setFilaSeleccionada({
      ...filaSeleccionada,
      informacionTablaInferior: informacion,
      tablaInferior: filaModel,
    });
  };

  useEffect(() => {
    handleCargarDatosTabla({
      filaSeleccionada: filaSeleccionada.tablaSuperior,
    });
  }, [filaSeleccionada.tablaSuperior]);

  useEffect(() => {
    handleQuitarSeleccion();
  }, [unidadAdministrativa]);

  return (
    <MultiTablaContext.Provider
      value={{
        filaSeleccionada,

        handleQuitarSeleccion,
        handleQuitarSeleccionTablaSuperior,
        handleQuitarSeleccionTablaInferior,
        handleSeleccionarTablaSuperior,
        handleSeleccionarTablaInferior,
      }}
    >
      {children}
    </MultiTablaContext.Provider>
  );
};
