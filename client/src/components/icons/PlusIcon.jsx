const PlusIcon = ({ className = '', ...restProps }) => {
  return (
    <span className={`material-icons ${className}`} {...restProps}>
      add
    </span>
  );
};

export default PlusIcon;
