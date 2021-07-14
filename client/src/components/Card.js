import React from 'react';

const Card = ({ cardData }) => {
  return (
    <div className='mx-2.5 my-1 py-1.5 px-2 bg-gray-50 shadow cursor-pointer hover:bg-white group transition-colors rounded-sm'>
      <button className='flex items-center justify-between w-full'>
        <span>{cardData.cardTitle}</span>
        <span className='material-icons group-hover:opacity-50 opacity-0'>
          edit
        </span>
      </button>
    </div>
  );
};

export default Card;
