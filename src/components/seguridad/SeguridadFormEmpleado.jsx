import { PropTypes } from "prop-types";
import FormCheck from "../utils/FormCheck";
import { CAMPOS_EMPLEADO } from "../../settings/formConfig";
import FormCampoEntrada from "../utils/FormCampoEntrada";
import { Stack } from "@mui/material";
import FormCampoAutocompletar from "../utils/FormCampoAutocompletar";
import FormCalendario from "../utils/FormCampoCalendario";

const SeguridadFormEmpleado = ({
  formManager = null,
  nacionalidades = [],
  nombramientos = [],
  esVisualizacion = false,
  esModificacion = false,
}) => {
  const { control, formState } = formManager;
  const { errors } = formState;
  return (
    <>
      <FormCampoEntrada
        id={CAMPOS_EMPLEADO.ID_EMPLEADO}
        name={CAMPOS_EMPLEADO.ID_EMPLEADO}
        label="Id Empleado"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_EMPLEADO.NOMBRES}
        name={CAMPOS_EMPLEADO.NOMBRES}
        label="Nombres"
        control={control}
        error={errors[CAMPOS_EMPLEADO.NOMBRES]}
        helperText={errors[CAMPOS_EMPLEADO.NOMBRES]?.message}
        required
        disabled={esVisualizacion}
      />
      <Stack direction="row" gap={2}>
        <FormCampoEntrada
          id={CAMPOS_EMPLEADO.APELLIDO_PATERNO}
          name={CAMPOS_EMPLEADO.APELLIDO_PATERNO}
          label="Apellido Paterno"
          control={control}
          error={errors[CAMPOS_EMPLEADO.APELLIDO_PATERNO]}
          helperText={errors[CAMPOS_EMPLEADO.APELLIDO_PATERNO]?.message}
          required
          disabled={esVisualizacion}
        />
        <FormCampoEntrada
          id={CAMPOS_EMPLEADO.APELLIDO_MATERNO}
          name={CAMPOS_EMPLEADO.APELLIDO_MATERNO}
          label="Apellido Materno"
          control={control}
          error={errors[CAMPOS_EMPLEADO.APELLIDO_MATERNO]}
          helperText={errors[CAMPOS_EMPLEADO.APELLIDO_MATERNO]?.message}
          required
          disabled={esVisualizacion}
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <FormCalendario
          id={CAMPOS_EMPLEADO.FECHA_NACIMIENTO}
          name={CAMPOS_EMPLEADO.FECHA_NACIMIENTO}
          label="Fecha Nacimiento"
          control={control}
          error={errors[CAMPOS_EMPLEADO.FECHA_NACIMIENTO]}
          helperText={errors[CAMPOS_EMPLEADO.FECHA_NACIMIENTO]?.message}
          required
          disabled={esVisualizacion}
        />
        <FormCheck
          id={CAMPOS_EMPLEADO.HOMBRE}
          name={CAMPOS_EMPLEADO.HOMBRE}
          label="Hombre"
          control={control}
          disabled={esVisualizacion}
        />
      </Stack>
      <FormCampoEntrada
        id={CAMPOS_EMPLEADO.RFC}
        name={CAMPOS_EMPLEADO.RFC}
        label="RFC"
        control={control}
        error={errors[CAMPOS_EMPLEADO.RFC]}
        helperText={errors[CAMPOS_EMPLEADO.RFC]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={CAMPOS_EMPLEADO.NACIONALIDAD}
        name={CAMPOS_EMPLEADO.NACIONALIDAD}
        label="Nacionalidad"
        control={control}
        options={nacionalidades}
        error={errors[CAMPOS_EMPLEADO.NACIONALIDAD]}
        helperText={errors[CAMPOS_EMPLEADO.NACIONALIDAD]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCalendario
        id={CAMPOS_EMPLEADO.FECHA_INGRESO}
        name={CAMPOS_EMPLEADO.FECHA_INGRESO}
        label="Fecha Ingreso"
        control={control}
        error={errors[CAMPOS_EMPLEADO.FECHA_INGRESO]}
        helperText={errors[CAMPOS_EMPLEADO.FECHA_INGRESO]?.message}
        required
        disabled={esVisualizacion || esModificacion}
      />
      <FormCampoAutocompletar
        id={CAMPOS_EMPLEADO.NOMBRAMIENTO}
        name={CAMPOS_EMPLEADO.NOMBRAMIENTO}
        label="Nombramiento"
        control={control}
        options={nombramientos}
        error={errors[CAMPOS_EMPLEADO.NOMBRAMIENTO]}
        helperText={errors[CAMPOS_EMPLEADO.NOMBRAMIENTO]?.message}
        required
        disabled={esVisualizacion}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_EMPLEADO.FECHA_CREACION}
              name={CAMPOS_EMPLEADO.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_EMPLEADO.FECHA_MODIFICACION}
              name={CAMPOS_EMPLEADO.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_EMPLEADO.ACTIVO}
            name={CAMPOS_EMPLEADO.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </>
  );
};

SeguridadFormEmpleado.propTypes = {
  formManager: PropTypes.object,
  nacionalidades: PropTypes.array,
  nombramientos: PropTypes.array,
  esVisualizacion: PropTypes.bool,
  esModificacion: PropTypes.bool,
};

export default SeguridadFormEmpleado;
