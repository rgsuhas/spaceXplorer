import React from 'react';
import * as funFactsModule from '@/lib/funFacts';

const FunFactSection: React.FC = () => {
  const funFact = funFactsModule.getRandomFunFact();

  return (
    <div className="p-8 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl shadow-2xl transform hover:scale-102 transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-extrabold mb-5 leading-tight">🚀 Fun Fact!</h2>
      <p className="text-xl italic text-center leading-relaxed">{`"${funFact}"`}</p>
    </div>
  );
};

export default FunFactSection;