import { NextResponse } from "next/server";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids")?.split(",") || [];

  console.log("Crypto API Request:", {
    ids,
  });

  if (ids.length === 0) {
    return NextResponse.json(
      { error: "No cryptocurrency IDs provided" },
      { status: 400 }
    );
  }

  try {
    console.log(
      "Fetching crypto data from:",
      `${COINGECKO_API_URL}/coins/markets`
    );
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&ids=${ids.join(
        ","
      )}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Crypto API error:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      });
      throw new Error(
        `Failed to fetch crypto data: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    console.log("Crypto data fetched successfully:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Crypto API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cryptocurrency data" },
      { status: 500 }
    );
  }
}
