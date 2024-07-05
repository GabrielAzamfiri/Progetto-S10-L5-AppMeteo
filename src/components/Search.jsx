import { useState } from "react";
import { Alert, Button, Container, Form, InputGroup } from "react-bootstrap";
import { useNavigate} from "react-router-dom";

const Search = (props)=>{
  const [value, setValue] = useState("");
  const navigate = useNavigate();

    return(

       
            <Container>
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
                    navigate("/" + value)
                  }}
                  type="submit"
                  value="Submit"
                  variant="light"
                >
                  Search
                </Button>
              </InputGroup>
              </Form>
            </Container>
         
    )
}
export default Search;