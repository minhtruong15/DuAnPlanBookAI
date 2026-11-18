// File: frontend/src/pages/teacher/TeacherWorkspace.jsx
// Chuc nang: Khong gian lam viec Tong quan cua Giao vien Hoa hoc + Quan ly & Nang cap Goi Dich vu VIP (Subscription)
// Nang cap tu TeacherDashboard & SubscriptionManager cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";
import { Link } from "react-router-dom";

const TeacherWorkspace = () => {
  // State luu Goi dich vu hien tai cua Giao vien ('BASIC', 'PRO', 'DIAMOND')
  const [currentPlan, setCurrentPlan] = useState("PRO");
  // State luu so du Credit AI
  const [aiCredits, setAiCredits] = useState(480);
  // State thong bao nang cap goi thanh cong
  const [upgradeMessage, setUpgradeMessage] = useState("");

  // Danh sach 3 Goi Dich vu VIP cho Giao vien Hoa hoc THPT
  const packages = [
    {
      code: "BASIC",
      name: "Goi Co ban (Starter)",
      price: "0 VND / Thang",
      credits: 50,
      features: [
        "50 Credit AI / thang de soan Giao an 5512",
        "Tao toi da 5 De thi Hoa hoc / thang",
        "Cham thu nghiem 30 Phieu trac nghiem OCR",
      ],
    },
    {
      code: "PRO",
      name: "Goi Vang - Pro Hoa hoc",
      price: "99.000 VND / Thang",
      credits: 500,
      features: [
        "500 Credit AI / thang + Mo khoa Kho Giao an Mau He thong",
        "Tron 4 Ma de (101-104) & Ma tran nhan thuc khong gioi han",
        "Cham 1.000 Phieu OCR / thang + Ban do Soi loi Xanh/Do",
      ],
    },
    {
      code: "DIAMOND",
      name: "Goi Kim Cuong - To Bo Mon",
      price: "199.000 VND / Thang",
      credits: 2000,
      features: [
        "2.000 Credit AI / thang (Khong gioi han Soan giao an & Bai tap)",
        "Dung chung Ngan hang Cau hoi Hoa hoc THPT toan truong",
        "Cham Phieu OCR hang loat khong gioi han + Xuat So diem CSV",
      ],
    },
  ];

  // Ham xu ly khi Giao vien bam Nang cap Goi dich vu
  const handleSelectPackage = (pkg) => {
    setCurrentPlan(pkg.code);
    setAiCredits((prev) => prev + pkg.credits);
    setUpgradeMessage(
      `Da kich hoat thanh cong "${pkg.name}"! He thong da cong them +${pkg.credits} Credit AI vao tai khoan cua ban.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Banner Chao mung & Trang thai Goi VIP */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase">
              To Hoa hoc THPT
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
              Hang thanh vien: {currentPlan}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Khong gian Lam viec Giao vien Hoa hoc (PlanbookAI Portal)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quan ly tien do giang day, truy cap nhanh 6 cong cu AI va quan ly han muc Goi dich vu VIP
          </p>
        </div>

        <div className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-right">
          <div className="text-xs font-bold text-slate-500 uppercase">
            So du Han muc AI Hien tai
          </div>
          <div className="text-2xl font-bold text-indigo-600 mt-0.5">
            {aiCredits} Credits
          </div>
        </div>
      </div>

      {/* Thong bao khi nang cap goi thanh cong */}
      {upgradeMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-semibold flex items-center justify-between">
          <span>{upgradeMessage}</span>
          <button
            onClick={() => setUpgradeMessage("")}
            className="text-xs font-bold underline"
          >
            [Dong]
          </button>
        </div>
      )}

      {/* 4 The Thong ke Tong quan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Giao an 5512 Da Soan", value: "14 Giao an", sub: "Khoi 10, 11, 12" },
          { label: "Ngan hang Cau hoi Ca nhan", value: "185 Cau", sub: "4 Muc do nhan thuc" },
          { label: "Bo De thi Da Xuat ban", value: "08 Bo de", sub: "32 Ma de da tron" },
          { label: "Phieu Trac nghiem Da Cham OCR", value: "340 Phieu", sub: "Do chinh xac 99.8%" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="text-xs font-bold text-slate-500 uppercase">
              {stat.label}
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-1">
              {stat.value}
            </div>
            <div className="text-xs text-blue-600 font-semibold mt-1">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Loi tat Truy cap Nhanh 6 Phan he AI cua Giao vien */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800 border-b pb-3">
          1. Truy cap Nhanh Bo Cong cu AI Giang day Hoa hoc
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Soan Giao an AI (Wizard 4 Buoc)",
              desc: "Thiet ke ke hoach bai day chuan Cong van 5512 hoac su dung Mau He thong.",
              to: "/teacher/lesson-plans",
              badge: "Cong van 5512",
            },
            {
              title: "Tao Bai tap Hoa hoc Tu dong",
              desc: "Sinh bai tap tu luan va trac nghiem theo chuyen de kem loi giai chi tiet.",
              to: "/teacher/exercises",
              badge: "AI Generator",
            },
            {
              title: "Ngan hang Cau hoi Hoa hoc",
              desc: "Quan ly kho cau hoi phan loai theo Nhan biet, Thong hieu, Van dung.",
              to: "/teacher/questions",
              badge: "Question Bank",
            },
            {
              title: "Thiet ke De thi & Ma tran (Wizard 4 Buoc)",
              desc: "Tron 4 ma de (101-104), cai mat khau va xuat Ma QR chia se.",
              to: "/teacher/exams",
              badge: "Exam Matrix",
            },
            {
              title: "Cham Phieu Trac nghiem OCR",
              desc: "Quet phieu tra loi hang loat va mo Ban do Soi loi Dap an Xanh/Do.",
              to: "/teacher/ocr-grading",
              badge: "AI Vision OCR",
            },
            {
              title: "Phan tich Tien bo Hoc sinh",
              desc: "Xem bieu do diem so tung hoc sinh va sinh nhan xet ca nhan hoa.",
              to: "/teacher/analytics",
              badge: "Student Analytics",
            },
          ].map((tool, i) => (
            <Link
              key={i}
              to={tool.to}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {tool.badge}
                </span>
                <h3 className="text-sm font-bold text-slate-800 mt-2">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{tool.desc}</p>
              </div>
              <span className="text-xs font-bold text-blue-600">
                Mo cong cu -&gt;
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Khu vuc Quan ly & Nang cap Goi Dich vu VIP (Subscription Manager) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              2. Quan ly & Nang cap Goi Dich vu VIP (Subscription Packages)
            </h2>
            <p className="text-xs text-slate-500">
              Nang cap goi cuoc de mo khoa Kho Giao an Mau Chuan He thong va tang han muc Credit AI
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg">
            Goi dang su dung: {currentPlan}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages.map((pkg) => {
            const isCurrent = currentPlan === pkg.code;
            return (
              <div
                key={pkg.code}
                className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 ${
                  isCurrent
                    ? "bg-blue-50/60 border-blue-600 shadow-sm"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-slate-200 text-slate-800">
                      {pkg.code}
                    </span>
                    {isCurrent && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                        Dang kich hoat
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                  <div className="text-xl font-bold text-blue-700">{pkg.price}</div>
                  <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                    {pkg.features.map((f, idx) => (
                      <li key={idx}>- {f}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                    isCurrent
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isCurrent
                    ? `[Gia han them +${pkg.credits} Credits]`
                    : `[Nang cap len ${pkg.name}]`}
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