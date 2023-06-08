import ObjectId from 'bson-objectid';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import cardApi from '../../api/cardApi';
import ACTIONS from '../../reducers/actions';
import { getAppendedItemPos } from '../../utils/itemPos';
import ProgressBar from './ProgressBar';
import Subtask from './Subtask';
import SubtaskForm from './SubtaskForm';
import { reorderItems } from '../../utils/reorder';

const Checklist = ({ dispatchCards, selectedCard }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const subtasks = (selectedCard.subtasks || []).sort(
    (a, b) => a.position - b.position
  );

  const handleNewSubtask = async (taskValue) => {
    const newSubtask = {
      _id: ObjectId().toHexString(),
      taskName: taskValue,
      position: getAppendedItemPos(subtasks),
      boardId: selectedCard.boardId,
      cardId: selectedCard._id,
      isDone: false,
    };

    dispatchCards({
      type: ACTIONS.CREATE_SUBTASK,
      payload: { id: selectedCard._id, newSubtask },
    });

    try {
      await cardApi.createSubtask(selectedCard._id, newSubtask);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubtaskUpdate = async (subtask) => {
    const updatedSubtask = { ...subtask, isDone: !subtask.isDone };

    dispatchCards({
      type: ACTIONS.EDIT_SUBTASK,
      payload: { updatedSubtask, selectedCard },
    });

    try {
      await cardApi.updateSubtask(selectedCard._id, updatedSubtask);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubtaskDelete = async (subtaskId) => {
    dispatchCards({
      type: ACTIONS.DELETE_SUBTASK,
      payload: { subtaskId, selectedCard },
    });

    try {
      await cardApi.deleteSubtask(selectedCard._id, subtaskId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubTaskReorder = async (result) => {
    if (!result.destination) return;

    const { destination, source, draggableId } = result;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedSubtasks = reorderItems(
      subtasks,
      destination,
      source,
      draggableId
    );

    dispatchCards({
      type: ACTIONS.REORDER_SUBTASK,
      payload: { cardId: selectedCard._id, subtasks: updatedSubtasks },
    });

    const updatedSubtask = updatedSubtasks.find(
      (subtask) => subtask._id === draggableId
    );

    try {
      updatedSubtask &&
        (await cardApi.updateSubtask(selectedCard._id, updatedSubtask));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col items-start mb-6'>
      <div className='flex items-center text-gray-800 mb-4'>
        <span className='material-icons-outlined mr-2.5'>event_available</span>
        <span className='font-semibold text-xl'>Checklist</span>
      </div>

      <ProgressBar subtasks={subtasks} cardId={selectedCard._id} />

      <DragDropContext onDragEnd={handleSubTaskReorder}>
        {enabled && (
          <Droppable droppableId={selectedCard._id}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${
                  !subtasks.length && 'hidden'
                } w-full my-1 mb-3 rounded-md`}
              >
                {subtasks.map((subtask, index) => {
                  return (
                    <Subtask
                      key={subtask._id}
                      index={index}
                      draggingWith={snapshot.draggingFromThisWith}
                      handleSubtaskUpdate={handleSubtaskUpdate}
                      handleSubtaskDelete={handleSubtaskDelete}
                      subtask={subtask}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>

      <SubtaskForm handleNewSubtask={handleNewSubtask} />
    </div>
  );
};

export default Checklist;
