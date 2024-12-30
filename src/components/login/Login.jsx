import { Fingerprint } from "@mui/icons-material";
import LoginForm from "./LoginForm";
import { useEffect } from "react";
import { useSistema } from "../../context/SistemaContext";
import { Avatar, Card, Typography } from "@mui/material";
import ContenedorCargando from "../utils/ContenedorCargando";

const Login = () => {
  const {  cargando, handleDesactivarNavBar } = useSistema();

  useEffect(() => {
    handleDesactivarNavBar();
  }, [])

  return (
    <section className="Login">
      <Card className="card">
        <ContenedorCargando isLoading={cargando.activo}>
          <section className="header-container">
            <section className="header">
              <section>
                <aside className="avatar-container">
                  <Avatar className="avatar">
                    <Fingerprint className="avatar-icon" />
                  </Avatar>
                </aside>
                <Typography variant="h5" className="title">
                  Autorización SICBA
                </Typography>
              </section>
            </section>
            <LoginForm />
          </section>
        </ContenedorCargando>
      </Card>
    </section>
  );
};

export default Login;
