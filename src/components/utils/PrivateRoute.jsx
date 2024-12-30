import { PropTypes } from 'prop-types';
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSistema } from "../../context/SistemaContext";
import useValidateSession from "../../context/useValidateSession";

function PrivateRoute({ permiso, redirectTo = "/login", children }) {
    const location = useLocation();
    const { usuario } = useSistema();
    const { isAuthenticated, isLoading } = useValidateSession({
      pathname: location.pathname,
    });
  
    // Mostrar un indicador mientras se obtienen los datos del usuario
  
    if (isLoading) {
      return (
        <Box
          sx={{
            minHeight: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ); // O usa un spinner aquí
    }
  
    // Verifica si el usuario no está autenticado
    if (!isAuthenticated) {
      return <Navigate to={redirectTo} />;
    }
  
    // Verifica si el usuario está autenticado pero no tiene el permiso
    if (permiso && !usuario.permisos.includes(permiso)) {
      return <Navigate to="/" />;
    }
  
    // Si está autenticado y tiene permisos, renderiza el contenido
    return children ? children : <Outlet />;
  }

  PrivateRoute.propTypes = {
    permiso: PropTypes.number,
    redirectTo: PropTypes.string,
    children: PropTypes.node,
  };

  export default PrivateRoute;