'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users } from 'lucide-react';

const UpcomingMissionsSection: React.FC = () => {
  // Mock upcoming missions data - in real implementation, this would come from SpaceX API
  const upcomingMissions = [
    {
      id: 1,
      name: 'STARSHIP IFT-6',
      vehicle: 'STARSHIP',
      status: 'IN DEVELOPMENT',
      date: '2024-03-15',
      description: 'Integrated Flight Test 6 - Critical test for Mars mission readiness',
      mission: 'Test Flight',
      icon: Target,
      color: 'text-purple-400',
      borderColor: 'border-purple-400',
    },
    {
      id: 2,
      name: 'CREW-10',
      vehicle: 'CREW DRAGON',
      status: 'OPERATIONAL',
      date: '2024-04-22',
      description: 'NASA Commercial Crew mission to International Space Station',
      mission: 'Crewed Mission',
      icon: Users,
      color: 'text-blue-400',
      borderColor: 'border-blue-400',
    },
    {
      id: 3,
      name: 'STARLINK GROUP 7-15',
      vehicle: 'FALCON 9',
      status: 'OPERATIONAL',
      date: '2024-02-28',
      description: 'Next generation Starlink V2 satellites deployment',
      mission: 'Satellite Deployment',
      icon: Rocket,
      color: 'text-green-400',
      borderColor: 'border-green-400',
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
      y: 100,
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
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
                UPCOMING MISSIONS
              </div>
              <div className="w-16 h-1 bg-white"></div>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none font-mono">
              NEXT
              <br />
              LAUNCHES
            </h2>
            
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </motion.div>

        {/* Mission Cards - 3x1 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {upcomingMissions.map((mission, index) => {
            const IconComponent = mission.icon;
            
            return (
              <motion.div
                key={mission.id}
                variants={cardVariants}
                className="group cursor-pointer"
                whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="bg-black/80 border-2 border-gray-800 hover:border-white hover:bg-black transition-all duration-300 p-8 h-full flex flex-col hover:shadow-2xl hover:shadow-white/10">
                  {/* Mission Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className={`w-10 h-10 ${mission.color} group-hover:text-white transition-colors duration-300`} />
                      <div className={`text-xs font-mono ${mission.color} uppercase tracking-wider px-3 py-1 border ${mission.borderColor}`}>
                        {mission.status}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-2 font-mono">
                      {mission.name}
                    </h3>
                    
                    <div className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                      {mission.vehicle}
                    </div>
                  </div>

                  {/* Mission Details */}
                  <div className="flex-1 space-y-4 mb-6">
                    <div className="border-l-2 border-gray-700 pl-4">
                      <div className="text-lg font-bold text-white mb-1">{mission.date}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-mono">Launch Date</div>
                    </div>
                    
                    <div className="border-l-2 border-gray-700 pl-4">
                      <div className="text-lg font-bold text-white mb-1">{mission.mission}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-mono">Mission Type</div>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {mission.description}
                    </p>
                  </div>

                  {/* Mission Status Indicator */}
                  <div className="border-t-2 border-gray-800 pt-6">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-2 ${mission.color.replace('text-', 'bg-')} origin-left`}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                        Mission #{mission.id.toString().padStart(3, '0')}
                      </span>
                      <span className={`text-xs font-mono ${mission.color} uppercase tracking-wider font-bold`}>
                        CONFIRMED
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="border-t-2 border-gray-800 pt-12">
            <p className="text-gray-400 text-lg font-light max-w-3xl mx-auto leading-relaxed font-mono">
              THESE MISSIONS REPRESENT THE NEXT PHASE OF SPACEX&apos;S COMMITMENT 
              TO REVOLUTIONIZING SPACE ACCESS AND ADVANCING HUMANITY&apos;S PRESENCE IN SPACE.
            </p>
            
            <div className="mt-8 flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white font-mono">3</div>
                <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">MISSIONS SCHEDULED</div>
              </div>
              <div className="w-px h-12 bg-gray-800"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white font-mono">100%</div>
                <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">MISSION READY</div>
              </div>
              <div className="w-px h-12 bg-gray-800"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white font-mono">Q1</div>
                <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">2024 LAUNCHES</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingMissionsSection;
