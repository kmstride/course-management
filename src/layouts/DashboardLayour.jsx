import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LogOutBtn from "../components/shared/LogOutBtn";
import { useDispatch } from "react-redux";
import { setToken } from "../feature/rootSlice";

function DashboardLayour() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  if (token) {
    dispatch(setToken(token));
  }
  const links = (
    <>
      <LinkContainer to={"/dashboard/my-courses"}>
        <Nav.Link>My Courses</Nav.Link>
      </LinkContainer>
      <LinkContainer to={"/dashboard/create-course"}>
        <Nav.Link>Create Course</Nav.Link>
      </LinkContainer>
      <LinkContainer to={"/"}>
        <Nav.Link>Home</Nav.Link>
      </LinkContainer>
      <LogOutBtn />
    </>
  );
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer to={"/dashboard"}>
          <Navbar.Brand>Dashboard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-lg-none">{links}</Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={2} className="bg-light sidebar d-none d-lg-block">
            <Nav className="flex-column">{links}</Nav>
          </Col>
          <Col md={10} className="main-content">
            <h3 className="text-center text-decoration-underline">
              My Dashboard
            </h3>
            <Outlet />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default DashboardLayour;
