import { PropTypes } from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import ContenedorCargando from "./ContenedorCargando";
import { Close } from "@mui/icons-material";

const DialogoEmergentePasos = ({
  abierto,
  titulo,
  pasos,
  indexActual,
  indexError,
  cargando,
  handleEnviar,
  handleCerrar,
  getContenidoPaso,
  handleSiguiente,
  handleAnterior,
  isVisualizacion,
  errors,
}) => {
  const totalPasos = pasos.length;
  const typeSubmitButton = indexActual !== totalPasos ? "button" : "submit";
  const getActionSubmitButton =
    indexActual !== totalPasos ? handleSiguiente : undefined;
  const disablePreviusButton = indexActual === 0;
  const disableSubmitButton = isVisualizacion && indexActual === totalPasos - 1;
  const getSubmitButtonText = isVisualizacion
    ? "Siguiente"
    : indexActual >= totalPasos - 1
      ? "Confirmar"
      : "Siguiente";

  return (
    <Dialog
      open={abierto}
      PaperProps={{ className: "contenedor-dialogo alto-completo" }}
    >
      <ContenedorCargando isLoading={cargando}>
        <form onSubmit={handleEnviar} noValidate className="contenido-dialogo">
          <DialogTitle className="encabezado-dialogo">
            <section className="seccion-encabezado extendido">
              <Typography className="titulo-dialogo">{titulo}</Typography>
              <IconButton aria-label="cerrar" onClick={handleCerrar}>
                <Close />
              </IconButton>
            </section>
            <Stepper activeStep={indexActual} alternativeLabel>
              {pasos.map((step, index) => (
                <Step key={step}>
                  <StepLabel error={errors && index === indexError}>
                    {step}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </DialogTitle>
          <Divider />
          <DialogContent className="cuerpo-dialogo">
            {getContenidoPaso(indexActual)}
          </DialogContent>
          <Divider />
          <DialogActions className="pie-dialogo espaciado">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleAnterior}
              disabled={disablePreviusButton}
            >
              Anterior
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type={typeSubmitButton}
              onClick={getActionSubmitButton}
              disabled={disableSubmitButton}
            >
              {getSubmitButtonText}
            </Button>
          </DialogActions>
        </form>
      </ContenedorCargando>
    </Dialog>
  );
};

DialogoEmergentePasos.propTypes = {
  abierto: PropTypes.bool,
  titulo: PropTypes.string,
  pasos: PropTypes.array,
  indexActual: PropTypes.number,
  indexError: PropTypes.number,
  cargando: PropTypes.bool,
  handleEnviar: PropTypes.func,
  handleCerrar: PropTypes.func,
  getContenidoPaso: PropTypes.func,
  handleSiguiente: PropTypes.func,
  handleAnterior: PropTypes.func,
  isVisualizacion: PropTypes.bool,
  errors: PropTypes.object,
};

export default DialogoEmergentePasos;
