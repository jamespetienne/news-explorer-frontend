import { _checkResponse } from "./api"; // Ensure consistent response handling

const API_URL = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

// User sign-up
function signUp(name, email, password) {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, email, password }),
  }).then(_checkResponse);
}

// User sign-in
function signIn(email, password) {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
    .then(_checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return { token: data.token, user: data.user };
      }
      return Promise.reject(new Error("Invalid credentials"));
    });
}

// Validate token (check user session)
function checkToken() {
  const token = localStorage.getItem("jwt");
  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(_checkResponse);
}

// User sign-out
function signOut() {
  localStorage.removeItem("jwt");
}

// ✅ Ensure correct exports
export { signUp, signIn, checkToken, signOut };