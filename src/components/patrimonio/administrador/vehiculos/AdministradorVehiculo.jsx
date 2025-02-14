import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { MultiTablaProvider } from "../../../../context/MultiTablaContext";
import { IDS_SUBMODULOS } from "../../../../settings/sistemaConfig";
import AdministradorVehiculoFiltro from "./AdministradorVehiculoFiltro";
import AdministradorVehiculoSeguimiento from "./AdministradorVehiculoSeguimiento";
import { MODO_DIALOGO } from "../../../../settings/appConstants";
import { useSistema } from "../../../../context/SistemaContext";
import { useAdministradorVehiculo } from "../../../../context/AdministradorVehiculoContext";
import AdministradorVehiculoSolicitudForm from "./forms/solicitud/AdministradorVehiculoSolicitudForm";
import AdministradorVehiculoMultiTabla from "./AdministradorVehiculoMultiTabla";
import AdministradorVehiculoAltaForm from "./forms/alta/AdministradorVehiculoAltaForm";
import AdministradorVehiculoModificacionForm from "./forms/modificacion/AdministradorVehiculoModificiacionForm";
import AdministradorVehiculoBajaForm from "./forms/baja/AdministradorVehiculoBajaForm";
import AdministradorVehicuoMovimientoForm from "./forms/movimiento/AdministradorVehiculoMovimientoForm";
import AdministradorVehiculoDesincorporacionForm from "./forms/desincorporacion/AdministradorVehiculoDesincorporacionForm";
import AdministradorVehiculoDestinoFinalForm from "./forms/destino-final/AdministradorVehiculoDestinoFinalForm";
import AdministradorVehiculoSkeleton from "./AdministradorVehiculoSkeleton";

const AdministradorVehiculo = () => {
  const { handleChangeModulo, handleEsCargaModulo } = useSistema();
  const {
    dialogoSolicitudes,
    dialogoTramites,
    handleCargarTramites,
    unidadAdministrativa,
    multiTabla,
  } = useAdministradorVehiculo();

  useEffect(() => {
    handleChangeModulo({
      idSubModulo: IDS_SUBMODULOS.ADMINISTRADOR_CEDULAS_BIENES_VEHICULARES,
    });
  }, []);

  if (handleEsCargaModulo()) {
    return <AdministradorVehiculoSkeleton />;
  }

  return (
    <Box className="contenedor-sub-modulo">
      <AdministradorVehiculoFiltro />
      <MultiTablaProvider
        handleCargarDatosTabla={handleCargarTramites}
        unidadAdministrativa={unidadAdministrativa}
        multiTabla={multiTabla}
      >
        <AdministradorVehiculoMultiTabla />
        {dialogoSolicitudes.dialogo.abierto && (
          <AdministradorVehiculoSolicitudForm />
        )}
        {dialogoTramites.dialogo.abierto &&
          dialogoTramites.dialogo.modo === MODO_DIALOGO.SEGUIMIENTO && (
            <AdministradorVehiculoSeguimiento />
          )}
        {dialogoTramites.dialogo.abierto && (
          <>
            {(() => {
              const componentesPorRango = [
                {
                  rango: [30, 38],
                  componente: <AdministradorVehiculoAltaForm />,
                },
                {
                  rango: [39, 46],
                  componente: <AdministradorVehiculoBajaForm />,
                },
                {
                  rango: [47, 49],
                  componente: <AdministradorVehiculoModificacionForm />,
                },
                {
                  rango: [50, 52],
                  componente: <AdministradorVehicuoMovimientoForm />,
                },
                {
                  rango: [53, 53],
                  componente: <AdministradorVehiculoDesincorporacionForm />,
                },
                {
                  rango: [54, 55],
                  componente: <AdministradorVehiculoDestinoFinalForm />,
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

export default AdministradorVehiculo;
