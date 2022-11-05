import axios from 'axios';

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  credentials: "include",
});

export default api;
