import { useEffect, useState } from "react";
import TablaContext from "./TablaContext";
import { PropTypes } from "prop-types";

const TablaProvider = ({ children, datos, campoId, itemSeleccionado}) => {
  const [filaSeleccionada, setFilaSeleccionada] = useState([]);
  const [filaSeleccionadaData, setfilaSeleccionadaData] = useState({});

  const handleFilaSeleccionada = (filaModel) => {
    const filaData = datos.find(item => item[campoId] === filaModel[0]);
    setFilaSeleccionada(filaModel);
    setfilaSeleccionadaData(filaData);
  };

  const handleQuitarSeleccion = () => {
    setFilaSeleccionada([]);
    setfilaSeleccionadaData({});
  };

  useEffect(() => {
    setFilaSeleccionada([]);
    // eslint-disable-next-line
  }, [itemSeleccionado]);

  return (
    <TablaContext.Provider
      value={{
        filaSeleccionada,
        filaSeleccionadaData,
        handleFilaSeleccionada,
        handleQuitarSeleccion,
      }}
    >
      {children}
    </TablaContext.Provider>
  );
};

TablaProvider.propTypes = {
  children: PropTypes.node.isRequired,
  datos: PropTypes.array.isRequired,
};

export default TablaProvider;
