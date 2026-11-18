// File: frontend/src/pages/manager/ContentApproval.jsx
// Chuc nang: Trung tam Phe duyet Noi dung cua Manager (2 Tab: Giao an Mau 5512 & Ngan hang Cau hoi Hoa hoc tu Staff)
// Nang cap tu ContentApproval.jsx cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";

const ContentApproval = () => {
  // State chuyen doi giua 2 Tab: 'templates' (Giao an Mau 5512) va 'questions' (Cau hoi Hoa hoc)
  const [activeTab, setActiveTab] = useState("templates");
  // State mo Modal xem chi tiet Giao an Mau truoc khi duyet
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Danh sach Giao an Mau 5512 do Staff gui len cho Manager phe duyet
  const [templates, setTemplates] = useState([
    {
      id: "TPL-WAIT-01",
      title: "[MAU 5512] Bai 7: Toc do Phan ung va Chat xuc tac",
      grade: "Khoi 10",
      author: "staff@planbookai.vn (To Chuyen vien Hoa)",
      submittedAt: "18/11/2026",
      status: "Cho duyet",
      objectives:
        "Trinh bay duoc khai niem toc do phan ung hoa hoc va 5 yeu to anh huong (nong do, ap suat, nhiet do, dien tich be mat, chat xuc tac).",
      activitiesSummary:
        "Hoat dong 1: So sanh toc do chay cua than trong khong khi va trong binh O2 nguyen chat. Hoat dong 2: Thi nghiem H2O2 phan huy khi co MnO2. Hoat dong 3: Giai 5 cau trac nghiem tinh toc do trung binh. Hoat dong 4: Ung dung bao quan thuc pham trong tu lanh.",
    },
    {
      id: "TPL-WAIT-02",
      title: "[MAU 5512] Bai 12: Carbohydrate - Glucose va Fructose",
      grade: "Khoi 12",
      author: "staff@planbookai.vn (To Chuyen vien Hoa)",
      submittedAt: "18/11/2026",
      status: "Cho duyet",
      objectives:
        "Viet duoc cong thuc cau tao mach ho, mach vong va phuong trinh phan ung trang guong cua Glucose, Fructose.",
      activitiesSummary:
        "Hoat dong 1: Tim hieu nong do glucose trong mau nguoi. Hoat dong 2: Thi nghiem Glucose tac dung voi Cu(OH)2 va AgNO3/NH3. Hoat dong 3: Bai tap tinh luong Ag ket tua. Hoat dong 4: Quy trinh trang ruot phich va guong soi.",
    },
  ]);

  // Danh sach Cau hoi Hoa hoc do Staff gui len cho Manager phe duyet
  const [questions, setQuestions] = useState([
    {
      id: "Q-STAFF-01",
      grade: "Khoi 12",
      level: "Thong hieu",
      author: "staff@planbookai.vn",
      submittedAt: "18/11/2026",
      status: "Cho duyet",
      content: "Thuoc thu dung de phan biet dung dich Glucose va dung dich Glycerol la:",
      options: [
        "Cu(OH)2 o nhiet do thuong",
        "Dung dich AgNO3 trong NH3, dun nong",
        "Kim loai Na",
        "Nuoc Bromine",
      ],
      correct: "B",
    },
    {
      id: "Q-STAFF-02",
      grade: "Khoi 11",
      level: "Van dung",
      author: "staff@planbookai.vn",
      submittedAt: "18/11/2026",
      status: "Cho duyet",
      content: "Dung dich HCl 0,01M co gia tri pH bang bao nhieu (gia su HCl dien li hoan toan)?",
      options: ["pH = 1", "pH = 2", "pH = 12", "pH = 3"],
      correct: "B",
    },
  ]);

  // Ham Phe duyet hoac Tu choi Giao an Mau
  const handleDecisionTemplate = (id, newStatus) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    setPreviewTemplate(null);
  };

  // Ham Phe duyet hoac Tu choi Cau hoi
  const handleDecisionQuestion = (id, newStatus) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          Phe duyet Hoc lieu & Ngan hang Cau hoi (Content Approval)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Kiem duyet chat luong Giao an Mau 5512 va Cau hoi Hoa hoc do doi ngu Staff bien soan truoc khi phat hanh cho Giao vien
        </p>
      </div>

      {/* Thanh Chuyen doi 2 Tab */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "templates"
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          1. Giao an Mau 5512 ({templates.length})
        </button>
        <button
          onClick={() => setActiveTab("questions")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "questions"
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          2. Ngan hang Cau hoi Staff ({questions.length})
        </button>
      </div>

      {/* TAB 1: DANH SACH GIAO AN MAU 5512 CHO DUYET */}
      {activeTab === "templates" && (
        <div className="space-y-4">
          {templates.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                    Hoa hoc {t.grade}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      t.status === "Da duyet"
                        ? "bg-emerald-100 text-emerald-800"
                        : t.status === "Tu choi"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{t.title}</h3>
                <p className="text-xs text-slate-600">
                  <strong>Muc tieu:</strong> {t.objectives}
                </p>
                <p className="text-xs text-slate-400">
                  Nguoi gui: {t.author} • Ngay gui: {t.submittedAt}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setPreviewTemplate(t)}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  [Xem chi tiet]
                </button>
                <button
                  onClick={() => handleDecisionTemplate(t.id, "Tu choi")}
                  className="px-3.5 py-2 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100"
                >
                  [Tu choi]
                </button>
                <button
                  onClick={() => handleDecisionTemplate(t.id, "Da duyet")}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                >
                  [Duyet phat hanh]
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: DANH SACH CAU HOI HOA HOC CHO DUYET */}
      {activeTab === "questions" && (
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                    Hoa hoc {q.grade}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold">
                    Muc do: {q.level}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      q.status === "Da duyet"
                        ? "bg-emerald-100 text-emerald-800"
                        : q.status === "Tu choi"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {q.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecisionQuestion(q.id, "Tu choi")}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100"
                  >
                    [Tu choi]
                  </button>
                  <button
                    onClick={() => handleDecisionQuestion(q.id, "Da duyet")}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                  >
                    [Duyet cau hoi]
                  </button>
                </div>
              </div>

              <p className="text-sm font-bold text-slate-800">{q.content}</p>

              {/* Hien thi 4 Phuong an A, B, C, D va to xanh dap an dung */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {["A", "B", "C", "D"].map((char, idx) => {
                  const isCorrect = q.correct === char;
                  return (
                    <div
                      key={char}
                      className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                        isCorrect
                          ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <span>{char}.</span>
                      <span>{q.options[idx]}</span>
                      {isCorrect && (
                        <span className="ml-auto text-[11px] uppercase text-emerald-700">
                          [Dap an dung]
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL XEM CHI TIET GIAO AN MAU 5512 TRUOC KHI DUYET */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Xem truoc Giao an Mau: {previewTemplate.title}
              </h3>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-3 py-1 rounded bg-slate-100 text-xs font-bold"
              >
                [Dong]
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3.5 rounded-lg bg-slate-50 border">
                <strong>I. Muc tieu Bai hoc:</strong>
                <p className="mt-1">{previewTemplate.objectives}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border">
                <strong>II. Tom tat Tien trinh 4 Hoat dong (Cong van 5512):</strong>
                <p className="mt-1">{previewTemplate.activitiesSummary}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => handleDecisionTemplate(previewTemplate.id, "Tu choi")}
                className="px-4 py-2 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold"
              >
                Tu choi
              </button>
              <button
                onClick={() => handleDecisionTemplate(previewTemplate.id, "Da duyet")}
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
              >
                Phe duyet & Phat hanh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentApproval;