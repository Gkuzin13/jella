import axios from 'axios';

const api = axios.create({
  baseURL: "https://jella.onrender.com/api",
  withCredentials: true,
  credentials: "include",
});

export default api;
