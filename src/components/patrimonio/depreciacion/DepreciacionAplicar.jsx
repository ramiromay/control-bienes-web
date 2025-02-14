import React from "react";
import DialogoEmergente from "../../utils/DialogoEmergente";
import { useDepreciacion } from "../../../context/DepreciacionContext";
import { Typography } from "@mui/material";
import { useSistema } from "../../../context/SistemaContext";

const DepreciacionAplicar = () => {
  const { cargando } = useSistema();
  const { dialogoManager, handleAplicarDepreciacion } = useDepreciacion();
  const { dialogo, handleCerrarDialogo } = dialogoManager;
  const tituloDialogo = "Confirmar Depreciación";

  return (
    <DialogoEmergente
      titulo={tituloDialogo}
      cargando={cargando.activo}
      abierto={dialogo.abierto}
      onClickConfirmar={handleAplicarDepreciacion}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar={"Cancelar"}
      width="470px"
    >
      <Typography>
        ¿Está seguro de aplicar la depreciación? Este proceso puede tardar
        varios minutos y no podrá ser interrumpido una vez iniciado. ¿Desea
        continuar?
      </Typography>
    </DialogoEmergente>
  );
};

export default DepreciacionAplicar;
