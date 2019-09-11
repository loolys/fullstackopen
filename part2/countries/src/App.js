import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country[0].capital}&units=metric&APPID=f02e9ad38636be6ba2296667fbde251b`
      )
      .then(res => {
        setWeather(res.data);
      });
  }, [country]);

  const languages = country[0].languages.map(language => (
    <li key={language.iso639_2}>{language.name}</li>
  ));

  const renderWeather = weather.main ? (
    <div>
      <p>Temperature: {weather.main.temp} celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt=""
      />
      <p>Wind: {weather.wind.speed} kph</p>
    </div>
  ) : (
    <div></div>
  );

  return (
    <div>
      <h1>{country[0].name}</h1>
      <p>Capital: {country[0].capital}</p>
      <p>Population: {country[0].population}</p>

      <h3>Languages</h3>
      <ul>{languages}</ul>
      <img className="flag" src={country[0].flag} alt="flag" />
      <h2>Weather in {country[0].capital}</h2>
      {renderWeather}
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = e => setSearch(e.target.value);
  const handleShow = country => setSearch(country.name);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      setCountries(res.data);
    });
  }, []);

  const filterCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderCountries =
    filterCountries.length >= 10 ? (
      <div></div>
    ) : filterCountries.length === 1 ? (
      <CountryInfo country={filterCountries} />
    ) : (
      filterCountries.map(country => (
        <div key={country.alpha3Code}>
          <p>{country.name}</p>
          <button onClick={() => handleShow(country)}>show</button>
        </div>
      ))
    );

  return (
    <div className="App">
      find countries{" "}
      <input type="text" value={search} onChange={handleChange} />
      {renderCountries}
    </div>
  );
}

export default App;
