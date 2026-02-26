import axios from 'axios';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});


// Request interceptor — attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — handle 401 / token refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/token/refresh/`, { refresh });
          localStorage.setItem('access_token', data.access);
          original.headers.Authorization = `Bearer ${data.access}`;
          return api(original);
        } catch {
          localStorage.clear();
          window.location.href = '/signin';
        }
      }
    }
    return Promise.reject(error);
  }
);

// ---- Auth ----
export const authAPI = {
  login: (data) => api.post('/api/auth/login/', data),
  register: (data) => api.post('/api/auth/register/', data),
  getProfile: () => api.get('/api/auth/profile/'),
  logout: (refresh) => api.post('/api/auth/logout/', { refresh }),
};


// ---- Courses ----
export const coursesAPI = {
  getAll: (params) => api.get('/api/courses/', { params }),
  getFeatured: () => api.get('/api/courses/featured/'),
  getBySlug: (slug) => api.get(`/api/courses/${slug}/`),
};

// ---- Services ----
export const servicesAPI = {
  getAll: () => api.get('/api/services/'),
  getFeatured: () => api.get('/api/services/featured/'),
  requestService: (slug, data) => api.post(`/api/services/${slug}/request_service/`, data),
};

// ---- Contact ----
export const contactAPI = {
  send: (data) => api.post('/api/contact/', data),
};

export default api;