// File: frontend/src/layouts/MainPortalLayout.jsx
// Chuc nang: Bo cuc Khung Portal chinh cho 4 Actor + Tich hop Cua so Ho so Ca nhan (UserProfileModal)
// Nang cap tu MainPortalLayout & UserProfileModal cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/constants";

const MainPortalLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // State bat/tat Cua so Modal Ho so Ca nhan khi bam vao ten nguoi dung tren Header
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Danh sach Menu dieu huong theo dung phan quyen RBAC cua 4 Actor
  const menuByRole = {
    [ROLES.ADMIN]: [
      { path: "/admin/users", label: "1. Quan ly Nguoi dung" },
      { path: "/admin/settings", label: "2. Cau hinh He thong" },
      { path: "/admin/frameworks", label: "3. Khung Chuong trinh 5512" },
      { path: "/admin/revenue", label: "4. Doanh thu & Nhat ky He thong" },
    ],
    [ROLES.MANAGER]: [
      { path: "/manager/packages", label: "1. Quan ly Goi cuoc VIP" },
      { path: "/manager/orders", label: "2. Don hang & Thanh toan" },
      { path: "/manager/approvals", label: "3. Phe duyet Hoc lieu Staff" },
    ],
    [ROLES.STAFF]: [
      { path: "/staff/sample-lessons", label: "1. Bien soan Giao an Mau" },
      { path: "/staff/question-bank", label: "2. Xay dung Ngan hang Cau hoi" },
      { path: "/staff/prompt-templates", label: "3. Quan ly Khuon mau Prompt AI" },
    ],
    [ROLES.TEACHER]: [
      { path: "/teacher/workspace", label: "1. Tong quan & Goi VIP" },
      { path: "/teacher/lesson-plans", label: "2. Soan Giao an AI (Wizard)" },
      { path: "/teacher/exercises", label: "3. Tao Bai tap Hoa hoc" },
      { path: "/teacher/questions", label: "4. Ngan hang Cau hoi" },
      { path: "/teacher/exams", label: "5. Tao De thi (Wizard)" },
      { path: "/teacher/ocr-grading", label: "6. Cham thi AI OCR" },
      { path: "/teacher/analytics", label: "7. Phan tich Hoc sinh" },
    ],
  };

  const currentRole = user?.role || ROLES.TEACHER;
  const navItems = menuByRole[currentRole] || menuByRole[ROLES.TEACHER];

  // Ham xu ly Dang xuat
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Lay chu cai dau cua Ho ten de hien thi Avatar
  const avatarInitial = (user?.fullName || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* THANH SIDEBAR BEN TRAI */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Ten Du an */}
          <div className="p-6 border-b border-slate-800">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-400">
              AI Tools Portal
            </div>
            <h1 className="text-xl font-bold text-white mt-1">
              PlanbookAI THPT
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Chuyen sau Hoa hoc • Vai tro: {currentRole}
            </p>
          </div>

          {/* Danh sach Menu */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white font-bold shadow-sm"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Thong tin Phien ban o chan Sidebar */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <div>Phien ban: v2.0 (Nang cap Wizard)</div>
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-lg bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white font-bold text-xs transition-all"
          >
            Dang xuat He thong
          </button>
        </div>
      </aside>

      {/* KHU VUC NOI DUNG CHINH BEN PHAI */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* THANH HEADER TREN CUNG */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-700">
              Cong Cong cu AI Giao vien Hoa hoc THPT
            </span>
          </div>

          {/* Nut Bam Mo Cua so Ho so Ca nhan (UserProfileModal) */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                {avatarInitial}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-800">
                  {user?.fullName || "Nguoi dung PlanbookAI"}
                </div>
                <div className="text-[11px] text-blue-600 font-semibold">
                  [{currentRole}] - Xem Ho so
                </div>
              </div>
            </button>
          </div>
        </header>

        {/* NOI DUNG TRANG CON (OUTLET) */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* CUA SO MODAL HO SO CA NHAN (TICH HOP TU USERPROFILEMODAL.JSX CUA PLANBOOKAI-MAIN) */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Ho so Tai khoan Ca nhan
              </h3>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                [Dong]
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shrink-0">
                {avatarInitial}
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">
                  {user?.fullName || "Thanh vien PlanbookAI"}
                </div>
                <div className="text-xs text-slate-500">
                  {user?.email || "teacher@planbookai.vn"}
                </div>
                <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  Vai tro: {currentRole}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Don vi Chuyen mon:</span>
                <span className="font-bold">To Hoa hoc THPT - Chuong trinh GDPT 2018</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Trang thai Tai khoan:</span>
                <span className="font-bold text-emerald-700">Dang hoat dong (Active)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Goi Dich vu AI:</span>
                <span className="font-bold text-indigo-700">Goi Vang - Pro Hoa hoc</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Han muc Credit AI con lai:</span>
                <span className="font-bold text-blue-700">480 Credits</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsProfileOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700"
              >
                Dong cua so
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
              >
                Dang xuat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPortalLayout;