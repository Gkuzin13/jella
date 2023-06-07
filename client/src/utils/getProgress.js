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
