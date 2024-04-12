import React, { useState } from "react";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";

import logo from "../assets/log.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import LogoutConfirmationDialog from "./LogoutConfirmationDialog"; // Import the dialog component

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State for showing the confirmation dialog

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setShowLogoutConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image src={logo} alt="logo" fluid className="log mx-1" />
              Ocumen S. Dental Clinic
            </Navbar.Brand>
          </LinkContainer>

          {userInfo?.isAdmin === true && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                    <LinkContainer to={`/changePassword/${userInfo._id}`}>
                      <NavDropdown.Item>Change Password</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => setShowLogoutConfirmation(true)}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>

      {/* Render the logout confirmation dialog */}
      <LogoutConfirmationDialog
        show={showLogoutConfirmation}
        onHide={() => setShowLogoutConfirmation(false)}
        onConfirm={logoutHandler}
      />
    </header>
  );
};

export default Header;
