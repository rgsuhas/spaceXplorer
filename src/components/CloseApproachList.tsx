import React from 'react';

interface CloseApproachAsteroid {
  name: string;
  close_approach_date: string;
  miss_distance_km: string;
}

interface CloseApproachListProps {
  asteroids: CloseApproachAsteroid[];
}

const CloseApproachList: React.FC<CloseApproachListProps> = ({ asteroids }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Close Approach Asteroids (Next 7 Days)</h2>
      {asteroids.length === 0 ? (
        <p>No close approach asteroids found for the next 7 days.</p>
      ) : (
        <ul>
          {asteroids.map((asteroid, index) => (
            <li key={index} className="mb-2">
              <strong>{asteroid.name}</strong> - Approaching on {asteroid.close_approach_date} at a distance of {parseFloat(asteroid.miss_distance_km).toFixed(2)} km
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CloseApproachList;
