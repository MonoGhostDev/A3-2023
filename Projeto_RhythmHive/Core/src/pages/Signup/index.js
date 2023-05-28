import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import BackgroundImage from "./BackgroundBee.JPG";

const labelStyle = {
  color: "white",
};

const Signup = () => {
  const [user, setUser] = useState("");
  const [userConf, setuserConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = () => {
    if (!user || !userConf || !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (user !== userConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(user, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={containerStyle}>
      <C.Container>
        <C.Label style={labelStyle}>CADASTRO</C.Label>
        <C.Content>
          <Input
            type="user"
            placeholder="Digite seu nome de usuário"
            value={user}
            onChange={(e) => [setUser(e.target.value), setError("")]}
          />
          <Input
            type="user"
            placeholder="Confirme seu nome de usuário"
            value={userConf}
            onChange={(e) => [setuserConf(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Inscrever-se" onClick={handleSignup} />
          <C.LabelSignin>
            Já tem uma conta?
            <C.Strong>
              <Link to="/signin">&nbsp;Entre</Link>
            </C.Strong>
          </C.LabelSignin>
        </C.Content>
      </C.Container>
    </div>
  );
};

export default Signup;
