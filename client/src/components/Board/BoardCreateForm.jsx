import { useRef } from 'react';
import MiniLoader from '../MiniLoader';
import Dialog from '../Dialog/Dialog';
import Divider from '../Divider';

const BoardForm = ({ open, isLoading, onClose, onAction }) => {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const { value } = inputRef.current;

    if (!value.length) {
      return;
    }

    onAction(value);
  };

  return (
    <Dialog open={open} onClickOutside={onClose}>
      <Dialog.Close
        className='text-gray-400 hover:text-gray-700'
        onClick={onClose}
      />
      <Dialog.Content className='grid place-items-center p-4 w-screen max-w-sm'>
        <Dialog.Title className='text-lg text-center text-gray-500'>
          Give your board a title
        </Dialog.Title>
        <Divider />
        <input
          ref={inputRef}
          maxLength='40'
          autoFocus
          autoComplete='off'
          required
          placeholder='Enter a title for this board...'
          className='px-2 py-2 border rounded-md w-full'
        />
        <button
          type='button'
          className='bg-green-600 rounded-md hover:bg-green-700 text-white px-4 py-2 mt-5 font-medium
        w-full shadow-sm transition-colors duration-150'
          onClick={handleSubmit}
        >
          {isLoading ? <MiniLoader /> : 'Create board'}
        </button>
      </Dialog.Content>
    </Dialog>
  );
};

export default BoardForm;
