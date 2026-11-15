// Chốt chặn số 3: Kiểm tra hạn mức lượt sử dụng AI / OCR (aiCredits) của Giáo viên
export const checkAiQuota = (req, res, next) => {
  // Nếu số lượt Credit AI trong tài khoản đã về 0 thì chặn lại và báo nâng cấp gói cước
  if (req.user && req.user.aiCredits !== undefined && req.user.aiCredits <= 0) {
    return res.status(403).json({
      message: 'Thầy/cô đã hết lượt Credit AI miễn phí. Vui lòng nâng cấp Gói Pro Hóa học để tiếp tục!',
    });
  }
  next();
};