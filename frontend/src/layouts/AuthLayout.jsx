import React from 'react';
// Outlet là vị trí sẽ hiển thị LoginPage hoặc RegisterPage tùy theo đường dẫn URL
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* CỘT BÊN TRÁI: Banner giới thiệu hệ thống PlanbookAI (Ẩn trên điện thoại nhỏ, hiện trên máy tính) */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-900 text-white p-12 flex-col justify-between">
        <div>
          <span className="px-3 py-1 bg-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wider">
            PlanbookAI (PBA) - THPT Hóa Học
          </span>
          <h1 className="text-4xl font-bold mt-6 leading-tight">
            Cổng công cụ AI thông minh dành cho Giáo viên Hóa học THPT
          </h1>
          <p className="mt-4 text-indigo-200 text-lg">
            Tự động hóa soạn giáo án Công văn 5512, quản lý ngân hàng câu hỏi, trộn mã đề thi và chấm phiếu trắc nghiệm bằng Gemini Vision OCR.
          </p>
        </div>
        <div className="text-sm text-indigo-300">
          © 2026 PlanbookAI Capstone Project – Hệ thống phân quyền 4 Actors chuẩn hóa.
        </div>
      </div>

      {/* CỘT BÊN PHẢI: Khung chứa Form Đăng nhập (LoginPage) hoặc Đăng ký (RegisterPage) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}