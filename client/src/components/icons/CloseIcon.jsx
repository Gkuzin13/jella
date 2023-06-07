const CloseIcon = ({ className = '', ...restProps }) => {
  return (
    <span className={`material-icons-outlined ${className}`} {...restProps}>
      close
    </span>
  );
};

export default CloseIcon;
