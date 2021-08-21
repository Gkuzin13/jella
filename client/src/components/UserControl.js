import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router';
import { motion } from 'framer-motion';
import { AuthContext } from '../config/Auth';
import api from '../config/axiosConfig';
import useClickOutside from '../hooks/useClickOutside';

const UserControl = () => {
  const [dropdown, setDropdown] = useState(false);

  const history = useHistory();
  const dropdownRef = useRef();
  const { setUser } = useContext(AuthContext);

  useClickOutside(dropdownRef, dropdown, () => {
    setDropdown(false);
  });

  const handleLogout = async () => {
    try {
      const { status } = await api.post('/logout');

      if (status === 200) {
        setUser(null);
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!dropdown) {
    return (
      <div>
        <button
          onClick={() => setDropdown(!dropdown)}
          className='w-10 h-10 ml-2 flex items-center justify-center rounded-full text-white bg-blue-600 
          transition-all duration-75 hover:bg-blue-700 '>
          <span className='material-icons-outlined mb-0.5 ml-0.5'>
            manage_accounts
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setDropdown(!dropdown)}
        className='w-10 h-10 flex items-center justify-center rounded-full text-white bg-blue-600 
          transition-all duration-75 focus:bg-blue-700 '>
        <span className='material-icons-outlined mb-0.5 ml-0.5'>
          manage_accounts
        </span>
      </button>
      <motion.div
        transition={{ duration: 0.075 }}
        initial={{ y: 2, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        ref={dropdownRef}
        className='absolute right-0 mt-1 flex items-center flex-col
        bg-white py-3 px-4 shadow-xl w-64'>
        <div className='flex items-center flex-row pb-4 relative px-2'>
          <span className='font-medium text-gray-500 mt-0.5'>Account</span>
          <button
            onClick={() => setDropdown(false)}
            className='flex text-gray-500 hover:text-gray-800 absolute left-28 p-2 transition-colors 
            duration-150'
            type='button'>
            <span className='material-icons'>close</span>
          </button>
        </div>
        <div className='w-full border mb-3'></div>

        <button
          onClick={() => {
            handleLogout();
          }}
          className='flex items-center w-full font-medium text-gray-500 bg-gray-100 hover:bg-red-600 hover:text-white 
          px-2.5 py-1.5 transition-colors duration-150 rounded-sm'>
          <span>Log Out</span>
        </button>
      </motion.div>
    </div>
  );
};

export default UserControl;
