import { useEffect, useState } from "react";
import { CAMPOS_MOVIMIENTO } from "../../../../../settings/formConfig";
import FormCampoAutocompletarMultiple from "../../../../utils/FormCampoAutocompletarMultiple";
import FormCampoAutocompletar from "../../../../utils/FormCampoAutocompletar";
import { DataGrid } from "@mui/x-data-grid";
import { PaginacionTabla } from "../../../../utils";
import ItemInfoExtraAutocompletar from "../../../../utils/ItemInfoExtraAutocompletar";
import FormCampoEntrada from "../../../../utils/FormCampoEntrada";
import { InputAdornment } from "@mui/material";

const EntradaSalidaArticuloForm = ({
  formManager = null,
  complementos = {},
  esVisualizacion = false,
}) => {
  const columnasDetalles = [
    {
      field: "id",
      headerName: "ID Artículo",
      width: 100,
      headerClassName: "celdas-encabezado-tabla",
    },
    {
      field: "articulo",
      headerName: "Artículo",
      width: 150,
      headerClassName: "celdas-encabezado-tabla",
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 150,
      type: "string",
      headerClassName: "celdas-encabezado-tabla",
      editable: !esVisualizacion,
    },
    {
      field: "precio",
      headerName: "Precio Unitario",
      width: 150,
      type: "string",
      headerClassName: "celdas-encabezado-tabla",
    },
    {
      field: "total",
      headerName: "Subtotal",
      width: 150,
      type: "string",
      headerClassName: "celdas-encabezado-tabla",
    },
  ];
  const {
    ARTICULOS,
    ID_FAMILIA,
    AUX_ARTICULOS,
    IMPORTE_TOTAL,
    ID_ALMACEN,
    ID_TIPO_MOVIMIENTO,
  } = CAMPOS_MOVIMIENTO;
  const { control, formState, watch, setValue } = formManager;
  const { errors } = formState;
  const { bms, familias, bienes } = complementos;
  const [cargando, setCargando] = useState(false);
  const [articulosTabla, setArticulosTabla] = useState([]);
  const [bmsXFamilia, setBmsXFamilia] = useState([]);
  const [tipoMovimiento, setTipoMovimiento] = useState([]);

  const changeFamilia = (familia) => {
    if (!familia) {
      setValue(ARTICULOS, null);
      setValue(AUX_ARTICULOS, null);
      setValue(IMPORTE_TOTAL, null);
      setBmsXFamilia([]);
      return;
    }
    if (tipoMovimiento === 2) {
      const almacen = watch(ID_ALMACEN);
      const itemsFiltrado = bienes.filter(
        (e) => e.idFamilia === familia.id && e.idAlmacen === almacen.id
      );
      setValue(ARTICULOS, null);
      setBmsXFamilia(itemsFiltrado);
    } else {
      const itemsFiltrado = bms.filter((e) => e.idFamilia === familia.id);
      setValue(ARTICULOS, null);
      setBmsXFamilia(itemsFiltrado);
    }
  };

  const handleChangeCaracteristica = (newValue) => {
    setArticulosTabla((prevRows) => {
      const prevRowsMap = new Map(prevRows.map((row) => [row.id, row])); // Usamos idArticulo como clave

      // Actualizar filas existentes y agregar nuevas
      const updatedRows = newValue.map((newRow) => {
        const existingRow = prevRowsMap.get(newRow.id); // Buscar si ya existe
        return existingRow
          ? { ...newRow, ...existingRow }
          : {
              ...newRow,
              id: newRow.id,
              articulo: newRow.name,
              cantidad: newRow.cantidad || 1,
              precio: newRow.precioUnitario,
              total:
                Number(newRow.cantidad || 1) * Number(newRow.precioUnitario),
            }; // Agregar valores por defecto si es nuevo
      });
      const sumaPrecios = updatedRows.reduce((acumulador, objeto) => {
        return acumulador + Number(objeto.cantidad) * Number(objeto.precio);
      }, 0);
      setValue(IMPORTE_TOTAL, sumaPrecios);
      return updatedRows;
    });
  };

  const handleCellEditStop = (params, event) => {
    if (event && event.target) {
      const updatedValue = event.target.value; // Valor editado
      const fieldName = params.field; // Campo editado
      const rowId = params.id; // ID de la fila editada (usamos idArticulo)

      // Lógica para actualizar el campo relacionado
      setArticulosTabla((prevRows) => {
        const updatedRows = prevRows.map((row) => {
          if (row.id === rowId) {
            const updatedRow = { ...row, [fieldName]: updatedValue };

            // Si se editó el campo 'precio', actualizamos 'total' (por ejemplo, precio * cantidad)
            if (fieldName === "cantidad") {
              const cantidad = row.cantidad || 1; // Asume 1 si no se encuentra cantidad
              updatedRow.total = updatedValue * cantidad;
            }

            return updatedRow;
          }
          return row;
        });

        return updatedRows;
      });
    }
  };

  useEffect(() => {
    const listaCaracteristicas = watch(AUX_ARTICULOS) ?? [];
    const tipoMovimientoFind = watch(ID_TIPO_MOVIMIENTO) ?? [];
    const familia = watch(ID_FAMILIA) ?? [];
    if (tipoMovimientoFind.id === 2) {
      const almacen = watch(ID_ALMACEN);
      const itemsFiltrado = bienes.filter(
        (e) => e.idFamilia === familia.id && e.idAlmacen === almacen.id
      );
      setBmsXFamilia(itemsFiltrado);
    } else {
      setBmsXFamilia(bms.filter((e) => e.idFamilia === familia.id));
    }
    setTipoMovimiento(tipoMovimientoFind.id);
    setArticulosTabla(listaCaracteristicas);
    setCargando(true);
  }, []);

  useEffect(() => {
    if (cargando) {
      setValue(AUX_ARTICULOS, articulosTabla);
    }
  }, [articulosTabla]);

  return (
    <>
      <FormCampoAutocompletar
        id={ID_FAMILIA}
        name={ID_FAMILIA}
        label="Familia"
        control={control}
        options={familias}
        error={errors[ID_FAMILIA]}
        handleOnChange={changeFamilia}
        helperText={errors[ID_FAMILIA]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletarMultiple
        id={ARTICULOS}
        name={ARTICULOS}
        label={tipoMovimiento === 1 ? "Articulos" : "Bienes en Almacen"}
        control={control}
        options={bmsXFamilia}
        required
        renderOption={ItemInfoExtraAutocompletar}
        handleOnChange={handleChangeCaracteristica}
        error={errors[ARTICULOS]}
        helperText={errors[ARTICULOS]?.message}
        disabled={esVisualizacion}
        multiple
      />
      <FormCampoEntrada
        id={IMPORTE_TOTAL}
        name={IMPORTE_TOTAL}
        label="Importe Total"
        control={control}
        defaultValue="0"
        error={errors[IMPORTE_TOTAL]}
        helperText={errors[IMPORTE_TOTAL]?.message}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
        disabled
        required
      />
      <DataGrid
        className="tabla small"
        disableRowSelectionOnClick={esVisualizacion}
        isRowSelectable={() => !esVisualizacion}
        getRowId={(e) => e.id}
        columns={columnasDetalles}
        rows={articulosTabla}
        disableDensitySelector
        disableColumnMenu
        density="compact"
        slots={{
          footer: () => <PaginacionTabla />,
        }}
        processRowUpdate={(newRow) => {
          // Si se edita el campo 'precio', actualizamos 'total' basado en 'precio' * 'cantidad'
          if (newRow.cantidad) {
            const cantidad = newRow.cantidad || 1; // Usar 1 si no hay valor de 'cantidad'
            newRow.total = newRow.precio * cantidad;
            const sumaPrecios = articulosTabla.reduce((acumulador, objeto) => {
              // Condición para omitir el objeto con un id específico, por ejemplo 'articulo_omitido'
              if (objeto.id !== newRow.id) {
                return (
                  acumulador + Number(objeto.cantidad) * Number(objeto.precio)
                );
              }
              return acumulador; // Si se omite, simplemente se devuelve el acumulador sin cambios
            }, 0);
            setValue(IMPORTE_TOTAL, sumaPrecios + newRow.total);
          }

          // Actualizamos el estado con la fila modificada
          setArticulosTabla((prevRows) => {
            const update = prevRows.map((row) =>
              row.id === newRow.id ? { ...row, ...newRow } : row
            );
            return update;
          });

          // Retornamos la nueva fila con el total actualizado
          return newRow;
        }}
        columnHeaderHeight={40}
        experimentalFeatures={{ newEditingApi: true }}
        onCellEditStop={handleCellEditStop}
      />
    </>
  );
};

export default EntradaSalidaArticuloForm;
