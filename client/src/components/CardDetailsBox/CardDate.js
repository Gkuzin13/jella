const CardDate = ({ selectedCard }) => {
  const createdAt = new Date(selectedCard.createdAt).toLocaleString();
  return (
    <div className='my-6'>
      <div className='flex items-center font-semibold text-xl text-gray-800 mb-2'>
        <span className='material-icons-outlined mr-2.5'>today</span>
        <h2>Date Added</h2>
      </div>
      <span>{createdAt}</span>
    </div>
  );
};

export default CardDate;
