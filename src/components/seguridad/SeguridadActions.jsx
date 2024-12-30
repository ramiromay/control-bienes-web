import {
  Boton,
  TablaActionSeleccionado,
  TableActionNoSeleccioando,
} from "@components/utils";
import {
  AddBoxSharp,
  Close,
  Done,
  EditSharp,
  RefreshSharp,
  VisibilitySharp,
} from "@mui/icons-material";
import { PropTypes } from "prop-types";
import useTabla from "@context/Tabla/useTabla";
import { useSeguridad } from "../../context/SeguridadContext";

const SeguridadActions = () => {
  const {
    handleRefrescarListaEmpleados,
    handleInvertirEstadoEmpleado,
    tabla,
    handleAbrirDialogoCreacion,
    handleAbrirDialogoModificacion,
    handleAbrirDialogoVisualizacion,
  } = useSeguridad();
  const { filaSeleccionadaData, filaSeleccionada, handleQuitarSeleccion } =
    useTabla();
  const hasError = tabla.titulo === "Titulo";

  const onClickNuevo = async () => {
    handleAbrirDialogoCreacion();
  };

  const onClickActualizar = async () => {
    handleRefrescarListaEmpleados();
  };

  const onClickInvertirEstado = async () => {
    handleQuitarSeleccion();
    handleInvertirEstadoEmpleado(filaSeleccionada[0]);
  };

  const onClickModificar = async () => {
    await handleAbrirDialogoModificacion();
  };

  const onClickVisualizar = async () => {
    await handleAbrirDialogoVisualizacion();
  };

  return filaSeleccionada.length === 0 ? (
    <TableActionNoSeleccioando titulo={tabla.titulo} hasError={hasError}>
      <Boton
        icono={<AddBoxSharp />}
        texto="Nuevo"
        accion={onClickNuevo}
        disabled={hasError}
      />
      <Boton
        icono={<RefreshSharp />}
        texto="Actualizar"
        accion={onClickActualizar}
        disabled={hasError}
      />
    </TableActionNoSeleccioando>
  ) : (
    <TablaActionSeleccionado
      titulo="1 registro seleccionado"
      handleQuitarSeleccion={handleQuitarSeleccion}
    >
      <Boton
        icono={<VisibilitySharp />}
        texto="Visualizar"
        accion={onClickVisualizar}
        disabled={hasError}
      />
      <Boton
        icono={<EditSharp />}
        texto="Modificar"
        accion={onClickModificar}
        disabled={hasError}
      />
      <Boton
        icono={filaSeleccionadaData.activo ? <Close /> : <Done />}
        texto={filaSeleccionadaData.activo ? "Inactivar" : "Activar"}
        accion={onClickInvertirEstado}
        disabled={hasError}
      />
    </TablaActionSeleccionado>
  );
};

SeguridadActions.propTypes = {
  titulo: PropTypes.string,
  handleQuitarSeleccion: PropTypes.func,
};

export default SeguridadActions;
