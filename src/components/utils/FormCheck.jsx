import { PropTypes } from "prop-types";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const FormCheck = ({
  control,
  label,
  name,
  disabled = false,
  cargando = false,
  handleChange = () => {},
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <FormControlLabel
          {...props}
          disabled={disabled || cargando}
          control={
            <Checkbox
              {...field}
              checked={field.value || false}
              onChange={(e) => {
                field.onChange(e.target.checked);
                handleChange(e.target.checked);
              }}
            />
          }
          label={label}
        />
      )}
    />
  );
};

FormCheck.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  cargando: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default FormCheck;
