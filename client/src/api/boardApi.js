import api from '../config/axiosConfig';

const boardApi = {
  getBoardData: (id) => api.get(`/b/${id}`),

  deleteBoard: (id) => api.delete(`/b/${id}`),
};

export default boardApi;
