import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import BackgroundImage from "./BackgroundBee.png";

const labelStyle = {
  color: "white", // Substitua "red" pela cor desejada
};
const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [usuario, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!usuario || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(usuario, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
  };

  return (
    <div style={containerStyle}>
      <C.Container>
        <C.Label style={labelStyle}>LOGIN</C.Label>
        <C.Content>
          <Input
            type="usuario"
            placeholder="Digite seu nome de usuário"
            value={usuario}
            onChange={(e) => [setUser(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Entrar" onClick={handleLogin} />
          <C.LabelSignup>
            Não tem uma conta?
            <C.Strong>
              <Link to="/signup">&nbsp;Registre-se</Link>
            </C.Strong>
          </C.LabelSignup>
        </C.Content>
      </C.Container>
    </div>
  );
};

export default Signin;
