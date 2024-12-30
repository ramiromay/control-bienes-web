import { useState } from "react";

const useCargando = () => {
  const [cargando, setCargando] = useState(false);

  const handleIniciarCarga = () => {
    setCargando(true);
  };

  const handleFinalizarCarga = () => {
    setCargando(false);
  };

  return { cargando, handleIniciarCarga, handleFinalizarCarga };
};

export default useCargando;
