const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.newsexplorer.csproject.org"
    : "http://localhost:3001";

class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
}
//   register({ name, email, password }) {
//     return this._request(`${this._baseUrl}/signup`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, email, password }),
//     });
//   }

//   login({ email, password }) {
//     return this._request(`${this._baseUrl}/signin`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });
//   }
// }

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .catch(() => {
      console.warn("API Unreachable, switching to fake login.");
      return { token: "fake-jwt-token" };
    });
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .catch(() => {
      console.warn("API Unreachable, switching to fake user.");
      return {
        data: {
          name: "Fake User",
          email: "fake@example.com",
          _id: "fake-user-id",
        },
      };
    });
};

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .catch(() => {
      console.warn("API Unreachable, switching to fake registration.");
      return { message: "Registration successful (fake)" };
    });
};

export const auth = new Auth({ baseUrl });
