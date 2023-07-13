import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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
      setError('Failed to fetch weather data. Enter valid location.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="weather-app">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter location"
        />
        <button onClick={handleSearch}>Search</button>

        {isLoading ? (
          <div className="loader" />
        ) : (
          error && <div className="error">{error}</div>
        )}

        {weatherData && (
          <div className="weather-data">
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;