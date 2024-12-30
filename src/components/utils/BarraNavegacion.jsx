import { Extension, WebTwoTone } from "@mui/icons-material";
import { AppBar, Chip, Grid2, Toolbar } from "@mui/material";
import { useSistema } from "../../context/SistemaContext";
import imagen from "@img/logo.svg";
import BarraInformacion from "./BarraInformacion";
import AvatarMenu from "./AvatarMenu";
import BotonDrawer from "./BotonDrawer";
import { Link } from "react-router-dom";
import { ROUTES } from "../../settings/routeConfig";

const BarraNavegacion = () => {
  const {
    navBarOpen,
    informacionSistema,
    handleNavigateSubModulo,
    usuario,
    modulos,
    subModulos,
  } = useSistema();

  return (
    navBarOpen && (
      <AppBar className="barra-navegacion" elevation={0} position="sticky">
        <Toolbar
          className="barra-navegacion-toolbar"
          disableGutters
          variant="dense"
        >
          <Grid2
            alignItems="center"
            container
            spacing={0}
            gap={0}
            className="barra-navegacion-grid"
          >
            <Grid2 size={{ xs: 1, sm: 1, md: 2, lg: 3.5 }}>
              <section className="barra-navegacion-logo-section">
                <BotonDrawer
                  idSubModuloSelccioonado={informacionSistema.idSubModulo}
                  modulos={modulos}
                  subModulos={subModulos}
                  handleNavigateSubModulo={handleNavigateSubModulo}
                />
                <Link to={ROUTES.INDEX}>
                  <img
                    className="barra-navegacion-logo"
                    src={imagen}
                    alt="Logo"
                  />
                </Link>
                <Chip
                  className="barra-navegacion-chip"
                  label={
                    <BarraInformacion
                      icono={
                        <Extension className="barra-navegacion-chip-icon" />
                      }
                      desactivarRole
                      modulo={informacionSistema.nombre}
                    />
                  }
                  variant="outlined"
                />
              </section>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10, md: 8, lg: 5 }}>
              <section className="barra-navegacion-center-section">
                <Chip
                  className="barra-navegacion-center-chip"
                  label={
                    <BarraInformacion
                      icono={
                        <WebTwoTone className="barra-navegacion-center-icon" />
                      }
                      modulo={
                        informacionSistema.abreviacion +
                        " - " +
                        informacionSistema.modulo
                      }
                    />
                  }
                  variant="outlined"
                />
              </section>
            </Grid2>
            <Grid2 size={{ xs: 0, sm: 1, md: 2, lg: 3.5 }}>
              <section className="barra-navegacion-right-section">
                <AvatarMenu nombre={usuario.nombre} usuario={usuario.usuario} />
              </section>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
    )
  );
};

export default BarraNavegacion;
