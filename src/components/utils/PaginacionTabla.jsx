import { Box, Pagination, PaginationItem, Typography } from "@mui/material";
import {
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
  gridPageSizeSelector,
  gridRowCountSelector,
} from "@mui/x-data-grid";

const PaginacionTabla = () => {
  const apiRef = useGridApiContext(); // Accede a la API del DataGrid
  const page = useGridSelector(apiRef, gridPageSelector); // Obtiene la página actual
  const pageCount = useGridSelector(apiRef, gridPageCountSelector); // Obtiene el número total de páginas
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector); // Tamaño de página
  const rowCount = useGridSelector(apiRef, gridRowCountSelector); // Número total de filas

  // Calcular los registros que se están mostrando
  const firstRecord = page * pageSize + 1; // Primer registro en la página actual
  const lastRecord = Math.min((page + 1) * pageSize, rowCount); // Último registro visible en la página actual
  const recordsOnPage = lastRecord - firstRecord + 1;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", // Justifica contenido entre izquierda y derecha
        alignItems: "center", // Alinea verticalmente
        outline: "1px solid #e0e0e0",
        borderTop: "1px solid #e0e0e0",
        padding: "5.3px 20px",
      }}
    >
      {/* Texto a la izquierda */}
      <Typography
        variant="subtitle2"
        sx={{ color: "text.secondary", fontSize: "13px" }}
      >
        Mostrando {recordsOnPage} de {rowCount} resultados
      </Typography>

      {/* Paginación a la derecha */}
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        size="small"
        page={page + 1} // Muestra la página actual, ajustada para que comience en 1
        count={pageCount} // Número total de páginas
        renderItem={(props) => <PaginationItem {...props} disableRipple />} // Desactiva el ripple
        onChange={(event, value) => apiRef.current.setPage(value - 1)} // Cambia la página
      />
    </Box>
  );
};

export default PaginacionTabla;
