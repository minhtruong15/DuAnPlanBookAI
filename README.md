# 🧪 PlanbookAI (PBA) — Cổng công cụ AI dành cho giáo viên Hóa học THPT

Ứng dụng **Google Gemini AI & Vision OCR** kết hợp **kiến trúc nhiều tầng (N-Tier Architecture)** và **xác thực phân quyền JWT / RBAC (4 Actors)** trên nền tảng **ReactJS, Node.js (Express.js) & MySQL**.

> Chú thích: **Chữ đậm** = quan trọng, bắt buộc | Chữ thường = bình thường | <sub>Chữ nhỏ = ít quan trọng, tham khảo</sub>

---

## PHẦN 1: BẢN ĐỀ CƯƠNG CHUẨN CỦA DỰ ÁN

### 1. Thông tin chung
* **Tên tiếng Anh:** PlanbookAI – Build an AI Tools Portal for High School Teachers.
* **Tên tiếng Việt:** PlanbookAI – Xây dựng cổng công cụ AI dành cho giáo viên trung học phổ thông.
* **Tên viết tắt:** PBA
* **Phạm vi:** Tập trung hỗ trợ giáo viên môn Hóa học THPT.

### 2. Giải pháp & 4 Tính năng chính
Mỗi giáo viên được cung cấp một **Workspace cá nhân** để lưu trữ tài liệu và tổ chức nguồn học liệu thuận tiện. Hệ thống bao gồm 4 tính năng cốt lõi:
* **a. Quản lý Ngân hàng Câu hỏi:** Lưu trữ tập trung toàn bộ câu hỏi, phân loại theo môn (Hóa học), chủ đề, mức độ; hỗ trợ tìm kiếm nhanh chóng và tái sử dụng linh hoạt.
* **b. Tạo Bài tập thông minh:** Tự động tạo bài tập bằng AI dựa theo chủ đề, mục tiêu học tập và trình độ học sinh (hỗ trợ dạng trả lời ngắn, điền từ, trắc nghiệm,...).
* **c. Tạo Đề thi Trắc nghiệm:** Tự động tạo đề trắc nghiệm theo chủ đề, khối lớp, mức độ tư duy; cho phép tùy chỉnh số lượng câu, đảo đề và xuất ra nhiều mã đề từ ngân hàng câu hỏi.
* **d. Chấm bài bằng OCR:** Sử dụng công nghệ OCR để quét và chấm bài trắc nghiệm tự động từ phiếu trả lời (hỗ trợ cả bài làm đánh máy và chữ viết tay).

### 3. Các tác nhân trong hệ thống (4 Actors & Giao diện tương ứng)

| Tác nhân (Actor) | Chức năng chính | Giao diện tương ứng (Frontend Component) |
| :--- | :--- | :--- |
| **1. Admin** | • Quản lý người dùng: tạo, cập nhật, phân quyền<br>• Cấu hình hệ thống<br>• Quản lý khung chương trình & template giáo án<br>• Theo dõi doanh thu và gói dịch vụ | • `UserManagement.jsx`<br>• `SystemSettings.jsx`<br>• `FrameworkConfig.jsx`<br>• `RevenueDashboard.jsx` |
| **2. Manager** | • Quản lý gói dịch vụ và gói thuê bao<br>• Theo dõi đơn hàng, đăng ký<br>• Duyệt nội dung do Staff tạo (giáo án mẫu, ngân hàng câu hỏi, prompt AI) | • `PackageManagement.jsx`<br>• `OrderManagement.jsx`<br>• `ContentApproval.jsx` |
| **3. Staff** | • Tạo giáo án mẫu dựa trên template<br>• Xây dựng ngân hàng câu hỏi theo chủ đề/môn/mức độ<br>• Quản lý CRUD template Prompt AI | • `SampleLessonPlans.jsx`<br>• `StaffQuestionBank.jsx`<br>• `PromptTemplates.jsx` |
| **4. Teacher** | • Quản lý Workspace cá nhân & dùng OCR số hóa tài liệu giấy<br>• Tạo giáo án cá nhân, tài liệu dạy học, đề kiểm tra<br>• Chấm bài trắc nghiệm bằng OCR, nhận/xuất phản hồi<br>• Theo dõi điểm số và phân tích học tập của học sinh | • `TeacherWorkspace.jsx`<br>• `LessonPlanAI.jsx`, `ExerciseCreator.jsx`, `QuestionBank.jsx`, `ExamGenerator.jsx`<br>• `OcrGrading.jsx`<br>• `StudentAnalytics.jsx` |

### 4. Công nghệ sử dụng & Kiến trúc hệ thống
#### 4.1. Công nghệ sử dụng
* **Backend:** **Node.js (Express.js)** *(Thay thế cho Spring Boot)*
* **Frontend:** **ReactJS**
* **API:** **RESTful APIs**
* **Cơ sở dữ liệu:** **MySQL** (kết nối thông qua **Prisma ORM**)
* **Dịch vụ tích hợp:** **Supabase** (Lưu trữ file/ảnh OCR), **Gemini AI** (Xử lý trí tuệ nhân tạo)
* **Triển khai (Deployment):** **Docker, AWS / Render, Vercel**

#### 4.2. Thành phần hệ thống
* **Ứng dụng:** Cổng quản trị Web, Dashboard dành cho Manager, Dịch vụ RESTful API.
* **Lưu trữ dữ liệu:** CSDL quan hệ MySQL lưu trữ dữ liệu nghiệp vụ + Supabase Storage lưu trữ ảnh/tài liệu OCR.
* **Kiến trúc & Hạ tầng:** Kiến trúc nhiều tầng (**N-Tier Architecture**), xác thực bảo mật bằng **JWT**, giao tiếp qua **REST APIs**.

### 5. Công cụ quản lý & Triển khai (DevOps & Tools)
* **Quản lý mã nguồn (Source Control):** **Git & GitHub** (phân nhánh theo tính năng và thành viên nhóm).
* **Kiểm thử API (Testing):** **Postman / Swagger UI**.
* **Đóng gói & Đưa lên môi trường mạng (Deployment):**
  * **Docker:** Đóng gói ứng dụng Backend và dịch vụ.
  * **Vercel:** Triển khai giao diện Frontend (ReactJS).
  * **Render / AWS:** Triển khai Backend (Node.js) và Cơ sở dữ liệu MySQL.

---

## PHẦN 2: KIẾN TRÚC CHUẨN DUY NHẤT CỦA DỰ ÁN (SINGLE STANDARD ARCHITECTURE)

### 1. Bảng tổng quan các khối thư mục

| Thư mục | Công nghệ | Mô tả |
| :--- | :--- | :--- |
| `frontend/` | ReactJS / Vite, Tailwind CSS | Giao diện cổng công cụ Web chia theo 4 Actors (`Admin`, `Manager`, `Staff`, `Teacher`), triển khai trên Vercel |
| `backend/` | Node.js / Express.js, JWT | Dịch vụ RESTful API theo kiến trúc 3 Lớp (`Controller - Service - Repository`), xác thực JWT & phân quyền RBAC |
| `backend/src/services/` | Gemini AI & Supabase Storage | Xử lý sinh Giáo án, Bài tập Hóa học, trộn mã đề thi và quét ảnh chấm điểm phiếu trả lời bằng OCR |
| `backend/prisma/` | MySQL 8.0 + Prisma ORM | Định nghĩa 10 bảng CSDL quan hệ MySQL (`schema.prisma`) và kịch bản dữ liệu khởi tạo (`seed.js`) |
| `docs/` | Markdown / UML 2.0 | Lưu trữ 9 bộ tài liệu chuẩn vòng đời phát triển phần mềm (`URD`, `SRS`, `SAD`, `DDD`, `Test`, `Deploy`...) |

### 2. Sơ đồ cây kiến trúc chuẩn (Cố định xuyên suốt dự án)

```text
planbookai/
├── .gitignore
├── README.md
├── docker-compose.yml
├── docs/
│   ├── 01_URD_User_Requirements.md
│   ├── 02_SRS_Software_Requirements.md
│   ├── 03_SAD_Software_Architecture.md
│   ├── 04_DDD_Detailed_Design.md
│   ├── 05_Implementation_Documentation.md
│   ├── 06_Test_Documentation.md
│   ├── 07_Installation_Guide.md
│   ├── 08_Source_Code_Documentation.md
│   └── 09_Deployment_Package_Documentation.md
├── frontend/
│   ├── Dockerfile
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── components/
│       │   ├── common/
│       │   │   ├── Button.jsx
│       │   │   ├── Modal.jsx
│       │   │   ├── DataTable.jsx
│       │   │   └── LoadingSpinner.jsx
│       │   └── guards/
│       │       └── ProtectedRoute.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── hooks/
│       │   └── useDebounce.js
│       ├── layouts/
│       │   ├── MainPortalLayout.jsx
│       │   └── AuthLayout.jsx
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── LoginPage.jsx
│       │   │   └── RegisterPage.jsx
│       │   ├── admin/
│       │   │   ├── UserManagement.jsx
│       │   │   ├── SystemSettings.jsx
│       │   │   ├── FrameworkConfig.jsx
│       │   │   └── RevenueDashboard.jsx
│       │   ├── manager/
│       │   │   ├── PackageManagement.jsx
│       │   │   ├── OrderManagement.jsx
│       │   │   └── ContentApproval.jsx
│       │   ├── staff/
│       │   │   ├── SampleLessonPlans.jsx
│       │   │   ├── StaffQuestionBank.jsx
│       │   │   └── PromptTemplates.jsx
│       │   └── teacher/
│       │       ├── TeacherWorkspace.jsx
│       │       ├── LessonPlanAI.jsx
│       │       ├── ExerciseCreator.jsx
│       │       ├── QuestionBank.jsx
│       │       ├── ExamGenerator.jsx
│       │       ├── OcrGrading.jsx
│       │       └── StudentAnalytics.jsx
│       ├── services/
│       │   ├── apiClient.js
│       │   ├── authService.js
│       │   ├── adminService.js
│       │   ├── managerService.js
│       │   ├── staffService.js
│       │   └── teacherService.js
│       └── utils/
│           ├── constants.js
│           └── formatters.js
└── backend/
    ├── Dockerfile
    ├── .env.example
    ├── package.json
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.js
    └── src/
        ├── server.js
        ├── config/
        │   ├── database.js
        │   ├── geminiClient.js
        │   └── supabaseClient.js
        ├── middlewares/
        │   ├── authMiddleware.js
        │   ├── rbacMiddleware.js
        │   ├── quotaMiddleware.js
        │   ├── uploadMiddleware.js
        │   └── errorHandler.js
        ├── routes/
        │   └── index.js
        ├── controllers/
        │   ├── authController.js
        │   ├── adminController.js
        │   ├── managerController.js
        │   ├── staffController.js
        │   └── teacherController.js
        ├── services/
        │   ├── authService.js
        │   ├── adminService.js
        │   ├── managerService.js
        │   ├── staffService.js
        │   ├── aiLessonPlanService.js
        │   ├── questionExamService.js
        │   └── ocrGradingService.js
        └── repositories/
            ├── userRepository.js
            ├── packageOrderRepository.js
            ├── frameworkPromptRepository.js
            ├── lessonPlanRepository.js
            └── questionExamRepository.js
```

---

## PHẦN 3: PHÂN CÔNG NHIỆM VỤ 5 THÀNH VIÊN (ĐỒNG BỘ THEO KIẾN TRÚC CHUẨN)

### 1. Thành viên 1 (`@github-tv1`) — Tech Lead & Frontend Developer (Phân hệ Teacher & Auth)
* **Thư mục `frontend/`:** Khởi tạo dự án React bằng Vite, cấu hình định tuyến `App.jsx`, tầng kết nối `src/services/apiClient.js`, kho lưu trạng thái `AuthContext.jsx` và chốt chặn phân quyền giao diện `ProtectedRoute.jsx`.
* Trực tiếp phát triển 2 màn hình xác thực (`LoginPage.jsx`, `RegisterPage.jsx`) và 7 màn hình của **Teacher** (`src/pages/teacher/`): `TeacherWorkspace.jsx`, `LessonPlanAI.jsx`, `ExerciseCreator.jsx`, `QuestionBank.jsx`, `ExamGenerator.jsx`, `OcrGrading.jsx` và `StudentAnalytics.jsx`.
* Quản trị kho mã nguồn GitHub, triển khai Frontend lên **Vercel**, review code và duyệt Pull Request (PR).

### 2. Thành viên 2 (`@github-tv2`) — Frontend Developer (Phân hệ Admin, Manager, Staff) & BA
* **Thư mục `frontend/`:** Xây dựng khung bố cục `MainPortalLayout.jsx` và phát triển 10 màn hình quản trị đúng theo bảng mục 3:
  * **Admin (`src/pages/admin/`):** `UserManagement.jsx`, `SystemSettings.jsx`, `FrameworkConfig.jsx`, `RevenueDashboard.jsx`.
  * **Manager (`src/pages/manager/`):** `PackageManagement.jsx`, `OrderManagement.jsx`, `ContentApproval.jsx`.
  * **Staff (`src/pages/staff/`):** `SampleLessonPlans.jsx`, `StaffQuestionBank.jsx`, `PromptTemplates.jsx`.
* Phụ trách biên soạn tài liệu `01_URD_User_Requirements.md` và `02_SRS_Software_Requirements.md`.

### 3. Thành viên 3 (`@github-tv3`) — Backend Lead (Database MySQL, Auth JWT/RBAC & API Quản trị)
* **Thư mục `backend/`:** Thiết lập CSDL MySQL gồm 10 bảng trong `prisma/schema.prisma`, cấu hình `authMiddleware.js`, `rbacMiddleware.js` và `quotaMiddleware.js`.
* Xây dựng các lớp Controller – Service – Repository cho `auth` (`authController.js`, `authService.js`), `admin` (`adminController.js`, `adminService.js`, `userRepository.js`) và `manager` (`managerController.js`, `managerService.js`, `packageOrderRepository.js`).
* Phụ trách biên soạn tài liệu `03_SAD_Software_Architecture.md` và `08_Source_Code_Documentation.md`.

### 4. Thành viên 4 (`@github-tv4`) — Backend AI & OCR Engineer (Gemini AI, Supabase, Ngân hàng câu hỏi & Đề thi)
* **Thư mục `backend/`:** Cấu hình `geminiClient.js` và `supabaseClient.js`; xây dựng các lớp Controller – Service – Repository cho `staff` (`staffController.js`, `staffService.js`, `frameworkPromptRepository.js`) và `teacher` (`teacherController.js`).
* Trực tiếp phát triển 3 dịch vụ lõi: `aiLessonPlanService.js` (sinh giáo án & bài tập Hóa học bằng Gemini AI), `questionExamService.js` (ngân hàng câu hỏi & thuật toán đảo trộn mã đề thi) và `ocrGradingService.js` (số hóa tài liệu giấy & quét chấm phiếu trả lời trắc nghiệm bằng OCR).
* Phụ trách biên soạn tài liệu `04_DDD_Detailed_Design.md` và `05_Implementation_Documentation.md`.

### 5. Thành viên 5 (`@github-tv5`) — System Analyst (UML 2.0), QA Tester & DevOps
* **Thư mục `docs/` & `backend/prisma/`:** Vẽ toàn bộ sơ đồ UML 2.0 (Use Case, ERD, Sequence, Activity, Class Diagram); xây dựng `prisma/seed.js` nạp bộ dữ liệu mẫu môn Hóa học THPT và bộ ảnh phiếu trả lời trắc nghiệm OCR.
* Kiểm thử toàn bộ RESTful API bằng **Postman / Swagger UI** và kiểm thử giao diện 4 Actors; biên soạn tài liệu `06_Test_Documentation.md`.
* Đóng gói ứng dụng bằng **Docker** (`docker-compose.yml`, `Dockerfile`), triển khai Backend & MySQL lên **Render / AWS**, và biên soạn `07_Installation_Guide.md`, `09_Deployment_Package_Documentation.md`.

---

## PHẦN 4: QUY TẮC SỐNG CÒN TRÊN GITHUB

> [!CAUTION]
> **Tuyệt đối KHÔNG code và push thẳng lên nhánh `main`.** Toàn bộ thành viên tuân thủ nghiêm ngặt 4 bước sau.

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
git checkout -b feature/tv1-teacher-lesson-ai
git checkout -b feature/tv2-admin-dashboard
git checkout -b feature/tv3-auth-jwt-rbac
git checkout -b feature/tv4-ocr-exam-grading
```

### Bước 3: Lưu và đẩy code lên nhánh cá nhân

```bash
git add .
git commit -m "feat: Mô tả chi tiết chức năng vừa hoàn thành"
git push origin feature/[tên-bạn]-[tên-chức-năng]
```

### Bước 4: Tạo Pull Request (PR)

Lên GitHub của dự án, bấm **Compare & pull request** $\rightarrow$ bấm **Create pull request** để Tech Lead kiểm tra và merge vào nhánh `main`.
