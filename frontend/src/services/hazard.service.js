import api from './api';

const HazardService = {
  // Fetch hazards reported by the current user
  getMyHazards: async () => {
    const response = await api.get('/reports/my');
    return response.data;
  },

  // Fetch all reports (for map/home)
  getAllReports: async () => {
    const response = await api.get('/reports');
    return response.data;
  },

  // Fetch map markers
  getMapMarkers: async () => {
    const response = await api.get('/reports/map');
    return response.data;
  },

  // Fetch a single hazard by ID
  getHazardById: async (id) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  // Upvote a hazard
  upvoteHazard: async (id) => {
    const response = await api.post(`/reports/${id}/upvote`);
    return response.data;
  },

  // Fetch comments for a hazard
  getComments: async (hazardId) => {
    const response = await api.get(`/reports/${hazardId}/comments`);
    return response.data;
  },

  // Add a new comment to a hazard
  addComment: async (hazardId, content) => {
    const response = await api.post(`/reports/${hazardId}/comments`, { content });
    return response.data;
  },

  // Submit a new hazard report with optional image
  createReport: async (formData) => {
    const response = await api.post('/reports', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Fetch all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

export default HazardService;
