import { useEffect, useState } from "react";
import { useInventarioInmueble } from "../../../../context/InventarioInmuebleContext";
import { useMultiTabla } from "../../../../context/MultiTablaContext";
import { useSistema } from "../../../../context/SistemaContext";
import useMultiTablaDatos from "../../../../context/useMultiTablaDatos";
import { getDepreciacionPorBien } from "../../../../services/patrimonio";
import DialogoEmergente from "../../../utils/DialogoEmergente";
import { DataGrid } from "@mui/x-data-grid";
import { InputAdornment, Stack } from "@mui/material";
import FormRangoFecha from "../../../utils/FormCampoRangoFechas";
import Acordeon from "../../../utils/Acordeon";
import { DateRangeIcon } from "@mui/x-date-pickers";
import FormCampoEntrada from "../../../utils/FormCampoEntrada";
import {
  CAMPOS_DEPRECIACION,
  CAMPOS_FILTRO_INVENTARIO,
} from "../../../../settings/formConfig";
import useTabla from "../../../../context/Tabla/useTabla";
import Mensaje from "../../../utils/Mensaje";
import {
  AttachMoneySharp,
  MoneyOffCsredSharp,
  RequestQuote,
} from "@mui/icons-material";
import { useInventarioMueble } from "../../../../context/InventarioMuebleContext";
import { PaginacionTabla } from "../../../utils";

const columnasDepreciaicion = [
  {
    field: "idDepreciacion",
    headerName: "ID",
    width: 100,
    headerClassName: "celdas-encabezado-tabla",
  },

  {
    field: "depreciaionAcumulada",
    headerName: "Depreciación Acumulada",
    width: 180,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "valorLibros",
    headerName: "Valor en Libros",
    width: 150,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "depreciacionFiscal",
    headerName: "Depreciación Fiscal",
    width: 160,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "tasa",
    headerName: "Tasa",
    width: 120,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "depreciacion",
    headerName: "Depreciación",
    width: 130,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },

  {
    field: "valorHistorico",
    headerName: "Valor Histórico",
    width: 150,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "aniosVida",
    headerName: "Años de Vida",
    width: 130,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "activo",
    headerName: "Activo",
    width: 100,
    type: "boolean",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "fecha",
    headerName: "Fecha",
    width: 180,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
];

const InventarioMuebleDepreciacion = () => {
  const { handleError } = useSistema();
  const { dialogoManager, formManager } = useInventarioMueble();
  const { control, formState, setValue } = formManager;
  const { errors } = formState;

  const { dialogo, handleCerrarDialogo } = dialogoManager;
  const { filaSeleccionadaData } = useTabla();
  const {
    tablaSuperior,
    tablaInferior,
    addDatosTablaInferior,
    addDatosTablaSuperior,
  } = useMultiTablaDatos();
  const [tieneRegistros, setTieneRegistros] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const tituloDialogo = "Depreciación del Bien Mueble";

  useEffect(() => {
    setCargando(true);
    const idBien = filaSeleccionadaData.idBien;
    getDepreciacionPorBien({ idBien: idBien })
      .then((depreciacion) => {
        const existenRegistros = depreciacion.length > 0;
        const { activa, noActiva, objetoMasReciente } = depreciacion.reduce(
          (acc, obj) => {
            if (obj.activo) {
              acc.activa.push(obj);
              if (
                !acc.objetoMasReciente ||
                obj.idDepreciacion > acc.objetoMasReciente.idDepreciacion
              ) {
                acc.objetoMasReciente = obj;
              }
            } else {
              acc.noActiva.push(obj);
            }
            return acc;
          },
          { activa: [], noActiva: [], objetoMasReciente: null }
        );
        if (objetoMasReciente) {
          const formateador = new Intl.NumberFormat("es-MX", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 6,
          });
          setValue(
            CAMPOS_FILTRO_INVENTARIO.MONTO_TOTAL_DEPRECIADO,
            formateador.format(objetoMasReciente.depreciaionAcumulada ?? 0)
          );
          setValue(
            CAMPOS_FILTRO_INVENTARIO.MONTO_FALTANTE,
            formateador.format(objetoMasReciente.valorLibros ?? 0)
          );
          setValue(
            CAMPOS_FILTRO_INVENTARIO.VALOR_HISTORICO,
            formateador.format(objetoMasReciente.valorHistorico ?? 0)
          );
          setValue(
            CAMPOS_FILTRO_INVENTARIO.ANIOS_VIDA,
            formateador.format(objetoMasReciente.aniosVida ?? 0)
          );
          setValue(
            CAMPOS_FILTRO_INVENTARIO.DEPRECIACION_MENSUAL,
            formateador.format(
              objetoMasReciente.valorHistorico /
                (12 * objetoMasReciente.aniosVida) ?? 0
            )
          );
          setValue(
            CAMPOS_FILTRO_INVENTARIO.DEPRECIACION_ANUAL,
            formateador.format(
              objetoMasReciente.valorHistorico / objetoMasReciente.aniosVida ??
                0
            )
          );
        }
        addDatosTablaSuperior(activa);
        addDatosTablaInferior(noActiva);
        setTieneRegistros(existenRegistros);
        setExpanded(existenRegistros ? "resumen" : null);
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
      <Acordeon
        icono={<RequestQuote color="text.primary" className="icon" />}
        titulo="Resumen de Depreciación"
        expanded={expanded === "resumen"}
        onChange={handleChange("resumen")}
        disabled={!tieneRegistros}
      >
        <Stack direction="row" gap={2}>
          <FormCampoEntrada
            id={CAMPOS_FILTRO_INVENTARIO.MONTO_TOTAL_DEPRECIADO}
            name={CAMPOS_FILTRO_INVENTARIO.MONTO_TOTAL_DEPRECIADO}
            label="Monto total depreciado"
            control={control}
            defaultValue="0.00"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
            error={errors[CAMPOS_FILTRO_INVENTARIO.MONTO_TOTAL_DEPRECIADO]}
            helperText={
              errors[CAMPOS_FILTRO_INVENTARIO.MONTO_TOTAL_DEPRECIADO]?.message
            }
            disabled
          />
          <FormCampoEntrada
            id={CAMPOS_FILTRO_INVENTARIO.MONTO_FALTANTE}
            name={CAMPOS_FILTRO_INVENTARIO.MONTO_FALTANTE}
            label="Monto faltante"
            control={control}
            defaultValue="0.00"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
            error={errors[CAMPOS_FILTRO_INVENTARIO.MONTO_FALTANTE]}
            helperText={
              errors[CAMPOS_FILTRO_INVENTARIO.MONTO_FALTANTE]?.message
            }
            disabled
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <FormCampoEntrada
            id={CAMPOS_FILTRO_INVENTARIO.VALOR_HISTORICO}
            name={CAMPOS_FILTRO_INVENTARIO.VALOR_HISTORICO}
            label="Valor Historico"
            control={control}
            defaultValue="0.00"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
            error={errors[CAMPOS_FILTRO_INVENTARIO.VALOR_HISTORICO]}
            helperText={
              errors[CAMPOS_FILTRO_INVENTARIO.VALOR_HISTORICO]?.message
            }
            disabled
          />
          <FormCampoEntrada
            id={CAMPOS_FILTRO_INVENTARIO.ANIOS_VIDA}
            name={CAMPOS_FILTRO_INVENTARIO.ANIOS_VIDA}
            label="Vida Útil"
            control={control}
            defaultValue="0"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">Año(s)</InputAdornment>
                ),
              },
            }}
            error={errors[CAMPOS_FILTRO_INVENTARIO.ANIOS_VIDA]}
            helperText={errors[CAMPOS_FILTRO_INVENTARIO.ANIOS_VIDA]?.message}
            disabled
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <FormCampoEntrada
            id={CAMPOS_FILTRO_INVENTARIO.DEPRECIACION_MENSUAL}
            name={CAMPOS_FILTRO_INVENTARIO.DEPRECIACION_MENSUAL}
            label="Depreciación Mensual"
            control={control}
            defaultValue="0.00"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
            error={errors[CAMPOS_FILTRO_INVENTARIO.DEPRECIACION_MENSUAL]}
            helperText={
              errors[CAMPOS_FILTRO_INVENTARIO.DEPRECIACION_MENSUAL]?.message
            }
            disabled
          />
          <FormCampoEntrada
            id={CAMPOS_FILTRO_INVENTARIO.DEPRECIACION_ANUAL}
            name={CAMPOS_FILTRO_INVENTARIO.DEPRECIACION_ANUAL}
            label="Depreciación Anul"
            control={control}
            defaultValue="0.00"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
            error={errors[CAMPOS_FILTRO_INVENTARIO.DEPRECIACION_ANUAL]}
            helperText={
              errors[CAMPOS_FILTRO_INVENTARIO.DEPRECIACION_ANUAL]?.message
            }
            disabled
          />
        </Stack>
      </Acordeon>

      <Acordeon
        icono={<AttachMoneySharp color="text.primary" className="icon" />}
        titulo="Depreciaciones Activas"
        defaultExpanded
        expanded={expanded === "vigentes"}
        onChange={handleChange("vigentes")}
        disabled={!tieneRegistros}
      >
        <DataGrid
          className="tabla small"
          disableRowSelectionOnClick
          isRowSelectable={() => false}
          getRowId={(e) => e.idDepreciacion}
          columns={columnasDepreciaicion}
          rows={tablaSuperior.datos}
          disableDensitySelector
          disableColumnMenu
          density="compact"
          slots={{
            footer: () => <PaginacionTabla />,
          }}
          columnHeaderHeight={40}
        />
      </Acordeon>
      <Acordeon
        expanded={expanded === "noVigentes"}
        onChange={handleChange("noVigentes")}
        icono={<MoneyOffCsredSharp color="text.primary" className="icon" />}
        titulo="Depreciaciones Canceladas"
        disabled={!tieneRegistros}
      >
        <DataGrid
          className="tabla small"
          disableRowSelectionOnClick
          isRowSelectable={() => false}
          getRowId={(e) => e.idDepreciacion}
          columns={columnasDepreciaicion}
          rows={tablaInferior.datos}
          disableDensitySelector
          disableColumnMenu
          density="compact"
          slots={{
            footer: () => <PaginacionTabla />,
          }}
          columnHeaderHeight={40}
        />
      </Acordeon>
      {!cargando && !tieneRegistros && (
        <Mensaje mensaje="No se han encontrado registros de depreciación para este bien mueble" />
      )}
    </DialogoEmergente>
  );
};

export default InventarioMuebleDepreciacion;
