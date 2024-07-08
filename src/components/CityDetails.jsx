import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WeatherIcon from "./WeatherIcons";

const CityDetails = () => {
  const [infoWeather, setInfoWeather] = useState(null);
  const [selectedcard, setSelectedCard] = useState(null);
  const params = useParams();
  const lat = params.lat;
  const lon = params.lon;
  const citta = params.citta;
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    seconds: false,
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          speed: 500,
          infinite: true,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 500,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 500,
          infinite: true,
        },
      },
    ],
  };
  const getNextDaysInfoCity = () => {
    fetch(` https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e8d87bd81900f30c8de4279bdbba4c0e`)
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
      .catch(err => alert(err));
  };
  const hendleCard = card => {
    setSelectedCard(card);
    console.log(card);
  };
  useEffect(() => {
    getNextDaysInfoCity();
    // eslint-disable-next-line
  }, [lat, lon]);

  return (
    <Container>
      <h1 className="display-1 text-center my-4">{citta.toUpperCase()}</h1>
      {infoWeather && (
        <Slider {...settings} className="px-2">
          {infoWeather.list.map((day, index) => (
            <Card
              key={index}
              className={selectedcard && selectedcard.dt === day.dt && "border border-info bg-primary"}
              onClick={() => {
                hendleCard(infoWeather.list[index]);
              }}
            >
              <Card.Body>
                <Card.Text className="mb-2 d-flex justify-content-center align-items-center">
                  <WeatherIcon code="termometer" />
                  <span className="fs-1 "> {Math.round(day.main.temp - 273.15)}°C</span>
                </Card.Text>
                <Card.Title className="d-flex justify-content-center align-items-center text-center ">{new Date(day.dt_txt).toLocaleTimeString("en-US", options)}</Card.Title>
                <Card.Subtitle className="mb-2 d-flex justify-content-between align-items-center">
                  <span className="opacity-75 lead fs-5">{day.weather[0].description}</span>
                  <WeatherIcon code={day.weather[0].icon} />
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </Slider>
      )}
      {selectedcard && (
        <Row className="my-5">
          <Col className="border  m-3 w-50  ">
            <h1 className="lead mt-5 fs-1 text-center ">{citta.toUpperCase()}</h1>

            <h1 className="truncate d-flex justify-content-center align-items-center fs-3 mb-5">{new Date(selectedcard.dt_txt).toLocaleTimeString("eng", options)}</h1>
            <Row className="flex-sm-column  flex-md-row">
              <Col className="mb-2 d-flex justify-content-sm-between justify-content-md-center align-items-center temp ">
                <WeatherIcon code="termometer" />
                <span className="display-1 ">{Math.round(selectedcard.main.temp - 273.15)}°C</span>
              </Col>
              <Col className="mb-2 d-flex flex-column  justify-content-center align-items-center weather">
                <WeatherIcon code={selectedcard.weather[0].icon} />
                <span className="opacity-75 lead fs-2">{selectedcard.weather[0].description}</span>
              </Col>
            </Row>
            <Row className="flex-sm-column flex-md-row">
              <Col className="mb-2 border-bottom d-flex justify-content-sm-between justify-content-md-center align-items-center temp  ">
                <WeatherIcon code="thermometerColder" />
                <span className="opacity-75 lead fs-3">Min temp: {Math.round(selectedcard.main.temp_min - 273.15)}°C</span>
              </Col>
              <Col className="mb-2 border-bottom d-flex justify-content-sm-between justify-content-md-center  align-items-center temp ">
                <span className="opacity-75 lead text-end fs-3">Max temp: {Math.round(selectedcard.main.temp_max - 273.15)}°C</span>
                <WeatherIcon code="thermometerWarmer" />
              </Col>
            </Row>
            <Row className="flex-sm-column flex-md-row">
              <Col className="mb-2 border-bottom d-flex justify-content-sm-between justify-content-md-center align-items-center w-120 ">
                <WeatherIcon code="termometer" />
                <span className="opacity-75 lead fs-4">Feels like: {Math.round(selectedcard.main.feels_like - 273.15)}°C</span>
              </Col>
              <Col className="mb-2 border-bottom d-flex justify-content-sm-between justify-content-md-center  align-items-center w-120 ">
                <span className="opacity-75 lead fs-4">Humidity: {selectedcard.main.humidity}%</span>

                <WeatherIcon code="humidityDrop" />
              </Col>
            </Row>
            <Row className="flex-sm-column flex-md-row">
              <Col className="mb-2 border-bottom d-flex justify-content-sm-between justify-content-md-center align-items-center w-120 ">
                <WeatherIcon code="barometer" />
                <span className="opacity-75 lead fs-4">Pressure: {selectedcard.main.pressure}hPa</span>
              </Col>
              <Col className="mb-2 border-bottom d-flex justify-content-sm-between justify-content-md-center  align-items-center w-120 ">
                <span className="opacity-75 lead fs-4">Wind: {selectedcard.wind.speed}m/s</span>

                <WeatherIcon code="windSock" />
              </Col>
            </Row>
            <Row className="flex-sm-column  flex-md-row">
              <Col className=" border-bottom d-flex justify-content-sm-between justify-content-md-center align-items-center w-120 ">
                <WeatherIcon code="haze" />
                <span className="opacity-75 lead fs-4">Visibility: {selectedcard.visibility}m</span>
              </Col>
              <Col className=" border-bottom d-flex justify-content-sm-between justify-content-md-center  align-items-center w-120 ">
                <span className="opacity-75 lead fs-4">Cloudiness: {selectedcard.clouds.all}%</span>

                <WeatherIcon code="cloudy" />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default CityDetails;
