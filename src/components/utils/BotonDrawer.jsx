import { PropTypes } from "prop-types";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import useControlVisible from "../../context/useControlVisible";
import { CloseSharp, Menu, WebTwoTone } from "@mui/icons-material";
import { memo } from "react";

const BotonDrawer = memo(
  ({
    idSubModuloSelccioonado,
    modulos,
    subModulos,
    handleNavigateSubModulo,
  }) => {
    const { visible, handleClose, handleOpen } = useControlVisible();

    const subModulosPorModulo = modulos.map((modulo) => {
      return {
        modulo,
        subModulos: subModulos.filter(
          (subModulo) => subModulo.idModulo === modulo.idModulo
        ),
      };
    });

    return (
      <>
        <IconButton onClick={handleOpen} className="barra-navegacion-icon">
          <Menu />
        </IconButton>
        <Drawer
          anchor="left"
          open={visible}
          onClose={handleClose}
          PaperProps={{ className: "drawer" }}
        >
          <section className="drawer-title-container">
            <IconButton onClick={handleClose}>
              <CloseSharp className="drawer-icon" />
            </IconButton>
            <Typography variant="subtitle1" className="drawer-title">
              SISTEMAS DISPONIBLES
            </Typography>
          </section>
          <Divider />
          <section className="drawer-todos-modulos">
            {subModulosPorModulo.map(({ modulo, subModulos }) => (
              <section className="drawer-modulo" key={modulo.idModulo}>
                <Typography className="drawer-modulo-title">
                  {modulo.nombre.toUpperCase()}
                </Typography>
                <List>
                  {subModulos.map((subModulo) => (
                    <Tooltip
                    placement="right"
                      key={subModulo.idSubModulo}
                      title={subModulo.nombre}
                    >
                      <ListItem
                        onClick={() => {
                          handleClose();
                          handleNavigateSubModulo(subModulo.idSubModulo);
                        }}
                        className={`listItem ${
                          idSubModuloSelccioonado === subModulo.idSubModulo
                            ? "selected"
                            : ""
                        }`}
                      >
                        <ListItemIcon className="drawer-container-icon">
                          <WebTwoTone className="drawer-item-icon" />
                        </ListItemIcon>
                        <ListItemText
                          className="listItemText"
                          primary={subModulo.nombre}
                          secondary={subModulo.descripcion}
                        />
                      </ListItem>
                    </Tooltip>
                  ))}
                </List>
                <Divider />
              </section>
            ))}
          </section>
        </Drawer>
      </>
    );
  }
);

BotonDrawer.propTypes = {
  idSubModuloSelccioonado: PropTypes.number.isRequired,
  modulos: PropTypes.array.isRequired,
  subModulos: PropTypes.array.isRequired,
  handleNavigateSubModulo: PropTypes.func.isRequired,
};

BotonDrawer.displayName = "BotonDrawer";

export default BotonDrawer;
