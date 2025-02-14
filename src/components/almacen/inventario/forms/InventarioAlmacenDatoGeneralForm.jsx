import { InputAdornment } from "@mui/material";
import { CAMPOS_INVENTARIO_ALMACEN } from "../../../../settings/formConfig";
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import FormCampoEntrada from "../../../utils/FormCampoEntrada";

const InventarioAlmacenDatoGeneralForm = ({
  formManager = null,
  esVisualizacion = false,
  complementos = {},
}) => {
  const {
    FOLIO_BIEN,
    PERIODO,
    ID_FAMILIA,
    ID_BMS,
    CODIGO_ARMONIZADO,
    EXISTENCIA,
    FECHA_CREACION,
    FECHA_MODIFICACION,
    PRECIO_UNITARIO,
    UNIDAD_MEDIDA,
    ID_ALMACEN,
  } = CAMPOS_INVENTARIO_ALMACEN;
  const { control, formState, watch } = formManager;
  const { errors } = formState;
  const { almacenes, periodos, familias, bms } = complementos;
  const unidadMedida = watch(UNIDAD_MEDIDA);

  return (
    <>
      <FormCampoEntrada
        id={FOLIO_BIEN}
        name={FOLIO_BIEN}
        label="Folio Bien"
        defaultValue="Automatico"
        control={control}
        error={errors[FOLIO_BIEN]}
        helperText={errors[FOLIO_BIEN]?.message}
        disabled
      />

      <FormCampoAutocompletar
        id={ID_ALMACEN}
        name={ID_ALMACEN}
        label="Almacen"
        control={control}
        options={almacenes}
        error={errors[ID_ALMACEN]}
        helperText={errors[ID_ALMACEN]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_FAMILIA}
        name={ID_FAMILIA}
        label="Familia"
        control={control}
        options={familias}
        error={errors[ID_FAMILIA]}
        helperText={errors[ID_FAMILIA]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_BMS}
        name={ID_BMS}
        label="Folio BMS"
        control={control}
        options={bms}
        error={errors[ID_BMS]}
        helperText={errors[ID_BMS]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={CODIGO_ARMONIZADO}
        name={CODIGO_ARMONIZADO}
        label="Código Armonizado"
        control={control}
        error={errors[CODIGO_ARMONIZADO]}
        helperText={errors[CODIGO_ARMONIZADO]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={EXISTENCIA}
        name={EXISTENCIA}
        label="Existencia"
        control={control}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">{unidadMedida}</InputAdornment>
            ),
          },
        }}
        error={errors[EXISTENCIA]}
        helperText={errors[EXISTENCIA]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={PRECIO_UNITARIO}
        name={PRECIO_UNITARIO}
        label="Precio Unitario"
        control={control}
        error={errors[PRECIO_UNITARIO]}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
        helperText={errors[PRECIO_UNITARIO]?.message}
        disabled={esVisualizacion}
      />
      {/* <FormCampoEntrada
        id={FECHA_CREACION}
        name={FECHA_CREACION}
        label="Fecha Creación"
        control={control}
        error={errors[FECHA_CREACION]}
        helperText={errors[FECHA_CREACION]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={FECHA_MODIFICACION}
        name={FECHA_MODIFICACION}
        label="Fecha Modificación"
        control={control}
        error={errors[FECHA_MODIFICACION]}
        helperText={errors[FECHA_MODIFICACION]?.message}
        disabled={esVisualizacion}
      /> */}
    </>
  );
};

export default InventarioAlmacenDatoGeneralForm;
