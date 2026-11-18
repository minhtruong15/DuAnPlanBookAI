import prisma from '../config/database.js';
import { packageOrderRepository } from '../repositories/packageOrderRepository.js';

// LỚP 2 (SERVICE): Xử lý toàn bộ nghiệp vụ của Actor MANAGER (Quản lý Gói cước, Đơn hàng & Duyệt nội dung)
export const managerService = {
  // 1. Quản lý Gói dịch vụ thuê bao
  getPackages: async () => {
    return await packageOrderRepository.findAllPackages();
  },

  createPackage: async (pkgData) => {
    return await packageOrderRepository.createPackage(pkgData);
  },

  // 2. Quản lý Đơn hàng và Kích hoạt cộng Credit AI cho Giáo viên
  getOrders: async () => {
    return await packageOrderRepository.findAllOrders();
  },

  confirmOrderPayment: async (orderId) => {
    const order = await packageOrderRepository.findOrderById(orderId);
    if (!order) {
      throw new Error('Không tìm thấy đơn hàng.');
    }

    // Cập nhật trạng thái đơn hàng thành PAID
    const updatedOrder = await packageOrderRepository.updateOrderStatus(orderId, 'PAID');

    // Tự động cộng thêm số lượt Credit AI của gói vào tài khoản Giáo viên
    if (order.package && order.package.aiCredits) {
      await prisma.user.update({
        where: { id: order.userId },
        data: {
          aiCredits: { increment: order.package.aiCredits },
        },
      });
    }

    return updatedOrder;
  },

  // 3. Phê duyệt hoặc Từ chối nội dung do Staff tạo (Giáo án mẫu, Câu hỏi, Prompt AI)
  approveStaffContent: async (id, { status, contentType = 'PROMPT' }) => {
    const validStatus = ['APPROVED', 'REJECTED', 'PENDING'];
    if (!validStatus.includes(status)) {
      throw new Error('Trạng thái phê duyệt không hợp lệ.');
    }

    if (contentType === 'LESSON_PLAN') {
      return await prisma.lessonPlan.update({
        where: { id: Number(id) },
        data: { approvalStatus: status },
      });
    }

    if (contentType === 'QUESTION') {
      return await prisma.question.update({
        where: { id: Number(id) },
        data: { approvalStatus: status },
      });
    }

    return await prisma.promptTemplate.update({
      where: { id: Number(id) },
      data: { approvalStatus: status },
    });
  },
};