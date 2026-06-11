import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: BASE_URL,
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
          const { data } = await axios.post(`${BASE_URL}/api/auth/token/refresh/`, { refresh });
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

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  login:      (data)    => api.post('/api/auth/login/', data),
  register:   (data)    => api.post('/api/auth/register/', data),
  getProfile: ()        => api.get('/api/auth/profile/'),
  logout:     (refresh) => api.post('/api/auth/logout/', { refresh }),
};

// ── Courses (public) ──────────────────────────────────────────────────────────
export const coursesAPI = {
  getAll:     (params) => api.get('/api/courses/', { params }),
  getFeatured: ()      => api.get('/api/courses/featured/'),
  getBySlug:  (slug)   => api.get(`/api/courses/${slug}/`),
};

// ── Services (public) ─────────────────────────────────────────────────────────
export const servicesAPI = {
  getAll:         ()           => api.get('/api/services/'),
  getFeatured:    ()           => api.get('/api/services/featured/'),
  requestService: (slug, data) => api.post(`/api/services/${slug}/request_service/`, data),
};

// ── Contact ───────────────────────────────────────────────────────────────────
export const contactAPI = {
  send: (data) => api.post('/api/contact/', data),
};

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminAPI = {
  // Users
  listUsers: () => api.get('/api/auth/admin/users/'),

  // Courses — note: getAllCourses uses the admin endpoint to see ALL (incl. inactive)
  getAllCourses: () => api.get('/api/courses/admin/create/'),

  // createCourse accepts FormData (for PDF upload)
  createCourse: (formData) =>
    api.post('/api/courses/admin/create/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // updateCourse accepts FormData or plain object (partial update)
  updateCourse: (slug, data) => {
    const isFormData = data instanceof FormData;
    return api.patch(`/api/courses/admin/${slug}/update/`, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
  },

  deleteCourse: (slug) => api.delete(`/api/courses/admin/${slug}/delete/`),

  // Services
  getAllServices: () => api.get('/api/services/admin/create/'),

  createService: (data) => api.post('/api/services/admin/create/', data),

  updateService: (slug, data) => api.patch(`/api/services/admin/${slug}/update/`, data),

  deleteService: (slug) => api.delete(`/api/services/admin/${slug}/delete/`),

  // Extras
  getContactMessages: () => api.get('/api/contact/'),
  getServiceRequests: () => api.get('/api/services/requests/'),
  getAllCategories:    () => api.get('/api/courses/categories/'),
};

export default api;