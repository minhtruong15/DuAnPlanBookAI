import React, { useState } from 'react';
import { CHEMISTRY_TOPICS, DIFFICULTY_LEVELS } from '../../utils/constants';
import useDebounce from '../../hooks/useDebounce';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { teacherService } from '../../services/teacherService';

export default function QuestionBank() {
  // Danh sách câu hỏi Hóa học THPT lưu trữ tập trung
  const [questions, setQuestions] = useState([
    {
      id: 1,
      grade: 10,
      topic: 'Cấu tạo nguyên tử',
      difficulty: 'NHAN_BIET',
      content: 'Hạt mang điện tích dương trong hạt nhân nguyên tử là hạt nào sau đây?',
      optionA: 'Proton (p)',
      optionB: 'Neutron (n)',
      optionC: 'Electron (e)',
      optionD: 'Phân tử',
      correctAnswer: 'A',
      explanation: 'Hạt nhân nguyên tử gồm Proton mang điện dương và Neutron không mang điện.',
    },
    {
      id: 2,
      grade: 11,
      topic: 'Cân bằng hóa học',
      difficulty: 'THONG_HIEU',
      content: 'Dung dịch chất nào sau đây làm quỳ tím chuyển sang màu đỏ?',
      optionA: 'NaOH',
      optionB: 'H2SO4 loãng',
      optionC: 'NaCl',
      optionD: 'K2SO4',
      correctAnswer: 'B',
      explanation: 'H2SO4 là acid mạnh, phân li hoàn toàn ra H+ làm quỳ tím hóa đỏ.',
    },
    {
      id: 3,
      grade: 12,
      topic: 'Ester - Lipid',
      difficulty: 'VAN_DUNG',
      content: 'Thủy phân hoàn toàn 8,8 gam Ethyl acetate (CH3COOC2H5) trong dung dịch NaOH dư đun nóng, thu được bao nhiêu gam muối CH3COONa?',
      optionA: '8,2 gam',
      optionB: '4,6 gam',
      optionC: '9,6 gam',
      optionD: '12,4 gam',
      correctAnswer: 'A',
      explanation: 'n(CH3COOC2H5) = 8,8 / 88 = 0,1 mol -> m(CH3COONa) = 0,1 * 82 = 8,2 gam.',
    },
  ]);

  // Các biến bộ lọc tìm kiếm câu hỏi
  const [filterGrade, setFilterGrade] = useState('ALL');
  const [filterDifficulty, setFilterDifficulty] = useState('ALL');
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedKeyword = useDebounce(searchKeyword, 300);

  // State điều khiển Modal thêm câu hỏi mới
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    grade: '12',
    topic: CHEMISTRY_TOPICS[12][0],
    difficulty: 'NHAN_BIET',
    content: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
    explanation: '',
  });

  // Xử lý thêm câu hỏi mới vào Ngân hàng câu hỏi
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await teacherService.createQuestion(newQuestion);
    } catch (err) {
      // Cập nhật trực tiếp trên state khi chạy độc lập
    }
    const created = {
      id: Date.now(),
      ...newQuestion,
      grade: Number(newQuestion.grade),
    };
    setQuestions([created, ...questions]);
    setIsModalOpen(false);
  };

  // Xử lý xóa câu hỏi khỏi Ngân hàng
  const handleDeleteQuestion = async (id) => {
    try {
      await teacherService.deleteQuestion(id);
    } catch (err) {
      // Xóa trực tiếp trên giao diện
    }
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Lọc danh sách câu hỏi theo Khối lớp, Mức độ và Từ khóa tìm kiếm
  const filteredQuestions = questions.filter((q) => {
    const matchGrade = filterGrade === 'ALL' || q.grade === Number(filterGrade);
    const matchDiff = filterDifficulty === 'ALL' || q.difficulty === filterDifficulty;
    const matchKeyword =
      !debouncedKeyword ||
      q.content.toLowerCase().includes(debouncedKeyword.toLowerCase()) ||
      q.topic.toLowerCase().includes(debouncedKeyword.toLowerCase());
    return matchGrade && matchDiff && matchKeyword;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Ngân Hàng Câu Hỏi Hóa Học THPT</h2>
          <p className="text-sm text-slate-500 mt-1">
            Lưu trữ tập trung, phân loại theo khối lớp, chủ đề, mức độ tư duy và tái sử dụng linh hoạt để tạo đề thi
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Thêm câu hỏi Hóa học</Button>
      </div>

      {/* Thanh công cụ tìm kiếm và lọc câu hỏi */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Tìm kiếm theo nội dung câu hỏi, công thức hóa học hoặc chủ đề..."
            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
          >
            <option value="ALL">Tất cả khối lớp (10, 11, 12)</option>
            <option value="10">Hóa học Lớp 10</option>
            <option value="11">Hóa học Lớp 11</option>
            <option value="12">Hóa học Lớp 12</option>
          </select>
        </div>
        <div>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
          >
            <option value="ALL">Tất cả mức độ tư duy</option>
            {DIFFICULTY_LEVELS.map((lv) => (
              <option key={lv.value} value={lv.value}>
                {lv.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Danh sách câu hỏi Hóa học */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold">
                  Hóa {q.grade} - {q.topic}
                </span>
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-semibold">
                  Mức độ: {q.difficulty}
                </span>
              </div>
              <Button variant="danger" onClick={() => handleDeleteQuestion(q.id)} className="px-2.5 py-1 text-xs">
                Xóa
              </Button>
            </div>

            <p className="text-sm font-bold text-slate-800">
              Câu {idx + 1}: {q.content}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm">
              <div className={`p-2 rounded border ${q.correctAnswer === 'A' ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-800' : 'bg-slate-50 border-slate-200'}`}>
                A. {q.optionA}
              </div>
              <div className={`p-2 rounded border ${q.correctAnswer === 'B' ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-800' : 'bg-slate-50 border-slate-200'}`}>
                B. {q.optionB}
              </div>
              <div className={`p-2 rounded border ${q.correctAnswer === 'C' ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-800' : 'bg-slate-50 border-slate-200'}`}>
                C. {q.optionC}
              </div>
              <div className={`p-2 rounded border ${q.correctAnswer === 'D' ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-800' : 'bg-slate-50 border-slate-200'}`}>
                D. {q.optionD}
              </div>
            </div>

            {q.explanation && (
              <p className="mt-3 text-xs text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
                Giải thích: {q.explanation}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Modal thêm câu hỏi mới */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thêm câu hỏi Hóa học mới">
        <form onSubmit={handleAddQuestion} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Khối lớp</label>
              <select
                value={newQuestion.grade}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    grade: e.target.value,
                    topic: CHEMISTRY_TOPICS[e.target.value][0],
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              >
                <option value="10">Lớp 10</option>
                <option value="11">Lớp 11</option>
                <option value="12">Lớp 12</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mức độ tư duy</label>
              <select
                value={newQuestion.difficulty}
                onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              >
                {DIFFICULTY_LEVELS.map((lv) => (
                  <option key={lv.value} value={lv.value}>
                    {lv.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Chủ đề Hóa học</label>
            <select
              value={newQuestion.topic}
              onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              {CHEMISTRY_TOPICS[newQuestion.grade].map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nội dung câu hỏi</label>
            <textarea
              rows={2}
              required
              value={newQuestion.content}
              onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              placeholder="Đáp án A"
              value={newQuestion.optionA}
              onChange={(e) => setNewQuestion({ ...newQuestion, optionA: e.target.value })}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
            />
            <input
              type="text"
              required
              placeholder="Đáp án B"
              value={newQuestion.optionB}
              onChange={(e) => setNewQuestion({ ...newQuestion, optionB: e.target.value })}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
            />
            <input
              type="text"
              required
              placeholder="Đáp án C"
              value={newQuestion.optionC}
              onChange={(e) => setNewQuestion({ ...newQuestion, optionC: e.target.value })}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
            />
            <input
              type="text"
              required
              placeholder="Đáp án D"
              value={newQuestion.optionD}
              onChange={(e) => setNewQuestion({ ...newQuestion, optionD: e.target.value })}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Đáp án đúng</label>
            <select
              value={newQuestion.correctAnswer}
              onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="A">Đáp án A</option>
              <option value="B">Đáp án B</option>
              <option value="C">Đáp án C</option>
              <option value="D">Đáp án D</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Lưu vào Ngân hàng</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}