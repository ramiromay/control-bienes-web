import TablaProvider from "../../../../context/Tabla/TablaProvider";
import { useSistema } from "../../../../context/SistemaContext";
import InventarioVehiculoTabla from "./InventarioVehiculoTabla";
import InventarioVehiculoFiltro from "./InventarioVehiculoFiltro";
import { MODO_DIALOGO } from "../../../../settings/appConstants";
import InventarioVehiculoHistorial from "./InventarioVehiculoHistorial";
import { useInventarioVehiculo } from "../../../../context/InventarioVehiculoContext";
import InventarioVehiculoForm from "./forms/InventarioVehiculoForm";
import InventarioVehiculoSkeleton from "./InventarioVehiculoSkeleton";
import InventarioVehiculoDepreciacion from "./InventarioVehiculoDepreciacion";

const InventarioVehiculo = () => {
  const { tabla, unidadAdministrativa, tipoBien, dialogoManager } =
    useInventarioVehiculo();
  const { esDialogoModo, esDialogoVisualizacion } = dialogoManager;
  const { handleEsCargaModulo } = useSistema();

  return (
    <section className="contenedor-modulo">
      {handleEsCargaModulo() ? (
        <InventarioVehiculoSkeleton />
      ) : (
        <section className="contenedor-sub-modulo">
          <InventarioVehiculoFiltro />
          <TablaProvider
            datos={tabla.datos}
            campoId={tabla.campoId}
            itemSeleccionado={unidadAdministrativa || tipoBien}
          >
            <InventarioVehiculoTabla />
            {esDialogoVisualizacion() && <InventarioVehiculoForm />}
            {esDialogoModo(MODO_DIALOGO.HISTORIAL) && (
              <InventarioVehiculoHistorial />
            )}
            {esDialogoModo(MODO_DIALOGO.DEPRECIACION) && (
              <InventarioVehiculoDepreciacion />
            )}
          </TablaProvider>
        </section>
      )}
    </section>
  );
};

export default InventarioVehiculo;
