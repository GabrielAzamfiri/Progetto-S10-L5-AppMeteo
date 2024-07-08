import { useEffect, useState } from "react";
import { Alert, Col, Container, ListGroup, Row } from "react-bootstrap";
import { ArrowRight, GeoAlt, Sunrise, Sunset, ThermometerHalf } from "react-bootstrap-icons";
import { Link,  useNavigate,  useParams } from "react-router-dom";

const HomeMeteo = props => {
  const params = useParams();
  const citta = params.citta;
  const [infoLatLon, setInfoLatLon] = useState(null);

  const [infoCity, setInfoCity] = useState(null);

  const [infoWeather, setInfoWeather] = useState(null);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // **************************************************getLatLon****************************************************************************************
 
  const navigate = useNavigate();
  const getLatLon = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${citta}&appid=e8d87bd81900f30c8de4279bdbba4c0e`)
      .then(resp => {
        if (resp.ok) {
          // restituiamo il dato convertito in array da JSON
          return resp.json();
        } else {
          throw new Error("Errore nel reperimento del commento");
        }
      })
      .then(objResp => {
        setInfoLatLon(objResp);
      })
      .catch(err => {
        alert(err)
        navigate("*")
      });
      
  };

  // **************************************************getInfoCity****************************************************************************************

  const getInfoCity = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${infoLatLon[0].lat}&lon=${infoLatLon[0].lon}&appid=e8d87bd81900f30c8de4279bdbba4c0e`)
      .then(resp => {
        if (resp.ok) {
          // restituiamo il dato convertito in array da JSON
          return resp.json();
        } else {
          throw new Error("Errore nel reperimento del commento");
        }
      })
      .then(objResp => {
        setInfoCity(objResp);
      })
      .catch(err => {
        alert(err)
        navigate("*")
      });
  };

  // **************************************************getNextDaysInfoCity****************************************************************************************

  const getNextDaysInfoCity = () => {
    fetch(` https://api.openweathermap.org/data/2.5/forecast?lat=${infoLatLon[0].lat}&lon=${infoLatLon[0].lon}&appid=e8d87bd81900f30c8de4279bdbba4c0e`)
      .then(resp => {
        if (resp.ok) {
          // restituiamo il dato convertito in array da JSON
          return resp.json();
        } else {
          throw new Error("Errore nel reperimento del commento");
        }
      })
      .then(objResp => {
        console.log(objResp);
        setInfoWeather(objResp);
      })
      .catch(err => {
        alert(err)
        navigate("*")
      });
  };
  useEffect(() => {
    getLatLon();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.city]);

  useEffect(() => {
    if (infoLatLon != null && infoLatLon.length >0) {
      getInfoCity();
      getNextDaysInfoCity();
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoLatLon]);
 
 
  

  return (
    <Container className="mt-5">
      {infoCity && (
        <div >
          <div className="d-sm-block d-md-flex justify-content-between align-items-center">
            <h2 className="d-flex align-items-center ">
              <GeoAlt className="me-2" /> {infoCity.name}
            </h2>
            <h2>{new Date(infoCity.dt * 1000).toLocaleTimeString("eng", options)}</h2>
          </div>
          <Row className="d-flex justify-content-between mt-5">
            <Col xs={12}  lg={4}  className="d-flex flex-column justify-content-center align-items-center">
              <h2 className="display-1">
                <ThermometerHalf className="me-3" /> {Math.round(infoCity.main.temp - 273.15)}°C
              </h2>
            </Col>
            <Col xs={12} md={6} lg={4} >
              <div id="icon" className="d-flex flex-column justify-content-center align-items-center">
                <img id="wicon" src={`http://openweathermap.org/img/w/${infoCity.weather[0].icon}.png`} width={150} alt="Weather icon" />
                <h2>{infoCity.weather[0].description.toUpperCase()}</h2>
              </div>
            </Col>
            <Col xs={12} md={6} lg={4} className="d-flex flex-column justify-content-center align-items-center">
              <h3>
                <span className="opacity-50 lead fs-3">Humidity: </span>
                {Math.round(infoCity.main.humidity)}%
              </h3>

              <h3>
                <span className="opacity-50 lead fs-3">Wind: </span>
                {Math.round(infoCity.wind.speed * 3.6)} km/h
              </h3>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="d-flex flex-column justify-content-center align-items-center">
              <Sunrise className="display-2" />
              <h3>
                <span className="opacity-50 lead fs-3">Sunrise: </span>
                {new Date(infoCity.sys.sunrise * 1000).toLocaleTimeString("eng", { hour12: true })}
              </h3>
            </Col>

            <Col className="d-flex flex-column justify-content-center align-items-center">
              <Sunset className="display-2" />
              <h3>
                <span className="opacity-50 lead fs-3">Sunset: </span>
                {new Date(infoCity.sys.sunset * 1000).toLocaleTimeString("eng", { hour12: true })}
              </h3>
            </Col>
          </Row>
          <Row>
            <Alert variant="transparent" className="mt-5">
              <Link to={"/Meteo/" + citta + "/" + infoLatLon[0].lat + "/" + infoLatLon[0].lon} className="link-offset-1 link-underline link-underline-opacity-0 link-underline-opacity-100-hover text-white fs-3" href="#">
               
              Next hours weather <ArrowRight/>
              </Link>
              <ListGroup as="ul">
                {infoWeather &&
                  infoWeather.list.slice(0, 5).map((day, index) => (
                    <ListGroup.Item variant="info" as="li" key={index} className="d-flex align-items-center justify-content-between border rounded my-1">
                      <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} width={50} alt="Weather icon" />
                      <h3 className="lead fs-4 w-50">{new Date(day.dt_txt).toLocaleTimeString("eng", options)}</h3>
                      <h3>
                        <span className="opacity-50 lead fs-3">Temp: </span>
                        {Math.round(day.main.temp - 273.15)}°C
                      </h3>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Alert>
          </Row>
        </div>
      )}
    </Container>
  );
};
export default HomeMeteo;
