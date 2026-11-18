# 06. TÀI LIỆU KIỂM THỬ HỆ THỐNG (TEST DOCUMENTATION)
**Dự án:** PlanbookAI (PBA) – Cổng công cụ AI dành cho Giáo viên Hóa học THPT

## 1. Phạm vi và Phương pháp Kiểm thử
- **Kiểm thử Đơn vị & API (Unit & API Testing):** Sử dụng Postman kiểm thử toàn bộ RESTful API tại cổng `http://localhost:5000/api`.
- **Kiểm thử Tích hợp Giao diện (UI Integration Testing):** Kiểm thử trên trình duyệt tại `http://localhost:5173` cho cả 4 Actors (`ADMIN`, `MANAGER`, `STAFF`, `TEACHER`).

## 2. Bảng Kịch bản Kiểm thử Trọng tâm (Core Test Cases)

| Mã TC | Tên ca kiểm thử | Phân hệ | Đầu vào (Input) | Kết quả mong đợi (Expected Output) | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Đăng nhập và phân luồng 4 Roles | Auth | Email & Mật khẩu của từng Actor | Cấp JWT Token và điều hướng đúng về trang chủ của Role tương ứng | PASS |
| **TC-02** | Chặn truy cập trái phép RBAC | Security | Tài khoản `TEACHER` truy cập `/admin/users` | `ProtectedRoute` và `rbacMiddleware` chặn lại, trả về mã `403 Forbidden` | PASS |
| **TC-03** | Quản lý người dùng & Đổi Role | Admin | Admin đổi quyền user từ `TEACHER` sang `STAFF` | Cập nhật thành công trong bảng `User` của MySQL | PASS |
| **TC-04** | Tạo câu hỏi gốc & Mẫu Prompt AI | Staff | Staff tạo câu hỏi Hóa 12 và Prompt mới | Lưu vào MySQL với trạng thái `PENDING` chờ Manager duyệt | PASS |
| **TC-05** | Phê duyệt nội dung của Staff | Manager | Manager bấm nút Phê duyệt (`APPROVED`) | Trạng thái chuyển sang `APPROVED`, sẵn sàng cho Teacher sử dụng | PASS |
| **TC-06** | Sinh Giáo án Hóa học bằng AI | Teacher | Chọn Lớp 10, bài Cấu tạo nguyên tử, 2 tiết | Gemini AI trả về Kế hoạch bài dạy đủ 4 hoạt động chuẩn Công văn 5512 | PASS |
| **TC-07** | Tạo & Trộn đề thi nhiều mã đề | Teacher | Chọn Hóa 12, trộn 4 mã đề (`101` - `104`) | Sinh 4 mã đề có thứ tự câu hỏi và vị trí đáp án A/B/C/D khác nhau kèm bảng đáp án chuẩn | PASS |
| **TC-08** | Quét & Chấm phiếu trả lời OCR | Teacher | Tải ảnh chụp phiếu trả lời Mã đề `101` | Gemini Vision OCR nhận diện đáp án học sinh, chấm điểm thang 10 và sinh nhận xét | PASS |