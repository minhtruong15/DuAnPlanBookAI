// File: frontend/src/pages/teacher/TeacherWorkspace.jsx
// Chức năng: Trang Tổng quan Giáo viên Hóa học đồng bộ 100% giao diện Aqua Dashboard & Gói Dịch vụ Vàng/Kim Cương từ PlanbookAI-main
// Tuân thủ Luật 7 (Code sạch 100%, không icon, không emoji) và khớp chính xác 100% đường dẫn Route trong App.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TeacherWorkspace = () => {
  const { user } = useAuth();

  // State quản lý Gói Dịch vụ đang sử dụng ('BASIC', 'GOLD', 'DIAMOND') và số dư Credit AI
  const [currentPlan, setCurrentPlan] = useState('GOLD');
  const [aiCredits, setAiCredits] = useState(user?.aiCredits || 480);
  const [upgradeNotice, setUpgradeNotice] = useState('');

  // Dữ liệu thống kê thực tế cho Aqua Dashboard
  const dashboardStats = {
    studentsCount: 128,
    lessonsCount: 14,
    examsCount: 8,
    performance: 88,
    // Dữ liệu Phổ điểm theo chuyên đề Hóa học THPT (Tỷ lệ % Giỏi / Khá / Trung bình)
    subjectStats: [
      { name: 'Cấu tạo Nguyên tử (Hóa 10)', gioi: 52, kha: 33, trungbinh: 15 },
      { name: 'Bảng Tuần Hoàn (Hóa 10)', gioi: 48, kha: 38, trungbinh: 14 },
      { name: 'Cân bằng Hóa học (Hóa 11)', gioi: 40, kha: 42, trungbinh: 18 },
      { name: 'Ester - Lipid (Hóa 12)', gioi: 58, kha: 30, trungbinh: 12 },
    ],
    // Dữ liệu Biểu đồ Tròn Tổng quan Năng lực
    distribution: [
      { label: 'Giỏi (>= 8.0)', percent: 48, color: '#00ced1' },
      { label: 'Khá (6.5 - 7.9)', percent: 34, color: '#34d399' },
      { label: 'Trung bình (5.0 - 6.4)', percent: 13, color: '#fbbf24' },
      { label: 'Cần phụ đạo (< 5.0)', percent: 5, color: '#f87171' },
    ],
  };

  // Danh sách 3 Gói Dịch vụ giống hệt giao diện SubscriptionManager.jsx của PlanbookAI-main
  const packages = [
    {
      code: 'BASIC',
      name: 'Gói Cơ bản (Starter)',
      price: '0 VNĐ',
      duration: '30 ngày',
      credits: 50,
      badgeText: 'Dùng thử',
      description: 'Phù hợp cho giáo viên mới làm quen công cụ AI soạn giáo án Hóa học.',
      features: [
        '50 Credit AI / tháng để soạn Giáo án Công văn 5512',
        'Tạo tối đa 5 Đề kiểm tra Hóa học mỗi tháng',
        'Chấm thử nghiệm tối đa 30 Phiếu trắc nghiệm OCR',
      ],
      theme: {
        borderColor: '#e2e8f0',
        cardBg: '#ffffff',
        btnBg: 'linear-gradient(135deg, #475569, #334155)',
        titleColor: '#0f172a',
        descColor: '#64748b',
        priceColor: '#1e293b',
        featureColor: '#475569',
        badgeBg: '#e2e8f0',
        badgeColor: '#475569',
      },
    },
    {
      code: 'GOLD',
      name: 'Gói Vàng (Pro Hóa học)',
      price: '99.000 VNĐ',
      duration: '30 ngày',
      credits: 500,
      badgeText: 'Khuyên dùng',
      description: 'Tối ưu toàn diện cho giáo viên giảng dạy Hóa học khối 10, 11, 12.',
      features: [
        '500 Credit AI / tháng + Mở khóa Kho Giáo án Mẫu Hệ thống',
        'Trộn 4 Mã đề (101 - 104) & Ma trận nhận thức không giới hạn',
        'Chấm 1.000 Phiếu OCR / tháng + Bản đồ Soi lỗi Xanh/Đỏ',
      ],
      theme: {
        borderColor: '#f59e0b',
        cardBg: 'linear-gradient(to bottom, #ffffff, #fffbeb)',
        btnBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
        titleColor: '#0f172a',
        descColor: '#78350f',
        priceColor: '#b45309',
        featureColor: '#451a03',
        badgeBg: '#fef3c7',
        badgeColor: '#b45309',
      },
    },
    {
      code: 'DIAMOND',
      name: 'Gói Kim Cương (Tổ Bộ môn)',
      price: '199.000 VNĐ',
      duration: '90 ngày',
      credits: 2000,
      badgeText: 'Cao cấp nhất',
      description: 'Đặc quyền toàn diện cho Tổ Hóa học và giáo viên ôn thi THPT Quốc gia.',
      features: [
        '2.000 Credit AI / kỳ (Không giới hạn Soạn giáo án & Bài tập)',
        'Dùng chung Ngân hàng Câu hỏi Hóa học chuẩn GDPT 2018',
        'Chấm Phiếu OCR hàng loạt không giới hạn + Xuất Sổ điểm CSV',
      ],
      theme: {
        borderColor: '#6366f1',
        cardBg: 'linear-gradient(to bottom, #1e1b4b, #0f0e26)',
        btnBg: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        titleColor: '#ffffff',
        descColor: '#a5b4fc',
        priceColor: '#ffffff',
        featureColor: '#c7d2fe',
        badgeBg: '#4f46e5',
        badgeColor: '#ffffff',
      },
    },
  ];

  // Danh sách 6 lối tắt công cụ khớp chính xác Route trong App.jsx
  const quickTools = [
    {
      title: 'Soạn Giáo án AI (Wizard 4 Bước)',
      desc: 'Thiết kế kế hoạch bài dạy Hóa học chuẩn Công văn 5512 hoặc dùng Mẫu Hệ thống.',
      to: '/teacher/lesson-plan-ai',
      tag: 'Công văn 5512',
    },
    {
      title: 'Tạo Bài tập Hóa học Thông minh',
      desc: 'Sinh câu hỏi trắc nghiệm, điền từ, tự luận theo chuyên đề kèm hướng dẫn giải.',
      to: '/teacher/exercise-creator',
      tag: 'AI Bài tập',
    },
    {
      title: 'Đề kiểm tra & Ma trận Nhận thức',
      desc: 'Cấu hình ma trận 4 mức độ, trộn 4 mã đề (101 - 104) và cấp phát mã chia sẻ.',
      to: '/teacher/exam-generator',
      tag: 'Trộn Mã đề',
    },
    {
      title: 'Chấm Phiếu Trắc nghiệm AI OCR',
      desc: 'Quét phiếu trả lời hàng loạt, xem Bản đồ Đáp án Xanh/Đỏ và xuất sổ điểm CSV.',
      to: '/teacher/ocr-grading',
      tag: 'AI Vision OCR',
    },
    {
      title: 'Phổ điểm Lớp & Tiến bộ Học sinh',
      desc: 'Xem biểu đồ điểm số từng học sinh qua các kỳ thi và sinh nhận xét cá nhân.',
      to: '/teacher/analytics',
      tag: 'Phân tích Dữ liệu',
    },
    {
      title: 'Ngân hàng Câu hỏi Hóa học',
      desc: 'Quản lý kho câu hỏi Hóa 10, 11, 12, sửa trực tiếp (Inline Edit) và sao chép nhanh.',
      to: '/teacher/question-bank',
      tag: 'Ngân hàng Câu hỏi',
    },
  ];

  // Hàm xử lý khi Giáo viên bấm đăng ký / nâng cấp Gói VIP
  const handleSelectPackage = (pkg) => {
    setCurrentPlan(pkg.code);
    setAiCredits((prev) => prev + pkg.credits);
    setUpgradeNotice(
      `Đăng ký thành công "${pkg.name}"! Hệ thống đã cộng thêm +${pkg.credits} Credit AI vào tài khoản của thầy/cô.`
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* PHẦN 1: AQUA HERO BANNER ĐẶC TRƯNG TỪ TEACHERDASHBOARD.JSX CỦA PLANBOOKAI-MAIN */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
          borderRadius: 24,
          padding: '32px 36px',
          color: '#0d9488',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
          border: '1px solid #5eead4',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.7)',
              color: '#0f766e',
              fontSize: '0.78rem',
              fontWeight: 800,
              marginBottom: 10,
            }}
          >
            TỔ HÓA HỌC THPT • GÓI HIỆN TẠI: {currentPlan}
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 8px 0', color: '#0f766e' }}>
            Chào mừng {user?.fullName || 'Giáo viên'}!
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#115e59', margin: 0, lineHeight: 1.5 }}>
            Hệ thống PlanbookAI đã sẵn sàng. Thầy/cô đang quản lý{' '}
            <b>{dashboardStats.studentsCount}</b> học sinh và đã soạn{' '}
            <b>{dashboardStats.lessonsCount}</b> giáo án Hóa học chuẩn Công văn 5512.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            padding: '16px 24px',
            borderRadius: 18,
            border: '1px solid #5eead4',
            textAlign: 'right',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f766e', textTransform: 'uppercase' }}>
            Số dư Hạn mức AI
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#4f46e5', marginTop: 2 }}>
            {aiCredits} Credits
          </div>
        </div>
      </div>

      {/* Thông báo khi nâng cấp gói thành công */}
      {upgradeNotice && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #6ee7b7',
            color: '#065f46',
            padding: '14px 20px',
            borderRadius: 16,
            fontWeight: 700,
            fontSize: '0.92rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{upgradeNotice}</span>
          <button
            onClick={() => setUpgradeNotice('')}
            style={{
              background: '#ffffff',
              border: '1px solid #a7f3d0',
              borderRadius: 8,
              padding: '4px 12px',
              cursor: 'pointer',
              fontWeight: 700,
              color: '#047857',
            }}
          >
            Đóng
          </button>
        </div>
      )}

      {/* PHẦN 2: 4 THẺ THỐNG KÊ GLASS-PANEL GIỐNG HỆT TEACHERDASHBOARD.JSX */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
        }}
      >
        {[
          {
            label: 'Học sinh quản lý',
            value: dashboardStats.studentsCount,
            tag: 'HS',
            bg: '#e0fcfc',
            color: '#008b8b',
            border: 'rgba(0, 206, 209, 0.25)',
          },
          {
            label: 'Giáo án đã soạn',
            value: dashboardStats.lessonsCount,
            tag: '5512',
            bg: '#ecfdf5',
            color: '#059669',
            border: 'rgba(52, 211, 153, 0.25)',
          },
          {
            label: 'Đề thi thực tế',
            value: dashboardStats.examsCount,
            tag: 'ĐỀ',
            bg: '#fffbeb',
            color: '#d97706',
            border: 'rgba(251, 191, 36, 0.25)',
          },
          {
            label: 'Hiệu suất lớp',
            value: `${dashboardStats.performance}%`,
            tag: 'ĐẠT',
            bg: '#fef2f2',
            color: '#dc2626',
            border: 'rgba(248, 113, 113, 0.25)',
          },
        ].map((card, i) => (
          <div
            key={i}
            className="glass-panel"
            style={{
              padding: 22,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              border: `1px solid ${card.border}`,
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 16,
                background: card.bg,
                color: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.85rem',
                flexShrink: 0,
              }}
            >
              {card.tag}
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>{card.label}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* PHẦN 3: 2 BIỂU ĐỒ PHỔ ĐIỂM & TỔNG QUAN NĂNG LỰC (DÙNG GLASS-PANEL GIỐNG BẢN CŨ) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}
      >
        {/* Biểu đồ Cột xếp chồng Phổ điểm theo chuyên đề Hóa học */}
        <div className="glass-panel" style={{ padding: 24, borderRadius: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              Phổ điểm theo chuyên đề Hóa học
            </h3>
            <div style={{ display: 'flex', gap: 12, fontSize: '0.75rem', fontWeight: 700 }}>
              <span style={{ color: '#059669' }}>Giỏi</span>
              <span style={{ color: '#3b82f6' }}>Khá</span>
              <span style={{ color: '#f59e0b' }}>Trung bình</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {dashboardStats.subjectStats.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                  <span style={{ color: '#334155' }}>{item.name}</span>
                  <span style={{ color: '#64748b' }}>
                    {item.gioi}% Giỏi / {item.kha}% Khá / {item.trungbinh}% TB
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 16,
                    borderRadius: 8,
                    overflow: 'hidden',
                    display: 'flex',
                    background: '#f1f5f9',
                  }}
                >
                  <div style={{ width: `${item.gioi}%`, background: '#059669' }} />
                  <div style={{ width: `${item.kha}%`, background: '#3b82f6' }} />
                  <div style={{ width: `${item.trungbinh}%`, background: '#f59e0b' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Biểu đồ Tròn Donut Tổng quan Năng lực (SVG Thuần) */}
        <div className="glass-panel" style={{ padding: 24, borderRadius: 20 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 18px 0' }}>
            Tổng quan Năng lực Học sinh
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
            {/* Vòng tròn Donut SVG hiển thị tỷ lệ đạt */}
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="60" fill="none" stroke="#e2e8f0" strokeWidth="22" />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#00ced1"
                strokeWidth="22"
                strokeDasharray="181 377"
                transform="rotate(-90 80 80)"
              />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#34d399"
                strokeWidth="22"
                strokeDasharray="128 377"
                strokeDashoffset="-181"
                transform="rotate(-90 80 80)"
              />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="22"
                strokeDasharray="49 377"
                strokeDashoffset="-309"
                transform="rotate(-90 80 80)"
              />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#f87171"
                strokeWidth="22"
                strokeDasharray="19 377"
                strokeDashoffset="-358"
                transform="rotate(-90 80 80)"
              />
              <text x="80" y="76" textAnchor="middle" fontSize="22" fontWeight="800" fill="#0f172a">
                {dashboardStats.performance}%
              </text>
              <text x="80" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">
                Đạt chuẩn
              </text>
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {dashboardStats.distribution.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem' }}>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: d.color,
                      display: 'inline-block',
                    }}
                  />
                  <span style={{ color: '#475569', fontWeight: 600 }}>{d.label}:</span>
                  <span style={{ color: '#0f172a', fontWeight: 800 }}>{d.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PHẦN 4: TRUY CẬP NHANH 6 CÔNG CỤ AI (ĐÚNG 100% ROUTE TRONG APP.JSX) */}
      <div className="glass-panel" style={{ padding: 26, borderRadius: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 18px 0' }}>
          Lối tắt Bộ Công cụ AI Giảng dạy Hóa học
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {quickTools.map((tool, idx) => (
            <Link
              key={idx}
              to={tool.to}
              style={{
                textDecoration: 'none',
                background: '#ffffff',
                padding: 20,
                borderRadius: 16,
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 12,
                transition: 'all 0.2s',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: 12,
                    background: '#e0f2fe',
                    color: '#0369a1',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  {tool.tag}
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', margin: '10px 0 6px 0' }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
                  {tool.desc}
                </p>
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4f46e5' }}>
                Mở công cụ -&gt;
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* PHẦN 5: GÓI DỊCH VỤ & ĐẶC QUYỀN (PHỐI MÀU VÀNG / KIM CƯƠNG Y HỆT SUBSCRIPTIONMANAGER.JSX CŨ) */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 24,
          padding: '28px 32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            Gói Dịch Vụ & Đặc Quyền
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 8 }}>
            Nâng cấp tài nguyên của thầy/cô để mở khóa Giáo án Mẫu cao cấp và Ngân hàng Câu hỏi Hóa học tối ưu bởi AI.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {packages.map((pkg) => {
            const isCurrent = currentPlan === pkg.code;
            const t = pkg.theme;
            return (
              <div
                key={pkg.code}
                style={{
                  background: t.cardBg,
                  border: `2px solid ${t.borderColor}`,
                  borderRadius: 24,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 20,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.06)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span
                      style={{
                        background: t.badgeBg,
                        color: t.badgeColor,
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: '0.75rem',
                        fontWeight: 800,
                      }}
                    >
                      {pkg.badgeText}
                    </span>
                    {isCurrent && (
                      <span
                        style={{
                          background: '#10b981',
                          color: '#ffffff',
                          padding: '4px 12px',
                          borderRadius: 20,
                          fontSize: '0.72rem',
                          fontWeight: 800,
                        }}
                      >
                        Đang kích hoạt
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: t.titleColor, margin: '0 0 6px 0' }}>
                    {pkg.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: t.descColor, margin: '0 0 16px 0', lineHeight: 1.5 }}>
                    {pkg.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 18 }}>
                    <span style={{ fontSize: '1.85rem', fontWeight: 900, color: t.priceColor }}>
                      {pkg.price}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: t.descColor }}>/ {pkg.duration}</span>
                  </div>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: '16px 0 0 0',
                      margin: 0,
                      borderTop: '1px solid rgba(148, 163, 184, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      fontSize: '0.86rem',
                      color: t.featureColor,
                    }}
                  >
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx}>- {feat}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPackage(pkg)}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: 14,
                    border: 'none',
                    background: t.btnBg,
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  {isCurrent ? `Gia hạn thêm (+${pkg.credits} Credits)` : `Đăng ký ${pkg.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherWorkspace;