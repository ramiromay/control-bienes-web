import { useContext, useState } from 'react';
import { createContext } from "react";

const SesionContext = createContext();

export const useSesion = () => {
  return useContext(SesionContext);
};

export const SesionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const handleUsuario = (usuario) => {
    setUsuario(usuario);
  };

  return (
    <SesionContext.Provider value={{ usuario, handleUsuario }}>
      {children}
    </SesionContext.Provider>
  );
};