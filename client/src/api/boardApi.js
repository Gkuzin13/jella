import api from '../config/axiosConfig';

const boardApi = {
  getBoardData: async (id) => {
    try {
      const { data } = await api.get(`/b/${id}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteBoard: async (id) => {
    try {
      const { status } = await api.delete(`/b/${id}`);

      return status;
    } catch (error) {
      console.log(error);
    }
  },
};

export default boardApi;
