import { useEffect, useState } from 'react';
import { Types } from 'mongoose';
import { ACTIONS } from '../../hooks/reducers/reducers';
import SubTask from '../CardDetailsBox/SubTask';
import SubTaskForm from '../CardDetailsBox/SubTaskForm';
import ProgressBar from '../CardDetailsBox/ProgressBar';
import { appendItem } from '../../utils/setNewPos';
import {
  createSubtask,
  deleteSubtask,
  updatedChecked,
} from '../../api/subtaskController';

const CheckList = ({ dispatchCards, selectedCard }) => {
  const [taskForm, setTaskForm] = useState(false);
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    setSubtasks(selectedCard.subtasks);
  }, [selectedCard.subtasks]);

  const handleNewSubtask = async (e, setTaskValue) => {
    e.preventDefault();

    const newSubtask = {
      _id: Types.ObjectId().toHexString(),
      taskName: e.target.taskName.value,
      position: appendItem(selectedCard.subtasks),
      boardId: selectedCard.boardId,
      cardId: selectedCard._id,
      isDone: false,
    };

    console.log(newSubtask);

    dispatchCards({
      type: ACTIONS.CREATE_SUBTASK,
      data: { id: selectedCard._id, newSubtask },
    });

    setTaskValue('');
    toggleTaskForm();

    setSubtasks(subtasks.concat(newSubtask));

    createSubtask(newSubtask);
  };

  const toggleCheckbox = (e, taskId) => {
    const isDone = e.target.checked;

    dispatchCards({
      type: ACTIONS.EDIT_SUBTASK,
      data: { isDone, taskId, cardId: selectedCard._id },
    });

    updatedChecked(taskId, isDone);
  };

  const handleTaskDelete = (taskId) => {
    dispatchCards({
      type: ACTIONS.DELETE_SUBTASK,
      data: { taskId },
    });

    deleteSubtask(taskId);
  };

  const toggleTaskForm = () => {
    setTaskForm(!taskForm);
  };

  console.log(subtasks);

  return (
    <div className='flex flex-col items-start my-5'>
      <div className='flex items-center text-gray-800'>
        <span className='material-icons mr-2.5'>event_available</span>
        <span className='font-semibold text-xl'>Checklist</span>
      </div>

      <ProgressBar subtasks={selectedCard.subtasks} cardId={selectedCard._id} />

      {subtasks.map((subtask) => {
        return (
          <SubTask
            key={subtask._id}
            toggleCheckbox={toggleCheckbox}
            handleTaskDelete={handleTaskDelete}
            subtask={subtask}
            cardId={selectedCard._id}
          />
        );
      })}

      <SubTaskForm
        taskForm={taskForm}
        toggleTaskForm={toggleTaskForm}
        handleNewSubtask={handleNewSubtask}
      />
    </div>
  );
};

export default CheckList;
