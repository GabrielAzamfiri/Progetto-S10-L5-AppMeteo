import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate} from "react-router-dom";

const Search = (props)=>{
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  

    return(

       
            <Container>
              <Alert className="d-flex justify-content-center fs-4 h-100" key="info" variant="info">
                Cerca una città per vedere il meteo!
              </Alert>
              <Form className="d-flex "> 
                <Form.Control
                  className="bg-light text-dark me-2"
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
                    props.searchFunc(value)
                    navigate("/Home-Meteo" )
                  }}
                  type="submit"
                  value="Submit"
                  variant="light"
                >
                  Search
                </Button>
            
              </Form>
            </Container>
         
    )
}
export default Search;