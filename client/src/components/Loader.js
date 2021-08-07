const Loader = () => {
  return (
    <div className='grid place-items-center h-screen w-full'>
      <div className='flex items-start justify-start'>
        <span className='h-10 w-3.5 mx-0.5 bg-gray-400 bg-opacity-80 animate-stretch rounded-sm shadow-inner'></span>
        <span className='h-10 w-3.5 mx-0.5 bg-gray-400 bg-opacity-70 animate-stretch2 rounded-sm shadow-inner'></span>
        <span className='h-10 w-3.5 mx-0.5 bg-gray-300 animate-stretch3 rounded-sm shadow-inner'></span>
      </div>
    </div>
  );
};

export default Loader;
