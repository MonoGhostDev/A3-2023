import React,  { useState }  from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import * as C from "./styles";
import jQuery from 'jquery';
var $ = require( "jquery" );

function showLetra (data,art,mus,arrayid) {
  if (! arrayid) arrayid = 0;

  if (data.type === 'exact' || data.type === 'aprox') {
    // Print lyrics text
    $('#letra #textLetra').text(data.mus[arrayid].text);
    
  }
}
function fetchLetra (art,mus) {
  var data = jQuery.data(document,art + mus); // cache read
  if (data) {
    showLetra(data, art, mus);
    return true;
  }

  var url = "http://api.vagalume.com.br/search.php"
    +"?art="+encodeURIComponent(art)
    +"&mus="+encodeURIComponent(mus);

  // Check if browser supports CORS - http://www.w3.org/TR/cors/
  if (!jQuery.support.cors) {
    url += "&callback=?";
  }

  jQuery.getJSON(url,function(data) {
    // What we do with the data
    jQuery.data(document,art + mus,data); // cache write
    showLetra(data, art, mus);
  });
}

// Just an example of how you can call this using elements on the page
function reload(artista, musica, letra){
  fetchLetra(artista,musica);
}



const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const [artista, setArtista] = useState("");
  const [musica, setMusica] = useState("");
  const [error, setError] = useState("");
  var letra;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#F9C80E", // amarelo
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
    alignItems: "center",
  };

  const titleStyle = {
    marginLeft: "10px",
  };

  const beeIconStyle = {
    fontSize: "40px",
    color: "black",
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={logoStyle}>
          <i className="fas fa-bee" style={beeIconStyle}></i>
          <h1 style={titleStyle}>RhythmHive</h1>
        </div>
      </header>
      <main>
        <C.Container>
          <C.Title>Home</C.Title>
          <Input
            type="Text"
            placeholder="Artista"
            value={artista}
            onChange={(e) => [setArtista(e.target.value), setError("")]}
          />
          <Input
            type="Text"
            placeholder="Musica"
            value={musica}
            onChange={(e) => [setMusica(e.target.value), setError("")]}
          />
          <Button Text="Reload" onClick={() => [reload(artista, musica)]}></Button>
          
          <C.LabelSignin>
            Não está logado?
            <C.Strong>
              <Link to="/signin">&nbsp;Login</Link>
            </C.Strong>
          </C.LabelSignin>
          <Button Text="Sair" onClick={() => [signout(), navigate("/")]} />
        </C.Container>

        <div id='letra'>
          <pre id='textLetra'>Fetching lyrics... </pre>
        </div>
      </main>
    </div>
  );
};

export default Home;
