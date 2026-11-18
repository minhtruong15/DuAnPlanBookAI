// File: frontend/src/pages/teacher/StudentAnalytics.jsx
// Chuc nang: Phan tich Tien bo tung Hoc sinh, Bieu do Diem so qua cac Ky thi, AI Nhan xet Ca nhan & Xuat Bao cao CSV
// Nang cap tu StudentAnalytics.jsx cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";

const StudentAnalytics = () => {
  // Danh sach hoc sinh lop Hoa hoc THPT kem lich su diem 4 bai kiem tra
  const [students, setStudents] = useState([
    {
      id: "HS10A1-01",
      name: "Nguyen Minh Anh",
      className: "10A1 - Chuyen Hoa",
      avgScore: 8.9,
      rank: "Gioi",
      trend: "+0.8 diem",
      history: [
        { exam: "15 Phut Lan 1 (Cau tao Nguyen tu)", score: 8.5 },
        { exam: "45 Phut Chuong 1 (Bang Tuan Hoan)", score: 8.8 },
        { exam: "15 Phut Lan 2 (Lien ket Hoa hoc)", score: 9.0 },
        { exam: "Thi Giua Ky 1 (Tong hop)", score: 9.2 },
      ],
      strengths: "Nam vung Cau tao nguyen tu, Lien ket ion va Bao toan electron.",
      weaknesses: "Can tang toc do giai bai toan tinh % dong vi.",
      aiFeedback:
        "Minh Anh co tu duy Hoa hoc xuat sac, diem so tang deu qua 4 ky kiem tra. Co the boi duong them vao doi tuyen Hoc sinh gioi Hoa 10.",
    },
    {
      id: "HS10A1-02",
      name: "Tran Hoang Bao",
      className: "10A1 - Chuyen Hoa",
      avgScore: 7.3,
      rank: "Kha",
      trend: "+0.4 diem",
      history: [
        { exam: "15 Phut Lan 1 (Cau tao Nguyen tu)", score: 7.0 },
        { exam: "45 Phut Chuong 1 (Bang Tuan Hoan)", score: 6.8 },
        { exam: "15 Phut Lan 2 (Lien ket Hoa hoc)", score: 7.5 },
        { exam: "Thi Giua Ky 1 (Tong hop)", score: 7.8 },
      ],
      strengths: "Hieu ro ly thuyet Bang tuan hoan va xac dinh so oxi hoa.",
      weaknesses: "Hay nham dau khi viet cau hinh electron cua ion Fe2+ va Fe3+.",
      aiFeedback:
        "Hoang Bao co su tien bo ro ret o nua cuoi hoc ky. Giao vien nen giao them 10 cau bai tap Tu luan ve Cau hinh electron phan lop d.",
    },
    {
      id: "HS10A1-03",
      name: "Le Thu Cuc",
      className: "10A1 - Chuyen Hoa",
      avgScore: 4.6,
      rank: "Can phu dao",
      trend: "-0.5 diem",
      history: [
        { exam: "15 Phut Lan 1 (Cau tao Nguyen tu)", score: 5.0 },
        { exam: "45 Phut Chuong 1 (Bang Tuan Hoan)", score: 4.8 },
        { exam: "15 Phut Lan 2 (Lien ket Hoa hoc)", score: 4.5 },
        { exam: "Thi Giua Ky 1 (Tong hop)", score: 4.0 },
      ],
      strengths: "Nhan biet duoc ky hieu cac nguyen to hoa hoc co ban.",
      weaknesses: "Hong kien thuc tinh so mol, chua can bang duoc phuong trinh oxi hoa - khu.",
      aiFeedback:
        "Canh bao hoc vu: Diem cua Thu Cuc dang giam dan. Can xep lich phu dao rieng 2 buoi/tuan ve cong thuc tinh so mol va thang bang electron.",
    },
  ]);

  // State luu hoc sinh dang duoc giao vien chon de xem chi tiet
  const [selectedStudentId, setSelectedStudentId] = useState("HS10A1-01");
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

  const currentStudent =
    students.find((s) => s.id === selectedStudentId) || students[0];

  // Ham goi AI tao nhan xet ca nhan hoa moi cho hoc sinh dang chon
  const handleGenerateAIFeedback = () => {
    setIsGeneratingFeedback(true);
    setTimeout(() => {
      setStudents((prev) =>
        prev.map((st) =>
          st.id === currentStudent.id
            ? {
                ...st,
                aiFeedback: `[AI Phan tich Chuyen sau - ${new Date().toLocaleTimeString(
                  "vi-VN"
                )}]: Hoc sinh ${st.name} dat diem TB ${
                  st.avgScore
                } (${st.rank}). Diem manh: ${st.strengths} De xuat lo trinh: Giao bo 15 cau trac nghiem chuyen de "${
                  st.weaknesses
                }" trong 7 ngay toi.`,
              }
            : st
        )
      );
      setIsGeneratingFeedback(false);
    }, 500);
  };

  // Ham xuat bao cao phan tich hoc sinh ra file CSV
  const handleExportAnalyticsCSV = () => {
    const headers = "Ma HS,Ho va Ten,Lop,Diem TB,Xep Loai,Xu Huong,Nhan xet AI\n";
    const rows = students
      .map(
        (s) =>
          `${s.id},"${s.name}","${s.className}",${s.avgScore},"${s.rank}","${s.trend}","${s.aiFeedback}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Bao_Cao_Tien_Bo_Hoc_Sinh_Hoa_THPT.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Thong ke Ket qua & Phan tich Tien bo Hoc sinh
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo doi bieu do diem so qua tung dot kiem tra Hoa hoc va su dung AI de sinh nhan xet ca nhan hoa
          </p>
        </div>
        <button
          onClick={handleExportAnalyticsCSV}
          className="px-5 py-2.5 rounded-lg bg-slate-800 text-white font-bold text-xs hover:bg-slate-900"
        >
          [Xuat Bao cao Phan tich CSV]
        </button>
      </div>

      {/* Bo cuc 2 Cot: Danh sach Hoc sinh ben trai + Ho so Phan tich Chi tiet ben phai */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COT TRAI: DANH SACH HOC SINH */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-800 border-b pb-3">
            Danh sach Hoc sinh ({students.length})
          </h2>
          <div className="space-y-3">
            {students.map((st) => {
              const isSelected = st.id === currentStudent.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStudentId(st.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-blue-50 border-blue-600 shadow-sm"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">
                      {st.name}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        st.avgScore >= 8
                          ? "bg-emerald-100 text-emerald-800"
                          : st.avgScore >= 5
                          ? "bg-blue-100 text-blue-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      TB: {st.avgScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-1.5">
                    <span>Ma HS: {st.id}</span>
                    <span className="font-semibold">{st.rank}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* COT PHAI: BIEU DO TIEN BO & AI NHAN XET CA NHAN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Thong tin Tong quan cua Hoc sinh dang chon */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-blue-100 text-blue-800">
                  {currentStudent.className}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  Ho so Nang luc Hoa hoc: {currentStudent.name} ({currentStudent.id})
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-bold uppercase">
                    Diem Trung Binh
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {currentStudent.avgScore} / 10
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-bold uppercase">
                    Xu huong
                  </div>
                  <div className="text-sm font-bold text-emerald-600">
                    {currentStudent.trend}
                  </div>
                </div>
              </div>
            </div>

            {/* Bieu do Cot Truc quan Tien bo qua 4 Bai Kiem tra */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase">
                1. Bieu do Dien bien Diem so qua 4 Bai Kiem tra Hoa hoc
              </h3>
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                {currentStudent.history.map((h, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{h.exam}</span>
                      <span className="font-bold text-blue-700">{h.score} diem</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          h.score >= 8
                            ? "bg-emerald-600"
                            : h.score >= 5
                            ? "bg-blue-600"
                            : "bg-rose-600"
                        }`}
                        style={{ width: `${h.score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diem manh & Lo hong kien thuc */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-800 uppercase mb-1">
                  Chuyen de Hoa hoc Nam vung
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {currentStudent.strengths}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-xs font-bold text-amber-800 uppercase mb-1">
                  Lo hong Kien thuc Can Bo sung
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  {currentStudent.weaknesses}
                </p>
              </div>
            </div>

            {/* Khu vuc AI Nhan xet Ca nhan hoa */}
            <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-indigo-900 uppercase">
                  2. Nhan xet & Lo trinh On tap Ca nhan hoa tu Tro ly AI
                </h3>
                <button
                  onClick={handleGenerateAIFeedback}
                  disabled={isGeneratingFeedback}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isGeneratingFeedback
                    ? "AI dang tong hop..."
                    : "[AI Tao Nhan xet Ca nhan]"}
                </button>
              </div>
              <p className="text-sm text-indigo-950 leading-relaxed bg-white p-3.5 rounded-lg border border-indigo-100">
                {currentStudent.aiFeedback}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;