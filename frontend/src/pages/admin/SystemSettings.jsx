import React, { useState } from 'react';
import Button from '../../components/common/Button';

export default function SystemSettings() {
  // Các thông số cấu hình hệ thống toàn cục của Admin
  const [settings, setSettings] = useState({
    aiModelName: 'gemini-2.5-flash',
    defaultFreeCredits: 50,
    maxOcrFileSizeMB: 5,
    ocrConfidenceThreshold: 85,
    maintenanceMode: false,
  });

  const [savedNotice, setSavedNotice] = useState('');

  // Xử lý lưu cấu hình hệ thống
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedNotice('Đã lưu cấu hình hệ thống PlanbookAI thành công.');
    setTimeout(() => setSavedNotice(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Cấu Hình Hệ Thống & Tham Số AI / OCR</h2>
        <p className="text-sm text-slate-500 mt-1">
          Thiết lập mô hình Gemini AI, hạn mức Credit miễn phí mặc định và thông số quét ảnh OCR
        </p>

        {savedNotice && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg font-medium">
            {savedNotice}
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="mt-6 space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mô hình Trí tuệ nhân tạo mặc định (Google Gemini Engine)
            </label>
            <select
              value={settings.aiModelName}
              onChange={(e) => setSettings({ ...settings, aiModelName: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="gemini-2.5-flash">gemini-2.5-flash (Tốc độ cao - Khuyên dùng cho Giáo án & OCR)</option>
              <option value="gemini-2.5-pro">gemini-2.5-pro (Phân tích chuyên sâu bài toán Hóa học khó)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Số lượt Credit AI tặng miễn phí khi Giáo viên mới đăng ký
            </label>
            <input
              type="number"
              value={settings.defaultFreeCredits}
              onChange={(e) => setSettings({ ...settings, defaultFreeCredits: Number(e.target.value) })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Giới hạn dung lượng file ảnh phiếu trả lời OCR tối đa (MB)
            </label>
            <input
              type="number"
              value={settings.maxOcrFileSizeMB}
              onChange={(e) => setSettings({ ...settings, maxOcrFileSizeMB: Number(e.target.value) })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Ngưỡng độ tin cậy nhận diện chữ viết tay OCR tối thiểu (%)
            </label>
            <input
              type="number"
              min={50}
              max={100}
              value={settings.ocrConfidenceThreshold}
              onChange={(e) => setSettings({ ...settings, ocrConfidenceThreshold: Number(e.target.value) })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div className="pt-2">
            <Button type="submit">Lưu cấu hình hệ thống</Button>
          </div>
        </form>
      </div>
    </div>
  );
}