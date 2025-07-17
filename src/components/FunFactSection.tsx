import React from 'react';
import * as funFactsModule from '@/lib/funFacts';

const FunFactSection: React.FC = () => {
  const funFact = funFactsModule.getRandomFunFact();

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Fun Fact!</h2>
      <p className="text-lg italic">"{funFact}"</p>
    </div>
  );
};

export default FunFactSection;