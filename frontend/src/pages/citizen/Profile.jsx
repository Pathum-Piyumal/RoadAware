import React, { useState, useEffect } from 'react';
import { User, Mail, Camera, Activity, AlertTriangle, ThumbsUp, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  // Dummy stats for the UI
  const stats = [
    { label: 'Reports Submitted', value: '12', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Total Upvotes', value: '48', icon: ThumbsUp, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Reports', value: '3', icon: Activity, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  useEffect(() => {
    // Attempt to load from service
    const currentUser = AuthService.getCurrentUser() || {
      name: 'Lochana Perera',
      email: 'lochana@example.com',
      phone: '+94 77 123 4567',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
    };
    setUser(currentUser);
    setFormData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || ''
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // await UserService.updateProfile(formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({ ...user, ...formData });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: User Card & Stats */}
        <div className="md:col-span-1 space-y-6">
          {/* User Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100 text-center">
            <div className="relative inline-block mb-4">
              <img 
                src={user.avatar || 'https://ui-avatars.com/api/?name=' + user.name} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md">
                <Camera size={14} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{user.email}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              Verified Citizen
            </span>
          </div>

          {/* Stats Cards */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Activity Stats</h3>
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center p-3 rounded-2xl bg-gray-50">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} mr-4`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-semibold uppercase">{stat.label}</p>
                    <p className="text-lg font-black text-gray-900">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Edit Details */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/40 border border-gray-100">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 disabled:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 disabled:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg ml-1">#</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 disabled:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user.name, email: user.email, phone: user.phone || '' });
                    }}
                    className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 flex justify-center items-center py-3 px-4 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save size={18} className="mr-2"/> Save Changes</>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
