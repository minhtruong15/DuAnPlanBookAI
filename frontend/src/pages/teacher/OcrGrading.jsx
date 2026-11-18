// File: frontend/src/pages/teacher/OcrGrading.jsx
// Chức năng: Quản lý Chấm điểm Phiếu Trắc nghiệm Hóa học bằng AI OCR + Thanh tiến trình + Modal Soi lỗi Bản đồ Đáp án
// Đồng bộ giao diện từ OcrGrading.jsx của PlanbookAI-main, tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';

const OcrGrading = () => {
  const [selectedExam, setSelectedExam] = useState('EX-CHEM-101');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [inspectingSheet, setInspectingSheet] = useState(null);

  // Danh sách phiếu bài làm đã chấm bằng AI OCR
  const [gradedSheets, setGradedSheets] = useState([
    {
      id: 'OCR-01',
      studentCode: 'HS10A1-01',
      studentName: 'Nguyễn Minh Anh',
      examCode: '101',
      score: 9.0,
      correctCount: 9,
      totalQuestions: 10,
      aiComment:
        'Nắm rất vững kiến thức Cấu tạo nguyên tử và Bảng tuần hoàn. Chỉ nhầm 1 câu Vận dụng cao về tính phần trăm đồng vị.',
      details: [
        { q: 1, picked: 'B', correct: 'B', isCorrect: true, topic: 'Hạt nhân nguyên tử' },
        { q: 2, picked: 'B', correct: 'B', isCorrect: true, topic: 'Tính số hạt p, n, e' },
        { q: 3, picked: 'C', correct: 'C', isCorrect: true, topic: 'Cấu hình electron' },
        { q: 4, picked: 'A', correct: 'A', isCorrect: true, topic: 'Đồng vị hóa học' },
        { q: 5, picked: 'D', correct: 'D', isCorrect: true, topic: 'Chu kỳ & Nhóm' },
        { q: 6, picked: 'B', correct: 'B', isCorrect: true, topic: 'Bán kính nguyên tử' },
        { q: 7, picked: 'A', correct: 'A', isCorrect: true, topic: 'Độ âm điện' },
        { q: 8, picked: 'C', correct: 'C', isCorrect: true, topic: 'Liên kết ion' },
        { q: 9, picked: 'B', correct: 'B', isCorrect: true, topic: 'Bài toán khí H2' },
        { q: 10, picked: 'A', correct: 'D', isCorrect: false, topic: 'Nguyên tử khối trung bình' },
      ],
    },
    {
      id: 'OCR-02',
      studentCode: 'HS10A1-02',
      studentName: 'Trần Hoàng Bảo',
      examCode: '102',
      score: 7.0,
      correctCount: 7,
      totalQuestions: 10,
      aiComment:
        'Nắm được lý thuyết cơ bản nhưng còn lúng túng ở các câu viết cấu hình electron phân lớp d và bài toán đồng vị.',
      details: [
        { q: 1, picked: 'A', correct: 'A', isCorrect: true, topic: 'Hạt nhân nguyên tử' },
        { q: 2, picked: 'C', correct: 'C', isCorrect: true, topic: 'Tính số hạt p, n, e' },
        { q: 3, picked: 'B', correct: 'D', isCorrect: false, topic: 'Cấu hình electron' },
        { q: 4, picked: 'A', correct: 'A', isCorrect: true, topic: 'Đồng vị hóa học' },
        { q: 5, picked: 'B', correct: 'B', isCorrect: true, topic: 'Chu kỳ & Nhóm' },
        { q: 6, picked: 'C', correct: 'C', isCorrect: true, topic: 'Bán kính nguyên tử' },
        { q: 7, picked: 'D', correct: 'A', isCorrect: false, topic: 'Độ âm điện' },
        { q: 8, picked: 'B', correct: 'B', isCorrect: true, topic: 'Liên kết ion' },
        { q: 9, picked: 'A', correct: 'A', isCorrect: true, topic: 'Bài toán khí H2' },
        { q: 10, picked: 'C', correct: 'B', isCorrect: false, topic: 'Nguyên tử khối trung bình' },
      ],
    },
    {
      id: 'OCR-03',
      studentCode: 'HS10A1-03',
      studentName: 'Lê Thu Cúc',
      examCode: '103',
      score: 4.0,
      correctCount: 4,
      totalQuestions: 10,
      aiComment:
        'Cần phụ đạo gấp: Học sinh chưa phân biệt được số hiệu nguyên tử Z và số khối A, sai nhiều câu Thông hiểu và Vận dụng.',
      details: [
        { q: 1, picked: 'B', correct: 'B', isCorrect: true, topic: 'Hạt nhân nguyên tử' },
        { q: 2, picked: 'A', correct: 'D', isCorrect: false, topic: 'Tính số hạt p, n, e' },
        { q: 3, picked: 'C', correct: 'A', isCorrect: false, topic: 'Cấu hình electron' },
        { q: 4, picked: 'B', correct: 'B', isCorrect: true, topic: 'Đồng vị hóa học' },
        { q: 5, picked: 'A', correct: 'C', isCorrect: false, topic: 'Chu kỳ & Nhóm' },
        { q: 6, picked: 'D', correct: 'D', isCorrect: true, topic: 'Bán kính nguyên tử' },
        { q: 7, picked: 'B', correct: 'C', isCorrect: false, topic: 'Độ âm điện' },
        { q: 8, picked: 'A', correct: 'A', isCorrect: true, topic: 'Liên kết ion' },
        { q: 9, picked: 'D', correct: 'B', isCorrect: false, topic: 'Bài toán khí H2' },
        { q: 10, picked: 'A', correct: 'C', isCorrect: false, topic: 'Nguyên tử khối trung bình' },
      ],
    },
  ]);

  // Chạy mô phỏng tiến trình quét và chấm hàng loạt từ 0% -> 100%
  const handleRunBatchOcrScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    let current = 0;
    const timer = setInterval(() => {
      current += 25;
      setScanProgress(current);
      if (current >= 100) {
        clearInterval(timer);
        setIsScanning(false);
        const newId = `OCR-0${gradedSheets.length + 1}`;
        setGradedSheets((prev) => [
          {
            id: newId,
            studentCode: `HS10A1-0${prev.length + 1}`,
            studentName: 'Phạm Quốc Đạt (Phiếu mới quét)',
            examCode: '104',
            score: 8.0,
            correctCount: 8,
            totalQuestions: 10,
            aiComment:
              'Kết quả quét OCR chính xác 100%. Học sinh làm tốt phần Liên kết hóa học, cần rèn thêm bài toán hiệu suất.',
            details: prev[0].details.map((d, idx) =>
              idx === 8 ? { ...d, picked: 'D', isCorrect: false } : d
            ),
          },
          ...prev,
        ]);
      }
    }, 300);
  };

  // Xuất Sổ điểm CSV có BOM UTF-8 để mở bằng Excel tiếng Việt không bị lỗi font
  const handleExportGradebookCSV = () => {
    const headers = 'Mã HS,Họ và Tên,Mã Đề,Số Câu Đúng,Điểm Số,Nhận xét AI\n';
    const rows = gradedSheets
      .map(
        (s) =>
          `${s.studentCode},"${s.studentName}",${s.examCode},${s.correctCount}/${s.totalQuestions},${s.score},"${s.aiComment}"`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `So_Diem_OCR_${selectedExam}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const avgScore = (
    gradedSheets.reduce((acc, s) => acc + s.score, 0) / gradedSheets.length
  ).toFixed(1);
  const passCount = gradedSheets.filter((s) => s.score >= 5.0).length;
  const passRate = Math.round((passCount / gradedSheets.length) * 100);
  const needTutoringCount = gradedSheets.filter((s) => s.score < 5.0).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px 28px', borderRadius: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            Quản lý Chấm điểm Phiếu Trắc nghiệm (AI OCR)
          </h1>
          <p style={{ color: '#64748b', margin: '6px 0 0 0', fontSize: '0.95rem' }}>
            Nhận diện mã đề tự động, chấm điểm hàng loạt, soi lỗi từng ô đáp án Xanh/Đỏ và sinh nhận xét.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleExportGradebookCSV}
            style={{ padding: '11px 18px', borderRadius: 12, border: '1px solid #cbd5e1', background: '#ffffff', color: '#334155', fontWeight: 700, fontSize: '0.86rem', cursor: 'pointer' }}
          >
            Xuất Sổ điểm CSV
          </button>
          <button
            onClick={handleRunBatchOcrScan}
            disabled={isScanning}
            className="btn-primary"
            style={{ padding: '11px 20px', borderRadius: 12, opacity: isScanning ? 0.6 : 1 }}
          >
            {isScanning ? `Đang quét OCR (${scanProgress}%)...` : '+ Quét & Chấm Lô Phiếu Mới'}
          </button>
        </div>
      </div>

      {/* Chọn Bộ đề & Thanh tiến trình OCR */}
      <div style={{ background: '#ffffff', padding: 20, borderRadius: 20, border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, alignItems: 'center' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>
            Chọn Kỳ thi / Bộ Đề Hóa học để đối chiếu Đáp án
          </label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '0.9rem' }}
          >
            <option value="EX-CHEM-101">[EX-CHEM-101] Đề Kiểm tra Giữa Kỳ 1 - Hóa học 10 (Mã 101 - 104)</option>
            <option value="EX-CHEM-102">[EX-CHEM-102] Đề Kiểm tra 15 Phút - Hóa học 12 Chương Ester</option>
          </select>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
            <span>Tiến trình AI Vision Engine</span>
            <span style={{ color: '#10b981' }}>{scanProgress}% Hoàn tất</span>
          </div>
          <div style={{ width: '100%', height: 12, background: '#f1f5f9', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <div style={{ width: `${scanProgress}%`, height: '100%', background: '#10b981', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      {/* 4 Thẻ Thống kê glass-panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { label: 'Số Phiếu Đã Chấm', value: `${gradedSheets.length} Phiếu`, color: '#0f172a' },
          { label: 'Điểm Trung Bình Lớp', value: `${avgScore} / 10`, color: '#2563eb' },
          { label: 'Tỷ lệ Đạt (>= 5.0)', value: `${passRate}%`, color: '#059669' },
          { label: 'Cần Phụ đạo (< 5.0)', value: `${needTutoringCount} Học sinh`, color: '#dc2626' },
        ].map((kpi, i) => (
          <div key={i} className="glass-panel" style={{ padding: 20, borderRadius: 20 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{kpi.label}</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 900, color: kpi.color, marginTop: 6 }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Bảng Kết quả Chấm */}
      <div style={{ background: '#ffffff', borderRadius: 20, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Bảng Kết quả Quét Phiếu Trả lời Trắc nghiệm
          </h2>
          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Bấm "Soi lỗi bài làm" để xem Bản đồ Đáp án Xanh/Đỏ từng câu
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 20px' }}>Mã HS</th>
                <th style={{ padding: '14px 20px' }}>Họ và Tên Học sinh</th>
                <th style={{ padding: '14px 20px' }}>Mã Đề</th>
                <th style={{ padding: '14px 20px' }}>Số Câu Đúng</th>
                <th style={{ padding: '14px 20px' }}>Điểm Số</th>
                <th style={{ padding: '14px 20px' }}>Nhận xét AI</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {gradedSheets.map((sheet) => (
                <tr key={sheet.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
                  <td style={{ padding: '14px 20px', fontFamily: 'monospace', fontWeight: 700, color: '#64748b' }}>{sheet.studentCode}</td>
                  <td style={{ padding: '14px 20px', fontWeight: 800, color: '#0f172a' }}>{sheet.studentName}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: 8, fontFamily: 'monospace', fontWeight: 800, fontSize: '0.8rem' }}>
                      Mã {sheet.examCode}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: 700 }}>
                    {sheet.correctCount} / {sheet.totalQuestions}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        background: sheet.score >= 8 ? '#dcfce7' : sheet.score >= 5 ? '#dbeafe' : '#fee2e2',
                        color: sheet.score >= 8 ? '#166534' : sheet.score >= 5 ? '#1e40af' : '#991b1b',
                        padding: '4px 12px',
                        borderRadius: 16,
                        fontWeight: 800,
                        fontSize: '0.82rem',
                      }}
                    >
                      {sheet.score.toFixed(1)} điểm
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '0.82rem', color: '#475569', maxWidth: 340 }}>
                    {sheet.aiComment}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => setInspectingSheet(sheet)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 10,
                        border: 'none',
                        background: '#eef2ff',
                        color: '#4338ca',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      Soi lỗi bài làm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CỬA SỔ MODAL SOI LỖI BÀI LÀM CHI TIẾT & BẢN ĐỒ ĐÁP ÁN XANH/ĐỎ */}
      {inspectingSheet && (
        <div
          onClick={() => setInspectingSheet(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: 24,
              maxWidth: 760,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 28,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: 14 }}>
              <div>
                <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 800 }}>
                  CHI TIẾT PHIẾU OCR: {inspectingSheet.id}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px 0' }}>
                  Học sinh: {inspectingSheet.studentName} ({inspectingSheet.studentCode})
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                  Mã đề: {inspectingSheet.examCode} | Kết quả: <b>{inspectingSheet.correctCount}/{inspectingSheet.totalQuestions} câu đúng</b> ({inspectingSheet.score.toFixed(1)} điểm)
                </p>
              </div>
              <button
                onClick={() => setInspectingSheet(null)}
                style={{ padding: '7px 14px', borderRadius: 10, border: 'none', background: '#f1f5f9', fontWeight: 700, cursor: 'pointer' }}
              >
                Đóng cửa sổ
              </button>
            </div>

            {/* Bản đồ Đáp án 10 ô Xanh/Đỏ */}
            <div>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                1. Bản đồ Đáp án trên Phiếu Tô (Xanh = Đúng, Đỏ = Sai)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: 8 }}>
                {inspectingSheet.details.map((item) => (
                  <div
                    key={item.q}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      textAlign: 'center',
                      border: `1px solid ${item.isCorrect ? '#4ade80' : '#f87171'}`,
                      background: item.isCorrect ? '#dcfce7' : '#fee2e2',
                      color: item.isCorrect ? '#166534' : '#991b1b',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                    }}
                  >
                    <div>Câu {item.q}</div>
                    <div style={{ fontSize: '1rem', marginTop: 2 }}>{item.picked}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bảng Đối chiếu chi tiết */}
            <div>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                2. Bảng Đối chiếu Đáp án & Chuyên đề Kiến thức
              </h4>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: 800, color: '#64748b' }}>
                      <th style={{ padding: 10 }}>Câu</th>
                      <th style={{ padding: 10 }}>Chuyên đề Hóa học</th>
                      <th style={{ padding: 10 }}>Học sinh Khoanh</th>
                      <th style={{ padding: 10 }}>Đáp án Đúng</th>
                      <th style={{ padding: 10 }}>Kết quả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectingSheet.details.map((d) => (
                      <tr key={d.q} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: 10, fontWeight: 700 }}>Câu {d.q}</td>
                        <td style={{ padding: 10 }}>{d.topic}</td>
                        <td style={{ padding: 10, fontFamily: 'monospace', fontWeight: 800 }}>{d.picked}</td>
                        <td style={{ padding: 10, fontFamily: 'monospace', fontWeight: 800, color: '#059669' }}>{d.correct}</td>
                        <td style={{ padding: 10 }}>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: 6,
                              fontWeight: 800,
                              fontSize: '0.76rem',
                              background: d.isCorrect ? '#dcfce7' : '#fee2e2',
                              color: d.isCorrect ? '#166534' : '#991b1b',
                            }}
                          >
                            {d.isCorrect ? 'Chính xác' : 'Sai'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: 14, borderRadius: 14, fontSize: '0.88rem', color: '#1e3a8a' }}>
              <b>AI Nhận xét & Gợi ý Phụ đạo:</b> {inspectingSheet.aiComment}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OcrGrading;