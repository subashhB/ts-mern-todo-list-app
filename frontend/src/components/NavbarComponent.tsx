import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavbarLoggedInView from "./NavbarLoggedInView";
import NavbarLoggedOutView from "./NavbarLoggedOutView";

interface NavbarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoggedInClicked: () => void;
  onLogoutSuccessful: () => void;
}

const NavbarComponent = ({
  loggedInUser,
  onSignUpClicked,
  onLoggedInClicked,
  onLogoutSuccessful: onLogoutSuccessfull,
}: NavbarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand>To-Do</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavbarLoggedInView
                user={loggedInUser}
                onLogoutSuccessful={onLogoutSuccessfull}
              />
            ) : (
              <NavbarLoggedOutView onSignUpClicked={ onSignUpClicked } onLoginClicked={ onLoggedInClicked } />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
