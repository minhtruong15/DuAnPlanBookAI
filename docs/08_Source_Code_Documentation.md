# 08. TÀI LIỆU ĐẶC TẢ MÃ NGUỒN (SOURCE CODE DOCUMENTATION)
**Dự án:** PlanbookAI (PBA) – Cổng công cụ AI dành cho Giáo viên Hóa học THPT

## 1. Tổ chức Mã nguồn Giao diện (`frontend/src/`)
- **`components/common/`:** Chứa 4 thành phần giao diện tái sử dụng (`Button.jsx`, `Modal.jsx`, `DataTable.jsx`, `LoadingSpinner.jsx`).
- **`components/guards/ProtectedRoute.jsx`:** Chốt chặn kiểm tra quyền truy cập theo danh sách `allowedRoles`.
- **`context/AuthContext.jsx`:** Quản lý trạng thái đăng nhập toàn cục và thông tin 4 Actors.
- **`layouts/`:** Chứa `AuthLayout.jsx` (màn hình đăng nhập/đăng ký) và `MainPortalLayout.jsx` (thanh Sidebar động theo 4 Roles).
- **`pages/`:** Phân chia thành 5 thư mục con tương ứng với từng nhóm tác nhân: `auth/`, `admin/`, `manager/`, `staff/`, `teacher/`.
- **`services/`:** Chứa `apiClient.js` và 5 dịch vụ gọi RESTful API (`authService`, `adminService`, `managerService`, `staffService`, `teacherService`).

## 2. Tổ chức Mã nguồn Máy chủ (`backend/src/`)
Tuân thủ nghiêm ngặt kiến trúc 3 Lớp (3-Layer Architecture):
1. **Lớp 1 - `controllers/`:** Tiếp nhận HTTP Request và trả về JSON (`authController`, `adminController`, `managerController`, `staffController`, `teacherController`).
2. **Lớp 2 - `services/`:** Xử lý nghiệp vụ và tích hợp AI/OCR (`authService`, `adminService`, `managerService`, `staffService`, `aiLessonPlanService`, `questionExamService`, `ocrGradingService`).
3. **Lớp 3 - `repositories/`:** Giao tiếp với 10 bảng MySQL qua Prisma ORM (`userRepository`, `packageOrderRepository`, `frameworkPromptRepository`, `lessonPlanRepository`, `questionExamRepository`).