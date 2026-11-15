// Chốt chặn số 2: Phân quyền dựa trên vai trò (RBAC - Role-Based Access Control)
// allowedRoles: Mảng các quyền được phép vào (Ví dụ: ['ADMIN', 'MANAGER'])
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Kiểm tra xem req.user đã có chưa và role của họ có nằm trong danh sách cho phép không
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Từ chối truy cập! Chức năng này chỉ dành cho quyền: ${allowedRoles.join(', ')}`,
      });
    }
    // Nếu đúng quyền -> Cho phép đi tiếp vào Controller
    next();
  };
};