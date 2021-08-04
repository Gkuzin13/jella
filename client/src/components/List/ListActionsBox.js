const ListActionsBox = ({
  toggleActionsBox,
  boxRef,
  handleListDelete,
  listId,
}) => {
  return (
    <div ref={boxRef} className='fixed my-1 bg-white p-2 w-64 shadow-md'>
      <div className='flex items-center justify-between px-1'>
        <span className='text-gray-400'>List actions</span>
        <button
          className='flex items-center opacity-50 hover:opacity-100'
          type='button'
          onClick={() => toggleActionsBox()}>
          <span className='material-icons cursor-pointer ml-1 hover:text-black'>
            close
          </span>
        </button>
      </div>
      <div className=' border-solid border border-gray-300 my-3'></div>
      <button
        className={
          'flex items-center w-full hover:bg-gray-200 p-1.5 transition-opacity duration-75 rounded-sm'
        }>
        <span>Add card...</span>
      </button>

      <button
        onClick={() => handleListDelete(listId)}
        className={
          'flex items-center w-full hover:bg-red-50 hover:text-red-600  p-1.5 transition-opacity duration-150 rounded-sm'
        }>
        <span>Delete list...</span>
      </button>
    </div>
  );
};

export default ListActionsBox;