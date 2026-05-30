import React, { useState, useEffect } from 'react';
import { Send, UserCircle2 } from 'lucide-react';
import HazardService from '../../services/hazard.service';
import AuthService from '../../services/auth.service';

const CommentsSection = ({ hazardId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (!hazardId) return;
    HazardService.getComments(hazardId)
      .then(data => setComments(data.comments || []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [hazardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    setSubmitting(true);
    try {
      const data = await HazardService.addComment(hazardId, newComment.trim());
      setComments(prev => [data.comment, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (dateStr) => {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Community Updates ({comments.length})
      </h3>

      {/* Add Comment Input */}
      <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
            {currentUser?.avatar
              ? <img src={currentUser.avatar} alt="You" className="w-full h-full object-cover" />
              : <UserCircle2 size={24} className="text-gray-400" />
            }
          </div>
        </div>
        <div className="flex-grow relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={currentUser ? 'Add an update or comment...' : 'Login to comment...'}
            disabled={submitting}
            className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-200 transition-all placeholder:text-gray-400 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!newComment.trim() || submitting}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
              <div className="flex-grow space-y-2">
                <div className="h-3 bg-gray-100 rounded w-1/4" />
                <div className="h-12 bg-gray-100 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-6">No comments yet. Be the first to add an update!</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100 flex-shrink-0">
                {comment.author?.avatar
                  ? <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
                  : <UserCircle2 size={24} className="text-gray-400" />
                }
              </div>
              <div className="flex-grow">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-bold text-slate-900">{comment.author?.name || 'Anonymous'}</span>
                  <span className="text-xs text-gray-500 font-medium">{formatTime(comment.createdAt)}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-gray-100">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
