import { getGeminiModel } from '../config/geminiClient.js';
import { frameworkPromptRepository } from '../repositories/frameworkPromptRepository.js';
import { lessonPlanRepository } from '../repositories/lessonPlanRepository.js';

// DỊCH VỤ LÕI SỐ 1: Tích hợp Google Gemini AI sinh Giáo án Công văn 5512 & Bài tập Hóa học thông minh
export const aiLessonPlanService = {
  // 1. Tự động soạn Kế hoạch bài dạy (Giáo án) môn Hóa học THPT bằng Gemini AI
  generateLessonPlan: async ({ grade, topic, durationPeriods = 2, objectives = '' }) => {
    // Lấy mẫu Prompt đã được Manager duyệt từ Database (nếu có)
    let templateText =
      'Bạn là Chuyên gia Sư phạm Hóa học THPT. Hãy soạn Kế hoạch bài dạy chuẩn Công văn 5512 cho môn Hóa học lớp {{grade}}, chủ đề "{{topic}}", thời lượng {{duration}} tiết.';

    try {
      const dbPrompt = await frameworkPromptRepository.findApprovedPromptByCategory('LESSON_PLAN');
      if (dbPrompt && dbPrompt.promptContent) {
        templateText = dbPrompt.promptContent;
      }
    } catch (err) {
      // Nếu MySQL chưa bật thì dùng mẫu mặc định ở trên
    }

    // Ghép các thông số thực tế của Giáo viên vào khuôn mẫu Prompt
    const finalPrompt =
      templateText
        .replace('{{grade}}', String(grade))
        .replace('{{topic}}', topic)
        .replace('{{duration}}', String(durationPeriods)) +
      `\nMục tiêu bổ sung: ${objectives}`;

    // Nếu đã cấu hình khóa GEMINI_API_KEY thật trong .env thì gọi trực tiếp Google Gemini AI
    const model = getGeminiModel('gemini-2.5-flash');
    if (model) {
      const result = await model.generateContent(finalPrompt);
      const responseText = result.response.text();
      return { content: responseText, promptUsed: finalPrompt };
    }

    // Bản Giáo án Công văn 5512 chuẩn sư phạm trả về khi chạy ở chế độ chưa điền API Key
    const structuredContent =
      `KE HOACH BAI DAY MON HOA HOC LOP ${grade} (CHUAN CONG VAN 5512)\n` +
      `CHU DE: ${topic.toUpperCase()} | Thoi luong: ${durationPeriods} tiet\n` +
      `====================================================================\n\n` +
      `I. MUC TIEU BAI HOC\n` +
      `- Nang luc nhan thuc hoa hoc: Trinh bay duoc khai niem, cong thuc cau tao va tinh chat hoa hoc cua "${topic}".\n` +
      `- Nang luc van dung kien thuc: ${objectives || 'Giai quyet cac bai tap tinh toan hoa hoc va ung dung thuc tien.'}\n\n` +
      `II. THIET BI DAY HOC VA HOC LIEU\n` +
      `- Giao vien: Phieu hoc tap so 1, so 2; video thi nghiem hoa hoc lop ${grade}.\n` +
      `- Hoc sinh: Sach giao khoa Hoa hoc ${grade}, bang tuan hoan.\n\n` +
      `III. TIEN TRINH DAY HOC (4 HOAT DONG)\n` +
      `- Hoat dong 1: Khoi dong (10 phut) - Neu van de thuc tien lien quan den "${topic}".\n` +
      `- Hoat dong 2: Hinh thanh kien thuc moi (35 phut) - Thao luan nhom va viet phuong trinh hoa hoc.\n` +
      `- Hoat dong 3: Luyen tap (25 phut) - He thong cau hoi trac nghiem Nhan biet va Thong hieu.\n` +
      `- Hoat dong 4: Van dung (20 phut) - Bai toan tinh toan hieu suat phan ung trong cong nghiep.`;

    return { content: structuredContent, promptUsed: finalPrompt };
  },

  // 2. Tự động tạo Bài tập Hóa học thông minh bằng Gemini AI (Trắc nghiệm, Điền từ, Trả lời ngắn)
  generateSmartExercises: async ({ grade, topic, difficulty = 'THONG_HIEU', exerciseType = 'MULTIPLE_CHOICE', questionCount = 3 }) => {
    const prompt = `Hãy tạo ${questionCount} câu bài tập Hóa học lớp ${grade}, chủ đề "${topic}", mức độ ${difficulty}, định dạng ${exerciseType}. Trả về câu hỏi kèm đáp án và giải thích chi tiết.`;

    const model = getGeminiModel('gemini-2.5-flash');
    if (model) {
      try {
        const result = await model.generateContent(prompt);
        return {
          exercises: [
            {
              id: 1,
              typeLabel: exerciseType,
              question: result.response.text(),
              options: [],
              answer: 'Được sinh trực tiếp từ Google Gemini AI.',
            },
          ],
        };
      } catch (err) {
        // Fallback xuống danh sách chuẩn bên dưới nếu mạng gián đoạn
      }
    }

    return {
      exercises: [
        {
          id: 1,
          typeLabel: exerciseType === 'MULTIPLE_CHOICE' ? 'Trắc nghiệm 4 lựa chọn' : 'Bài tập tự luận / Điền khuyết',
          question: `[Hóa học ${grade} - ${topic}] Câu hỏi mức độ ${difficulty} được thiết kế tự động theo mục tiêu bài học.`,
          options:
            exerciseType === 'MULTIPLE_CHOICE'
              ? ['A. Phương án đúng theo bản chất hóa học', 'B. Phương án nhiễu 1', 'C. Phương án nhiễu 2', 'D. Phương án nhiễu 3']
              : [],
          answer: 'Đáp án chuẩn: A. Giải thích chi tiết dựa theo định luật bảo toàn khối lượng và bảo toàn nguyên tố.',
        },
      ],
    };
  },

  // 3. Lưu Giáo án đã soạn vào Workspace cá nhân của Giáo viên
  saveTeacherLessonPlan: async (userId, { folderId, grade, topic, title, content }) => {
    return await lessonPlanRepository.createLessonPlan({
      userId: Number(userId),
      folderId: folderId ? Number(folderId) : null,
      grade: Number(grade),
      topic,
      title,
      content,
      isSample: false,
      approvalStatus: 'APPROVED',
    });
  },
};