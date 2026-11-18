// File: frontend/src/pages/auth/LoginPage.jsx
// Chức năng: Trang Đăng nhập đồng bộ giao diện từ Login.jsx của PlanbookAI-main, tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginAsDemoRole } = useAuth();
  const navigate = useNavigate();

  // Điều hướng về đúng cổng của từng Role sau khi đăng nhập
  const redirectByRole = (role) => {
    if (role === 'ADMIN') navigate('/admin/revenue');
    else if (role === 'MANAGER') navigate('/manager/packages');
    else if (role === 'STAFF') navigate('/staff/lesson-plans');
    else navigate('/teacher/workspace');
  };

  // Xử lý đăng nhập chính thức
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loggedInUser = await login(email.trim(), password.trim());
      redirectByRole(loggedInUser.role);
    } catch (err) {
      setError(err.message || 'Email hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đăng nhập nhanh 4 vai trò phục vụ kiểm thử
  const handleQuickDemo = (role) => {
    const demoUser = loginAsDemoRole(role);
    redirectByRole(demoUser.role);
  };

  return (
    <div>
      {/* Tiêu đề trang Đăng nhập giống hệt PlanbookAI-main */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
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
          HỆ THỐNG GIÁO DỤC THPT HÓA HỌC
        </div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
          PlanbookAI
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '0.95rem' }}>
          Cổng công cụ AI Dành cho Giáo viên
        </p>
      </div>

      {/* Hộp báo lỗi */}
      {error && (
        <div
          style={{
            background: '#fee2e2',
            color: '#ef4444',
            padding: '10px 14px',
            borderRadius: 10,
            marginBottom: 18,
            fontSize: '0.88rem',
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      {/* Biểu mẫu Đăng nhập */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: '0.88rem', fontWeight: 600 }}>
            Email đăng nhập
          </label>
          <input
            type="email"
            required
            placeholder="VD: teacher@planbookai.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              outline: 'none',
              fontSize: '0.95rem',
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 60px 12px 14px',
                borderRadius: 12,
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontSize: '0.95rem',
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
          style={{
            width: '100%',
            padding: 13,
            borderRadius: 12,
            marginTop: 6,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}
        </button>
      </form>

      {/* Liên kết sang trang Đăng ký */}
      <div style={{ textAlign: 'center', marginTop: 18, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Chưa có tài khoản?{' '}
        <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
          Tạo tài khoản mới
        </Link>
      </div>

      {/* Khu vực truy cập nhanh 4 Actors phục vụ kiểm thử đồ án (Sạch 100%, không emoji) */}
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--border-color)' }}>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          Truy cập nhanh 4 Vai trò (Demo)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button
            type="button"
            onClick={() => handleQuickDemo('TEACHER')}
            style={{
              padding: '8px 10px',
              borderRadius: 10,
              border: '1px solid #bae6fd',
              background: '#e0f2fe',
              color: '#0369a1',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Vào vai Teacher
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('STAFF')}
            style={{
              padding: '8px 10px',
              borderRadius: 10,
              border: '1px solid #a7f3d0',
              background: '#ecfdf5',
              color: '#047857',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Vào vai Staff
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('MANAGER')}
            style={{
              padding: '8px 10px',
              borderRadius: 10,
              border: '1px solid #bfdbfe',
              background: '#eff6ff',
              color: '#1d4ed8',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Vào vai Manager
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('ADMIN')}
            style={{
              padding: '8px 10px',
              borderRadius: 10,
              border: '1px solid #fecaca',
              background: '#fef2f2',
              color: '#b91c1c',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Vào vai Admin
          </button>
        </div>
      </div>
    </div>
  );
}