// File: frontend/src/pages/staff/SampleLessonPlans.jsx
// Chuc nang: Phan he Staff Bien soan Giao an Mau Chuan Cong van 5512 & Gui Manager Phe duyet
// Nang cap tu SampleEditor/LessonPlanner cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";

const SampleLessonPlans = () => {
  // Danh sach Giao an Mau do Staff bien soan
  const [samples, setSamples] = useState([
    {
      id: "SMP-5512-01",
      title: "[MAU 5512] Bai: Phan ung Oxi hoa - Khu va Ung dung",
      grade: "Khoi 10",
      status: "Da duyet",
      objectives:
        "Xac dinh duoc so oxi hoa va can bang phuong trinh theo phuong phap thang bang electron.",
      activities:
        "4 Hoat dong: Khoi dong (Dinh sat bi gi) -> Hinh thanh kien thuc (4 buoc thang bang e) -> Luyen tap -> Van dung.",
    },
    {
      id: "SMP-5512-02",
      title: "[MAU 5512] Bai 7: Toc do Phan ung va Chat xuc tac",
      grade: "Khoi 10",
      status: "Cho duyet",
      objectives:
        "Trinh bay duoc khai niem toc do phan ung va 5 yeu to anh huong den toc do phan ung hoa hoc.",
      activities:
        "4 Hoat dong: Khoi dong -> Thi nghiem H2O2 + MnO2 -> Luyen tap 5 cau trac nghiem -> Van dung bao quan thuc pham.",
    },
  ]);

  // State form tao Giao an Mau moi
  const [form, setForm] = useState({
    title: "",
    grade: "Khoi 10",
    objectives: "",
    activities: "",
  });

  // Ham luu hoac gui Manager phe duyet
  const handleCreateSample = (submitStatus) => {
    if (!form.title.trim()) {
      alert("Vui long nhap Ten Giao an Mau 5512!");
      return;
    }
    const created = {
      ...form,
      id: `SMP-5512-0${samples.length + 1}`,
      status: submitStatus,
    };
    setSamples((prev) => [created, ...prev]);
    setForm({ title: "", grade: "Khoi 10", objectives: "", activities: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          Bien soan Kho Giao an Mau Hoa hoc (Chuan Cong van 5512)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Xay dung cac Mau Ke hoach bai day Hoa hoc THPT chuan de Manager phe duyet va cung cap cho Giao vien
        </p>
      </div>

      {/* Form Tao Giao an Mau 5512 */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 border-b pb-2">
          1. Thiet ke Giao an Mau Chuan 5512 Moi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Ten Bai day Mau *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="VD: [MAU 5512] Bai 12: Carbohydrate - Glucose va Fructose"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Khoi lop THPT
            </label>
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-bold"
            >
              <option value="Khoi 10">Khoi 10</option>
              <option value="Khoi 11">Khoi 11</option>
              <option value="Khoi 12">Khoi 12</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            I. Muc tieu Yeu cau can dat (Kien thuc, Nang luc Hoa hoc, Pham chat)
          </label>
          <textarea
            rows="2"
            value={form.objectives}
            onChange={(e) => setForm({ ...form, objectives: e.target.value })}
            placeholder="Nhap muc tieu chuan Kien thuc, Nang luc, Pham chat..."
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            II. Tien trinh 4 Hoat dong (Khoi dong, Hinh thanh kien thuc, Luyen tap, Van dung)
          </label>
          <textarea
            rows="3"
            value={form.activities}
            onChange={(e) => setForm({ ...form, activities: e.target.value })}
            placeholder="Nhap tom tat tien trinh 4 hoat dong su pham..."
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => handleCreateSample("Ban nhap")}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold"
          >
            Luu Ban nhap
          </button>
          <button
            onClick={() => handleCreateSample("Cho duyet")}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
          >
            [Gui Manager Phe duyet]
          </button>
        </div>
      </div>

      {/* Danh sach Giao an Mau */}
      <div className="space-y-4">
        {samples.map((s) => (
          <div
            key={s.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                {s.id} • Hoa hoc {s.grade}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  s.status === "Da duyet"
                    ? "bg-emerald-100 text-emerald-800"
                    : s.status === "Cho duyet"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {s.status}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800">{s.title}</h3>
            <p className="text-xs text-slate-600">
              <strong>Muc tieu:</strong> {s.objectives}
            </p>
            <p className="text-xs text-slate-500">
              <strong>Tien trinh 5512:</strong> {s.activities}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleLessonPlans;