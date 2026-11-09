import React from 'react';

// Component Nút bấm dùng chung cho toàn dự án với các kiểu màu (variant) khác nhau
export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' (Xanh tím), 'secondary' (Xám), 'danger' (Đỏ), 'success' (Xanh lá)
  disabled = false,
  className = '',
}) {
  // Bảng màu tương ứng với từng loại nút
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}