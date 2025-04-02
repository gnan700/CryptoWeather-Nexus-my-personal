import { NextResponse } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cities = searchParams.get("cities")?.split(",") || [];

  console.log("Weather API Request:", {
    apiKey: OPENWEATHER_API_KEY ? "Present" : "Missing",
    apiKeyValue: OPENWEATHER_API_KEY
      ? `${OPENWEATHER_API_KEY.substring(0, 4)}...`
      : "Missing",
    cities,
  });

  if (!OPENWEATHER_API_KEY) {
    console.error("OpenWeather API key is missing");
    return NextResponse.json(
      { error: "OpenWeather API key not configured" },
      { status: 500 }
    );
  }

  if (cities.length === 0) {
    return NextResponse.json({ error: "No cities provided" }, { status: 400 });
  }

  try {
    console.log("Fetching weather for cities:", cities);
    const weatherPromises = cities.map(async (city) => {
      const url = `${BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      console.log(`Fetching weather for ${city} from:`, url);

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        console.error(`Weather API error for ${city}:`, {
          status: response.status,
          statusText: response.statusText,
          data: data,
        });
        throw new Error(
          `Failed to fetch weather for ${city}: ${
            data.message || response.statusText
          }`
        );
      }

      return {
        city: data.name,
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        conditions: data.weather[0].description,
      };
    });

    const results = await Promise.all(weatherPromises);
    console.log("Weather data fetched successfully:", results);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch weather data",
      },
      { status: 500 }
    );
  }
}
