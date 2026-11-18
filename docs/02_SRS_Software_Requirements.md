# 02. ĐẶC TẢ YÊU CẦU PHẦN MỀM (SOFTWARE REQUIREMENTS SPECIFICATION - SRS)
**Dự án:** PlanbookAI (PBA) – Cổng công cụ AI dành cho Giáo viên Hóa học THPT

## 1. Yêu cầu chức năng (Functional Requirements)
### 1.1. Phân hệ Admin
- **FR-ADM-01 (`UserManagement.jsx`):** Tạo mới, tìm kiếm, khóa/mở khóa và phân quyền RBAC cho 4 Actors (`ADMIN`, `MANAGER`, `STAFF`, `TEACHER`).
- **FR-ADM-02 (`SystemSettings.jsx`):** Cấu hình mô hình Gemini AI, hạn mức Credit mặc định và giới hạn file OCR.
- **FR-ADM-03 (`FrameworkConfig.jsx`):** Quản lý khung chương trình Hóa học THPT (Lớp 10, 11, 12) và cấu trúc giáo án Công văn 5512.
- **FR-ADM-04 (`RevenueDashboard.jsx`):** Thống kê doanh thu bán gói dịch vụ theo tháng.

### 1.2. Phân hệ Teacher (Phần 1)
- **FR-TCH-01 (`TeacherWorkspace.jsx`):** Quản lý thư mục học liệu cá nhân và quét OCR số hóa tài liệu giấy.
- **FR-TCH-02 (`LessonPlanAI.jsx`):** Tự động sinh Kế hoạch bài dạy Hóa học chuẩn Công văn 5512 bằng Gemini AI.
- **FR-TCH-03 (`ExerciseCreator.jsx`):** Tự động tạo bài tập thông minh (Trắc nghiệm, Điền từ, Trả lời ngắn) theo 3 mức độ nhận thức.

## 2. Yêu cầu phi chức năng (Non-Functional Requirements)
- **NFR-01 (RESTful API):** Toàn bộ giao tiếp giữa ReactJS và Node.js Express tuân thủ chuẩn RESTful JSON.
- **NFR-02 (Bảo mật RBAC):** Phân quyền chặt chẽ ở cả tầng giao diện (`ProtectedRoute`) và tầng máy chủ (`rbacMiddleware`).