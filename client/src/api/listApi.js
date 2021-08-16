import api from '../config/axiosConfig';

const listApi = {
  create: (listData) => api.post('/1/lists/', listData),

  update: (updatedList) => api.put(`/1/lists/${updatedList._id}`, updatedList),

  delete: (id) => api.delete(`/1/lists/${id}`),
};

export default listApi;
