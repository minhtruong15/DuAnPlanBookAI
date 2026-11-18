import express from 'express';
import { authController } from '../controllers/authController.js';
import { adminController } from '../controllers/adminController.js';
import { managerController } from '../controllers/managerController.js';
import { staffController } from '../controllers/staffController.js';
import { teacherController } from '../controllers/teacherController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/rbacMiddleware.js';
import { checkAiQuota } from '../middlewares/quotaMiddleware.js';
import { uploadOcrImage } from '../middlewares/uploadMiddleware.js';

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

// 4. Nhánh API Quản lý Gói cước, Đơn hàng & Duyệt nội dung (/api/manager/*) - Cho phép Role: MANAGER, ADMIN
router.get('/manager/packages', authenticateToken, authorizeRoles('MANAGER', 'ADMIN', 'TEACHER'), managerController.getPackages);
router.post('/manager/packages', authenticateToken, authorizeRoles('MANAGER', 'ADMIN'), managerController.createPackage);
router.get('/manager/orders', authenticateToken, authorizeRoles('MANAGER', 'ADMIN'), managerController.getOrders);
router.put('/manager/orders/:id/confirm', authenticateToken, authorizeRoles('MANAGER', 'ADMIN'), managerController.confirmOrder);
router.put('/manager/approvals/:id', authenticateToken, authorizeRoles('MANAGER', 'ADMIN'), managerController.approveContent);

// 5. Nhánh API Nhân viên Học liệu (/api/staff/*) - Cho phép Role: STAFF, MANAGER, ADMIN
router.get('/staff/lesson-plans', authenticateToken, authorizeRoles('STAFF', 'MANAGER', 'ADMIN'), staffController.getSampleLessonPlans);
router.post('/staff/lesson-plans', authenticateToken, authorizeRoles('STAFF', 'ADMIN'), staffController.createSampleLessonPlan);
router.get('/staff/questions', authenticateToken, authorizeRoles('STAFF', 'MANAGER', 'ADMIN'), staffController.getQuestions);
router.post('/staff/questions', authenticateToken, authorizeRoles('STAFF', 'ADMIN'), staffController.createQuestion);
router.get('/staff/prompts', authenticateToken, authorizeRoles('STAFF', 'MANAGER', 'ADMIN'), staffController.getPrompts);
router.post('/staff/prompts', authenticateToken, authorizeRoles('STAFF', 'ADMIN'), staffController.savePrompt);

// 6. Nhánh API Giáo viên Hóa học THPT (/api/teacher/*) - Cho phép Role: TEACHER, ADMIN
router.get('/teacher/workspace', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), teacherController.getWorkspace);
router.post('/teacher/workspace/folders', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), teacherController.createFolder);
router.post('/teacher/workspace/digitize-ocr', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), checkAiQuota, uploadOcrImage.single('documentImage'), teacherController.digitizeDocumentOcr);
router.post('/teacher/lesson-plans/generate', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), checkAiQuota, teacherController.generateLessonPlanAI);
router.post('/teacher/lesson-plans', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), teacherController.saveLessonPlan);
router.post('/teacher/exercises/generate', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), checkAiQuota, teacherController.generateExercisesAI);
router.get('/teacher/questions', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), teacherController.getQuestions);
router.post('/teacher/questions', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), teacherController.createQuestion);
router.delete('/teacher/questions/:id', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), teacherController.deleteQuestion);
router.post('/teacher/exams/generate', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), teacherController.generateExamVersions);
router.post('/teacher/ocr/grade', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), checkAiQuota, uploadOcrImage.single('answerSheet'), teacherController.gradeAnswerSheetOcr);
router.get('/teacher/analytics', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), teacherController.getStudentAnalytics);

export default router;