import React from 'react';
import { convertDiameterToSchoolBuses } from '@/lib/visualComparison';

interface VisualComparisonProps {
  diameterInKilometers: number;
}

const VisualComparison: React.FC<VisualComparisonProps> = ({ diameterInKilometers }) => {
  const numberOfBuses = convertDiameterToSchoolBuses(diameterInKilometers);

  // Determine a scaling factor for the visual representation
  // Max diameter for a reasonable visual scale, e.g., 1000 km
  const maxDiameterForScale = 1000; 
  const scaleFactor = Math.min(diameterInKilometers / maxDiameterForScale, 1); // Cap at 1 to prevent overflow
  const barWidth = `${scaleFactor * 100}%`;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-102">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Visual Comparison</h2>
      <p className="text-xl text-gray-700 mb-4">
        This asteroid is approximately as long as <strong className="text-blue-600">{numberOfBuses}</strong> school buses!
      </p>
      <div className="w-full bg-gray-200 rounded-full h-8 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: barWidth }}
        ></div>
      </div>
      {numberOfBuses > 0 && (
        <p className="text-sm text-gray-500">
          (Visual scale is relative to a hypothetical asteroid of {maxDiameterForScale} km diameter)
        </p>
      )}
    </div>
  );
};

export default VisualComparison;