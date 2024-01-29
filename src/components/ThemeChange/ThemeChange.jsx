import React, { useEffect, useState } from 'react';
import axios from 'axios';



const ThemeChange = () => {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(`/weather?lat=${latitude}&lon=${longitude}`);
        const data = response.data;

        const currentTime = Math.floor(new Date().getTime() / 1000);
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        const isDaytime = currentTime > sunrise && currentTime < sunset;

        setIsDay(isDaytime);
        console.log('Current Time:', currentTime);
        console.log('Sunrise:', sunrise);
        console.log('Sunset:', sunset);
        console.log('API Response:', data);
        console.log('isDay in Theme Change:', isDay);

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
  }, [setIsDay]);

  return (
    <div>
     
      
    </div>
  );
};

export default ThemeChange;
