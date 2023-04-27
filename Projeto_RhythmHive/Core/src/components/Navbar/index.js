import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
  Button,
} from "./styles";
import LogoImg from "./BackgroundBee.png";

import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/home">RhythmHive</NavbarLink>
            <NavbarLink to="/signup"> Registrar</NavbarLink>
            <NavbarLink to="/signin"> Logar </NavbarLink>
            <Button
              Text="Sair"
              onClick={() => [signout(), navigate("/home")]}
            />

            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Logo src={LogoImg}></Logo>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/"> Home </NavbarLinkExtended>
          <NavbarLinkExtended to="/signup"> Registrar-se </NavbarLinkExtended>
          <NavbarLinkExtended to="/signin"> Logar </NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
