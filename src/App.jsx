import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomeMeteo from "./components/HomeMeteo";
import CityDetails from "./components/CityDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import { useState } from "react";
import NotFound from "./components/NotFound";
import Search from "./components/Search";


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
          <Route path="/" element={<Search searchFunc={getsearchCity}/>} />
          
          {searchCity && (
            <Route path="/:citta" element={<HomeMeteo />} />
          ) }

          <Route path="/Meteo/:citta/:lat/:lon" element={<CityDetails />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
