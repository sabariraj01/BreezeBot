import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../context/AuthContext";
import styled, { createGlobalStyle } from "styled-components";

// Global style for the font
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  body {
    font-family: 'Poppins', sans-serif;
  }
`;

// Styled Navbar with gradient background and shadow
const StyledNavbar = styled(Navbar)`
  transition: background-color 0.3s, box-shadow 0.3s;
  background: linear-gradient(90deg, #0056b3, #007bff);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  padding: 0.7rem 1.5rem;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const StyledCollapse = styled(Navbar.Collapse)`
  background-color: ${(props) => (props.expand ? "rgba(0, 0, 0, 0.7)" : "transparent")};
  transition: background-color 0.3s ease-in-out;
`;

const StyledNavLink = styled(Nav.Link)`
  color: #ffffff !important;
  margin: 0 20px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  text-decoration: none !important;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ffeb3b !important;
    text-shadow: 0 0 10px #ffeb3b;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    text-align: center;
  }
`;

const StyledButton = styled.button`
  color: #007bff !important;
  border: 2px solid #007bff !important;
  padding: 5px 15px;
  background-color: #ffffff !important;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #ffffff !important;
    background-color: #007bff !important;
    border-color: #007bff !important;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 10px auto;
    width: auto;
    text-align: center;
  }
`;

const StyledNavbarBrandText = styled.span`
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
  }
`;

const CenteredUsername = styled.div`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  font-family: 'Poppins', sans-serif;
  margin-right: 20px;  // Add margin-right to increase space between username and logout button
`;

function Header() {
  const { user, isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = async () => {
    await logout();
    setExpanded(false);
    navigate("/login");
  };

  const handleSelect = () => {
    setExpanded(false);
  };

  return (
    <>
      <GlobalStyle />
      <StyledNavbar expand="md" fixed="top" navColour={true} expanded={expanded}>
        <Container>
          <Navbar.Brand href="/" className="d-flex">
            <StyledNavbarBrandText>BreezeBot</StyledNavbarBrandText>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <StyledCollapse id="responsive-navbar-nav">
            <Nav className="ms-auto" defaultActiveKey="#home" onSelect={handleSelect}>
              <Nav.Item>
                <StyledNavLink as={Link} to="/" onClick={handleSelect}>
                  Home
                </StyledNavLink>
              </Nav.Item>

              {!isAuth && (
                <>
                  <Nav.Item>
                    <StyledNavLink as={Link} to="/login" onClick={handleSelect}>
                      Login
                    </StyledNavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <StyledNavLink as={Link} to="/register" onClick={handleSelect}>
                      Register
                    </StyledNavLink>
                  </Nav.Item>
                </>
              )}
              

              {isAuth && user && (
                <>
                  <Nav.Item>
                    <StyledNavLink as={Link} to="/chat" onClick={handleSelect}>
                      Chat with 🤖
                    </StyledNavLink>
                  </Nav.Item>
                  {isAuth && user && ( 
                    <Nav.Item>
                        <CenteredUsername>{user.username}</CenteredUsername>
                    </Nav.Item> 
          )}
                  <Nav.Item>
                    <StyledButton onClick={handleLogout}>
                      Logout
                    </StyledButton>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </StyledCollapse>
        </Container>
      </StyledNavbar>
    </>
  );
}

export default Header;
