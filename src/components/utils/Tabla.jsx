import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PropTypes } from "prop-types";
import BarraHerramientasTabla from "./BarraHerramientasTabla";
import PaginacionTabla from "./PaginacionTabla";
import { useCallback, useMemo } from "react";

const ROW_HEIGHT = 47.5;
const COLUMN_HEADER_HEIGHT = 46.8;
const DENSITY = "compact";

const Tabla = ({
  datos = [],
  columnas = [],
  filaSeleccionada = [],
  orderBy = "id",
  cargando = false,
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
        rowHeight={ROW_HEIGHT}
        columnHeaderHeight={COLUMN_HEADER_HEIGHT}
        density={DENSITY}
        disableColumnMenu
        disableAutosize
        loading={cargando}
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
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
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
