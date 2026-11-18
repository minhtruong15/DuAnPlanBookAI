// File: frontend/src/pages/staff/StaffQuestionBank.jsx
// Chuc nang: Phan he Staff Xay dung Ngan hang Cau hoi Hoa hoc Chuan & Gui Manager Phe duyet
// Nang cap tu QuestionBank cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";

const StaffQuestionBank = () => {
  // Danh sach cau hoi do Staff bien soan
  const [staffQuestions, setStaffQuestions] = useState([
    {
      id: "ST-Q101",
      grade: "Khoi 12",
      topic: "Carbohydrate",
      level: "Thong hieu",
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
      id: "ST-Q102",
      grade: "Khoi 10",
      topic: "Phan ung Oxi hoa - Khu",
      level: "Nhan biet",
      status: "Da duyet",
      content: "So oxi hoa cua nguyen tu Sulfur (S) trong phan tu H2SO4 la:",
      options: ["+2", "+4", "+6", "-2"],
      correct: "C",
    },
  ]);

  // State form bien soan cau hoi moi cua Staff
  const [form, setForm] = useState({
    grade: "Khoi 10",
    topic: "Cau tao nguyen tu",
    level: "Nhan biet",
    content: "",
    options: ["", "", "", ""],
    correct: "A",
  });

  // Ham luu va gui Manager phe duyet
  const handleAddAndSubmit = (submitStatus) => {
    if (!form.content.trim()) {
      alert("Vui long nhap noi dung cau hoi Hoa hoc!");
      return;
    }
    const newItem = {
      ...form,
      id: `ST-Q${Math.floor(103 + Math.random() * 800)}`,
      status: submitStatus,
    };
    setStaffQuestions((prev) => [newItem, ...prev]);
    setForm({
      grade: "Khoi 10",
      topic: "Cau tao nguyen tu",
      level: "Nhan biet",
      content: "",
      options: ["", "", "", ""],
      correct: "A",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          Bien soan Ngan hang Cau hoi Hoa hoc He thong (Staff Portal)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Xay dung kho cau hoi chuan Chuong trinh GDPT 2018 va gui len Manager phe duyet
        </p>
      </div>

      {/* Form Bien soan Cau hoi */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 border-b pb-2">
          1. Form Bien soan Cau hoi Trac nghiem Hoa hoc Moi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Khoi lop</label>
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
            >
              <option value="Khoi 10">Khoi 10</option>
              <option value="Khoi 11">Khoi 11</option>
              <option value="Khoi 12">Khoi 12</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Chuyen de Hoa hoc</label>
            <input
              type="text"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Muc do Nhan thuc</label>
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
            >
              <option value="Nhan biet">Nhan biet</option>
              <option value="Thong hieu">Thong hieu</option>
              <option value="Van dung">Van dung</option>
              <option value="Van dung cao">Van dung cao</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Dap an Dung</label>
            <select
              value={form.correct}
              onChange={(e) => setForm({ ...form, correct: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
            >
              <option value="A">Phuong an A</option>
              <option value="B">Phuong an B</option>
              <option value="C">Phuong an C</option>
              <option value="D">Phuong an D</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Noi dung De bai *</label>
          <textarea
            rows="2"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Nhap noi dung cau hoi Hoa hoc..."
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["A", "B", "C", "D"].map((char, idx) => (
            <div key={char} className="flex items-center gap-2">
              <span className="text-xs font-bold w-6">{char}.</span>
              <input
                type="text"
                value={form.options[idx]}
                onChange={(e) => {
                  const updated = [...form.options];
                  updated[idx] = e.target.value;
                  setForm({ ...form, options: updated });
                }}
                placeholder={`Nhap phuong an ${char}...`}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => handleAddAndSubmit("Ban nhap")}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold"
          >
            Luu Ban nhap
          </button>
          <button
            onClick={() => handleAddAndSubmit("Cho duyet")}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
          >
            [Gui Manager Phe duyet]
          </button>
        </div>
      </div>

      {/* Danh sach Cau hoi Staff da bien soan */}
      <div className="space-y-4">
        {staffQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-100 font-mono text-xs font-bold">
                  {q.id}
                </span>
                <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                  {q.grade} • {q.topic}
                </span>
                <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold">
                  {q.level}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  q.status === "Da duyet"
                    ? "bg-emerald-100 text-emerald-800"
                    : q.status === "Cho duyet"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {q.status}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-800">{q.content}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["A", "B", "C", "D"].map((char, idx) => (
                <div
                  key={char}
                  className={`p-2.5 rounded-lg border text-xs ${
                    q.correct === char
                      ? "bg-emerald-50 border-emerald-400 font-bold text-emerald-900"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  {char}. {q.options[idx]}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffQuestionBank;