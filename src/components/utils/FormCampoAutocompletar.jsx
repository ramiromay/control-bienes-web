import { PropTypes } from "prop-types";
import { Autocomplete, TextField, Paper, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

const FormCampoAutocompletar = ({
  name,
  control,
  options = [],
  label,
  required = false,
  disabled = false,
  helperText = "",
  rules = {},
  defaultValue = null,
  error,
  getOptionLabel = (option) => `${option.id} - ${option.name}`,
  isOptionEqualToValue = (option, value) =>
    option.id === value.id || option.name === value.name,
  handleOnChange = () => {},
  renderOption,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <Autocomplete
          {...field}
          fullWidth
          disablePortal={true}
          size="small"
          disabled={disabled}
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          value={field.value}
          onChange={(e, newValue) => {
            field.onChange(newValue);
            if (handleOnChange) {
              handleOnChange(newValue);
            }
          }}
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
          PaperComponent={(props) => (
            <Paper
              {...props}
              sx={{
                maxHeight: "160px",
                overflow: "hidden",
                fontSize: "13px",
                "& .MuiAutocomplete-option": {
                  minHeight: "30px",
                  fontSize: "13px",
                },
              }}
            />
          )}
          renderOption={renderOption ? renderOption : undefined}
          ListboxProps={{
            style: {
              maxHeight: "160px",
            },
          }}
          componentsProps={{
            popper: {
              sx: { maxHeight: "160px", position: "absolute", zIndex: 1300 },
            },
          }}
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

FormCampoAutocompletar.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.array,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.any,
  error: PropTypes.object,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  getOptionLabel: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
  handleOnChange: PropTypes.func,
  rules: PropTypes.object,
  renderOption: PropTypes.func,
};

export default FormCampoAutocompletar;
