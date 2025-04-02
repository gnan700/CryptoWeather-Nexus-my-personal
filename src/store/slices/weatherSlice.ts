import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  conditions: string;
}

interface WeatherState {
  data: WeatherData[];
  loading: boolean;
  error: string | null;
  favorites: string[];
}

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: null,
  favorites: [],
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (cities: string[]) => {
    const response = await axios.get(`/api/weather?cities=${cities.join(",")}`);
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const city = action.payload;
      if (state.favorites.includes(city)) {
        state.favorites = state.favorites.filter((c) => c !== city);
      } else {
        state.favorites.push(city);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch weather data";
      });
  },
});

export const { toggleFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;
