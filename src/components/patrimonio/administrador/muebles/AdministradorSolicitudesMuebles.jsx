import AdministradorSolicitudesMueblesFiltro from "./AdministradorSolicitudesMueblesFiltro";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSistema } from "../../../../context/SistemaContext";
import {
  IDS_SUBMODULOS,
  TIPOS_TRAMITES,
} from "../../../../settings/sistemaConfig";
import { useAdministradorMueble } from "../../../../context/AdministradorMuebleContext";
import AdministradorSolicitudesMueblesMultiTabla from "./AdministradorSolicitudesMueblesMultiTabla";
import { MultiTablaProvider } from "../../../../context/MultiTablaContext";
import AdministradorMuebleSolicitudForm from "./forms/solicitud/AdministradorMuebleSolicitudForm";
import AdministradorMuebleAltaForm from "./forms/alta/AdministradorMuebleAltaForm";
import AdministradorMuebleBajaForm from "./forms/baja/AdministradorMuebleBajaForm";
import AdministradorMuebleMovimientoForm from "./forms/movimiento/AdministradorMuebleMovimientoForm";
import AdministradorMuebleDesincorporacionForm from "./forms/desincorporacion/AdministradorMuebleDesincorporacionForm";
import AdministradorMuebleDestinoFinalForm from "./forms/destino-final/AdministradorMuebleDestinoFinalForm";
import AdministradorMuebleModificacionForm from "./forms/modificacion/AdministradorMuebleModificacionForm";
import { MODO_DIALOGO } from "../../../../settings/appConstants";
import AdministradorMuebleSeguimiento from "./AdministradorMuebleSeguimiento";
import AdministradorMuebleSkeleton from "./AdministradorMuebleSkeleton";

const AdministradorSolicitudesMuebles = () => {
  const { handleChangeModulo, handleEsCargaModulo } = useSistema();
  const {
    dialogoSolicitudes,
    dialogoTramites,
    handleCargarTramites,
    unidadAdministrativa,
    multiTabla,
  } = useAdministradorMueble();

  useEffect(() => {
    handleChangeModulo({
      idSubModulo: IDS_SUBMODULOS.ADMINISTRADOR_CEDULAS_BIENES_MUEBLES,
    });
  }, []);

  if (handleEsCargaModulo()) {
    return <AdministradorMuebleSkeleton />;
  }

  return (
    <Box className="contenedor-sub-modulo">
      <AdministradorSolicitudesMueblesFiltro />
      <MultiTablaProvider
        handleCargarDatosTabla={handleCargarTramites}
        unidadAdministrativa={unidadAdministrativa}
        multiTabla={multiTabla}
      >
        <AdministradorSolicitudesMueblesMultiTabla />
        {dialogoSolicitudes.dialogo.abierto && (
          <AdministradorMuebleSolicitudForm />
        )}
        {dialogoTramites.dialogo.abierto &&
          dialogoTramites.dialogo.modo === MODO_DIALOGO.SEGUIMIENTO && (
            <AdministradorMuebleSeguimiento />
          )}
        {dialogoTramites.dialogo.abierto && (
          <>
            {(() => {
              const componentesPorRango = [
                {
                  rango: [1, 11], // Rango de IDs (1 al 11)
                  componente: <AdministradorMuebleAltaForm />,
                },
                {
                  rango: [12, 20], // Rango de IDs (12 al 20)
                  componente: <AdministradorMuebleBajaForm />,
                },
                {
                  rango: [21, 23], // Rango de IDs (51 al 60)
                  componente: <AdministradorMuebleModificacionForm />,
                },
                {
                  rango: [24, 26], // Rango de IDs (21 al 30)
                  componente: <AdministradorMuebleMovimientoForm />,
                },
                {
                  rango: [27, 27], // Rango de IDs (31 al 40)
                  componente: <AdministradorMuebleDesincorporacionForm />,
                },
                {
                  rango: [28, 29], // Rango de IDs (41 al 50)
                  componente: <AdministradorMuebleDestinoFinalForm />,
                },
              ];

              const obtenerComponentePorRango = (id) => {
                const elemento = componentesPorRango.find(
                  ({ rango }) => id >= rango[0] && id <= rango[1]
                );
                return elemento ? elemento.componente : null;
              };
              // Ejemplo de uso
              return obtenerComponentePorRango(dialogoTramites.dialogo.id);
            })()}
          </>
        )}
      </MultiTablaProvider>
      {}
    </Box>
  );
};

export default AdministradorSolicitudesMuebles;
