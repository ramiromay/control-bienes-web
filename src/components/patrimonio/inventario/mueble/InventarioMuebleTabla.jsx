import TablaSkeleton from "../../../utils/TablaSkeleton";
import { useSistema } from "../../../../context/SistemaContext";
import { useInventarioMueble } from "../../../../context/InventarioMuebleContext";
import useTabla from "../../../../context/Tabla/useTabla";
import Tabla from "../../../utils/Tabla";
import { Box } from "@mui/material";
import InventarioMuebleActions from "./InventarioMuebleActions";

const InventarioMuebleTabla = () => {
  const { handleEsCargaDatos } = useSistema();
  const { tabla } = useInventarioMueble();
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
            <InventarioMuebleActions
              titulo={tabla.titulo}
              handleQuitarSeleccion={handlerQuitarSeleccion}
            />
          }
        />
      )}
    </Box>
  );
};

export default InventarioMuebleTabla;
