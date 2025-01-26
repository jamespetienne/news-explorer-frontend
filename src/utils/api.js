// Helper function to check response
const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Determine the API base URL
const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

// Retrieve API key from environment variables
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

if (!apiKey) {
  throw new Error("API Key is missing. Ensure VITE_NEWS_API_KEY is set in the .env file.");
}

// Fetch news articles based on query
export const fetchNewsArticles = async (query) => {
  if (!query) {
    throw new Error("Please enter a keyword");
  }

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7); // 7 days ago

  const url = new URL(newsApiBaseUrl);
  url.searchParams.append("q", query);
  url.searchParams.append("apiKey", apiKey);
  url.searchParams.append("from", fromDate.toISOString().split("T")[0]);
  url.searchParams.append("to", new Date().toISOString().split("T")[0]);
  url.searchParams.append("pageSize", 100);

  const response = await fetch(url.toString());
  return _checkResponse(response);
};

// Simulated authorization for testing purposes
export const authorize = (email, password) => {
  return new Promise((resolve) => {
    resolve({ token: "a_fake_token" });
  });
};

// Simulate checking a token
export const checkToken = (token) => {
  return new Promise((resolve) => {
    resolve({
      data: { name: "fake user", email: "fake@example.com", id: "fake-id" },
    });
  });
};

// Simulate fetching saved articles
export function getItems() {
  return new Promise((resolve) =>
    resolve([
      {
        id: "65f7368dfb74bd6a92114c85",
        title: "Some news article",
        url: "https://example.com/article1",
        description: "Article description 1",
        imageUrl: "https://via.placeholder.com/150",
        publishedAt: "2023-01-01",
        source: { name: "Source 1" },
      },
      {
        id: "65f7371e7bce9e7d331b11a0",
        title: "Another news article",
        url: "https://example.com/article2",
        description: "Article description 2",
        imageUrl: "https://via.placeholder.com/150",
        publishedAt: "2023-01-02",
        source: { name: "Source 2" },
      },
    ])
  );
}

// Simulate saving an article
export function saveArticle(article) {
  return new Promise((resolve) =>
    resolve({
      id: "65f7371e7bce9e7d331b11a0",
      url: article.url,
      title: article.title,
      imageUrl: article.imageUrl,
      description: article.description,
      publishedAt: article.publishedAt,
      source: article.source,
    })
  );
}

// Sign-in function
export const signIn = async (email, password) => {
  try {
    const response = await fetch("https://example.com/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return _checkResponse(response);
  } catch (err) {
    console.error("Sign-in failed:", err);
    throw err;
  }
};

export const signUp = async (name, avatar, email, password) => {
  try {
    const response = await fetch("https://example.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, avatar, email, password }),
    });
    return _checkResponse(response);
  } catch (err) {
    console.error("Sign-up failed:", err);
    throw err;
  }
};


export { _checkResponse };
