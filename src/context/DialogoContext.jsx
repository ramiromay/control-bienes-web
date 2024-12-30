import { useContext, useState } from "react";

const DialogoContext = useContext();

const useDialogo = () => {
  return useContext(DialogoContext);
};

export const DialogoProvider = ({ children }) => {
  const [cargando, setAbierto] = useState(false);
 
  const handleCerraDialogo = () => setAbierto(false);

  return (
    <DialogoContext.Provider value={{ abierto, handleCerraDialogo }}>
      {children}
    </DialogoContext.Provider>
  );
};

export const DialogoConsumer = ({ children }) => {
  return (
    <DialogoContext.Consumer>{(value) => children}</DialogoContext.Consumer>
  );
};
