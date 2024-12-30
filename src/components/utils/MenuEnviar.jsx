import { PropTypes } from "prop-types";
import { NavigateNextSharp } from "@mui/icons-material";
import { Menu, MenuItem, Typography } from "@mui/material";
import useMenuEnviar from "../../context/MenuEnviar/useMenuEnviar";

const MenuEnviar = () => {
  const menuContext = useMenuEnviar();
  return (
    menuContext.anchorEl 
    ? (<Menu
      anchorReference="anchorPosition"
      anchorPosition={
        menuContext.mousePosition
          ? {
              top: menuContext.mousePosition.mouseY + 5,
              left: menuContext.mousePosition.mouseX,
            }
          : { top: 0, left: 0 }
      }
      anchorEl={menuContext.anchorEl}
      open={Boolean(menuContext.anchorEl)}
      onClose={menuContext.cerrarMenu}
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
      <MenuItem
        sx={{ height: "30px", padding: "4px 6px" }}
        onClick={() => console.log("Enviar")}
      >
        <Typography
          variant="subtitle2"
          sx={{
            w: "100%",
            p: "0px 6px",
            fontSize: "13px",
            color: "white",
          }}
        >
          Enviar
        </Typography>
        <NavigateNextSharp sx={{ color: "white" }} />
      </MenuItem>
    </Menu>)
    : null
  );
};

MenuEnviar.propTypes = {
  anchorEl: PropTypes.any,
  setAnchorEl: PropTypes.func,
  mousePosition: PropTypes.object,
};

export default MenuEnviar;
