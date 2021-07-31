import api from '../config/axiosConfig';

export const createSubtask = async (subtask) => {
  try {
    await api.post('/1/checklists/', subtask);
  } catch (error) {
    console.log(error);
  }
};

export const updatedChecked = async (taskId, isDone) => {
  try {
    await api.patch(`/1/checklists/${taskId}`, { isDone });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubtask = async (taskId) => {
  try {
    await api.delete(`/1/checklists/${taskId}`);
  } catch (error) {
    console.log(error);
  }
};
