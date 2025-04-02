"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CryptoDetail {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  max_supply: number;
  price_history: {
    timestamp: string;
    price: number;
  }[];
}

export default function CryptoDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [crypto, setCrypto] = useState<CryptoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoDetail = async () => {
      try {
        const response = await axios.get(`/api/crypto/${id}`);
        setCrypto(response.data);
      } catch (err) {
        setError("Failed to fetch cryptocurrency details");
        console.error("Crypto detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoDetail();
  }, [id]);

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

  if (error || !crypto) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Error</h2>
        <p className="mt-2 text-gray-600">
          {error || "Cryptocurrency data not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
        <h1 className="text-3xl font-bold text-gray-900">{crypto.name}</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">
              ${crypto.current_price.toLocaleString()}
            </div>
            <div
              className={`text-xl ${
                crypto.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {crypto.price_change_percentage_24h.toFixed(2)}% (24h)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Market Cap</div>
              <div className="text-xl font-semibold">
                ${(crypto.market_cap / 1e9).toFixed(2)}B
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">24h Volume</div>
              <div className="text-xl font-semibold">
                ${(crypto.total_volume / 1e9).toFixed(2)}B
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Circulating Supply</div>
              <div className="text-xl font-semibold">
                {crypto.circulating_supply.toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Max Supply</div>
              <div className="text-xl font-semibold">
                {crypto.max_supply?.toLocaleString() || "∞"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Price History</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={crypto.price_history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                domain={["auto", "auto"]}
              />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Price",
                ]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
