import { useState } from "react";
import { useEntradaSalida } from "../../../context/EntradaSalidaContext";
import useMenuEmergente from "../../../context/MenuEnviar/useMenuEmergente";
import { useMultiTabla } from "../../../context/MultiTablaContext";
import { useSistema } from "../../../context/SistemaContext";
import useTablaBotones from "../../../context/useTablaBotones";
import { mapArray } from "../../../settings/utils";
import { compEtapaMappingRules } from "../../../settings/mappingRulesConfig";
import {
  Boton,
  TablaActionSeleccionado,
  TableActionNoSeleccioando,
} from "../../utils";
import {
  AddBoxSharp,
  EditSharp,
  RefreshSharp,
  Send,
  VisibilitySharp,
} from "@mui/icons-material";
import BotonMenu from "../../utils/MenuButton";
import PropTypes from "prop-types";

const EntradaSalidaMovimientoActions = ({
  filaSeleccionada,
  columnas,
  titulo,
}) => {
  const {
    almacen,
    multiTabla,
    dialogoBienes,
    handleGetMovimientos,
    handleGetEtapaPorMovimiento,
    handleCambiarEtapaMovimeinto,
  } = useEntradaSalida();
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
  } = dialogoBienes;
  const {
    cargandoBotones,
    handleIniciarCargaBotonEnviar,
    handleFinalizarCargaBotonEnviar,
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
    handleGetMovimientos()
      .then((movimientos) => {
        addDatosTablaSuperior(movimientos);
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
    handleGetEtapaPorMovimiento({ filaSeleccionada: tablaSuperior })
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
    handleCambiarEtapaMovimeinto({
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
    handleAbrirDialogoModificacion();
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
        disabled={bloquearBotones || almacen.length == 0}
      />
    </TableActionNoSeleccioando>
  ) : (
    <TablaActionSeleccionado
      titulo="1 movimiento seleccionado"
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
          informacionTablaSuperior.idEtapa === 6 ||
          informacionTablaSuperior.idEtapa === 8
        }
        cargando={cargandoBotones.enviar}
      />
    </TablaActionSeleccionado>
  );
};

EntradaSalidaMovimientoActions.propTypes = {
  filaSeleccionada: PropTypes.object,
  columnas: PropTypes.array,
  titulo: PropTypes.string,
};

export default EntradaSalidaMovimientoActions;
