import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { staffService } from '../../services/staffService';

export default function PromptTemplates() {
  // Danh sách các mẫu câu lệnh Prompt AI do Staff quản lý CRUD
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      name: 'Prompt Soạn Giáo Án Hóa Học Chuẩn Công Văn 5512',
      category: 'LESSON_PLAN',
      promptContent:
        'Bạn là Chuyên gia Sư phạm Hóa học THPT. Hãy soạn Kế hoạch bài dạy chuẩn Công văn 5512 cho môn Hóa học lớp {{grade}}, bài "{{topic}}" trong {{duration}} tiết gồm 4 hoạt động.',
      approvalStatus: 'APPROVED',
    },
    {
      id: 2,
      name: 'Prompt Tạo Bài Tập Hóa Học Phân Hóa 3 Mức Độ',
      category: 'EXERCISE',
      promptContent:
        'Hãy tạo bộ bài tập Hóa học lớp {{grade}}, chủ đề "{{topic}}" ở mức độ {{level}} kèm phương trình hóa học và hướng dẫn giải chi tiết.',
      approvalStatus: 'APPROVED',
    },
  ]);

  const [newPrompt, setNewPrompt] = useState({
    name: '',
    category: 'LESSON_PLAN',
    promptContent: '',
  });

  // Xử lý lưu mẫu Prompt AI mới
  const handleSavePrompt = async (e) => {
    e.preventDefault();
    try {
      await staffService.savePrompt(newPrompt);
    } catch (err) {
      // Lưu trực tiếp vào state
    }
    setPrompts([
      {
        id: Date.now(),
        ...newPrompt,
        approvalStatus: 'PENDING',
      },
      ...prompts,
    ]);
    setNewPrompt({ name: '', category: 'LESSON_PLAN', promptContent: '' });
  };

  // Xử lý xóa mẫu Prompt AI
  const handleDeletePrompt = (id) => {
    setPrompts(prompts.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Quản Lý CRUD Template Prompt AI (Staff)</h2>
        <p className="text-sm text-slate-500 mt-1">
          Thiết kế và tối ưu hóa các khuôn mẫu câu lệnh Prompt AI chứa biến động {'{{grade}}'}, {'{{topic}}'}, {'{{level}}'} cho Gemini AI
        </p>

        <form onSubmit={handleSavePrompt} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên mẫu câu lệnh Prompt AI</label>
            <input
              type="text"
              required
              value={newPrompt.name}
              onChange={(e) => setNewPrompt({ ...newPrompt, name: e.target.value })}
              placeholder="Ví dụ: Prompt Tạo Câu Hỏi Trắc Nghiệm Thực Nghiệm Hóa Học"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phân loại công cụ AI</label>
            <select
              value={newPrompt.category}
              onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="LESSON_PLAN">LESSON_PLAN (Soạn Giáo án AI)</option>
              <option value="EXERCISE">EXERCISE (Tạo Bài tập thông minh)</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nội dung câu lệnh gốc (Sử dụng {'{{grade}}'}, {'{{topic}}'}, {'{{level}}'})
            </label>
            <textarea
              rows={3}
              required
              value={newPrompt.promptContent}
              onChange={(e) => setNewPrompt({ ...newPrompt, promptContent: e.target.value })}
              placeholder="Nhập câu lệnh System Prompt cho Gemini AI..."
              className="w-full p-3 border border-slate-300 rounded-lg text-sm font-mono"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <Button type="submit">+ Lưu Template Prompt AI</Button>
          </div>
        </form>
      </div>

      {/* Danh sách các Template Prompt AI */}
      <div className="space-y-4">
        {prompts.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold">
                  {p.category}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                    p.approvalStatus === 'APPROVED'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {p.approvalStatus === 'APPROVED' ? 'Đã duyệt' : 'Chờ Manager duyệt'}
                </span>
              </div>
              <Button variant="danger" onClick={() => handleDeletePrompt(p.id)} className="px-2.5 py-1 text-xs">
                Xóa
              </Button>
            </div>

            <h3 className="text-base font-bold text-slate-800">{p.name}</h3>
            <p className="text-xs font-mono text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
              {p.promptContent}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}