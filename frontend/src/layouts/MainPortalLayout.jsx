// File: frontend/src/layouts/MainPortalLayout.jsx
// Chức năng: Khung Portal chính đồng bộ 100% bố cục 4 màu Gradient Sidebar, Top Header Avatar Dropdown & Modal Hồ sơ Cá nhân từ PlanbookAI-main
// Tuân thủ Luật 7 (Code sạch 100%, không icon, không emoji) và khớp chính xác đường dẫn Route trong App.jsx

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/constants';

const MainPortalLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State đóng mở Menu thả xuống ở Avatar và Cửa sổ Modal Hồ sơ Cá nhân
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef(null);

  const currentRole = user?.role || ROLES.TEACHER;
  const fullName = user?.fullName || 'Người dùng PlanbookAI';
  const email = user?.email || 'teacher@planbookai.vn';
  const isVip = currentRole === ROLES.TEACHER;

  // Đóng Dropdown khi người dùng bấm ra ngoài vùng Avatar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cấu hình giao diện màu Gradient Sidebar & Tiêu đề Header riêng cho từng Role giống hệt PlanbookAI-main
  const themeByRole = {
    [ROLES.TEACHER]: {
      sidebarBg: 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%)',
      brandTitle: 'GIÁO VIÊN 4.0',
      brandSub: 'Môn Hóa học THPT',
      headerTitle: 'Không gian Làm việc & Giảng dạy',
      avatarBg: isVip ? 'linear-gradient(135deg, #f59e0b, #ea580c)' : '#e0e7ff',
      avatarColor: isVip ? '#ffffff' : '#4f46e5',
      roleLabel: 'Giáo viên (Teacher)',
      roleBadgeStyle: { background: '#eff6ff', color: '#3b82f6' },
    },
    [ROLES.ADMIN]: {
      sidebarBg: 'linear-gradient(180deg, #7f1d1d 0%, #991b1b 100%)',
      brandTitle: 'Admin Portal',
      brandSub: 'Quản trị Hệ thống',
      headerTitle: 'Khu vực Dành riêng cho Quản trị viên cấp cao',
      avatarBg: '#fca5a5',
      avatarColor: '#991b1b',
      roleLabel: 'Quản trị Hệ thống (Admin)',
      roleBadgeStyle: { background: '#fee2e2', color: '#ef4444' },
    },
    [ROLES.MANAGER]: {
      sidebarBg: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)',
      brandTitle: 'Manager Portal',
      brandSub: 'Vận hành & Duyệt bài',
      headerTitle: 'Quản lý Kinh doanh & Vận hành',
      avatarBg: '#bfdbfe',
      avatarColor: '#1e40af',
      roleLabel: 'Quản trị viên (Manager)',
      roleBadgeStyle: { background: '#ede9fe', color: '#8b5cf6' },
    },
    [ROLES.STAFF]: {
      sidebarBg: 'linear-gradient(180deg, #064e3b 0%, #065f46 100%)',
      brandTitle: 'Staff Portal',
      brandSub: 'Biên soạn Học liệu',
      headerTitle: 'Sáng tạo Nội dung & Ngân hàng dữ liệu',
      avatarBg: '#a7f3d0',
      avatarColor: '#065f46',
      roleLabel: 'Nhân viên (Staff)',
      roleBadgeStyle: { background: '#ecfdf5', color: '#10b981' },
    },
  };

  const activeTheme = themeByRole[currentRole] || themeByRole[ROLES.TEACHER];

  // Danh sách Menu khớp chính xác 100% với Route đã khai báo trong App.jsx
  const menuByRole = {
    [ROLES.TEACHER]: [
      { path: '/teacher/workspace', label: 'Tổng quan & Gói dịch vụ' },
      { path: '/teacher/lesson-plan-ai', label: 'Giáo án Cá nhân & AI 5512' },
      { path: '/teacher/exercise-creator', label: 'Tạo Bài tập Hóa học' },
      { path: '/teacher/exam-generator', label: 'Đề kiểm tra & Ma trận' },
      { path: '/teacher/ocr-grading', label: 'Quản lý Chấm điểm OCR' },
      { path: '/teacher/analytics', label: 'Phổ điểm lớp & Học sinh' },
      { path: '/teacher/question-bank', label: 'Ngân hàng Câu hỏi' },
    ],
    [ROLES.ADMIN]: [
      { path: '/admin/revenue', label: 'Tổng quan & Doanh thu' },
      { path: '/admin/users', label: 'Quản lý Người dùng' },
      { path: '/admin/settings', label: 'Cấu hình Hệ thống' },
      { path: '/admin/frameworks', label: 'Khung chương trình 5512' },
    ],
    [ROLES.MANAGER]: [
      { path: '/manager/packages', label: 'Quản lý Gói dịch vụ' },
      { path: '/manager/orders', label: 'Đơn hàng & Đăng ký' },
      { path: '/manager/approvals', label: 'Phê duyệt Nội dung' },
    ],
    [ROLES.STAFF]: [
      { path: '/staff/lesson-plans', label: 'Giáo án Mẫu 5512' },
      { path: '/staff/questions', label: 'Ngân hàng Câu hỏi' },
      { path: '/staff/prompts', label: 'Quản lý Prompt AI' },
    ],
  };

  const navItems = menuByRole[currentRole] || menuByRole[ROLES.TEACHER];

  // Hàm lấy 2 chữ cái đầu của Họ tên để hiển thị trong Avatar tròn giống Header.jsx cũ
  const getAvatarInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    setShowDropdown(false);
    setShowProfileModal(false);
    logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      {/* THANH SIDEBAR GRADIENT THEO TỪNG VAI TRÒ */}
      <aside className="sidebar" style={{ background: activeTheme.sidebarBg }}>
        <div>
          <div className="sidebar-logo">
            <div>{activeTheme.brandTitle}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.85, marginTop: 4 }}>
              {activeTheme.brandSub}
            </div>
          </div>

          <nav className="sidebar-menu">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '0.78rem',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          PlanbookAI THPT • Phiên bản 2.0
        </div>
      </aside>

      {/* KHU VỰC NỘI DUNG BÊN PHẢI */}
      <div className="main-content-wrapper">
        {/* THANH HEADER TRÊN CÙNG GIỐNG HỆT HEADER.JSX BẢN CŨ */}
        <header className="top-header">
          <div style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {activeTheme.headerTitle}
          </div>

          {/* Khu vực Avatar tròn + Huy hiệu VIP + Menu thả xuống */}
          <div
            ref={dropdownRef}
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ position: 'relative', cursor: 'pointer', padding: 4 }}
          >
            <div style={{ position: 'relative' }}>
              <div
                className="avatar"
                title={fullName}
                style={{
                  background: activeTheme.avatarBg,
                  color: activeTheme.avatarColor,
                  boxShadow: isVip
                    ? '0 0 15px rgba(245, 158, 11, 0.45)'
                    : '0 4px 10px rgba(0,0,0,0.06)',
                  border: isVip ? '2px solid #ffffff' : 'none',
                }}
              >
                {getAvatarInitials(fullName)}
              </div>

              {isVip && (
                <div
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -10,
                    background: '#f59e0b',
                    color: '#ffffff',
                    fontSize: '0.62rem',
                    padding: '2px 6px',
                    borderRadius: 10,
                    fontWeight: 900,
                    border: '2px solid #ffffff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  VIP
                </div>
              )}
            </div>

            {/* Menu thả xuống khi bấm vào Avatar */}
            {showDropdown && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
                  borderRadius: 16,
                  padding: '8px 0',
                  minWidth: 240,
                  zIndex: 100,
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '12px 20px',
                    borderBottom: '1px solid var(--border-color)',
                    marginBottom: 6,
                    background: '#f8fafc',
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                    {fullName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {email}
                  </div>
                  {isVip && (
                    <div
                      style={{
                        marginTop: 8,
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: 12,
                      }}
                    >
                      Thành viên VIP
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setShowProfileModal(true);
                  }}
                  style={{
                    width: '100%',
                    padding: '11px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  Hồ sơ cá nhân
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '11px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#ef4444',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  Đăng xuất khỏi hệ thống
                </button>
              </div>
            )}
          </div>
        </header>

        {/* NỘI DUNG CÁC TRANG CON */}
        <main className="page-container" style={{ width: '100%' }}>
          <Outlet />
        </main>
      </div>

      {/* CỬA SỔ MODAL HỒ SƠ CÁ NHÂN (ĐỒNG BỘ TỪ USERPROFILEMODAL.JSX CŨ) */}
      {showProfileModal && (
        <div
          onClick={() => setShowProfileModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 24,
              width: '100%',
              maxWidth: 460,
              padding: 32,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                Hồ sơ cá nhân
              </h2>
              <button
                onClick={() => setShowProfileModal(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: 10,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: '#475569',
                }}
              >
                Đóng
              </button>
            </div>

            {/* Khối Avatar lớn căn giữa giống hệt UserProfileModal.jsx */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: activeTheme.avatarBg,
                  color: activeTheme.avatarColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  marginBottom: 14,
                  boxShadow: isVip
                    ? '0 0 25px rgba(245, 158, 11, 0.45)'
                    : '0 10px 15px -3px rgba(79, 70, 229, 0.25)',
                }}
              >
                {getAvatarInitials(fullName)}
              </div>

              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>{fullName}</div>

              <div
                style={{
                  marginTop: 8,
                  padding: '4px 14px',
                  borderRadius: 20,
                  background: activeTheme.roleBadgeStyle.background,
                  color: activeTheme.roleBadgeStyle.color,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                }}
              >
                {activeTheme.roleLabel}
              </div>
            </div>

            {/* Chi tiết thông tin tài khoản */}
            <div
              style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: 18,
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                fontSize: '0.9rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Địa chỉ Email</div>
                <div style={{ fontWeight: 700, color: '#1e293b' }}>{email}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Đơn vị chuyên môn</div>
                <div style={{ fontWeight: 700, color: '#1e293b' }}>Tổ Hóa học THPT - Chương trình GDPT 2018</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Trạng thái tài khoản</div>
                <div style={{ fontWeight: 700, color: '#10b981' }}>Đang hoạt động (Active)</div>
              </div>
              {isVip && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Gói Dịch vụ & Hạn mức AI</div>
                  <div style={{ fontWeight: 700, color: '#d97706' }}>
                    Gói Vàng - Pro Hóa học ({user?.aiCredits || 480} Credits)
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <button
                onClick={() => setShowProfileModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 12,
                  background: '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Đóng cửa sổ
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '12px 18px',
                  borderRadius: 12,
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPortalLayout;