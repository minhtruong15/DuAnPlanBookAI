import prisma from '../config/database.js';
import { frameworkPromptRepository } from '../repositories/frameworkPromptRepository.js';
import { lessonPlanRepository } from '../repositories/lessonPlanRepository.js';

// LỚP 2 (SERVICE): Xử lý toàn bộ nghiệp vụ của Actor STAFF (Nhân viên xây dựng học liệu Hóa học)
export const staffService = {
  // 1. Lấy và tạo mới Giáo án mẫu Hóa học (Gửi chờ Manager duyệt)
  getSampleLessonPlans: async () => {
    return await lessonPlanRepository.findSampleLessonPlans();
  },

  createSampleLessonPlan: async (userId, { grade, topic, title, content }) => {
    return await lessonPlanRepository.createLessonPlan({
      userId: Number(userId),
      grade: Number(grade),
      topic,
      title,
      content,
      isSample: true,
      approvalStatus: 'PENDING',
    });
  },

  // 2. Lấy và tạo mới Câu hỏi Hóa học gốc trong Ngân hàng câu hỏi của Staff
  getStaffQuestions: async () => {
    return await prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  createStaffQuestion: async (creatorId, questionData) => {
    return await prisma.question.create({
      data: {
        creatorId: Number(creatorId),
        grade: Number(questionData.grade),
        topic: questionData.topic,
        difficulty: questionData.difficulty,
        content: questionData.content,
        optionA: questionData.optionA,
        optionB: questionData.optionB,
        optionC: questionData.optionC,
        optionD: questionData.optionD,
        correctAnswer: questionData.correctAnswer,
        explanation: questionData.explanation || '',
        approvalStatus: 'PENDING',
      },
    });
  },

  // 3. Lấy và tạo mới Mẫu câu lệnh Prompt AI
  getPromptTemplates: async () => {
    return await frameworkPromptRepository.findAllPrompts();
  },

  createPromptTemplate: async (promptData) => {
    return await frameworkPromptRepository.createPrompt(promptData);
  },
};