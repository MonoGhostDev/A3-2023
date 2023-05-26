import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import * as C from "./styles";

const About = () => {
  const titleStyle = {
    display: "center",
  };

  return (
    <div>
      <h1 style={titleStyle}>RhythmHive</h1>
    </div>
  );
};

export default About;
