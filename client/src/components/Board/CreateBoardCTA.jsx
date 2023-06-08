const CreateBoardCTA = ({ onClick }) => {
  return (
    <div className='whitespace-nowrap pb-16 md:pl-24 mx-4 lg:mr-0'>
      <div className='flex flex-col leading-relaxed text-center'>
        <button
          onClick={() => onClick(true)}
          className='flex items-center justify-center rounded-md text-2xl bg-green-600 text-white
          shadow px-6 py-3 mb-2 bg-opacity-90 hover:bg-opacity-100 hover:shadow-md
          transition-all duration-300'
        >
          <span
            aria-label='Create new board'
            className='material-icons-outlined mr-3'
          >
            dashboard_customize
          </span>
          Create new board
        </button>
        <p className='text-gray-500 text-center'>
          Visually manage and organize your work.
        </p>
      </div>
    </div>
  );
};

export default CreateBoardCTA;
