'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TeslaRoadster: React.FC = () => {
  return (
    <div className="fixed top-16 right-16 z-5 pointer-events-none">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1, 0.95, 1],
        }}
        transition={{
          rotate: {
            duration: 180,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="relative w-48 h-48"
      >
        {/* Orbital Path */}
        <motion.div
          className="absolute inset-0 border-2 border-red-500/20 rounded-full"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Tesla Roadster Representation */}
        <motion.div
          animate={{
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {/* Car Body - Bigger Tesla Roadster */}
          <div className="w-12 h-6 bg-gradient-to-r from-red-600 to-red-800 rounded-sm relative shadow-lg">
            {/* Windshield */}
            <div className="absolute top-0 left-1 w-10 h-3 bg-gradient-to-b from-blue-300/40 to-blue-200/20 rounded-t-sm" />
            
            {/* Wheels */}
            <div className="absolute -bottom-1 left-0 w-3 h-3 bg-gray-900 rounded-full border-2 border-gray-700" />
            <div className="absolute -bottom-1 right-0 w-3 h-3 bg-gray-900 rounded-full border-2 border-gray-700" />
            
            {/* Starman */}
            <div className="absolute top-1 left-5 w-2 h-2 bg-white rounded-full" />
            
            {/* Tesla Logo Easter Egg */}
            <div className="absolute top-2 right-1 w-1 h-1 bg-red-400 rounded-full opacity-80" />
            
            {/* SpaceX Logo Easter Egg */}
            <div className="absolute bottom-1 left-2 text-[4px] text-white/60 font-mono">X</div>
          </div>
          
          {/* Thruster Effects */}
          <motion.div
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scaleX: [0.5, 1.5, 0.5],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -left-3 top-2 w-3 h-2 bg-gradient-to-l from-blue-400/60 to-cyan-300/40 rounded-full blur-sm"
          />
          
          {/* Secondary thruster */}
          <motion.div
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1
            }}
            className="absolute -left-4 top-3 w-2 h-1 bg-white/40 rounded-full blur-[1px]"
          />
        </motion.div>
        
        {/* Orbital Debris */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
            style={{
              top: `${20 + i * 8}%`,
              left: `${20 + i * 8}%`,
              transformOrigin: `${40 - i * 3}px ${40 - i * 3}px`,
            }}
          />
        ))}
      </motion.div>
      
      {/* Info Label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute -bottom-8 left-0 text-xs text-gray-400 text-center w-32"
      >
        <div className="bg-black/40 backdrop-blur-sm rounded px-2 py-1 border border-gray-700/50">
          Tesla Roadster
          <div className="text-[10px] text-gray-500">In orbit since 2018</div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeslaRoadster;
