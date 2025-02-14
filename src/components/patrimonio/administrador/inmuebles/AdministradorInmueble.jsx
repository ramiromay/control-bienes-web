import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { MultiTablaProvider } from "../../../../context/MultiTablaContext";
import { IDS_SUBMODULOS } from "../../../../settings/sistemaConfig";
import AdministradorInmuebleFiltro from "./AdministradorInmuebleFiltro";
import AdministradorInmuebleSeguimiento from "./AdministradorInmuebleSeguimiento";
import { MODO_DIALOGO } from "../../../../settings/appConstants";
import { useSistema } from "../../../../context/SistemaContext";

import AdministradorInmuebleMultiTabla from "./AdministradorInmuebleMultiTabla";

import { useAdministradorInmueble } from "../../../../context/AdministradorInmuebleContext";
import AdministradorInmuebleSolicitudForm from "./forms/solicitud/AdministradorInmuebleSolicitudForm";
import AdministradorInmuebleAltaForm from "./forms/alta/AdministradorInmuebleAltaForm";
import AdministradorInmuebleModificacionForm from "./forms/modificacion/AdministradorInmuebleModificacionForm";
import AdministradorInmuebleBajaForm from "./forms/baja/AdministradorInmuebleBajaForm";
import AdministradorInmuebleSkeleton from "./AdministradorInmuebleSkeleton";

const AdministradorInmueble = () => {
  const { handleChangeModulo, handleEsCargaModulo } = useSistema();
  const {
    dialogoSolicitudes,
    dialogoTramites,
    handleCargarTramites,
    unidadAdministrativa,
    multiTabla,
  } = useAdministradorInmueble();

  useEffect(() => {
    handleChangeModulo({
      idSubModulo: IDS_SUBMODULOS.ADMINISTRADOR_CEDULAS_BIENES_INMUEBLES,
    });
  }, []);

  if (handleEsCargaModulo()) {
    return <AdministradorInmuebleSkeleton />;
  }

  return (
    <Box className="contenedor-sub-modulo">
      <AdministradorInmuebleFiltro />
      <MultiTablaProvider
        handleCargarDatosTabla={handleCargarTramites}
        unidadAdministrativa={unidadAdministrativa}
        multiTabla={multiTabla}
      >
        <AdministradorInmuebleMultiTabla />
        {dialogoSolicitudes.dialogo.abierto && (
          <AdministradorInmuebleSolicitudForm />
        )}
        {dialogoTramites.dialogo.abierto &&
          dialogoTramites.dialogo.modo === MODO_DIALOGO.SEGUIMIENTO && (
            <AdministradorInmuebleSeguimiento />
          )}
        {dialogoTramites.dialogo.abierto && (
          <>
            {(() => {
              const componentesPorRango = [
                {
                  rango: [56, 63],
                  componente: <AdministradorInmuebleAltaForm />,
                },
                {
                  rango: [64, 72],
                  componente: <AdministradorInmuebleBajaForm />,
                },
                {
                  rango: [73, 78],
                  componente: <AdministradorInmuebleModificacionForm />,
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

export default AdministradorInmueble;
