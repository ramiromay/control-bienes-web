import { useInventarioAlmacen } from "../../../context/InventarioAlmacenContext";
import { useSistema } from "../../../context/SistemaContext";
import TablaProvider from "../../../context/Tabla/TablaProvider";
import InventarioAlmacenForm from "./forms/InventarioAlmacenForm";
import InventarioAlmacenFiltro from "./InventarioAlmacenFiltro";
import InventarioAlmacenSkeleton from "./InventarioAlmacenSkeleton";
import InventarioAlmacenTabla from "./InventarioAlmacenTabla";

const InventarioAlmacen = () => {
  const { tabla, unidadAdministrativa, tipoBien, dialogoManager } =
    useInventarioAlmacen();
  const { esDialogoVisualizacion } = dialogoManager;
  const { handleEsCargaModulo } = useSistema();

  return (
    <section className="contenedor-modulo">
      {handleEsCargaModulo() ? (
        <InventarioAlmacenSkeleton />
      ) : (
        <section className="contenedor-sub-modulo">
          <InventarioAlmacenFiltro />
          <TablaProvider
            datos={tabla.datos}
            campoId={tabla.campoId}
            itemSeleccionado={unidadAdministrativa || tipoBien}
          >
            <InventarioAlmacenTabla />
            {esDialogoVisualizacion() && <InventarioAlmacenForm />}
          </TablaProvider>
        </section>
      )}
    </section>
  );
};

export default InventarioAlmacen;
