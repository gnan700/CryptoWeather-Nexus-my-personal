"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CloudIcon } from "@heroicons/react/24/outline";
import axios from "axios";

interface WeatherDetail {
  city: string;
  temperature: number;
  humidity: number;
  conditions: string;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
}

export default function WeatherDetailPage() {
  const params = useParams();
  const city = params.city as string;
  const [weather, setWeather] = useState<WeatherDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherDetail = async () => {
      try {
        const response = await axios.get(`/api/weather/${city}`);
        setWeather(response.data);
      } catch (err) {
        setError("Failed to fetch weather details");
        console.error("Weather detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherDetail();
  }, [city]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Error</h2>
        <p className="mt-2 text-gray-600">
          {error || "Weather data not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <CloudIcon className="h-8 w-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900">{weather.city}</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">
              {weather.temperature}°C
            </div>
            <div className="text-xl text-gray-600">{weather.conditions}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Humidity</div>
              <div className="text-xl font-semibold">{weather.humidity}%</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Wind Speed</div>
              <div className="text-xl font-semibold">
                {weather.windSpeed} m/s
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Pressure</div>
              <div className="text-xl font-semibold">
                {weather.pressure} hPa
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Feels Like</div>
              <div className="text-xl font-semibold">{weather.feelsLike}°C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
