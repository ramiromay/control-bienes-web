import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormCampoEntrada from "../utils/FormCampoEntrada";
import { CAMPOS_LOGIN } from "../../settings/formConfig";
import FormCheck from "../utils/FormCheck";
import { yupResolver } from "@hookform/resolvers/yup";
import { autentificacionValidacion } from "../../settings/validacionConfig";
import { useLogin } from "../../context/LoginContext";
import FormCampoContrasenia from "../utils/FormCampoContrasenia";
import { useSistema } from "../../context/SistemaContext";

const LoginForm = () => {
  const { handleError, handleFinalizarCarga, handleIniciarCarga } =
    useSistema();
  const { handleLogin } = useLogin();
  const { control, formState, handleSubmit } = useForm({
    resolver: yupResolver(autentificacionValidacion),
  });
  const { errors } = formState;

  const onSubmit = handleSubmit(async (data) => {
    handleIniciarCarga();
    await handleLogin(data)
      .catch((e) => {
        handleError(e);
      })
      .finally(() => {
        handleFinalizarCarga();
      });
  });

  return (
    <form
      onSubmit={onSubmit}
      method="post"
      className="LoginForm"
      noValidate
      autoComplete="on"
    >
      <FormCampoEntrada
        id={CAMPOS_LOGIN.USUARIO}
        name={CAMPOS_LOGIN.USUARIO}
        label="Usuario"
        control={control}
        error={errors[CAMPOS_LOGIN.USUARIO]}
        helperText={
          errors[CAMPOS_LOGIN.USUARIO]?.message ?? "Se requiere el Usuario"
        }
        required
        autoComplete="username"
        className="campo-entrada"
      />
      <FormCampoContrasenia
        id={CAMPOS_LOGIN.CONTRASENA}
        name={CAMPOS_LOGIN.CONTRASENA}
        label="Contraseña"
        control={control}
        error={errors[CAMPOS_LOGIN.CONTRASENA]}
        helperText={
          errors[CAMPOS_LOGIN.CONTRASENA]?.message ??
          "Se requiere la Contraseña"
        }
        required
        className="campo-entrada"
      />
      <section className="box-recuerdame">
        <FormCheck
          id={CAMPOS_LOGIN.RECORDARME}
          name={CAMPOS_LOGIN.RECORDARME}
          control={control}
          label="Recuerdame"
        />
        <Link href="#">
          <Typography variant="body2" className="recuerdame-texto">
            ¿Olvidaste tu contraseña?
          </Typography>
        </Link>
      </section>
      <Button type="submit" variant="contained" className="boton-sesion">
        Iniciar Sesión
      </Button>
    </form>
  );
};

export default LoginForm;
