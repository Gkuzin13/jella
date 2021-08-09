import { useState } from 'react';
import { Types } from 'mongoose';
import { ACTIONS } from '../../hooks/reducers/reducers';
import SubTask from '../CardDetailsBox/SubTask';
import SubTaskForm from '../CardDetailsBox/SubTaskForm';
import ProgressBar from '../CardDetailsBox/ProgressBar';
import { appendItem, setNewPos } from '../../utils/setNewPos';
import subtaskApi from '../../api/subtaskApi';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const CheckList = ({ dispatchCards, selectedCard }) => {
  const [taskForm, setTaskForm] = useState(false);

  const subtasks =
    selectedCard.subtasks || [].sort((a, b) => a.position - b.position);

  const handleNewSubtask = async (e, setTaskValue) => {
    e.preventDefault();

    const newSubtask = {
      _id: Types.ObjectId().toHexString(),
      taskName: e.target.taskName.value,
      position: appendItem(subtasks),
      boardId: selectedCard.boardId,
      cardId: selectedCard._id,
      isDone: false,
    };

    dispatchCards({
      type: ACTIONS.CREATE_SUBTASK,
      payload: { id: selectedCard._id, newSubtask },
    });

    setTaskValue('');
    toggleTaskForm();

    subtaskApi.createSubtask(newSubtask);
  };

  const toggleCheckbox = (e, taskId) => {
    const isDone = e.target.checked;

    dispatchCards({
      type: ACTIONS.EDIT_SUBTASK,
      payload: { isDone, taskId, selectedCard },
    });

    const taskToEdit = subtasks.find((t) => t._id === taskId);
    const updatedSubtask = { ...taskToEdit, isDone };

    subtaskApi.updateSubtask(taskId, updatedSubtask);
  };

  const handleTaskDelete = (taskId) => {
    dispatchCards({
      type: ACTIONS.DELETE_SUBTASK,
      payload: { taskId, selectedCard },
    });

    subtaskApi.deleteSubtask(taskId);
  };

  const handleTaskReorder = (result) => {
    if (!result.destination) return;
    const { destination, source, draggableId } = result;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const subtasksCopy = [...selectedCard.subtasks];
    const draggedTask = subtasksCopy[source.index];

    subtasksCopy.splice(source.index, 1);
    subtasksCopy.splice(destination.index, 0, draggedTask);

    const updatedSubtask = {
      ...draggedTask,
      position: setNewPos(subtasksCopy, destination),
    };
    subtasksCopy.splice(destination.index, 1, updatedSubtask);

    dispatchCards({
      type: ACTIONS.REORDER_SUBTASK,
      payload: { cardId: selectedCard._id, subtasksCopy },
    });

    subtaskApi.updateSubtask(draggableId, updatedSubtask);
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

      <DragDropContext onDragEnd={handleTaskReorder}>
        <Droppable droppableId={selectedCard._id} type='SUBTASK'>
          {(provided) => (
            <div
              className='w-full my-1'
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {subtasks.map((subtask, index) => {
                return (
                  <SubTask
                    key={subtask._id}
                    index={index}
                    toggleCheckbox={toggleCheckbox}
                    handleTaskDelete={handleTaskDelete}
                    subtask={subtask}
                    cardId={selectedCard._id}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <SubTaskForm
        taskForm={taskForm}
        toggleTaskForm={toggleTaskForm}
        handleNewSubtask={handleNewSubtask}
      />
    </div>
  );
};

export default CheckList;
