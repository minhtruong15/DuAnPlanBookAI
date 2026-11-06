import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Component Chốt chặn bảo vệ đường dẫn theo danh sách quyền cho phép (allowedRoles)
export default function ProtectedRoute({ allowedRoles }) {
  // Lấy thông tin người dùng hiện tại từ kho AuthContext
  const { user, loading } = useAuth();

  // Trong lúc đang đọc dữ liệu từ trình duyệt thì hiển thị dòng chữ chờ
  if (loading) {
    return <div className="p-8 text-center text-slate-500">Đang kiểm tra quyền truy cập...</div>;
  }

  // Trường hợp 1: Chưa đăng nhập -> Bắt buộc chuyển hướng về trang /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Trường hợp 2: Đã đăng nhập nhưng Role không nằm trong danh sách được phép vào trang này
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Đưa người dùng về đúng trang mặc định của Role họ đang giữ
    const fallbackPath =
      user.role === 'ADMIN' ? '/admin/users' :
      user.role === 'MANAGER' ? '/manager/packages' :
      user.role === 'STAFF' ? '/staff/lesson-plans' :
      '/teacher/workspace';
    return <Navigate to={fallbackPath} replace />;
  }

  // Trường hợp 3: Hợp lệ 100% -> Cho phép hiển thị nội dung trang bên trong (<Outlet />)
  return <Outlet />;
}