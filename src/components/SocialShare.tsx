"use client";

import React from 'react';

interface SocialShareProps {
  shareText: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ shareText }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Asteroid App Fun Fact',
          text: shareText,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      // You can implement copy to clipboard or open a new window with share links
      alert(`Please copy this text to share: "${shareText}"`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-102">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Share This!</h2>
      <button
        onClick={handleShare}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Share Fun Fact
      </button>
    </div>
  );
};

export default SocialShare;