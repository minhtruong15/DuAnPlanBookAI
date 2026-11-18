import React, { useState } from 'react';
import { CHEMISTRY_TOPICS } from '../../utils/constants';
import Button from '../../components/common/Button';
import { staffService } from '../../services/staffService';

export default function SampleLessonPlans() {
  // Danh sách các Giáo án mẫu Hóa học do Staff biên soạn
  const [samples, setSamples] = useState([
    {
      id: 1,
      grade: 10,
      topic: 'Cấu tạo nguyên tử',
      title: 'Giáo án mẫu Công văn 5512: Thành phần nguyên tử & Nguyên tố hóa học',
      status: 'APPROVED',
    },
    {
      id: 2,
      grade: 12,
      topic: 'Ester - Lipid',
      title: 'Giáo án mẫu Công văn 5512: Khái niệm, Danh pháp và Tính chất hóa học của Ester',
      status: 'PENDING',
    },
  ]);

  const [form, setForm] = useState({
    grade: '10',
    topic: CHEMISTRY_TOPICS[10][0],
    title: '',
    content: '',
  });

  // Gửi Giáo án mẫu mới lên chờ Manager duyệt
  const handleCreateSample = async (e) => {
    e.preventDefault();
    try {
      await staffService.createSampleLessonPlan(form);
    } catch (err) {
      // Fallback lưu trực tiếp trên giao diện
    }
    setSamples([
      {
        id: Date.now(),
        grade: Number(form.grade),
        topic: form.topic,
        title: form.title,
        status: 'PENDING',
      },
      ...samples,
    ]);
    setForm({ ...form, title: '', content: '' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Biên Soạn Giáo Án Mẫu Hóa Học THPT (Staff)</h2>
        <p className="text-sm text-slate-500 mt-1">
          Xây dựng kho giáo án mẫu chuẩn Công văn 5512 gửi lên Manager phê duyệt để Giáo viên toàn hệ thống tham khảo
        </p>

        <form onSubmit={handleCreateSample} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Khối lớp</label>
            <select
              value={form.grade}
              onChange={(e) =>
                setForm({
                  ...form,
                  grade: e.target.value,
                  topic: CHEMISTRY_TOPICS[e.target.value][0],
                })
              }
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="10">Hóa học Lớp 10</option>
              <option value="11">Hóa học Lớp 11</option>
              <option value="12">Hóa học Lớp 12</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Chủ đề Hóa học</label>
            <select
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              {CHEMISTRY_TOPICS[form.grade].map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề Giáo án mẫu</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Ví dụ: Kế hoạch bài dạy chuẩn Công văn 5512 - Bài Liên kết hóa học"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung chi tiết 4 Hoạt động dạy học</label>
            <textarea
              rows={4}
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Nhập nội dung Mục tiêu, Thiết bị dạy học và 4 Hoạt động..."
              className="w-full p-3 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <Button type="submit">+ Lưu & Gửi Manager Duyệt</Button>
          </div>
        </form>
      </div>

      {/* Danh sách Giáo án mẫu đã tạo */}
      <div className="space-y-3">
        {samples.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-indigo-600">
                Hóa học {s.grade} - {s.topic}
              </span>
              <h3 className="text-sm font-bold text-slate-800 mt-1">{s.title}</h3>
            </div>
            <span
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                s.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}
            >
              {s.status === 'APPROVED' ? 'Đã duyệt' : 'Chờ Manager duyệt'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}