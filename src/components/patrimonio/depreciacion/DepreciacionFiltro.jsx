import { useState } from "react";
import { useDepreciacion } from "../../../context/DepreciacionContext";
import { CAMPOS_DEPRECIACION } from "../../../settings/formConfig";
import { Arbol, EncabezadoSeccion } from "../../utils";
import {
  AccountTreeOutlined,
  Category,
  CategoryOutlined,
  CategorySharp,
  TuneSharp,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import FormCampoAutocompletar from "../../utils/FormCampoAutocompletar";
import FormCampoEntrada from "../../utils/FormCampoEntrada";
import Mensaje from "../../utils/Mensaje";

const DEPRECIACION_GLOBAL = 1;
const DEPRECIACION_INDIVIDUAL = 2;

const DepreciacionFiltro = () => {
  const {
    formManager,
    opcionesFiltros,
    handleSetUnidadAdministrativa,
    unidadAdministrativa,
  } = useDepreciacion();
  const { control, formState, resetField, setValue } = formManager;
  const { errors } = formState;
  const [tipoDepreciacion, setTipoDepreciacion] = useState(1);

  const changeTipoDepreciacion = (value) => {
    if (value) {
      const id = value.id;
      if (id !== DEPRECIACION_INDIVIDUAL) {
        resetField(CAMPOS_DEPRECIACION.FOLIO_BMS);
        setValue(CAMPOS_DEPRECIACION.FOLIO_BMS, null);
      }
      setTipoDepreciacion(value.id);
    }
  };
  return (
    <form noValidate className="contenedor-formulario">
      <EncabezadoSeccion
        icono={<TuneSharp />}
        titulo="Filtros de Depreciación"
      />
      <Box className="contenedor-seccion">
        <FormCampoAutocompletar
          id={CAMPOS_DEPRECIACION.PERIODO}
          name={CAMPOS_DEPRECIACION.PERIODO}
          label="Periodo"
          control={control}
          options={opcionesFiltros.periodos}
          error={errors[CAMPOS_DEPRECIACION.PERIODO]}
          helperText={errors[CAMPOS_DEPRECIACION.PERIODO]?.message}
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
        <FormCampoAutocompletar
          id={CAMPOS_DEPRECIACION.MES}
          name={CAMPOS_DEPRECIACION.MES}
          label="Mes"
          control={control}
          options={opcionesFiltros.meses}
          getOptionLabel={(option) => `${option.name}`}
          error={errors[CAMPOS_DEPRECIACION.MES]}
          helperText={errors[CAMPOS_DEPRECIACION.MES]?.message}
          required
        />
        <FormCampoAutocompletar
          id={CAMPOS_DEPRECIACION.TIPO_BIEN}
          name={CAMPOS_DEPRECIACION.TIPO_BIEN}
          label="Tipo de Bien"
          control={control}
          options={opcionesFiltros.tiposBienes}
          getOptionLabel={(option) => `${option.name}`}
          error={errors[CAMPOS_DEPRECIACION.TIPO_BIEN]}
          helperText={errors[CAMPOS_DEPRECIACION.TIPO_BIEN]?.message}
          required
        />
        <FormCampoAutocompletar
          id={CAMPOS_DEPRECIACION.TIPO_DEPRECIACION}
          name={CAMPOS_DEPRECIACION.TIPO_DEPRECIACION}
          label="Tipo de Depreciación"
          control={control}
          handleOnChange={changeTipoDepreciacion}
          options={opcionesFiltros.tiposDepreciacion}
          getOptionLabel={(option) => `${option.name}`}
          error={errors[CAMPOS_DEPRECIACION.TIPO_DEPRECIACION]}
          helperText={errors[CAMPOS_DEPRECIACION.TIPO_DEPRECIACION]?.message}
          required
        />
      </Box>
      {tipoDepreciacion === DEPRECIACION_GLOBAL ? (
        <>
          <EncabezadoSeccion
            icono={<AccountTreeOutlined />}
            titulo="Unidades Administrativas"
          />
          <Box className="contenedor-seccion alto-completo">
            <Arbol
              checkboxSelection
              itemSeleccionado={unidadAdministrativa}
              textoRaiz="Unidades Administrativas"
              treeData={opcionesFiltros.unidadesAdministrativas}
              handleItemSeleccionado={handleSetUnidadAdministrativa}
            />
          </Box>
        </>
      ) : (
        <>
          <EncabezadoSeccion icono={<CategoryOutlined />} titulo="Bienes" />
          <Box className="contenedor-seccion alto-completo padding-igual">
            <FormCampoEntrada
              id={CAMPOS_DEPRECIACION.FOLIO_BMS}
              name={CAMPOS_DEPRECIACION.FOLIO_BMS}
              label="Folio Bien"
              control={control}
              error={errors[CAMPOS_DEPRECIACION.FOLIO_BMS]}
              helperText={errors[CAMPOS_DEPRECIACION.FOLIO_BMS]?.message}
              required
            />
            <Mensaje mensaje="Se ocultaron las unidades administrativas." />
          </Box>
        </>
      )}
    </form>
  );
};

export default DepreciacionFiltro;
