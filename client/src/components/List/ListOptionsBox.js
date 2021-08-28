import { motion } from 'framer-motion';

const ListOptionsBox = ({
  toggleOptionsBox,
  boxRef,
  handleListDelete,
  handleListUpdate,
  listData,
}) => {
  const { coverColor, _id } = listData;
  const colors = ['gray', 'blue', 'green', 'purple', 'yellow', 'red'];

  const onListColorChange = (newColor) => {
    handleListUpdate({ ...listData, coverColor: newColor });
  };

  return (
    <motion.div
      key={listData._id}
      transition={{ duration: 0.025 }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      ref={boxRef}
      className='fixed flex items-center flex-col bg-white py-3 px-4 shadow-xl w-72'>
      <div className='flex items-center flex-row pb-4 relative px-2'>
        <span className='text-gray-400 text-lg'>List Options</span>
        <button
          aria-label='close'
          className='flex text-gray-400 hover:text-gray-700 absolute -right-16 
          transition-colors duration-150'
          type='button'
          onClick={() => toggleOptionsBox()}>
          <span className='material-icons cursor-pointer ml-1 mr-au hover:text-gray-800'>
            close
          </span>
        </button>
      </div>

      <div className='w-full border mb-3'></div>

      <div className='w-full'>
        <span className='self-start text text-gray-500'>Cover Color:</span>
        <ul className='flex items-center justify-between w-full mt-1 mb-5'>
          {colors.map((col) => {
            const colorStyle = `bg-${col}-600`;
            return (
              <li
                key={col}
                role='button'
                aria-label={`Select ${col} list cover color`}
                onClick={() => onListColorChange(col)}
                className={`${colorStyle} w-9 h-7 text-center rounded-sm  bg-opacity-90 hover:bg-opacity-100 
               transition-colors transform duration-75 ease-linear`}>
                {col === coverColor && (
                  <span className='material-icons-outlined text-xl text-white'>
                    done
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type='button'
        onClick={() => handleListDelete(_id)}
        className='flex items-center w-full font-medium text-gray-500 bg-gray-100 hover:text-red-600 
        px-2.5 py-1.5 transition-colors duration-150 rounded-sm'>
        <span>Delete list</span>
      </button>
    </motion.div>
  );
};

export default ListOptionsBox;
