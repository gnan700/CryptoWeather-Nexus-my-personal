"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchWeatherData } from "@/store/slices/weatherSlice";
import WeatherSection from "@/components/weather/WeatherSection";
import { Providers } from "@/store/provider";

const DEFAULT_CITIES = ["New York", "London", "Tokyo"];

function WeatherPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: weatherData, loading: weatherLoading } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeatherData(DEFAULT_CITIES));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Weather</h1>
      <WeatherSection data={weatherData} loading={weatherLoading} />
    </div>
  );
}

export default function WeatherPage() {
  return (
    <Providers>
      <WeatherPageContent />
    </Providers>
  );
}
