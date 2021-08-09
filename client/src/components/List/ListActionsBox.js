const ListActionsBox = ({
  toggleActionsBox,
  boxRef,
  handleListDelete,
  listId,
}) => {
  return (
    <div
      ref={boxRef}
      className='fixed flex items-center flex-col
    bg-white py-3 px-4 shadow-xl w-64'>
      <div className='flex items-center flex-row pb-4 relative px-2'>
        <span className='text-gray-400 font-medium'>List Actions</span>
        <button
          className='flex text-gray-500 hover:text-gray-700 absolute -right-16 
          transition-colors duration-150'
          type='button'
          onClick={() => toggleActionsBox()}>
          <span className='material-icons cursor-pointer ml-1 mr-au hover:text-black'>
            close
          </span>
        </button>
      </div>
      <div className='w-full border mb-3'></div>
      <button
        className='flex items-center w-full hover:bg-gray-200 p-1.5 transition-opacity 
      duration-75 rounded-sm'>
        <span>Add card...</span>
      </button>

      <button
        onClick={() => handleListDelete(listId)}
        className='flex items-center w-full hover:bg-red-50 hover:text-red-600  p-1.5
         transition-opacity duration-150 rounded-sm'>
        <span>Delete list...</span>
      </button>
    </div>
  );
};

export default ListActionsBox;
