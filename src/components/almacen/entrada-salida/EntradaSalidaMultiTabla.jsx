import { useEntradaSalida } from "../../../context/EntradaSalidaContext";
import { useMultiTabla } from "../../../context/MultiTablaContext";
import { Tabla } from "../../utils";
import TablaSkeleton from "../../utils/TablaSkeleton";
import EntradaSalidaDetalleActions from "./EntradaSalidaDetalleActions";
import EntradaSalidaMovimientoActions from "./EntradaSalidaMovimientoActions";

const EntradaSalidaMultiTabla = () => {
  const { multiTabla } = useEntradaSalida();
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
              <EntradaSalidaMovimientoActions
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
            <EntradaSalidaDetalleActions
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

export default EntradaSalidaMultiTabla;
