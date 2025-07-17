import React from 'react';

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
  };
}

const AsteroidOfTheDay: React.FC<AsteroidProps> = ({ asteroid }) => {
  return (
    <div>
      <h2>{asteroid.name}</h2>
      <p>
        Hazardous: {' '}
        {asteroid.is_potentially_hazardous_asteroid ? 'Potentially Hazardous' : 'Not Potentially Hazardous'}
      </p>
      <p>
        Estimated Diameter: {' '}
        {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {' '}
        {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
      </p>
      <p>
        <a href={asteroid.nasa_jpl_url} target="_blank" rel="noopener noreferrer">
          NASA JPL Link
        </a>
      </p>
    </div>
  );
};

export default AsteroidOfTheDay;
