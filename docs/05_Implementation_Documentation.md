# 05. TÀI LIỆU THỰC THI HỆ THỐNG (IMPLEMENTATION DOCUMENTATION)
**Dự án:** PlanbookAI (PBA) – Cổng công cụ AI dành cho Giáo viên Hóa học THPT

## 1. Triển khai Tầng Giao diện (Frontend Implementation - ReactJS)
- **Quản lý trạng thái xác thực (`src/context/AuthContext.jsx`):** Lưu trữ phiên đăng nhập bằng `JWT Token` kết hợp cơ chế phân quyền 4 Actors (`ADMIN`, `MANAGER`, `STAFF`, `TEACHER`).
- **Tầng gọi API tập trung (`src/services/apiClient.js`):** Sử dụng Axios Request Interceptor tự động đính kèm Header `Authorization: Bearer <token>` vào mọi HTTP Request gửi xuống Backend.
- **Bảo vệ đường dẫn (`src/components/guards/ProtectedRoute.jsx`):** Ngăn chặn người dùng truy cập trái phép vào phân hệ của Role khác.

## 2. Triển khai 3 Dịch vụ Lõi tại Backend (Node.js / Express.js)
1. **Dịch vụ AI Giáo án & Bài tập (`backend/src/services/aiLessonPlanService.js`):**
   - Nạp khuôn mẫu `PromptTemplate` đã được Manager phê duyệt (`APPROVED`) từ MySQL.
   - Thay thế các biến động `{{grade}}`, `{{topic}}`, `{{duration}}` và gọi mô hình `gemini-2.5-flash` sinh Kế hoạch bài dạy chuẩn Công văn 5512.
2. **Dịch vụ Ngân hàng Câu hỏi & Trộn Đề thi (`backend/src/services/questionExamService.js`):**
   - Áp dụng thuật toán **Fisher-Yates Shuffle** để đảo ngẫu nhiên thứ tự câu hỏi Hóa học và đảo vị trí 4 phương án A, B, C, D tạo ra các mã đề `101`, `102`, `103`, `104`.
3. **Dịch vụ Quét & Chấm bài bằng OCR (`backend/src/services/ocrGradingService.js`):**
   - Sử dụng `multer` nhận file ảnh phiếu trả lời trắc nghiệm, lưu trữ lên **Supabase Storage** và gọi **Gemini Vision API** nhận diện chữ viết tay / phiếu tô máy, tự động chấm điểm thang 10.