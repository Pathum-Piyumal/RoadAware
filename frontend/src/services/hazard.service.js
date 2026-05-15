import api from './api';

const HazardService = {
  // Fetch hazards reported by the current user
  getMyHazards: async () => {
    const response = await api.get('/hazards/my-reports');
    return response.data;
  },

  // Fetch a single hazard by ID
  getHazardById: async (id) => {
    const response = await api.get(`/hazards/${id}`);
    return response.data;
  },

  // Upvote a hazard
  upvoteHazard: async (id) => {
    const response = await api.post(`/hazards/${id}/upvote`);
    return response.data;
  },

  // Fetch comments for a hazard
  getComments: async (hazardId) => {
    const response = await api.get(`/hazards/${hazardId}/comments`);
    return response.data;
  },

  // Add a new comment to a hazard
  addComment: async (hazardId, content) => {
    const response = await api.post(`/hazards/${hazardId}/comments`, { content });
    return response.data;
  },
};

export default HazardService;
