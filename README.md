# 📝 PlanbookAI (PBA) – Cổng công cụ AI dành cho giáo viên Hóa học THPT

Ứng dụng Google Gemini AI & Vision OCR kết hợp kiến trúc Đa tầng (N-Tier) và kiểm soát phân quyền RBAC (4 Actors) trên nền tảng ReactJS, Node.js & MySQL.

> Chú thích: **Chữ đậm** = quan trọng, bắt buộc | Chữ thường = bình thường | *Chữ nhỏ = ít quan trọng, tham khảo*

---

## 📁 Cấu trúc thư mục

| Thư mục | Công nghệ | Mô tả |
| :--- | :--- | :--- |
| `frontend/` | ReactJS / Vite, Tailwind CSS | Giao diện cổng công cụ Web chia theo 4 vai trò (Admin, Manager, Staff, Teacher), tích hợp biểu đồ thống kê Recharts |
| `backend/` | Node.js / Express, JWT | Điều phối RESTful API theo kiến trúc 3 Lớp (Controller - Service - Repository), xử lý phân quyền RBAC và trộn đề thi |
| `backend/src/services/` | Google Gemini AI & Vision OCR | Tự động sinh Giáo án, Bài tập Hóa học chuẩn chương trình THPT và quét ảnh chấm điểm phiếu trả lời trắc nghiệm bằng OCR |
| `backend/prisma/` | MySQL 8.0 + Prisma ORM + Supabase | Cấu hình Docker Compose, định nghĩa 10 bảng CSDL nghiệp vụ (`schema.prisma`), dữ liệu khởi tạo (`seed.js`) và lưu trữ ảnh đám mây |
| `docs/` | Markdown / UML 2.0 | Trọn bộ 9 tài liệu vòng đời phát triển phần mềm: URD, SRS, SAD, DDD, kịch bản kiểm thử (Test) và hướng dẫn triển khai |

---

## ⚠️ Quy tắc sống còn

> [!CAUTION]
> **Tuyệt đối KHÔNG code và push thẳng lên nhánh `main`.**
> Toàn bộ thành viên tuân thủ nghiêm ngặt 4 bước sau.

### Bước 1: Đồng bộ code mới nhất mỗi ngày

```bash
git checkout main
git pull origin main
```

### Bước 2: Tạo nhánh làm việc riêng của mình

```bash
git checkout -b feature/[tên-bạn]-[tên-chức-năng]
```

Ví dụ:

```bash
git checkout -b feature/thuy-data-pipeline
git checkout -b feature/nhu-ai-fastapi
```

### Bước 3: Lưu và đẩy code lên nhánh cá nhân

```bash
git add .
git commit -m "feat: Mô tả chi tiết chức năng vừa hoàn thành"
git push origin feature/[tên-bạn]-[tên-chức-năng]
```

### Bước 4: Tạo Pull Request (PR)

Lên GitHub của dự án, bấm **Compare & pull request** → bấm **Create pull request** để Tech Lead (@MemorisDuy) kiểm tra và merge vào nhánh `main`.

## 👥 Phân công nhiệm vụ

### 1. Thành viên 1 (@github-tv1) — Tech Lead & Frontend Developer (Phân hệ Teacher & Auth)
* **Thư mục `frontend/`**: Khởi tạo dự án React bằng Vite, cấu hình định tuyến `App.jsx`, tầng kết nối `src/services/apiClient.js` và chốt chặn phân quyền giao diện `ProtectedRoute.jsx`.
* **Phát triển giao diện không gian làm việc của Giáo viên Hóa học**: `TeacherWorkspace.jsx` (số hóa tài liệu OCR), `LessonPlanAI.jsx` (AI soạn giáo án), `ExerciseCreator.jsx` (AI tạo bài tập), `QuestionBank.jsx`, `ExamGenerator.jsx`, `OcrGrading.jsx` và `StudentAnalytics.jsx`.
* **Quản trị kho mã nguồn**: Quản lý GitHub, review code và duyệt Pull Request (PR) của cả nhóm.

### 2. Thành viên 2 (@github-tv2) — Frontend Developer (Phân hệ Admin, Manager, Staff) & BA
* **Thư mục `frontend/`**: Xây dựng khung bố cục điều hướng đa vai trò `MainPortalLayout.jsx` và phát triển 10 màn hình quản trị hậu trường:
  * **Admin (`src/pages/admin/`)**: `UserManagement.jsx`, `SystemSettings.jsx`, `FrameworkConfig.jsx` và biểu đồ doanh thu `RevenueDashboard.jsx`.
  * **Manager & Staff (`src/pages/manager/`, `src/pages/staff/`)**: `PackageManagement.jsx`, `OrderManagement.jsx`, `ContentApproval.jsx`, `SampleLessonPlans.jsx`, `StaffQuestionBank.jsx` và `PromptTemplates.jsx`.
* **Tài liệu**: Phụ trách biên soạn tài liệu yêu cầu người dùng (`01_URD_User_Requirements.md`) và đặc tả yêu cầu phần mềm (`02_SRS_Software_Requirements.md`).

### 3. Thành viên 3 (@github-tv3) — Backend Lead (Database, Auth JWT/RBAC & API Quản trị)
* **Thư mục `backend/`**: Thiết lập hạ tầng CSDL MySQL gồm 10 bảng trong `prisma/schema.prisma`, cấu hình `authMiddleware.js`, `rbacMiddleware.js` và `quotaMiddleware.js`.
* **Phát triển API**: Xây dựng các API xác thực (`POST /api/v1/auth/login`, `/register`) và nhóm API quản trị của Admin & Manager (Quản lý người dùng, gói dịch vụ, đơn hàng, phê duyệt nội dung và thống kê doanh thu).
* **Tài liệu**: Phụ trách biên soạn tài liệu kiến trúc phần mềm (`03_SAD_Software_Architecture.md`) và tài liệu mã nguồn (`08_Source_Code_Documentation.md`).

### 4. Thành viên 4 (@github-tv4) — Backend AI & OCR Engineer (Gemini AI, Ngân hàng câu hỏi & Đề thi)
* **Thư mục `backend/`**: Cấu hình kết nối `geminiClient.js` và `supabaseClient.js`; xây dựng `aiLessonPlanService.js` phát triển API sinh giáo án & bài tập Hóa học tự động (`POST /api/v1/teacher/lesson-plans/generate`, `/exercises/generate`).
* **Ngân hàng câu hỏi & Đề thi**: Xây dựng `questionExamService.js` phát triển API Ngân hàng câu hỏi Hóa học và thuật toán đảo trộn câu hỏi/đáp án tạo nhiều mã đề thi (`POST /api/v1/teacher/exams/generate`).
* **OCR & Tài liệu**: Xây dựng `ocrGradingService.js` kết hợp Supabase Storage và Gemini Vision OCR để quét và chấm phiếu trắc nghiệm tự động (`POST /api/v1/teacher/ocr/grade`). Phụ trách tài liệu thiết kế chi tiết (`04_DDD_Detailed_Design.md`).

### 5. Thành viên 5 (@github-tv5) — System Analyst (UML 2.0), QA Tester & DevOps
* **Thiết kế hệ thống & Dữ liệu**: Thiết kế toàn bộ sơ đồ UML 2.0 (Use Case, ERD 10 bảng, Sequence Diagram, Activity, Class Diagram) trong thư mục `docs/`; xây dựng kịch bản `prisma/seed.js` nạp bộ dữ liệu mẫu môn Hóa học THPT.
* **Kiểm thử**: Thực hiện kiểm thử tự động RESTful API trên Postman và kiểm thử giao diện End-to-End cho 4 vai trò; biên soạn tài liệu kiểm thử (`06_Test_Documentation.md`).
* **DevOps & Triển khai**: Thiết lập `docker-compose.yml` đóng gói toàn bộ hệ thống (MySQL + Backend + Frontend) và phụ trách tài liệu triển khai (`07_Installation_Guide.md`, `09_Deployment_Package_Documentation.md`).
