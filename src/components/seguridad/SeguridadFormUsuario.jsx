import { PropTypes } from "prop-types";
import FormCampoContrasenia from "../utils/FormCampoContrasenia";
import { CAMPOS_EMPLEADO } from "../../settings/formConfig";
import FormCampoEntrada from "../utils/FormCampoEntrada";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExpandMore, LockOutlined } from "@mui/icons-material";

const SeguridadFormUsuario = ({
  formManager = null,
  esModificacion = false,
  esVisualizacion = false,
}) => {
  const { control, formState } = formManager;
  const { errors } = formState;

  return (
    <>
      <FormCampoEntrada
        id={CAMPOS_EMPLEADO.USUARIO}
        name={CAMPOS_EMPLEADO.USUARIO}
        label="Usuario"
        type="username"
        control={control}
        error={errors[CAMPOS_EMPLEADO.USUARIO]}
        helperText={errors[CAMPOS_EMPLEADO.USUARIO]?.message}
        required
        disabled={esVisualizacion}
      />
      {esModificacion && (
        <Accordion square={false}>
          <Tooltip title="Si deseas mantener su contraseña actual, deje esta sección en blanco.">
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Box className="sicba-summary-icon">
                <LockOutlined color="secondary" className="icon" />
              </Box>
              <Typography className="sicba-summary-title">
                Contraseña
              </Typography>
            </AccordionSummary>
          </Tooltip>
          <AccordionDetails>
            <FormCampoContrasenia
              id={CAMPOS_EMPLEADO.CONTRASENA_ACTUAL}
              name={CAMPOS_EMPLEADO.CONTRASENA_ACTUAL}
              label="Contraseña Actual"
              autoComplete="current-password"
              control={control}
              error={errors[CAMPOS_EMPLEADO.CONTRASENA_ACTUAL]}
              helperText={errors[CAMPOS_EMPLEADO.CONTRASENA_ACTUAL]?.message}
              required
            />
            <FormCampoContrasenia
              id={CAMPOS_EMPLEADO.CONTRASENA_NUEVA}
              name={CAMPOS_EMPLEADO.CONTRASENA_NUEVA}
              label="Contraseña Nueva"
              autoComplete="new-password"
              control={control}
              error={errors[CAMPOS_EMPLEADO.CONTRASENA_NUEVA]}
              helperText={errors[CAMPOS_EMPLEADO.CONTRASENA_NUEVA]?.message}
              required
            />
            <FormCampoContrasenia
              id={CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA}
              name={CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA}
              label="Confirmar Contraseña"
              autoComplete="new-password"
              control={control}
              error={errors[CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA]}
              helperText={errors[CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA]?.message}
              required
            />
          </AccordionDetails>
        </Accordion>
      )}
      {!esVisualizacion && !esModificacion && (
        <>
          <FormCampoContrasenia
            id={CAMPOS_EMPLEADO.CONTRASENA_NUEVA}
            name={CAMPOS_EMPLEADO.CONTRASENA_NUEVA}
            label="Contraseña Nueva"
            autoComplete="new-password"
            control={control}
            error={errors[CAMPOS_EMPLEADO.CONTRASENA_NUEVA]}
            helperText={errors[CAMPOS_EMPLEADO.CONTRASENA_NUEVA]?.message}
            required
          />
          <FormCampoContrasenia
            id={CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA}
            name={CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA}
            label="Confirmar Contraseña"
            autoComplete="new-password"
            control={control}
            error={errors[CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA]}
            helperText={errors[CAMPOS_EMPLEADO.CONFIRMAR_CONTRASENA]?.message}
            required
          />
        </>
      )}
      <FormCampoEntrada
        id={CAMPOS_EMPLEADO.EMAIL}
        name={CAMPOS_EMPLEADO.EMAIL}
        label="Email"
        type="email"
        control={control}
        error={errors[CAMPOS_EMPLEADO.EMAIL]}
        helperText={errors[CAMPOS_EMPLEADO.EMAIL]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={CAMPOS_EMPLEADO.TELEFONO}
        name={CAMPOS_EMPLEADO.TELEFONO}
        label="Telefono"
        type="tel"
        control={control}
        error={errors[CAMPOS_EMPLEADO.TELEFONO]}
        helperText={errors[CAMPOS_EMPLEADO.TELEFONO]?.message}
        required
        disabled={esVisualizacion}
      />
    </>
  );
};
SeguridadFormUsuario.propTypes = {
  formManager: PropTypes.object.isRequired,
  esModificacion: PropTypes.bool.isRequired,
  esVisualizacion: PropTypes.bool.isRequired,
};

export default SeguridadFormUsuario;
