import React from 'react';

const Card = ({ 
  title, 
  children, 
  className = '', 
  noPadding = false 
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl hover:shadow-gray-300 hover:shadow-lg transition-all duration-300 ${
      noPadding ? '' : 'p-6'
    } ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold text-black mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;
