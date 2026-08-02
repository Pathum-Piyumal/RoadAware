import React, { useState, useEffect } from 'react';
import { Mail, Search, Trash2, Eye, X, Send, Calendar, User, MessageSquare } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/messages', {
        params: {
          search: searchTerm,
          limit: 100,
        },
      });
      if (response.data.success) {
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
      toast.error('Failed to load contact messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    setIsDeleting(true);
    try {
      const response = await api.delete(`/admin/messages/${id}`);
      if (response.data.success) {
        toast.success('Contact message deleted.');
        setMessages(prev => prev.filter(m => m.id !== id));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
      toast.error('Failed to delete message.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0 flex items-center gap-2">
            <MessageSquare className="text-blue-500" size={24} /> Contact Messages
          </h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">View and respond to inquiries submitted from the website contact page.</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-admin-card p-4 rounded-xl border border-admin-border shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
          <input 
            type="text" 
            placeholder="Search sender, email, subject, or message..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-admin-input-bg border border-admin-border rounded-lg pl-10 pr-4 py-2 text-sm text-admin-text transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 box-border"
          />
        </div>
        <span className="text-sm text-admin-text-muted">
          Total Received: <strong className="text-admin-text">{messages.length}</strong>
        </span>
      </div>

      {/* Messages Table */}
      <div className="bg-admin-card rounded-xl border border-admin-border overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Sender</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Subject</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Message Preview</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Received At</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-admin-text-muted">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-admin-text-muted">
                  No contact messages found.
                </td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg.id} className="border-b border-admin-border last:border-0 hover:bg-admin-bg/60 transition-colors">
                  <td className="p-4 text-sm text-admin-text">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-500/20">
                        {msg.name ? msg.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-admin-text m-0">{msg.name}</p>
                        <a href={`mailto:${msg.email}`} className="text-xs text-blue-500 hover:underline m-0">{msg.email}</a>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-admin-text font-medium max-w-[200px] truncate">
                    {msg.subject}
                  </td>
                  <td className="p-4 text-sm text-admin-text-muted max-w-[300px] truncate">
                    {msg.message}
                  </td>
                  <td className="p-4 text-xs text-admin-text-muted">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-admin-text text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedMessage(msg)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors bg-transparent border border-admin-border text-admin-text hover:bg-admin-bg hover:text-blue-500 hover:border-blue-500"
                      >
                        <Eye size={14} /> View
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        disabled={isDeleting}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors bg-transparent border border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500"
                        title="Delete Message"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-in-out]">
          <div className="bg-admin-card border border-admin-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-admin-border sticky top-0 bg-admin-card z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-admin-text m-0">{selectedMessage.subject}</h2>
                  <p className="text-xs text-admin-text-muted m-0 mt-0.5">Message ID: #{selectedMessage.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="p-2 hover:bg-admin-bg rounded-lg text-admin-text-muted hover:text-admin-text transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-admin-bg/50 border border-admin-border">
                <div>
                  <p className="text-xs text-admin-text-muted m-0 font-semibold uppercase tracking-wider">Sender Name</p>
                  <p className="text-sm font-bold text-admin-text m-0 mt-0.5">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-xs text-admin-text-muted m-0 font-semibold uppercase tracking-wider">Sender Email</p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-sm font-semibold text-blue-500 hover:underline m-0 mt-0.5 block">{selectedMessage.email}</a>
                </div>
                <div>
                  <p className="text-xs text-admin-text-muted m-0 font-semibold uppercase tracking-wider">Date Received</p>
                  <p className="text-xs font-medium text-admin-text m-0 mt-0.5">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h3 className="text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2">Message Content</h3>
                <div className="bg-admin-bg/40 p-5 rounded-xl border border-admin-border text-sm text-admin-text leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-admin-border flex justify-between items-center bg-admin-bg/50 rounded-b-2xl">
              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer bg-transparent flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Delete
              </button>
              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white no-underline transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Send size={14} /> Reply via Email
                </a>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-admin-border text-admin-text hover:bg-admin-bg transition-colors cursor-pointer bg-transparent"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
