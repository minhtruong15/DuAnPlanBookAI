import React from 'react';

// Component Cửa sổ bật lên (Popup Modal) dùng khi Thêm/Sửa câu hỏi, Thêm người dùng, Xem chi tiết giáo án
export default function Modal({ isOpen, onClose, title, children }) {
  // Nếu trạng thái isOpen = false thì không hiển thị gì cả
  if (!isOpen) return null;

  return (
    // Lớp nền mờ màu đen phủ toàn màn hình
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Hộp nội dung trắng ở chính giữa */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100">
        {/* Thanh tiêu đề Modal và nút đóng (X) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none"
          >
            ×
          </button>
        </div>
        {/* Phần ruột bên trong Modal (Form nhập liệu hoặc thông tin chi tiết) */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}