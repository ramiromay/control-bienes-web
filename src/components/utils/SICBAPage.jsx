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
import AdministradorSolicitudesMuebles from "../patrimonio/administrador/muebles/AdministradorSolicitudesMuebles";
import { AdministradorMuebleProvider } from "../../context/AdministradorMuebleContext";
import { AdministradorVehiculoProvider } from "../../context/AdministradorVehiculoContext";
import AdministradorVehiculo from "../patrimonio/administrador/vehiculos/AdministradorVehiculo";
import AdministradorInmueble from "../patrimonio/administrador/inmuebles/AdministradorInmueble";
import { AdministradorInmuebleProvider } from "../../context/AdministradorInmuebleContext";
import { InventarioMuebleProvider } from "../../context/InventarioMuebleContext";
import InventarioMueble from "../patrimonio/inventario/mueble/InventarioMueble";
import { InventarioVehiculoProvider } from "../../context/InventarioVehiculoContext";
import InventarioVehiculo from "../patrimonio/inventario/vehiculo/InventarioVehiculo";
import { InventarioInmuebleProvider } from "../../context/InventarioInmuebleContext";
import InventarioInmueble from "../patrimonio/inventario/inmueble/InventarioInmueble";
import { DepreciacionProvider } from "../../context/DepreciacionContext";
import Depreciacion from "../patrimonio/depreciacion/Depreciacion";
import CatalogosSIA from "../almacen/catalogos/CatalogosSIA";
import { EntradaSalidaProvider } from "../../context/EntradaSalidaContext";
import EntradaSalida from "../almacen/entrada-salida/EntradaSalida";
import { InventarioAlmacenProvider } from "../../context/InventarioAlmacenContext";
import InventarioAlmacen from "../almacen/inventario/InventarioAlmacen";

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
            path={ROUTES.ADMINISTRADOR_CEDULAS_BIENES_MUEBLES}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_33}>
                <AdministradorMuebleProvider>
                  <AdministradorSolicitudesMuebles />
                </AdministradorMuebleProvider>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ADMINISTRADOR_CEDULAS_BIENES_VEHICULARES}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_33}>
                <AdministradorVehiculoProvider>
                  <AdministradorVehiculo />
                </AdministradorVehiculoProvider>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ADMINISTRADOR_CEDULAS_BIENES_INMUEBLES}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_33}>
                <AdministradorInmuebleProvider>
                  <AdministradorInmueble />
                </AdministradorInmuebleProvider>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.INVENTARIO_BIENES_MUEBLES}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_33}>
                <InventarioMuebleProvider>
                  <InventarioMueble />
                </InventarioMuebleProvider>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.INVENTARIO_BIENES_VEHICULARES}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_33}>
                <InventarioVehiculoProvider>
                  <InventarioVehiculo />
                </InventarioVehiculoProvider>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.INVENTARIO_BIENES_INMUEBLES}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_33}>
                <InventarioInmuebleProvider>
                  <InventarioInmueble />
                </InventarioInmuebleProvider>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.DEPRECIACION}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_33}>
                <DepreciacionProvider>
                  <Depreciacion />
                </DepreciacionProvider>
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
            path={ROUTES.ADMINISTRADOR_CATALOGOS_SIA}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_31}>
                <CatalogoProvider>
                  <CatalogosSIA />
                </CatalogoProvider>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ENTRADAS_SALIDAS}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_31}>
                <EntradaSalidaProvider>
                  <EntradaSalida />
                </EntradaSalidaProvider>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.INVENTARIO_ALMACEN}
            element={
              <PrivateRoute permiso={PERMISOS.PERMISO_31}>
                <InventarioAlmacenProvider>
                  <InventarioAlmacen />
                </InventarioAlmacenProvider>
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
