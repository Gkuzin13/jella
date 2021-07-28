import List from './List';
import ListForm from './ListForm';
import { Droppable } from 'react-beautiful-dnd';

const BoardCanvas = ({ boardData, dispatch, toggleCardBox }) => {
  return (
    <Droppable droppableId={boardData._id} direction='horizontal' type='LIST'>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='flex items-start p-2'>
          {boardData.lists.map((list, index) => {
            return (
              <List
                key={list._id}
                index={index}
                listData={list}
                cards={boardData.cards}
                subtasks={boardData.subtasks}
                dispatch={dispatch}
                toggleCardBox={toggleCardBox}
              />
            );
          })}
          {provided.placeholder}

          <ListForm
            boardId={boardData._id}
            dispatch={dispatch}
            lists={boardData.lists}
          />
        </div>
      )}
    </Droppable>
  );
};

export default BoardCanvas;
