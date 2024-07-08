import { useEffect, useState } from "react";
import { Alert, Col, Container, ListGroup, Row } from "react-bootstrap";
import { ArrowRight, GeoAlt } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

import WeatherIcon from "./WeatherIcons";

const HomeMeteo = props => {
  const [infoLatLon, setInfoLatLon] = useState([]);

  const [infoCity, setInfoCity] = useState(null);

  const [infoWeather, setInfoWeather] = useState(null);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    seconds: false,
  };

  // **************************************************getLatLon****************************************************************************************

  const navigate = useNavigate();
  const getLatLon = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${props.searchCity}&appid=e8d87bd81900f30c8de4279bdbba4c0e`)
      .then(resp => {
        if (resp.ok) {
          // restituiamo il dato convertito in array da JSON
          return resp.json();
        } else {
          throw new Error("Errore nel reperimento del commento");
        }
      })
      .then(arrResp => {
        if (arrResp.length > 0) {
          setInfoLatLon(arrResp);
        } else {
          navigate("/Not-Found");
        }
      })
      .catch(err => {
        alert(err);
        navigate("/Not-Found");
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
        alert(err);
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
        alert(err);
      });
  };
  useEffect(() => {
    getLatLon();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchCity]);

  useEffect(() => {
    if (infoLatLon.length > 0) {
      getInfoCity();
      getNextDaysInfoCity();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoLatLon]);

  return (
    <Container className="mt-5">
      {infoCity && (
        <div>
          <div className="d-sm-block d-md-flex justify-content-between align-items-center">
            <h2 className="d-flex align-items-center ">
              <GeoAlt className="me-2" /> {infoCity.name}
            </h2>
            <h2>{new Date(infoCity.dt * 1000).toLocaleTimeString("eng", options)}</h2>
          </div>
          <Row className="d-flex justify-content-between mt-5">
            <Col xs={12} lg={4} className="d-flex justify-content-center align-items-center temp">
              <WeatherIcon code="termometer" />
              <h2 className="display-1">{Math.round(infoCity.main.temp - 273.15)}°C</h2>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div id="icon" className="d-flex flex-column justify-content-center align-items-center">
                <WeatherIcon code={infoCity.weather[0].icon} />
                <h2>{infoCity.weather[0].description.toUpperCase()}</h2>
              </div>
            </Col>
            <Col xs={12} md={6} lg={4} className="d-flex flex-column justify-content-center align-items-center ">
              <div className="d-flex justify-content-center align-items-center humidity">
                <WeatherIcon code="humidity" />
                <h2 className="fs-1">{Math.round(infoCity.main.humidity)}%</h2>
              </div>
              <div className="d-flex justify-content-center align-items-center wind">
                <WeatherIcon code="wind" />
                <h2 className="fs-1">{Math.round(infoCity.wind.speed * 3.6)} km/h</h2>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="d-flex flex-column justify-content-center align-items-center sunrise">
              <WeatherIcon code="sunrise" />
              <h3>
                <span className="opacity-50 lead fs-3">Sunrise: </span>
                {new Date(infoCity.sys.sunrise * 1000).toLocaleTimeString("eng", { hour12: true })}
              </h3>
            </Col>

            <Col className="d-flex flex-column justify-content-center align-items-center sunset">
              <WeatherIcon code="sunset" />

              <h3>
                <span className="opacity-50 lead fs-3">Sunset: </span>
                {new Date(infoCity.sys.sunset * 1000).toLocaleTimeString("eng", { hour12: true })}
              </h3>
            </Col>
          </Row>
          <Row>
            <Alert variant="transparent" className="mt-5">
              <Link
                to={"/Meteo/" + props.searchCity + "/" + infoLatLon[0].lat + "/" + infoLatLon[0].lon}
                className="link-offset-1 link-underline link-underline-opacity-0 link-underline-opacity-100-hover text-white fs-3"
                href="#"
              >
                Next hours weather <ArrowRight />
              </Link>
              <ListGroup as="ul">
                {infoWeather &&
                  infoWeather.list.slice(0, 5).map((day, index) => (
                    <ListGroup.Item variant="info" as="li" key={index} className="d-flex align-items-center justify-content-between border rounded my-1">
                      <WeatherIcon code={day.weather[0].icon} />
                      <h3 className="lead fs-4 w-50">{new Date(day.dt_txt).toLocaleTimeString("eng", options)}</h3>
                      <div className="d-flex align-items-center  opacity-50 lead fs-3 ">  
                        <WeatherIcon code="termometer2" /> 
                        <span>{Math.round(day.main.temp - 273.15)}°C</span>
                        
                        </div>
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
