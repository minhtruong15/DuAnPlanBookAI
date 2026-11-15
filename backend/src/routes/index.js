import express from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 1. Đường dẫn kiểm tra trạng thái hoạt động của máy chủ Backend
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'PlanbookAI (PBA) Backend RESTful API',
    timestamp: new Date().toISOString(),
  });
});

// 2. Nhánh API Xác thực tài khoản (/api/auth/*)
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authenticateToken, authController.getProfile);

export default router;