import api from '../config/axiosConfig';

const subtaskApi = {
  createSubtask: async (subtask) => {
    try {
      await api.post('/1/checklists/', subtask);
    } catch (error) {
      console.log(error);
    }
  },

  updateSubtask: async (taskId, data) => {
    try {
      await api.put(`/1/checklists/${taskId}`, data);
    } catch (error) {
      console.log(error);
    }
  },

  deleteSubtask: async (taskId) => {
    try {
      await api.delete(`/1/checklists/${taskId}`);
    } catch (error) {
      console.log(error);
    }
  },
};

export default subtaskApi;
