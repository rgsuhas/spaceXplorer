import React from 'react';
import Image from 'next/image';

interface CloseApproachAsteroid {
  name: string;
  close_approach_date: string;
  miss_distance_km: string;
  imageUrl?: string | null;
}

interface CloseApproachListProps {
  asteroids: CloseApproachAsteroid[];
}

const CloseApproachList: React.FC<CloseApproachListProps> = ({ asteroids }) => {
  return (
    <div>
      {asteroids.length === 0 ? (
        <p className="text-gray-600">No close approach asteroids found for the next 7 days.</p>
      ) : (
        <ul className="space-y-3">
          {asteroids.map((asteroid, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-lg flex items-center space-x-4 group">
              {asteroid.imageUrl && (
                <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-colors duration-300">
                  <Image
                    src={asteroid.imageUrl}
                    alt={asteroid.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <div>
                <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{asteroid.name}</p>
                <p className="text-gray-600 text-sm">
                  Approaching on <span className="font-medium">{asteroid.close_approach_date}</span> at a distance of <span className="font-medium">{parseFloat(asteroid.miss_distance_km).toFixed(2)} km</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CloseApproachList;