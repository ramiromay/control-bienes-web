import { Grid2, Grow, Typography } from "@mui/material";
import { useSistema } from "../../context/SistemaContext";
import { useEffect } from "react";
import CardItem from "../utils/CardItem";
import Mensaje from "../utils/Mensaje";
import { ExtensionTwoTone } from "@mui/icons-material";
import useIncio from "../../context/useInicio";
import InicioSkeleton from "./InicioSkeleton";
import { IDS_SUBMODULOS } from "../../settings/sistemaConfig";

const Inicio = () => {
  const timer = 1000;
  const { handleChangeModulo, usuario, handleNavigateModulo } = useSistema();
  const { cargando, modulos } = useIncio();

  useEffect(() => {
    handleChangeModulo({ idSubModulo: IDS_SUBMODULOS.INCIO });
  }, []);

  if (cargando) {
    return <InicioSkeleton />;
  }

  return (
    <section className="home-container">
      <section className="home-section">
        <section className="home-content">
          <header className="home-header">
            <article className="home-header-text">
              <Typography variant="h1" className="home-title">
                Bienvenido, {usuario.nombre}
              </Typography>
              <Typography variant="subtitle1" className="home-subtitle">
                SICBA - Sistema Integral de Control de Bienes y Almacenes
              </Typography>
            </article>
          </header>
          <Typography variant="h2" className="home-systems-title">
            Sistemas disponibles
          </Typography>
          {modulos.length > 0 ? (
            <Grid2 container spacing={2}>
              {modulos.map((modulo, index) => (
                <Grow
                  key={modulo.idModulo}
                  in={!cargando}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(!cargando
                    ? {
                        timeout:
                          index === 0 ? timer : timer + (timer / 2) * index,
                      }
                    : {})}
                >
                  <Grid2
                    onClick={() => handleNavigateModulo(modulo.idModulo)}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  >
                    <CardItem
                      icono={<ExtensionTwoTone className="icon" />}
                      nombre={modulo.nombre}
                      abreviacion={modulo.abreviacion}
                      descripcion={modulo.descripcion}
                    />
                  </Grid2>
                </Grow>
              ))}
            </Grid2>
          ) : (
            <Mensaje mensaje="No se encontraron sistemas disponibles" />
          )}
        </section>
      </section>
    </section>
  );
};

export default Inicio;
