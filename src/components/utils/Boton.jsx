import { PropTypes } from "prop-types";
import { Button } from "@mui/material";

const Boton = ({
  icono = null,
  texto = "",
  accion = null,
  variante = "text",
  desactivarMargenDerecho = false,
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
      startIcon={icono}
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
