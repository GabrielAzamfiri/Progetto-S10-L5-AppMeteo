

// Importa le icone
import clearSkyDay from "../assets/icons/openweathermap/01d.svg";
import clearSkyNight from "../assets/icons/openweathermap/01n.svg";
import fewCloudsDay from "../assets/icons/openweathermap/02d.svg";
import fewCloudsNight from "../assets/icons/openweathermap/02n.svg";
import scatteredCloudsDay from "../assets/icons/openweathermap/03d.svg";
import scatteredCloudsNight from "../assets/icons/openweathermap/03n.svg";
import brokenCloudsDay from "../assets/icons/openweathermap/04d.svg";
import brokenCloudsNight from "../assets/icons/openweathermap/04n.svg";
import showerRainDay from "../assets/icons/openweathermap/09d.svg";
import showerRainNight from "../assets/icons/openweathermap/09n.svg";
import rainDay from "../assets/icons/openweathermap/10d.svg";
import rainNight from "../assets/icons/openweathermap/10n.svg";
import thunderstormDay from "../assets/icons/openweathermap/11d.svg";
import thunderstormNight from "../assets/icons/openweathermap/11n.svg";
import snowDay from "../assets/icons/openweathermap/13d.svg";
import snowNight from "../assets/icons/openweathermap/13n.svg";
import mistDay from "../assets/icons/openweathermap/50d.svg";
import mistNight from "../assets/icons/openweathermap/50n.svg";
import termometer from "../assets/icons/all/thermometer-celsius.svg"
import humidity from "../assets/icons/all/humidity.svg";
import wind from "../assets/icons/all/wind.svg";
import sunset from "../assets/icons/all/sunset.svg";
import sunrise from "../assets/icons/all/sunrise.svg";
import thermometerWarmer from "../assets/icons/all/thermometer-warmer.svg";
import thermometerColder from "../assets/icons/all/thermometer-colder.svg";
import humidityDrop from "../assets/icons/all/raindrop.svg";
import barometer from "../assets/icons/all/barometer.svg";
import windSock from "../assets/icons/all/windsock.svg";
import haze from "../assets/icons/all/haze.svg";
import cloudy from "../assets/icons/all/cloudy.svg";
import termometer2 from "../assets/icons/all/thermometer.svg"

const WeatherIcon = ({ code }) => {
  let icon;

  switch (code) {
    case "01d":
      icon = clearSkyDay;
      break;
    case "01n":
      icon = clearSkyNight;
      break;
    case "02d":
      icon = fewCloudsDay;
      break;
    case "02n":
      icon = fewCloudsNight;
      break;
    case "03d":
      icon = scatteredCloudsDay;
      break;
    case "03n":
      icon = scatteredCloudsNight;
      break;
    case "04d":
      icon = brokenCloudsDay;
      break;
    case "04n":
      icon = brokenCloudsNight;
      break;
    case "09d":
      icon = showerRainDay;
      break;
    case "09n":
      icon = showerRainNight;
      break;
    case "10d":
      icon = rainDay;
      break;
    case "10n":
      icon = rainNight;
      break;
    case "11d":
      icon = thunderstormDay;
      break;
    case "11n":
      icon = thunderstormNight;
      break;
    case "13d":
      icon = snowDay;
      break;
    case "13n":
      icon = snowNight;
      break;
    case "50d":
      icon = mistDay;
      break;
    case "50n":
      icon = mistNight;
      break;
      case "termometer":
      icon = termometer;
      break;
      case "humidity":
      icon = humidity;
      break;
      case "wind":
      icon = wind;
      break;
      case "sunset":
      icon = sunset;
      break;
      case "sunrise":
      icon = sunrise;
      break;
      case "thermometerWarmer":
      icon = thermometerWarmer;
      break;
      case "thermometerColder":
      icon = thermometerColder;
      break;
      case "humidityDrop":
      icon = humidityDrop;
      break;
      case "barometer":
      icon = barometer;
      break;
      case "windSock":
      icon = windSock;
      break;
      case "haze":
      icon = haze;
      break;
      case "cloudy":
      icon = cloudy;
      break;
      case "termometer2":
      icon = termometer2;
      break;
      default:
      icon = clearSkyDay; // Icona di default in caso di codice non riconosciuto
  }

  return (
    <img  src={icon} alt="Weather Icon" />
  );
};

export default WeatherIcon;