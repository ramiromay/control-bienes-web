import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useFormPasos = ({
  schemes,
  handleClose,
  stepsLength,
  esVisualizacion,
}) => {
  const [pasoManager, setPasoManager] = useState({
    indexActual: 0,
    indexError: -1,
  });
  const { indexActual } = pasoManager;
  const indexEsquemaValidacion =
    indexActual >= stepsLength ? stepsLength - 1 : indexActual;
  const formManager = useForm({
    resolver: yupResolver(schemes[indexEsquemaValidacion]),
    mode: "onChange",
  });
  const { reset, resetField, trigger } = formManager;

  const handleSiguientePaso = async () => {
    if (esVisualizacion) {
      if (indexActual === stepsLength - 1) return;
      setPasoManager({
        indexError: -1,
        indexActual: indexActual + 1,
      });
      return;
    }
    const isFormValido = await trigger();
    if (isFormValido) {
      setPasoManager({
        indexError: -1,
        indexActual: indexActual + 1,
      });
      return;
    }
    setPasoManager({
      ...pasoManager,
      indexError: indexActual,
    });
  };

  const handlePasoAnterior = () => {
    setPasoManager({
      ...pasoManager,
      indexActual: indexActual - 1,
    });
  };

  const handleReiniciarPasos = () => {
    reset();
    resetField();
    setPasoManager({
      indexActual: 0,
      indexError: -1,
    });
  };

  const handleCloseForm = () => {
    handleReiniciarPasos();
    handleClose();
  };

  return {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleReiniciarPasos,
    handleCloseForm,
  };
};

export default useFormPasos;
