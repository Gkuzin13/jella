import React from 'react';

const Card = ({ cardData }) => {
  return (
    <div className='mx-2.5 my-1 py-1.5 px-2 bg-gray-50 shadow cursor-pointer hover:bg-white transition-colors rounded-sm'>
      <span>{cardData.cardTitle}</span>
    </div>
  );
};

export default Card;
