import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GeoAlt, Sunrise, Sunset, ThermometerHalf } from "react-bootstrap-icons";

const HomeMeteo = props => {
  const [infoLatLon, setInfoLatLon] = useState(null);

  const [infoCity, setInfoCity] = useState(null);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const getLatLon = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${props.city}&appid=e8d87bd81900f30c8de4279bdbba4c0e`)
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
      .catch(err => alert(err));
  };
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
        console.log(objResp);
        setInfoCity(objResp);
      })
      .catch(err => alert(err));
  };
  useEffect(() => {
    getLatLon();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.city]);

  useEffect(() => {
    if (infoLatLon != null) {
      getInfoCity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoLatLon]);

  return (
    <Container className="mt-5">
      {infoCity && (
        <div className="">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="d-flex align-items-center justify-content-between">
              <GeoAlt className="me-2" /> {infoCity.name}
            </h2>
            <h2>{new Date(infoCity.dt * 1000).toLocaleDateString("eng", options)}</h2>
          </div>
          <Row className="d-flex justify-content-between mt-5">
            <Col className="d-flex flex-column justify-content-center align-items-center">
            
            <h2 className="display-1">
              <ThermometerHalf className="me-3" /> {Math.round(infoCity.main.temp - 273.15)}°C
            </h2>
            </Col>
            <Col>
              <div id="icon" className="d-flex flex-column justify-content-center align-items-center">
                <img id="wicon" src={`http://openweathermap.org/img/w/${infoCity.weather[0].icon}.png`} width={150} alt="Weather icon" />
                <h2>{infoCity.weather[0].description.toUpperCase()}</h2>
              </div>
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center">
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
            <Sunrise className="display-2"/>
            <h3>
                <span className="opacity-50 lead fs-3">Sunrise:  </span>
                {new Date(infoCity.sys.sunrise * 1000  ).toLocaleTimeString("eng", { hour12: true })}
  
            </h3>
            </Col>
           
            <Col className="d-flex flex-column justify-content-center align-items-center">
            <Sunset className="display-2"/>
            <h3>
                <span className="opacity-50 lead fs-3">Sunset:  </span>
                {new Date(infoCity.sys.sunset * 1000).toLocaleTimeString("eng", { hour12: true })}
            </h3>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};
export default HomeMeteo;
