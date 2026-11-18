import { adminService } from '../services/adminService.js';

// LỚP 1 (CONTROLLER): Tiếp nhận Request và trả về Response JSON cho phân hệ ADMIN
export const adminController = {
  // GET /api/admin/users - Lấy danh sách người dùng
  getUsers: async (req, res) => {
    try {
      const users = await adminService.getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // PUT /api/admin/users/:id/role - Cập nhật Role cho người dùng
  updateUserRole: async (req, res) => {
    try {
      const updated = await adminService.changeUserRole(req.params.id, req.body.role);
      res.status(200).json({ message: 'Cập nhật phân quyền thành công.', user: updated });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // PUT /api/admin/users/:id/status - Khóa / Mở khóa tài khoản
  updateUserStatus: async (req, res) => {
    try {
      const updated = await adminService.toggleUserStatus(req.params.id, req.body.isActive);
      res.status(200).json({ message: 'Cập nhật trạng thái tài khoản thành công.', user: updated });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // GET & PUT /api/admin/settings - Cấu hình hệ thống
  getSettings: (req, res) => {
    res.status(200).json(adminService.getSystemSettings());
  },

  updateSettings: (req, res) => {
    const updated = adminService.updateSystemSettings(req.body);
    res.status(200).json({ message: 'Lưu cấu hình hệ thống thành công.', settings: updated });
  },

  // GET & POST /api/admin/frameworks - Quản lý Khung chương trình Hóa học
  getFrameworks: async (req, res) => {
    try {
      const frameworks = await adminService.getAllFrameworks();
      res.status(200).json({ frameworks });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createFramework: async (req, res) => {
    try {
      const created = await adminService.createFramework(req.body);
      res.status(201).json({ message: 'Thêm khung chương trình thành công.', framework: created });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // GET /api/admin/revenue - Thống kê doanh thu tổng quan
  getRevenueStats: async (req, res) => {
    try {
      const stats = await adminService.getRevenueDashboardStats();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};