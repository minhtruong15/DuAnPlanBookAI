# 07. TÀI LIỆU HƯỚNG DẪN CÀI ĐẶT HỆ THỐNG (INSTALLATION GUIDE)
**Dự án:** PlanbookAI (PBA) – Cổng công cụ AI dành cho Giáo viên Hóa học THPT

## 1. Yêu cầu phần mềm tối thiểu (Prerequisites)
- **Node.js:** Phiên bản 18.x hoặc 20.x LTS trở lên.
- **Cơ sở dữ liệu:** MySQL Server 8.0 (hoặc chạy tự động qua Docker Desktop).
- **Trình quản lý mã nguồn:** Git.

## 2. Các bước cài đặt và khởi chạy thủ công (Local Development)

### Bước 1: Sao chép mã nguồn từ GitHub
```bash
git clone https://github.com/minhtruong15/DuAnPlanBookAI.git
cd DuAnPlanBookAI
```

### Bước 2: Thiết lập và khởi chạy Máy chủ Backend (Cổng 5000)
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init_planbookai_db
npm run prisma:seed
npm run dev
```

### Bước 3: Thiết lập và khởi chạy Giao diện Frontend (Cổng 5173)
Mở một cửa sổ Terminal mới tại thư mục gốc của dự án:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Sau khi khởi chạy thành công, mở trình duyệt truy cập địa chỉ: `http://localhost:5173`.