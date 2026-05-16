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
          ? 'bg-orange-50 text-orange-600 border-orange-200 shadow-sm' 
          : 'bg-white text-slate-500 border-gray-200 hover:bg-gray-50 hover:text-slate-900 shadow-sm'
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
