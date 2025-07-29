import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../App.scss";
import RegisterForm from "./RegisterForm";
import { useState } from "react";
import LoginForm from "./LoginForm";

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Header = ({ isLoggedIn, setIsLoggedIn }: HeaderProps) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleCloseForm = () => {
    setShowRegisterForm(false);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container className="p-0">
            <Navbar.Brand href="#">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#">Home</Nav.Link>
                <Nav.Link href="#">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <div className="d-flex gap-2">
                {isLoggedIn ? (
                  <Button variant="outline-danger" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline-primary"
                      onClick={() => setShowLoginForm(true)}
                    >
                      Login
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setShowRegisterForm(true)}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>

      {/* Modal Forms */}
      <RegisterForm show={showRegisterForm} onClose={handleCloseForm} />
      <LoginForm
        show={showLoginForm}
        onClose={handleCloseForm}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          handleCloseForm();
        }}
      />
    </>
  );
};

export default Header;
