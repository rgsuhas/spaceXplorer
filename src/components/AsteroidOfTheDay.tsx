import React from 'react';
import Image from 'next/image';

interface AsteroidProps {
  asteroid: {
    name: string;
    nasa_jpl_url: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
    };
    imageUrl?: string | null; // Add imageUrl to the interface
  };
}

const AsteroidOfTheDay: React.FC<AsteroidProps> = ({ asteroid }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{asteroid.name}</h2>
      {asteroid.imageUrl && (
        <div className="relative w-full h-64 my-4">
          <Image
            src={asteroid.imageUrl}
            alt={asteroid.name}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
          />
        </div>
      )}
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Hazardous:</span> {' '}
        {asteroid.is_potentially_hazardous_asteroid ? 'Potentially Hazardous' : 'Not Potentially Hazardous'}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Estimated Diameter:</span> {' '}
        {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {' '}
        {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
      </p>
      <p className="text-blue-600 hover:underline">
        <a href={asteroid.nasa_jpl_url} target="_blank" rel="noopener noreferrer">
          NASA JPL Link
        </a>
      </p>
    </div>
  );
};

export default AsteroidOfTheDay;
