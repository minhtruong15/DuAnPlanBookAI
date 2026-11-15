import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Nạp các biến môi trường từ file .env
dotenv.config();

// Khởi tạo ứng dụng máy chủ Express
const app = express();
const PORT = process.env.PORT || 5000;

// Cho phép Frontend (ReactJS cổng 5173/3000) gửi yêu cầu qua lại (CORS)
app.use(cors());

// Cho phép Express đọc dữ liệu định dạng JSON trong phần thân (req.body) của Request
app.use(express.json({ limit: '10mb' }));

// Gắn toàn bộ hệ thống đường dẫn RESTful API dưới tiền tố "/api"
app.use('/api', apiRoutes);

// Gắn bộ bắt lỗi tập trung ở cuối cùng
app.use(errorHandler);

// Bật máy chủ lắng nghe ở cổng PORT (Mặc định: 5000)
app.listen(PORT, () => {
  console.log(`🚀 Máy chủ PlanbookAI Backend đang chạy tại: http://localhost:${PORT}/api/health`);
});