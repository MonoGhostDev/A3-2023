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
  const isSignInPage = location.pathname === "/signin";
  const isSignUpPage = location.pathname === "/signup";
  const isPlannerPage = location.pathname === "/planner";

  const handleMusicSearch = () => {
    if ((isSignInPage || isSignUpPage) && extendNavbar) {
      navigate("/signin");
    } else {
      navigate("/home");
    }
  };

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            {isPlannerPage || isRhythmHive ? (
              <NavbarLink to="/home">RhythmHive</NavbarLink>
            ) : (
              <NavbarLink to="/signin">RhythmHive</NavbarLink>
            )}
            {isRhythmHive && (
              <>
                <NavbarLink to="/planner">Planner</NavbarLink>
              </>
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
          {isRhythmHive && (
            <NavbarLinkExtended to="/planner">Planner</NavbarLinkExtended>
          )}
          {(isPlannerPage || isRhythmHive) && (
            <NavbarLinkExtended to="/home">RhythmHive</NavbarLinkExtended>
          )}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
