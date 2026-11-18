// File: frontend/src/pages/teacher/StudentAnalytics.jsx
// Chức năng: Phân tích Tiến bộ & Nhận xét Cá nhân hóa cho từng Học sinh với Biểu đồ Đường SVG (LineChart)
// Đồng bộ 100% bố cục 2 cột .glass-panel từ StudentAnalytics.jsx của PlanbookAI-main, tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';

const StudentAnalytics = () => {
  const [students, setStudents] = useState([
    {
      id: 'HS10A1-01',
      name: 'Nguyễn Minh Anh',
      className: '10A1 - Chuyên Hóa',
      avgScore: 8.9,
      rank: 'Giỏi',
      history: [
        { label: 'Kỳ 1', score: 8.5 },
        { label: 'Kỳ 2', score: 8.8 },
        { label: 'Kỳ 3', score: 9.0 },
        { label: 'Kỳ 4', score: 8.9 },
        { label: 'Kỳ 5', score: 9.3 },
      ],
      strengths: 'Nắm vững Cấu tạo nguyên tử, Liên kết ion và Bảo toàn electron.',
      weaknesses: 'Cần tăng tốc độ giải bài toán tính % đồng vị.',
      aiFeedback:
        'Em Minh Anh có sự tiến bộ rất đều qua từng kỳ kiểm tra Hóa học. Tư duy tính toán nhanh và chính xác. Giáo viên có thể bồi dưỡng thêm chuyên đề nâng cao để dự thi Học sinh giỏi.',
    },
    {
      id: 'HS10A1-02',
      name: 'Trần Hoàng Bảo',
      className: '10A1 - Chuyên Hóa',
      avgScore: 7.4,
      rank: 'Khá',
      history: [
        { label: 'Kỳ 1', score: 6.8 },
        { label: 'Kỳ 2', score: 7.2 },
        { label: 'Kỳ 3', score: 7.0 },
        { label: 'Kỳ 4', score: 7.6 },
        { label: 'Kỳ 5', score: 8.2 },
      ],
      strengths: 'Hiểu rõ lý thuyết Bảng tuần hoàn và xác định số oxi hóa.',
      weaknesses: 'Hay nhầm khi viết cấu hình electron của ion kim loại chuyển tiếp Fe2+, Fe3+.',
      aiFeedback:
        'Em Hoàng Bảo có bứt phá tốt ở 2 kỳ gần nhất. Cần bổ sung thêm 10 bài tập viết cấu hình electron nguyên tử và ion để đạt điểm tối đa phần đại cương.',
    },
    {
      id: 'HS10A1-03',
      name: 'Lê Thu Cúc',
      className: '10A1 - Chuyên Hóa',
      avgScore: 5.2,
      rank: 'Cần phụ đạo',
      history: [
        { label: 'Kỳ 1', score: 5.8 },
        { label: 'Kỳ 2', score: 5.5 },
        { label: 'Kỳ 3', score: 5.0 },
        { label: 'Kỳ 4', score: 4.8 },
        { label: 'Kỳ 5', score: 5.1 },
      ],
      strengths: 'Nhận biết được ký hiệu các nguyên tố hóa học cơ bản.',
      weaknesses: 'Chưa thành thạo quy đổi số mol và cân bằng phương trình oxi hóa - khử.',
      aiFeedback:
        'Cảnh báo học vụ: Điểm số của em Thu Cúc có xu hướng giảm. Giáo viên cần xếp lịch phụ đạo 2 buổi/tuần ôn tập lại công thức tính mol và 4 bước thăng bằng electron.',
    },
  ]);

  const [selectedId, setSelectedId] = useState('HS10A1-01');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentStudent = students.find((s) => s.id === selectedId) || students[0];

  // Hàm gọi AI tạo lại nhận xét cá nhân hóa mới
  const handleGenerateAIFeedback = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setStudents((prev) =>
        prev.map((st) =>
          st.id === currentStudent.id
            ? {
                ...st,
                aiFeedback: `[Cập nhật lúc ${new Date().toLocaleTimeString('vi-VN')}] Em ${
                  st.name
                } đạt điểm trung bình ${st.avgScore} (${st.rank}). Điểm mạnh: ${
                  st.strengths
                } Đề xuất lộ trình 7 ngày tới: Giao bộ 15 câu trắc nghiệm khắc phục phần "${
                  st.weaknesses
                }".`,
              }
            : st
        )
      );
      setIsGenerating(false);
    }, 400);
  };

  // Xuất báo cáo CSV có BOM UTF-8 chuẩn tiếng Việt Excel
  const handleExportCSV = () => {
    const headers = 'Mã HS,Họ và Tên,Lớp,Điểm TB,Xếp Loại,Nhận xét AI\n';
    const rows = students
      .map((s) => `${s.id},"${s.name}","${s.className}",${s.avgScore},"${s.rank}","${s.aiFeedback}"`)
      .join('\n');
    const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bao_Cao_Phan_Tich_Hoc_Sinh_PlanbookAI.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Tính tọa độ cho Biểu đồ Đường SVG (LineChart) giống hệt StudentAnalytics.jsx bản cũ
  const chartWidth = 520;
  const chartHeight = 200;
  const padX = 45;
  const padY = 24;
  const usableW = chartWidth - padX * 2;
  const usableH = chartHeight - padY * 2;

  const points = currentStudent.history.map((item, idx) => {
    const x = padX + (idx / (currentStudent.history.length - 1)) * usableW;
    const y = padY + (1 - item.score / 10) * usableH;
    return { ...item, x, y };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Header giống StudentAnalytics.jsx bản cũ */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>
            Phân tích & Feedback Học sinh
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>
            Đánh giá năng lực cá nhân theo biểu đồ tiến bộ và xuất báo cáo tự động
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          style={{
            padding: '10px 18px',
            borderRadius: 10,
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#1e293b',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
          }}
        >
          Xuất báo cáo Excel (CSV)
        </button>
      </div>

      {/* Bố cục 2 cột .glass-panel (1fr 2fr) giống hệt bản cũ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* CỘT TRÁI: DANH SÁCH HỌC SINH */}
        <div className="glass-panel" style={{ padding: 22, borderRadius: 18 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 16px 0' }}>
            Danh sách Học sinh ({students.length})
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {students.map((st) => {
              const isSelected = st.id === currentStudent.id;
              return (
                <li
                  key={st.id}
                  onClick={() => setSelectedId(st.id)}
                  style={{
                    padding: '14px 16px',
                    background: isSelected ? 'var(--primary-light)' : '#ffffff',
                    color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                    border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                    borderRadius: 12,
                    fontWeight: isSelected ? 700 : 500,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.95rem' }}>{st.name}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: 2 }}>
                      {st.id} • {st.rank}
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>{st.avgScore}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CỘT PHẢI: BIỂU ĐỒ ĐƯỜNG TIẾN BỘ & NHẬN XÉT AI (CHIẾM 2 PHẦN TRÊN MÀN HÌNH LỚN) */}
        <div className="glass-panel" style={{ padding: 24, borderRadius: 18, gridColumn: 'span 1' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                Tiến bộ của {currentStudent.name}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {currentStudent.className} • Điểm TB tích lũy: <b>{currentStudent.avgScore}</b>
              </span>
            </div>
            <button
              onClick={handleGenerateAIFeedback}
              disabled={isGenerating}
              className="btn-primary"
              style={{ padding: '8px 16px', borderRadius: 10, fontSize: '0.85rem' }}
            >
              {isGenerating ? 'AI đang phân tích...' : 'AI Tạo Nhận xét'}
            </button>
          </div>

          {/* Biểu đồ Đường SVG LineChart (Trục 0 -> 10 điểm qua 5 kỳ kiểm tra) */}
          <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '12px 10px', marginBottom: 20, overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 220, display: 'block' }}>
              {/* Các đường lưới ngang 0, 2.5, 5, 7.5, 10 */}
              {[0, 2.5, 5, 7.5, 10].map((val) => {
                const y = padY + (1 - val / 10) * usableH;
                return (
                  <g key={val}>
                    <line x1={padX} y1={y} x2={chartWidth - padX} y2={y} stroke="#e5e7eb" strokeDasharray="4 4" />
                    <text x={padX - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Đường nối biểu đồ tiến bộ màu Indigo */}
              <polyline fill="none" stroke="#4f46e5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" points={polylinePoints} />

              {/* Các điểm nút tròn + Nhãn điểm số & tên kỳ */}
              {points.map((p, idx) => (
                <g key={idx}>
                  <circle cx={p.x} cy={p.y} r="6.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
                  <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="12" fontWeight="800" fill="#4338ca">
                    {p.score}
                  </text>
                  <text x={p.x} y={chartHeight - 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Điểm mạnh & Lỗ hổng kiến thức */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 12, marginBottom: 16 }}>
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: 14, borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>Điểm mạnh</div>
              <div style={{ fontSize: '0.85rem', color: '#047857', marginTop: 4 }}>{currentStudent.strengths}</div>
            </div>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: 14, borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>Cần cải thiện</div>
              <div style={{ fontSize: '0.85rem', color: '#b45309', marginTop: 4 }}>{currentStudent.weaknesses}</div>
            </div>
          </div>

          {/* Khối Nhận xét từ AI giống hệt StudentAnalytics.jsx bản cũ */}
          <div style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontWeight: 700, margin: '0 0 8px 0', color: '#334155', fontSize: '0.95rem' }}>
              Nhận xét từ AI:
            </h4>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
              {currentStudent.aiFeedback}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;