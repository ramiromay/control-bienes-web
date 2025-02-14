import { Box } from "@mui/material";
import { Arbol, EncabezadoSeccion } from "../../utils";
import { AccountTreeOutlined } from "@mui/icons-material";
import { useCatalogo } from "@context/CatalogoContext";

const CatalogosLista = () => {
  const { listaCatalogos, handleItemSeleccionado, itemSeleccionado } =
    useCatalogo();
  return (
    <Box className="contenedor-formulario">
      <EncabezadoSeccion
        icono={<AccountTreeOutlined />}
        titulo="Listado de Catálogos"
      />
      <Box className="contenedor-seccion alto-completo">
        <Arbol
          handleItemSeleccionado={handleItemSeleccionado}
          textoRaiz="Catálogos Patrimonio"
          treeData={listaCatalogos}
          itemSeleccionado={itemSeleccionado}
        />
      </Box>
    </Box>
  );
};

export default CatalogosLista;
