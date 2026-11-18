# 04. TÀI LIỆU THIẾT KẾ CHI TIẾT & SƠ ĐỒ UML 2.0 (DETAILED DESIGN DOCUMENT - DDD)
**Dự án:** PlanbookAI (PBA) – Cổng công cụ AI dành cho Giáo viên Hóa học THPT

## 1. Sơ đồ Tuần tự (Sequence Diagram - UML 2.0): Luồng Soạn Giáo Án Hóa Học Bằng Gemini AI
```mermaid
sequenceDiagram
    actor Teacher as Teacher (Giáo viên Hóa)
    participant UI as LessonPlanAI.jsx
    participant API as teacherController.js
    participant Service as aiLessonPlanService.js
    participant Repo as frameworkPromptRepository.js
    participant Gemini as Google Gemini 2.5 Flash

    Teacher->>UI: Chọn Khối lớp (10/11/12), Chủ đề Hóa học & Bấm tạo
    UI->>API: POST /api/teacher/lesson-plans/generate
    API->>Service: generateLessonPlan({ grade, topic, durationPeriods })
    Service->>Repo: findApprovedPromptByCategory("LESSON_PLAN")
    Repo-->>Service: Trả về mẫu Prompt chuẩn Công văn 5512 đã duyệt
    Service->>Gemini: Gửi câu lệnh Prompt đã ghép thông số Hóa học
    Gemini-->>Service: Trả về Kế hoạch bài dạy 4 Hoạt động
    Service-->>API: Trả về dữ liệu Giáo án hoàn chỉnh
    API-->>UI: HTTP 200 OK (JSON content)
    UI-->>Teacher: Hiển thị Giáo án trên màn hình để chỉnh sửa / lưu / in PDF
```

## 2. Sơ đồ Hoạt động (Activity Diagram - UML 2.0): Quy trình Kiểm duyệt Học liệu 3 Tác nhân
```mermaid
flowchart LR
    A["Staff tạo Giáo án mẫu / Câu hỏi Hóa / Prompt AI"] --> B["Lưu vào MySQL với trạng thái PENDING"]
    B --> C["Manager mở màn hình ContentApproval.jsx"]
    C --> D{"Manager kiểm duyệt nội dung"}
    D -- "Đạt chuẩn sư phạm" --> E["Cập nhật trạng thái APPROVED"]
    D -- "Cần chỉnh sửa" --> F["Cập nhật trạng thái REJECTED"]
    E --> G["Teacher sử dụng trong Workspace & Gemini AI"]
```

## 3. Thiết kế Chi tiết Kiến trúc 3 Lớp (Class Mapping)
- **Tầng Controller (`backend/src/controllers/`):** `authController`, `adminController`, `managerController`, `staffController`, `teacherController`.
- **Tầng Service (`backend/src/services/`):** `authService`, `adminService`, `managerService`, `staffService`, `aiLessonPlanService`, `questionExamService`, `ocrGradingService`.
- **Tầng Repository (`backend/src/repositories/`):** `userRepository`, `packageOrderRepository`, `frameworkPromptRepository`, `lessonPlanRepository`, `questionExamRepository`.