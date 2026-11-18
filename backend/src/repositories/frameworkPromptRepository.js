import prisma from '../config/database.js';

// LỚP 3 (REPOSITORY): Giao tiếp trực tiếp với bảng PromptTemplate và CurriculumFramework trong MySQL
export const frameworkPromptRepository = {
  // Lấy toàn bộ danh sách mẫu câu lệnh Prompt AI
  findAllPrompts: async () => {
    return await prisma.promptTemplate.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  // Tìm mẫu Prompt đã được phê duyệt (APPROVED) theo danh mục (LESSON_PLAN hoặc EXERCISE)
  findApprovedPromptByCategory: async (category) => {
    return await prisma.promptTemplate.findFirst({
      where: {
        category,
        approvalStatus: 'APPROVED',
      },
    });
  },

  // Tạo mới mẫu câu lệnh Prompt AI (Do Staff tạo, mặc định ở trạng thái PENDING chờ Manager duyệt)
  createPrompt: async ({ name, category, promptContent }) => {
    return await prisma.promptTemplate.create({
      data: {
        name,
        category,
        promptContent,
        approvalStatus: 'PENDING',
      },
    });
  },

  // Cập nhật trạng thái phê duyệt của Prompt AI (Dành cho Manager: APPROVED / REJECTED)
  updatePromptStatus: async (id, approvalStatus) => {
    return await prisma.promptTemplate.update({
      where: { id: Number(id) },
      data: { approvalStatus },
    });
  },
};