import { motion } from 'framer-motion';
import useClickOutside from '../../hooks/useClickOutside';
import CloseIcon from '../icons/CloseIcon';
import { useRef } from 'react';
import Divider from '../Divider';

const colors = ['gray', 'blue', 'green', 'purple', 'yellow', 'red'];

const colorsMap = colors.map((color) => {
  return {
    name: color,
    class: `bg-${color}-600`,
  };
});

const ListOptionsBox = ({
  toggleOptionsBox,
  handleListDelete,
  handleListUpdate,
  listData,
}) => {
  const boxRef = useRef(null);

  useClickOutside(boxRef, toggleOptionsBox);

  const { coverColor, _id } = listData;

  const handleOnColorChange = (coverColor) => {
    handleListUpdate({ ...listData, coverColor });
  };

  return (
    <motion.div
      key={listData._id}
      transition={{ duration: 0.1 }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      ref={boxRef}
      className='absolute z-50 top-1 flex items-center flex-col bg-white py-3 px-4 shadow-xl w-72 rounded-md'
    >
      <div className='flex justify-center items-center w-full flex-row relative'>
        <span className='text-gray-400 text-center text-lg'>List Options</span>
        <button
          type='button'
          onClick={() => toggleOptionsBox()}
          className='flex items-center text-gray-400 hover:text-gray-700
          transition-colors duration-100 absolute right-0'
        >
          <CloseIcon className='text-2xl' />
        </button>
      </div>
      <Divider />
      <div className='w-full mb-1'>
        <span className='self-start text text-gray-500'>Cover Color:</span>
        <ul className='flex items-center justify-between w-full mt-1 mb-5'>
          {colorsMap.map((color) => {
            return (
              <li
                key={color.class}
                onClick={() => handleOnColorChange(color.name)}
                aria-label={`Select ${color.name} list cover color`}
                role='button'
                className={`${color.class} w-9 h-7 text-center rounded-md bg-opacity-90 hover:bg-opacity-100
               transition-colors transform duration-75 ease-linear`}
              >
                {color.name === coverColor && (
                  <span className='material-icons-outlined text-xl text-white w-full'>
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
        className='text-left w-full font-medium text-gray-500 bg-gray-200 bg-opacity-40 hover:bg-opacity-90
         px-2.5 py-1.5 transition-colors duration-150 rounded-md'
      >
        Delete list
      </button>
    </motion.div>
  );
};

export default ListOptionsBox;
