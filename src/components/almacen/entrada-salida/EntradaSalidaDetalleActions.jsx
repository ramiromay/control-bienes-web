import { PropTypes } from "prop-types";
import { TableActionNoSeleccioando } from "../../utils";

const EntradaSalidaDetalleActions = ({
  filaSeleccionada,
  columnas,
  titulo,
}) => {
  const { tablaSuperior } = filaSeleccionada;
  const bloquearBotones = columnas.length === 0 || tablaSuperior.length === 0;

  return (
    <TableActionNoSeleccioando titulo={titulo} hasError={bloquearBotones} />
  );
};

EntradaSalidaDetalleActions.propTypes = {
  filaSeleccionada: PropTypes.object,
  columnas: PropTypes.array,
  titulo: PropTypes.string,
};

export default EntradaSalidaDetalleActions;
