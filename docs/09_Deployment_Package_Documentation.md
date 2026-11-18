# 09. TÀI LIỆU ĐÓNG GÓI & TRIỂN KHAI HỆ THỐNG (DEPLOYMENT PACKAGE DOCUMENTATION)
**Dự án:** PlanbookAI (PBA) – Cổng công cụ AI dành cho Giáo viên Hóa học THPT

## 1. Đóng gói và Khởi chạy Toàn Hệ thống bằng Docker Compose
Dự án được cấu hình sẵn 3 tệp đóng gói chuẩn hóa: `frontend/Dockerfile`, `backend/Dockerfile` và `docker-compose.yml` tại thư mục gốc.

### Lệnh khởi chạy đồng thời 3 thùng chứa (MySQL 8.0 + Backend API + Frontend Web):
```bash
docker compose up -d --build
```
- **Container 1 (`pba_mysql_db`):** Chạy MySQL 8.0 tại cổng `3306`, tự động khởi tạo CSDL `planbookai_db`.
- **Container 2 (`pba_backend_api`):** Chạy dịch vụ Node.js Express RESTful API tại cổng `5000`.
- **Container 3 (`pba_frontend_web`):** Chạy ứng dụng giao diện ReactJS tại cổng `5173`.

### Lệnh dừng hệ thống Docker:
```bash
docker compose down
```

## 2. Triển khai lên môi trường Đám mây (Cloud Deployment)
1. **Triển khai Giao diện (`frontend/`) lên Vercel:**
   - Kết nối kho lưu trữ GitHub `DuAnPlanBookAI` vào Vercel.
   - Thiết lập `Root Directory` là `frontend`, lệnh Build là `npm run build`, thư mục đầu ra là `dist`.
   - Cấu hình biến môi trường `VITE_API_BASE_URL` trỏ về địa chỉ Backend trên Render/AWS.
2. **Triển khai Máy chủ (`backend/`) và MySQL lên Render / AWS:**
   - Thiết lập `Root Directory` là `backend`, sử dụng `Dockerfile` hoặc lệnh khởi chạy `npm start`.
   - Cấu hình đầy đủ các biến môi trường: `DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`.