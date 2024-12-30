import { useSistema } from "../../context/SistemaContext";
import TablaSkeleton from "../utils/TablaSkeleton";
import { Tabla } from "../utils";
import { useSeguridad } from "../../context/SeguridadContext";
import useTabla from "../../context/Tabla/useTabla";
import SeguridadActions from "./SeguridadActions";

const SeguridadTabla = () => {
  const { handleEsCargaDatos } = useSistema();
  const { tabla } = useSeguridad();
  const { filaSeleccionada, handleFilaSeleccionada, handlerQuitarSeleccion } = useTabla();
  return (
    <section className="tabla-unica">
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
            <SeguridadActions
              titulo={tabla.titulo}
              handleQuitarSeleccion={handlerQuitarSeleccion}
            />
          }
        />
      )}
    </section>
  );
};

export default SeguridadTabla;
