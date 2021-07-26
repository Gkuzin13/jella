import { useRef, useState } from 'react';
import Card from '../components/Card';
import api from '../config/axiosConfig';
import ClickOutside from '../hooks/ClickOutside';
import EditableText from '../hooks/EditableText';
import { ACTIONS } from '../reducers/reducers';
import CardForm from './CardForm';
import ListActionsBox from './ListActionsBox';

const List = ({ listData, cards, subtasks, dispatch, toggleCardBox }) => {
  const [listActionsBox, setListActionsBox] = useState(false);

  const boxRef = useRef();

  ClickOutside(boxRef, listActionsBox, () => {
    toggleActionsBox(!listActionsBox);
  });

  const updateList = async (list) => {
    try {
      dispatch({
        type: ACTIONS.EDIT_LIST,
        data: list,
      });

      await api.patch(`/1/lists/${listData._id}`, {
        listTitle: list.listTitle,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleListDelete = async (id) => {
    try {
      const { status } = await api.delete(`/1/lists/${id}`);

      if (status === 200) {
        dispatch({
          type: ACTIONS.DELETE_LIST,
          data: id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleActionsBox = () => {
    setListActionsBox(!listActionsBox);
  };

  const handleTitleUpdate = (value) => {
    const updatedList = { ...listData, listTitle: value };
    updateList(updatedList);
  };

  return (
    <div className='cursor-pointer flex flex-col flex-shrink-0 bg-gray-100 shadow-md w-64 mx-1.5 rounded-sm'>
      <div className='flex justify-between items-center py-2 px-2'>
        <EditableText
          value={listData.listTitle}
          handleTitleUpdate={handleTitleUpdate}
        />
        <div>
          <button
            onClick={() => setListActionsBox(!listActionsBox)}
            className='relative flex justify-center p-1 opacity-50 hover:bg-gray-300'>
            <span className='material-icons'>more_horiz</span>
          </button>

          {!listActionsBox ? null : (
            <ListActionsBox
              toggleActionsBox={toggleActionsBox}
              boxRef={boxRef}
              handleListDelete={handleListDelete}
              listData={listData}
            />
          )}
        </div>
      </div>
      {cards.map((card) => {
        return card.listId === listData._id ? (
          <Card
            key={card._id}
            cardData={card}
            subtasks={subtasks}
            toggleCardBox={toggleCardBox}
          />
        ) : null;
      })}

      <CardForm listData={listData} dispatch={dispatch} />
    </div>
  );
};

export default List;
