import { useEffect, useState } from "react";
import useMultiTablaDatos from "../../../../context/useMultiTablaDatos";
import { useSistema } from "../../../../context/SistemaContext";
import DialogoEmergente from "../../../utils/DialogoEmergente";
import { DataGrid } from "@mui/x-data-grid";
import { getHistorialBienMueble } from "../../../../services/patrimonio";
import { useInventarioMueble } from "../../../../context/InventarioMuebleContext";
import useTabla from "../../../../context/Tabla/useTabla";
import { useInventarioVehiculo } from "../../../../context/InventarioVehiculoContext";

const columnasBien = [
  {
    field: "idBien",
    headerName: "ID Bien",
    type: "string",
    width: 120,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "folioBien",
    headerName: "Folio Bien",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "unidadAdministrativa",
    headerName: "Unidad Administrativa",
    type: "string",
    width: 200,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "tipoBien",
    headerName: "Tipo Bien",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "familia",
    headerName: "Familia",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "subfamilia",
    headerName: "Subfamilia",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "descripcion",
    headerName: "Descripción",
    type: "string",
    width: 250,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "activo",
    headerName: "Activo",
    type: "boolean",
    width: 100,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "fechaAlta",
    headerName: "Fecha Alta",
    type: "string",
    width: 130,
    headerClassName: "celdas-encabezado-tabla",
  },
];
const columnasHistorial = [
  {
    field: "idHistorial",
    headerName: "ID",
    type: "string",
    width: 100,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "modulo",
    headerName: "Módulo",
    type: "string",
    width: 120,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "subModulo",
    headerName: "Sub Módulo",
    type: "string",
    width: 120,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "tipoTramite",
    headerName: "Tipo de Trámite",
    type: "string",
    width: 200,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "motivoTramite",
    headerName: "Motivo del Trámite",
    type: "string",
    width: 250,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "usuario",
    headerName: "Usuario",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "fecha",
    headerName: "Fecha",
    type: "string",
    width: 200,
    headerClassName: "celdas-encabezado-tabla",
  },
];

const InventarioVehiculoHistorial = () => {
  const { handleError } = useSistema();
  const { dialogoManager } = useInventarioVehiculo();

  const { dialogo, handleCerrarDialogo } = dialogoManager;
  const { filaSeleccionadaData } = useTabla();
  const {
    tablaSuperior,
    tablaInferior,
    addDatosTablaInferior,
    addDatosTablaSuperior,
  } = useMultiTablaDatos();
  const [cargando, setCargando] = useState(false);
  const tituloDialogo = "Historial Maquinaria y Vehículo";

  useEffect(() => {
    setCargando(true);
    const idBien = filaSeleccionadaData.idBien;
    getHistorialBienMueble({ idBien: idBien })
      .then((historial) => {
        addDatosTablaSuperior([filaSeleccionadaData]);
        addDatosTablaInferior(historial);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <DialogoEmergente
      titulo={tituloDialogo}
      cargando={cargando}
      abierto={dialogo.abierto}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar="Cerrar"
      disabledConfirmar
    >
      <DataGrid
        className="tabla min"
        disableRowSelectionOnClick
        isRowSelectable={() => false}
        getRowId={(e) => e.idBien}
        columns={columnasBien}
        rows={tablaSuperior.datos}
        disableDensitySelector
        disableColumnMenu
        density="compact"
        slots={{
          footer: () => null,
        }}
        columnHeaderHeight={40}
      />

      <DataGrid
        className="tabla small"
        disableRowSelectionOnClick
        isRowSelectable={() => false}
        getRowId={(e) => e.idHistorial}
        columns={columnasHistorial}
        rows={tablaInferior.datos}
        disableDensitySelector
        disableColumnMenu
        density="compact"
        slots={{
          footer: () => null,
        }}
        columnHeaderHeight={40}
      />
    </DialogoEmergente>
  );
};

export default InventarioVehiculoHistorial;
