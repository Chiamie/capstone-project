


import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:8080/auth", // Adjusted to match your backend
});


export const cropApi = axios.create({
  baseURL: "http://localhost:8080/admin/farming", 
});

cropApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    return config;
  }, (error) => {
    return Promise.reject(error);
});

const api = axios.create({
  baseURL: "http://localhost:8080/admin/estate",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;