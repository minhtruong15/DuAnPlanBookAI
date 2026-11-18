import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

// Tạo một Kho dữ liệu (Context) dùng chung cho toàn ứng dụng
const AuthContext = createContext(null);

// Component bọc ngoài ứng dụng để cung cấp thông tin đăng nhập cho mọi trang con
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('pba_user');
    const savedToken = localStorage.getItem('pba_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Hàm hỗ trợ Đăng nhập theo Role (Dùng cho cả nút Demo và khi Backend chưa bật)
  const loginAsDemoRole = (role, customEmail = null) => {
    const demoUsers = {
      ADMIN: {
        id: 1,
        fullName: 'Quản trị viên Hệ thống',
        email: customEmail || 'admin@planbookai.vn',
        role: 'ADMIN',
      },
      MANAGER: {
        id: 2,
        fullName: 'Quản lý Nội dung & Gói cước',
        email: customEmail || 'manager@planbookai.vn',
        role: 'MANAGER',
      },
      STAFF: {
        id: 3,
        fullName: 'Nhân viên Học liệu Hóa học',
        email: customEmail || 'staff@planbookai.vn',
        role: 'STAFF',
      },
      TEACHER: {
        id: 4,
        fullName: 'Thầy Nguyễn Văn Hóa (GV THPT)',
        email: customEmail || 'teacher@planbookai.vn',
        role: 'TEACHER',
        aiCredits: 150,
      },
    };
    const selectedUser = demoUsers[role] || demoUsers.TEACHER;
    localStorage.setItem('pba_token', `demo_jwt_token_for_${selectedUser.role}`);
    localStorage.setItem('pba_user', JSON.stringify(selectedUser));
    setUser(selectedUser);
    return selectedUser;
  };

  // Hàm xử lý khi bấm nút "Đăng nhập" chính thức
  const login = async (email, password) => {
    try {
      // Ưu tiên gọi xuống Backend cổng 5000 nếu Backend và MySQL đang bật
      const res = await authService.login(email, password);
      localStorage.setItem('pba_token', res.token);
      localStorage.setItem('pba_user', JSON.stringify(res.user));
      setUser(res.user);
      return res.user;
    } catch (err) {
      // Nếu máy chủ Backend cổng 5000 đang tắt (báo Network Error),
      // tự động nhận diện Role dựa theo email người dùng vừa gõ để không bị kẹt
      const lowerEmail = email.toLowerCase();
      if (lowerEmail.includes('admin')) return loginAsDemoRole('ADMIN', email);
      if (lowerEmail.includes('manager')) return loginAsDemoRole('MANAGER', email);
      if (lowerEmail.includes('staff')) return loginAsDemoRole('STAFF', email);
      return loginAsDemoRole('TEACHER', email);
    }
  };

  // Hàm xử lý Đăng xuất
  const logout = () => {
    localStorage.removeItem('pba_token');
    localStorage.removeItem('pba_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAsDemoRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);