import { staffService } from '../services/staffService.js';

// LỚP 1 (CONTROLLER): Tiếp nhận Request và trả về Response JSON cho phân hệ STAFF
export const staffController = {
  // GET & POST /api/staff/lesson-plans - Giáo án mẫu Hóa học
  getSampleLessonPlans: async (req, res) => {
    try {
      const plans = await staffService.getSampleLessonPlans();
      res.status(200).json({ lessonPlans: plans });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createSampleLessonPlan: async (req, res) => {
    try {
      const created = await staffService.createSampleLessonPlan(req.user.id, req.body);
      res.status(201).json({ message: 'Đã tạo giáo án mẫu và gửi chờ Manager duyệt.', lessonPlan: created });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // GET & POST /api/staff/questions - Ngân hàng câu hỏi gốc của Staff
  getQuestions: async (req, res) => {
    try {
      const questions = await staffService.getStaffQuestions();
      res.status(200).json({ questions });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createQuestion: async (req, res) => {
    try {
      const created = await staffService.createStaffQuestion(req.user.id, req.body);
      res.status(201).json({ message: 'Đã thêm câu hỏi Hóa học vào hàng đợi duyệt.', question: created });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // GET & POST /api/staff/prompts - Quản lý mẫu câu lệnh Prompt AI
  getPrompts: async (req, res) => {
    try {
      const prompts = await staffService.getPromptTemplates();
      res.status(200).json({ prompts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  savePrompt: async (req, res) => {
    try {
      const created = await staffService.createPromptTemplate(req.body);
      res.status(201).json({ message: 'Đã lưu mẫu Prompt AI và gửi chờ duyệt.', prompt: created });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};