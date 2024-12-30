import { Tabla } from "../../utils";
import AdministradorCatalogosActions from "./CatalogosActions";
import { useCatalogo } from "@context/CatalogoContext";
import useTabla from "@context/Tabla/useTabla";
import { Box } from "@mui/material";
import TablaSkeleton from "../../utils/TablaSkeleton";
import { useSistema } from "../../../context/SistemaContext";

const CatalogosTabla = () => {
  const { handleEsCargaDatos } = useSistema();
  const { tabla } = useCatalogo();
  const { filaSeleccionada, handleFilaSeleccionada, handlerQuitarSeleccion } =
    useTabla();
  return (
    <Box className="tabla-unica">
      {handleEsCargaDatos() ? (
        <TablaSkeleton />
      ) : (
        <Tabla
          columnas={tabla.columnas}
          datos={tabla.datos}
          filaSeleccionada={filaSeleccionada}
          handleFilaSeleccionada={handleFilaSeleccionada}
          orderBy={tabla.campoId}
          cargando={tabla.cargando}
          componenteActions={
            <AdministradorCatalogosActions
              titulo={tabla.titulo}
              handleQuitarSeleccion={handlerQuitarSeleccion}
            />
          }
        />
      )}
    </Box>
  );
};

export default CatalogosTabla;
