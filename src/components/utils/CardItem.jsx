import { ExtensionTwoTone } from "@mui/icons-material";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const CardItem = ({icono = null, nombre, abreviacion, descripcion }) => {
  return (
    <article className="HomeItem">
      <header className="icon-header">
        {icono}
      </header>
      <section className="content">
        <Typography variant="subtitle1" className="title">
          {nombre}
        </Typography>
        <Typography variant="body2" className="abbreviation">
          {abreviacion}
        </Typography>
        <Typography variant="body2" className="description">
          {descripcion}
        </Typography>
      </section>
    </article>
  );
};

CardItem.propTypes = {
  nombre: PropTypes.string,
  abreviacion: PropTypes.string,
  descripcion: PropTypes.string,
};

export default CardItem;
