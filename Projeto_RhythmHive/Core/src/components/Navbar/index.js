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
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const { signout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isRhythmHive = location.pathname === "/home";

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            {isRhythmHive ? (
              <>
                <NavbarLink to="/home">RhythmHive</NavbarLink>
                <NavbarLink to="/signup">Registrar</NavbarLink>
                <NavbarLink to="/signin">Logar</NavbarLink>
              </>
            ) : (
              <NavbarLink to="/home">RhythmHive</NavbarLink>
            )}
            <Button
              Text="Sair"
              onClick={() => [signout(), navigate("/signin")]}
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
        <RightContainer></RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/"></NavbarLinkExtended>
          {!isRhythmHive && (
            <NavbarLinkExtended to="/signup">Registrar-se</NavbarLinkExtended>
          )}
          {!isRhythmHive && (
            <NavbarLinkExtended to="/signin">Logar</NavbarLinkExtended>
          )}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
