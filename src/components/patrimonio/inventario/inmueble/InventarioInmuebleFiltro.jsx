import { useState } from "react";
import { Arbol, EncabezadoSeccion } from "../../../utils";
import {
  AccountTreeOutlined,
  CategoryOutlined,
  TuneSharp,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import FormRangoFecha from "../../../utils/FormCampoRangoFechas";
import FormCheck from "../../../utils/FormCheck";
import Acordeon from "../../../utils/Acordeon";
import { DateRangeIcon } from "@mui/x-date-pickers";
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import dayjs from "dayjs";
import { CAMPOS_FILTRO_INVENTARIO } from "../../../../settings/formConfig";
import { useInventarioInmueble } from "../../../../context/InventarioInmuebleContext";

const opcionesEstadoBien = [
  { id: 1, name: "Bienes Activos" },
  { id: 0, name: "Bienes Inactivo (Baja)" },
];

const InventarioInmuebleFiltro = () => {
  const {
    formManager,
    opcionesFiltros,
    handleSetUnidadAdministrativa,
    unidadAdministrativa,
    tipoBien,
    handleSetTipoBien,
  } = useInventarioInmueble();
  const { control, formState, resetField, setValue } = formManager;
  const { errors } = formState;
  const [isFechaDesactivada, setIsFechaDesactivada] = useState(false);

  const handleChangeCheck = (value) => {
    if (value === false) {
      const hoy = dayjs(new Date());
      resetField(CAMPOS_FILTRO_INVENTARIO.FECHA_INICIO);
      resetField(CAMPOS_FILTRO_INVENTARIO.FECHA_FIN);
      resetField(CAMPOS_FILTRO_INVENTARIO.ESTADO_BIEN);

      setValue(CAMPOS_FILTRO_INVENTARIO.FECHA_INICIO, hoy);
      setValue(CAMPOS_FILTRO_INVENTARIO.FECHA_FIN, hoy);
      setValue(CAMPOS_FILTRO_INVENTARIO.ESTADO_BIEN, opcionesEstadoBien[0]);
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
          icono={<DateRangeIcon color="text.primary" className="icon" />}
          titulo="Rango de Fechas y Estado Bien"
          disableTooltip
        >
          <FormCheck
            id={CAMPOS_FILTRO_INVENTARIO.BUSQUEDA_FECHA}
            name={CAMPOS_FILTRO_INVENTARIO.BUSQUEDA_FECHA}
            label="Activar busqueda"
            control={control}
            handleChange={handleChangeCheck}
          />
          <FormCampoAutocompletar
            id={CAMPOS_FILTRO_INVENTARIO.ESTADO_BIEN}
            name={CAMPOS_FILTRO_INVENTARIO.ESTADO_BIEN}
            label="Estado Bien"
            control={control}
            options={opcionesEstadoBien}
            defaultValue={{ id: 1, name: "Bienes Activos" }}
            getOptionLabel={(option) => `${option.name}`}
            error={errors[CAMPOS_FILTRO_INVENTARIO.ESTADO_BIEN]}
            helperText={errors[CAMPOS_FILTRO_INVENTARIO.ESTADO_BIEN]?.message}
            disabled={!isFechaDesactivada}
            required={isFechaDesactivada}
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
      <EncabezadoSeccion icono={<CategoryOutlined />} titulo="Categorias" />
      <Box className="contenedor-seccion alto-completo">
        <Arbol
          itemSeleccionado={tipoBien}
          textoRaiz="Inventario de Articulos"
          treeData={opcionesFiltros.tiposBienes}
          handleItemSeleccionado={handleSetTipoBien}
          defaultExpandedItems={["0", "4"]}
        />
      </Box>
      <EncabezadoSeccion
        icono={<AccountTreeOutlined />}
        titulo="Unidades Administrativas"
      />
      <Box className="contenedor-seccion alto-completo">
        <Arbol
          itemSeleccionado={unidadAdministrativa}
          textoRaiz="Unidades Administrativas"
          treeData={opcionesFiltros.unidadesAdministrativas}
          handleItemSeleccionado={handleSetUnidadAdministrativa}
        />
      </Box>
    </form>
  );
};

export default InventarioInmuebleFiltro;
