import { AccountTreeOutlined, TuneSharp } from "@mui/icons-material";
import { useInventarioAlmacen } from "../../../context/InventarioAlmacenContext";
import { useState } from "react";
import { CAMPOS_FILTRO_INVENTARIO } from "../../../settings/formConfig";
import { Arbol, EncabezadoSeccion } from "../../utils";
import { Box } from "@mui/material";
import FormCampoAutocompletar from "../../utils/FormCampoAutocompletar";
import Acordeon from "../../utils/Acordeon";
import FormCheck from "../../utils/FormCheck";
import { DateRangeIcon } from "@mui/x-date-pickers";
import FormRangoFecha from "../../utils/FormCampoRangoFechas";
import dayjs from "dayjs";

const InventarioAlmacenFiltro = () => {
  const { formManager, opcionesFiltros, handleSetAlmacenes, almacen } =
    useInventarioAlmacen();
  const { control, formState, resetField, setValue } = formManager;
  const { errors } = formState;
  const [isFechaDesactivada, setIsFechaDesactivada] = useState(false);

  const handleChangeCheck = (value) => {
    if (value === false) {
      const hoy = dayjs(new Date());
      resetField(CAMPOS_FILTRO_INVENTARIO.FECHA_INICIO);
      resetField(CAMPOS_FILTRO_INVENTARIO.FECHA_FIN);

      setValue(CAMPOS_FILTRO_INVENTARIO.FECHA_INICIO, hoy);
      setValue(CAMPOS_FILTRO_INVENTARIO.FECHA_FIN, hoy);
    }
    setIsFechaDesactivada(value);
  };
  return (
    <form noValidate className="contenedor-formulario">
      <EncabezadoSeccion icono={<TuneSharp />} titulo="Filtros de Búsqueda" />
      <Box className="contenedor-seccion">
        <FormCampoAutocompletar
          id={CAMPOS_FILTRO_INVENTARIO.PERIODO}
          name={CAMPOS_FILTRO_INVENTARIO.PERIODO}
          label="Periodo"
          control={control}
          options={opcionesFiltros.periodos}
          error={errors[CAMPOS_FILTRO_INVENTARIO.PERIODO]}
          helperText={errors[CAMPOS_FILTRO_INVENTARIO.PERIODO]?.message}
          getOptionLabel={(option) =>
            `${option.id}. ${option.fechaInicio} - ${option.fechaFinal}`
          }
          isOptionEqualToValue={(option, value) =>
            option.id === value.id ||
            option.fechaInicio === value.fechaInicio ||
            option.fechaFinal === value.fechaFinal
          }
          required
        />

        <Acordeon
          icono={
            <DateRangeIcon
              AccountTreeOutlinedcolor="text.primary"
              className="icon"
            />
          }
          titulo="Rango de Fechas"
          disableTooltip
        >
          <FormCheck
            id={CAMPOS_FILTRO_INVENTARIO.BUSQUEDA_FECHA}
            name={CAMPOS_FILTRO_INVENTARIO.BUSQUEDA_FECHA}
            label="Activar busqueda"
            control={control}
            handleChange={handleChangeCheck}
          />

          <FormRangoFecha
            nameStart={CAMPOS_FILTRO_INVENTARIO.FECHA_INICIO}
            nameEnd={CAMPOS_FILTRO_INVENTARIO.FECHA_FIN}
            control={control}
            labelStart="Desde"
            labelEnd="Hasta"
            format="DD/MM/YYYY"
            required={isFechaDesactivada}
            disabled={!isFechaDesactivada}
            errors={errors}
          />
        </Acordeon>
      </Box>
      <EncabezadoSeccion icono={<AccountTreeOutlined />} titulo="Almacenes" />
      <Box className="contenedor-seccion alto-completo">
        <Arbol
          itemSeleccionado={almacen}
          textoRaiz="Almacenes"
          treeData={opcionesFiltros.almacenes}
          handleItemSeleccionado={handleSetAlmacenes}
        />
      </Box>
    </form>
  );
};

export default InventarioAlmacenFiltro;
