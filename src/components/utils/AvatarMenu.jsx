import { PropTypes } from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import useControlVisible from "../../context/useControlVisible";
import { memo, useMemo } from "react";

function stringToColor(cadena) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < cadena.length; i += 1) {
    hash = cadena.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(nombre) {
  return {
    className: "avatar-circle",
    style: {
      backgroundColor: stringToColor(nombre),
    },
    children: (
      <Typography className="avatar-text">
        {nombre.trim().split(" ").length === 2
          ? nombre.split(" ")[0][0] + nombre.split(" ")[1][0]
          : nombre[0]}
      </Typography>
    ),
  };
}

const AvatarMenu = memo(({ nombre, usuario }) => {
  const { visible, handleClose, handleOpen } = useControlVisible();
  const botonAvatarMemorizado = useMemo(() => {
    return (
      <Button onClick={handleOpen} className="avatar-menu-button">
        <Avatar
        onClick={() => console.log("se hizo clic")}
        {...stringAvatar(nombre)}
      />
        <Box className="avatar-menu-info">
          <article>
            <Typography className="avatar-name">{nombre}</Typography>
            <Typography className="avatar-username">@{usuario}</Typography>
          </article>
        </Box>
        <ArrowDropDownIcon className="avatar-dropdown-icon" />
      </Button>
      
    );
  }, [nombre, usuario, handleOpen]);

  return (
    <Box className="avatar-menu-container">
      {botonAvatarMemorizado}
      <Menu
        anchorEl={visible}
        open={Boolean(visible)}
        onClose={handleClose}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            className: "menu-paper",
          },
        }}
      >
        <section>
          <Typography className="menu-title">Mi cuenta</Typography>
          <Divider />
        </section>
        <section className="menu-items-container">
          <MenuItem className="menu-item" onClick={handleClose}>
            Perfil
          </MenuItem>
          <MenuItem className="menu-item" onClick={handleClose}>
            Cerrar sesión
          </MenuItem>
        </section>
      </Menu>
    </Box>
  );
});

AvatarMenu.displayName = "AvatarMenu";

AvatarMenu.propTypes = {
  nombre: PropTypes.string.isRequired,
  usuario: PropTypes.string.isRequired,
};

export default AvatarMenu;
