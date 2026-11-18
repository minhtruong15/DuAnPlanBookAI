import prisma from '../config/database.js';

// LỚP 3 (REPOSITORY): Giao tiếp trực tiếp với bảng Package và SubscriptionOrder trong MySQL
export const packageOrderRepository = {
  // 1. Lấy danh sách toàn bộ các gói dịch vụ đang mở bán
  findAllPackages: async () => {
    return await prisma.package.findMany({
      orderBy: { priceVND: 'asc' },
    });
  },

  // 2. Tạo mới một gói dịch vụ thuê bao
  createPackage: async ({ name, priceVND, aiCredits, durationDays }) => {
    return await prisma.package.create({
      data: {
        name,
        priceVND: Number(priceVND),
        aiCredits: Number(aiCredits),
        durationDays: Number(durationDays || 30),
        isActive: true,
      },
    });
  },

  // 3. Lấy danh sách toàn bộ đơn hàng đăng ký gói cước kèm thông tin Giáo viên và Gói
  findAllOrders: async () => {
    return await prisma.subscriptionOrder.findMany({
      include: {
        user: { select: { id: true, fullName: true, email: true, schoolName: true } },
        package: { select: { id: true, name: true, aiCredits: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  // 4. Tìm chi tiết 1 đơn hàng theo ID
  findOrderById: async (orderId) => {
    return await prisma.subscriptionOrder.findUnique({
      where: { id: Number(orderId) },
      include: { package: true },
    });
  },

  // 5. Cập nhật trạng thái đơn hàng (PENDING -> PAID / CANCELLED)
  updateOrderStatus: async (orderId, status) => {
    return await prisma.subscriptionOrder.update({
      where: { id: Number(orderId) },
      data: { status },
    });
  },
};