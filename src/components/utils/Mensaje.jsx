import { PropTypes } from "prop-types";
import { Info } from "@mui/icons-material";
import { Box } from "@mui/material";

const Mensaje = ({
  icono = <Info color="primary" className="icon" />,
  mensaje = "default",
}) => {
  return (
    <aside className="Mensaje">
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {icono}
      </Box>
      <p className="message">{mensaje}</p>
    </aside>
  );
};

Mensaje.propTypes = {
  icono: PropTypes.node,
  mensaje: PropTypes.string,
};

export default Mensaje;
