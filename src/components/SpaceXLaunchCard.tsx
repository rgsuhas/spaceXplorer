'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Rocket, Play, ExternalLink, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { SpaceXLaunch } from '@/lib/spacex-types';
import { formatLaunchDate, getMissionStatus, getCountdown } from '@/lib/spacex-types';

interface SpaceXLaunchCardProps {
  launch: SpaceXLaunch;
  index: number;
  onSelect?: (launch: SpaceXLaunch) => void;
}

const SpaceXLaunchCard: React.FC<SpaceXLaunchCardProps> = ({ launch, index, onSelect }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    },
    hover: {
      y: -12,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const status = getMissionStatus(launch);
  
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failure':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'upcoming':
        return <Clock className="w-5 h-5 text-blue-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'failure': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'upcoming': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getBestImage = () => {
    // Prefer Flickr images over mission patches
    if (launch.links.flickr.original.length > 0) {
      return launch.links.flickr.original[0];
    }
    if (launch.links.flickr.small.length > 0) {
      return launch.links.flickr.small[0];
    }
    if (launch.links.patch.large) {
      return launch.links.patch.large;
    }
    if (launch.links.patch.small) {
      return launch.links.patch.small;
    }
    return null;
  };

  const heroImage = getBestImage();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative bg-black/60 backdrop-blur-sm border-2 border-gray-800 hover:border-white hover:bg-black/80 hover:shadow-2xl hover:shadow-white/5 overflow-hidden cursor-pointer transition-all duration-300"
      onClick={() => {
        if (onSelect) {
          onSelect(launch);
        } else {
          console.log('Launch selected:', launch.name);
        }
      }}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
      
      <div className="relative z-10 p-6">
        {/* Header Image */}
        <div className="relative h-48 mb-6 overflow-hidden bg-gray-800">
          {heroImage ? (
            <motion.div variants={imageVariants} className="h-full">
              <Image
                src={heroImage}
                alt={launch.name}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-all duration-300"
              />
            </motion.div>
          ) : (
            <div className="h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Rocket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg font-semibold">SpaceX Mission</p>
                <p className="text-gray-500 text-sm">Flight #{launch.flight_number}</p>
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
            className={`absolute top-4 right-4 flex items-center space-x-2 px-3 py-1 border-2 backdrop-blur-sm ${getStatusColor()}`}
          >
            {getStatusIcon()}
            <span className="text-xs font-semibold uppercase tracking-wide">
              {status}
            </span>
          </motion.div>

          {/* Launch Date Badge */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-white/20 px-3 py-2 flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-white text-sm font-medium">
              {new Date(launch.date_utc).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        </div>

        {/* Mission Info */}
        <div className="space-y-4">
          <motion.div
            className="space-y-2"
            whileHover={{ x: 2 }}
          >
            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 line-clamp-2">
              {launch.name}
            </h3>
            <p className="text-blue-400 font-medium text-sm">
              Flight #{launch.flight_number}
            </p>
          </motion.div>

          {/* Mission Details */}
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <div>
                <p className="font-medium">{formatLaunchDate(launch.date_utc)}</p>
                {launch.upcoming && (
                  <p className="text-blue-400 text-xs">{getCountdown(launch.date_utc)}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Rocket className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <div>
                <p className="font-medium">Mission Status</p>
                <p className={`text-xs ${status === 'success' ? 'text-green-400' : status === 'failure' ? 'text-red-400' : status === 'upcoming' ? 'text-blue-400' : 'text-gray-400'}`}>
                  {status === 'upcoming' ? 'Scheduled Launch' : status === 'success' ? 'Successful Mission' : status === 'failure' ? 'Mission Failed' : 'Unknown Status'}
                </p>
              </div>
            </div>
          </div>

          {/* Mission Description */}
          {launch.details && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {launch.details.length > 120 
                ? launch.details.substring(0, 120) + '...'
                : launch.details
              }
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-700/50">
            {launch.links.webcast && (
              <motion.a
                href={launch.links.webcast}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 bg-black border-2 border-red-600 hover:bg-red-600 text-red-400 hover:text-white px-3 py-2 flex items-center justify-center space-x-2 transition-all duration-200 text-sm font-mono font-bold uppercase tracking-wider"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4" />
                <span>Watch</span>
              </motion.a>
            )}
            
            <motion.div
              className="flex-1 bg-black border-2 border-gray-600 hover:border-white text-gray-300 hover:text-white px-3 py-2 flex items-center justify-center space-x-2 transition-all duration-200 text-sm font-mono font-bold uppercase tracking-wider cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Details</span>
            </motion.div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl pointer-events-none"
        />
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{ 
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
          maskComposite: 'exclude' 
        }}
      />
    </motion.div>
  );
};

export default SpaceXLaunchCard;
