import { PropTypes } from "prop-types";
import { Box,Typography } from "@mui/material";
import "@styles/TituloSeccion.css";

const Seccion = ({ icono, titulo, children }) => {
  return (
    <>
      <Box className="contenedor-titulo-seccion">
        {icono}
        <Typography className="texto-seccion" variant="subtitle1">
          {titulo}
        </Typography>
      </Box>
      {children}
    </>
  );
};

Seccion.propTypes = {
  icono: PropTypes.element,
  titulo: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Seccion.defaultValues = {
  icon: null,
};

export default Seccion;
