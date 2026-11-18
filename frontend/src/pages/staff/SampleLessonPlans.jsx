// File: frontend/src/pages/staff/SampleLessonPlans.jsx
// Chức năng: Phân hệ Staff Biên soạn Kho Giáo án Mẫu Hóa học Chuẩn Công văn 5512 & Gửi Manager Phê duyệt
// Tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';

const SampleLessonPlans = () => {
  const [samples, setSamples] = useState([
    {
      id: 'SMP-5512-01',
      title: '[MẪU 5512] Phản ứng Oxi hóa - Khử và Ứng dụng',
      grade: 'Lớp 10',
      status: 'Đã duyệt',
      objectives:
        'Xác định được số oxi hóa và cân bằng phương trình theo phương pháp thăng bằng electron.',
      activities:
        '4 Hoạt động: Khởi động (Đinh sắt bị gỉ) -> Hình thành kiến thức (4 bước thăng bằng e) -> Luyện tập -> Vận dụng.',
    },
    {
      id: 'SMP-5512-02',
      title: '[MẪU 5512] Bài 7: Tốc độ Phản ứng và Chất xúc tác',
      grade: 'Lớp 10',
      status: 'Chờ duyệt',
      objectives:
        'Trình bày được khái niệm tốc độ phản ứng và 5 yếu tố ảnh hưởng đến tốc độ phản ứng hóa học.',
      activities:
        '4 Hoạt động: Khởi động -> Thí nghiệm H2O2 + MnO2 -> Luyện tập 5 câu trắc nghiệm -> Vận dụng bảo quản thực phẩm.',
    },
  ]);

  const [form, setForm] = useState({
    title: '',
    grade: 'Lớp 10',
    objectives: '',
    activities: '',
  });

  const handleCreateSample = (submitStatus) => {
    if (!form.title.trim()) {
      alert('Vui lòng nhập Tên Giáo án Mẫu 5512!');
      return;
    }
    const created = {
      ...form,
      id: `SMP-5512-0${samples.length + 1}`,
      status: submitStatus,
    };
    setSamples((prev) => [created, ...prev]);
    setForm({ title: '', grade: 'Lớp 10', objectives: '', activities: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#064e3b', margin: 0 }}>
          Biên soạn Kho Giáo án Mẫu Hóa học (Chuẩn 5512)
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: 6, marginBottom: 0 }}>
          Xây dựng các Mẫu Kế hoạch bài dạy chuẩn Công văn 5512 để Manager phê duyệt và cung cấp cho Giáo viên.
        </p>
      </div>

      {/* Form Biên soạn Giáo án Mẫu */}
      <div style={{ background: '#ffffff', padding: 26, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
          Thiết kế Giáo án Mẫu Chuẩn 5512 Mới
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>Tên Bài dạy Mẫu *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="VD: [MẪU 5512] Bài 12: Carbohydrate - Glucose và Fructose"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>Khối lớp THPT</label>
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700 }}
            >
              <option value="Lớp 10">Lớp 10</option>
              <option value="Lớp 11">Lớp 11</option>
              <option value="Lớp 12">Lớp 12</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
            I. Mục tiêu Yêu cầu cần đạt (Kiến thức, Năng lực Hóa học, Phẩm chất)
          </label>
          <textarea
            rows="2"
            value={form.objectives}
            onChange={(e) => setForm({ ...form, objectives: e.target.value })}
            placeholder="Nhập mục tiêu chuẩn Kiến thức, Năng lực, Phẩm chất..."
            style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
            II. Tiến trình 4 Hoạt động (Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng)
          </label>
          <textarea
            rows="3"
            value={form.activities}
            onChange={(e) => setForm({ ...form, activities: e.target.value })}
            placeholder="Nhập tóm tắt tiến trình 4 hoạt động sư phạm..."
            style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            onClick={() => handleCreateSample('Bản nháp')}
            style={{ padding: '10px 18px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
          >
            Lưu Bản nháp
          </button>
          <button
            onClick={() => handleCreateSample('Chờ duyệt')}
            style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#059669', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
          >
            Gửi Manager Phê duyệt
          </button>
        </div>
      </div>

      {/* Danh sách Giáo án Mẫu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {samples.map((s) => (
          <div key={s.id} style={{ background: '#ffffff', padding: 22, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800 }}>
                {s.id} • Hóa học {s.grade}
              </span>
              <span style={{ background: s.status === 'Đã duyệt' ? '#dcfce7' : s.status === 'Chờ duyệt' ? '#fef3c7' : '#f1f5f9', color: s.status === 'Đã duyệt' ? '#166534' : s.status === 'Chờ duyệt' ? '#92400e' : '#475569', padding: '4px 12px', borderRadius: 12, fontSize: '0.76rem', fontWeight: 800 }}>
                {s.status}
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.08rem', fontWeight: 800, color: '#0f172a' }}>{s.title}</h3>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#475569' }}><b>Mục tiêu:</b> {s.objectives}</p>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b' }}><b>Tiến trình 5512:</b> {s.activities}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleLessonPlans;