const Loader = () => {
  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="flex items-start justify-start">
        <span className="h-8 w-3 opacity-0 bg-gray-300 animate-scale transform-gpu transition-transform rounded-md"></span>
        <span className="h-8 w-3 mx-1 opacity-0 bg-gray-400 bg-opacity-70 animate-scale2 transform-gpu transition-transform rounded-md"></span>
        <span className="h-8 w-3 opacity-0 bg-gray-400 bg-opacity-80 animate-scale3 transform-gpu transition-transform rounded-md"></span>
      </div>
    </div>
  );
};

export default Loader;
