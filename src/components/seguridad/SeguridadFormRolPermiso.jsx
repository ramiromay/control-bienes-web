import { PropTypes } from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import FormCampoAutocompletar from "../utils/FormCampoAutocompletar";
import { CAMPOS_EMPLEADO } from "../../settings/formConfig";
import { PaginacionTabla } from "../utils";

const columnasRolPermiso = [
  {
    field: "idPermiso",
    headerName: "ID",
    width: 80,
    type: "long",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "nombre",
    headerName: "Permiso",
    width: 300,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "descripcion",
    headerName: "Descripción",
    width: 400,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
];
const SeguridadFormRolPermiso = ({
  formManager = null,
  permisos,
  roles,
  esVisualizacion = false,
}) => {
  const { control, formState, setValue, watch } = formManager;
  const { errors } = formState;
  const permisosSelecionados = watch(CAMPOS_EMPLEADO.PERMISOS);

  const changeRoleXPermiso = (role) => {};

  const handleSelectionModelChange = (newSelection) => {
    if (esVisualizacion) return;
    setValue(CAMPOS_EMPLEADO.PERMISOS, newSelection);
  };

  return (
    <>
      <FormCampoAutocompletar
        id={CAMPOS_EMPLEADO.ROL}
        name={CAMPOS_EMPLEADO.ROL}
        label="Rol"
        control={control}
        options={roles}
        error={errors[CAMPOS_EMPLEADO.ROL]}
        helperText={errors[CAMPOS_EMPLEADO.ROL]?.message}
        required
        disabled={esVisualizacion}
      />
      <DataGrid
        className="tabla"
        sx={{
          height: "320px",
          outline: "1px solid rgba(0,0,0,0.2)",
        }}
        disableRowSelectionOnClick={esVisualizacion}
        isRowSelectable={(params) => !esVisualizacion}
        columns={columnasRolPermiso}
        rows={permisos}
        getRowId={(e) => e.idPermiso}
        checkboxSelection
        disableDensitySelector
        disableColumnMenu
        density="compact"
        onRowSelectionModelChange={handleSelectionModelChange}
        slots={{
          footer: () => <PaginacionTabla />,
        }}
        columnHeaderHeight={40}
        rowSelectionModel={permisosSelecionados}
      />
    </>
  );
};

SeguridadFormRolPermiso.propTypes = {
  formManager: PropTypes.object.isRequired,
  permisos: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  esVisualizacion: PropTypes.bool.isRequired,
};

export default SeguridadFormRolPermiso;
