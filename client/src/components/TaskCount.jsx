const STATE_CLASSES = {
  empty: 'bg-gray-100 text-gray-600',
  active: 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
};

const TaskCount = ({ done, total, ...restProps }) => {
  let stateColorClass = STATE_CLASSES.empty;

  if (done < total && done > 0) {
    stateColorClass = STATE_CLASSES.active;
  } else if (done >= total) {
    stateColorClass = STATE_CLASSES.done;
  }

  return (
    <div
      className={`${stateColorClass} flex items-center justify-center rounded px-1.5 mr-3`}
      {...restProps}
    >
      <span className='material-icons-outlined text-xl'>check_box</span>
      <span className='ml-1 text-sm'>
        {done}/{total}
      </span>
    </div>
  );
};

export default TaskCount;
