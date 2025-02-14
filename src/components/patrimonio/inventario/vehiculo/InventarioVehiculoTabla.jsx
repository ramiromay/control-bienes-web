import TablaSkeleton from "../../../utils/TablaSkeleton";
import { useSistema } from "../../../../context/SistemaContext";
import useTabla from "../../../../context/Tabla/useTabla";
import Tabla from "../../../utils/Tabla";
import { Box } from "@mui/material";
import InventarioVehiculoActions from "./InventarioVehiculoActions";
import { useInventarioVehiculo } from "../../../../context/InventarioVehiculoContext";

const InventarioVehiculoTabla = () => {
  const { handleEsCargaDatos } = useSistema();
  const { tabla } = useInventarioVehiculo();
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
            <InventarioVehiculoActions
              titulo={tabla.titulo}
              handleQuitarSeleccion={handlerQuitarSeleccion}
            />
          }
        />
      )}
    </Box>
  );
};

export default InventarioVehiculoTabla;
