import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthContext } from '../config/Auth';
import api from '../config/axiosConfig';
import useClickOutside from '../hooks/useClickOutside';

const UserControl = () => {
  const [dropdown, setDropdown] = useState(false);

  const history = useHistory();
  const dropdownRef = useRef();
  const { setUser, user } = useContext(AuthContext);

  useClickOutside(dropdownRef, dropdown, () => {
    setDropdown(false);
  });

  const handleLogout = async () => {
    try {
      const { status } = await api.post('auth/logout');

      if (status === 200) {
        setUser(null);
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='relative'>
      <motion.button
        transition={{ duration: 0.1 }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={() => setDropdown(!dropdown)}
        className='w-10 h-10 flex items-center justify-center rounded-full text-white bg-gray-400 
        transition-all duration-75 focus:bg-blue-600 '>
        <span className='material-icons-outlined mb-0.5 ml-0.5'>
          manage_accounts
        </span>
      </motion.button>
      <AnimatePresence>
        {dropdown && (
          <motion.div
            transition={{ duration: 0.1 }}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            ref={dropdownRef}
            className='absolute right-0 mt-1 flex items-center flex-col
          bg-white py-3 px-4 shadow-xl rounded-sm w-72'>
            <div className='flex items-center flex-row pb-4 relative px-2'>
              <span className=' text-blue-600 mt-0.5 text-lg'>
                Hello, {user.username}
              </span>
              <button
                onClick={() => setDropdown(false)}
                className='flex text-gray-500 hover:text-gray-800 absolute left-32 px-4 p-2 transition-colors 
                duration-150'
                type='button'>
                <span className='material-icons'>close</span>
              </button>
            </div>
            <div className='w-full h-0.5 bg-gray-100 mb-3'></div>

            <button
              onClick={() => {
                handleLogout();
              }}
              className='flex items-center w-full font-medium bg-gray-50 text-gray-400 hover:text-blue-600 
              px-2.5 py-1.5 transition-colors duration-150 rounded-sm'>
              <span>Log Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserControl;
