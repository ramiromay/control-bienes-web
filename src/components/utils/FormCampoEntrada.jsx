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
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      value={defaultValue}
      rules={rules}
      render={({ field }) => (
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
          label={label}
        />
      )}
    />
  );
};

FormCampoEntrada.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  rules: PropTypes.object,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.object,
  helperText: PropTypes.string,
};

export default FormCampoEntrada;
