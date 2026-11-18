// File: frontend/src/pages/teacher/ExamGenerator.jsx
// Chức năng: Thiết kế Đề kiểm tra Hóa học Wizard 4 Bước, Ma trận Nhận thức, Trộn 4 Mã đề & Cấp phát Link/Mã QR
// Đồng bộ giao diện từ ExamCreator.jsx của PlanbookAI-main, tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';

const ExamGenerator = () => {
  const [viewMode, setViewMode] = useState('list');
  const [layoutType, setLayoutType] = useState('grid');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // State Wizard 4 Bước & chế độ AI/Thủ công
  const [wizardStep, setWizardStep] = useState(1);
  const [creationMode, setCreationMode] = useState('ai');
  const [revealPassword, setRevealPassword] = useState(false);

  // Danh sách Đề kiểm tra hiện có
  const [exams, setExams] = useState([
    {
      id: 'EX-CHEM-101',
      title: 'Đề Kiểm tra Giữa Kỳ 1 - Hóa học 10 (Cấu tạo Nguyên tử & Bảng Tuần Hoàn)',
      grade: 'Lớp 10',
      duration: 45,
      questionCount: 15,
      examCodes: ['101', '102', '103', '104'],
      password: 'HOA10',
      status: 'Đã xuất bản',
      attempts: 42,
      avgScore: 7.8,
    },
    {
      id: 'EX-CHEM-102',
      title: 'Đề Kiểm tra 15 Phút - Hóa học 12 (Chương Ester - Lipid)',
      grade: 'Lớp 12',
      duration: 15,
      questionCount: 10,
      examCodes: ['101', '202', '303', '404'],
      password: '',
      status: 'Đã xuất bản',
      attempts: 38,
      avgScore: 8.2,
    },
  ]);

  // Cấu hình Đề thi đang tạo trong Wizard
  const [examConfig, setExamConfig] = useState({
    title: '',
    grade: 'Lớp 10',
    duration: 45,
    linkedLesson: 'Bài 1: Cấu tạo nguyên tử và Hạt nhân',
    matrix: { nhanBiet: 4, thongHieu: 3, vanDung: 2, vanDungCao: 1 },
    shuffleMode: '101-104',
    shuffleQuestions: true,
    shuffleOptions: true,
    password: '',
    questions: [
      {
        id: 1,
        level: 'Nhận biết',
        content: 'Hạt nhân của hầu hết các nguyên tử được cấu tạo bởi các loại hạt nào sau đây?',
        options: ['Electron và proton', 'Proton và neutron', 'Neutron và electron', 'Chỉ có proton'],
        correct: 'B',
      },
      {
        id: 2,
        level: 'Thông hiểu',
        content: 'Nguyên tử Sodium (Na) có Z = 11 và số khối A = 23. Số hạt neutron trong nguyên tử Na là:',
        options: ['11', '12', '23', '34'],
        correct: 'B',
      },
    ],
  });

  const totalMatrixQuestions =
    Number(examConfig.matrix.nhanBiet) +
    Number(examConfig.matrix.thongHieu) +
    Number(examConfig.matrix.vanDung) +
    Number(examConfig.matrix.vanDungCao);

  // AI Tự động sinh bộ câu hỏi Hóa học theo Ma trận nhận thức
  const handleAIGenerateQuestions = () => {
    const samplePool = [
      {
        level: 'Nhận biết',
        content: 'Trong nguyên tử, hạt mang điện tích âm là:',
        options: ['Proton', 'Neutron', 'Electron', 'Hạt nhân'],
        correct: 'C',
      },
      {
        level: 'Nhận biết',
        content: 'Công thức phân tử của Ethyl acetate là:',
        options: ['C2H4O2', 'C4H8O2', 'C3H6O2', 'C4H6O2'],
        correct: 'B',
      },
      {
        level: 'Thông hiểu',
        content: 'Thủy phân ester CH3COOC2H5 trong dung dịch NaOH thu được muối và alcohol nào?',
        options: ['CH3COONa và C2H5OH', 'HCOONa và C2H5OH', 'CH3COONa và CH3OH', 'C2H5COONa và CH3OH'],
        correct: 'A',
      },
      {
        level: 'Vận dụng',
        content: 'Đốt cháy hoàn toàn 0,1 mol một ester no, đơn chức, mạch hở thu được 0,3 mol CO2. Công thức ester là:',
        options: ['HCOOCH3', 'CH3COOCH3', 'CH3COOC2H5', 'C2H5COOC2H5'],
        correct: 'B',
      },
      {
        level: 'Vận dụng cao',
        content: 'Xà phòng hóa hoàn toàn 17,6 gam ethyl acetate bằng 300 ml dung dịch NaOH 1M. Khối lượng chất rắn khan thu được là:',
        options: ['16,4 gam', '20,4 gam', '24,6 gam', '18,2 gam'],
        correct: 'B',
      },
    ];

    const generated = [];
    for (let i = 0; i < totalMatrixQuestions; i++) {
      const tpl = samplePool[i % samplePool.length];
      generated.push({
        id: i + 1,
        level: tpl.level,
        content: `[Câu ${i + 1} - ${examConfig.linkedLesson}] ${tpl.content}`,
        options: [...tpl.options],
        correct: tpl.correct,
      });
    }
    setExamConfig((prev) => ({ ...prev, questions: generated }));
  };

  const handleAddManualQuestion = () => {
    setExamConfig((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: prev.questions.length + 1,
          level: 'Nhận biết',
          content: 'Nhập nội dung câu hỏi Hóa học mới...',
          options: ['Phương án A', 'Phương án B', 'Phương án C', 'Phương án D'],
          correct: 'A',
        },
      ],
    }));
  };

  const handlePublishExam = () => {
    if (!examConfig.title.trim()) {
      alert('Vui lòng nhập Tên Đề kiểm tra ở Bước 1!');
      return;
    }
    const newExam = {
      id: `EX-CHEM-${Math.floor(100 + Math.random() * 900)}`,
      title: examConfig.title,
      grade: examConfig.grade,
      duration: examConfig.duration,
      questionCount: examConfig.questions.length,
      examCodes: examConfig.shuffleMode === '101-104' ? ['101', '102', '103', '104'] : ['101', '202', '303', '404'],
      password: examConfig.password,
      status: 'Đã xuất bản',
      attempts: 0,
      avgScore: 0,
    };
    setExams((prev) => [newExam, ...prev]);
    setViewMode('list');
    setWizardStep(1);
  };

  const filteredExams = exams.filter((ex) => {
    const matchGrade = selectedGrade === 'All' || ex.grade === selectedGrade;
    const matchSearch = ex.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchGrade && matchSearch;
  });

  // ============================================================================
  // GIAO DIỆN 1: WIZARD 4 BƯỚC TẠO ĐỀ KIỂM TRA (ĐỒNG BỘ EXAMCREATOR.JSX)
  // ============================================================================
  if (viewMode === 'wizard') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div className="glass-panel" style={{ padding: '22px 28px', borderRadius: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <button
              onClick={() => setViewMode('list')}
              style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', padding: 0, marginBottom: 4 }}
            >
              &lt;- Quay lại Danh sách Đề thi
            </button>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Thiết kế Đề kiểm tra & Ma trận Nhận thức
            </h1>
          </div>
          <button onClick={handlePublishExam} style={{ padding: '11px 22px', borderRadius: 12, border: 'none', background: '#10b981', color: '#ffffff', fontWeight: 800, cursor: 'pointer' }}>
            Xuất bản Đề thi & Cấp Mã QR
          </button>
        </div>

        {/* Stepper 4 Bước */}
        <div style={{ background: '#ffffff', padding: 16, borderRadius: 20, border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {[
            { num: 1, title: 'Thông tin & Ma trận' },
            { num: 2, title: 'Soạn / Sinh Câu hỏi' },
            { num: 3, title: 'Trộn Mã đề & Bảo mật' },
            { num: 4, title: 'Xuất bản & Mã QR' },
          ].map((st) => {
            const isActive = wizardStep === st.num;
            const isDone = wizardStep > st.num;
            return (
              <button
                key={st.num}
                onClick={() => setWizardStep(st.num)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 14,
                  border: isActive ? '2px solid #4f46e5' : isDone ? '1px solid #6ee7b7' : '1px solid #e2e8f0',
                  background: isActive ? '#eef2ff' : isDone ? '#ecfdf5' : '#f8fafc',
                  color: isActive ? '#4338ca' : isDone ? '#047857' : '#64748b',
                  textAlign: 'left',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: 4 }}>
                  {isDone ? `Bước ${st.num} (Hoàn tất)` : `Bước ${st.num}`}
                </div>
                <div style={{ fontSize: '0.92rem' }}>{st.title}</div>
              </button>
            );
          })}
        </div>

        {/* BƯỚC 1: THÔNG TIN & MA TRẬN */}
        {wizardStep === 1 && (
          <div style={{ background: '#ffffff', padding: 28, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>1. Thiết lập Thông tin & Ma trận Nhận thức</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>Tên Kỳ thi / Bài kiểm tra *</label>
                <input
                  type="text"
                  value={examConfig.title}
                  onChange={(e) => setExamConfig({ ...examConfig, title: e.target.value })}
                  placeholder="VD: Kiểm tra 45 phút Chương 1 - Hóa 10"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>Khối lớp</label>
                <select
                  value={examConfig.grade}
                  onChange={(e) => setExamConfig({ ...examConfig, grade: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1' }}
                >
                  <option value="Lớp 10">Lớp 10</option>
                  <option value="Lớp 11">Lớp 11</option>
                  <option value="Lớp 12">Lớp 12</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>Thời gian làm bài (Phút)</label>
                <input
                  type="number"
                  value={examConfig.duration}
                  onChange={(e) => setExamConfig({ ...examConfig, duration: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>Liên kết với Giáo án đã soạn</label>
              <select
                value={examConfig.linkedLesson}
                onChange={(e) => setExamConfig({ ...examConfig, linkedLesson: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1' }}
              >
                <option value="Bài 1: Cấu tạo nguyên tử và Hạt nhân">Bài 1: Cấu tạo nguyên tử và Hạt nhân (Lớp 10)</option>
                <option value="Bài 5: Ester - Lipid và Ứng dụng">Bài 5: Ester - Lipid và Ứng dụng (Lớp 12)</option>
                <option value="Cân bằng Hóa học và Nguyên lý Le Chatelier">Cân bằng Hóa học và Nguyên lý Le Chatelier (Lớp 11)</option>
              </select>
            </div>

            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1e293b' }}>Ma trận 4 Mức độ Nhận thức</span>
                <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 12px', borderRadius: 16, fontSize: '0.8rem', fontWeight: 800 }}>
                  Tổng: {totalMatrixQuestions} câu hỏi
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                {[
                  { key: 'nhanBiet', label: 'Nhận biết (40%)' },
                  { key: 'thongHieu', label: 'Thông hiểu (30%)' },
                  { key: 'vanDung', label: 'Vận dụng (20%)' },
                  { key: 'vanDungCao', label: 'Vận dụng cao (10%)' },
                ].map((lv) => (
                  <div key={lv.key} style={{ background: '#ffffff', padding: 12, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: 6 }}>{lv.label}</label>
                    <input
                      type="number"
                      min="0"
                      value={examConfig.matrix[lv.key]}
                      onChange={(e) =>
                        setExamConfig({
                          ...examConfig,
                          matrix: { ...examConfig.matrix, [lv.key]: Number(e.target.value) },
                        })
                      }
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontWeight: 800 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BƯỚC 2: SOẠN / SINH CÂU HỎI */}
        {wizardStep === 2 && (
          <div style={{ background: '#ffffff', padding: 28, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderBottom: '1px solid #f1f5f9', paddingBottom: 14 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setCreationMode('ai')}
                  style={{
                    padding: '9px 16px',
                    borderRadius: 10,
                    border: 'none',
                    background: creationMode === 'ai' ? '#4f46e5' : '#f1f5f9',
                    color: creationMode === 'ai' ? '#ffffff' : '#475569',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                  }}
                >
                  Chế độ AI Trợ lý
                </button>
                <button
                  onClick={() => setCreationMode('manual')}
                  style={{
                    padding: '9px 16px',
                    borderRadius: 10,
                    border: 'none',
                    background: creationMode === 'manual' ? '#4f46e5' : '#f1f5f9',
                    color: creationMode === 'manual' ? '#ffffff' : '#475569',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                  }}
                >
                  Chế độ Thủ công
                </button>
              </div>
              {creationMode === 'ai' ? (
                <button onClick={handleAIGenerateQuestions} style={{ padding: '9px 18px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>
                  AI Sinh tự động {totalMatrixQuestions} Câu hỏi theo Ma trận
                </button>
              ) : (
                <button onClick={handleAddManualQuestion} className="btn-primary">
                  + Thêm Câu hỏi Thủ công
                </button>
              )}
            </div>

            {examConfig.questions.map((q, idx) => (
              <div key={q.id} style={{ background: '#f8fafc', padding: 18, borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800 }}>
                  <span style={{ color: '#4338ca' }}>Câu {idx + 1} • Mức độ: {q.level}</span>
                  <span style={{ color: '#059669' }}>Đáp án đúng: {q.correct}</span>
                </div>
                <input
                  type="text"
                  value={q.content}
                  onChange={(e) => {
                    const updated = [...examConfig.questions];
                    updated[idx].content = e.target.value;
                    setExamConfig({ ...examConfig, questions: updated });
                  }}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 600 }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
                  {['A', 'B', 'C', 'D'].map((letter, optIdx) => (
                    <div key={letter} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <button
                        onClick={() => {
                          const updated = [...examConfig.questions];
                          updated[idx].correct = letter;
                          setExamConfig({ ...examConfig, questions: updated });
                        }}
                        style={{
                          padding: '6px 10px',
                          borderRadius: 8,
                          border: 'none',
                          background: q.correct === letter ? '#10b981' : '#e2e8f0',
                          color: q.correct === letter ? '#ffffff' : '#334155',
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        {letter}
                      </button>
                      <input
                        type="text"
                        value={q.options[optIdx]}
                        onChange={(e) => {
                          const updated = [...examConfig.questions];
                          updated[idx].options[optIdx] = e.target.value;
                          setExamConfig({ ...examConfig, questions: updated });
                        }}
                        style={{ width: '100%', padding: '7px 10px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.85rem' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BƯỚC 3: TRỘN MÃ ĐỀ & MẬT KHẨU */}
        {wizardStep === 3 && (
          <div style={{ background: '#ffffff', padding: 28, borderRadius: 20, border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Quy tắc Sinh 4 Mã đề Tự động</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem' }}>
                <input type="radio" checked={examConfig.shuffleMode === '101-104'} onChange={() => setExamConfig({ ...examConfig, shuffleMode: '101-104' })} />
                Bộ mã đề liên tiếp: <b>101, 102, 103, 104</b>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem' }}>
                <input type="radio" checked={examConfig.shuffleMode === '101-404'} onChange={() => setExamConfig({ ...examConfig, shuffleMode: '101-404' })} />
                Bộ mã đề phân biệt: <b>101, 202, 303, 404</b>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', paddingTop: 10, borderTop: '1px solid #e2e8f0' }}>
                <input type="checkbox" checked={examConfig.shuffleQuestions} onChange={(e) => setExamConfig({ ...examConfig, shuffleQuestions: e.target.checked })} />
                Đảo thứ tự câu hỏi giữa các mã đề
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem' }}>
                <input type="checkbox" checked={examConfig.shuffleOptions} onChange={(e) => setExamConfig({ ...examConfig, shuffleOptions: e.target.checked })} />
                Đảo thứ tự đáp án A, B, C, D trong từng câu
              </label>
            </div>

            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Mật khẩu Bảo vệ Đề thi (Tùy chọn)</h3>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b' }}>
                Thiết lập mật khẩu kiểm soát thời điểm mở đề thi hoặc tải phiếu trả lời.
              </p>
              <div style={{ position: 'relative' }}>
                <input
                  type={revealPassword ? 'text' : 'password'}
                  value={examConfig.password}
                  onChange={(e) => setExamConfig({ ...examConfig, password: e.target.value })}
                  placeholder="Để trống nếu không đặt mật khẩu (VD: HOA10A1)"
                  style={{ width: '100%', padding: '10px 60px 10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700 }}
                />
                <button
                  type="button"
                  onClick={() => setRevealPassword(!revealPassword)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}
                >
                  {revealPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BƯỚC 4: XUẤT BẢN & CẤP MÃ QR */}
        {wizardStep === 4 && (
          <div style={{ background: '#ffffff', padding: 28, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, borderBottom: '1px solid #f1f5f9', paddingBottom: 14 }}>
              <div>
                <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 800 }}>SẴN SÀNG XUẤT BẢN</span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '8px 0 4px 0' }}>{examConfig.title || 'Đề Kiểm tra Hóa học THPT'}</h2>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                  {examConfig.grade} | {examConfig.duration} phút | {examConfig.questions.length} câu hỏi | Mã đề: {examConfig.shuffleMode === '101-104' ? '101, 102, 103, 104' : '101, 202, 303, 404'}
                </p>
              </div>
              <button onClick={() => window.print()} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', background: '#0f172a', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>
                In 4 Mã đề + Phiếu Tô Đáp án OCR
              </button>
            </div>

            <div style={{ background: '#eef2ff', padding: 20, borderRadius: 16, border: '1px solid #c7d2fe', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h3 style={{ margin: '0 0 6px 0', color: '#312e81', fontWeight: 800 }}>Cổng Cấp phát Đề thi & Đồng bộ Máy chấm OCR</h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#4338ca' }}>
                  Bộ 4 Mã đề này đã tự động đồng bộ sang phân hệ Chấm thi AI OCR.
                </p>
                <input
                  type="text"
                  readOnly
                  value={`https://planbookai.edu.vn/exam/${examConfig.grade.replace(' ', '')}-${examConfig.shuffleMode}`}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1px solid #a5b4fc', background: '#ffffff', fontSize: '0.82rem', fontFamily: 'monospace' }}
                />
              </div>
              <div style={{ background: '#ffffff', padding: 16, borderRadius: 14, border: '1px solid #c7d2fe', textAlign: 'center', minWidth: 140 }}>
                <div style={{ width: 84, height: 84, border: '2px dashed #6366f1', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontWeight: 800, fontSize: '0.75rem', color: '#4338ca' }}>
                  MÃ QR ĐỀ THI
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#312e81', marginTop: 8 }}>
                  Mật khẩu: {examConfig.password || 'Không có'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Điều hướng Bước */}
        <div style={{ background: '#ffffff', padding: '16px 24px', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            disabled={wizardStep === 1}
            onClick={() => setWizardStep((p) => p - 1)}
            style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700, opacity: wizardStep === 1 ? 0.5 : 1, cursor: 'pointer' }}
          >
            Bước trước
          </button>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b' }}>Bước {wizardStep} / 4</span>
          {wizardStep < 4 ? (
            <button onClick={() => setWizardStep((p) => p + 1)} className="btn-primary">
              Bước tiếp theo
            </button>
          ) : (
            <button onClick={handlePublishExam} style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#10b981', color: '#ffffff', fontWeight: 800, cursor: 'pointer' }}>
              Hoàn tất & Lưu Đề thi
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============================================================================
  // GIAO DIỆN 2: DANH SÁCH ĐỀ KIỂM TRA + 4 THẺ THỐNG KÊ GLASS-PANEL
  // ============================================================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div className="glass-panel" style={{ padding: '24px 28px', borderRadius: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            Thiết kế & Trộn Đề kiểm tra Hóa học THPT
          </h1>
          <p style={{ color: '#64748b', margin: '6px 0 0 0', fontSize: '0.95rem' }}>
            Tạo đề thi từ Ma trận nhận thức, trộn 4 mã đề tự động và đồng bộ đáp án sang hệ thống chấm OCR.
          </p>
        </div>
        <button onClick={() => setViewMode('wizard')} className="btn-primary" style={{ padding: '12px 22px', borderRadius: 12 }}>
          + Thiết kế Đề thi Mới (Wizard 4 Bước)
        </button>
      </div>

      {/* 4 Thẻ KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
        {[
          { label: 'Tổng Đề thi Hóa học', value: `${exams.length} Bộ đề`, sub: '4 Mã đề / Bộ' },
          { label: 'Kho Câu hỏi Khả dụng', value: '240 Câu', sub: 'Chuẩn GDPT 2018' },
          { label: 'Tổng Lượt Chấm bài', value: '80 Bài', sub: 'Đồng bộ từ OCR' },
          { label: 'Điểm Trung bình Khối', value: '8.0 / 10', sub: 'Tỷ lệ Đạt: 92%' },
        ].map((kpi, i) => (
          <div key={i} className="glass-panel" style={{ padding: 20, borderRadius: 20 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{kpi.label}</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0f172a', marginTop: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', marginTop: 4 }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Thanh Lọc Khối lớp + Tìm kiếm + Chuyển đổi Lưới/Bảng */}
      <div style={{ background: '#ffffff', padding: 16, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['All', 'Lớp 10', 'Lớp 11', 'Lớp 12'].map((gr) => (
            <button
              key={gr}
              onClick={() => setSelectedGrade(gr)}
              style={{
                padding: '8px 16px',
                borderRadius: 10,
                border: 'none',
                background: selectedGrade === gr ? '#4f46e5' : '#f1f5f9',
                color: selectedGrade === gr ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
              }}
            >
              {gr === 'All' ? 'Tất cả Khối' : gr}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Tìm kiếm đề thi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.88rem', width: 220 }}
          />
          <div style={{ display: 'flex', background: '#f1f5f9', padding: 4, borderRadius: 10, gap: 4 }}>
            <button
              onClick={() => setLayoutType('grid')}
              style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: layoutType === 'grid' ? '#ffffff' : 'transparent', color: layoutType === 'grid' ? '#4f46e5' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Lưới
            </button>
            <button
              onClick={() => setLayoutType('list')}
              style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: layoutType === 'list' ? '#ffffff' : 'transparent', color: layoutType === 'list' ? '#4f46e5' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Danh sách
            </button>
          </div>
        </div>
      </div>

      {/* Danh sách Đề thi */}
      <div style={{ display: 'grid', gridTemplateColumns: layoutType === 'grid' ? 'repeat(auto-fit, minmax(340px, 1fr))' : '1fr', gap: 18 }}>
        {filteredExams.map((ex) => (
          <div key={ex.id} style={{ background: '#ffffff', padding: 24, borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800 }}>
                  {ex.grade} • {ex.duration} Phút • {ex.questionCount} Câu
                </span>
                <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 800 }}>
                  {ex.status}
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0' }}>{ex.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Bộ Mã đề đã trộn:</span>
                {ex.examCodes.map((code) => (
                  <span key={code} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '2px 8px', borderRadius: 6, fontSize: '0.76rem', fontFamily: 'monospace', fontWeight: 800 }}>
                    Mã {code}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#64748b' }}>
              <span>Đã chấm: <b>{ex.attempts} bài</b> | Điểm TB: <b>{ex.avgScore}</b></span>
              <button
                onClick={() => setViewMode('wizard')}
                style={{ padding: '7px 14px', borderRadius: 10, border: 'none', background: '#eef2ff', color: '#4338ca', fontWeight: 700, cursor: 'pointer' }}
              >
                Mở Wizard / In Đề
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamGenerator;