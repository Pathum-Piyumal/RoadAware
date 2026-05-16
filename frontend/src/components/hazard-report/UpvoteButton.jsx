import React, { useState } from 'react';
import { Heart } from 'lucide-react';

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
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all duration-300 border cursor-pointer ${
        hasUpvoted 
          ? 'bg-red-50 text-red-600 border-red-200 shadow-sm' 
          : 'bg-white text-slate-500 border-gray-200 hover:bg-gray-50 hover:text-slate-900 shadow-sm'
      }`}
    >
      <Heart 
        size={18} 
        className={`transition-transform duration-300 ${isAnimating ? 'scale-125' : ''} ${hasUpvoted ? 'fill-red-500 text-red-500' : 'fill-transparent text-slate-500'}`} 
      />
      <span className="text-sm font-medium">{upvotes}</span>
    </button>
  );
};

export default UpvoteButton;
