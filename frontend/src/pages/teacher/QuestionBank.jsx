// File: frontend/src/pages/teacher/QuestionBank.jsx
// Chức năng: Ngân hàng Câu hỏi Hóa học THPT đồng bộ giao diện Gradient Tím, Inline Edit & Sao chép nhanh từ QuestionBank.jsx của PlanbookAI-main
// Tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';

const QuestionBank = () => {
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // State sửa trực tiếp ngay trên thẻ câu hỏi (Inline Editing)
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [questions, setQuestions] = useState([
    {
      id: 'QB-101',
      grade: 'Lớp 10',
      topic: 'Cấu tạo nguyên tử',
      level: 'Nhận biết',
      content: 'Hạt mang điện tích dương trong hạt nhân nguyên tử là:',
      options: ['Electron', 'Proton', 'Neutron', 'Phân tử'],
      correct: 'B',
      explanation: 'Proton mang điện tích +1, electron mang điện tích -1, neutron không mang điện.',
    },
    {
      id: 'QB-102',
      grade: 'Lớp 10',
      topic: 'Bảng tuần hoàn',
      level: 'Thông hiểu',
      content: 'Nguyên tố X có Z = 17 (Chlorine). Vị trí của X trong Bảng tuần hoàn là:',
      options: ['Chu kỳ 3, nhóm VIIA', 'Chu kỳ 3, nhóm VA', 'Chu kỳ 2, nhóm VIIA', 'Chu kỳ 4, nhóm IIA'],
      correct: 'A',
      explanation: 'Cấu hình e của Cl (Z=17): 1s2 2s2 2p6 3s2 3p5 -> 3 lớp e (Chu kỳ 3), 7e lớp ngoài cùng (Nhóm VIIA).',
    },
    {
      id: 'QB-103',
      grade: 'Lớp 11',
      topic: 'Cân bằng hóa học',
      level: 'Vận dụng',
      content: 'Cho cân bằng: N2(g) + 3H2(g) <-> 2NH3(g) (Delta H < 0). Cân bằng chuyển dịch theo chiều thuận khi:',
      options: ['Tăng nhiệt độ và giảm áp suất', 'Hạ nhiệt độ và tăng áp suất', 'Tăng nhiệt độ và tăng áp suất', 'Thêm chất xúc tác Fe'],
      correct: 'B',
      explanation: 'Phản ứng tỏa nhiệt (Delta H < 0) và làm giảm số mol khí nên hạ nhiệt độ và tăng áp suất sẽ chuyển dịch theo chiều thuận.',
    },
    {
      id: 'QB-104',
      grade: 'Lớp 12',
      topic: 'Ester - Lipid',
      level: 'Vận dụng cao',
      content: 'Thủy phân hoàn toàn 8,8 gam ethyl acetate trong 200 ml dung dịch NaOH 1M, cô cạn thu được bao nhiêu gam chất rắn khan?',
      options: ['8,2 gam', '12,2 gam', '10,4 gam', '16,4 gam'],
      correct: 'B',
      explanation: 'n(ester) = 0,1 mol; n(NaOH) = 0,2 mol -> NaOH dư 0,1 mol. Chất rắn gồm CH3COONa (8,2g) + NaOH dư (4,0g) = 12,2 gam.',
    },
  ]);

  const [newQ, setNewQ] = useState({
    grade: 'Lớp 10',
    topic: 'Liên kết hóa học',
    level: 'Nhận biết',
    content: '',
    options: ['', '', '', ''],
    correct: 'A',
    explanation: '',
  });

  const handleStartEdit = (q) => {
    setEditingId(q.id);
    setEditDraft({ ...q, options: [...q.options] });
  };

  const handleSaveEdit = () => {
    setQuestions((prev) => prev.map((q) => (q.id === editingId ? editDraft : q)));
    setEditingId(null);
    setEditDraft(null);
  };

  const handleCopyQuestion = (q) => {
    const text = `${q.content}\nA. ${q.options[0]}\nB. ${q.options[1]}\nC. ${q.options[2]}\nD. ${q.options[3]}\nĐáp án: ${q.correct}`;
    navigator.clipboard.writeText(text);
    alert(`Đã sao chép câu hỏi [${q.id}] vào bộ nhớ tạm!`);
  };

  const handleCreateQuestion = () => {
    if (!newQ.content.trim()) {
      alert('Vui lòng nhập nội dung câu hỏi Hóa học!');
      return;
    }
    const created = { ...newQ, id: `QB-${Math.floor(105 + Math.random() * 800)}` };
    setQuestions((prev) => [created, ...prev]);
    setNewQ({
      grade: 'Lớp 10',
      topic: 'Liên kết hóa học',
      level: 'Nhận biết',
      content: '',
      options: ['', '', '', ''],
      correct: 'A',
      explanation: '',
    });
    setShowAddForm(false);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchGrade = selectedGrade === 'All' || q.grade === selectedGrade;
    const matchLevel = selectedLevel === 'All' || q.level === selectedLevel;
    const matchSearch =
      q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchGrade && matchLevel && matchSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Header giống QuestionBank.jsx */}
      <div className="glass-panel" style={{ padding: '24px 28px', borderRadius: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#2563eb', margin: 0 }}>
            Ngân hàng Câu hỏi Hóa học THPT
          </h1>
          <p style={{ color: '#64748b', margin: '6px 0 0 0', fontSize: '0.95rem' }}>
            Kho dữ liệu câu hỏi trắc nghiệm thông minh, hỗ trợ chỉnh sửa trực tiếp (Inline Edit) và sao chép nhanh.
          </p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary" style={{ padding: '11px 20px', borderRadius: 12 }}>
          {showAddForm ? 'Đóng Form Thêm' : '+ Thêm Câu hỏi Mới'}
        </button>
      </div>

      {/* Khu vực Thống kê nổi bật Gradient Tím-Chàm giống hệt QuestionBank.jsx bản cũ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            borderRadius: 20,
            padding: 24,
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: '0.88rem', fontWeight: 600, opacity: 0.9 }}>Tổng số câu hỏi</div>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: 4 }}>{questions.length}</div>
        </div>

        {[
          { label: 'Mức Nhận biết', count: questions.filter((q) => q.level === 'Nhận biết').length, color: '#059669' },
          { label: 'Mức Thông hiểu', count: questions.filter((q) => q.level === 'Thông hiểu').length, color: '#2563eb' },
          { label: 'Vận dụng & VDC', count: questions.filter((q) => q.level.includes('Vận dụng')).length, color: '#7c3aed' },
        ].map((st, idx) => (
          <div key={idx} style={{ background: '#ffffff', borderRadius: 20, padding: 24, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>{st.label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: st.color, marginTop: 6 }}>{st.count} Câu</div>
          </div>
        ))}
      </div>

      {/* Form Thêm Câu hỏi Mới */}
      {showAddForm && (
        <div style={{ background: '#ffffff', padding: 24, borderRadius: 20, border: '2px solid #4f46e5', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Thêm Câu hỏi Trắc nghiệm Hóa học Mới</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            <select value={newQ.grade} onChange={(e) => setNewQ({ ...newQ, grade: e.target.value })} style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700 }}>
              <option value="Lớp 10">Lớp 10</option>
              <option value="Lớp 11">Lớp 11</option>
              <option value="Lớp 12">Lớp 12</option>
            </select>
            <input type="text" value={newQ.topic} onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })} placeholder="Chuyên đề..." style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1' }} />
            <select value={newQ.level} onChange={(e) => setNewQ({ ...newQ, level: e.target.value })} style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700 }}>
              <option value="Nhận biết">Nhận biết</option>
              <option value="Thông hiểu">Thông hiểu</option>
              <option value="Vận dụng">Vận dụng</option>
              <option value="Vận dụng cao">Vận dụng cao</option>
            </select>
            <select value={newQ.correct} onChange={(e) => setNewQ({ ...newQ, correct: e.target.value })} style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700 }}>
              <option value="A">Đáp án đúng: A</option>
              <option value="B">Đáp án đúng: B</option>
              <option value="C">Đáp án đúng: C</option>
              <option value="D">Đáp án đúng: D</option>
            </select>
          </div>
          <textarea rows="2" value={newQ.content} onChange={(e) => setNewQ({ ...newQ, content: e.target.value })} placeholder="Nhập nội dung câu hỏi Hóa học..." style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {['A', 'B', 'C', 'D'].map((char, idx) => (
              <input
                key={char}
                type="text"
                value={newQ.options[idx]}
                onChange={(e) => {
                  const opts = [...newQ.options];
                  opts[idx] = e.target.value;
                  setNewQ({ ...newQ, options: opts });
                }}
                placeholder={`Phương án ${char}...`}
                style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #cbd5e1' }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleCreateQuestion} style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#10b981', color: '#ffffff', fontWeight: 800, cursor: 'pointer' }}>
              Lưu vào Ngân hàng
            </button>
          </div>
        </div>
      )}

      {/* Thanh Bộ lọc */}
      <div style={{ background: '#ffffff', padding: 16, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['All', 'Lớp 10', 'Lớp 11', 'Lớp 12'].map((gr) => (
            <button
              key={gr}
              onClick={() => setSelectedGrade(gr)}
              style={{
                padding: '7px 14px',
                borderRadius: 10,
                border: 'none',
                background: selectedGrade === gr ? '#4f46e5' : '#f1f5f9',
                color: selectedGrade === gr ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              {gr === 'All' ? 'Tất cả Khối' : gr}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.84rem', fontWeight: 700 }}>
            <option value="All">Tất cả Mức độ</option>
            <option value="Nhận biết">Nhận biết</option>
            <option value="Thông hiểu">Thông hiểu</option>
            <option value="Vận dụng">Vận dụng</option>
            <option value="Vận dụng cao">Vận dụng cao</option>
          </select>
          <input
            type="text"
            placeholder="Tìm nội dung câu hỏi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.84rem', width: 220 }}
          />
        </div>
      </div>

      {/* Danh sách Câu hỏi */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredQuestions.map((q) => {
          const isEditing = editingId === q.id;
          return (
            <div key={q.id} style={{ background: '#ffffff', padding: 24, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: 8, fontFamily: 'monospace', fontWeight: 800, fontSize: '0.78rem' }}>{q.id}</span>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: 8, fontWeight: 800, fontSize: '0.78rem' }}>{q.grade} • {q.topic}</span>
                  <span style={{ background: '#ede9fe', color: '#6d28d9', padding: '4px 10px', borderRadius: 8, fontWeight: 800, fontSize: '0.78rem' }}>{q.level}</span>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  {isEditing ? (
                    <>
                      <button onClick={handleSaveEdit} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', background: '#10b981', color: '#ffffff', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Lưu thay đổi</button>
                      <button onClick={() => setEditingId(null)} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', background: '#e2e8f0', color: '#334155', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Hủy</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleCopyQuestion(q)} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#334155', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Sao chép</button>
                      <button onClick={() => handleStartEdit(q)} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', background: '#eef2ff', color: '#4338ca', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Sửa trực tiếp</button>
                      <button onClick={() => setQuestions((prev) => prev.filter((item) => item.id !== q.id))} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', background: '#fee2e2', color: '#dc2626', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Xóa</button>
                    </>
                  )}
                </div>
              </div>

              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input
                    type="text"
                    value={editDraft.content}
                    onChange={(e) => setEditDraft({ ...editDraft, content: e.target.value })}
                    style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #4f46e5', fontWeight: 700 }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
                    {['A', 'B', 'C', 'D'].map((char, idx) => (
                      <div key={char} style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => setEditDraft({ ...editDraft, correct: char })}
                          style={{ padding: '6px 10px', borderRadius: 8, border: 'none', background: editDraft.correct === char ? '#10b981' : '#e2e8f0', color: editDraft.correct === char ? '#ffffff' : '#334155', fontWeight: 800, cursor: 'pointer' }}
                        >
                          {char}
                        </button>
                        <input
                          type="text"
                          value={editDraft.options[idx]}
                          onChange={(e) => {
                            const updatedOpts = [...editDraft.options];
                            updatedOpts[idx] = e.target.value;
                            setEditDraft({ ...editDraft, options: updatedOpts });
                          }}
                          style={{ width: '100%', padding: '7px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{q.content}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
                    {['A', 'B', 'C', 'D'].map((char, idx) => {
                      const isCorrect = q.correct === char;
                      return (
                        <div
                          key={char}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 10,
                            border: `1px solid ${isCorrect ? '#4ade80' : '#e2e8f0'}`,
                            background: isCorrect ? '#dcfce7' : '#f8fafc',
                            color: isCorrect ? '#166534' : '#334155',
                            fontWeight: isCorrect ? 800 : 500,
                            fontSize: '0.88rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span><b>{char}.</b> {q.options[idx]}</span>
                          {isCorrect && <span>Đáp án đúng</span>}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, fontSize: '0.84rem', color: '#475569' }}>
                    <b>Giải thích Hóa học:</b> {q.explanation}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionBank;