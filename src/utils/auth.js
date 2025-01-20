import { _checkResponse } from "./api"; // Ensure _checkResponse is reused

const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function signUp(name, avatar, email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(_checkResponse);
}

function signIn(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
}

function editProfile(name, avatar) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(_checkResponse);
}

function checkToken() {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(_checkResponse);
}

export { signUp, signIn, editProfile, checkToken };
