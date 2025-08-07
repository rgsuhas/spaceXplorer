'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Github, ExternalLink, X } from 'lucide-react';

const ContactIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: 'GITHUB',
      url: 'https://github.com/rgsuhas', // Replace with your GitHub URL
      icon: Github,
      color: 'text-white',
      bgColor: 'bg-gray-800',
      hoverColor: 'hover:bg-white hover:text-black'
    },
    {
      name: 'PORTFOLIO',
      url: 'https://your-portfolio.com', // Replace with your portfolio URL
      icon: ExternalLink,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      hoverColor: 'hover:bg-blue-400 hover:text-black'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  } as const;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute bottom-20 right-0 space-y-4"
          >
            {contacts.map((contact) => {
              const IconComponent = contact.icon;
              return (
                <motion.a
                  key={contact.name}
                  variants={itemVariants}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group flex items-center space-x-3 
                    ${contact.bgColor} ${contact.color} ${contact.hoverColor}
                    border-2 border-gray-800 hover:border-white
                    px-4 py-3 
                    transition-all duration-300
                    backdrop-blur-sm
                  `}
                  whileHover={{ x: -10, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span className="font-mono text-sm font-bold tracking-wider uppercase">
                    {contact.name}
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Contact Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 
          bg-black/80 backdrop-blur-sm 
          border-2 border-gray-800 hover:border-white 
          flex items-center justify-center
          transition-all duration-300
          group
          ${isOpen ? 'bg-white text-black border-white' : 'text-white hover:bg-white hover:text-black'}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          delay: 1
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="user"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <User className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Orbital Ring Animation */}
      <motion.div
        className="absolute inset-0 border-2 border-gray-600/30 -m-2"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Pulse Effect */}
      <motion.div
        className="absolute inset-0 border border-white/20 -m-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ContactIcon;
