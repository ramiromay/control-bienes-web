import { Box } from "@mui/material";
import PropTypes from "prop-types";
import useTabla from "../../context/Tabla/useTabla.jsx";
import { DataGrid } from "@mui/x-data-grid";
import BarraHerramientasTabla from "./BarraHerramientasTabla.jsx";
import PaginacionTabla from "./PaginacionTabla.jsx";
import MenuEnviar from "./MenuEnviar.jsx";
import useMenuEnviar from "../../context/MenuEnviar/useMenuEnviar.jsx";

const TablaCompleta = ({ actions }) => {
  const tablaContext = useTabla();
  const menuEnviarContext = useMenuEnviar();

  return (
    <Box className="contenedor-tabla">
      <DataGrid
        className="tabla"
        rows={tablaContext.filas}
        columns={tablaContext.columnas}
        checkboxSelection
        rowHeight={47.5}
        columnHeaderHeight={46.8}
        density="compact"
        disableAutosize
        disableColumnMenu
        ignoreDiacritics
        disableMultipleRowSelection
        onRowSelectionModelChange={tablaContext.seleccionarFilas}
        rowSelectionModel={tablaContext.filasSeleccionadas}
        paginationModel={tablaContext.paginacionModel}
        onPaginationModelChange={tablaContext.setPaginacionModel}
        pageSizeOptions={[tablaContext.tamanio]}
        slots={{
          toolbar: () => (
            <BarraHerramientasTabla
              actions={actions}
              columns={tablaContext.columnas}
            />
          ),
          footer: () => <PaginacionTabla />,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          row: {
            onContextMenu: (event) =>
              menuEnviarContext.clicDerecho(
                tablaContext.seleccionarFilas,
                event,
                event.currentTarget
              ),
          },
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
      />
      <MenuEnviar />
    </Box>
  );
};

TablaCompleta.propTypes = {};

export default TablaCompleta;
