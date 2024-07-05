import { useState } from "react";
import {  Button, Container, Form,  Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavbar = props => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  
  return (
    <div>
      <Navbar expand="lg" className="bg-transparent">
        <Container fluid>
          <Navbar.Brand href="#">
            <img width={50} src="https://cdn6.aptoide.com/imgs/9/a/8/9a8b8981bbe2a3ecf001ff1421828e0e_icon.png" alt="logo nuvola e sole" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="ms-auto">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            
            
            <Form className="d-flex " data-bs-theme="light">
              <Form.Control
                onChange={e => {
                  e.preventDefault();
                  setValue(e.target.value);
                }}
                width={500}
                type="search"
                placeholder="Search"
                className="me-2 bg-light"
                aria-label="Search"
              />
              <Button
                onClick={e => {
                  e.preventDefault();
                  props.searchFunc(value);
                  navigate("/" + value)
                }}
                type="submit"
                value="Submit"
                variant="light"
              >
                Search
              </Button>
            </Form>
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5 ">
        
      </Container>
    </div>
  );
};
export default MyNavbar;
