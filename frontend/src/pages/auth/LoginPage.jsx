import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  // Khai báo các biến lưu nội dung người dùng gõ vào ô Email, Password và thông báo lỗi
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Lấy hàm login và loginAsDemoRole từ kho AuthContext
  const { login, loginAsDemoRole } = useAuth();
  // Công cụ chuyển hướng trang bằng code
  const navigate = useNavigate();

  // Hàm điều hướng người dùng về đúng trang chủ của từng Role sau khi đăng nhập
  const redirectByRole = (role) => {
    if (role === 'ADMIN') navigate('/admin/users');
    else if (role === 'MANAGER') navigate('/manager/packages');
    else if (role === 'STAFF') navigate('/staff/lesson-plans');
    else navigate('/teacher/workspace');
  };

  // Xử lý khi người dùng bấm nút "Đăng nhập" bằng tài khoản thật từ Backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt tự tải lại trang
    setError('');
    try {
      const loggedInUser = await login(email, password);
      redirectByRole(loggedInUser.role);
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại Email/Mật khẩu hoặc dùng nút Demo bên dưới.');
    }
  };

  // Xử lý khi bấm vào 1 trong 4 nút Đăng nhập nhanh theo Actor
  const handleQuickDemo = (role) => {
    const demoUser = loginAsDemoRole(role);
    redirectByRole(demoUser.role);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Đăng nhập hệ thống</h2>
      <p className="text-sm text-slate-500 mb-6">Chào mừng thầy/cô quay trở lại cổng PlanbookAI</p>

      {/* Hiển thị hộp cảnh báo đỏ nếu đăng nhập bị lỗi */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Form nhập Email và Mật khẩu */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email giáo viên / Quản trị</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teacher@planbookai.vn"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          Đăng nhập
        </button>
      </form>

      {/* Khu vực Đăng nhập nhanh 4 Actors phục vụ kiểm thử và bảo vệ đồ án */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">
          Trải nghiệm nhanh theo 4 Tác nhân (4 Actors)
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('TEACHER')}
            className="p-2 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100"
          >
            👨‍🏫 Vào vai Teacher
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('STAFF')}
            className="p-2 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100"
          >
            📝 Vào vai Staff
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('MANAGER')}
            className="p-2 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100"
          >
            💼 Vào vai Manager
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('ADMIN')}
            className="p-2 text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100"
          >
            🛡️ Vào vai Admin
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-600">
        Chưa có tài khoản Giáo viên?{' '}
        <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}