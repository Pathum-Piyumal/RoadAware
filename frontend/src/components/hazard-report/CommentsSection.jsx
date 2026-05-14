import React, { useState, useEffect } from 'react';
import { Send, UserCircle2, Loader2 } from 'lucide-react';
import HazardService from '../../services/hazard.service';
import AuthService from '../../services/auth.service';
import toast from 'react-hot-toast';

const CommentsSection = ({ hazardId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentUser = AuthService.getCurrentUser();

  // Dummy Comments for initial load
  const DUMMY_COMMENTS = [
    {
      id: 'c1',
      user: { name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=sarah' },
      content: 'I almost damaged my car here yesterday! Thanks for reporting.',
      createdAt: '2026-05-13T10:20:00Z'
    },
    {
      id: 'c2',
      user: { name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?u=mike' },
      content: 'The authorities need to fix this ASAP. It is on a main route.',
      createdAt: '2026-05-13T14:45:00Z'
    }
  ];

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // const data = await HazardService.getComments(hazardId);
        // setComments(data);
        
        // Simulating API response
        await new Promise(resolve => setTimeout(resolve, 800));
        setComments(DUMMY_COMMENTS);
      } catch (error) {
        console.warn('API unavailable, loading dummy comments.');
        setComments(DUMMY_COMMENTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [hazardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!currentUser) {
      toast.error('You must be logged in to comment.');
      return;
    }

    setIsSubmitting(true);
    try {
      // await HazardService.addComment(hazardId, newComment);
      
      // Simulating API response
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const createdComment = {
        id: Date.now().toString(),
        user: { name: currentUser.name, avatar: currentUser.avatar },
        content: newComment,
        createdAt: new Date().toISOString()
      };
      
      setComments([createdComment, ...comments]);
      setNewComment('');
      toast.success('Comment added!');
    } catch (error) {
      toast.error('Failed to add comment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (isLoading) {
    return <div className="py-8 flex justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/40 border border-gray-100 mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Community Discussion ({comments.length})</h3>

      {/* Add Comment Form */}
      <div className="mb-8 flex gap-4">
        {currentUser?.avatar ? (
          <img src={currentUser.avatar} alt="You" className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <UserCircle2 className="text-gray-400" size={24} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex-1 relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={currentUser ? "Add a comment..." : "Sign in to comment..."}
            disabled={!currentUser || isSubmitting}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 pr-12 text-sm focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors min-h-[80px] resize-y disabled:opacity-70 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting || !currentUser}
            className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            {comment.user.avatar ? (
              <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                <UserCircle2 className="text-gray-400" size={24} />
              </div>
            )}
            <div className="flex-1 bg-gray-50 rounded-2xl p-4 border border-gray-100 group-hover:bg-gray-100 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900 text-sm">{comment.user.name}</span>
                <span className="text-xs text-gray-500 font-medium">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
