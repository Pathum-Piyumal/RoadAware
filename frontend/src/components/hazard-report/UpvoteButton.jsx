import React, { useState } from 'react';
import { ArrowBigUp } from 'lucide-react';

const UpvoteButton = ({ hazardId, initialUpvotes, initialHasUpvoted }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted || false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes(prev => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all duration-300 border ${
        hasUpvoted 
          ? 'bg-orange-500/20 text-orange-500 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]' 
          : 'bg-[#1a1a1a] text-gray-400 border-white/10 hover:bg-[#222] hover:text-white'
      }`}
    >
      <ArrowBigUp 
        size={24} 
        className={`transition-transform duration-300 ${isAnimating ? '-translate-y-1 scale-110' : ''} ${hasUpvoted ? 'fill-orange-500' : 'fill-transparent'}`} 
      />
      <span className="text-lg">{upvotes}</span>
      <span className="hidden sm:inline-block ml-1">{hasUpvoted ? 'Upvoted' : 'Upvote'}</span>
    </button>
  );
};

export default UpvoteButton;
