import { PropTypes } from "prop-types";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

const FormCampoAutocompletarMultiple = ({
  name,
  control,
  options = [],
  label,
  required = false,
  disabled = false,
  helperText = "",
  getOptionLabel = (option) => `${option.id} - ${option.name}`,
  isOptionEqualToValue = (option, value) => option.id === value.id,
  handleOnChange = () => {},
  error,
  renderOption = undefined,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple
          size="small"
          disabled={disabled}
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          renderOption={renderOption}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              margin="dense"
              variant="outlined"
              required={required}
              label={label}
              error={!!error}
              helperText={helperText}
            />
          )}
          onChange={(_, value) => {
            field.onChange(value);
            if (handleOnChange) {
              handleOnChange(value);
            }
          }}
          value={field.value || []}
          noOptionsText={
            <Typography sx={{ fontSize: "13px" }}>
              No se encontraron opciones
            </Typography>
          }
        />
      )}
    />
  );
};

FormCampoAutocompletarMultiple.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.array,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  handleOnChange: PropTypes.func,
  error: PropTypes.any,
};

export default FormCampoAutocompletarMultiple;
