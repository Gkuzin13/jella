import { useEffect, useRef, useState } from 'react';

const EditableText = ({ style, dataText, dataUpdateFunc }) => {
  const [textValue, setTextValue] = useState(dataText);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    const handleEnterKey = () => {
      setIsEditing(false);
      if (textValue === dataText) {
        return;
      }

      dataUpdateFunc(textValue);
    };
    if (isEditing) {
      inputRef.current.focus();

      document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleEnterKey();
        }
      });
    }

    return () => document.removeEventListener('keypress', handleEnterKey);
  }, [isEditing, dataUpdateFunc, dataText, textValue]);

  const handleOnChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleOnBlur = () => {
    setIsEditing(false);
    if (textValue === dataText) {
      return;
    }

    dataUpdateFunc(textValue);
  };

  return (
    <div className='w-full' role='button' onClick={() => setIsEditing(true)}>
      <label
        htmlFor='title'
        className={`${style} ${!isEditing ? 'block' : 'hidden'}`}>
        {textValue}
      </label>
      <input
        ref={inputRef}
        onBlur={() => handleOnBlur()}
        onChange={(e) => handleOnChange(e)}
        className={`${style} ${isEditing ? 'block' : 'hidden'}`}
        value={textValue}
        name='title'
        autoComplete='off'
        maxLength='64'
      />
    </div>
  );
};

export default EditableText;
