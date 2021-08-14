import api from '../config/axiosConfig';

const subtaskApi = {
  createSubtask: (subtask) => api.post('/1/checklists/', subtask),

  updateSubtask: (taskId, data) => api.put(`/1/checklists/${taskId}`, data),

  deleteSubtask: (taskId) => api.delete(`/1/checklists/${taskId}`),
};

export default subtaskApi;
