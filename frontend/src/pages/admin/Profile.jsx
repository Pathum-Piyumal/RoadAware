import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Camera } from 'lucide-react';
import '../../css/Profile.css';

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
    <div className="admin-profile-container">
      <div className="admin-profile-header">
        <h1 className="admin-profile-title">Your Profile</h1>
        <p className="admin-profile-subtitle">Manage your account settings and preferences.</p>
      </div>

      <div className="admin-profile-content">
        {/* Avatar Card */}
        <div className="admin-profile-card admin-profile-avatar-section">
          <div className="admin-profile-avatar-wrapper">
            <img
              className="admin-profile-avatar"
              src={profileImage}
              alt="Admin profile"
            />
            <label htmlFor="avatar-upload" className="admin-profile-avatar-upload-btn">
              <Camera size={16} />
            </label>
            <input 
              type="file" 
              id="avatar-upload" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handleImageUpload} 
            />
          </div>
          <h2 className="admin-profile-name">{name}</h2>
          <p className="admin-profile-role">System Administrator</p>
          
          <div className="admin-profile-divider"></div>
          
          <p className="admin-profile-subtitle" style={{ textAlign: 'left', width: '100%' }}>
            <strong>Joined:</strong> January 2026<br />
            <strong>Status:</strong> Active<br />
            <strong>Location:</strong> Headquarters
          </p>
        </div>

        {/* Profile Settings Card */}
        <div className="admin-profile-card">
          <form className="admin-profile-form" onSubmit={handleUpdateProfile}>
            <div className="admin-profile-form-group">
              <label className="admin-profile-label" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                className="admin-profile-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="admin-profile-form-group">
              <label className="admin-profile-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="admin-profile-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="admin-profile-form-group">
              <label className="admin-profile-label" htmlFor="role">Role</label>
              <input
                id="role"
                type="text"
                className="admin-profile-input"
                value="System Administrator"
                disabled
              />
            </div>

            <button type="submit" className="admin-profile-btn">
              Save Changes
            </button>
          </form>
          
          <div className="admin-profile-divider"></div>
          
          <h3 className="admin-profile-label" style={{ marginBottom: '1rem', color: '#fff', fontSize: '1rem' }}>Password Settings</h3>
          <form className="admin-profile-form" onSubmit={(e) => { e.preventDefault(); toast.success('Password change requested!'); }}>
            <div className="admin-profile-form-group">
              <label className="admin-profile-label" htmlFor="currentPassword">Current Password</label>
              <input id="currentPassword" type="password" className="admin-profile-input" placeholder="••••••••" required />
            </div>
            <div className="admin-profile-form-group">
              <label className="admin-profile-label" htmlFor="newPassword">New Password</label>
              <input id="newPassword" type="password" className="admin-profile-input" placeholder="••••••••" required />
            </div>
            <button type="submit" className="admin-profile-btn" style={{ backgroundColor: '#1f2937', color: '#fff', border: '1px solid #374151' }}>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
