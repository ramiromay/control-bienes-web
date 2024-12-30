import { PropTypes } from "prop-types";
import { Close } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  CircularProgress,
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
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  onClickConfirmar = null,
  onClickCancelar = () => {},
  componentActions = null,
  componentSteps = null
}) => {
  return (
    <Dialog
      open={abierto}
      fullWidth
      PaperProps={{
        sx: { minWidth: width },
      }}
    >
      <ContenedorCargando isLoading={cargando}>
        <div className="contenedor-dialogo">
          <form onSubmit={onClickConfirmar} noValidate>
            <DialogTitle className="contenedor-simple padding-cero">
              <Typography className="titulo-simple">{titulo}</Typography>
              <IconButton
                aria-label="cerrar"
                onClick={onClickCancelar}
                className="icon-close-dialogo "
              >
                <Close />
              </IconButton>
            </DialogTitle>
            {componentSteps}
            <DialogContent className="contenedor-simple padding-cero contenedor-scroll-600">
              {children}
            </DialogContent>
            <DialogActions className="padding-cero">
              {componentActions ?? (
                <>
                  <Button
                    size="small"
                    disabled={cargando}
                    onClick={onClickCancelar}
                    color="primary"
                    variant="outlined"
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
                </>
              )}
            </DialogActions>
          </form>
        </div>
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
