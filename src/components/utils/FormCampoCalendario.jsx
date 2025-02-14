import { PropTypes } from "prop-types";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl } from "@mui/material";
import "@styles/Calendario.css";
import { Controller } from "react-hook-form";
import dayjs from 'dayjs'

const FormCampoCalendario = ({
  name,
  control,
  defaultValue = dayjs(),
  rules = {},
  label,
  format = "DD/MM/YYYY",
  required = false,
  disabled = false,
  error,
  helperText = "",
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          value={defaultValue}
          rules={rules}
          render={({ field }) => (
            <DatePicker
              {...field}
              {...props}
              format={format}
              disabled={disabled}
              slotProps={{
                textField: {
                  label: label,
                  error: !!error,
                  helperText: helperText,
                  required: required,
                  placeholder: format,
                  variant: "outlined",
                  fullWidth: true,
                  margin: "dense",
                  size: "small",
                },
                openPickerIcon: {
                  sx: {
                    fontSize: "13px",
                  },
                },
              }}
            />
          )}
        />
      </FormControl>
    </LocalizationProvider>
  );
};

FormCampoCalendario.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.object,
  rules: PropTypes.object,
  label: PropTypes.string.isRequired,
  format: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.object,
  helperText: PropTypes.string,
};

export default FormCampoCalendario;
