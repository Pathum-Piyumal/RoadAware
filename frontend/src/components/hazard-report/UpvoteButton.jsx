import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import HazardService from '../../services/hazard.service';
import AuthService from '../../services/auth.service';

const UpvoteButton = ({ hazardId, initialUpvotes, initialHasUpvoted }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted || false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpvote = async () => {
    if (loading) return;

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    // Optimistic update
    if (hasUpvoted) {
      setUpvotes(prev => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }

    try {
      setLoading(true);
      await HazardService.upvoteHazard(hazardId);
    } catch (err) {
      // Revert on failure
      if (hasUpvoted) {
        setUpvotes(prev => prev + 1);
        setHasUpvoted(true);
      } else {
        setUpvotes(prev => prev - 1);
        setHasUpvoted(false);
      }
      console.error('Upvote failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={loading}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all duration-300 border cursor-pointer disabled:opacity-70 ${
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
