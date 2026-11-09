import apiClient from './apiClient';

// Dịch vụ gọi API dành riêng cho Actor MANAGER
export const managerService = {
  // Lấy danh sách các gói cước thuê bao (Gói Cơ bản, Gói Pro Hóa học, Gói Tổ bộ môn)
  getPackages: () => apiClient.get('/manager/packages'),
  // Tạo gói cước mới
  createPackage: (data) => apiClient.post('/manager/packages', data),
  // Lấy danh sách đơn hàng đăng ký của Giáo viên
  getOrders: () => apiClient.get('/manager/orders'),
  // Phê duyệt hoặc từ chối học liệu do Staff gửi lên
  approveContent: (id, status) => apiClient.put(`/manager/approvals/${id}`, { status }),
};