import BarraNavegacion from "@components/utils/BarraNavegacion";
import { useSistema } from "../../context/SistemaContext";
import { Box} from "@mui/material";
import { Outlet } from "react-router-dom";
import DialogoEmergenteError from "./DialogoEmergenteError";

const SICBALayout = () => {
  const { error, alerta, handleCerrarAlerta } = useSistema();
  return (
    <>
      <BarraNavegacion />
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </Box>
      {error.hasError && (
        <DialogoEmergenteError
          error={error}
          alerta={alerta}
          handleCerrarAlerta={handleCerrarAlerta}
        />
      )}
    </>
  );
};

export default SICBALayout;
