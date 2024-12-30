import { PropTypes } from "prop-types";
import { Box } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import BotonVisibilidadColumnas from "./BotonVisibilidadColumnas";

const BarraHerramientasTabla = ({
  actions,
  columns,
  filaSeleccionada,
  setFilaSeleccionada,
}) => {
  const quitaFilaSeleccionada = () => {
    if (filaSeleccionada.length !== 0) {
      setFilaSeleccionada([]);
    }
  };
  return (
    <Box >
      <GridToolbarContainer
        sx={{
          height: "100%",
          minHeight: "100%",
          p: 0,
          m: 0,
          gap: 0,
          display: "flex",
          alignItems: "center",
          outline: "1px solid #e0e0e0"
        }}
      >
        {actions}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <GridToolbarQuickFilter
            sx={{
              flexGrow: 1,
              height: "100%",
              "& .MuiOutlinedInput-root": {
                border: "none",
                borderRadius: 0,
                fontSize: "20px",
                p: 0,
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputBase-root": {
                padding: 0,
                height: "100%",
              },
              paddingLeft: "18px",
              paddingTop: "3px",
              paddingBottom: "3px",
              marginRight: 2,
            }}
            variant="outlined"
            size="small"
            placeholder="Buscar registros"
            onInput={quitaFilaSeleccionada}
          />
          <BotonVisibilidadColumnas columns={columns} />
        </Box>
      </GridToolbarContainer>
    </Box>
  );
};

BarraHerramientasTabla.propTypes = {
  actions: PropTypes.node,
  columns: PropTypes.array.isRequired,
};

export default BarraHerramientasTabla;
