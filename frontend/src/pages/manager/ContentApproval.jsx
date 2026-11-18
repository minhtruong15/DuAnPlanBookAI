// File: frontend/src/pages/manager/ContentApproval.jsx
// Chức năng: Phê duyệt Giáo án Mẫu 5512 & Ngân hàng Câu hỏi từ Staff đồng bộ từ ContentApproval.jsx của PlanbookAI-main
// Tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';

const ContentApproval = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const [templates, setTemplates] = useState([
    {
      id: 'TPL-WAIT-01',
      title: '[MẪU 5512] Bài 7: Tốc độ Phản ứng và Chất xúc tác',
      grade: 'Lớp 10',
      author: 'staff@planbookai.vn (Tổ Chuyên viên Hóa)',
      submittedAt: '18/11/2026',
      status: 'Chờ duyệt',
      objectives:
        'Trình bày được khái niệm tốc độ phản ứng hóa học và 5 yếu tố ảnh hưởng (nồng độ, áp suất, nhiệt độ, diện tích bề mặt, chất xúc tác).',
      activitiesSummary:
        'Hoạt động 1: So sánh tốc độ cháy của than trong không khí và trong bình O2 nguyên chất. Hoạt động 2: Thí nghiệm H2O2 phân hủy khi có MnO2. Hoạt động 3: Giải 5 câu trắc nghiệm tính tốc độ trung bình. Hoạt động 4: Ứng dụng bảo quản thực phẩm trong tủ lạnh.',
    },
    {
      id: 'TPL-WAIT-02',
      title: '[MẪU 5512] Bài 12: Carbohydrate - Glucose và Fructose',
      grade: 'Lớp 12',
      author: 'staff@planbookai.vn (Tổ Chuyên viên Hóa)',
      submittedAt: '18/11/2026',
      status: 'Chờ duyệt',
      objectives:
        'Viết được công thức cấu tạo mạch hở, mạch vòng và phương trình phản ứng tráng bạc của Glucose, Fructose.',
      activitiesSummary:
        'Hoạt động 1: Tìm hiểu nồng độ glucose trong máu người. Hoạt động 2: Thí nghiệm Glucose tác dụng với Cu(OH)2 và AgNO3/NH3. Hoạt động 3: Bài tập tính lượng Ag kết tủa. Hoạt động 4: Quy trình tráng ruột phích và gương soi.',
    },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 'Q-STAFF-01',
      grade: 'Lớp 12',
      level: 'Thông hiểu',
      author: 'staff@planbookai.vn',
      submittedAt: '18/11/2026',
      status: 'Chờ duyệt',
      content: 'Thuốc thử dùng để phân biệt dung dịch Glucose và dung dịch Glycerol là:',
      options: ['Cu(OH)2 ở nhiệt độ thường', 'Dung dịch AgNO3 trong NH3, đun nóng', 'Kim loại Na', 'Nước Bromine'],
      correct: 'B',
    },
    {
      id: 'Q-STAFF-02',
      grade: 'Lớp 11',
      level: 'Vận dụng',
      author: 'staff@planbookai.vn',
      submittedAt: '18/11/2026',
      status: 'Chờ duyệt',
      content: 'Dung dịch HCl 0,01M có giá trị pH bằng bao nhiêu (giả sử HCl điện li hoàn toàn)?',
      options: ['pH = 1', 'pH = 2', 'pH = 12', 'pH = 3'],
      correct: 'B',
    },
  ]);

  const handleDecisionTemplate = (id, newStatus) => {
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
    setPreviewTemplate(null);
  };

  const handleDecisionQuestion = (id, newStatus) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Header màu Emerald giống ContentApproval.jsx bản cũ */}
      <div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#047857', margin: 0 }}>
          Phê duyệt Nội dung
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: 6, marginBottom: 0 }}>
          Kiểm duyệt Giáo án Mẫu và Ngân hàng Câu hỏi Hóa học từ đội ngũ Staff trước khi phát hành.
        </p>
      </div>

      {/* Thanh Tabs màu #ecfdf5 giống bản cũ */}
      <div style={{ display: 'flex', gap: 12, background: '#ffffff', padding: 8, borderRadius: 16, width: 'fit-content', border: '1px solid #e2e8f0' }}>
        <button
          onClick={() => setActiveTab('templates')}
          style={{
            padding: '10px 20px',
            borderRadius: 12,
            border: 'none',
            background: activeTab === 'templates' ? '#ecfdf5' : 'transparent',
            color: activeTab === 'templates' ? '#047857' : '#64748b',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Giáo án Mẫu ({templates.length})
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          style={{
            padding: '10px 20px',
            borderRadius: 12,
            border: 'none',
            background: activeTab === 'questions' ? '#ecfdf5' : 'transparent',
            color: activeTab === 'questions' ? '#047857' : '#64748b',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Ngân hàng Câu hỏi ({questions.length})
        </button>
      </div>

      {/* Khu vực Danh sách */}
      <div style={{ background: '#ffffff', borderRadius: 24, padding: 28, border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.04)' }}>
        {activeTab === 'templates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
              Danh sách Giáo án Mẫu chờ duyệt
            </h3>
            {templates.map((t) => (
              <div key={t.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: 20, border: '1px solid #e2e8f0', borderRadius: 16, background: '#f8fafc' }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <span style={{ padding: '4px 10px', background: '#e0e7ff', color: '#4338ca', borderRadius: 6, fontSize: '0.75rem', fontWeight: 800 }}>Hóa học</span>
                    <span style={{ padding: '4px 10px', background: '#f1f5f9', color: '#475569', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700 }}>{t.grade}</span>
                    <span style={{ padding: '4px 10px', background: t.status === 'Đã duyệt' ? '#dcfce7' : t.status === 'Từ chối' ? '#fee2e2' : '#fef3c7', color: t.status === 'Đã duyệt' ? '#166534' : t.status === 'Từ chối' ? '#991b1b' : '#92400e', borderRadius: 6, fontSize: '0.75rem', fontWeight: 800 }}>
                      {t.status}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#1e293b', margin: '0 0 4px 0' }}>{t.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.84rem', margin: 0 }}>Người tạo: {t.author} • Ngày gửi: {t.submittedAt}</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setPreviewTemplate(t)} style={{ padding: '9px 16px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 10, cursor: 'pointer', color: '#475569', fontWeight: 700 }}>
                    Xem chi tiết
                  </button>
                  <button onClick={() => handleDecisionTemplate(t.id, 'Từ chối')} style={{ padding: '9px 16px', background: '#fee2e2', border: 'none', borderRadius: 10, cursor: 'pointer', color: '#ef4444', fontWeight: 700 }}>
                    Từ chối
                  </button>
                  <button onClick={() => handleDecisionTemplate(t.id, 'Đã duyệt')} style={{ padding: '9px 18px', background: '#10b981', border: 'none', borderRadius: 10, cursor: 'pointer', color: '#ffffff', fontWeight: 700 }}>
                    Duyệt ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'questions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
              Danh sách Câu hỏi chờ duyệt
            </h3>
            {questions.map((q) => (
              <div key={q.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 18, padding: 20, border: '1px solid #e2e8f0', borderRadius: 16, background: '#f8fafc' }}>
                <div style={{ flex: 1, minWidth: 280 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <span style={{ padding: '4px 10px', background: '#e0e7ff', color: '#4338ca', borderRadius: 6, fontSize: '0.75rem', fontWeight: 800 }}>Hóa học</span>
                    <span style={{ padding: '4px 10px', background: '#f1f5f9', color: '#475569', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700 }}>{q.grade}</span>
                    <span style={{ padding: '4px 10px', background: '#fef08a', color: '#854d0e', borderRadius: 6, fontSize: '0.75rem', fontWeight: 800 }}>{q.level}</span>
                    <span style={{ padding: '4px 10px', background: q.status === 'Đã duyệt' ? '#dcfce7' : q.status === 'Từ chối' ? '#fee2e2' : '#fef3c7', color: q.status === 'Đã duyệt' ? '#166534' : q.status === 'Từ chối' ? '#991b1b' : '#92400e', borderRadius: 6, fontSize: '0.75rem', fontWeight: 800 }}>
                      {q.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 12px 0' }}>{q.content}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                    {['A', 'B', 'C', 'D'].map((char, idx) => (
                      <div
                        key={char}
                        style={{
                          padding: '8px 12px',
                          background: q.correct === char ? '#dcfce7' : '#ffffff',
                          border: `1px solid ${q.correct === char ? '#4ade80' : '#e2e8f0'}`,
                          borderRadius: 8,
                          fontSize: '0.86rem',
                          fontWeight: q.correct === char ? 700 : 500,
                          color: q.correct === char ? '#166534' : '#334155',
                        }}
                      >
                        <b>{char}.</b> {q.options[idx]}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button onClick={() => handleDecisionQuestion(q.id, 'Đã duyệt')} style={{ padding: '11px 18px', background: '#10b981', border: 'none', borderRadius: 10, cursor: 'pointer', color: '#ffffff', fontWeight: 700 }}>
                    Duyệt câu hỏi
                  </button>
                  <button onClick={() => handleDecisionQuestion(q.id, 'Từ chối')} style={{ padding: '11px 18px', background: '#fee2e2', border: 'none', borderRadius: 10, cursor: 'pointer', color: '#ef4444', fontWeight: 700 }}>
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Xem chi tiết Giáo án Mẫu */}
      {previewTemplate && (
        <div onClick={() => setPreviewTemplate(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 1000 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', borderRadius: 24, maxWidth: 640, width: '100%', padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{previewTemplate.title}</h3>
              <button onClick={() => setPreviewTemplate(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '6px 12px', fontWeight: 700, cursor: 'pointer' }}>Đóng</button>
            </div>
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>
              <b>I. Mục tiêu Bài học:</b>
              <p style={{ margin: '6px 0 0 0' }}>{previewTemplate.objectives}</p>
            </div>
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>
              <b>II. Tiến trình 4 Hoạt động (Công văn 5512):</b>
              <p style={{ margin: '6px 0 0 0' }}>{previewTemplate.activitiesSummary}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => handleDecisionTemplate(previewTemplate.id, 'Từ chối')} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', background: '#fee2e2', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}>Từ chối</button>
              <button onClick={() => handleDecisionTemplate(previewTemplate.id, 'Đã duyệt')} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#10b981', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>Phê duyệt Phát hành</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentApproval;