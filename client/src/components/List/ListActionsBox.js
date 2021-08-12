const ListActionsBox = ({
  toggleActionsBox,
  boxRef,
  handleListDelete,
  handleColorChange,
  listData,
}) => {
  const { coverColor, _id } = listData;
  const colors = ['gray', 'blue', 'green', 'purple', 'yellow', 'red'];
  return (
    <div
      ref={boxRef}
      className='fixed flex items-center flex-col bg-white py-3 px-4 shadow-xl w-72'>
      <div className='flex items-center flex-row pb-4 relative px-2'>
        <span className='text-gray-400 font-medium'>List Options</span>
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
      <span className='self-start text text-gray-600'>Cover Color:</span>
      <div class='flex items-center justify-between w-full mt-0.5 mb-4'>
        {colors.map((col) => {
          return (
            <button
              key={col}
              onClick={() => {
                handleColorChange(col);
              }}
              className={`w-9 h-7 rounded-sm bg-${col}-600 bg-opacity-90 hover:bg-opacity-100 
               transition-colors transform duration-75 ease-linear`}>
              {col === coverColor && (
                <span class='material-icons-outlined text-xl text-white'>
                  done
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handleListDelete(_id)}
        className='flex items-center w-full bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 px-2.5 py-1.5
         transition-colors duration-150 rounded-sm'>
        <span>Delete list</span>
      </button>
    </div>
  );
};

export default ListActionsBox;
