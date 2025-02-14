import PaginacionTabla from "@components/utils/PaginacionTabla";
import { DataGrid } from "@mui/x-data-grid";
import FormCampoAutocompletarMultiple from "@components/utils/FormCampoAutocompletarMultiple";
import { useEffect, useState } from "react";
import { CAMPOS_ALTA_MUEBLE } from "@settings/formConfig";
import { CAMPOS_INVENTARIO_MUEBLE } from "../../../../../settings/formConfig";

const InventarioMuebleCaracteristicasForm = ({
  formManager = null,
  complementos = {},
}) => {
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
      editable: false,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
      type: "string",
      headerClassName: "celdas-encabezado-tabla",
      editable: false,
    },
  ];
  const { CARACTERISTICAS, AUX_CARACTERISTICA } = CAMPOS_INVENTARIO_MUEBLE;
  const { control, watch, setValue } = formManager;
  const { caracteristicas } = complementos;
  const [cargando, setCargando] = useState(false);
  const [caracteristicasTabla, setCaracteristicasTabla] = useState([]);

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
        disabled
        multiple
      />
      <DataGrid
        className="tabla small"
        disableRowSelectionOnClick
        isRowSelectable={() => false}
        getRowId={(e) => e.id}
        columns={columnas}
        rows={caracteristicasTabla}
        disableDensitySelector
        disableColumnMenu
        density="compact"
        slots={{
          footer: () => <PaginacionTabla />,
        }}
        columnHeaderHeight={40}
      />
    </>
  );
};

export default InventarioMuebleCaracteristicasForm;
