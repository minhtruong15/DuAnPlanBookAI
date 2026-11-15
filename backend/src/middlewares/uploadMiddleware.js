import multer from 'multer';

// Cấu hình lưu file ảnh tạm thời trong bộ nhớ RAM (Buffer) trước khi đẩy lên Supabase & Gemini OCR
const storage = multer.memoryStorage();

// Bộ nhận file ảnh chụp phiếu trả lời trắc nghiệm (Giới hạn tối đa 5MB mỗi ảnh)
export const uploadOcrImage = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 Megabytes
  },
});