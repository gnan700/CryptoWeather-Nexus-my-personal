"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchWeatherData } from "@/store/slices/weatherSlice";
import { fetchCryptoData } from "@/store/slices/cryptoSlice";
import { fetchNewsData } from "@/store/slices/newsSlice";
import WeatherSection from "@/components/weather/WeatherSection";
import CryptoSection from "@/components/crypto/CryptoSection";
import NewsSection from "@/components/news/NewsSection";

const DEFAULT_CITIES = ["New York", "London", "Tokyo"];
const DEFAULT_CRYPTOS = ["bitcoin", "ethereum", "cardano"];

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: weatherData, loading: weatherLoading } = useSelector(
    (state: RootState) => state.weather
  );
  const { data: cryptoData, loading: cryptoLoading } = useSelector(
    (state: RootState) => state.crypto
  );
  const { data: newsData, loading: newsLoading } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchWeatherData(DEFAULT_CITIES));
    dispatch(fetchCryptoData(DEFAULT_CRYPTOS));
    dispatch(fetchNewsData());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherSection data={weatherData} loading={weatherLoading} />
        <CryptoSection data={cryptoData} loading={cryptoLoading} />
        <NewsSection data={newsData} loading={newsLoading} />
      </div>
    </div>
  );
}
