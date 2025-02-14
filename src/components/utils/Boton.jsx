import { PropTypes } from "prop-types";
import { Button, CircularProgress } from "@mui/material";

const Boton = ({
  icono = null,
  texto = "",
  accion = null,
  variante = "text",
  desactivarMargenDerecho = false,
  cargando = false,
  ...props
}) => {
  return (
    <Button
      sx={{
        marginRight: desactivarMargenDerecho ? 0 : 2.5,
      }}
      className="texto-boton"
      size="small"
      variant={variante}
      color="primary"
      startIcon={cargando ? <CircularProgress size={18} /> :icono}
      onClick={accion}
      {...props}
    >
      {texto}
    </Button>
  );
};

Boton.propTypes = {
  icono: PropTypes.element,
  texto: PropTypes.string,
  variante: PropTypes.string,
  accion: PropTypes.func,
  desactivarMargenDerecho: PropTypes.bool,
};

export default Boton;
