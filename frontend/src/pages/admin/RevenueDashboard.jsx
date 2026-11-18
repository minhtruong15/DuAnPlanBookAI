// File: frontend/src/pages/admin/RevenueDashboard.jsx
// Chuc nang: Dashboard Doanh thu, Co cau 4 Actor & Bieu do Tan suat Hoat dong Tuong tac theo Ngay + Nhat ky He thong
// Nang cap tu AdminDashboard.jsx cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";

const RevenueDashboard = () => {
  // Du lieu Tan suat hoat dong va Doanh thu 7 ngay qua (Bam vao cot nao se loc Nhat ky cua ngay do)
  const dailyStats = [
    {
      date: "12/11/2026",
      label: "Thu 5",
      activities: 42,
      revenue: "1.980.000 VND",
      logs: [
        { id: 1, time: "08:15:20", user: "teacher@planbookai.vn", action: "Soan Giao an AI Bai 1: Cau tao nguyen tu (Khoi 10)", status: "Thanh cong" },
        { id: 2, time: "10:30:05", user: "staff@planbookai.vn", action: "Gui duyet 15 cau hoi Hoa 12 Chuong Ester", status: "Thanh cong" },
      ],
    },
    {
      date: "13/11/2026",
      label: "Thu 6",
      activities: 65,
      revenue: "2.970.000 VND",
      logs: [
        { id: 3, time: "09:10:12", user: "manager@planbookai.vn", action: "Phe duyet Mau Giao an 5512: Phan ung Oxi hoa - Khu", status: "Thanh cong" },
        { id: 4, time: "14:22:40", user: "teacher@planbookai.vn", action: "Tron 4 Ma de (101-104) Kiem tra Giua ky Hoa 10", status: "Thanh cong" },
      ],
    },
    {
      date: "14/11/2026",
      label: "Thu 7",
      activities: 58,
      revenue: "2.450.000 VND",
      logs: [
        { id: 5, time: "11:05:00", user: "teacher@planbookai.vn", action: "Quet OCR lo 35 phieu tra loi trac nghiem Lop 10A1", status: "Thanh cong" },
      ],
    },
    {
      date: "15/11/2026",
      label: "CN",
      activities: 35,
      revenue: "1.490.000 VND",
      logs: [
        { id: 6, time: "20:00:00", user: "admin@planbookai.vn", action: "Sao luu Co so du lieu MySQL (Prisma Snapshot)", status: "Thanh cong" },
      ],
    },
    {
      date: "16/11/2026",
      label: "Thu 2",
      activities: 88,
      revenue: "4.150.000 VND",
      logs: [
        { id: 7, time: "07:45:10", user: "teacher@planbookai.vn", action: "Nang cap Goi Vang - Pro Hoa hoc (99.000 VND)", status: "Thanh cong" },
        { id: 8, time: "15:18:33", user: "staff@planbookai.vn", action: "Cap nhat System Prompt: Sinh De thi theo Ma tran", status: "Thanh cong" },
      ],
    },
    {
      date: "17/11/2026",
      label: "Thu 3",
      activities: 76,
      revenue: "3.560.000 VND",
      logs: [
        { id: 9, time: "13:12:45", user: "manager@planbookai.vn", action: "Xac nhan don hang #ORD-2026-89 cho To Hoa THPT Le Hong Phong", status: "Thanh cong" },
      ],
    },
    {
      date: "18/11/2026",
      label: "Hom nay",
      activities: 95,
      revenue: "4.950.000 VND",
      logs: [
        { id: 10, time: "08:00:15", user: "teacher@planbookai.vn", action: "Xuat Bao cao Phan tich Tien bo Hoc sinh Lop 10A1", status: "Thanh cong" },
        { id: 11, time: "09:25:50", user: "manager@planbookai.vn", action: "Duyet 20 cau hoi Van dung cao Hoa hoc 12", status: "Thanh cong" },
        { id: 12, time: "14:50:10", user: "admin@planbookai.vn", action: "Kiem tra ket noi Gemini AI Engine & Docker Containers", status: "Thanh cong" },
      ],
    },
  ];

  // State luu ngay dang duoc Admin nhap chon tren Bieu do cot
  const [selectedDate, setSelectedDate] = useState("18/11/2026");
  const currentDayData =
    dailyStats.find((d) => d.date === selectedDate) ||
    dailyStats[dailyStats.length - 1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Bao cao Doanh thu, Co cau Nguoi dung & Nhat ky He thong
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Giam sat doanh thu Goi cuoc VIP, phan bo 4 Actor va nhat ky truy vet hoat dong theo tung ngay
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
          Trang thai Server: Uptime 99.99%
        </span>
      </div>

      {/* 4 The KPI Tong quan He thong */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tong Doanh thu Thang 11", value: "48.500.000 VND", sub: "+18% so voi thang truoc" },
          { label: "Tong Tai khoan 4 Actor", value: "320 Nguoi dung", sub: "285 Giao vien Hoa THPT" },
          { label: "Luot Goi Gemini AI / Ngay", value: "1.420 Requests", sub: "Phan hoi TB: 1.2 giay" },
          { label: "Dung luong MySQL Database", value: "245 MB", sub: "10 Bang du lieu Prisma" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase">{kpi.label}</div>
            <div className="text-2xl font-bold text-slate-800 mt-1">{kpi.value}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Bieu do Cot Tuong tac 7 Ngay + Co cau 4 Actor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BIEU DO COT TUONG TAC: BAM VAO COT DE XEM NHAT KY NGAY DO */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                1. Bieu do Tan suat Hoat dong & Doanh thu 7 Ngay qua
              </h2>
              <p className="text-xs text-slate-500">
                Nhap chon cot ngay bat ky de xem chi tiet Nhat ky Hoat dong (System Logs) ben duoi
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded">
              Dang chon: {currentDayData.date} ({currentDayData.revenue})
            </span>
          </div>

          <div className="h-56 bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-end justify-between gap-3">
            {dailyStats.map((day) => {
              const isSelected = day.date === selectedDate;
              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  className="flex-1 flex flex-col items-center justify-end h-full group"
                >
                  <span
                    className={`text-xs font-bold mb-1 ${
                      isSelected ? "text-blue-700" : "text-slate-500"
                    }`}
                  >
                    {day.activities}
                  </span>
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      isSelected
                        ? "bg-blue-600 shadow-md"
                        : "bg-blue-200 group-hover:bg-blue-400"
                    }`}
                    style={{ height: `${day.activities}%` }}
                  />
                  <span
                    className={`text-xs mt-2 font-bold ${
                      isSelected ? "text-blue-700 underline" : "text-slate-600"
                    }`}
                  >
                    {day.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CO CAU NGUOI DUNG THEO 4 ACTOR CHUAN DE CUONG */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-800 border-b pb-3">
            2. Co cau 4 Actor trong He thong
          </h2>
          <div className="space-y-4">
            {[
              { role: "Giao vien THPT (TEACHER)", count: 285, percent: 89, color: "bg-blue-600" },
              { role: "Chuyen vien Hoc lieu (STAFF)", count: 25, percent: 8, color: "bg-emerald-600" },
              { role: "Quan ly Van hanh (MANAGER)", count: 7, percent: 2, color: "bg-indigo-600" },
              { role: "Quan tri He thong (ADMIN)", count: 3, percent: 1, color: "bg-rose-600" },
            ].map((r, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{r.role}</span>
                  <span>
                    {r.count} ({r.percent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${r.color}`}
                    style={{ width: `${r.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chi tiet Nhat ky Hoat dong (System Logs) cua Ngay duoc chon */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-slate-800">
            3. Chi tiet Nhat ky Hoat dong He thong - Ngay {currentDayData.date}
          </h2>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            {currentDayData.logs.length} su kien ghi nhan
          </span>
        </div>

        <div className="space-y-2.5">
          {currentDayData.logs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-slate-800">{log.action}</div>
                <div className="text-slate-500">
                  Thuc hien boi: <strong>{log.user}</strong>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  {log.status}
                </span>
                <span className="font-mono text-slate-500 font-semibold">
                  {log.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;