import prisma from '../config/database.js';

// LỚP 3 (REPOSITORY): Giao tiếp trực tiếp với bảng WorkspaceFolder và LessonPlan trong MySQL
export const lessonPlanRepository = {
  // 1. Lấy danh sách thư mục Workspace cá nhân của một Giáo viên
  findFoldersByUser: async (userId) => {
    return await prisma.workspaceFolder.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: 'desc' },
    });
  },

  // 2. Tạo thư mục mới trong Workspace cá nhân của Giáo viên
  createFolder: async (userId, folderName) => {
    return await prisma.workspaceFolder.create({
      data: {
        userId: Number(userId),
        folderName,
      },
    });
  },

  // 3. Lấy danh sách Giáo án mẫu do Staff biên soạn (isSample = true)
  findSampleLessonPlans: async () => {
    return await prisma.lessonPlan.findMany({
      where: { isSample: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  // 4. Lấy danh sách Giáo án cá nhân của một Giáo viên
  findLessonPlansByTeacher: async (userId) => {
    return await prisma.lessonPlan.findMany({
      where: { userId: Number(userId), isSample: false },
      orderBy: { createdAt: 'desc' },
    });
  },

  // 5. Lưu Giáo án mới (Dùng cho cả Staff tạo giáo án mẫu và Teacher lưu giáo án AI)
  createLessonPlan: async (data) => {
    return await prisma.lessonPlan.create({
      data,
    });
  },
};