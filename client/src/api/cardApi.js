import api from '../config/axiosConfig';

const cardApi = {
  create: (card) => api.post('/1/cards/', card),

  update: (card) => api.put(`/1/cards/${card._id}/`, card),

  delete: (id) => api.delete(`/1/cards/${id}`),

  // Card checklist api routes

  createSubtask: (cardId, subtask) =>
    api.post(`/1/cards/${cardId}/checklist`, subtask),

  updateSubtask: (cardId, subtask) =>
    api.put(`/1/cards/${cardId}/checklist/${subtask._id}`, subtask),

  deleteSubtask: (cardId, subtaskId) =>
    api.delete(`/1/cards/${cardId}/checklist/${subtaskId}`),
};

export default cardApi;
