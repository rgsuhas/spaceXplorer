import React from 'react';
import { getRiskStatus } from '@/lib/riskMeter';

interface RiskMeterProps {
  isHazardous: boolean;
}

const RiskMeter: React.FC<RiskMeterProps> = ({ isHazardous }) => {
  const { message, emoji } = getRiskStatus(isHazardous);

  const bgColor = isHazardous ? 'bg-red-100 border-red-400' : 'bg-green-100 border-green-400';
  const textColor = isHazardous ? 'text-red-800' : 'text-green-800';

  return (
    <div className={`p-6 rounded-lg shadow-md text-center border ${bgColor} transition-all duration-300 ease-in-out transform hover:scale-102`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Risk Meter</h2>
      <p className={`text-xl font-semibold ${textColor}`}>
        <span className="text-3xl mr-2">{emoji}</span> {message}
      </p>
    </div>
  );
};

export default RiskMeter;
