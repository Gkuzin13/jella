import api from '../config/axiosConfig';

export const createCard = async (card) => {
  try {
    const { data } = await api.post('/1/cards/', card);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = async (card) => {
  try {
    await api.put(`/1/cards/${card._id}/`, card);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCard = async (id) => {
  try {
    await api.delete(`/1/cards/${id}`);
  } catch (error) {
    console.log(error);
  }
};
