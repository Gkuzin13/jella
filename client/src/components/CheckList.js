import SubTaskForm from './SubTaskForm';
import { ACTIONS } from '../reducers/reducers';
import api from '../config/axiosConfig';
import { useState } from 'react';
import SubTask from './SubTask';
import ProgressBar from './ProgressBar';

const CheckList = ({ dispatch, selectedCard, subtasks }) => {
  const [taskForm, setTaskForm] = useState(false);

  const handleNewSubtask = async (e, setTaskValue) => {
    e.preventDefault();

    const newSubtask = {
      taskName: e.target.taskName.value,
      boardId: selectedCard.boardId,
      cardId: selectedCard._id,
    };

    try {
      const { data } = await api.post('/1/checklists/', newSubtask);

      dispatch({
        type: ACTIONS.CREATE_SUBTASK,
        data: data,
      });

      setTaskValue('');
      toggleTaskForm();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCheckbox = async (e, taskId) => {
    const isDone = e.target.checked;

    try {
      dispatch({
        type: ACTIONS.EDIT_SUBTASK,
        data: { isDone, taskId },
      });
      await api.patch(`/1/checklists/${taskId}`, { isDone });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubtask = async (taskId) => {
    try {
      dispatch({
        type: ACTIONS.DELETE_SUBTASK,
        data: { taskId },
      });

      await api.delete(`/1/checklists/${taskId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTaskForm = () => {
    setTaskForm(!taskForm);
  };

  return (
    <div className='flex flex-col items-start my-3'>
      <div className='flex items-center text-gray-800'>
        <span className='material-icons mr-3'>check_box</span>
        <span className='font-semibold text-xl'>Checklist</span>
      </div>

      <ProgressBar subtasks={subtasks} />

      <SubTask
        toggleCheckbox={toggleCheckbox}
        deleteSubtask={deleteSubtask}
        subtasks={subtasks}
        cardId={selectedCard._id}
      />

      <SubTaskForm
        taskForm={taskForm}
        toggleTaskForm={toggleTaskForm}
        handleNewSubtask={handleNewSubtask}
      />
    </div>
  );
};

export default CheckList;
