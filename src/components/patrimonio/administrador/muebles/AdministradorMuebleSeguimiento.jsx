import { useEffect, useState } from "react";
import useMultiTablaDatos from "../../../../context/useMultiTablaDatos";
import { useAdministradorMueble } from "../../../../context/AdministradorMuebleContext";
import { useSistema } from "../../../../context/SistemaContext";
import DialogoEmergente from "../../../utils/DialogoEmergente";
import { DataGrid } from "@mui/x-data-grid";
import { getSeguimiento } from "../../../../services/patrimonio";
import { useMultiTabla } from "../../../../context/MultiTablaContext";

const columnasTramite = [
  {
    field: "idDetalleSolicitud",
    headerName: "ID Trámite",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "folioBien",
    headerName: "Folio Bien",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "etapa",
    headerName: "Etapa",
    width: 100,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "tipoBien",
    headerName: "Tipo Bien",
    width: 200,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "familia",
    headerName: "Familia",
    width: 250,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "subFamilia",
    headerName: "Subfamilia",
    width: 250,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "ubicacion",
    headerName: "Ubicación",
    width: 300,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "descripcion",
    headerName: "Descripción",
    width: 300,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "fechaCreacion",
    headerName: "Fecha de Creación",
    width: 200,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "fechaModificacion",
    headerName: "Fecha de Modificación",
    width: 200,
    headerClassName: "celdas-encabezado-tabla",
  },
];
const columnasSeguimiento = [
  {
    field: "fechaHora",
    headerName: "Fecha y Hora",
    width: 180,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "modulo",
    headerName: "Sistema",
    width: 100,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "subModulo",
    headerName: "Modulo",
    width: 100,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "etapa",
    headerName: "Etapa",
    width: 200,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "usuario",
    headerName: "Usuario",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
];

const AdministradorMuebleSeguimiento = () => {
  const { handleError } = useSistema();
  const { dialogoTramites } = useAdministradorMueble();

  const { dialogo, handleCerrarDialogo } = dialogoTramites;
  const { filaSeleccionada } = useMultiTabla();
  const {
    tablaSuperior,
    tablaInferior,
    addDatosTablaInferior,
    addDatosTablaSuperior,
  } = useMultiTablaDatos();
  const [cargando, setCargando] = useState(false);
  const tituloDialogo = "Seguimiento Trámite Mueble";

  useEffect(() => {
    setCargando(true);
    const tramite = filaSeleccionada.informacionTablaInferior;
    const idTramite = filaSeleccionada.tablaInferior;
    getSeguimiento({ idTramite: idTramite })
      .then((seguimiento) => {
        addDatosTablaSuperior([tramite]);
        addDatosTablaInferior(seguimiento);
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
        getRowId={(e) => e.idDetalleSolicitud}
        columns={columnasTramite}
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
        getRowId={(e) => e.idSeguimiento}
        columns={columnasSeguimiento}
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

export default AdministradorMuebleSeguimiento;
