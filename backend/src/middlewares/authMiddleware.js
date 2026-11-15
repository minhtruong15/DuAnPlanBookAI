import jwt from 'jsonwebtoken';

// Chốt chặn số 1: Kiểm tra người dùng đã đăng nhập hợp lệ chưa (Xác thực JWT Token)
export const authenticateToken = (req, res, next) => {
  // Lấy thông tin Header Authorization gửi từ apiClient.js (Dạng: "Bearer <chuỗi_token>")
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // Nếu không có token -> Trả về lỗi 401 (Chưa đăng nhập)
  if (!token) {
    return res.status(401).json({ message: 'Vui lòng đăng nhập để thực hiện chức năng này.' });
  }

  // Hỗ trợ nhận diện Token Demo nhanh của 4 Roles khi chạy kiểm thử giao diện
  if (token.startsWith('demo_jwt_token_for_')) {
    const role = token.replace('demo_jwt_token_for_', '');
    req.user = { id: 1, role, aiCredits: 150 };
    return next();
  }

  try {
    // Giải mã JWT Token bằng khóa bí mật JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'planbookai_super_secret_jwt_key_2026');
    // Lưu thông tin người dùng (id, email, role) vào biến req.user để các bước sau sử dụng
    req.user = decoded;
    next(); // Cho phép đi tiếp vào trong
  } catch (error) {
    return res.status(401).json({ message: 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ.' });
  }
};