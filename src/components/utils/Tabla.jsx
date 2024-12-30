import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PropTypes } from "prop-types";
import BarraHerramientasTabla from "./BarraHerramientasTabla";
import PaginacionTabla from "./PaginacionTabla";
import { useCallback, useMemo } from "react";

const Tabla = ({
  datos = [],
  columnas = [],
  filaSeleccionada = [],
  orderBy = "id",
  handleFilaSeleccionada = () => {},
  componenteActions = null,
}) => {
  const initialState = useMemo(
    () => ({
      pagination: { paginationModel: { pageSize: 80, page: 0 } },
      sorting: { sortModel: [{ field: orderBy, sort: "asc" }] },
    }),
    [orderBy]
  );

  const getCampoId = useCallback(
    (row) =>  row[orderBy],
    [orderBy]
  );

  return (
    <Box className="contenedor-tabla">
      <DataGrid
        className="tabla"
        initialState={initialState}
        columns={columnas}
        rows={datos}
        getRowId={getCampoId}
        rowSelectionModel={filaSeleccionada}
        onRowSelectionModelChange={handleFilaSeleccionada}
        checkboxSelection
        rowHeight={47.5}
        columnHeaderHeight={46.8}
        density="compact"
        disableColumnMenu
        disableAutosize
        ignoreDiacritics
        disableMultipleRowSelection
        slots={{
          toolbar: () => (
            <BarraHerramientasTabla
              actions={componenteActions}
              columns={columnas}
              filaSeleccionada={filaSeleccionada}
              setFilaSeleccionada={handleFilaSeleccionada}
            />
          ),
          footer: () => <PaginacionTabla />,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
};

Tabla.propTypes = {
  datos: PropTypes.array,
  columnas: PropTypes.array,
  filaSeleccionada: PropTypes.array,
  cargando: PropTypes.bool,
  orderBy: PropTypes.string,
  getCampoId: PropTypes.func,
  handleFilaSeleccionada: PropTypes.func,
  componenteActions: PropTypes.element,
};

export default Tabla;
