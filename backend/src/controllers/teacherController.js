import { lessonPlanRepository } from '../repositories/lessonPlanRepository.js';
import { aiLessonPlanService } from '../services/aiLessonPlanService.js';
import { questionExamService } from '../services/questionExamService.js';
import { ocrGradingService } from '../services/ocrGradingService.js';

// LỚP 1 (CONTROLLER): Tiếp nhận toàn bộ Request của Actor TEACHER (Giáo viên Hóa học THPT)
export const teacherController = {
  // 1. Quản lý Workspace cá nhân & Số hóa tài liệu giấy bằng OCR
  getWorkspace: async (req, res) => {
    try {
      const folders = await lessonPlanRepository.findFoldersByUser(req.user.id);
      const lessonPlans = await lessonPlanRepository.findLessonPlansByTeacher(req.user.id);
      res.status(200).json({ folders, lessonPlans });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createFolder: async (req, res) => {
    try {
      const folder = await lessonPlanRepository.createFolder(req.user.id, req.body.folderName);
      res.status(201).json({ message: 'Tạo thư mục học liệu thành công.', folder });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  digitizeDocumentOcr: async (req, res) => {
    try {
      const result = await ocrGradingService.digitizeDocument(req.file?.buffer, req.file?.mimetype);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 2. Soạn Giáo án Hóa học tự động bằng Gemini AI (Chuẩn Công văn 5512)
  generateLessonPlanAI: async (req, res) => {
    try {
      const result = await aiLessonPlanService.generateLessonPlan(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  saveLessonPlan: async (req, res) => {
    try {
      const saved = await aiLessonPlanService.saveTeacherLessonPlan(req.user.id, req.body);
      res.status(201).json({ message: 'Đã lưu Giáo án vào Workspace cá nhân.', lessonPlan: saved });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // 3. Tạo Bài tập Hóa học thông minh bằng Gemini AI
  generateExercisesAI: async (req, res) => {
    try {
      const result = await aiLessonPlanService.generateSmartExercises(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 4. Quản lý Ngân hàng câu hỏi Hóa học
  getQuestions: async (req, res) => {
    try {
      const questions = await questionExamService.getQuestions(req.query);
      res.status(200).json({ questions });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createQuestion: async (req, res) => {
    try {
      const created = await questionExamService.createQuestion(req.user.id, req.body);
      res.status(201).json({ message: 'Thêm câu hỏi Hóa học thành công.', question: created });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      await questionExamService.deleteQuestion(req.params.id);
      res.status(200).json({ message: 'Đã xóa câu hỏi khỏi Ngân hàng.' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // 5. Tạo & Trộn đề thi trắc nghiệm nhiều mã đề (101, 102, 103, 104)
  generateExamVersions: async (req, res) => {
    try {
      const result = await questionExamService.generateShuffledExams(req.user.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 6. Quét & Chấm phiếu trả lời trắc nghiệm bằng Gemini Vision OCR
  gradeAnswerSheetOcr: async (req, res) => {
    try {
      const result = await ocrGradingService.gradeAnswerSheet({
        studentName: req.body.studentName,
        examCode: req.body.examCode,
        fileBuffer: req.file?.buffer,
        mimeType: req.file?.mimetype,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 7. Thống kê điểm số & Phân tích học tập của học sinh
  getStudentAnalytics: async (req, res) => {
    try {
      const summary = await ocrGradingService.getStudentAnalyticsSummary();
      res.status(200).json(summary);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};