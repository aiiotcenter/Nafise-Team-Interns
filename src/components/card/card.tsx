import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./card.module.css";

interface WeatherData {
  city: string;
  temperature: number;
  weatherDescription: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface CardProps {
  city: string;
}

const Card: React.FC<CardProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setWeatherData(null);
      setLoading(true);
      setError(null);

      try {
        let response;
        if (city.toLowerCase() === "live") {
          if (!navigator.geolocation) {
            throw new Error("Geolocation is not supported by your browser.");
          }
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }
          );
          const { latitude, longitude } = position.coords;
          response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5691e45d24f71f52bd9f8fb0f5852e1f&units=metric`
          );
        } else {
          response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5691e45d24f71f52bd9f8fb0f5852e1f&units=metric`
          );
        }

        if (!response.ok) {
          throw new Error("City not found or API error.");
        }

        const data = await response.json();
        if (!data || !data.weather || !data.main) {
          throw new Error("Invalid weather data received.");
        }

        setWeatherData({
          city: data.name,
          temperature: data.main.temp,
          weatherDescription: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon,
        });
      } catch (error) {
        setError("Failed to fetch weather data. Please try again.");
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  const getColorBasedOnTemperature = (temperature: number): string => {
    if (temperature > 30) return "#FF6F61"; // Hot
    if (temperature > 20) return "#FFD700"; // Warm
    if (temperature > 10) return "#87CEEB"; // Cool
    return "#A9A9A9"; // Cold
  };

  const iconUrl = weatherData
    ? `http://openweathermap.org/img/wn/${weatherData.icon}.png`
    : "";

  if (loading) {
    return <div className={styles.card}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.card}>{error}</div>;
  }

  if (!weatherData) {
    return <div className={styles.card}>No data available.</div>;
  }

  const cardColor = getColorBasedOnTemperature(weatherData.temperature);

  return (
    <div className={styles.card} style={{ backgroundColor: cardColor }}>
      <div className={styles.cardContent}>
        <h2>{weatherData.city}</h2>
        <div className={styles.weatherIconWrapper}>
          <Image
            src={iconUrl}
            alt={weatherData.weatherDescription}
            width={100}
            height={100}
          />
        </div>
        <p className={styles.temperature}>{weatherData.temperature}°C</p>
        <p className={styles.description}>{weatherData.weatherDescription}</p>
        <div className={styles.details}>
          <p>💧 Humidity: {weatherData.humidity}%</p>
          <p>🌬️ Wind: {weatherData.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
