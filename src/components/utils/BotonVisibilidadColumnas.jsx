import { PropTypes } from "prop-types";
import { ViewColumn } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { useRef, useState } from "react";

const BotonVisibilidadColumnas = ({ columns }) => {
  const scrollContainerRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const apiRef = useGridApiContext();
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    columns.reduce((acc, col) => {
      acc[col.field] = true;
      return acc;
    }, {})
  );
  const [initialColumnVisibilityModel, setInitialColumnVisibilityModel] =
    useState({});

  const handleClick = (event) => {
    setInitialColumnVisibilityModel(columnVisibilityModel); // Guarda el estado inicial
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // Cierra el menú inmediatamente
    setAnchorEl(null);

    // Ejecuta el resto de las acciones después de un breve retraso, una vez que la ventana ya se haya cerrado
    setTimeout(() => {
      // Restaura el estado inicial
      setColumnVisibilityModel(initialColumnVisibilityModel);

      // Restablece el scroll al inicio
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }, 300); // Ajusta el tiempo según sea necesario (300ms es un valor común)
  };

  const handleToggleColumn = (field) => {
    const newModel = {
      ...columnVisibilityModel,
      [field]: !columnVisibilityModel[field],
    };
    setColumnVisibilityModel(newModel);
  };

  const handleToggleAllColumns = () => {
    const allVisible = Object.values(columnVisibilityModel).every(Boolean);
    const newModel = columns.reduce((acc, col) => {
      acc[col.field] = !allVisible;
      return acc;
    }, {});
    setColumnVisibilityModel(newModel);
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleAccept = () => {
    apiRef.current.setColumnVisibilityModel(columnVisibilityModel);
    setAnchorEl(null);
  };

  const allColumnsVisible = Object.values(columnVisibilityModel).every(Boolean);
  const someColumnsVisible = Object.values(columnVisibilityModel).some(Boolean);

  // Calcular cuántas columnas están seleccionadas
  const selectedCount = Object.values(columnVisibilityModel).filter(
    Boolean
  ).length;
  const totalColumns = columns.length;

  return (
    <Box
      sx={{
        padding: "0px 16px",
        width: "56px",
        height: "24px",
        borderLeft: "1px solid #e0e0e0 !important",
      }}
    >
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          padding: "6px",
          fontSize: "20px",
          width: "24px",
          height: "24px",
        }}
      >
        <ViewColumn fontSize="inherit" sx={{ color: "black" }} />
      </IconButton>
      {anchorEl ? (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ marginTop: "8px" }}
          slotProps={{
            paper: {
              sx: {
                minWidth: "300px",
                borderRadius: 0,
              },
            },
          }}
        >
          <Box sx={{ borderBottom: "1px solid #e0e0e0" }}>
            <Typography
              variant="subtitle2"
              sx={{ p: "8px 12px 0px 12px", fontSize: "13px" }}
            >
              Columnas que se muestran
            </Typography>
            <MenuItem
              sx={{ height: "38px", padding: "8px 16px" }}
              onClick={handleToggleAllColumns}
            >
              <Checkbox
                size="small" // Hace el Checkbox más pequeño
                sx={{
                  height: "20px",
                  minHeight: "20px",
                  width: "20px",
                  marginRight: "8px",
                }} // Ajusta el margen derecho para alinear correctamente
                checked={allColumnsVisible}
                indeterminate={!allColumnsVisible && someColumnsVisible}
              />
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "13px",
                  height: "100%",
                }}
                primary={
                  selectedCount === totalColumns
                    ? `Todos los ${totalColumns} seleccionados`
                    : `${selectedCount} de ${totalColumns} seleccionados`
                }
              />
            </MenuItem>
          </Box>
          <Box
            ref={scrollContainerRef} // Referencia al contenedor de scroll
            sx={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {columns.map((column) => (
              <MenuItem
                sx={{ height: "38px", padding: "8px 16px" }}
                key={column.field}
                onClick={() => handleToggleColumn(column.field)}
              >
                <Checkbox
                  id={column.field}
                  name={column.field}
                  size="small" // Hace el Checkbox más pequeño
                  sx={{
                    height: "20px",
                    minHeight: "20px",
                    width: "20px",
                    marginRight: "8px",
                  }} // Ajusta el margen derecho para alinear correctamente
                  checked={Boolean(columnVisibilityModel[column.field])}
                />
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "13px",
                    height: "100%",
                  }}
                  primary={column.headerName}
                />
              </MenuItem>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              padding: "8px 16px 0px 16px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={handleCancel}
              sx={{ marginRight: "8px" }}
            >
              Cancelar
            </Button>
            <Button variant="contained" size="small" onClick={handleAccept}>
              Aceptar
            </Button>
          </Box>
        </Menu>
      ) : null}
    </Box>
  );
};

BotonVisibilidadColumnas.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default BotonVisibilidadColumnas;
