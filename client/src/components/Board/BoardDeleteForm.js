import MiniLoader from '../MiniLoader';
import Dialog from '../Dialog/Dialog';
import Divider from '../Divider';

const BoardDeleteForm = ({ open, isLoading, onAction, onClose }) => {
  const handleConfirm = async () => {
    onAction();
  };

  return (
    <Dialog open={open} onClickOutside={onClose}>
      <Dialog.Close
        className='text-gray-400 hover:text-gray-700'
        onClick={onClose}
      />
      <Dialog.Content className='grid place-items-center p-4 w-screen max-w-sm'>
        <Dialog.Title className='text-lg text-center text-gray-500'>
          Delete this board?
        </Dialog.Title>
        <Divider />
        <p className='text-gray-700'>
          All lists and cards will be permanently deleted. This action cannot be
          undone.
        </p>
        <button
          onClick={handleConfirm}
          type='button'
          className='bg-gray-100 hover:bg-red-600 hover:text-white text-red-600 px-4 py-2 mt-5 font-medium
          shadow-sm transition-colors duration-150 rounded-md w-full'
        >
          {isLoading ? <MiniLoader /> : "Yes, i'm sure"}
        </button>
      </Dialog.Content>
    </Dialog>
  );
};

export default BoardDeleteForm;
