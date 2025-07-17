import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-102">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Project</h2>
      <p className="text-gray-700 mb-3">
        This web application provides engaging and educational information about asteroids,
        leveraging data from NASA&apos;s APIs.
      </p>
      <p className="text-gray-700 mb-3">
        It utilizes the <strong className="text-blue-600">NASA NeoWs (Near Earth Object Web Service) API</strong> for asteroid data
        and aims to present complex astronomical information in an accessible and visually appealing manner.
      </p>
      <p className="text-gray-700">
        Built with Next.js, React, and Tailwind CSS, this project emphasizes clean code,
        maintainability, and a test-first development approach.
      </p>
    </div>
  );
};

export default AboutSection;
