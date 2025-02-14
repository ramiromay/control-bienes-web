import { PropTypes } from "prop-types";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import Boton from "./Boton";
import { NavigateNextSharp } from "@mui/icons-material";

const BotonMenu = ({
  anchorEl,
  icon,
  label,
  items,
  handleClickButton = () => {},
  handleClickItem = () => {},
  handleClose,
  disabled,
  cargando,
  ...props
}) => {
  return (
    <>
      <Boton
        {...props}
        icono={icon}
        texto={label}
        accion={(event) => handleClickButton(event.currentTarget)}
        disabled={disabled}
        cargando={cargando}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiList-root": {
            padding: 0,
            background: "#3367d6",
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 0,
            },
          },
        }}
      >
        {cargando ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 0",
            }}
          >
            <Typography>Cargando...</Typography>
          </Box>
        ) : items.length > 0 ? (
          items.map((item) => (
            <MenuItem
              key={item.id}
              sx={{ height: "30px", padding: "4px 6px" }}
              onClick={() => handleClickItem(item.id)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    w: "100%",
                    p: "0px 6px",
                    fontSize: "13px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.label}
                </Typography>
                <NavigateNextSharp sx={{ color: "white" }} />
              </Box>
            </MenuItem>
          ))
        ) : (
          <Typography
            variant="subtitle2"
            sx={{
              w: "100%",
              p: "4px 16px",
              fontSize: "13px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No hay etapas disponibles
          </Typography>
        )}
      </Menu>
    </>
  );
};

BotonMenu.propTypes = {
  anchorEl: PropTypes.object,
  icon: PropTypes.element,
  label: PropTypes.string,
  items: PropTypes.array,
  handleClickButton: PropTypes.func,
  handleClickItem: PropTypes.func,
  handleClose: PropTypes.func,
  disabled: PropTypes.bool,
  cargando: PropTypes.bool,
};

export default BotonMenu;
