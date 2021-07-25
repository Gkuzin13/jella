const ProgressBar = ({ subtasks }) => {
  const completedTasks = subtasks.filter((task) => task.isDone === true);

  const calcCompleted = (num, total) => {
    // Calculate precentage of completed subtasks
    return Math.round((num / total || 0) * 100);
  };

  const completed = calcCompleted(completedTasks.length, subtasks.length);
  return (
    <div className='flex justify-between items-center w-full my-1 text-center'>
      <span className='w-8 mr-2 text-center text-sm font-medium text-gray-500 transition-all duration-200 delay-200'>{`${completed}%`}</span>

      <div className='h-2 w-full bg-gray-200 rounded'>
        <div
          style={{ width: `${completed}%` }}
          className={`h-full ${
            completed > 99 ? 'bg-green-400' : 'bg-blue-400'
          } rounded text-right transition-all duration-200 delay-200`}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
