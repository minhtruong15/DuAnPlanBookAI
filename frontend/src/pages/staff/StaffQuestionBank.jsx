import React, { useState } from 'react';
import { CHEMISTRY_TOPICS, DIFFICULTY_LEVELS } from '../../utils/constants';
import Button from '../../components/common/Button';
import { staffService } from '../../services/staffService';

export default function StaffQuestionBank() {
  // Danh sách câu hỏi gốc do Staff biên soạn cho Ngân hàng câu hỏi hệ thống
  const [questions, setQuestions] = useState([
    {
      id: 1,
      grade: 10,
      topic: 'Bảng tuần hoàn các nguyên tố hóa học',
      difficulty: 'NHAN_BIET',
      content: 'Trong bảng tuần hoàn, các nguyên tố được sắp xếp theo chiều tăng dần của đại lượng nào?',
      correctAnswer: 'A. Điện tích hạt nhân nguyên tử',
      status: 'APPROVED',
    },
    {
      id: 2,
      grade: 11,
      topic: 'Hydrocarbon (Alkane, Alkene, Alkyne, Arene)',
      difficulty: 'THONG_HIEU',
      content: 'Chất nào sau đây có khả năng tham gia phản ứng tráng bạc với dung dịch AgNO3/NH3?',
      correctAnswer: 'C. Acetylene (không tráng bạc, tạo kết tủa vàng C2Ag2)',
      status: 'PENDING',
    },
  ]);

  const [newQ, setNewQ] = useState({
    grade: '10',
    topic: CHEMISTRY_TOPICS[10][0],
    difficulty: 'NHAN_BIET',
    content: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
  });

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    try {
      await staffService.createQuestion(newQ);
    } catch (err) {
      // Fallback lưu trực tiếp
    }
    setQuestions([
      {
        id: Date.now(),
        grade: Number(newQ.grade),
        topic: newQ.topic,
        difficulty: newQ.difficulty,
        content: newQ.content,
        correctAnswer: `Đáp án ${newQ.correctAnswer}`,
        status: 'PENDING',
      },
      ...questions,
    ]);
    setNewQ({ ...newQ, content: '', optionA: '', optionB: '', optionC: '', optionD: '' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Xây Dựng Ngân Hàng Câu Hỏi Gốc (Staff)</h2>
        <p className="text-sm text-slate-500 mt-1">
          Biên soạn câu hỏi chuẩn theo môn Hóa học, chủ đề và mức độ tư duy để đóng góp vào kho học liệu chung
        </p>

        <form onSubmit={handleCreateQuestion} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Khối lớp</label>
            <select
              value={newQ.grade}
              onChange={(e) =>
                setNewQ({
                  ...newQ,
                  grade: e.target.value,
                  topic: CHEMISTRY_TOPICS[e.target.value][0],
                })
              }
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="10">Lớp 10</option>
              <option value="11">Lớp 11</option>
              <option value="12">Lớp 12</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Chủ đề Hóa học</label>
            <select
              value={newQ.topic}
              onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              {CHEMISTRY_TOPICS[newQ.grade].map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mức độ nhận thức</label>
            <select
              value={newQ.difficulty}
              onChange={(e) => setNewQ({ ...newQ, difficulty: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              {DIFFICULTY_LEVELS.map((lv) => (
                <option key={lv.value} value={lv.value}>
                  {lv.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung câu hỏi Hóa học</label>
            <input
              type="text"
              required
              value={newQ.content}
              onChange={(e) => setNewQ({ ...newQ, content: e.target.value })}
              placeholder="Nhập câu hỏi trắc nghiệm Hóa học..."
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <Button type="submit">+ Gửi câu hỏi chờ duyệt</Button>
          </div>
        </form>
      </div>

      {/* Danh sách câu hỏi gốc của Staff */}
      <div className="space-y-3">
        {questions.map((q) => (
          <div key={q.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-indigo-600">
                Hóa {q.grade} - {q.topic} ({q.difficulty})
              </span>
              <p className="text-sm font-bold text-slate-800 mt-1">{q.content}</p>
              <p className="text-xs text-emerald-700 mt-1">{q.correctAnswer}</p>
            </div>
            <span
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                q.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}
            >
              {q.status === 'APPROVED' ? 'Đã duyệt' : 'Chờ duyệt'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}