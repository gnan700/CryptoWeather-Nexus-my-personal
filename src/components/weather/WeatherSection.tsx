import { CloudIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleFavorite } from "@/store/slices/weatherSlice";

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  conditions: string;
}

interface WeatherSectionProps {
  data: WeatherData[];
  loading: boolean;
}

export default function WeatherSection({ data, loading }: WeatherSectionProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.weather.favorites);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Weather</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Weather</h2>
        <div className="text-center py-8 text-gray-500">
          No weather data available. Please check your API configuration.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Weather</h2>
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.city}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <CloudIcon className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-medium">{item.city}</h3>
                <p className="text-sm text-gray-500">
                  {item.temperature}°C • {item.humidity}% humidity
                </p>
                <p className="text-sm text-gray-600">{item.conditions}</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleFavorite(item.city))}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              {favorites.includes(item.city) ? (
                <StarIconSolid className="h-5 w-5 text-yellow-400" />
              ) : (
                <StarIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
