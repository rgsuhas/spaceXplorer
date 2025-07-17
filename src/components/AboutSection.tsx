import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">About This Project</h2>
      <p className="text-lg mb-2">
        This web application provides engaging and educational information about asteroids,
        leveraging data from NASA's APIs.
      </p>
      <p className="text-lg mb-2">
        It utilizes the <strong>NASA NeoWs (Near Earth Object Web Service) API</strong> for asteroid data
        and aims to present complex astronomical information in an accessible and visually appealing manner.
      </p>
      <p className="text-lg">
        Built with Next.js, React, and Tailwind CSS, this project emphasizes clean code,
        maintainability, and a test-first development approach.
      </p>
    </div>
  );
};

export default AboutSection;
