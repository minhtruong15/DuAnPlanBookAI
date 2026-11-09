import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import MainPortalLayout from './layouts/MainPortalLayout';
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

          {/* Khu vực của TEACHER: Được bảo vệ bởi ProtectedRoute và bọc trong khung MainPortalLayout */}
          <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
            <Route element={<MainPortalLayout />}>
              <Route path="/teacher/*" element={<div className="p-6 bg-white rounded-xl border border-slate-200 font-semibold text-emerald-700">🎉 Khung giao diện Teacher (7 menu bên trái) đã sẵn sàng!</div>} />
            </Route>
          </Route>

          {/* Khu vực của STAFF */}
          <Route element={<ProtectedRoute allowedRoles={['STAFF']} />}>
            <Route element={<MainPortalLayout />}>
              <Route path="/staff/*" element={<div className="p-6 bg-white rounded-xl border border-slate-200 font-semibold text-blue-700">🎉 Khung giao diện Staff (3 menu bên trái) đã sẵn sàng!</div>} />
            </Route>
          </Route>

          {/* Khu vực của MANAGER */}
          <Route element={<ProtectedRoute allowedRoles={['MANAGER']} />}>
            <Route element={<MainPortalLayout />}>
              <Route path="/manager/*" element={<div className="p-6 bg-white rounded-xl border border-slate-200 font-semibold text-amber-700">🎉 Khung giao diện Manager (3 menu bên trái) đã sẵn sàng!</div>} />
            </Route>
          </Route>

          {/* Khu vực của ADMIN */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route element={<MainPortalLayout />}>
              <Route path="/admin/*" element={<div className="p-6 bg-white rounded-xl border border-slate-200 font-semibold text-purple-700">🎉 Khung giao diện Admin (4 menu bên trái) đã sẵn sàng!</div>} />
            </Route>
          </Route>

          {/* Mặc định khi vào trang gốc "/" sẽ chuyển hướng sang "/login" */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}