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
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-2">Share This!</h2>
      <button
        onClick={handleShare}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Share Fun Fact
      </button>
    </div>
  );
};

export default SocialShare;