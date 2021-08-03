export const calcTasksStats = (subtasks) => {
  return subtasks.reduce(
    (acc, task) => {
      acc.total++;
      acc.done = task.isDone ? acc.done + 1 : acc.done;

      return acc;
    },
    { total: 0, done: 0 }
  );
};

export const calcPercentage = (num, total) => {
  // Calculate percentage of completed subtasks
  return Math.round((num / total || 0) * 100);
};

export const getProgressColor = (total, done) => {
  if (total === done) return 'bg-green-100 text-green-700';
  if (done > 0 && done < total) return 'bg-blue-100 text-blue-700';
  if (done === 0) return 'bg-gray-100 text-gray-600';
};
