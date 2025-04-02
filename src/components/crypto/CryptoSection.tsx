import { CurrencyDollarIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleFavorite } from "@/store/slices/cryptoSlice";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface CryptoSectionProps {
  data: CryptoData[];
  loading: boolean;
}

export default function CryptoSection({ data, loading }: CryptoSectionProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.crypto.favorites);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Cryptocurrency</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Cryptocurrency</h2>
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  ${item.current_price.toLocaleString()} •{" "}
                  <span
                    className={
                      item.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  MCap: ${(item.market_cap / 1e9).toFixed(2)}B
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleFavorite(item.id))}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              {favorites.includes(item.id) ? (
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
