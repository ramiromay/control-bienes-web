import PropTypes from "prop-types";
import { useState } from "react";
import { AccountTreeOutlined, TuneSharp } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Arbol, EncabezadoSeccion } from "../../../utils";
import FormCheck from "../../../utils/FormCheck";
import FormRangoFecha from "../../../utils/FormCampoRangoFechas";
import Acordeon from "../../../utils/Acordeon";
import { CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES } from "../../../../settings/formConfig";
import { DateRangeIcon } from "@mui/x-date-pickers";
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import dayjs from "dayjs";
import { useAdministradorInmueble } from "../../../../context/AdministradorInmuebleContext";

const AdministradorInmuebleFiltro = () => {
  const {
    formManager,
    opcionesFiltros,
    handleUnidadAdministrativa,
    unidadAdministrativa,
  } = useAdministradorInmueble();
  const { control, formState, resetField, setValue } = formManager;
  const { errors } = formState;
  const [isFechaDesactivada, setIsFechaDesactivada] = useState(false);

  const handleChangeCheck = (value) => {
    if (value === false) {
      const hoy = dayjs(new Date());
      resetField(CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_INICIO);
      resetField(CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_FIN);
      setValue(CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_INICIO, hoy);
      setValue(CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_FIN, hoy);
    }
    setIsFechaDesactivada(value);
  };
  return (
    <form noValidate className="contenedor-formulario">
      <EncabezadoSeccion icono={<TuneSharp />} titulo="Filtros de Búsqueda" />
      <Box className="contenedor-seccion">
        <FormCampoAutocompletar
          id={CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.PERIODO}
          name={CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.PERIODO}
          label="Periodo"
          control={control}
          options={opcionesFiltros.periodos}
          error={errors[CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.PERIODO]}
          helperText={
            errors[CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.PERIODO]?.message
          }
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
            id={CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.BUSQUEDA_FECHA}
            name={CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.BUSQUEDA_FECHA}
            label="Activar busqueda por fechas"
            control={control}
            handleChange={handleChangeCheck}
          />
          <FormRangoFecha
            nameStart={CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_INICIO}
            nameEnd={CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES.FECHA_FIN}
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
      <EncabezadoSeccion
        icono={<AccountTreeOutlined />}
        titulo="Unidades Administrativas"
      />
      <Box className="contenedor-seccion alto-completo">
        <Arbol
          itemSeleccionado={unidadAdministrativa}
          textoRaiz="Unidades Administrativas"
          treeData={opcionesFiltros.unidadesAdministrativas}
          handleItemSeleccionado={handleUnidadAdministrativa}
        />
      </Box>
    </form>
  );
};

export default AdministradorInmuebleFiltro;
