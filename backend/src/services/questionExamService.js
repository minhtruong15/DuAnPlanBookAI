import { questionExamRepository } from '../repositories/questionExamRepository.js';

// Hàm tiện ích đảo ngẫu nhiên mảng theo thuật toán Fisher-Yates Shuffle
const shuffleArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// DỊCH VỤ LÕI SỐ 2: Quản lý Ngân hàng Câu hỏi Hóa học & Thuật toán Tạo/Trộn Đề thi Trắc nghiệm
export const questionExamService = {
  // 1. Lấy danh sách câu hỏi theo bộ lọc
  getQuestions: async (filters) => {
    return await questionExamRepository.findQuestions(filters);
  },

  // 2. Tạo câu hỏi mới của Giáo viên
  createQuestion: async (teacherId, data) => {
    return await questionExamRepository.createQuestion(teacherId, data);
  },

  // 3. Xóa câu hỏi
  deleteQuestion: async (id) => {
    return await questionExamRepository.deleteQuestion(id);
  },

  // 4. Thuật toán trộn câu hỏi và đảo đáp án A/B/C/D sinh ra nhiều mã đề (101, 102, 103, 104)
  generateShuffledExams: async (teacherId, { title, grade, durationMins = 45, versionCount = 2 }) => {
    // Rút danh sách câu hỏi Hóa học của khối lớp tương ứng từ MySQL
    let pool = [];
    try {
      pool = await questionExamRepository.findQuestions({ grade });
    } catch (err) {
      // Nếu MySQL chưa có dữ liệu thì sử dụng bộ câu hỏi Hóa học dự phòng
    }

    if (!pool || pool.length === 0) {
      pool = [
        {
          content: 'Chất nào sau đây thuộc loại ester no, đơn chức, mạch hở?',
          optionA: 'CH3COOC2H5',
          optionB: 'CH3COOH',
          optionC: 'C2H5OH',
          optionD: 'HCHO',
          correctAnswer: 'A',
        },
        {
          content: 'Kim loại nào sau đây có tính dẫn điện tốt nhất?',
          optionA: 'Bạc (Ag)',
          optionB: 'Đồng (Cu)',
          optionC: 'Nhôm (Al)',
          optionD: 'Sắt (Fe)',
          correctAnswer: 'A',
        },
      ];
    }

    const examCodes = ['101', '102', '103', '104'].slice(0, Number(versionCount));
    const letters = ['A', 'B', 'C', 'D'];

    // Tiến hành đảo thứ tự câu hỏi và đảo phương án trả lời cho từng mã đề
    const versions = examCodes.map((examCode) => {
      const shuffledQuestions = shuffleArray(pool).map((q, index) => {
        const rawChoices = [
          { text: q.optionA, isCorrect: q.correctAnswer === 'A' },
          { text: q.optionB, isCorrect: q.correctAnswer === 'B' },
          { text: q.optionC, isCorrect: q.correctAnswer === 'C' },
          { text: q.optionD, isCorrect: q.correctAnswer === 'D' },
        ];

        const shuffledChoices = shuffleArray(rawChoices);
        const correctIdx = shuffledChoices.findIndex((c) => c.isCorrect);

        return {
          number: index + 1,
          content: q.content,
          options: shuffledChoices.map((c, idx) => `${letters[idx]}. ${c.text}`),
          correctLetter: letters[correctIdx >= 0 ? correctIdx : 0],
        };
      });

      return {
        examCode,
        questions: shuffledQuestions,
      };
    });

    // Lưu đề thi vào MySQL nếu Database đang bật
    try {
      await questionExamRepository.createExam({
        teacherId,
        title,
        grade,
        durationMins,
        examVersions: versions,
      });
    } catch (err) {
      // Tiếp tục trả về danh sách mã đề cho Frontend
    }

    return { title, grade, durationMins, versions };
  },
};