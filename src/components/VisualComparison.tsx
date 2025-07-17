import React from 'react';
import { convertDiameterToSchoolBuses } from '@/lib/visualComparison';

interface VisualComparisonProps {
  diameterInKilometers: number;
}

const VisualComparison: React.FC<VisualComparisonProps> = ({ diameterInKilometers }) => {
  const numberOfBuses = convertDiameterToSchoolBuses(diameterInKilometers);

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-2">Visual Comparison</h2>
      <p className="text-lg">
        This asteroid is approximately as long as <strong>{numberOfBuses}</strong> school buses!
      </p>
      <div className="flex justify-center items-center flex-wrap mt-4">
        {Array.from({ length: Math.min(numberOfBuses, 10) }).map((_, i) => (
          <span key={i} className="text-4xl mx-1" title="School Bus">🚌</span>
        ))}
        {numberOfBuses > 10 && <span className="text-lg ml-2">...and {numberOfBuses - 10} more!</span>}
      </div>
    </div>
  );
};

export default VisualComparison;
