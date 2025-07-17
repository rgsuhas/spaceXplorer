import React from 'react';
import Image from 'next/image';

interface AsteroidBannerProps {
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
    imageUrl?: string | null;
  };
}

const AsteroidBanner: React.FC<AsteroidBannerProps> = ({ asteroid }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      {asteroid.imageUrl ? (
        <Image
          src={asteroid.imageUrl}
          alt={asteroid.name}
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-900 z-0 flex items-center justify-center">
          <p className="text-xl">No image available for this asteroid.</p>
        </div>
      )}

      <div className="relative z-10 text-center p-4 bg-black bg-opacity-50 rounded-lg max-w-2xl mx-auto animate-fade-in">
        <h2 className="text-5xl font-extrabold mb-4 leading-tight">{asteroid.name}</h2>
        <p className="text-xl mb-2">
          Estimated Diameter: {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
        </p>
        <p className="text-lg mb-4">
          Hazardous: {asteroid.is_potentially_hazardous_asteroid ? 'Potentially Hazardous' : 'Not Potentially Hazardous'}
        </p>
        <a
          href={asteroid.nasa_jpl_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          View on NASA JPL
        </a>
      </div>
    </div>
  );
};

export default AsteroidBanner;
