import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import "@styles/RangoFechas.css";
import Calendario from "@components/utils/FormCampoCalendario";

const RangoFechas = (props) => {
  return (
    <Box className="contenedor-rango-fecha">
      <Calendario
        disabled={props.disabled}
        label="Desde"
        value={props.fechaInicio}
        onChange={props.setFechaInicio}
      />
      <Typography variant="subtitle1">-</Typography>
      <Calendario
        disabled={props.disabled}
        label="Hasta"
        value={props.fechaFin}
        onChange={props.setFechaFin}
      />
    </Box>
  );
};

RangoFechas.propTypes = {
  fechaInicio: PropTypes.any.isRequired,
  setFechaInicio: PropTypes.func.isRequired,
  fechaFin: PropTypes.any.isRequired,
  setFechaFin: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default RangoFechas;
