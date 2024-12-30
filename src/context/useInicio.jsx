import { useEffect, useState } from "react";
import { useSistema } from "./SistemaContext";
import { getModulos } from "../services/sistema";

const useIncio = () => {
  const { handleError } = useSistema();
  const [modulos, setModulos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarInicio = async () => {
      setCargando(true);
      try {
        const [modulos] = await Promise.all([getModulos()]);
        setModulos(modulos);
      } catch (error) {
        handleError(error);
      } finally {
        setCargando(false);
      }
    };

    cargarInicio();
  }, []);

  return { cargando, modulos };
};

export default useIncio;
