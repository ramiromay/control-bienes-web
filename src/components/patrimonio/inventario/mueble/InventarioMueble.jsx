import TablaProvider from "../../../../context/Tabla/TablaProvider";
import { useSistema } from "../../../../context/SistemaContext";
import { useInventarioMueble } from "../../../../context/InventarioMuebleContext";
import InventarioMuebleTabla from "./InventarioMuebleTabla";
import InventarioMuebleFiltro from "./InventarioMuebleFiltro";
import InventarioMuebleForm from "./forms/InventarioMuebleForm";
import { MODO_DIALOGO } from "../../../../settings/appConstants";
import InventarioMuebleHistorial from "./InventarioMuebleHistorial";
import InventarioInmuebleSkeleton from "../inmueble/InventarioInmuebleSkeleton";
import InventarioMuebleDepreciacion from "./InventarioMuebleDepreciacion";

const InventarioMueble = () => {
  const { tabla, unidadAdministrativa, tipoBien, dialogoManager } =
    useInventarioMueble();
  const { esDialogoModo, esDialogoVisualizacion } = dialogoManager;
  const { handleEsCargaModulo } = useSistema();

  return (
    <section className="contenedor-modulo">
      {handleEsCargaModulo() ? (
        <InventarioInmuebleSkeleton />
      ) : (
        <section className="contenedor-sub-modulo">
          <InventarioMuebleFiltro />
          <TablaProvider
            datos={tabla.datos}
            campoId={tabla.campoId}
            itemSeleccionado={unidadAdministrativa || tipoBien}
          >
            <InventarioMuebleTabla />
            {esDialogoVisualizacion() && <InventarioMuebleForm />}
            {esDialogoModo(MODO_DIALOGO.HISTORIAL) && (
              <InventarioMuebleHistorial />
            )}
            {esDialogoModo(MODO_DIALOGO.DEPRECIACION) && (
              <InventarioMuebleDepreciacion />
            )}
          </TablaProvider>
        </section>
      )}
    </section>
  );
};

export default InventarioMueble;
