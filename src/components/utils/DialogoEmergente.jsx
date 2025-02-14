import { PropTypes } from "prop-types";
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import ContenedorCargando from "./ContenedorCargando";

const DialogoEmergente = ({
  children = null,
  titulo = "Información",
  width = "600px",
  cargando = false,
  abierto = false,
  disabledConfirmar = false,
  activateEspacioPie = false,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  onClickConfirmar = null,
  onClickCancelar = () => {},
}) => {
  return (
    <Dialog
      open={abierto}
      fullWidth
      PaperProps={{
        className: "contenedor-dialogo",
        sx: { minWidth: width, width: width },
      }}
    >
      <ContenedorCargando isLoading={cargando}>
        <form
          onSubmit={onClickConfirmar}
          noValidate
          className="contenido-dialogo"
        >
          <DialogTitle className="encabezado-dialogo compacto">
            <section className="seccion-encabezado">
              <Typography className="titulo-dialogo">{titulo}</Typography>
              <IconButton aria-label="cerrar" onClick={onClickCancelar}>
                <Close />
              </IconButton>
            </section>
          </DialogTitle>
          <DialogContent className="cuerpo-dialogo">{children}</DialogContent>
          <DialogActions
            className={`pie-dialogo ${activateEspacioPie ? "" : "compacto"}`}
          >
            <Button
              size="small"
              disabled={cargando}
              onClick={onClickCancelar}
              color="primary"
              variant="text"
            >
              {textoCancelar}
            </Button>
            {disabledConfirmar ? null : (
              <Button
                size="small"
                type="submit"
                color="primary"
                disabled={cargando}
                variant="contained"
              >
                {textoConfirmar}
              </Button>
            )}
          </DialogActions>
        </form>
      </ContenedorCargando>
    </Dialog>
  );
};

DialogoEmergente.propTypes = {
  children: PropTypes.node,
  titulo: PropTypes.string,
  disabledCancelar: PropTypes.bool,
  cargando: PropTypes.bool,
  abierto: PropTypes.bool,
  textoConfirmar: PropTypes.string,
  onClickConfirmar: PropTypes.func,
  onClickCancelar: PropTypes.func,
};

export default DialogoEmergente;
