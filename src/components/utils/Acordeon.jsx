import { PropTypes } from "prop-types";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tooltip,
  Typography,
} from "@mui/material";

const Acordeon = ({
  children,
  icono,
  titulo,
  tooltipTitle,
  disableTooltip = false,
  defaultExpanded = false,
  disabled = false,
  expanded,
  onChange,
}) => {
  // Determina si el acordeón es controlado o no
  const isControlled = expanded !== undefined && onChange !== undefined;

  return (
    <Accordion
      disabled={disabled}
      expanded={isControlled ? expanded : undefined} // Solo se usa si es controlado
      onChange={isControlled ? onChange : undefined} // Solo se usa si es controlado
      square={false}
      defaultExpanded={!isControlled ? defaultExpanded : undefined} // Solo se usa si no es controlado
    >
      <Tooltip disableHoverListener={disableTooltip} title={tooltipTitle}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Box className="sicba-summary-icon">{icono}</Box>
          <Typography className="sicba-summary-title">{titulo}</Typography>
        </AccordionSummary>
      </Tooltip>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

Acordeon.propTypes = {
  children: PropTypes.node.isRequired,
  icono: PropTypes.node.isRequired,
  titulo: PropTypes.string.isRequired,
  tooltipTitle: PropTypes.string,
  disableTooltip: PropTypes.bool,
};

export default Acordeon;
