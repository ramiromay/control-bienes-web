import { useState } from "react";
import { PropTypes } from "prop-types";
import CatalogoContext from "./CatalogoContext";
import { useEffect } from "react";
import { get } from "../../settings/HttpClient";
import catalogoMap from "../../components/patrimonio/catalogos/ComplementoCatalogo";

const CatalogoProvider = ({ children }) => {
  const [control, setControl] = useState({
    error: {},
    hasError: false,
  });

  const [catalogos, setCatalogos] = useState([]);
  const [indexState, setIndexState] = useState(0);

  const cerrarDialog = () => {
    setControl({
      error: {},
      hasError: false,
    });
  };


  

  useEffect(() => {
    const loadInventories = async () => {
      try {
        const catalogosResponse = await get(`/Catalogo/1`);
        const catalogos = catalogosResponse.result.map((catalogo) => {
            return {
                id: catalogo.idCatalogo.toString(),
                name: catalogo.nombre,
            }
        });
        setCatalogos(catalogos);
      } catch (error) {
        setControl((prevState) => ({
          ...prevState,
          error: error,
          hasError: true,
        }));
      }
    };
    loadInventories();
  }, []);

  return (
    <CatalogoContext.Provider
      value={{
        control: control,
        setControl: setControl,
        catalogos: catalogos,
        indexState: indexState,
        cerrarDialog: cerrarDialog,
        setIndexState: setIndexState,
        catalogoMap: catalogoMap,
      }}
    >
      {children}
    </CatalogoContext.Provider>
  );
};

CatalogoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CatalogoProvider;
