import TablaProvider from "../../../../context/Tabla/TablaProvider";
import { useSistema } from "../../../../context/SistemaContext";
import InventarioInmuebleTabla from "./InventarioInmuebleTabla";
import InventarioInmuebleFiltro from "./InventarioInmuebleFiltro";
import { MODO_DIALOGO } from "../../../../settings/appConstants";
import InventarioInmuebleHistorial from "./InventarioInmuebleHistorial";
import { useInventarioInmueble } from "../../../../context/InventarioInmuebleContext";
import InventarioInmuebleForm from "./forms/InventarioInmuebleForm";
import InventarioInmuebleSkeleton from "./InventarioInmuebleSkeleton";
import InventarioInmuebleDepreciacion from "./InventarioInmuebleDepreciacion";

const InventarioInmueble = () => {
  const { tabla, unidadAdministrativa, tipoBien, dialogoManager } =
    useInventarioInmueble();
  const { esDialogoModo, esDialogoVisualizacion } = dialogoManager;
  const { handleEsCargaModulo } = useSistema();

  return (
    <section className="contenedor-modulo">
      {handleEsCargaModulo() ? (
        <InventarioInmuebleSkeleton />
      ) : (
        <section className="contenedor-sub-modulo">
          <InventarioInmuebleFiltro />
          <TablaProvider
            datos={tabla.datos}
            campoId={tabla.campoId}
            itemSeleccionado={unidadAdministrativa || tipoBien}
          >
            <InventarioInmuebleTabla />
            {esDialogoVisualizacion() && <InventarioInmuebleForm />}
            {esDialogoModo(MODO_DIALOGO.HISTORIAL) && (
              <InventarioInmuebleHistorial />
            )}
            {esDialogoModo(MODO_DIALOGO.DEPRECIACION) && (
              <InventarioInmuebleDepreciacion />
            )}
          </TablaProvider>
        </section>
      )}
    </section>
  );
};

export default InventarioInmueble;
