import { NextResponse } from "next/server";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    // Fetch current data
    const currentResponse = await fetch(
      `${COINGECKO_API_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
    );

    if (!currentResponse.ok) {
      throw new Error("Failed to fetch crypto data");
    }

    const currentData = await currentResponse.json();

    // Fetch historical data for the last 24 hours
    const historicalResponse = await fetch(
      `${COINGECKO_API_URL}/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`
    );

    if (!historicalResponse.ok) {
      throw new Error("Failed to fetch historical data");
    }

    const historicalData = await historicalResponse.json();

    // Transform the data
    const priceHistory = historicalData.prices.map(
      ([timestamp, price]: [number, number]) => ({
        timestamp: new Date(timestamp).toISOString(),
        price,
      })
    );

    return NextResponse.json({
      id: currentData.id,
      name: currentData.name,
      symbol: currentData.symbol.toUpperCase(),
      current_price: currentData.market_data.current_price.usd,
      price_change_percentage_24h:
        currentData.market_data.price_change_percentage_24h,
      market_cap: currentData.market_data.market_cap.usd,
      total_volume: currentData.market_data.total_volume.usd,
      circulating_supply: currentData.market_data.circulating_supply,
      max_supply: currentData.market_data.max_supply,
      price_history: priceHistory,
    });
  } catch (error) {
    console.error("Crypto API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cryptocurrency data" },
      { status: 500 }
    );
  }
}
