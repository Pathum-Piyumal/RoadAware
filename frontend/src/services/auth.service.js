import api from './api';

const AuthService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      if (response.data.user && response.data.user.role === 'admin') {
        // Clear citizen session
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('adminUser');
        
        // Save admin session in sessionStorage
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('adminUser', JSON.stringify(response.data.user));
      } else {
        // Clear admin session
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('adminUser');
        localStorage.removeItem('adminUser');
        
        // Save citizen session in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    if (response.data.token) {
      localStorage.removeItem('adminUser');
      sessionStorage.removeItem('adminUser');
      sessionStorage.removeItem('token');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('adminUser');
  },

  adminLogin: async (email, password) => {
    const response = await api.post('/auth/admin/login', { email, password });
    if (response.data.token) {
      // Clear citizen session
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('adminUser');
      
      // Save admin session in sessionStorage
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('adminUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  adminLogout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('adminUser');
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('user');
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  getCurrentAdmin: () => {
    // Clear any legacy admin session from localStorage if present
    if (localStorage.getItem('adminUser')) {
      localStorage.removeItem('adminUser');
    }
    const adminUserStr = sessionStorage.getItem('adminUser');
    if (adminUserStr) {
      try {
        const adminUser = JSON.parse(adminUserStr);
        if (adminUser && typeof adminUser === 'object' && adminUser.id && adminUser.role === 'admin') {
          return adminUser;
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  },
};

export default AuthService;
