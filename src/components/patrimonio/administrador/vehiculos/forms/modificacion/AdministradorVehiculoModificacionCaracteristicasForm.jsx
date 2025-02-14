import { PaginacionTabla } from "../../../../../utils";
import { DataGrid } from "@mui/x-data-grid";
import FormCampoAutocompletarMultiple from "../../../../../utils/FormCampoAutocompletarMultiple";
import { useEffect, useState } from "react";
import {
  CAMPOS_ALTA_MUEBLE,
  CAMPOS_ALTA_VEHICULO,
  CAMPOS_MODIFICACION_VEHICULO,
} from "../../../../../../settings/formConfig";

const AdministradorVehiculoModificacionCaracteristicasForm = ({
  formManager = null,
  complementos = {},
  esVisualizacion = false,
  esModificacionFactura = false,
}) => {
  const editable = !esVisualizacion && !esModificacionFactura;
  const columnas = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      type: "string",
      headerClassName: "celdas-encabezado-tabla",
    },
    {
      field: "name",
      headerName: "Descripcion",
      width: 150,
      type: "string",
      headerClassName: "celdas-encabezado-tabla",
    },
    {
      field: "valor",
      headerName: "Valor",
      width: 250,
      type: "string",
      headerClassName: "celdas-encabezado-tabla",
      editable: editable,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
      type: "string",
      headerClassName: "celdas-encabezado-tabla",
      editable: editable,
    },
  ];
  const { CARACTERISTICAS, AUX_CARACTERISTICA } = CAMPOS_MODIFICACION_VEHICULO;
  const { control, formState, watch, setValue } = formManager;
  const { errors } = formState;
  const { caracteristicas } = complementos;
  const [cargando, setCargando] = useState(false);
  const [caracteristicasTabla, setCaracteristicasTabla] = useState([]);

  const handleChangeCaracteristica = (newValue) => {
    setCaracteristicasTabla((prevRows) => {
      const prevRowsMap = new Map(prevRows.map((row) => [row.id, row]));

      // Actualizar filas existentes y agregar nuevas
      const updatedRows = newValue.map((newRow) => {
        const existingRow = prevRowsMap.get(newRow.id); // Buscar si ya existe
        return existingRow
          ? { ...newRow, ...existingRow } // Mantener valores editados
          : { ...newRow, valor: "", estado: "" }; // Agregar valores por defecto si es nuevo
      });
      return updatedRows;
    });
  };

  const handleCellEditStop = (params, event) => {
    if (event && event.target) {
      const updatedValue = event.target.value; // Valor editado
      const fieldName = params.field; // Campo editado
      const rowId = params.id; // ID de la fila editada

      // Actualizar el estado de la tabla con el nuevo valor
      setCaracteristicasTabla((prevRows) => {
        const update = prevRows.map((row) =>
          row.id === rowId ? { ...row, [fieldName]: updatedValue } : row
        );
        return update;
      });
    }
  };

  useEffect(() => {
    const listaCaracteristicas = watch(AUX_CARACTERISTICA) ?? [];
    setCaracteristicasTabla(listaCaracteristicas);
    setCargando(true);
  }, []);

  useEffect(() => {
    if (cargando) {
      setValue(AUX_CARACTERISTICA, caracteristicasTabla);
    }
  }, [caracteristicasTabla]);

  return (
    <>
      <FormCampoAutocompletarMultiple
        id={CARACTERISTICAS}
        name={CARACTERISTICAS}
        label="Caracteristicas"
        control={control}
        options={caracteristicas}
        handleOnChange={handleChangeCaracteristica}
        error={errors[CARACTERISTICAS]}
        helperText={errors[CARACTERISTICAS]?.message}
        disabled={esVisualizacion || esModificacionFactura}
        multiple
      />
      <DataGrid
        className="tabla small"
        disableRowSelectionOnClick={esVisualizacion || esModificacionFactura}
        isRowSelectable={() => !esVisualizacion || !esModificacionFactura}
        getRowId={(e) => e.id}
        columns={columnas}
        rows={caracteristicasTabla}
        disableDensitySelector
        disableColumnMenu
        density="compact"
        slots={{
          footer: () => <PaginacionTabla />,
        }}
        processRowUpdate={(newRow) => {
          setCaracteristicasTabla((prevRows) => {
            const update = prevRows.map((row) =>
              row.id === newRow.id ? { ...row, ...newRow } : row
            );
            return update;
          });
          return newRow;
        }}
        columnHeaderHeight={40}
        experimentalFeatures={{ newEditingApi: true }}
        onCellEditStop={handleCellEditStop}
      />
    </>
  );
};

export default AdministradorVehiculoModificacionCaracteristicasForm;
