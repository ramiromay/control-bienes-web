import { PropTypes } from "prop-types";
import { Box,Typography } from "@mui/material";
import "@styles/TituloSeccion.css";

const EncabezadoSeccion = ({ icono = null, titulo }) => {
  return (
    <>
      <Box className="contenedor-titulo-seccion">
        {icono}
        <Typography className="texto-seccion" variant="h4">
          {titulo}
        </Typography>
      </Box>
    </>
  );
};

EncabezadoSeccion.propTypes = {
  icono: PropTypes.element,
  titulo: PropTypes.string.isRequired,
};

export default EncabezadoSeccion;
