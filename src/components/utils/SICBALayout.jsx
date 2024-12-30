import BarraNavegacion from "@components/utils/BarraNavegacion";
import { useSistema } from "../../context/SistemaContext";
import { Box, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import SimpleDialog from "../dialogs/SimpleDialog";

const SICBALayout = () => {
  const { error, alerta, handleCerrarAlerta } = useSistema();
  return (
    <>
      <BarraNavegacion />
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </Box>
      {error.hasError && (
        <SimpleDialog open={alerta} close={handleCerrarAlerta}>
          <Typography className="contenido-simple">{error.message}</Typography>
        </SimpleDialog>
      )}
    </>
  );
};

export default SICBALayout;
