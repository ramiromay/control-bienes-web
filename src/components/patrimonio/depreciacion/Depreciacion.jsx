import React from "react";
import { useSistema } from "../../../context/SistemaContext";
import { useDepreciacion } from "../../../context/DepreciacionContext";
import InventarioInmuebleSkeleton from "../inventario/inmueble/InventarioInmuebleSkeleton";
import DepreciacionFiltro from "./DepreciacionFiltro";
import TablaProvider from "../../../context/Tabla/TablaProvider";
import DepreciacionTabla from "./DepreciacionTabla";
import { Backdrop } from "@mui/material";
import { MODO_DIALOGO } from "../../../settings/appConstants";
import DepreciacionAplicar from "./DepreciacionAplicar";
import DepreciacionSkeleton from "./DepreciacionSkeleton";

const Depreciacion = () => {
  const { tabla, unidadAdministrativa, dialogoManager } = useDepreciacion();
  const { esDialogoModo } = dialogoManager;
  const { handleEsCargaModulo } = useSistema();

  return (
    <section className="contenedor-modulo">
      {handleEsCargaModulo() ? (
        <DepreciacionSkeleton />
      ) : (
        <section className="contenedor-sub-modulo">
          <DepreciacionFiltro />
          <TablaProvider
            datos={tabla.datos}
            campoId={tabla.campoId}
            itemSeleccionado={unidadAdministrativa}
          >
            <DepreciacionTabla />
          </TablaProvider>
          {esDialogoModo(MODO_DIALOGO.DEPRECIACION) && <DepreciacionAplicar />}
        </section>
      )}
    </section>
  );
};

export default Depreciacion;
