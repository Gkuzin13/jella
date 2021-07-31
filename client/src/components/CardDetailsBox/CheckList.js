import { useState } from 'react';
import { Types } from 'mongoose';
import { ACTIONS } from '../../hooks/reducers/reducers';
import SubTask from '../CardDetailsBox/SubTask';
import SubTaskForm from '../CardDetailsBox/SubTaskForm';
import ProgressBar from '../CardDetailsBox/ProgressBar';
import { appendItem } from '../../utils/reorderer';
import {
  createSubtask,
  deleteSubtask,
  updatedChecked,
} from '../../api/subtaskController';

const CheckList = ({ dispatch, selectedCard, subtasks }) => {
  const [taskForm, setTaskForm] = useState(false);

  const handleNewSubtask = async (e, setTaskValue) => {
    e.preventDefault();

    const newSubtask = {
      _id: Types.ObjectId().toHexString(),
      taskName: e.target.taskName.value,
      position: appendItem(subtasks),
      boardId: selectedCard.boardId,
      cardId: selectedCard._id,
    };

    dispatch({
      type: ACTIONS.CREATE_SUBTASK,
      data: newSubtask,
    });

    setTaskValue('');
    toggleTaskForm();

    createSubtask(newSubtask);
  };

  const toggleCheckbox = (e, taskId) => {
    const isDone = e.target.checked;

    dispatch({
      type: ACTIONS.EDIT_SUBTASK,
      data: { isDone, taskId },
    });

    updatedChecked(taskId, isDone);
  };

  const handleTaskDelete = (taskId) => {
    dispatch({
      type: ACTIONS.DELETE_SUBTASK,
      data: { taskId },
    });

    deleteSubtask(taskId);
  };

  const toggleTaskForm = () => {
    setTaskForm(!taskForm);
  };

  return (
    <div className='flex flex-col items-start my-5'>
      <div className='flex items-center text-gray-800'>
        <span className='material-icons mr-2.5'>event_available</span>
        <span className='font-semibold text-xl'>Checklist</span>
      </div>

      <ProgressBar subtasks={subtasks} cardId={selectedCard._id} />

      <SubTask
        toggleCheckbox={toggleCheckbox}
        handleTaskDelete={handleTaskDelete}
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
