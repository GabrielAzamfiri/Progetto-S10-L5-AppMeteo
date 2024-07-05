import { Col, Container, Row } from "react-bootstrap";


const NotFound = () => {
  
  
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} className="text-center">
          <h1 className="display-3 text-primary">404 — Risorsa non trovata!</h1>
          <p className="lead">La pagina che stavi cercando non è disponibile</p>
          
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;