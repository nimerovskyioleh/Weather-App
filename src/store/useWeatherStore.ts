import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import {
  fetchForecastByCoords,
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from "../api/weatherApi";

const STORAGE_KEY = "@last_weather_data";

interface WeatherState {
  weather: any | null;
  forecast: any[] | null;
  loading: boolean;
  error: string | null;
  getWeatherByCity: (city: string) => Promise<void>;
  getWeatherByLocation: (lat: number, lon: number) => Promise<void>;
  loadCachedWeather: () => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  loading: false,
  error: null,
  forecast: null,

  loadCachedWeather: async () => {
    try {
      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (cached) {
        set({ weather: JSON.parse(cached) });
      }
    } catch (e) {
      console.error("Error loading cached weather", e);
    }
  },

  getWeatherByCity: async (city) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWeatherByCity(city);
      set({ weather: data, loading: false });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      set({ error: "Error fetching weather by city", loading: false });
    }
  },

  getWeatherByLocation: async (lat, lon) => {
    set({ loading: true });
    try {
      const [weather, forecast] = await Promise.all([
        fetchWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
      ]);
      const dailyForecast = forecast.list.filter((item: any) =>
        item.dt_txt.includes("12:00:00"),
      );
      set({ weather, forecast: dailyForecast, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },
}));
