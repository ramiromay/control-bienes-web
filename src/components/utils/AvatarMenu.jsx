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
import { memo, useMemo } from "react";
import useMenuEmergente from "../../context/MenuEnviar/useMenuEmergente";
import { CLAVE_TOKEN } from "../../settings/sistemaConfig";

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

const opcionesMenu = [
  {
    label: "Cerrar sesión",
    onClick: () => {
      localStorage.removeItem(CLAVE_TOKEN);
      window.location.reload();
    },
  },
];

const AvatarMenu = memo(({ nombre, usuario }) => {
  const { anchorEl, handleCerrarMenu, handleAbrirMenuEvent } =
    useMenuEmergente();
  const botonAvatarMemorizado = useMemo(() => {
    return (
      <Button onClick={handleAbrirMenuEvent} className="avatar-menu-button">
        <Avatar {...stringAvatar(nombre)} />
        <Box className="avatar-menu-info">
          <article>
            <Typography className="avatar-name">{nombre}</Typography>
            <Typography className="avatar-username">@{usuario}</Typography>
          </article>
        </Box>
        <ArrowDropDownIcon className="avatar-dropdown-icon" />
      </Button>
    );
  }, [nombre, usuario, handleAbrirMenuEvent]);

  return (
    <Box className="avatar-menu-container">
      {botonAvatarMemorizado}
      <Menu
        id="id-barra-navegacion"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCerrarMenu}
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
          {opcionesMenu.map((opcion) => (
            <MenuItem
              key={opcion.label}
              onClick={opcion.onClick}
              className="menu-item"
            >
              <Typography className="menu-item-text">{opcion.label}</Typography>
            </MenuItem>
          ))}
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
