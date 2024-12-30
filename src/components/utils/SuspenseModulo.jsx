import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useSistema } from "../../context/SistemaContext";

function SuspenseModulo({ cargarMetodos = [], componenteCargando = null, render }) {
  const { handleError } = useSistema();
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(
    new Array(cargarMetodos.length).fill(true)
  );

  useEffect(() => {
    const cargarDatos = async () => {
      const nuevosDatos = [];
      const nuevosCargando = new Array(cargarMetodos.length).fill(true);

      // Usamos Promise.all pero gestionamos el error manualmente para detener la ejecución
      const promesas = cargarMetodos.map((metodo, index) => {
        return metodo()
          .then((resultado) => {
            nuevosDatos[index] = resultado;
          })
          .catch(() => {
            nuevosCargando[index] = false; // Detener el proceso de carga para ese método
            throw new Error("Error en una de las promesas"); // Lanza error para detener Promise.all
          })
          .finally(() => {
            nuevosCargando[index] = false; // Este siempre se ejecuta para cambiar el estado de carga
          });
      });

      try {
        await Promise.all(promesas);
      } catch (error) {
        handleError(error);
      }

      // Actualizamos los estados de datos y carga
      setDatos(nuevosDatos);
      setCargando(nuevosCargando);
    };

    cargarDatos();
  }, [cargarMetodos, handleError]);

  // Si cualquiera de los métodos está cargando, mostramos el mensaje de "Cargando"
  if (cargando.some((estado) => estado)) {
    return componenteCargando;
  }

  // Si todo está cargado, pasamos los datos a la función de renderizado
  return render(...datos);
}

SuspenseModulo.propTypes = {
  cargarMetodos: PropTypes.array,
  componenteCargando: PropTypes.element,
  render: PropTypes.func.isRequired,
};

export default SuspenseModulo;
