import { CurrencyExchange } from "@mui/icons-material";
import { useDepreciacion } from "../../../context/DepreciacionContext";
import useTabla from "../../../context/Tabla/useTabla";
import { MODO_DIALOGO } from "../../../settings/appConstants";
import { Boton, TableActionNoSeleccioando } from "../../utils";
import PropTypes from "prop-types";

const DepreciacionActions = () => {
  const { tabla, handleValidarDepreciacion } = useDepreciacion();

  const onClickEjecutar = async () => {
    handleValidarDepreciacion();
  };

  return (
    <TableActionNoSeleccioando titulo={tabla.titulo} hasError={false}>
      <Boton
        icono={<CurrencyExchange />}
        texto="Ejecutar"
        accion={onClickEjecutar}
      />
    </TableActionNoSeleccioando>
  );
};

DepreciacionActions.propTypes = {
  titulo: PropTypes.string,
  handleQuitarSeleccion: PropTypes.func,
};

export default DepreciacionActions;
