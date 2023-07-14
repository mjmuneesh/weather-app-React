import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureFull, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import logo from './weather-icon.avif';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!location) {
      setError('Please enter a location.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=70d3c20ea267d6f7d8a05be211ba6975&units=metric`
      );

      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('Failed to fetch weather data. Enter a valid location.');
    } finally {
      setIsLoading(false);
    }
  };

  const isNumberEntered = !isNaN(parseFloat(location)) && !isNaN(location - 0);

  return (
    <div className="app">
      <div className="weather-app">
        <h1>Weather-App</h1>
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter location"
        />
        <button onClick={handleSearch} disabled={isNumberEntered}>
          Search
        </button>

        {isLoading ? (
          <div className="loader" />
        ) : (
          error && <div className="error">{error}</div>
        )}

        {weatherData && (
          <div className="weather-data">
              <div className="logo">
            <img src={logo} alt="React image" />
          </div>
            <h2>{weatherData.name}</h2>
            <p><FontAwesomeIcon icon={faTemperatureFull} className="info-icon" />
            Temperature: {weatherData.main.temp}°C</p>
            <p><FontAwesomeIcon icon={faTint} className="info-icon" />
            Humidity: {weatherData.main.humidity}%</p>
            <p><FontAwesomeIcon icon={faWind} className="info-icon" />
            Wind : {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;