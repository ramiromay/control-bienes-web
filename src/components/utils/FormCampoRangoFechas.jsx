import { FormHelperText, Stack } from "@mui/material";
import PropTypes from "prop-types";
import "@styles/RangoFechas.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormCampoCalendario from "./FormCampoCalendario";

const FormRangoFecha = ({
  nameStart,
  nameEnd,
  control,
  defaultStartValue = dayjs(),
  defaultEndValue = dayjs(),
  labelStart = "Fecha inicio",
  labelEnd = "Fecha fin",
  format = "DD/MM/YYYY",
  required = false,
  disabled = false,
  errors,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={1} alignItems="center">
        <FormCampoCalendario
          id={nameStart}
          name={nameStart}
          label={labelStart}
          control={control}
          defaultValue={defaultStartValue}
          error={errors[nameStart]}
          helperText={null}
          required={required}
          disabled={disabled}
          format={format}
        />
        <FormCampoCalendario
          id={nameEnd}
          name={nameEnd}
          label={labelEnd}
          control={control}
          defaultValue={defaultEndValue}
          error={errors[nameEnd]}
          helperText={null}
          required={required}
          disabled={disabled}
          format={format}
        />
      </Stack>
      {errors[nameStart] && errors[nameEnd] ? (
        <FormHelperText error>
          La Fecha de Inicio no puede ser posterior a la Fecha de Fin, ni la Fecha de Fin anterior a la Fecha de Inicio
        </FormHelperText>
      ) : errors[nameStart] ? (
        <FormHelperText error>{errors[nameStart]?.message}</FormHelperText>
      ) : (
        errors[nameEnd] && (
          <FormHelperText error>{errors[nameEnd]?.message}</FormHelperText>
        )
      )}
    </LocalizationProvider>
  );
};

FormRangoFecha.propTypes = {
  nameStart: PropTypes.string.isRequired,
  nameEnd: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultStartValue: PropTypes.object,
  defaultEndValue: PropTypes.object,
  labelStart: PropTypes.string,
  labelEnd: PropTypes.string,
  format: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  errors: PropTypes.object,
};

export default FormRangoFecha;
