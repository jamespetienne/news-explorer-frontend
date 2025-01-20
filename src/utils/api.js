// const newsApiBaseUrl =
//   import.meta.env.MODE === "production"
//     ? "https://nomoreparties.co/news/v2/everything"
//     : "https://newsapi.org/v2/everything";

// const apiKey = import.meta.env.VITE_NEWS_API_KEY;

// if (!apiKey) {
//   throw new Error("API Key is missing. Ensure VITE_NEWS_API_KEY is set in the .env file.");
// }

// export const fetchNewsArticles = async (query) => {
//   if (!query) {
//     throw new Error("Please enter a keyword");
//   }

//   const fromDate = new Date();
//   fromDate.setDate(fromDate.getDate() - 7); // 7 days ago

//   const url = new URL(newsApiBaseUrl);
//   url.searchParams.append("q", query);
//   url.searchParams.append("apiKey", apiKey);
//   url.searchParams.append("from", fromDate.toISOString().split("T")[0]);
//   url.searchParams.append("to", new Date().toISOString().split("T")[0]);
//   url.searchParams.append("pageSize", 100);

//   const response = await fetch(url.toString());

//   if (!response.ok) {
//     throw new Error("Failed to fetch news articles");
//   }

//   return await response.json();
// };

const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

if (!apiKey) {
  throw new Error("API Key is missing. Ensure VITE_NEWS_API_KEY is set in the .env file.");
}

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

  if (!response.ok) {
    throw new Error("Failed to fetch news articles");
  }

  return await response.json();
};

// Simulated functions
export const authorize = (email, password) => {
  return new Promise((resolve) => {
    resolve({ token: "a_fake_token" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve) => {
    resolve({
      data: { name: "fake user", email: "fake@example.com", id: "fake-id" },
    });
  });
};

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