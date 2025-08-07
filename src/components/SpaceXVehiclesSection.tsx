'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Clock } from 'lucide-react';
import SpaceXVehicleCard from './SpaceXVehicleCard';

const SpaceXVehiclesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const vehicles = [
    {
      name: 'Falcon 9',
      description: 'The world\'s first orbital class reusable rocket. Falcon 9 has revolutionized access to space with its ability to land and be reflown multiple times.',
      specs: {
        height: '70M',
        diameter: '3.7M', 
        payload: '22.8T',
        missions: '200+'
      },
      status: 'OPERATIONAL',
      icon: Rocket
    },
    {
      name: 'Starship',
      description: 'The most powerful rocket ever built. Designed to carry humans to Mars and enable life to become multiplanetary.',
      specs: {
        height: '120M',
        diameter: '9M',
        payload: '100T+',
        missions: 'TESTING'
      },
      status: 'IN DEVELOPMENT',
      icon: Target
    },
    {
      name: 'Crew Dragon',
      description: 'The safest, most advanced crew transportation system ever built. Autonomously docks with the International Space Station.',
      specs: {
        height: '8.1M',
        diameter: '4M',
        payload: '7 CREW',
        missions: '40+'
      },
      status: 'OPERATIONAL',
      icon: Users
    },
    {
      name: 'Starlink',
      description: 'A constellation of thousands of satellites providing high-speed internet to underserved areas of the globe.',
      specs: {
        height: '2.8M',
        diameter: '1.5M',
        payload: '∞',
        missions: '5000+'
      },
      status: 'OPERATIONAL',
      icon: Clock
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 60,
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="relative py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-block">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-1 bg-white"></div>
              <div className="text-sm font-mono text-gray-400 uppercase tracking-[0.2em]">
                VEHICLE FLEET
              </div>
              <div className="w-16 h-1 bg-white"></div>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none">
              SPACEX
              <br />
              VEHICLES
            </h2>
            
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </motion.div>

        {/* Vehicle Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {vehicles.map((vehicle, index) => {
            const IconComponent = vehicle.icon;
            
            return (
              <motion.div
                key={vehicle.name}
                variants={cardVariants}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="bg-black/80 border-2 border-gray-800 hover:border-white hover:bg-black transition-all duration-300 p-8 aspect-square flex flex-col justify-between">
                  {/* Icon */}
                  <div className="mb-4">
                    <IconComponent className="w-12 h-12 text-white group-hover:text-gray-300 transition-colors duration-300" />
                  </div>
                  
                  {/* Vehicle Name */}
                  <div className="flex-1 flex flex-col justify-end">
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-2">
                      {vehicle.name.toUpperCase()}
                    </h3>
                    
                    <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      {vehicle.status}
                    </div>
                    
                    {/* Hover Indicator */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: hoveredIndex === index ? '100%' : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="h-1 bg-white mt-4"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Horizontal Vehicle Cards */}
        <div className="space-y-0 overflow-hidden">
          {vehicles.map((vehicle, index) => (
            <SpaceXVehicleCard
              key={vehicle.name}
              vehicle={vehicle}
              index={index}
              isHovered={hoveredIndex === index}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="border-t border-gray-800 pt-12">
            <p className="text-gray-400 text-lg font-light max-w-3xl mx-auto leading-relaxed">
              Each vehicle represents a breakthrough in aerospace engineering, 
              designed to make space more accessible and ultimately enable 
              humanity's expansion to other planets.
            </p>
            
            <div className="mt-8 flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">400+</div>
                <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">Total Missions</div>
              </div>
              <div className="w-px h-12 bg-gray-800"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">Success Rate</div>
              </div>
              <div className="w-px h-12 bg-gray-800"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">Reuses</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpaceXVehiclesSection;
