import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add JWT Authorization header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('ecodrop_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// API Endpoint functions
export const loginCitizenApi = (data) => API.post('/auth/login', data);
export const registerCitizenApi = (data) => API.post('/auth/register', data);
export const adminLoginApi = (data) => API.post('/auth/admin-login', data);
export const getProfileApi = () => API.get('/auth/profile');

export const getDropPointsApi = () => API.get('/droppoints');
export const getDropPointByIdApi = (id) => API.get(`/droppoints/${id}`);
export const scanQRCodeApi = (qrData) => API.post('/droppoints/scan', { qrData });
export const createDropPointApi = (data) => API.post('/droppoints', data);

export const analyzeEWasteImageApi = (formData) => API.post('/ai/classify', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const submitCollectionApi = (formData) => API.post('/collection', formData, {
  headers: formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
});
export const getCollectionsApi = () => API.get('/collection');
export const deleteCollectionApi = (id) => API.delete(`/collection/${id}`);

export const submitComplaintApi = (formData) => API.post('/complaint', formData, {
  headers: formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
});
export const getComplaintsApi = () => API.get('/complaint');
export const updateComplaintStatusApi = (id, data) => API.patch(`/complaint/${id}`, data);
export const deleteComplaintApi = (id) => API.delete(`/complaint/${id}`);

export const getDashboardDataApi = () => API.get('/dashboard');

export default API;
