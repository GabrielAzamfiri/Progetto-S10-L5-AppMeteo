import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomeMeteo from "./components/HomeMeteo";
import CityDetails from "./components/CityDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import { useState } from "react";


function App() {
  const [searchCity, setSearchCity] = useState("");


  const getsearchCity = searchedCity => {
    setSearchCity(searchedCity);
    console.log(searchedCity);
  };
 
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavbar searchFunc={getsearchCity} />
        <Routes>
          {searchCity && (
            <Route path="/" element={<HomeMeteo city={searchCity} />} />
          ) }

          <Route path="/Meteo/:citta/:lat/:lon" element={<CityDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
