import { getNews, filterNewsData } from "./newsApi";

const API_URL = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function _getHeaders(token) {
  return {
    ...headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Fetch news articles
export const fetchNewsArticles = async (query) => {
  try {
    const response = await fetch("http://localhost:3001/articles"); // Fetch all articles
    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      console.error("API response does not contain articles:", data);
      throw new Error("Invalid response from API");
    }

    // ✅ Filter articles based on query (case-insensitive search)
    const filteredArticles = data.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );

    console.log("Filtered Articles:", filteredArticles);
    return filteredArticles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error("Failed to fetch news articles. Please try again later.");
  }
};


// Fetch saved articles
export function getSavedArticles() {
  const token = localStorage.getItem("jwt");
  return fetch(`${API_URL}/articles`, {
    method: "GET",
    headers: _getHeaders(token),
  }).then(_checkResponse);
}

// Save an article
export function saveArticle(article) {
  const token = localStorage.getItem("jwt");
  return fetch(`${API_URL}/articles`, {
    method: "POST",
    headers: _getHeaders(token),
    body: JSON.stringify(article),
  }).then(_checkResponse);
}

// Delete a saved article
export function deleteArticle(id) {
  const token = localStorage.getItem("jwt");
  return fetch(`${API_URL}/articles/${id}`, {
    method: "DELETE",
    headers: _getHeaders(token),
  }).then(_checkResponse);
}

// Token Validation
function checkToken() {
  const token = localStorage.getItem("jwt");
  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: _getHeaders(token),
  }).then(_checkResponse);
}

// ✅ Ensure correct exports
export { _checkResponse, checkToken };


