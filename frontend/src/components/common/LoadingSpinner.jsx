import React from 'react';

// Component Vòng xoay chờ khi Gemini AI đang soạn giáo án hoặc đang chấm phiếu OCR
export default function LoadingSpinner({ message = 'Đang xử lý dữ liệu bằng Gemini AI...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-slate-600">
      {/* Vòng tròn xoay bằng hiệu ứng animate-spin của Tailwind CSS */}
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}