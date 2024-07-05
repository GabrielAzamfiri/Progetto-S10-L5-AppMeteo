import { useParams } from "react-router-dom";

const CityDetails=()=>{
    const params = useParams();
  const placeInfoWeather = params.placeInfoWeather;
  {placeInfoWeather&& console.log("dettaglio page"+placeInfoWeather)}
  
    return(
        <div>Ciao CityDetails</div>

    )
}
export default CityDetails