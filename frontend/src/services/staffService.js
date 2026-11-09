import apiClient from './apiClient';

// Dịch vụ gọi API dành riêng cho Actor STAFF
export const staffService = {
  // Quản lý Giáo án mẫu Hóa học
  getSampleLessonPlans: () => apiClient.get('/staff/lesson-plans'),
  createSampleLessonPlan: (data) => apiClient.post('/staff/lesson-plans', data),
  // Quản lý Ngân hàng câu hỏi Hóa học gốc
  getQuestions: () => apiClient.get('/staff/questions'),
  createQuestion: (data) => apiClient.post('/staff/questions', data),
  // Quản lý danh sách mẫu câu lệnh Prompt AI
  getPrompts: () => apiClient.get('/staff/prompts'),
  savePrompt: (data) => apiClient.post('/staff/prompts', data),
};