import api from '../config/axiosConfig';

const cardApi = {
  createCard: (card) => api.post('/1/cards/', card),

  updateCard: (card) => api.put(`/1/cards/${card._id}/`, card),

  deleteCard: (id) => api.delete(`/1/cards/${id}`),
};

export default cardApi;
