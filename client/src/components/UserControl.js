import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../config/Auth";
import api from "../config/axiosConfig";
import useClickOutside from "../hooks/useClickOutside";
import MiniLoader from "./MiniLoader";

const UserControl = () => {
  const [dropdown, setDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const ref = useClickOutside(toggleDropDown);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { status } = await api.post("auth/logout");

      if (status === 200) {
        navigate("/");
        setUser(null);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  function toggleDropDown() {
    setDropdown((prevState) => !prevState);
  }

  return (
    <div className="relative">
      <motion.button
        transition={{ duration: 0.1 }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={() => toggleDropDown()}
        className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-gray-400
        transition-all duration-75 focus:bg-blue-600 "
      >
        <span className="material-icons-outlined mb-0.5 ml-0.5">
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
            ref={ref}
            className="absolute right-0 mt-1 bg-white py-3 px-4 shadow-xl rounded-md w-56 md:w-72"
          >
            <div className="flex items-start justify-center pb-2 px-1 overflow-hidden">
              <span className=" text-blue-600 mt-0.5 text-lg flex-grow break-all">
                Hello, {user.username}
              </span>
              <span
                role="button"
                onClick={() => setDropdown(false)}
                className="material-icons text-gray-500 pt-1 pl-0.5 hover:text-gray-800 transition-colors
                duration-150"
              >
                close
              </span>
            </div>
            <div className="w-full h-0.5 bg-gray-100 mb-3"></div>

            <button
              onClick={() => {
                handleLogout();
              }}
              className="flex items-center w-full font-medium bg-gray-100 text-gray-500
              hover:bg-gray-200 px-2.5 py-1.5 transition-colors duration-150 rounded-md"
            >
              {isLoading ? <MiniLoader /> : <span>Log Out</span>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserControl;
