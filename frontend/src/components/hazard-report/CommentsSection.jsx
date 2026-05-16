import React, { useState } from 'react';
import { Send, UserCircle2 } from 'lucide-react';

const CommentsSection = ({ hazardId }) => {
  const [newComment, setNewComment] = useState('');
  
  // Dummy comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      user: { name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=sarah' },
      text: 'Just drove past this 10 mins ago. It is really dangerous, especially at night because the street light nearby is also broken.',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      user: { name: 'Mike T.', avatar: 'https://i.pravatar.cc/150?u=mike' },
      text: 'Thanks for reporting! I almost hit it yesterday.',
      timestamp: '5 hours ago'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: Date.now(),
      user: { name: 'You', avatar: 'https://i.pravatar.cc/150?u=you' },
      text: newComment,
      timestamp: 'Just now'
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Community Updates ({comments.length})</h3>
      
      {/* Add Comment Input */}
      <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
            <UserCircle2 size={24} className="text-gray-400" />
          </div>
        </div>
        <div className="flex-grow relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add an update or comment..."
            className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-200 transition-all placeholder:text-gray-400"
          />
          <button 
            type="submit"
            disabled={!newComment.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <img 
              src={comment.user.avatar} 
              alt={comment.user.name} 
              className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-100 flex-shrink-0" 
            />
            <div className="flex-grow">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-bold text-slate-900">{comment.user.name}</span>
                <span className="text-xs text-gray-500 font-medium">{comment.timestamp}</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-gray-100">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
