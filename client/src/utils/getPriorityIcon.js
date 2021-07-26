export const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'medium':
      return { color: 'yellow', icon: 'short_text' };
    case 'high':
      return { color: 'red', icon: 'sort' };
    default:
      return { color: 'green', icon: 'remove' };
  }
};
