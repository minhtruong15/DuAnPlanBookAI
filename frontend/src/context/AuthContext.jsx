import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

// Tạo một Kho dữ liệu (Context) dùng chung cho toàn ứng dụng
const AuthContext = createContext(null);

// Component bọc ngoài ứng dụng để cung cấp thông tin đăng nhập cho mọi trang con
export const AuthProvider = ({ children }) => {
  // Biến state 'user' lưu thông tin người đang đăng nhập (id, fullName, email, role)
  const [user, setUser] = useState(null);
  // Biến state 'loading' đánh dấu hệ thống đang kiểm tra xem trình duyệt có lưu phiên đăng nhập cũ không
  const [loading, setLoading] = useState(true);

  // Chạy 1 lần ngay khi mở web: Kiểm tra trong localStorage xem trước đó đã đăng nhập chưa
  useEffect(() => {
    const savedUser = localStorage.getItem('pba_user');
    const savedToken = localStorage.getItem('pba_token');
    if (savedUser && savedToken) {
      // Nếu có, khôi phục lại trạng thái đăng nhập để F5 trang không bị văng ra ngoài
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Hàm xử lý Đăng nhập thật qua API Backend
  const login = async (email, password) => {
    const res = await authService.login(email, password);
    // Lưu token và thông tin user vào bộ nhớ trình duyệt
    localStorage.setItem('pba_token', res.token);
    localStorage.setItem('pba_user', JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  };

  // Hàm hỗ trợ Đăng nhập Demo nhanh 4 Roles (Dùng khi muốn test nhanh giao diện từng Actor)
  const loginAsDemoRole = (role) => {
    const demoUsers = {
      ADMIN: { id: 1, fullName: 'Quản trị viên Hệ thống', email: 'admin@planbookai.vn', role: 'ADMIN' },
      MANAGER: { id: 2, fullName: 'Quản lý Nội dung & Gói cước', email: 'manager@planbookai.vn', role: 'MANAGER' },
      STAFF: { id: 3, fullName: 'Nhân viên Học liệu Hóa học', email: 'staff@planbookai.vn', role: 'STAFF' },
      TEACHER: { id: 4, fullName: 'Thầy Nguyễn Văn Hóa (GV THPT)', email: 'teacher@planbookai.vn', role: 'TEACHER', aiCredits: 150 },
    };
    const selectedUser = demoUsers[role];
    localStorage.setItem('pba_token', `demo_jwt_token_for_${role}`);
    localStorage.setItem('pba_user', JSON.stringify(selectedUser));
    setUser(selectedUser);
    return selectedUser;
  };

  // Hàm xử lý Đăng xuất: Xóa sạch bộ nhớ và đưa user về null
  const logout = () => {
    localStorage.removeItem('pba_token');
    localStorage.removeItem('pba_user');
    setUser(null);
  };

  // Phát dữ liệu (user, loading, login, loginAsDemoRole, logout) cho toàn bộ các trang con sử dụng
  return (
    <AuthContext.Provider value={{ user, loading, login, loginAsDemoRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook tùy chỉnh giúp các trang khác lấy thông tin đăng nhập chỉ bằng 1 dòng: const { user } = useAuth();
export const useAuth = () => useContext(AuthContext);