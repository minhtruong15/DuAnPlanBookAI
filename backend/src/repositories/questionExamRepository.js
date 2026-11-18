import prisma from '../config/database.js';

// LỚP 3 (REPOSITORY): Giao tiếp trực tiếp với bảng Question, Exam và OcrGradingResult trong MySQL
export const questionExamRepository = {
  // 1. Tìm kiếm và lọc câu hỏi Hóa học theo Khối lớp, Chủ đề, Mức độ nhận thức
  findQuestions: async ({ grade, difficulty, keyword }) => {
    const whereClause = {
      approvalStatus: 'APPROVED',
    };

    if (grade && grade !== 'ALL') {
      whereClause.grade = Number(grade);
    }
    if (difficulty && difficulty !== 'ALL') {
      whereClause.difficulty = difficulty;
    }
    if (keyword) {
      whereClause.content = { contains: keyword };
    }

    return await prisma.question.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
  },

  // 2. Thêm câu hỏi Hóa học mới vào Ngân hàng câu hỏi
  createQuestion: async (creatorId, data) => {
    return await prisma.question.create({
      data: {
        creatorId: Number(creatorId),
        grade: Number(data.grade),
        topic: data.topic,
        difficulty: data.difficulty,
        content: data.content,
        optionA: data.optionA,
        optionB: data.optionB,
        optionC: data.optionC,
        optionD: data.optionD,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation || '',
        approvalStatus: 'APPROVED',
      },
    });
  },

  // 3. Xóa câu hỏi khỏi Ngân hàng câu hỏi
  deleteQuestion: async (id) => {
    return await prisma.question.delete({
      where: { id: Number(id) },
    });
  },

  // 4. Lưu đề thi và các mã đề đã trộn (101, 102, 103, 104) vào bảng Exam
  createExam: async ({ teacherId, title, grade, durationMins, examVersions }) => {
    return await prisma.exam.create({
      data: {
        teacherId: Number(teacherId),
        title,
        grade: Number(grade),
        durationMins: Number(durationMins || 45),
        examVersions: JSON.stringify(examVersions),
      },
    });
  },

  // 5. Lưu kết quả chấm phiếu trả lời trắc nghiệm bằng OCR vào bảng OcrGradingResult
  saveOcrResult: async (data) => {
    return await prisma.ocrGradingResult.create({
      data,
    });
  },

  // 6. Lấy toàn bộ lịch sử chấm điểm OCR để thống kê phân tích học sinh
  findAllOcrResults: async () => {
    return await prisma.ocrGradingResult.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },
};