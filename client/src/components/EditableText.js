import { useEffect, useRef, useState } from 'react';

const EditableText = ({ style, dataText, dataUpdateFunc }) => {
  const [textValue, setTextValue] = useState(dataText);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    const handleEnterKey = (e) => {
      if (e.key !== 'Enter') return;

      setIsEditing(false);

      if (textValue === dataText) return;
      dataUpdateFunc(textValue);
    };

    document.addEventListener('keypress', handleEnterKey);

    if (isEditing) {
      inputRef.current.focus();
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
      <h2
        className={`w-full break-words ${style} ${
          !isEditing ? 'block' : 'hidden'
        }`}>
        {textValue}
      </h2>
      <input
        ref={inputRef}
        onBlur={() => handleOnBlur()}
        onChange={(e) => handleOnChange(e)}
        className={`w-full rounded-sm bg-transparent ${style} ${
          isEditing ? 'block' : 'hidden'
        }`}
        value={textValue}
        autoComplete='off'
        maxLength='128'
      />
    </div>
  );
};

export default EditableText;
