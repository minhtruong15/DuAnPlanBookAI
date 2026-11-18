import { managerService } from '../services/managerService.js';

// LỚP 1 (CONTROLLER): Tiếp nhận Request và trả về Response JSON cho phân hệ MANAGER
export const managerController = {
  // GET & POST /api/manager/packages - Quản lý gói dịch vụ
  getPackages: async (req, res) => {
    try {
      const packages = await managerService.getPackages();
      res.status(200).json({ packages });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createPackage: async (req, res) => {
    try {
      const created = await managerService.createPackage(req.body);
      res.status(201).json({ message: 'Tạo gói dịch vụ mới thành công.', package: created });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // GET & PUT /api/manager/orders - Theo dõi và xác nhận đơn hàng
  getOrders: async (req, res) => {
    try {
      const orders = await managerService.getOrders();
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  confirmOrder: async (req, res) => {
    try {
      const updated = await managerService.confirmOrderPayment(req.params.id);
      res.status(200).json({ message: 'Đã xác nhận thanh toán và cộng Credit AI cho Giáo viên.', order: updated });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // PUT /api/manager/approvals/:id - Duyệt nội dung do Staff tạo
  approveContent: async (req, res) => {
    try {
      const updated = await managerService.approveStaffContent(req.params.id, req.body);
      res.status(200).json({ message: 'Đã cập nhật trạng thái kiểm duyệt nội dung.', data: updated });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};