import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function RegisterPage() {
  // Lưu dữ liệu biểu mẫu đăng ký dành cho Giáo viên Hóa học mới
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    schoolName: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Xử lý khi bấm nút "Đăng ký tài khoản"
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      alert('Đăng ký tài khoản Giáo viên thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err) {
      setMessage(err.message || 'Đã ghi nhận thông tin đăng ký (Chế độ Demo). Chuyển sang trang đăng nhập...');
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Đăng ký tài khoản Giáo viên</h2>
      <p className="text-sm text-slate-500 mb-6">Nhận ngay Workspace cá nhân & 50 Credit AI miễn phí</p>

      {message && (
        <div className="mb-4 p-3 bg-indigo-50 text-indigo-700 text-sm rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên Giáo viên</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Nguyễn Văn A"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Trường THPT công tác</label>
          <input
            type="text"
            required
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
            placeholder="THPT Chuyên Lê Hồng Phong"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="gv.hoahoc@thpt.edu.vn"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Tối thiểu 6 ký tự"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          Tạo tài khoản Giáo viên
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Đã có tài khoản?{' '}
        <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
          Quay lại Đăng nhập
        </Link>
      </p>
    </div>
  );
}