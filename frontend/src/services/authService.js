// Nhập trạm kết nối trung tâm apiClient vừa tạo ở trên
import apiClient from './apiClient';

// Gom nhóm các hàm gọi API liên quan đến Xác thực tài khoản (Authentication)
export const authService = {
  // 1. Hàm gọi API Đăng nhập: gửi email và password xuống POST /api/auth/login
  login: async (email, password) => {
    return await apiClient.post('/auth/login', { email, password });
  },

  // 2. Hàm gọi API Đăng ký tài khoản Giáo viên mới: gửi thông tin xuống POST /api/auth/register
  register: async (userData) => {
    return await apiClient.post('/auth/register', userData);
  },

  // 3. Hàm lấy thông tin cá nhân của người đang đăng nhập: gọi GET /api/auth/me
  getProfile: async () => {
    return await apiClient.get('/auth/me');
  },
};