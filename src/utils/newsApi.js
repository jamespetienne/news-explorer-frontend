import { _checkResponse } from "./api";

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = async (query) => {
  if (!query) {
    throw new Error("Search query is required");
  }

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7); // Get date 7 days ago

  const url = new URL(NEWS_API_URL);
  url.searchParams.append("q", query);
  url.searchParams.append("apiKey", API_KEY);
  url.searchParams.append("from", fromDate.toISOString().split("T")[0]);
  url.searchParams.append("to", new Date().toISOString().split("T")[0]);
  url.searchParams.append("pageSize", 100);

  return fetch(url.toString()).then(_checkResponse);
};

export const filterNewsData = (data) => {
  return data.articles.map((article) => ({
    source: article.source.name,
    title: article.title,
    publishedAt: article.publishedAt,
    description: article.description,
    imageUrl: article.urlToImage,
  }));
};
4