import { useState } from "react";
import { Alert, Button, Container, Form, InputGroup, Nav, Navbar } from "react-bootstrap";

const MyNavbar = props => {
  const [value, setValue] = useState("");
  const [showAlert, setShowAlert] = useState(true);
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
            {!showAlert && 
            
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
                  setShowAlert(false);
                }}
                type="submit"
                value="Submit"
                variant="light"
              >
                Search
              </Button>
            </Form>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5 ">
        {showAlert && (
          <>
            <Alert className="d-flex justify-content-center fs-4 h-100" key="info" variant="info">
              Cerca una città per vedere il meteo!
            </Alert>
            <Form>


            <InputGroup size="lg">
            
              <Form.Control
                className="bg-light text-dark"
                type="search"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                onChange={e => {
                  e.preventDefault();
                  setValue(e.target.value);
                }}
              />
              <Button
                onClick={e => {
                  e.preventDefault();
                  props.searchFunc(value);
                  setShowAlert(false);
                }}
                type="submit"
                value="Submit"
                variant="light"
              >
                Search
              </Button>
            </InputGroup>
            </Form>
          </>
        )}
      </Container>
    </div>
  );
};
export default MyNavbar;
