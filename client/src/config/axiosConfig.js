import axios from 'axios';

const api = axios.create({
  withCredentials: true,
});

export default api;
