export const calcPercentage = (value, max) => {
  if (value < 0) return 0;
  if (value > max) return 100;

  return Math.round((value / max || 0) * 100);
};

export const countSubtasksDone = (subtasks) => {
  if (!subtasks.length) {
    return { total: 0, done: 0 };
  }

  return subtasks.reduce(
    (acc, task) => {
      acc.total++;
      acc.done = task.isDone ? acc.done + 1 : acc.done;

      return acc;
    },
    { total: 0, done: 0 }
  );
};
