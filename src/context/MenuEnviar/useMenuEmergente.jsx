import { useState } from "react";

const useMenuEmergente = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);

  const handelClickDerecho = (setFilasSeleccionadas, evento, objetoFila) => {
    evento.preventDefault();
    setMousePosition({
      mouseX: evento.clientX,
      mouseY: evento.clientY,
    });
    const selection = [parseInt(objetoFila.getAttribute("data-id"))];
    setFilasSeleccionadas(selection);
    setAnchorEl(objetoFila);
  };

  const handleCerrarMenu = () => {
    setAnchorEl(null);
  };

  const handleAbrirMenu = (event) => {
    setAnchorEl(event);
  };

  const handleAbrirMenuEvent = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return {
    anchorEl,
    mousePosition,
    handelClickDerecho,
    handleCerrarMenu,
    handleAbrirMenu,
    handleAbrirMenuEvent,
  };
};

export default useMenuEmergente;
