import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CityDetails = () => {
  const [infoWeather, setInfoWeather] = useState(null);
  const [selectedcard, setSelectedCard] = useState(null);
  const params = useParams();
  const lat = params.lat;
  const lon = params.lon;
  const citta = params.citta;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          speed: 500,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 778,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 500,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 500,
          infinite: true,
          dots: true,
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
                  <span className="fs-1 ">T: {Math.round(day.main.temp - 273.15)}°C</span>
                </Card.Text>
                <Card.Title className="d-flex justify-content-center align-items-center text-center ">{new Date(day.dt_txt).toLocaleTimeString("eng", options)}</Card.Title>
                <Card.Subtitle className="mb-2 d-flex justify-content-between align-items-center">
                  <span className="opacity-75 lead fs-5">{day.weather[0].description}</span>
                  <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} width={80} alt="Weather icon" />
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </Slider>
      )}
      {selectedcard && (
        <Row>
          <Col md={8} className="border  my-5 w-50 m-auto p-3">
            <h1 className="lead fs-1 text-center ">{citta.toUpperCase()}</h1>

            <h1 className="truncate d-flex justify-content-center align-items-center fs-3 mb-5">{new Date(selectedcard.dt_txt).toLocaleTimeString("eng", options)}</h1>
            <h3 className="mb-2 d-flex justify-content-center align-items-center ">
              <span className="display-1 ">Temp: {Math.round(selectedcard.main.temp - 273.15)}°C</span>
            </h3>
            <h3 className="mb-2 d-flex justify-content-between align-items-center">
              <span className="opacity-75 lead fs-3">{selectedcard.weather[0].description}</span>
              <img src={`http://openweathermap.org/img/w/${selectedcard.weather[0].icon}.png`} width={100} alt={selectedcard.weather[0].description} />
            </h3>

            <h3 className="mb-2 d-flex justify-content-between align-items-center">
            <span className="opacity-75 lead fs-5">Min: {Math.round(selectedcard.main.temp_min - 273.15)}°C</span>
            <span className="opacity-75 lead fs-5">Min: {Math.round(selectedcard.main.temp_max - 273.15)}°C</span>
            </h3>
            <h3 className="mb-2 d-flex justify-content-between align-items-center">
            <span className="opacity-75 lead fs-5">Feels like: {Math.round(selectedcard.main.feels_like - 273.15)}°C</span>
            <span className="opacity-75 lead fs-5">Humidity: {selectedcard.main.humidity}%</span>
            </h3>
            <h3 className="mb-2 d-flex justify-content-between align-items-center">
            <span className="opacity-75 lead fs-5">Pressure: {selectedcard.main.pressure}hPa</span>
            <span className="opacity-75 lead fs-5">Wind: {selectedcard.wind.speed}m/s</span>
            </h3>
            <h3 className="mb-2 d-flex justify-content-between align-items-center">
            <span className="opacity-75 lead fs-5">Visibility: {selectedcard.visibility}m</span>
            <span className="opacity-75 lead fs-5">Cloudiness: {selectedcard.clouds.all}%</span>
            </h3>
            
           
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default CityDetails;
