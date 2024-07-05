import { useState } from "react";
import { Button, Container, Form, Nav, Navbar} from "react-bootstrap";

const MyNavbar = (props) => {
    const [value, setValue] = useState('');
   
  return (
    <Navbar expand="lg" className="bg-dark-subtle">
      <Container fluid >
        <Navbar.Brand href="#"><img width={50} src="https://cdn6.aptoide.com/imgs/9/a/8/9a8b8981bbe2a3ecf001ff1421828e0e_icon.png" alt="logo nuvola e sole" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="ms-auto">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="#action1">Home</Nav.Link>
          </Nav>
        <Form className="d-flex "  >
          <Form.Control  onChange={(e) => {
            e.preventDefault();
              setValue(e.target.value);
            }}  width={500} type="search" placeholder="Search" className="me-2" aria-label="Search" />
          <Button onClick={(e) => {
             e.preventDefault();
              props.searchFunc(value);
            }} type="submit" value="Submit" variant="outline-success" >Search</Button>
        </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavbar;

