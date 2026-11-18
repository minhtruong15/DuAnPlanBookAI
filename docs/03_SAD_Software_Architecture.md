# 03. TÀI LIỆU KIẾN TRÚC PHẦN MỀM (SOFTWARE ARCHITECTURE DOCUMENT - SAD)
**Dự án:** PlanbookAI (PBA) – Cổng công cụ AI dành cho Giáo viên Hóa học THPT

## 1. Kiến trúc tổng thể (N-Tier Architecture)
Hệ thống PlanbookAI được thiết kế theo kiến trúc đa tầng tách biệt hoàn toàn giữa Giao diện người dùng (Client Tier), Tầng xử lý nghiệp vụ (Application Tier) và Tầng lưu trữ dữ liệu (Data Tier):
- **Client Tier (`frontend/`):** Ứng dụng Single Page Application (SPA) xây dựng bằng ReactJS (Vite) và Tailwind CSS.
- **Application Tier (`backend/`):** Dịch vụ RESTful API xây dựng trên Node.js (Express.js) chia thành 3 lớp:
  1. `controllers/`: Tiếp nhận HTTP Request, kiểm tra dữ liệu đầu vào và trả về HTTP Response.
  2. `services/`: Thực thi logic nghiệp vụ, tính toán điểm số, gọi Gemini AI và Supabase SDK.
  3. `repositories/`: Giao tiếp trực tiếp với Cơ sở dữ liệu MySQL thông qua Prisma ORM.
- **Data Tier (`backend/prisma/`):** Cơ sở dữ liệu quan hệ MySQL 8.0 gồm 10 bảng chuẩn hóa kết hợp đám mây lưu trữ ảnh Supabase Storage.

## 2. Cơ chế Xác thực & Phân quyền (JWT & RBAC)
- Mọi phiên đăng nhập hợp lệ được cấp phát thẻ `JSON Web Token (JWT)` chứa `id` và `role` của người dùng.
- Chốt chặn `authMiddleware.js` và `rbacMiddleware.js` kiểm soát quyền truy cập nghiêm ngặt cho 4 Actors: `ADMIN`, `MANAGER`, `STAFF`, `TEACHER`.