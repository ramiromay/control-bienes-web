import { PropTypes } from "prop-types";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const FormCampoContrasenia = ({
  name,
  control,
  defaultValue = "",
  rules = {},
  label,
  required = false,
  disabled = false,
  error,
  helperText = "",
  autoComplete = "current-password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

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
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          label={label}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff className="icono-campo"/>
                    ) : (
                      <Visibility className="icono-campo" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            
            },
          }}
        />
      )}
    />
  );
};

FormCampoContrasenia.propTypes = {
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
  autoComplete: PropTypes.string,
};

export default FormCampoContrasenia;
