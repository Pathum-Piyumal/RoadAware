import api from './api';

const CareersService = {
  applyJob: async (formData) => {
    const response = await api.post('/careers/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default CareersService;
