import { useState } from "react";
import MenuEnviarContext from "./MenuEnviarContext";

const MenuEnviarProvider = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);

  const clicDerecho = (setFilasSeleccionadas, evento, objetoFila) => {
    evento.preventDefault();
    setMousePosition({
      mouseX: evento.clientX,
      mouseY: evento.clientY,
    });
    const selection = [parseInt(objetoFila.getAttribute("data-id"))];
    setFilasSeleccionadas(selection);
    setAnchorEl(objetoFila);
  };

  const cerrarMenu = () => {
    setAnchorEl(null);
  };

  return (
    <MenuEnviarContext.Provider
      value={{
        anchorEl: anchorEl,
        mousePosition: mousePosition,
        clicDerecho: clicDerecho,
        cerrarMenu: cerrarMenu,
      }}
    >
      {children}
    </MenuEnviarContext.Provider>
  );
};

export default MenuEnviarProvider;
