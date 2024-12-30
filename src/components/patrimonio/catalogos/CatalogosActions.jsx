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
import { useCatalogo } from "../../../context/CatalogoContext";
import { useSistema } from "../../../context/SistemaContext";
import { MODO_CARGA } from "../../../settings/appConstants";

const CatalogosActions = () => {
  const {
    handleDobleClicCatalogo,
    handleInvertirEstado,
    tabla,
    handleAbrirDialogoCreacion,
    handleAbrirDialogoModificacion,
    handleAbrirDialogoVisualizacion,
  } = useCatalogo();
  const { filaSeleccionadaData, filaSeleccionada, handleQuitarSeleccion } =
    useTabla();
  const { handleProcesos } = useSistema();
  const hasError = tabla.titulo === "Titulo";

  const onClickNuevo = () => {
    handleAbrirDialogoCreacion();
  };

  const onClickActualizar = async () => {
    handleProcesos(
      [handleDobleClicCatalogo],
      MODO_CARGA.DATOS
    );
  };

  const onClickInvertirEstado = async () => {
    handleQuitarSeleccion();
    handleProcesos(
      [async () => handleInvertirEstado(filaSeleccionada[0])],
      MODO_CARGA.DATOS
    );
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

CatalogosActions.propTypes = {
  titulo: PropTypes.string,
  handleQuitarSeleccion: PropTypes.func,
};

export default CatalogosActions;
