import { PropTypes } from "prop-types";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import DrawerPasosSkeleton from "./DrawerPasosSkeleton";
import { memo, useState } from "react";
import DialogoEmergente from "./DialogoEmergente";

const steps = [
  { 
    label: 'Datos del Bien', 
    content: (
      <>
        <TextField label="Campo 1A" variant="outlined" fullWidth />
        <TextField label="Campo 2A" variant="outlined" fullWidth />
        <TextField label="Campo 3A" variant="outlined" fullWidth />
      </>
    ) 
  },
  { 
    label: 'Datos Aquisición', 
    content: (
      <>
        <TextField label="Campo 1B" variant="outlined" fullWidth />
        <TextField label="Campo 2B" variant="outlined" fullWidth />
        <TextField label="Campo 3B" variant="outlined" fullWidth />
      </>
    )
  },
  { 
    label: 'Datos Generales', 
    content: (
      <>
        <TextField label="Campo 1C" variant="outlined" fullWidth />
        <TextField label="Campo 2C" variant="outlined" fullWidth />
        <TextField label="Campo 3C" variant="outlined" fullWidth />
      </>
    )
  },
  { 
    label: 'Caracteristicas', 
    content: (
      <>
        <TextField label="Campo 1C" variant="outlined" fullWidth />
        <TextField label="Campo 2C" variant="outlined" fullWidth />
        <TextField label="Campo 3C" variant="outlined" fullWidth />
      </>
    )
  },
  { 
    label: 'Responsables', 
    content: (
      <>
        <TextField label="Campo 1C" variant="outlined" fullWidth />
        <TextField label="Campo 2C" variant="outlined" fullWidth />
        <TextField label="Campo 3C" variant="outlined" fullWidth />
      </>
    )
  },
];

const DrawerPasos = memo(
  ({
    abierto = false,
    titulo = "Título",
    pasos = [],
    cargando = false,
    pasoActual = 0,
    erroresPasos = [],
    enviando = false,
    handleAtras = null,
    handleSiguiente = null,
    handleSubmit = null,
    handleClose = null,
  }) => {
    const renderStepContent = (step) => {
      const paso = pasos[step];
      return paso ? paso.content : "Paso desconocido";
    };

    const isLastStep = pasoActual === pasos.length - 1;

    const [activeStep, setActiveStep] = useState(0);

  // Cambiar al siguiente paso
  const handleNext = () => {
    if (activeStep < pasos.length - 1) {
      setActiveStep(prevStep => prevStep + 1);
    }
  };

  // Cambiar al paso anterior
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prevStep => prevStep - 1);
    }
  };

    return (
      null
    );
  }
);

DrawerPasos.displayName = "DrawerPasos";

DrawerPasos.propTypes = {
  abierto: PropTypes.bool,
  titulo: PropTypes.string,
  pasos: PropTypes.array,
  cargando: PropTypes.bool,
  pasoActual: PropTypes.number,
  erroresPasos: PropTypes.array,
  enviando: PropTypes.bool,
  handleAtras: PropTypes.func,
  handleSiguiente: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
};

export default DrawerPasos;