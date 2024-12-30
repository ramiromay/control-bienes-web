import { MuiColorInput, matchIsValidColor } from "mui-color-input";
import { Controller } from "react-hook-form";

const FormCampoColor = ({
  name,
  control,
  defaultValue = "#000",
  rules = {},
  label,
  type = "text",
  required = false,
  disabled = false,
  error,
  helperText = "",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      value={defaultValue}
      rules={{
        ...rules,
        validate: matchIsValidColor,
      }}
      render={({ field, fieldState: { error } }) => {
        const customError =
          error === undefined
            ? ""
            : error.type === "validate"
            ? "El Color no es valido"
            : helperText;
       
        return (
          <>
            <MuiColorInput
              {...field}
              format="hex"
              fullWidth
              size="small"
              variant="outlined"
              margin="dense"
              label={label}
              required={required}
              disabled={disabled}
              error={!!error}
              helperText={customError}
            />
          </>
        );
      }}
    />
  );
};

export default FormCampoColor;
