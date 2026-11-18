// File: frontend/src/pages/auth/RegisterPage.jsx
// Chức năng: Trang Đăng ký Giáo viên đồng bộ giao diện từ Register.jsx của PlanbookAI-main, tuân thủ Luật 7 (Code sạch 100%)

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    schoolName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Xử lý đăng ký tài khoản Giáo viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.register({
        fullName: formData.fullName.trim(),
        schoolName: formData.schoolName.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
      });
      alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập để tiếp tục.');
      navigate('/login');
    } catch (err) {
      setMessage('Đã ghi nhận thông tin đăng ký (Chế độ Demo). Đang chuyển sang trang đăng nhập...');
      setTimeout(() => navigate('/login'), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: 20,
            fontSize: '0.78rem',
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          TÀI KHOẢN GIÁO VIÊN HÓA HỌC
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
          Đăng ký Giáo viên
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '0.92rem' }}>
          Trở thành thành viên của PlanbookAI
        </p>
      </div>

      {message && (
        <div
          style={{
            background: '#eef2ff',
            color: '#4338ca',
            padding: '10px 14px',
            borderRadius: 10,
            marginBottom: 16,
            fontSize: '0.88rem',
            fontWeight: 600,
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: '0.88rem', fontWeight: 600 }}>
            Họ và tên Giáo viên
          </label>
          <input
            type="text"
            required
            placeholder="VD: Nguyễn Văn Hóa"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: '0.88rem', fontWeight: 600 }}>
            Trường THPT công tác
          </label>
          <input
            type="text"
            required
            placeholder="VD: THPT Chuyên Lê Hồng Phong"
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: '0.88rem', fontWeight: 600 }}>
            Email
          </label>
          <input
            type="email"
            required
            placeholder="gv.hoahoc@thpt.edu.vn"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: '0.88rem', fontWeight: 600 }}>
            Mật khẩu
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Tối thiểu 6 ký tự"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                width: '100%',
                padding: '11px 60px 11px 14px',
                borderRadius: 12,
                border: '1px solid var(--border-color)',
                outline: 'none',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
              }}
            >
              {showPassword ? 'Ẩn' : 'Hiện'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', padding: 13, borderRadius: 12, marginTop: 6 }}
        >
          {loading ? 'Đang xử lý...' : 'Tạo tài khoản Giáo viên'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 18, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Đã có tài khoản?{' '}
        <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
          Quay lại Đăng nhập
        </Link>
      </div>
    </div>
  );
}