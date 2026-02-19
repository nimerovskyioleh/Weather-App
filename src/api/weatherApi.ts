import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "en",
  },
});

export const fetchWeatherByCity = async (city: string) => {
  const response = await weatherApi.get("/weather", {
    params: { q: city },
  });
  return response.data;
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const response = await weatherApi.get("/weather", {
    params: { lat, lon },
  });
  return response.data;
};

export const fetchForecastByCity = async (city: string) => {
  const response = await weatherApi.get("/forecast", {
    params: { q: city },
  });
  return response.data;
};

export const fetchForecastByCoords = async (lat: number, lon: number) => {
  const response = await weatherApi.get("/forecast", {
    params: { lat, lon },
  });
  return response.data;
};
