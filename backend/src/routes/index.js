import express from 'express';
import { authController } from '../controllers/authController.js';
import { adminController } from '../controllers/adminController.js';
import { staffController } from '../controllers/staffController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/rbacMiddleware.js';

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

// 3. Nhánh API Quản trị Hệ thống (/api/admin/*) - Chỉ cho phép Role: ADMIN
router.get('/admin/users', authenticateToken, authorizeRoles('ADMIN'), adminController.getUsers);
router.put('/admin/users/:id/role', authenticateToken, authorizeRoles('ADMIN'), adminController.updateUserRole);
router.put('/admin/users/:id/status', authenticateToken, authorizeRoles('ADMIN'), adminController.updateUserStatus);
router.get('/admin/settings', authenticateToken, authorizeRoles('ADMIN'), adminController.getSettings);
router.put('/admin/settings', authenticateToken, authorizeRoles('ADMIN'), adminController.updateSettings);
router.get('/admin/frameworks', authenticateToken, authorizeRoles('ADMIN'), adminController.getFrameworks);
router.post('/admin/frameworks', authenticateToken, authorizeRoles('ADMIN'), adminController.createFramework);
router.get('/admin/revenue', authenticateToken, authorizeRoles('ADMIN'), adminController.getRevenueStats);

// 4. Nhánh API Nhân viên Học liệu (/api/staff/*) - Cho phép Role: STAFF, MANAGER, ADMIN
router.get('/staff/lesson-plans', authenticateToken, authorizeRoles('STAFF', 'MANAGER', 'ADMIN'), staffController.getSampleLessonPlans);
router.post('/staff/lesson-plans', authenticateToken, authorizeRoles('STAFF', 'ADMIN'), staffController.createSampleLessonPlan);
router.get('/staff/questions', authenticateToken, authorizeRoles('STAFF', 'MANAGER', 'ADMIN'), staffController.getQuestions);
router.post('/staff/questions', authenticateToken, authorizeRoles('STAFF', 'ADMIN'), staffController.createQuestion);
router.get('/staff/prompts', authenticateToken, authorizeRoles('STAFF', 'MANAGER', 'ADMIN'), staffController.getPrompts);
router.post('/staff/prompts', authenticateToken, authorizeRoles('STAFF', 'ADMIN'), staffController.savePrompt);

export default router;