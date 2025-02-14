import { PropTypes } from "prop-types";
import {
  TablaActionSeleccionado,
  TableActionNoSeleccioando,
} from "../../../utils";
import {
  AddBoxSharp,
  ContentPasteSearch,
  EditSharp,
  RefreshSharp,
  Send,
  VisibilitySharp,
} from "@mui/icons-material";
import Boton from "../../../utils/Boton";
import { useSistema } from "../../../../context/SistemaContext";
import { useAdministradorMueble } from "../../../../context/AdministradorMuebleContext";
import { useState } from "react";
import useMenuEmergente from "../../../../context/MenuEnviar/useMenuEmergente";
import { useMultiTabla } from "../../../../context/MultiTablaContext";
import useTablaBotones from "../../../../context/useTablaBotones";
import BotonMenu from "../../../utils/MenuButton";
import { mapArray } from "../../../../settings/utils";
import { MODO_DIALOGO } from "../../../../settings/appConstants";
import { compEtapaMappingRules } from "../../../../settings/mappingRulesConfig";

const AdministradorSolicitudesMueblesTramitesActions = ({
  filaSeleccionada,
  columnas,
  titulo,
}) => {
  const {
    tablaSuperior,
    tablaInferior,
    informacionTablaSuperior,
    informacionTablaInferior,
  } = filaSeleccionada;
  const {
    multiTabla,
    dialogoTramites,
    handleGetTramitesMueblePorSolicitud,
    handleGetEtapasPorTramite,
    handleCambiarEtapaTramiteMueble,
  } = useAdministradorMueble();
  const {
    addDatosTablaInferior,
    iniciarCargaTablaInferior,
    finalizarCargaTablaInferior,
  } = multiTabla;
  const {
    handleAbrirDialogo,
    handleAbrirDialogoCreacion,
    handleAbrirDialogoModificacion,
    handleAbrirDialogoVisualizacion,
  } = dialogoTramites;
  const {
    cargandoBotones,
    handleIniciarCargaBotonEnviar,
    handleFinalizarCargaBotonEnviar,
    existenBotonesCargando,
  } = useTablaBotones();
  const { handleError } = useSistema();
  const { handleQuitarSeleccionTablaInferior } = useMultiTabla();
  const { anchorEl, handleCerrarMenu, handleAbrirMenu } = useMenuEmergente();
  const [opcionesMenu, setOpcionesMenu] = useState([]);
  const bloquearBotones =
    columnas.length === 0 ||
    existenBotonesCargando() ||
    tablaSuperior.length === 0;

  const onClickNuevo = () => {
    handleAbrirDialogoCreacion(informacionTablaSuperior.idMotivoTramite);
  };

  const onClickActualizar = () => {
    iniciarCargaTablaInferior();
    handleGetTramitesMueblePorSolicitud({ filaSeleccionada: tablaSuperior })
      .then((tramites) => {
        addDatosTablaInferior(tramites);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        finalizarCargaTablaInferior();
      });
  };

  const onClickEnviar = (currentTarget) => {
    handleIniciarCargaBotonEnviar();
    handleGetEtapasPorTramite({ filaSeleccionada: tablaInferior })
      .then((etapaData) => {
        console.log(etapaData);
        const etapas = mapArray(etapaData, compEtapaMappingRules);
        setOpcionesMenu(etapas);
        handleAbrirMenu(currentTarget);
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
      })
      .finally(() => {
        handleFinalizarCargaBotonEnviar();
      });
  };

  const handleOnClickItemEnviar = (etapa) => {
    handleCerrarMenu();
    handleIniciarCargaBotonEnviar();
    handleCambiarEtapaTramiteMueble({
      filaSeleccionada: tablaInferior,
      etapa: etapa,
    })
      .then(() => {
        handleQuitarSeleccionTablaInferior();
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
    handleAbrirDialogoModificacion(informacionTablaSuperior.idMotivoTramite);
  };

  const onClickVisualizar = () => {
    handleAbrirDialogoVisualizacion(informacionTablaSuperior.idMotivoTramite);
  };

  const onClicSeguimiento = () => {
    handleAbrirDialogo(MODO_DIALOGO.SEGUIMIENTO);
  };

  return tablaInferior.length === 0 ? (
    <TableActionNoSeleccioando titulo={titulo} hasError={bloquearBotones}>
      <Boton
        icono={<AddBoxSharp />}
        texto="Nuevo"
        accion={onClickNuevo}
        disabled={
          bloquearBotones ||
          informacionTablaSuperior.idEtapa === 1 ||
          informacionTablaSuperior.idEtapa === 8 ||
          informacionTablaSuperior.idEtapa === 6
        }
        cargando={cargandoBotones.creacion}
      />
      <Boton
        icono={<RefreshSharp />}
        texto="Actualizar"
        accion={onClickActualizar}
        disabled={bloquearBotones || informacionTablaSuperior.idEtapa === 1}
      />
    </TableActionNoSeleccioando>
  ) : (
    <TablaActionSeleccionado
      titulo="1 trámite seleccionado"
      handleQuitarSeleccion={handleQuitarSeleccionTablaInferior}
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
        disabled={
          bloquearBotones ||
          informacionTablaSuperior.idEtapa === 8 ||
          informacionTablaSuperior.idEtapa === 6 ||
          informacionTablaInferior.etapa !== "Captura Inicial"
        }
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
          informacionTablaSuperior.idEtapa === 6 ||
          informacionTablaInferior.etapa === "Rechazo" ||
          informacionTablaInferior.etapa === "VOBO"
        }
        cargando={cargandoBotones.enviar}
      />
      <Boton
        icono={<ContentPasteSearch />}
        texto="Seguimiento"
        accion={onClicSeguimiento}
        disabled={bloquearBotones}
      />
    </TablaActionSeleccionado>
  );
};

AdministradorSolicitudesMueblesTramitesActions.propTypes = {
  filaSeleccionada: PropTypes.object,
  columnas: PropTypes.array,
  titulo: PropTypes.string,
};

export default AdministradorSolicitudesMueblesTramitesActions;
