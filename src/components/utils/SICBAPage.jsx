import Inicio from "@components/inicio/Inicio";
import Menu from "@components/menu/Menu";
import { CatalogoProvider } from "@context/CatalogoContext";
import Catalogos from "@components/patrimonio/catalogos/Catalogos";
import Login from "@components/login/Login";
import NoEncontradoPage from "./NoEncontradoPage";
import SICBALayout from "./SICBALayout";
import { Route, Routes } from "react-router-dom";
import { LoginProvider } from "../../context/LoginContext";
import { PERMISOS } from "../../settings/permisosConfig";
import { ROUTES } from "../../settings/routeConfig";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { SeguridadProvider } from "../../context/SeguridadContext";
import Seguridad from "../seguridad/Seguridad";

const SICBAPage = () => {
  return (
    <main className="sicba-container">
      <Routes>
        <Route element={<SICBALayout />}>
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginProvider>
                  <Login />
                </LoginProvider>
              </PublicRoute>
            }
          />
          <Route
            index
            element={
              <PrivateRoute>
                <Inicio />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MENU_PATRIMONIO}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_42}>
                <Menu />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ADMINISTRADOR_CATALOGOS_SIP}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_31}>
                <CatalogoProvider>
                  <Catalogos />
                </CatalogoProvider>
              </PrivateRoute>
            }
          />

          <Route
            path={ROUTES.MENU_ALMANCEN}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_43}>
                <Menu />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MENU_SEGURIDAD}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_44}>
                <Menu />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ADMINISTRADOR_EMPLEADOS_USUARIOS}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_45}>
                <SeguridadProvider>
                  <Seguridad />
                </SeguridadProvider>
              </PrivateRoute>
            }
          />

          <Route
            path={ROUTES.NO_ENCONTRADO_ORIGINAL}
            element={<NoEncontradoPage />}
          />
          <Route
            path={ROUTES.NO_ENCONTRADO_COMODIN}
            element={<NoEncontradoPage />}
          />
        </Route>
      </Routes>
    </main>
  );
};

export default SICBAPage;
