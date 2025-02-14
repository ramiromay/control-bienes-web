import { PropTypes } from "prop-types";
import {
  TablaActionSeleccionado,
  TableActionNoSeleccioando,
} from "../../../utils";
import {
  AddBoxSharp,
  EditSharp,
  RefreshSharp,
  Send,
  VisibilitySharp,
} from "@mui/icons-material";
import Boton from "../../../utils/Boton";
import { useSistema } from "../../../../context/SistemaContext";
import { useAdministradorMueble } from "../../../../context/AdministradorMuebleContext";
import { useMultiTabla } from "../../../../context/MultiTablaContext";
import BotonMenu from "../../../utils/MenuButton";
import { mapArray } from "../../../../settings/utils";
import { compEtapaMappingRules } from "../../../../settings/mappingRulesConfig";
import useMenuEmergente from "../../../../context/MenuEnviar/useMenuEmergente";
import useTablaBotones from "../../../../context/useTablaBotones";
import { useState } from "react";
import { useAdministradorVehiculo } from "../../../../context/AdministradorVehiculoContext";

const AdministradorVehiculoSolicitudActions = ({
  filaSeleccionada,
  columnas,
  titulo,
}) => {
  const {
    unidadAdministrativa,
    multiTabla,
    dialogoSolicitudes,
    handleGetSolicitudesMuebles,
    handleGetEtapaPorSolicitud,
    handleCambiarEtapaSolicitudMueble,
    handleValidarSolicitudPermiteModificacion,
  } = useAdministradorVehiculo();
  const {
    addDatosTablaSuperior,
    resetearTablaInferior,
    iniciarCargaTablas,
    finalizarCargaTablas,
  } = multiTabla;
  const {
    handleAbrirDialogoCreacion,
    handleAbrirDialogoModificacion,
    handleAbrirDialogoVisualizacion,
  } = dialogoSolicitudes;
  const {
    cargandoBotones,
    handleIniciarCargaBotonEnviar,
    handleIniciarCargaBotonModificacion,
    handleFinalizarCargaBotonEnviar,
    handleFinalizarCargaBotonModificacion,
    existenBotonesCargando,
  } = useTablaBotones();
  const { handleError } = useSistema();
  const { handleQuitarSeleccion } = useMultiTabla();
  const { tablaSuperior, informacionTablaSuperior } = filaSeleccionada;
  const { anchorEl, handleCerrarMenu, handleAbrirMenu } = useMenuEmergente();
  const [opcionesMenu, setOpcionesMenu] = useState([]);
  const bloquearBotones = columnas.length === 0 || existenBotonesCargando();

  const onClickNuevo = () => {
    handleAbrirDialogoCreacion();
  };

  const onClickActualizar = () => {
    iniciarCargaTablas();
    handleGetSolicitudesMuebles()
      .then((solicitudes) => {
        addDatosTablaSuperior(solicitudes);
        resetearTablaInferior();
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        finalizarCargaTablas();
      });
  };

  const onClickEnviar = (currentTarget) => {
    handleIniciarCargaBotonEnviar();
    handleGetEtapaPorSolicitud({ filaSeleccionada: tablaSuperior })
      .then((etapaData) => {
        const etapas = mapArray(etapaData, compEtapaMappingRules);
        setOpcionesMenu(etapas);
        handleAbrirMenu(currentTarget);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        handleFinalizarCargaBotonEnviar();
      });
  };

  const handleOnClickItemEnviar = (etapa) => {
    handleCerrarMenu();
    handleIniciarCargaBotonEnviar();
    handleCambiarEtapaSolicitudMueble({
      filaSeleccionada: tablaSuperior,
      etapa: etapa,
    })
      .then(() => {
        handleQuitarSeleccion();
        onClickActualizar();
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        handleFinalizarCargaBotonEnviar();
      });
  };

  const onClickModificar = () => {
    handleIniciarCargaBotonModificacion();
    handleValidarSolicitudPermiteModificacion({
      filaSeleccionada: tablaSuperior,
    })
      .then((permiteModificacion) => {
        if (permiteModificacion) {
          handleAbrirDialogoModificacion();
        }
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        handleFinalizarCargaBotonModificacion();
      });
  };

  const onClickVisualizar = () => {
    handleAbrirDialogoVisualizacion();
  };

  return tablaSuperior.length === 0 ? (
    <TableActionNoSeleccioando titulo={titulo} hasError={bloquearBotones}>
      <Boton
        icono={<AddBoxSharp />}
        texto="Nuevo"
        accion={onClickNuevo}
        disabled={bloquearBotones}
        cargando={cargandoBotones.creacion}
      />
      <Boton
        icono={<RefreshSharp />}
        texto="Actualizar"
        accion={onClickActualizar}
        disabled={bloquearBotones || unidadAdministrativa.length == 0}
      />
    </TableActionNoSeleccioando>
  ) : (
    <TablaActionSeleccionado
      titulo="1 solicitud seleccionada"
      handleQuitarSeleccion={handleQuitarSeleccion}
    >
      <Boton
        icono={<VisibilitySharp />}
        texto="Visualizar"
        accion={onClickVisualizar}
        disabled={bloquearBotones}
        cargando={cargandoBotones.visualizacion}
      />
      <Boton
        icono={<EditSharp />}
        texto="Modificar"
        accion={onClickModificar}
        disabled={bloquearBotones || informacionTablaSuperior.idEtapa !== 1}
        cargando={cargandoBotones.modificacion}
      />
      <BotonMenu
        anchorEl={anchorEl}
        icon={<Send />}
        label="Enviar"
        items={opcionesMenu}
        handleClickButton={onClickEnviar}
        handleClickItem={handleOnClickItemEnviar}
        handleClose={handleCerrarMenu}
        disabled={
          bloquearBotones ||
          informacionTablaSuperior.idEtapa === 8 ||
          informacionTablaSuperior.idEtapa === 6
        }
        cargando={cargandoBotones.enviar}
      />
    </TablaActionSeleccionado>
  );
};

AdministradorVehiculoSolicitudActions.propTypes = {
  filaSeleccionada: PropTypes.object,
  columnas: PropTypes.array,
  titulo: PropTypes.string,
};

export default AdministradorVehiculoSolicitudActions;
