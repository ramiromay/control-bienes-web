import {
  Boton,
  TablaActionSeleccionado,
  TableActionNoSeleccioando,
} from "@components/utils";
import {
  AddBoxSharp,
  AssignmentOutlined,
  AssignmentSharp,
  Close,
  Done,
  EditSharp,
  PriceChangeSharp,
  RefreshSharp,
  VisibilitySharp,
} from "@mui/icons-material";
import { PropTypes } from "prop-types";
import useTabla from "@context/Tabla/useTabla";
import { MODO_DIALOGO } from "../../../../settings/appConstants";
import { useInventarioVehiculo } from "../../../../context/InventarioVehiculoContext";

const InventarioVehiculoActions = () => {
  const { tabla, dialogoManager, handleGetBienesVehiculos } =
    useInventarioVehiculo();
  const { handleAbrirDialogoVisualizacion, handleAbrirDialogo } =
    dialogoManager;
  const { filaSeleccionada, handleQuitarSeleccion } = useTabla();

  const onClickActualizar = async () => {
    handleGetBienesVehiculos();
  };

  const onClickHistorial = async () => {
    handleAbrirDialogo(MODO_DIALOGO.HISTORIAL);
  };

  const onClickDepreciaciones = async () => {
    handleAbrirDialogo(MODO_DIALOGO.DEPRECIACION);
  };

  const onClickVisualizar = async () => {
    handleAbrirDialogoVisualizacion();
  };

  return filaSeleccionada.length === 0 ? (
    <TableActionNoSeleccioando titulo={tabla.titulo} hasError={false}>
      <Boton
        icono={<RefreshSharp />}
        texto="Actualizar"
        accion={onClickActualizar}
      />
    </TableActionNoSeleccioando>
  ) : (
    <TablaActionSeleccionado
      titulo="1 bien seleccionado"
      handleQuitarSeleccion={handleQuitarSeleccion}
    >
      <Boton
        icono={<VisibilitySharp />}
        texto="Visualizar"
        accion={onClickVisualizar}
      />
      <Boton
        icono={<AssignmentSharp />}
        texto="Historial"
        accion={onClickHistorial}
      />
      <Boton
        icono={<PriceChangeSharp />}
        texto="Depreciaciones"
        accion={onClickDepreciaciones}
      />
    </TablaActionSeleccionado>
  );
};

InventarioVehiculoActions.propTypes = {
  titulo: PropTypes.string,
  handleQuitarSeleccion: PropTypes.func,
};

export default InventarioVehiculoActions;
