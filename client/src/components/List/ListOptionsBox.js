import { motion } from "framer-motion";
import useClickOutside from "../../hooks/useClickOutside";

const ListOptionsBox = ({
  toggleOptionsBox,
  handleListDelete,
  handleListUpdate,
  listData,
}) => {
  const ref = useClickOutside(toggleOptionsBox);

  const { coverColor, _id } = listData;

  const colors = ["gray", "blue", "green", "purple", "yellow", "red"];

  const colorsMap = colors.map((color) => {
    return {
      name: color,
      class: `bg-${color}-600`,
    };
  });

  const handleOnColorChange = (coverColor) => {
    handleListUpdate({ ...listData, coverColor });
  };

  return (
    <motion.div
      key={listData._id}
      transition={{ duration: 0.1 }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      ref={ref}
      className="absolute top-0 flex items-center flex-col bg-white py-3 px-4 shadow-xl w-72"
    >
      <div className="flex items-center flex-row pb-4 relative px-2">
        <span className="text-gray-400 text-lg">List Options</span>
        <button
          type="button"
          onClick={() => toggleOptionsBox()}
          className="material-icons text-gray-400 hover:text-gray-700 absolute -right-16
          transition-colors duration-150"
        >
          close
        </button>
      </div>

      <div className="w-full border mb-3"></div>

      <div className="w-full mb-1">
        <span className="self-start text text-gray-500">Cover Color:</span>
        <ul className="flex items-center justify-between w-full mt-1 mb-5">
          {colorsMap.map((color) => {
            return (
              <li
                key={color.class}
                onClick={() => handleOnColorChange(color.name)}
                aria-label={`Select ${color.name} list cover color`}
                role="button"
                className={`${color.class} w-9 h-7 text-center rounded-sm bg-opacity-90 hover:bg-opacity-100
               transition-colors transform duration-75 ease-linear`}
              >
                {color.name === coverColor && (
                  <span className="material-icons-outlined text-xl text-white w-full">
                    done
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => handleListDelete(_id)}
        className="text-left w-full font-medium text-gray-500 bg-gray-200 bg-opacity-40 hover:bg-opacity-90
         px-2.5 py-1.5 transition-colors duration-150 rounded-sm"
      >
        Delete list
      </button>
    </motion.div>
  );
};

export default ListOptionsBox;
