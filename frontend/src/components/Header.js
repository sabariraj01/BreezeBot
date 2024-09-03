import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../context/AuthContext";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  body {
    font-family: 'Poppins', sans-serif;
  }
`;

const StyledNavbar = styled(Navbar)`
  transition: background-color 0.3s, box-shadow 0.3s;
  background: #000000; /* Black background */
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
  color: #ffffff !important; /* White text */
  margin: 0 20px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  text-decoration: none !important;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff0000 !important; /* Red on hover */
    text-shadow: 0 0 10px #ff0000;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    text-align: center;
  }
`;

const StyledButton = styled.button`
  color: #000000 !important; /* Black text on button */
  border: 2px solid #ffd700 !important; /* Gold border */
  padding: 5px 15px;
  background-color: #ffd700 !important; /* Gold background */
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #ffffff !important; /* White text on hover */
    background-color: #ff0000 !important; /* Red background on hover */
    border-color: #ff0000 !important; /* Red border on hover */
  }

  @media (max-width: 768px) {
    display: block;
    margin: 10px auto;
    width: auto;
    text-align: center;
  }
`;

const StyledNavbarBrandText = styled.span`
  color: #ffd700; /* Gold text */
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
  font-family: 'Poppins', sans-serif;

  &:hover {
    color: #ff0000 !important; /* Red on hover */
    text-shadow: 0 0 10px #ff0000;
  }

  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
  }
`;

const CenteredUsername = styled.div`
  color: #ffd700; /* Gold text */
  font-size: 1.2rem;
  font-weight: 700; /* Bold text */
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.8); /* Stronger gold glow */
  font-family: 'Poppins', sans-serif;
  margin-right: 30px;  // Increased margin to highlight space
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
                  <Nav.Item>
                    <CenteredUsername>{user.username}</CenteredUsername>
                  </Nav.Item> 
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
