const MiniLoader = ({ color }) => {
  if (color) {
    return (
      <div className='flex justify-center items-center w-full'>
        <div className='miniloader-blue ease-linear rounded-full border-2 border-gray-200 h-6 w-6 animate-spin'></div>
      </div>
    );
  }
  return (
    <div className='flex justify-center items-center w-full'>
      <div className='miniloader-gray ease-linear rounded-full border-2 border-gray-700 border-opacity-60 h-6 w-6 animate-spin'></div>
    </div>
  );
};

export default MiniLoader;
