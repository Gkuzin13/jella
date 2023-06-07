const DescriptionIcon = ({ ...restProps }) => {
  return (
    <span
      title='This card has a description.'
      className='material-icons-outlined text-gray-300'
      {...restProps}
    >
      subject
    </span>
  );
};

export default DescriptionIcon;
