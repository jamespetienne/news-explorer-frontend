const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Sign Up Functionality
export const signUp = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(_checkResponse);
};

// Sign In Functionality
export const signIn = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  })
    .then(_checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
      return Promise.reject("Token not received");
    });
};

// Check Token Functionality
export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
};

// Edit Profile Functionality
export const editProfile = (name, avatar) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(_checkResponse);
};

