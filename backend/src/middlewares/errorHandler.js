// Bộ bắt lỗi tập trung (Global Error Handler) đặt ở cuối cùng của ứng dụng Express
export const errorHandler = (err, req, res, next) => {
  console.error('🔥 [Backend Error]:', err.message || err);

  // Lấy mã lỗi HTTP (mặc định là 500 - Lỗi máy chủ nội bộ)
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Đã xảy ra lỗi hệ thống trên máy chủ Backend.',
  });
};