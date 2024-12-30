import { Grid2, Typography } from "@mui/material";
import { useSistema } from "../../context/SistemaContext";
import { useEffect } from "react";
import { IDS_MODULOS, IDS_SUBMODULOS } from "../../settings/sistemaConfig";
import CardItem from "../utils/CardItem";
import Mensaje from "../utils/Mensaje";
import MenuSkeleton from "./MenuSkeleton";
import useMenu from "../../context/useMenu";
import { WebTwoTone } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const Menu = () => {
  const {
    handleChangeModulo,
    handleNavigateSubModulo,
    getIdMenuModulo,
  } = useSistema();
  const location = useLocation();
  const [idModulo] = getIdMenuModulo({ pathname: location.pathname });
  const { cargando, menu } = useMenu({
    idModulo: idModulo,
  });

  useEffect(() => {
    handleChangeModulo({idSubModulo: IDS_SUBMODULOS.MENU});
  }, []);

  if (cargando) {
    console.log("cargando");
    return <MenuSkeleton />;
  }

  console.log(menu)

  return (
    <section className="menu-container ">
      <section className="menu-header">
        <article className="menu-header-content">
          <Typography variant="h5" className="menu-header-title">
            Bienvenido al {menu.modulo.nombre}
          </Typography>
          <Typography variant="body1" className="menu-header-description">
            {menu.modulo.descripcion}
          </Typography>
        </article>
      </section>
      <section className="menu-content">
        <section className="menu-content-box">
          {menu.existenOpcionesModulosPrincipales ||
          menu.existenOpcionesCatalogos ? (
            <>
              {menu.existenOpcionesModulosPrincipales && (
                <>
                  <Typography
                    variant="subtitle1"
                    className="menu-section-title"
                  >
                    Modulos Principales
                  </Typography>
                  <Grid2 container spacing={2}>
                    {menu.modulosPrincipales.map((subModulo) => (
                      <Grid2
                        key={subModulo.idSubModulo}
                        onClick={() =>
                          handleNavigateSubModulo(subModulo.idSubModulo)
                        }
                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                      >
                        <CardItem
                          icono={<WebTwoTone className="icon" />}
                          nombre={subModulo.nombre}
                          abreviacion={subModulo.abreviacion}
                          descripcion={subModulo.descripcion}
                        />
                      </Grid2>
                    ))}
                  </Grid2>
                </>
              )}

              {menu.existenOpcionesCatalogos && (
                <>
                  <Typography
                    variant="subtitle1"
                    className="menu-section-title"
                  >
                    Catalogos
                  </Typography>
                  <Grid2 container spacing={2}>
                    {menu.catalogos.map((subModulo) => (
                      <Grid2
                        key={subModulo.idSubModulo}
                        onClick={() =>
                          handleNavigateSubModulo(subModulo.idSubModulo)
                        }
                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                      >
                        <CardItem
                          icono={<WebTwoTone className="icon" />}
                          nombre={subModulo.nombre}
                          abreviacion={subModulo.abreviacion}
                          descripcion={subModulo.descripcion}
                        />
                      </Grid2>
                    ))}
                  </Grid2>
                </>
              )}
            </>
          ) : (
            <Mensaje mensaje="No se encontraron opciones disponibles para este sistema" />
          )}
        </section>
      </section>
    </section>
  );
};

export default Menu;
