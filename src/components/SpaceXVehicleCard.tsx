'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface SpaceXVehicleCardProps {
  vehicle: {
    name: string;
    description: string;
    specs: {
      height: string;
      diameter: string;
      payload: string;
      missions: string;
    };
    status: string;
    image?: string;
  };
  index: number;
  isHovered: boolean;
}

const SpaceXVehicleCard: React.FC<SpaceXVehicleCardProps> = ({ vehicle, index, isHovered }) => {
  const cardVariants = {
    hidden: {
      x: -100,
      opacity: 0,
      height: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: {
      x: -100,
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isHovered ? "visible" : "exit"}
      className="overflow-hidden"
    >
      <div className="bg-black/20 border border-gray-800/50 rounded-none backdrop-blur-sm mb-4 overflow-hidden hover:border-gray-600/70 transition-colors duration-300 group">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[200px]">
          {/* Left: Vehicle Info */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-1 h-12 bg-white"></div>
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tight">
                      {vehicle.name.toUpperCase()}
                    </h3>
                    <div className="text-sm text-gray-400 font-mono uppercase tracking-wider">
                      {vehicle.status}
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-gray-400 group-hover:text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                {vehicle.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-l-2 border-gray-700 pl-4">
                <div className="text-2xl font-bold text-white">{vehicle.specs.height}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-mono">Height</div>
              </div>
              <div className="border-l-2 border-gray-700 pl-4">
                <div className="text-2xl font-bold text-white">{vehicle.specs.diameter}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-mono">Diameter</div>
              </div>
              <div className="border-l-2 border-gray-700 pl-4">
                <div className="text-2xl font-bold text-white">{vehicle.specs.payload}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-mono">Payload</div>
              </div>
              <div className="border-l-2 border-gray-700 pl-4">
                <div className="text-2xl font-bold text-white">{vehicle.specs.missions}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-mono">Missions</div>
              </div>
            </div>
          </div>

          {/* Right: Vehicle Silhouette/Image */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
            {/* Vehicle Silhouette - You can replace with actual images */}
            <div className="relative">
              {vehicle.name === 'Falcon 9' && (
                <div className="w-8 h-32 bg-white relative">
                  {/* Rocket body */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-t-full"></div>
                  {/* Grid fins */}
                  <div className="absolute top-8 -left-1 w-2 h-1 bg-white"></div>
                  <div className="absolute top-8 -right-1 w-2 h-1 bg-white"></div>
                  {/* Landing legs */}
                  <div className="absolute bottom-2 -left-2 w-1 h-4 bg-white transform rotate-12"></div>
                  <div className="absolute bottom-2 -right-2 w-1 h-4 bg-white transform -rotate-12"></div>
                </div>
              )}
              
              {vehicle.name === 'Starship' && (
                <div className="w-12 h-40 bg-white relative rounded-t-full">
                  {/* Fins */}
                  <div className="absolute bottom-8 -left-2 w-4 h-8 bg-white transform rotate-12 rounded"></div>
                  <div className="absolute bottom-8 -right-2 w-4 h-8 bg-white transform -rotate-12 rounded"></div>
                  {/* Engines */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-300"></div>
                </div>
              )}
              
              {vehicle.name === 'Crew Dragon' && (
                <div className="w-16 h-16 bg-white rounded-full relative">
                  {/* Capsule details */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-300 rounded"></div>
                </div>
              )}
              
              {vehicle.name === 'Starlink' && (
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-white rounded-sm"></div>
                  ))}
                </div>
              )}
            </div>

            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-8 h-full">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="border-r border-white"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-white via-gray-300 to-gray-600 origin-left"
        />
      </div>
    </motion.div>
  );
};

export default SpaceXVehicleCard;
