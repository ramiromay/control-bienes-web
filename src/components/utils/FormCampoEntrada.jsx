import { PropTypes } from "prop-types";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const FormCampoEntrada = ({
  name,
  control,
  defaultValue = "",
  rules = {},
  label,
  type = "text",
  required = false,
  disabled = false,
  error,
  helperText = "",
  onValueChange,
  multiline = false,
  rows = 1,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      value={defaultValue}
      rules={rules}
      render={({ field: { onChange, value, ...field } }) => (
        <TextField
          {...field}
          {...props}
          fullWidth
          size="small"
          variant="outlined"
          margin="dense"
          error={!!error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          type={type}
          multiline={multiline}
          rows={rows}
          label={label}
          value={value || ""}
          onChange={(e) => {
            onChange(e); // Actualiza el valor en el controlador
            if (onValueChange) {
              onValueChange(e.target.value); // Llama al método pasado como prop
            }
          }}
        />
      )}
    />
  );
};

FormCampoEntrada.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rules: PropTypes.object,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.object,
  helperText: PropTypes.string,
};

export default FormCampoEntrada;
