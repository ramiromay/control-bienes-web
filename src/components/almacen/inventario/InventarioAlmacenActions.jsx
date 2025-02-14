import {
  AssignmentSharp,
  PriceChangeSharp,
  RefreshSharp,
  VisibilitySharp,
} from "@mui/icons-material";
import { useInventarioAlmacen } from "../../../context/InventarioAlmacenContext";
import useTabla from "../../../context/Tabla/useTabla";
import { MODO_DIALOGO } from "../../../settings/appConstants";
import {
  Boton,
  TablaActionSeleccionado,
  TableActionNoSeleccioando,
} from "../../utils";
import PropTypes from "prop-types";

const InventarioAlmacenActions = () => {
  const { tabla, dialogoManager, handleGetBienesAlmacen } =
    useInventarioAlmacen();
  const { handleAbrirDialogoVisualizacion } = dialogoManager;
  const { filaSeleccionada, handleQuitarSeleccion } = useTabla();

  const onClickActualizar = async () => {
    handleGetBienesAlmacen();
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
    </TablaActionSeleccionado>
  );
};

InventarioAlmacenActions.propTypes = {
  titulo: PropTypes.string,
  handleQuitarSeleccion: PropTypes.func,
};

export default InventarioAlmacenActions;
