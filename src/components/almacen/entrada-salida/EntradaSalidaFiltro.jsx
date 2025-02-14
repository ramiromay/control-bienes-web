import { useState } from "react";
import { useEntradaSalida } from "../../../context/EntradaSalidaContext";
import { CAMPOS_FILTRO_ENTRADA_SALIDA } from "../../../settings/formConfig";
import { Arbol, EncabezadoSeccion } from "../../utils";
import { AccountTreeOutlined, TuneSharp } from "@mui/icons-material";
import FormCampoAutocompletar from "../../utils/FormCampoAutocompletar";
import { Box } from "@mui/material";
import Acordeon from "../../utils/Acordeon";
import { DateRangeIcon } from "@mui/x-date-pickers";
import FormCheck from "../../utils/FormCheck";
import FormRangoFecha from "../../utils/FormCampoRangoFechas";

const EntradaSalidaFiltro = () => {
  const { formManager, opcionesFiltros, handleAlmacen, almacen } =
    useEntradaSalida();
  const { control, formState, resetField, setValue } = formManager;
  const { errors } = formState;
  const [isFechaDesactivada, setIsFechaDesactivada] = useState(false);

  const handleChangeCheck = (value) => {
    if (value === false) {
      const hoy = dayjs(new Date());
      resetField(CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_INICIO);
      resetField(CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_FIN);
      setValue(CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_INICIO, hoy);
      setValue(CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_FIN, hoy);
    }
    setIsFechaDesactivada(value);
  };
  return (
    <form noValidate className="contenedor-formulario">
      <EncabezadoSeccion icono={<TuneSharp />} titulo="Filtros de Búsqueda" />
      <Box className="contenedor-seccion">
        <FormCampoAutocompletar
          id={CAMPOS_FILTRO_ENTRADA_SALIDA.PERIODO}
          name={CAMPOS_FILTRO_ENTRADA_SALIDA.PERIODO}
          label="Periodo"
          control={control}
          options={opcionesFiltros.periodos}
          error={errors[CAMPOS_FILTRO_ENTRADA_SALIDA.PERIODO]}
          helperText={errors[CAMPOS_FILTRO_ENTRADA_SALIDA.PERIODO]?.message}
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
          icono={<DateRangeIcon color="text.primary" className="icon" />}
          titulo="Rango de Fechas"
          disableTooltip
        >
          <FormCheck
            id={CAMPOS_FILTRO_ENTRADA_SALIDA.BUSQUEDA_FECHA}
            name={CAMPOS_FILTRO_ENTRADA_SALIDA.BUSQUEDA_FECHA}
            label="Activar busqueda por fechas"
            control={control}
            handleChange={handleChangeCheck}
          />
          <FormRangoFecha
            nameStart={CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_INICIO}
            nameEnd={CAMPOS_FILTRO_ENTRADA_SALIDA.FECHA_FIN}
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
          textoRaiz="Almacenes Disponibles"
          treeData={opcionesFiltros.almacenes}
          handleItemSeleccionado={handleAlmacen}
        />
      </Box>
    </form>
  );
};

export default EntradaSalidaFiltro;
