const PRIORITY_ICON = {
  low: { color: 'green', icon: 'remove' },
  medium: { color: 'yellow', icon: 'short_text' },
  high: { color: 'red', icon: 'sort' },
};

const PriorityIcon = ({ priority, className, ...restProps }) => {
  const { icon, color } = PRIORITY_ICON[priority] || PRIORITY_ICON.low;

  return (
    <span
      title='Priority'
      className={`material-icons text-${color}-500 ${className ?? ''}`}
      {...restProps}
    >
      {icon}
    </span>
  );
};

export default PriorityIcon;
