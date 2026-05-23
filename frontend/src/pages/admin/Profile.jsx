import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Camera } from 'lucide-react';
import AuthService from '../../services/auth.service';

const Profile = () => {
  const adminUser = AuthService.getCurrentAdmin() || {};

  const [name, setName] = useState(adminUser.name || 'Admin User');
  const [email, setEmail] = useState(adminUser.email || 'admin@roadaware.com');
  const [profileImage, setProfileImage] = useState(
    adminUser.avatar || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(adminUser.name || 'Admin User')}&background=3B82F6&color=fff&size=150`
  );

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      try {
        const response = await api.post('/auth/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.success) {
          const newAvatar = response.data.avatarUrl;
          setProfileImage(newAvatar);
          // Update session storage
          const updatedUser = { ...adminUser, avatar: newAvatar };
          sessionStorage.setItem('adminUser', JSON.stringify(updatedUser));
          toast.success('Profile image updated successfully!');
          window.location.reload(); // reload to sync Navbar avatar instantly
        }
      } catch (error) {
        console.error('Avatar upload failed:', error);
        toast.error('Failed to upload avatar.');
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/auth/profile', { name, email });
      if (response.data.success) {
        // Update session storage
        const updatedUser = { 
          ...adminUser, 
          name: response.data.user.name, 
          email: response.data.user.email 
        };
        sessionStorage.setItem('adminUser', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully!');
        window.location.reload(); // reload to sync Navbar profile details
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile.';
      toast.error(message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      if (response.data.success) {
        toast.success('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update password.';
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Your Profile</h1>
        <p className="text-admin-text-muted text-sm mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        {/* Avatar Card */}
        <div className="bg-admin-card rounded-xl border border-admin-border p-6 shadow-sm flex flex-col items-center text-center">
          <div className="relative inline-block mb-4">
            <img
              className="h-24 w-24 rounded-full border-4 border-admin-bg object-cover mb-0"
              src={profileImage}
              alt="Admin profile"
            />
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1.5 cursor-pointer flex items-center justify-center border-2 border-admin-card hover:bg-blue-600 transition-colors">
              <Camera size={16} />
            </label>
            <input 
              type="file" 
              id="avatar-upload" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />
          </div>
          <h2 className="text-xl font-semibold text-admin-text m-0 mb-1">{name}</h2>
          <p className="text-sm text-blue-500 font-medium m-0">System Administrator</p>
          
          <div className="h-px bg-admin-border my-6 w-full"></div>
          
          <p className="text-admin-text-muted text-sm mt-1 text-left w-full leading-loose">
            <strong className="text-admin-text">Role:</strong> {adminUser.role ? adminUser.role.toUpperCase() : 'ADMIN'}<br />
            <strong className="text-admin-text">Status:</strong> {adminUser.status ? adminUser.status.toUpperCase() : 'ACTIVE'}<br />
            <strong className="text-admin-text">Location:</strong> Colombo Headquarters
          </p>
        </div>

        {/* Profile Settings Card */}
        <div className="bg-admin-card rounded-xl border border-admin-border p-6 shadow-sm">
          <form className="flex flex-col gap-5" onSubmit={handleUpdateProfile}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text-muted" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                className="bg-admin-input-bg border border-admin-border rounded-lg px-3.5 py-2.5 text-admin-text text-sm w-full transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text-muted" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="bg-admin-input-bg border border-admin-border rounded-lg px-3.5 py-2.5 text-admin-text text-sm w-full transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text-muted" htmlFor="role">Role</label>
              <input
                id="role"
                type="text"
                className="bg-admin-input-bg border border-admin-border rounded-lg px-3.5 py-2.5 text-admin-text text-sm w-full transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-admin-sidebar-active disabled:text-admin-text-muted disabled:cursor-not-allowed"
                value={adminUser.role ? adminUser.role.toUpperCase() : 'ADMIN'}
                disabled
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white border-none rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-blue-600 transition-colors self-start mt-2">
              Save Changes
            </button>
          </form>
          
          <div className="h-px bg-admin-border my-6 w-full"></div>
          
          <h3 className="text-base font-semibold text-admin-text mb-4 mt-0">Password Settings</h3>
          <form className="flex flex-col gap-5" onSubmit={handleUpdatePassword}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text-muted" htmlFor="currentPassword">Current Password</label>
              <input 
                id="currentPassword" 
                type="password" 
                className="bg-admin-input-bg border border-admin-border rounded-lg px-3.5 py-2.5 text-admin-text text-sm w-full transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                placeholder="••••••••" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text-muted" htmlFor="newPassword">New Password</label>
              <input 
                id="newPassword" 
                type="password" 
                className="bg-admin-input-bg border border-admin-border rounded-lg px-3.5 py-2.5 text-admin-text text-sm w-full transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                placeholder="••••••••" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="bg-admin-sidebar text-admin-text border border-admin-border rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-admin-border transition-colors self-start mt-2">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
