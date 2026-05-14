import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import HazardService from '../../services/hazard.service';
import toast from 'react-hot-toast';

const UpvoteButton = ({ hazardId, initialUpvotes, initialHasUpvoted }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpvote = async () => {
    // Optimistic UI update
    setHasUpvoted(!hasUpvoted);
    setUpvotes(prev => hasUpvoted ? prev - 1 : prev + 1);
    
    setIsLoading(true);
    try {
      // Simulate API call or call actual API
      // await HazardService.upvoteHazard(hazardId);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      // Revert on failure
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
      className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm
        ${hasUpvoted 
          ? 'bg-blue-600 text-white shadow-blue-500/30 hover:bg-blue-700' 
          : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-200 hover:bg-blue-50'}
      `}
    >
      <div className={`p-1.5 rounded-full ${hasUpvoted ? 'bg-blue-500' : 'bg-gray-100'}`}>
        <ThumbsUp 
          size={20} 
          className={hasUpvoted ? 'fill-white text-white' : 'text-gray-500'} 
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
