import api from '../config/axiosConfig';

export const getBoardData = async (id) => {
  try {
    const { data } = await api.get(`/b/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};
