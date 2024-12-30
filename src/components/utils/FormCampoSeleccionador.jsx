import { PropTypes } from 'prop-types';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

const FormCampoSeleccionador = ({
  label,
  name,
  control,
  options = [], // Por defecto es un array vacío
  defaultValue = "",
  helperText = "",
  required = false,
  disable = false,
  error,
  rules,
}) => {
  const isDisabled = disable || !Array.isArray(options) || options.length === 0; // Deshabilitar si options es nulo o vacío

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={`label-${name}`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Select
              {...field}
              size='small'
              id={name}
              labelId={`label-${name}`}
              label={label}
              required={required}
              error={!!error}
              disabled={isDisabled} // Campo deshabilitado si no hay opciones
              defaultValue={defaultValue}
            >
              {Array.isArray(options) &&
                options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </Select>
            {error && (
              <FormHelperText error={!!error}>{helperText}</FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
};
FormCampoSeleccionador.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  defaultValue: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disable: PropTypes.bool,
  error: PropTypes.object,
  rules: PropTypes.object,
};

export default FormCampoSeleccionador;
