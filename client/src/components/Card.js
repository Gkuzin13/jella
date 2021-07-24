const Card = ({ cardData, toggleCardBox }) => {
  const { cardTitle } = cardData;
  return (
    <div className='mx-2.5 my-1 py-1.5 px-2 bg-gray-50 shadow-md cursor-pointer hover:bg-white group transition-colors duration-75 rounded-sm'>
      <button
        onClick={() => toggleCardBox(cardData, true)}
        className='flex items-center justify-between w-full'>
        <span>{cardTitle}</span>
        <span className='material-icons group-hover:opacity-50 opacity-0 transition-opacity duration-75'>
          edit
        </span>
      </button>
    </div>
  );
};

export default Card;
