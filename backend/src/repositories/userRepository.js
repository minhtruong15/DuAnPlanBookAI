import prisma from '../config/database.js';

// LỚP 3 (REPOSITORY): Chuyên trách giao tiếp trực tiếp với bảng User trong MySQL
export const userRepository = {
  // Tìm tài khoản người dùng theo địa chỉ Email
  findByEmail: async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  },

  // Tìm tài khoản người dùng theo ID
  findById: async (id) => {
    return await prisma.user.findUnique({ where: { id: Number(id) } });
  },

  // Tạo mới một tài khoản trong bảng User
  createUser: async (userData) => {
    return await prisma.user.create({ data: userData });
  },

  // Lấy toàn bộ danh sách người dùng (Phục vụ cho trang Quản lý User của Admin)
  findAllUsers: async () => {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        schoolName: true,
        aiCredits: true,
        isActive: true,
        createdAt: true,
      },
    });
  },

  // Cập nhật quyền (Role) của người dùng
  updateRole: async (id, role) => {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: { role },
    });
  },

  // Cập nhật trạng thái Khóa / Mở khóa tài khoản (isActive)
  updateActiveStatus: async (id, isActive) => {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: { isActive: Boolean(isActive) },
    });
  },
};