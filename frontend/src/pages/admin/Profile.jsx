import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Camera } from 'lucide-react';

const Profile = () => {
  const [name, setName] = useState('Admin User');
  const [email, setEmail] = useState('admin@roadaware.com');
  const [profileImage, setProfileImage] = useState('https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff&size=150');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      toast.success('Profile image updated successfully!');
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
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
            <strong className="text-admin-text">Joined:</strong> January 2026<br />
            <strong className="text-admin-text">Status:</strong> Active<br />
            <strong className="text-admin-text">Location:</strong> Headquarters
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
                className="bg-admin-input-bg border border-admin-border rounded-lg px-3.5 py-2.5 text-admin-text text-sm w-full transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-admin-sidebar-active disabled:text-admin-text-muted disabled:cursor-not-allowed"
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
                className="bg-admin-input-bg border border-admin-border rounded-lg px-3.5 py-2.5 text-admin-text text-sm w-full transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-admin-sidebar-active disabled:text-admin-text-muted disabled:cursor-not-allowed"
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
                value="System Administrator"
                disabled
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white border-none rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-blue-600 transition-colors self-start mt-2">
              Save Changes
            </button>
          </form>
          
          <div className="h-px bg-admin-border my-6 w-full"></div>
          
          <h3 className="text-base font-semibold text-admin-text mb-4 mt-0">Password Settings</h3>
          <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); toast.success('Password change requested!'); }}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text-muted" htmlFor="currentPassword">Current Password</label>
              <input id="currentPassword" type="password" className="bg-admin-input-bg border border-admin-border rounded-lg px-3.5 py-2.5 text-admin-text text-sm w-full transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-admin-sidebar-active disabled:text-admin-text-muted disabled:cursor-not-allowed" placeholder="••••••••" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text-muted" htmlFor="newPassword">New Password</label>
              <input id="newPassword" type="password" className="bg-admin-input-bg border border-admin-border rounded-lg px-3.5 py-2.5 text-admin-text text-sm w-full transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-admin-sidebar-active disabled:text-admin-text-muted disabled:cursor-not-allowed" placeholder="••••••••" required />
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
