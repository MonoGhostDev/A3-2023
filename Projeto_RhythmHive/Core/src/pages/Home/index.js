import React from "react";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import * as C from "./styles";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#FFECB1", // amarelo
    backgroundImage:
      "url('https://png.pngtree.com/element_our/20190522/ourlarge/pngtree-bee-cartoon-image_1076773.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "20%",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "top",
  };

  const titleStyle = {
    marginLeft: "10px",
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={logoStyle}>
          <h1 style={titleStyle}>RhythmHive</h1>
        </div>
      </header>
      <main>
        <C.Container>
          <C.Title>Home</C.Title>

          <C.LabelSignin>
            Não está logado?
            <C.Strong>
              <Link to="/signin">&nbsp;Login</Link>
            </C.Strong>
          </C.LabelSignin>
          <Button Text="Sair" onClick={() => [signout(), navigate("/")]} />
        </C.Container>
      </main>
    </div>
  );
};

export default Home;
