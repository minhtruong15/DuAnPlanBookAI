import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository.js';

// LỚP 2 (SERVICE): Xử lý logic nghiệp vụ Đăng ký, Mã hóa mật khẩu & Cấp thẻ JWT
export const authService = {
  // 1. Nghiệp vụ Đăng ký tài khoản Giáo viên Hóa học mới
  register: async ({ fullName, email, password, schoolName }) => {
    // Kiểm tra xem email này đã có người đăng ký chưa
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email này đã được sử dụng trong hệ thống.');
    }

    // Mã hóa mật khẩu thành chuỗi băm (Hash) an toàn trước khi lưu xuống MySQL
    const passwordHash = await bcrypt.hash(password, 10);

    // Gọi tầng Repository lưu tài khoản mới với 50 Credit AI tặng kèm
    const newUser = await userRepository.createUser({
      fullName,
      email,
      passwordHash,
      schoolName,
      role: 'TEACHER',
      aiCredits: 50,
    });

    return {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      aiCredits: newUser.aiCredits,
    };
  },

  // 2. Nghiệp vụ Đăng nhập và Cấp phát thẻ JWT Token
  login: async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }

    // Đối chiếu mật khẩu người dùng nhập vào với mật khẩu đã mã hóa trong MySQL
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }

    // Ký phát hành thẻ JWT Token có thời hạn 7 ngày, bên trong chứa id và role
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, aiCredits: user.aiCredits },
      process.env.JWT_SECRET || 'planbookai_super_secret_jwt_key_2026',
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        schoolName: user.schoolName,
        aiCredits: user.aiCredits,
      },
    };
  },
};