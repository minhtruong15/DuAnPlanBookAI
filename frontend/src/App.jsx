import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/guards/ProtectedRoute';

export default function App() {
  return (
    // Bọc AuthProvider ở ngoài cùng để mọi trang đều lấy được thông tin user
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Nhóm đường dẫn Công khai (Đăng nhập / Đăng ký) nằm trong khung AuthLayout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Chốt chặn kiểm tra quyền cho từng Actor (Tuần 2 sẽ gắn các trang thật vào đây) */}
          <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
            <Route path="/teacher/workspace" element={<div className="p-8 font-bold text-emerald-700">Đã vào Khu vực Teacher thành công! (Sẽ làm chi tiết ở Tuần 2)</div>} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['STAFF']} />}>
            <Route path="/staff/lesson-plans" element={<div className="p-8 font-bold text-blue-700">Đã vào Khu vực Staff thành công!</div>} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['MANAGER']} />}>
            <Route path="/manager/packages" element={<div className="p-8 font-bold text-amber-700">Đã vào Khu vực Manager thành công!</div>} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin/users" element={<div className="p-8 font-bold text-purple-700">Đã vào Khu vực Admin thành công!</div>} />
          </Route>

          {/* Mặc định khi vào trang gốc "/" sẽ chuyển hướng sang "/login" */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}