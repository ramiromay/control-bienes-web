import { Tabla } from "../../../utils";
import TablaSkeleton from "../../../utils/TablaSkeleton";
import AdministradorInmuebleSolicitudActions from "./AdministradorInmuebleSolicitudActions";
import AdministradorInmuebleTramiteActions from "./AdministradorInmuebleTramiteActions";
import { useMultiTabla } from "../../../../context/MultiTablaContext";
import { useAdministradorInmueble } from "../../../../context/AdministradorInmuebleContext";

const AdministradorInmuebleMultiTabla = () => {
  const { multiTabla } = useAdministradorInmueble();
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
              <AdministradorInmuebleSolicitudActions
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
            <AdministradorInmuebleTramiteActions
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

export default AdministradorInmuebleMultiTabla;
