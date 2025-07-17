import React from 'react';
import { getRiskStatus } from '@/lib/riskMeter';

interface RiskMeterProps {
  isHazardous: boolean;
}

const RiskMeter: React.FC<RiskMeterProps> = ({ isHazardous }) => {
  const { message, emoji } = getRiskStatus(isHazardous);

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-2">Risk Meter</h2>
      <p className="text-lg">
        {emoji} {message}
      </p>
    </div>
  );
};

export default RiskMeter;
