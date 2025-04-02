import { NextResponse } from "next/server";

const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;
const NEWSDATA_API_URL = "https://newsdata.io/api/1";

export async function GET() {
  console.log("News API Request:", {
    apiKey: NEWSDATA_API_KEY ? "Present" : "Missing",
  });

  if (!NEWSDATA_API_KEY) {
    console.error("NewsData API key is missing");
    return NextResponse.json(
      { error: "NewsData API key not configured" },
      { status: 500 }
    );
  }

  try {
    console.log("Fetching crypto news...");
    const url = `${NEWSDATA_API_URL}/news?apikey=${NEWSDATA_API_KEY}&q=cryptocurrency&language=en&size=5`;
    console.log("Fetching from:", url);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("News API error:", data);
      throw new Error(
        `Failed to fetch news: ${data.message || response.statusText}`
      );
    }

    if (!data.results || !Array.isArray(data.results)) {
      console.error("Invalid news data format:", data);
      throw new Error("Invalid news data format received");
    }

    // Transform the data to match our interface
    const transformedNews = data.results.map((item: any) => ({
      id: item.article_id || item.link,
      title: item.title,
      description: item.description || "",
      url: item.link,
      publishedAt: item.pubDate,
      source: item.source_id,
    }));

    console.log("News data fetched successfully:", transformedNews);
    return NextResponse.json(transformedNews);
  } catch (error) {
    console.error("News API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch news data",
      },
      { status: 500 }
    );
  }
}
