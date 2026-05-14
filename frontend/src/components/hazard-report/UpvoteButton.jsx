import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import HazardService from '../../services/hazard.service';
import toast from 'react-hot-toast';

const UpvoteButton = ({ hazardId, initialUpvotes, initialHasUpvoted }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpvote = async () => {
    setHasUpvoted(!hasUpvoted);
    setUpvotes(prev => hasUpvoted ? prev - 1 : prev + 1);
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      setHasUpvoted(hasUpvoted);
      setUpvotes(initialUpvotes);
      toast.error('Failed to register upvote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={isLoading}
      className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm border
        ${hasUpvoted 
          ? 'bg-blue-600 text-white border-blue-500 shadow-blue-500/20 hover:bg-blue-700' 
          : 'bg-[#1a1a1a] text-gray-300 border-white/10 hover:border-blue-500/50 hover:bg-[#222]'}
      `}
    >
      <div className={`p-1.5 rounded-full ${hasUpvoted ? 'bg-blue-500' : 'bg-[#0a0a0a]'}`}>
        <ThumbsUp 
          size={20} 
          className={hasUpvoted ? 'fill-white text-white' : 'text-gray-400'} 
        />
      </div>
      <div className="flex flex-col items-start leading-tight">
        <span className="text-sm opacity-80">{hasUpvoted ? 'Upvoted' : 'Upvote'}</span>
        <span className="text-lg">{upvotes}</span>
      </div>
    </button>
  );
};

export default UpvoteButton;
