import api from '../config/axiosConfig';

const cardApi = {
  createCard: async (card) => {
    try {
      const { data } = await api.post('/1/cards/', card);

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  updateCard: async (card) => {
    try {
      const { data } = await api.put(`/1/cards/${card._id}/`, card);

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteCard: async (id) => {
    try {
      await api.delete(`/1/cards/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
};

export default cardApi;
