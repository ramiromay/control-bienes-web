import { createContext, useContext, useState } from "react";

const FormularioContext = createContext();

export const useFormulario = () => {
  return useContext(FormularioContext);
};

export const FormularioProvider = ({ children, validar, enviar }) => {
  const [formValores, setFormValores] = useState({});
  const [errores, setErrores] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleActualizarValor = (event) => {
    const { nombreCampo, valor } = event.target;
    setFormValores({
      ...formValores,
      [nombreCampo]: valor,
    });
  };

  const handleEnviar = () => {
    const validationErrors = validar(formValores);
    const hasError = Object.keys(validationErrors).length > 0;

    if (hasError) {
      setErrores(validationErrors);
      return;
    }
    setIsSubmitting(true);
    enviar(formValores);
    setFormValores({});
    setIsSubmitting(false);
    return;
  };

  return (
    <FormularioContext.Provider
      value={{
        formValores,
        errores,
        isSubmitting,
        setFormValores,
        handleActualizarValor,
        handleEnviar,
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
};
