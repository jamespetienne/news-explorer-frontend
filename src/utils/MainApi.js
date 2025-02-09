// const baseUrl = 'http://localhost:3001';

// class MainApi {
//   constructor({ baseUrl }) {
//     this._baseUrl = baseUrl;
//   }

//   _checkResponse(res) {
//     if (res.ok) {
//       return res.json();
//       }
//     return Promise.reject(`Error: ${res.status}`);
//   }

//   _request(url, options) {
//     return fetch(url, options).then(this._checkResponse);
//   }

//   getUser(token) {
//     return this._request(`${this._baseUrl}/users/me`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${token}`,
//       },

//     });
//   }

//   saveArticle({ keyword, title, text, date, source, link, image }, token) {
//     return this._request(`${this._baseUrl}/articles`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         keyword,
//         title,
//         text,
//         date,
//         source,
//         link,
//         image,
//       }),
//     });
//   }

//   getArticles(token) {
//     return this._request(`${this._baseUrl}/articles`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${token}`,
//       },
//     }).then((data) => {
//       if (!Array.isArray(data)) {
//         console.error("API Error: Expected an array but got", data);
//         return [];
//       }
//       return data.map(article => ({
//         ...article,
//         keyword: article.keyword || "No keyword",  // Ensure keyword is always present
//       }));
//     });
//   }
  

//   deleteArticle(articleId, token) {
//     return this._request(`${this._baseUrl}/articles/${articleId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${token}`,
//       },
//     });
//   }
// }

// export const api = new MainApi({ baseUrl });

const baseUrl = "http://localhost:3001"; // Backend API URL

class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this.articles = [
      {
        _id: "fake-article-1",
        keyword: "Technology",
        title: "The Rise of AI",
        text: "Artificial intelligence is transforming industries...",
        date: "2025-02-05",
        source: "Tech News",
        link: "https://example.com/article1",
        image: "/assets/image_04.svg",
      },
      {
        _id: "fake-article-2",
        keyword: "Health",
        title: "The Future of Medicine",
        text: "New advancements in medicine are saving lives...",
        date: "2025-02-06",
        source: "Medical Daily",
        link: "https://example.com/article2",
        image: "/assets/image_05.svg",
      },
    ];
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options)
      .then(this._checkResponse)
      .catch(() => {
        console.warn(`API Unreachable, switching to fake data: ${url}`);
        return null;
      });
  }

  async getUser(token) {
    const response = await this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    return response || { data: { name: "Fake User", email: "fake@example.com", _id: "fake-user-id" } };
  }

  async getArticles() {
    const response = await this._request(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return response || this.articles; // Fallback to fake articles
  }

  async saveArticle(article) {
    const response = await this._request(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });

    if (!response) {
      console.warn("Falling back to fake save.");
      const newArticle = { ...article, _id: `fake-${Math.random()}` };
      this.articles.push(newArticle);
      return newArticle;
    }

    return response;
  }

  async deleteArticle(articleId) {
    const response = await this._request(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response) {
      console.warn("Falling back to fake delete.");
      this.articles = this.articles.filter((article) => article._id !== articleId);
      return { message: "Fake article deleted" };
    }

    return response;
  }
}

export const api = new MainApi({ baseUrl });
