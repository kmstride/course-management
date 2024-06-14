import { Container, Navbar, Nav } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <LinkContainer to={"/"}><Navbar.Brand>Navbar scroll</Navbar.Brand></LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/dashboard"><Nav.Link>Dashboard</Nav.Link></LinkContainer>
              <Nav.Link href="#action2">Link</Nav.Link>
              
            </Nav>
            <Link to="/login" className="btn btn-outline-success">Login</Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
