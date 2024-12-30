import { PropTypes } from 'prop-types';
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useValidateSession from "../../context/useValidateSession";

const PublicRoute = ({ redirectTo = "/", children }) => {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useValidateSession({
      pathname: location.pathname,
    });
  
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
    // Si está autenticado, redirige a /home
    if (isAuthenticated) {
      return <Navigate to={redirectTo} />;
    }
  
    // Si no está autenticado, renderiza el contenido público
    return children ? children : <Outlet />;
  }

  PublicRoute.propTypes = {
    redirectTo: PropTypes.string,
    children: PropTypes.node,
  };

  export default PublicRoute;