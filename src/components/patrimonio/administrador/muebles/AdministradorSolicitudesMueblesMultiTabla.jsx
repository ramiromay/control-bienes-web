import { Tabla } from "../../../utils";
import TablaSkeleton from "../../../utils/TablaSkeleton";
import AdministradorSolicitudesMueblesActions from "./AdministradorSolicitudesMueblesActions";
import { useAdministradorMueble } from "../../../../context/AdministradorMuebleContext";
import AdministradorSolicitudesMueblesTramitesActions from "./AdministradorSolicitudesMueblesTramitesActions";
import { useMultiTabla } from "../../../../context/MultiTablaContext";

const AdministradorSolicitudesMueblesMultiTabla = () => {
  const { multiTabla } = useAdministradorMueble();
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
              <AdministradorSolicitudesMueblesActions
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
            <AdministradorSolicitudesMueblesTramitesActions
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

export default AdministradorSolicitudesMueblesMultiTabla;
