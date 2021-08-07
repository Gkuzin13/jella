import api from '../config/axiosConfig';

const listApi = {
  createList: async (listData) => {
    try {
      const { data } = await api.post('/1/lists/', listData);

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  updateList: async (updatedList) => {
    try {
      const { data } = await api.put(
        `/1/lists/${updatedList._id}`,
        updatedList
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteList: async (id) => {
    try {
      await api.delete(`/1/lists/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
};

export default listApi;
