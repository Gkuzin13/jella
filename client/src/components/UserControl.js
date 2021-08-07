import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../config/Auth';
import api from '../config/axiosConfig';
import ClickOutside from '../hooks/ClickOutside';

const UserControl = () => {
  const [dropdown, setDropdown] = useState(false);

  const history = useHistory();
  const dropdownRef = useRef();
  const { setUser } = useContext(AuthContext);

  ClickOutside(dropdownRef, dropdown, () => {
    setDropdown(false);
  });

  const handleLogout = async () => {
    try {
      const { status } = await api.get('/logout');

      if (status === 200) {
        setUser(null);
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=' flex flex-col items-end m-4 relative z-10'>
      <button onClick={() => setDropdown(!dropdown)}>
        <div className='flex items-center px-1.5 py-0.5 rounded shadow-sm hover:bg-blue-50  text-blue-500 bg-gray-50 font-medium  transition-colors duration-150'>
          <span className='material-icons-outlined text-3xl'>
            manage_accounts
          </span>
        </div>
      </button>
      <div
        ref={dropdownRef}
        className={`${
          dropdown ? 'block fixed top-12' : 'hidden'
        } my-1 bg-white p-2 w-48 shadow-md`}>
        <div className='flex items-center justify-between px-1'>
          <span className='text-gray-400 font-medium'>Account</span>
          <button
            onClick={() => setDropdown(false)}
            className='flex items-center opacity-40 hover:opacity-100'
            type='button'>
            <span className='material-icons cursor-pointer ml-1'>close</span>
          </button>
        </div>
        <div className=' border-solid border border-gray-100 my-3'></div>

        <button
          onClick={() => {
            handleLogout();
          }}
          className='flex items-center w-full hover:bg-red-50 hover:text-red-600 p-1.5 transition-opacity duration-150 rounded-sm'>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default UserControl;
