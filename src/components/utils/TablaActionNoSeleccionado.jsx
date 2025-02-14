import { PropTypes } from "prop-types";
import { Box, Typography } from "@mui/material";
import { Boton } from "@components/utils";
import { FileDownloadSharp } from "@mui/icons-material";
import { exportarFilasTablaExcel } from "@settings/utils";
import { useGridApiContext } from "@mui/x-data-grid";

const TableActionNoSelected = ({
  children,
  titulo = "Titulo",
  hasError = false,
}) => {
  const tablaRef = useGridApiContext();
  return (
    <Box className="contenedor-action-no-seleccionado">
      <Typography className="titulo-contenedor-action" variant="subtitle1">
        {titulo}
      </Typography>

      <Box className="botones-contenedor-action">
        <Box>{children}</Box>
        <Boton
          icono={<FileDownloadSharp />}
          texto="Exportar"
          accion={() => exportarFilasTablaExcel(tablaRef, titulo)}
          disabled={hasError}
        />
      </Box>
    </Box>
  );
};

TableActionNoSelected.propTypes = {
  children: PropTypes.node,
  titulo: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
};

export default TableActionNoSelected;
