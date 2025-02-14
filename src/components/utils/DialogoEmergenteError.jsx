import { PropTypes } from "prop-types";
import { Stack, Typography } from "@mui/material";
import { BAD_REQUEST_ID } from "../../settings/appConstants";
import { DataGrid } from "@mui/x-data-grid";
import DialogoEmergente from "./DialogoEmergente";

const columnasTablaError = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
    headerClassName: "celdas-encabezado-tabla",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "descripcion",
    headerName: "Descripcion",
    headerClassName: "celdas-encabezado-tabla",
    width: 350,
  },
];

const DialogoEmergenteError = ({ error, alerta, handleCerrarAlerta }) => {
  let errores = [];
  const hasMultipleErrors = error.message.includes(BAD_REQUEST_ID);
  const mensaje = error.message.trim().replace(BAD_REQUEST_ID, "");
  if (hasMultipleErrors) {
    errores = mensaje
      .replace(BAD_REQUEST_ID, "")
      .trim()
      .split(",")
      .map((error, index) => {
        return {
          id: index + 1,
          descripcion: error,
        };
      });
  }

  return (
    <DialogoEmergente
      titulo="Información del Problema"
      abierto={alerta}
      onClickCancelar={handleCerrarAlerta}
      width={hasMultipleErrors ? "550px" : "450px"}
      textoCancelar="Confirmar"
      activateEspacioPie
      disabledConfirmar
    >
      {hasMultipleErrors ? (
        <Stack spacing={2}>
          <Typography variant="body1">El servidor ha detectado múltiples errores en la solicitud. Estos errores impiden que el sistema pueda procesar la información correctamente. A continuación, se muestra los errores encontrados en la solicitud:</Typography>
          <DataGrid
            className="tabla small"
            disableRowSelectionOnClick={false}
            isRowSelectable={() => false}
            columns={columnasTablaError}
            rows={errores}
            getRowId={(e) => e.id}
            disableDensitySelector
            disableColumnMenu
            density="compact"
            columnHeaderHeight={40}
            getEstimatedRowHeight={() => 200}
            getRowHeight={() => "auto"}
            slots={{ footer: () => null }}
          />
          <Typography variant="body1">Por favor, revise cuidadosamente los errores mencionados:</Typography>
          <ul>
            <Typography>1. Asegúrese de que todos los campos obligatorios estén completos.</Typography>
            <Typography>2. Verifique los formatos de los valores esperados</Typography>
            <Typography>3. Si hay campos con opciones específicas, seleccione una opción válida.</Typography>
          </ul>
          <Typography variant="body1">Después de corregir los errores, vuelva a enviar la solicitud. Si los problemas persisten o tiene dudas, no dude en contactar al soporte técnico para recibir asistencia.</Typography>
        </Stack>
      ) : (
        <Typography >{mensaje}</Typography>
      )}
    </DialogoEmergente>
  );
};

DialogoEmergenteError.propTypes = {
  error: PropTypes.object,
  alerta: PropTypes.bool,
  handleCerrarAlerta: PropTypes.func,
};

export default DialogoEmergenteError;
