import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import * as C from "./styles";
import jQuery from "jquery";
var $ = require("jquery");

function showLetra(data, art, mus, arrayid) {
  if (!arrayid) arrayid = 0;

  let letraText = "";

  if (data.type === "exact" || data.type === "aprox") {
    if (data.mus[arrayid].text && data.mus[arrayid].text.trim() !== "") {
      letraText = data.mus[arrayid].text;
    } else {
      letraText = "Música não encontrada no banco de dados do vagalume.com.br";
    }
  } else {
    letraText = "Música não encontrada no banco de dados do vagalume.com.br";
  }

  return letraText;
}

function fetchLetra(art, mus, setLetra) {
  var data = jQuery.data(document, art + mus);
  if (data) {
    setLetra(showLetra(data, art, mus));
    return true;
  }

  var url =
    "http://api.vagalume.com.br/search.php" +
    "?art=" +
    encodeURIComponent(art) +
    "&mus=" +
    encodeURIComponent(mus);

  if (!jQuery.support.cors) {
    url += "&callback=?";
  }

  jQuery.getJSON(url, function (data) {
    jQuery.data(document, art + mus, data);
    setLetra(showLetra(data, art, mus));
  });
}

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const [artista, setArtista] = useState("");
  const [musica, setMusica] = useState("");
  const [error, setError] = useState("");
  const [letra, setLetra] = useState("A letra vai aparecer aqui!");

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#F9C80E83",
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

  const inputStyle = {
    width: "200px",
  };
  const letraStyle = {
    fontSize: "21px",
    textAlign: "center",
    marginTop: "-75px",
  };

  function reload(artista, musica) {
    fetchLetra(artista, musica, setLetra);
  }

  useEffect(() => {
    $("#letra #textLetra").text(letra);
  }, [letra]);

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={logoStyle}>
          <h1 style={titleStyle}>RhythmHive</h1>
        </div>
      </header>
      <main>
        <C.Container>
          <C.Title>Buscador de músicas</C.Title>
          <input
            type="text"
            placeholder="Artista"
            value={artista}
            style={{
              width: "750px",
              height: "50px",
              fontSize: "22px",
              borderRadius: "10px",
            }}
            onChange={(e) => [setArtista(e.target.value), setError("")]}
          />
          <input
            type="text"
            placeholder="Nome da música"
            value={musica}
            style={{
              width: "750px",
              height: "50px",
              fontSize: "22px",
              borderRadius: "10px",
            }}
            onChange={(e) => [setMusica(e.target.value), setError("")]}
          />
          <Button Text="Buscar" onClick={() => reload(artista, musica)} />

          <C.LabelSignin>
            <C.Strong></C.Strong>
          </C.LabelSignin>
          <Button
            Text="Sair"
            onClick={() => {
              signout();
              navigate("/");
            }}
          />
        </C.Container>

        <div id="letra">
          <pre id="textLetra" style={letraStyle}>
            {letra}
          </pre>
        </div>
      </main>
    </div>
  );
};

export default Home;
