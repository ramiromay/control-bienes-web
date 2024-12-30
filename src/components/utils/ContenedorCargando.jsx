import { LinearProgress } from "@mui/material";
import PropTypes from "prop-types";

const ContenedorCargando = ({ isLoading, children }) => {
  return (
    <section className="contenedor-cargando">
      {isLoading && (
        <>
          <section className="contenedor-cargando-backdrop" />
          <LinearProgress className="contenedor-cargando-barra" />
        </>
      )}
      <section
        className={`contenedor-cargando-contenido ${isLoading ? "cargando" : ""}`}
      >
        {children}
      </section>
    </section>
  );
};

ContenedorCargando.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default ContenedorCargando;
