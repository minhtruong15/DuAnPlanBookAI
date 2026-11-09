import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Danh sách Menu bên trái được cấu hình riêng biệt cho từng Actor theo đúng Đề cương
const MENU_BY_ROLE = {
  TEACHER: [
    { path: '/teacher/workspace', label: '📁 Workspace & Số hóa OCR' },
    { path: '/teacher/lesson-plan-ai', label: '🤖 Soạn Giáo án AI (CV 5512)' },
    { path: '/teacher/exercise-creator', label: '✍️ Tạo Bài tập thông minh' },
    { path: '/teacher/question-bank', label: '🧪 Ngân hàng Câu hỏi Hóa' },
    { path: '/teacher/exam-generator', label: '📝 Tạo & Trộn Đề thi' },
    { path: '/teacher/ocr-grading', label: '📷 Chấm bài bằng OCR' },
    { path: '/teacher/analytics', label: '📊 Phân tích Học sinh' },
  ],
  STAFF: [
    { path: '/staff/lesson-plans', label: '📘 Giáo án mẫu Hóa học' },
    { path: '/staff/questions', label: '🗃️ Ngân hàng Câu hỏi gốc' },
    { path: '/staff/prompts', label: '⚡ Quản lý Prompt AI' },
  ],
  MANAGER: [
    { path: '/manager/packages', label: '💎 Quản lý Gói dịch vụ' },
    { path: '/manager/orders', label: '🧾 Theo dõi Đơn hàng' },
    { path: '/manager/approvals', label: '✅ Duyệt Học liệu & Prompt' },
  ],
  ADMIN: [
    { path: '/admin/users', label: '👥 Quản lý Người dùng' },
    { path: '/admin/settings', label: '⚙️ Cấu hình Hệ thống' },
    { path: '/admin/frameworks', label: '📐 Khung chương trình' },
    { path: '/admin/revenue', label: '💰 Doanh thu & Gói cước' },
  ],
};

export default function MainPortalLayout() {
  // Lấy thông tin user hiện tại và hàm đăng xuất từ kho AuthContext
  const { user, logout, loginAsDemoRole } = useAuth();
  const navigate = useNavigate();

  // Lấy danh sách menu tương ứng với Role của người đang đăng nhập
  const menuItems = MENU_BY_ROLE[user?.role] || [];

  // Xử lý khi bấm nút Đăng xuất
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Xử lý chuyển đổi nhanh giữa 4 Actors ngay trên thanh Header để tiện demo
  const handleSwitchRole = (newRole) => {
    loginAsDemoRole(newRole);
    const defaultRoute = MENU_BY_ROLE[newRole][0].path;
    navigate(defaultRoute);
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* CỘT TRÁI: Thanh Sidebar điều hướng */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo thương hiệu PlanbookAI */}
          <div className="p-5 border-b border-slate-800">
            <h1 className="text-xl font-bold text-white tracking-tight">
              ⚗️ Planbook<span className="text-indigo-400">AI</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Cổng AI Giáo viên Hóa THPT</p>
          </div>

          {/* Danh sách các mục Menu của Role hiện tại */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Góc dưới cùng Sidebar: Hiển thị thông tin tóm tắt và nút Đăng xuất */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="text-xs text-slate-400 mb-1">Đang đăng nhập với quyền:</div>
          <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
            {user?.role}
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition"
          >
            Đăng xuất tài khoản
          </button>
        </div>
      </aside>

      {/* CỘT PHẢI: Thanh Header phía trên + Nội dung trang chính phía dưới */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Thanh Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <div>
            <span className="text-sm text-slate-500">Xin chào, </span>
            <strong className="text-sm text-slate-800">{user?.fullName}</strong>
            {user?.role === 'TEACHER' && (
              <span className="ml-3 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
                ⚡ Credit AI còn lại: {user?.aiCredits ?? 150} lượt
              </span>
            )}
          </div>

          {/* Bộ nút chuyển nhanh giữa 4 Roles giúp Giảng viên chấm bài test 1 chạm */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1">Chuyển nhanh Role:</span>
            {['TEACHER', 'STAFF', 'MANAGER', 'ADMIN'].map((r) => (
              <button
                key={r}
                onClick={() => handleSwitchRole(r)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  user?.role === r
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </header>

        {/* Khu vực hiển thị nội dung của từng trang con (<Outlet />) */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}