import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import ThemeChange from './components/ThemeChange/ThemeChange'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const dispatch = useDispatch();
  const [isDay, setIsDay] = useState(true);
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(`https://stack-overflow-backend-qf3u.onrender.com/weather?lat=${latitude}&lon=${longitude}`);
        const data = response.data;

        const currentTime = Math.floor(new Date().getTime() / 1000);
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        const isDaytime = currentTime > sunrise && currentTime < sunset;

        setIsDay(prevIsDay => isDaytime);
        console.log('Current Time:', currentTime);
        console.log('Sunrise:', sunrise);
        console.log('Sunset:', sunset);
        console.log('API Response:', data);
        console.log('isDay in App:', isDay);

      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    const handleGeolocationSuccess = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetchWeather(latitude, longitude);
    };

    const handleGeolocationError = (error) => {
      console.error('Geolocation error:', error);
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationError);
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }, );

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (

    <div className={`App ${isDay ? 'day' : 'night'}`}>
      <Router>
        <ThemeChange />
        <Navbar slideIn={slideIn} handleSlideIn={handleSlideIn} isDay={isDay}/>
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} isDay={isDay} />
      </Router>

    </div>

  );
}

export default App;
