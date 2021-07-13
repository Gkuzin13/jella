import Card from '../components/Card';
import CardForm from './CardForm';

const List = ({ listData, handleListDelete, dispatch }) => {
  return (
    <div className='cursor-pointer flex flex-col flex-shrink-0 bg-gray-200 shadow-md w-64 mx-1.5 rounded-sm'>
      <div className='flex justify-between items-center py-2 px-2'>
        <span className='font-medium px-2'>{listData.listTitle}</span>
        <button className='flex justify-center p-1 opacity-50 hover:bg-gray-300'>
          <span className='material-icons'>more_horiz</span>
        </button>
      </div>
      {listData.cards.map((card) => {
        return <Card key={card._id} cardData={card} />;
      })}

      <CardForm listData={listData} dispatch={dispatch} />
    </div>
  );
};

export default List;
