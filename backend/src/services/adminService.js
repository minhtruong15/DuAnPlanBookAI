import prisma from '../config/database.js';
import { userRepository } from '../repositories/userRepository.js';

// Lưu cấu hình hệ thống trong bộ nhớ máy chủ (Có thể mở rộng lưu xuống bảng cấu hình riêng)
let systemConfigState = {
  aiModelName: 'gemini-2.5-flash',
  defaultFreeCredits: 50,
  maxOcrFileSizeMB: 5,
  ocrConfidenceThreshold: 85,
  maintenanceMode: false,
};

// LỚP 2 (SERVICE): Xử lý toàn bộ logic nghiệp vụ dành riêng cho Actor ADMIN
export const adminService = {
  // 1. Lấy danh sách toàn bộ người dùng trong hệ thống
  getAllUsers: async () => {
    return await userRepository.findAllUsers();
  },

  // 2. Thay đổi quyền (Role: ADMIN, MANAGER, STAFF, TEACHER) của người dùng
  changeUserRole: async (userId, role) => {
    const validRoles = ['ADMIN', 'MANAGER', 'STAFF', 'TEACHER'];
    if (!validRoles.includes(role)) {
      throw new Error('Quyền (Role) không hợp lệ.');
    }
    return await userRepository.updateRole(userId, role);
  },

  // 3. Khóa hoặc Mở khóa tài khoản người dùng
  toggleUserStatus: async (userId, isActive) => {
    return await userRepository.updateActiveStatus(userId, isActive);
  },

  // 4. Lấy và cập nhật thông số cấu hình hệ thống (SystemSettings)
  getSystemSettings: () => {
    return systemConfigState;
  },

  updateSystemSettings: (newSettings) => {
    systemConfigState = { ...systemConfigState, ...newSettings };
    return systemConfigState;
  },

  // 5. Lấy và tạo mới Khung chương trình Giáo án chuẩn (CurriculumFramework)
  getAllFrameworks: async () => {
    return await prisma.curriculumFramework.findMany({
      orderBy: { grade: 'asc' },
    });
  },

  createFramework: async ({ grade, title, structure }) => {
    return await prisma.curriculumFramework.create({
      data: {
        grade: Number(grade),
        subject: 'Hóa học',
        title,
        structure,
      },
    });
  },

  // 6. Thống kê tổng doanh thu và số liệu gói dịch vụ cho RevenueDashboard
  getRevenueDashboardStats: async () => {
    // Tính tổng tiền các đơn hàng đã thanh toán (PAID)
    const paidOrders = await prisma.subscriptionOrder.findMany({
      where: { status: 'PAID' },
    });

    const totalRevenue = paidOrders.reduce((sum, item) => sum + item.amountVND, 0);
    const activeTeachers = await prisma.user.count({
      where: { role: 'TEACHER', isActive: true },
    });

    return {
      totalRevenue,
      totalPaidOrders: paidOrders.length,
      activeTeachers,
    };
  },
};