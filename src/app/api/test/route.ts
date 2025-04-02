import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    openweatherApiKey: process.env.OPENWEATHER_API_KEY ? "Present" : "Missing",
    newsdataApiKey: process.env.NEWSDATA_API_KEY ? "Present" : "Missing",
  });
}
