// File: frontend/src/pages/staff/StaffQuestionBank.jsx
// Chức năng: Phân hệ Staff Xây dựng Ngân hàng Câu hỏi Hóa học Hệ thống & Gửi Manager Phê duyệt
// Tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';

const StaffQuestionBank = () => {
  const [staffQuestions, setStaffQuestions] = useState([
    {
      id: 'ST-Q101',
      grade: 'Lớp 12',
      topic: 'Carbohydrate',
      level: 'Thông hiểu',
      status: 'Chờ duyệt',
      content: 'Thuốc thử dùng để phân biệt dung dịch Glucose và dung dịch Glycerol là:',
      options: ['Cu(OH)2 ở nhiệt độ thường', 'Dung dịch AgNO3 trong NH3, đun nóng', 'Kim loại Na', 'Nước Bromine'],
      correct: 'B',
    },
    {
      id: 'ST-Q102',
      grade: 'Lớp 10',
      topic: 'Phản ứng Oxi hóa - Khử',
      level: 'Nhận biết',
      status: 'Đã duyệt',
      content: 'Số oxi hóa của nguyên tử Sulfur (S) trong phân tử H2SO4 là:',
      options: ['+2', '+4', '+6', '-2'],
      correct: 'C',
    },
  ]);

  const [form, setForm] = useState({
    grade: 'Lớp 10',
    topic: 'Cấu tạo nguyên tử',
    level: 'Nhận biết',
    content: '',
    options: ['', '', '', ''],
    correct: 'A',
  });

  const handleAddAndSubmit = (submitStatus) => {
    if (!form.content.trim()) {
      alert('Vui lòng nhập nội dung câu hỏi Hóa học!');
      return;
    }
    const newItem = {
      ...form,
      id: `ST-Q${Math.floor(103 + Math.random() * 800)}`,
      status: submitStatus,
    };
    setStaffQuestions((prev) => [newItem, ...prev]);
    setForm({
      grade: 'Lớp 10',
      topic: 'Cấu tạo nguyên tử',
      level: 'Nhận biết',
      content: '',
      options: ['', '', '', ''],
      correct: 'A',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#064e3b', margin: 0 }}>
          Biên soạn Ngân hàng Câu hỏi Hệ thống
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: 6, marginBottom: 0 }}>
          Xây dựng kho câu hỏi chuẩn Chương trình GDPT 2018 và gửi lên Manager kiểm duyệt.
        </p>
      </div>

      {/* Form Biên soạn */}
      <div style={{ background: '#ffffff', padding: 26, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
          Biên soạn Câu hỏi Trắc nghiệm Hóa học Mới
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700 }}>
            <option value="Lớp 10">Lớp 10</option>
            <option value="Lớp 11">Lớp 11</option>
            <option value="Lớp 12">Lớp 12</option>
          </select>
          <input type="text" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Chuyên đề Hóa học..." style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1' }} />
          <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700 }}>
            <option value="Nhận biết">Nhận biết</option>
            <option value="Thông hiểu">Thông hiểu</option>
            <option value="Vận dụng">Vận dụng</option>
            <option value="Vận dụng cao">Vận dụng cao</option>
          </select>
          <select value={form.correct} onChange={(e) => setForm({ ...form, correct: e.target.value })} style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700 }}>
            <option value="A">Đáp án đúng: A</option>
            <option value="B">Đáp án đúng: B</option>
            <option value="C">Đáp án đúng: C</option>
            <option value="D">Đáp án đúng: D</option>
          </select>
        </div>

        <textarea
          rows="2"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Nhập nội dung đề bài câu hỏi Hóa học..."
          style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {['A', 'B', 'C', 'D'].map((char, idx) => (
            <input
              key={char}
              type="text"
              value={form.options[idx]}
              onChange={(e) => {
                const updated = [...form.options];
                updated[idx] = e.target.value;
                setForm({ ...form, options: updated });
              }}
              placeholder={`Phương án ${char}...`}
              style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1' }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button onClick={() => handleAddAndSubmit('Bản nháp')} style={{ padding: '10px 18px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>
            Lưu Bản nháp
          </button>
          <button onClick={() => handleAddAndSubmit('Chờ duyệt')} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#059669', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>
            Gửi Manager Phê duyệt
          </button>
        </div>
      </div>

      {/* Danh sách Câu hỏi Staff */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {staffQuestions.map((q) => (
          <div key={q.id} style={{ background: '#ffffff', padding: 22, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: 8, fontFamily: 'monospace', fontWeight: 800, fontSize: '0.78rem' }}>{q.id}</span>
                <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: 8, fontWeight: 800, fontSize: '0.78rem' }}>{q.grade} • {q.topic}</span>
                <span style={{ background: '#ede9fe', color: '#6d28d9', padding: '4px 10px', borderRadius: 8, fontWeight: 800, fontSize: '0.78rem' }}>{q.level}</span>
              </div>
              <span style={{ background: q.status === 'Đã duyệt' ? '#dcfce7' : q.status === 'Chờ duyệt' ? '#fef3c7' : '#f1f5f9', color: q.status === 'Đã duyệt' ? '#166534' : q.status === 'Chờ duyệt' ? '#92400e' : '#475569', padding: '4px 12px', borderRadius: 12, fontSize: '0.76rem', fontWeight: 800 }}>
                {q.status}
              </span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{q.content}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
              {['A', 'B', 'C', 'D'].map((char, idx) => (
                <div
                  key={char}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 10,
                    border: `1px solid ${q.correct === char ? '#4ade80' : '#e2e8f0'}`,
                    background: q.correct === char ? '#dcfce7' : '#f8fafc',
                    fontWeight: q.correct === char ? 700 : 500,
                    color: q.correct === char ? '#166534' : '#334155',
                    fontSize: '0.86rem',
                  }}
                >
                  <b>{char}.</b> {q.options[idx]}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffQuestionBank;