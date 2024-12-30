import { PropTypes } from "prop-types";
import { AssignmentInd } from "@mui/icons-material";
import { Typography } from "@mui/material";

const BarraInformacion = ({
  modulo,
  icono = null,
  desactivarRole = false,
  role = "Administrador",
}) => {
  return (
    <section className="custom-button-container">
      <article className="custom-button-content">
        {icono}
        <Typography variant="subtitle1" className="custom-button-modulo">
          {modulo}
        </Typography>
        {!desactivarRole && (
          <>
            <span className="custom-button-divider"></span>
            <AssignmentInd className="custom-button-icon" />
            <p className="custom-button-role">{role}</p>
          </>
        )}
      </article>
    </section>
  );
};

BarraInformacion.propTypes = {
  modulo: PropTypes.string.isRequired,
  icono: PropTypes.element,
  desactivarRole: PropTypes.bool,
  role: PropTypes.string,
};

export default BarraInformacion;
