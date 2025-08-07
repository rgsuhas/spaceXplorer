'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Rocket, Clock, Target, Users, Calendar, ExternalLink } from 'lucide-react';
import type { SpaceXLaunch } from '@/lib/spacex-types';
import { formatLaunchDate, getMissionStatus, getCountdown } from '@/lib/spacex-types';

interface SpaceXHeroProps {
  latestLaunch?: SpaceXLaunch | null;
  nextLaunch?: SpaceXLaunch | null;
}

const SpaceXHero: React.FC<SpaceXHeroProps> = ({ latestLaunch, nextLaunch }) => {
  const featuredMission = nextLaunch || latestLaunch;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  } as const;

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  } as const;

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400';
      case 'failure': return 'text-red-400';
      case 'upcoming': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };



  // Get the best available image
  const getHeroImage = (launch: SpaceXLaunch) => {
    if (launch.links.flickr.original.length > 0) {
      return launch.links.flickr.original[0];
    }
    if (launch.links.patch.large) {
      return launch.links.patch.large;
    }
    return null;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      {featuredMission && getHeroImage(featuredMission) && (
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={getHeroImage(featuredMission)!}
            alt={featuredMission.name}
            fill
            style={{ objectFit: 'cover' }}
            className="blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
        </motion.div>
      )}

      {/* Floating SpaceX Icons */}
      <motion.div variants={floatingVariants} animate="float" className="absolute top-20 left-10 z-10">
        <Rocket className="w-12 h-12 text-blue-300 opacity-60" />
      </motion.div>
      <motion.div 
        variants={floatingVariants} 
        animate="float" 
        transition={{ delay: 1 }}
        className="absolute top-32 right-20 z-10"
      >
        <Target className="w-10 h-10 text-purple-300 opacity-60" />
      </motion.div>
      <motion.div 
        variants={floatingVariants} 
        animate="float" 
        transition={{ delay: 2 }}
        className="absolute bottom-32 left-20 z-10"
      >
        <Users className="w-8 h-8 text-yellow-300 opacity-60" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-6 max-w-7xl mx-auto"
      >
        {/* SpaceX Branding */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-[12rem] font-black mb-8 tracking-[-0.1em] leading-none">
            <span className="text-white font-mono">
              SPACE
            </span>
            <span className="text-white font-mono relative">
              X
              {/* SpaceX-style underline */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-white transform -skew-x-12"></div>
            </span>
          </h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-tight mb-8 font-mono uppercase tracking-wider"
          >
            MAKING LIFE MULTIPLANETARY
          </motion.p>
        </motion.div>

        {/* Mission Highlight */}
        {featuredMission && (
          <motion.div
            variants={itemVariants}
            className="bg-black/40 backdrop-blur-sm border-2 border-white/20 p-12 mb-12 max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Mission Info */}
              <div className="text-left">
                <motion.div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-blue-400 mr-3" />
                  <span className="text-blue-400 font-semibold uppercase tracking-wide text-sm">
                    {featuredMission.upcoming ? 'Next Launch' : 'Latest Launch'}
                  </span>
                </motion.div>
                
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4 text-white"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {featuredMission.name}
                </motion.h2>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 text-purple-400 mr-3" />
                    <div>
                      <p className="font-medium">{formatLaunchDate(featuredMission.date_utc)}</p>
                      {featuredMission.upcoming && (
                        <p className="text-sm text-blue-400">{getCountdown(featuredMission.date_utc)}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Rocket className="w-5 h-5 text-orange-400 mr-3" />
                    <div>
                      <p className="font-medium">Flight #{featuredMission.flight_number}</p>
                      <p className="text-sm text-gray-400">Mission Status</p>
                    </div>
                  </div>
                </div>

                {featuredMission.details && (
                  <p className="text-gray-300 mt-4 leading-relaxed">
                    {featuredMission.details.length > 150 
                      ? featuredMission.details.substring(0, 150) + '...'
                      : featuredMission.details
                    }
                  </p>
                )}
              </div>

              {/* Mission Status & Actions */}
              <div className="space-y-6">
                <div className={`bg-black/60 backdrop-blur-sm border-2 border-white/30 p-6 text-center`}>
                  <div className={`text-3xl font-bold ${getStatusColor(getMissionStatus(featuredMission))} mb-2`}>
                    {getMissionStatus(featuredMission).toUpperCase()}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {getMissionStatus(featuredMission) === 'upcoming' ? 'Scheduled Launch' : 'Mission Complete'}
                  </div>
                </div>

                <div className="space-y-4">
                  {featuredMission.links.webcast && (
                    <motion.a
                      href={featuredMission.links.webcast}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-black border-2 border-red-500 hover:bg-red-500 text-white font-mono font-bold py-4 px-6 transition-all duration-300 flex items-center justify-center uppercase tracking-wider"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Watch on YouTube
                    </motion.a>
                  )}
                  
                  {featuredMission.links.article && (
                    <motion.a
                      href={featuredMission.links.article}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-black border-2 border-white/30 hover:border-white text-white font-mono font-bold py-4 px-6 transition-all duration-300 flex items-center justify-center uppercase tracking-wider"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Read Article
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-black/60 backdrop-blur-sm border-2 border-white/20 p-6"
          >
            <Rocket className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">Falcon 9</p>
            <p className="text-gray-400 text-sm">Reusable Rocket</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-black/60 backdrop-blur-sm border-2 border-white/20 p-6"
          >
            <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">Starship</p>
            <p className="text-gray-400 text-sm">Mars Mission</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-black/60 backdrop-blur-sm border-2 border-white/20 p-6"
          >
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">Crew Dragon</p>
            <p className="text-gray-400 text-sm">Human Spaceflight</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-black/60 backdrop-blur-sm border-2 border-white/20 p-6"
          >
            <Clock className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">Starlink</p>
            <p className="text-gray-400 text-sm">Satellite Internet</p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 mx-auto relative cursor-pointer"
          >
            <div className="w-1 h-3 bg-white absolute top-2 left-1/2 transform -translate-x-1/2" />
          </motion.div>
          <p className="text-gray-400 text-sm mt-2">Explore SpaceX Missions</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SpaceXHero;
