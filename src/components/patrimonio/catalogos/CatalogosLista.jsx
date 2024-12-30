import { Box } from "@mui/material";
import { Arbol, Seccion } from "../../utils";
import { AccountTreeOutlined } from "@mui/icons-material";
import { useCatalogo } from "@context/CatalogoContext";

const CatalogosLista = () => {
  const { listaCatalogos, handleItemSeleccionado, itemSeleccionado } =  useCatalogo();
  return (
    <Box className="contenedor-formulario">
      <Seccion icono={<AccountTreeOutlined />} titulo="Listado de Catálogos">
        <Box className="contenedor-seccion contenedor-seccion-total">
          <Arbol
            handleItemSeleccionado={handleItemSeleccionado}
            textoRaiz="Catálogos"
            treeData={listaCatalogos}
            itemSeleccionado={itemSeleccionado}
          />
        </Box>
      </Seccion>
    </Box>
  );
};

export default CatalogosLista;
