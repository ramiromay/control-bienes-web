import { PropTypes } from "prop-types";
import { CloseSharp } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

const TablaActionSeleccionado = ({
  children,
  titulo = "1 registro seleccionado",
  handleQuitarSeleccion,
}) => {
  return (
    <Box className="contenedor-action-seleccionado">
      <IconButton onClick={handleQuitarSeleccion}>
        <CloseSharp color="primary" />
      </IconButton>
      <Typography className="titulo-contenedor-action" variant="subtitle1">
        {titulo}
      </Typography>
      <Box className="botones-contenedor-action">
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

TablaActionSeleccionado.propTypes = {
  children: PropTypes.node,
  titulo: PropTypes.string,
  handleQuitarSeleccion: PropTypes.func,
};

export default TablaActionSeleccionado;
