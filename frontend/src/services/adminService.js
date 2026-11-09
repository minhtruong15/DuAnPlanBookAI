import apiClient from './apiClient';

// Dịch vụ gọi API dành riêng cho Actor ADMIN
export const adminService = {
  // Lấy danh sách toàn bộ người dùng trong hệ thống
  getUsers: () => apiClient.get('/admin/users'),
  // Tạo mới hoặc cập nhật quyền (Role) của người dùng
  updateUserRole: (userId, role) => apiClient.put(`/admin/users/${userId}/role`, { role }),
  // Lấy thông số cấu hình hệ thống và doanh thu tổng quan
  getRevenueStats: () => apiClient.get('/admin/revenue'),
};