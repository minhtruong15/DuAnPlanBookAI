import { authService } from '../services/authService.js';
import { userRepository } from '../repositories/userRepository.js';

// LỚP 1 (CONTROLLER): Tiếp nhận HTTP Request từ Frontend và trả về HTTP Response (JSON)
export const authController = {
  // Xử lý API: POST /api/auth/register
  register: async (req, res, next) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ message: 'Đăng ký tài khoản thành công!', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Xử lý API: POST /api/auth/login
  login: async (req, res, next) => {
    try {
      const result = await authService.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  // Xử lý API: GET /api/auth/me (Lấy thông tin cá nhân của người đang đăng nhập)
  getProfile: async (req, res) => {
    try {
      const user = await userRepository.findById(req.user.id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};