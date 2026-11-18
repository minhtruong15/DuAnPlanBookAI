import React, { useState } from 'react';
import Button from '../../components/common/Button';

export default function FrameworkConfig() {
  // Danh sách các Khung chương trình & Template Giáo án chuẩn do Admin quản lý
  const [frameworks, setFrameworks] = useState([
    {
      id: 1,
      grade: 10,
      title: 'Khung Kế hoạch bài dạy Hóa học 10 - Chuẩn Công văn 5512',
      structure:
        'I. Mục tiêu (Năng lực hóa học, Phẩm chất) -> II. Thiết bị dạy học & Học liệu -> III. Tiến trình dạy học (Hoạt động 1: Mở đầu, Hoạt động 2: Hình thành kiến thức, Hoạt động 3: Luyện tập, Hoạt động 4: Vận dụng)',
    },
    {
      id: 2,
      grade: 11,
      title: 'Khung Kế hoạch bài dạy Hóa học 11 - Chuyên đề Hữu cơ & Cân bằng hóa học',
      structure:
        'I. Mục tiêu bài học -> II. Chuẩn bị hóa chất & dụng cụ thí nghiệm -> III. Tổ chức 4 hoạt động học tập tích cực',
    },
    {
      id: 3,
      grade: 12,
      title: 'Khung Kế hoạch bài dạy & Ôn thi Tốt nghiệp THPT Hóa học 12',
      structure:
        'I. Hệ thống hóa lý thuyết trọng tâm -> II. Phân dạng bài tập (Nhận biết, Thông hiểu, Vận dụng) -> III. Bài tập tự luyện có hướng dẫn giải',
    },
  ]);

  const [newFramework, setNewFramework] = useState({
    grade: '10',
    title: '',
    structure: '',
  });

  // Thêm mới khung chương trình chuẩn
  const handleAddFramework = (e) => {
    e.preventDefault();
    if (!newFramework.title.trim()) return;
    setFrameworks([
      ...frameworks,
      {
        id: Date.now(),
        grade: Number(newFramework.grade),
        title: newFramework.title,
        structure: newFramework.structure,
      },
    ]);
    setNewFramework({ grade: '10', title: '', structure: '' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Quản Lý Khung Chương Trình & Template Giáo Án</h2>
        <p className="text-sm text-slate-500 mt-1">
          Thiết lập khung chuẩn chương trình GDPT 2018 môn Hóa học THPT làm khuôn mẫu gốc cho Gemini AI
        </p>

        {/* Biểu mẫu thêm khung chương trình mới */}
        <form onSubmit={handleAddFramework} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Khối lớp áp dụng</label>
            <select
              value={newFramework.grade}
              onChange={(e) => setNewFramework({ ...newFramework, grade: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="10">Khối Lớp 10</option>
              <option value="11">Khối Lớp 11</option>
              <option value="12">Khối Lớp 12</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên khung chương trình / Template</label>
            <input
              type="text"
              required
              value={newFramework.title}
              onChange={(e) => setNewFramework({ ...newFramework, title: e.target.value })}
              placeholder="Ví dụ: Khung Giáo án Thí nghiệm Thực hành Hóa 10"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Cấu trúc các mục bắt buộc trong Giáo án</label>
            <textarea
              rows={3}
              required
              value={newFramework.structure}
              onChange={(e) => setNewFramework({ ...newFramework, structure: e.target.value })}
              placeholder="Nhập cấu trúc các phần I, II, III..."
              className="w-full p-3 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <Button type="submit">+ Thêm khung chương trình</Button>
          </div>
        </form>
      </div>

      {/* Danh sách các khung chương trình hiện có */}
      <div className="space-y-4">
        {frameworks.map((fw) => (
          <div key={fw.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold">
                Hóa học Khối {fw.grade}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800">{fw.title}</h3>
            <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {fw.structure}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}