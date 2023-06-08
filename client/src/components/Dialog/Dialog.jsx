import { AnimatePresence, motion } from 'framer-motion';
import CloseIcon from '../icons/CloseIcon';
import useClickOutside from '../../hooks/useClickOutside';
import { useRef } from 'react';

const Dialog = ({ open, onClickOutside, children }) => {
  const boxRef = useRef(null);

  useClickOutside(boxRef, () => open && onClickOutside());

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          transition={{ duration: 0.15 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='grid place-items-center fixed py-20 inset-0 overflow-auto bg-opacity-30 bg-black z-50'
        >
          <motion.div
            ref={boxRef}
            transition={{ duration: 0.1 }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className='flex flex-col justify-between relative bg-white shadow-2xl rounded-md m-4'
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Close = ({ className = '', ...restProps }) => {
  return (
    <button
      type='button'
      className={`flex items-center absolute right-0 top-0 m-4 ${className} transition-all duration-100`}
      {...restProps}
    >
      <CloseIcon />
    </button>
  );
};

const Title = ({ children, ...props }) => {
  return <span {...props}>{children}</span>;
};

const Content = ({ children, ...restProps }) => {
  return <div {...restProps}>{children}</div>;
};

Dialog.Close = Close;
Dialog.Title = Title;
Dialog.Content = Content;

export default Dialog;
