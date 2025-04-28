import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

const CardSection = ({ cards }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Your Cards</h3>
        <button className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200">
          <Plus size={16} className="mr-1" />
          Add Card
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div 
            key={card.id}
            className={`${card.color} p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 text-white`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className="text-sm opacity-80">
                {card.type === 'visa' ? 'VISA' : 'MASTERCARD'}
              </div>
              <CreditCard size={20} />
            </div>
            
            <div className="mb-6">
              <div className="mb-1 opacity-80 text-xs">Card Number</div>
              <div className="text-lg font-medium tracking-wider">•••• •••• •••• {card.last4}</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs opacity-80">Valid Thru</div>
                <div className="text-sm">{card.expiry}</div>
              </div>
              <div className="text-2xl">
                {card.type === 'visa' ? 'Visa' : 'MasterCard'}
              </div>
            </div>
          </div>
        ))}
        
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors duration-200 cursor-pointer">
          <Plus size={24} className="mb-2" />
          <span className="text-sm font-medium">Add New Card</span>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
