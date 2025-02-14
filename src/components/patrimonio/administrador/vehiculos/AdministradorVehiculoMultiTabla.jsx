import { Tabla } from "../../../utils";
import TablaSkeleton from "../../../utils/TablaSkeleton";
import AdministradorVehiculoSolicitudActions from "./AdministradorVehiculoSolicitudActions";
import { useAdministradorMueble } from "../../../../context/AdministradorMuebleContext";
import AdministradorVehiculoTramiteActions from "./AdministradorVehiculoTramiteActions";
import { useMultiTabla } from "../../../../context/MultiTablaContext";
import { useAdministradorVehiculo } from "../../../../context/AdministradorVehiculoContext";

const AdministradorVehiculoMultiTabla = () => {
  const { multiTabla } = useAdministradorVehiculo();
  const { tablaSuperior, tablaInferior, cargando } = multiTabla;
  const {
    filaSeleccionada,
    handleSeleccionarTablaSuperior,
    handleSeleccionarTablaInferior,
  } = useMultiTabla();

  return (
    <section className="contenedor-multi-tabla">
      {cargando.tablaSuperior ? (
        <TablaSkeleton />
      ) : (
        <>
          <Tabla
            columnas={tablaSuperior.columnas}
            datos={tablaSuperior.datos}
            filaSeleccionada={filaSeleccionada.tablaSuperior}
            handleFilaSeleccionada={handleSeleccionarTablaSuperior}
            orderBy={tablaSuperior.campoId}
            cargando={cargando.tablaSuperior}
            componenteActions={
              <AdministradorVehiculoSolicitudActions
                filaSeleccionada={filaSeleccionada}
                columnas={tablaSuperior.columnas}
                titulo={tablaSuperior.titulo}
              />
            }
          />
        </>
      )}
      {cargando.tablaInferior ? (
        <TablaSkeleton />
      ) : (
        <Tabla
          columnas={tablaInferior.columnas}
          datos={tablaInferior.datos}
          filaSeleccionada={filaSeleccionada.tablaInferior}
          handleFilaSeleccionada={handleSeleccionarTablaInferior}
          orderBy={tablaInferior.campoId}
          cargando={cargando.tablaInferior}
          componenteActions={
            <AdministradorVehiculoTramiteActions
              filaSeleccionada={filaSeleccionada}
              columnas={tablaInferior.columnas}
              titulo={tablaInferior.titulo}
            />
          }
        />
      )}
    </section>
  );
};

export default AdministradorVehiculoMultiTabla;
