export const calcTasksStats = (subtasks, cardId) => {
  return subtasks.reduce(
    (acc, task) => {
      if (task.cardId === cardId) {
        acc.total++;
        acc.done = task.isDone ? acc.done + 1 : acc.done;
      }
      return acc;
    },
    { total: 0, done: 0 }
  );
};

export const calcPercentage = (num, total) => {
  // Calculate percentage of completed subtasks
  return Math.round((num / total || 0) * 100);
};
