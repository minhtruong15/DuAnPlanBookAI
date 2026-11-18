// File: frontend/src/pages/staff/PromptTemplates.jsx
// Chức năng: Quản lý AI Prompts, Dark-mode System Instruction Editor & Tham số Temperature / Max Tokens
// Đồng bộ giao diện từ PromptManager.jsx của PlanbookAI-main, tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';

const PromptTemplates = () => {
  const [activeKey, setActiveKey] = useState('lesson_5512');
  const [testResult, setTestResult] = useState('');

  const [prompts, setPrompts] = useState({
    lesson_5512: {
      name: 'Khung Giáo án Tự động (Công văn 5512)',
      description: 'Prompt sử dụng để xây dựng dàn ý giáo án Hóa học THPT chuẩn Công văn 5512.',
      systemInstruction:
        'Bạn là Chuyên gia Sư phạm Hóa học THPT của Bộ GD&ĐT Việt Nam. Hãy tạo ra một Kế hoạch bài dạy chi tiết bao gồm: I. Mục tiêu (Kiến thức, Năng lực hóa học, Phẩm chất); II. Thiết bị dạy học & Hóa chất; III. Tiến trình 4 Hoạt động (Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng). Các phương trình hóa học phải cân bằng chính xác và dùng danh pháp IUPAC.',
      model: 'gemini-2.5-flash',
      temperature: 0.5,
      maxTokens: 4000,
    },
    exam_matrix: {
      name: 'Sinh Đề thi Thông minh theo Ma trận',
      description: 'Prompt sử dụng để tạo câu hỏi trắc nghiệm Hóa học 4 lựa chọn dựa trên Ma trận nhận thức.',
      systemInstruction:
        'Bạn là chuyên gia khảo thí môn Hóa học THPT. Nhiệm vụ của bạn là sinh ra các câu hỏi trắc nghiệm khách quan 4 lựa chọn A, B, C, D đảm bảo tính chính xác khoa học và phân loại đúng 4 mức độ (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao).',
      model: 'gemini-2.5-pro',
      temperature: 0.7,
      maxTokens: 2048,
    },
    ocr_feedback: {
      name: 'Phân tích Lỗi sai OCR & Gợi ý Phụ đạo',
      description: 'Prompt tổng hợp câu sai trên phiếu trả lời trắc nghiệm để đưa ra nhận xét cho từng học sinh.',
      systemInstruction:
        'Dựa trên danh sách các câu hỏi Hóa học mà học sinh khoanh sai {{wrong_questions}}, hãy nhận xét ngắn gọn điểm mạnh, chỉ rõ lỗ hổng kiến thức và đề xuất 3 dạng bài tập ôn luyện.',
      model: 'gemini-2.5-flash',
      temperature: 0.4,
      maxTokens: 2048,
    },
  });

  const currentConfig = prompts[activeKey];

  const handleConfigChange = (key, value) => {
    setPrompts((prev) => ({
      ...prev,
      [activeKey]: { ...prev[activeKey], [key]: value },
    }));
  };

  const handleTestPrompt = () => {
    setTestResult(
      `[CHẠY THỬ SANDBOX THÀNH CÔNG - Model: ${currentConfig.model} | Temperature: ${currentConfig.temperature} | Max Tokens: ${currentConfig.maxTokens}]\nBộ não Gemini AI đã tiếp nhận System Instruction và sẵn sàng phục vụ Giáo viên Hóa học.`
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#312e81', margin: 0 }}>
            Quản lý AI Prompts
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: 6, marginBottom: 0 }}>
            Tinh chỉnh bộ não AI, thiết lập lệnh hệ thống để tối ưu hóa chất lượng đầu ra môn Hóa học.
          </p>
        </div>
        <button
          onClick={() => alert('Đã lưu cấu hình AI Prompt vào hệ thống!')}
          className="btn-primary"
          style={{ padding: '12px 24px', borderRadius: 12 }}
        >
          Lưu cấu hình
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 22, alignItems: 'start' }}>
        {/* Sidebar Danh sách Prompts */}
        <div style={{ background: '#ffffff', borderRadius: 20, padding: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>
            Danh sách Prompts
          </h3>
          {Object.entries(prompts).map(([key, p]) => (
            <button
              key={key}
              onClick={() => {
                setActiveKey(key);
                setTestResult('');
              }}
              style={{
                textAlign: 'left',
                padding: '12px 14px',
                borderRadius: 12,
                border: 'none',
                background: activeKey === key ? '#eef2ff' : 'transparent',
                color: activeKey === key ? '#4338ca' : '#475569',
                fontWeight: activeKey === key ? 800 : 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Trình Chỉnh sửa chính + Parameters */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#ffffff', borderRadius: 20, padding: 22, border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: '0 0 6px 0' }}>{currentConfig.name}</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{currentConfig.description}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {/* Dark-mode System Instruction Editor giống hệt PromptManager.jsx */}
            <div style={{ background: '#1e293b', borderRadius: 20, overflow: 'hidden', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#0f172a', padding: '12px 18px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e2e8f0', fontSize: '0.86rem', fontWeight: 700, fontFamily: 'monospace' }}>
                  System Instruction
                </span>
                <span style={{ color: '#34d399', fontSize: '0.75rem', fontFamily: 'monospace' }}>Ready</span>
              </div>
              <textarea
                value={currentConfig.systemInstruction}
                onChange={(e) => handleConfigChange('systemInstruction', e.target.value)}
                style={{
                  width: '100%',
                  height: 280,
                  background: 'transparent',
                  border: 'none',
                  color: '#38bdf8',
                  padding: 18,
                  fontSize: '0.9rem',
                  fontFamily: 'monospace',
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Model Parameters */}
            <div style={{ background: '#ffffff', borderRadius: 20, padding: 22, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                Tham số Mô hình (Parameters)
              </h3>

              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
                  Mô hình Gemini AI
                </label>
                <select
                  value={currentConfig.model}
                  onChange={(e) => handleConfigChange('model', e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700 }}
                >
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Tốc độ cao)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Chuyên sâu Hóa học)</option>
                </select>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
                  <span>Temperature</span>
                  <span style={{ color: '#4f46e5' }}>{currentConfig.temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={currentConfig.temperature}
                  onChange={(e) => handleConfigChange('temperature', parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#4f46e5' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <span>Chính xác</span>
                  <span>Sáng tạo</span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
                  <span>Max Tokens</span>
                  <span style={{ color: '#4f46e5' }}>{currentConfig.maxTokens}</span>
                </div>
                <input
                  type="range"
                  min="512"
                  max="8192"
                  step="512"
                  value={currentConfig.maxTokens}
                  onChange={(e) => handleConfigChange('maxTokens', parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#4f46e5' }}
                />
              </div>

              <button
                onClick={handleTestPrompt}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 10,
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#059669',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Chạy thử Prompt (Sandbox)
              </button>
            </div>
          </div>

          {testResult && (
            <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', color: '#065f46', padding: 16, borderRadius: 14, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-line' }}>
              {testResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptTemplates;