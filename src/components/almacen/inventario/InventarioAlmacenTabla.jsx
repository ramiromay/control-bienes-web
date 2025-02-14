import { Box } from "@mui/material";
import { useInventarioAlmacen } from "../../../context/InventarioAlmacenContext";
import { useSistema } from "../../../context/SistemaContext";
import useTabla from "../../../context/Tabla/useTabla";
import TablaSkeleton from "../../utils/TablaSkeleton";
import { Tabla } from "../../utils";
import InventarioAlmacenActions from "./InventarioAlmacenActions";

const InventarioAlmacenTabla = () => {
  const { handleEsCargaDatos } = useSistema();
  const { tabla } = useInventarioAlmacen();
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
            <InventarioAlmacenActions
              titulo={tabla.titulo}
              handleQuitarSeleccion={handlerQuitarSeleccion}
            />
          }
        />
      )}
    </Box>
  );
};

export default InventarioAlmacenTabla;
