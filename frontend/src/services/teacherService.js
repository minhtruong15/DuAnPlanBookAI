import apiClient from './apiClient';

// Dịch vụ gọi RESTful API dành riêng cho Actor TEACHER (Giáo viên Hóa học THPT)
export const teacherService = {
  // 1. Quản lý Workspace cá nhân & Số hóa tài liệu giấy bằng OCR
  getWorkspaceData: () => apiClient.get('/teacher/workspace'),
  createFolder: (folderName) => apiClient.post('/teacher/workspace/folders', { folderName }),
  digitizeDocumentOcr: (formData) =>
    apiClient.post('/teacher/workspace/digitize-ocr', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // 2. Tạo Giáo án Hóa học tự động bằng Gemini AI (Chuẩn Công văn 5512)
  generateLessonPlanAI: (payload) => apiClient.post('/teacher/lesson-plans/generate', payload),
  saveLessonPlan: (payload) => apiClient.post('/teacher/lesson-plans', payload),

  // 3. Tạo Bài tập Hóa học thông minh bằng Gemini AI (Trắc nghiệm, Điền từ, Trả lời ngắn)
  generateExercisesAI: (payload) => apiClient.post('/teacher/exercises/generate', payload),

  // 4. Quản lý Ngân hàng câu hỏi Hóa học (Sẽ nối ở Tuần 3)
  getQuestions: (params) => apiClient.get('/teacher/questions', { params }),
  createQuestion: (data) => apiClient.post('/teacher/questions', data),
  deleteQuestion: (id) => apiClient.delete(`/teacher/questions/${id}`),

  // 5. Tạo & Trộn nhiều mã đề thi trắc nghiệm (101, 102, 103, 104)
  generateExamVersions: (payload) => apiClient.post('/teacher/exams/generate', payload),

  // 6. Quét & Chấm phiếu trả lời trắc nghiệm bằng Gemini Vision OCR
  gradeAnswerSheetOcr: (formData) =>
    apiClient.post('/teacher/ocr/grade', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // 7. Thống kê kết quả & Phân tích học tập của học sinh
  getStudentAnalytics: () => apiClient.get('/teacher/analytics'),
};