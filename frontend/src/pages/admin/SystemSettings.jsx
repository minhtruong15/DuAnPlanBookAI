// File: frontend/src/pages/admin/SystemSettings.jsx
// Chức năng: Cấu hình Hệ thống theo 4 Nhóm Tab (AI, Quota, Bảo mật, Thông tin chung) đồng bộ từ SystemConfig.jsx của PlanbookAI-main
// Tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState('AI');
  const [savedNotice, setSavedNotice] = useState('');

  const [configs, setConfigs] = useState({
    AI: [
      { key: 'aiModelName', label: 'Mô hình Gemini AI mặc định', value: 'gemini-2.5-flash', type: 'text' },
      { key: 'aiTemperature', label: 'Độ sáng tạo mặc định (Temperature)', value: '0.5', type: 'text' },
      { key: 'ocrConfidenceThreshold', label: 'Ngưỡng độ tin cậy nhận diện OCR (%)', value: '85', type: 'number' },
    ],
    Quota: [
      { key: 'defaultFreeCredits', label: 'Số Credit AI miễn phí khi đăng ký mới', value: '50', type: 'number' },
      { key: 'maxOcrFileSizeMB', label: 'Dung lượng ảnh Phiếu trắc nghiệm tối đa (MB)', value: '5', type: 'number' },
      { key: 'maxQuestionsPerExam', label: 'Số câu hỏi tối đa mỗi Đề kiểm tra', value: '50', type: 'number' },
    ],
    Security: [
      { key: 'jwtExpireHours', label: 'Thời hạn phiên đăng nhập JWT (Giờ)', value: '24', type: 'number' },
      { key: 'maintenanceMode', label: 'Chế độ bảo trì toàn hệ thống (true / false)', value: 'false', type: 'text' },
    ],
    General: [
      { key: 'portalName', label: 'Tên cổng ứng dụng', value: 'PlanbookAI (PBA) - Hóa học THPT', type: 'text' },
      { key: 'supportEmail', label: 'Email hỗ trợ kỹ thuật', value: 'support@planbookai.vn', type: 'text' },
    ],
  });

  const categories = [
    { id: 'AI', name: '1. Trí tuệ Nhân tạo (AI)' },
    { id: 'Quota', name: '2. Giới hạn & Quota' },
    { id: 'Security', name: '3. Bảo mật & Hệ thống' },
    { id: 'General', name: '4. Thông tin chung' },
  ];

  const handleChange = (key, newVal) => {
    setConfigs((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((item) => (item.key === key ? { ...item, value: newVal } : item)),
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(`Đã lưu toàn bộ cấu hình nhóm "${activeTab}" thành công!`);
    setTimeout(() => setSavedNotice(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
          Cấu hình Hệ thống (System Config)
        </h1>
        <p style={{ color: '#64748b', marginTop: 6, marginBottom: 0, fontSize: '0.98rem' }}>
          Quản trị tham số Gemini AI, giới hạn Quota giáo viên, bảo mật và thông tin cổng trường THPT.
        </p>
      </div>

      {savedNotice && (
        <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', color: '#065f46', padding: '12px 18px', borderRadius: 14, fontWeight: 700, fontSize: '0.9rem' }}>
          {savedNotice}
        </div>
      )}

      {/* Bố cục 2 cột giống hệt SystemConfig.jsx: 4 Tab bên trái + Form bên phải */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, alignItems: 'start' }}>
        {/* Cột Tab bên trái */}
        <div style={{ background: '#ffffff', padding: 16, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: 'none',
                  background: isActive ? '#fee2e2' : 'transparent',
                  color: isActive ? '#b91c1c' : '#475569',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Cột Form chi tiết bên phải */}
        <form
          onSubmit={handleSave}
          style={{
            gridColumn: 'span 2',
            background: '#ffffff',
            padding: 28,
            borderRadius: 20,
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: 0, borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>
            Thiết lập Tham số: {categories.find((c) => c.id === activeTab)?.name}
          </h2>

          {configs[activeTab].map((item) => (
            <div key={item.key}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                {item.label}
              </label>
              <input
                type={item.type}
                value={item.value}
                onChange={(e) => handleChange(item.key, e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.92rem', fontWeight: 600 }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10 }}>
            <button
              type="submit"
              style={{
                padding: '11px 24px',
                borderRadius: 12,
                border: 'none',
                background: '#dc2626',
                color: '#ffffff',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Lưu Cấu hình Hệ thống
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}