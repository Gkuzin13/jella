import api from '../config/axiosConfig';

const listApi = {
  createList: (listData) => api.post('/1/lists/', listData),

  updateList: (updatedList) =>
    api.put(`/1/lists/${updatedList._id}`, updatedList),

  deleteList: (id) => api.delete(`/1/lists/${id}`),
};

export default listApi;
