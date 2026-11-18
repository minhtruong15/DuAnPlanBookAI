// File: frontend/src/pages/teacher/ExamGenerator.jsx
// Chuc nang: Trinh Thiet ke De thi Hoa hoc Wizard 4 Buoc, Ma tran Nhan thuc, Tron 4 Ma de & Cap phat Ma QR/Link
// Nang cap tu ExamCreator.jsx cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";

const ExamGenerator = () => {
  // State quan ly che do hien thi: 'list' (Danh sach de thi) hoac 'wizard' (Wizard 4 buoc)
  const [viewMode, setViewMode] = useState("list");
  // State chuyen doi che do hien thi Grid (Luoi) hoac List (Bang)
  const [layoutType, setLayoutType] = useState("grid");
  // State loc theo Khoi lop (All, Khoi 10, Khoi 11, Khoi 12) va Tu khoa
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // State buoc hien tai trong Wizard 4 buoc (1 -> 4)
  const [wizardStep, setWizardStep] = useState(1);
  // State che do soan cau hoi o Buoc 2: 'ai' (AI sinh tu dong theo ma tran) hoac 'manual' (Thu cong)
  const [creationMode, setCreationMode] = useState("ai");

  // Danh sach De thi Hoa hoc hien co
  const [exams, setExams] = useState([
    {
      id: "EX-CHEM-101",
      title: "De Kiem tra Giua Ky 1 - Hoa hoc 10 (Cau tao Nguyen tu & Bang Tuan Hoan)",
      grade: "Khoi 10",
      duration: 45,
      questionCount: 15,
      examCodes: ["101", "102", "103", "104"],
      password: "HOA10",
      status: "Da xuat ban",
      attempts: 42,
      avgScore: 7.8,
      createdAt: "15/11/2026",
    },
    {
      id: "EX-CHEM-102",
      title: "De Kiem tra 15 Phut - Hoa hoc 12 (Chuong Ester - Lipid)",
      grade: "Khoi 12",
      duration: 15,
      questionCount: 10,
      examCodes: ["101", "202", "303", "404"],
      password: "",
      status: "Da xuat ban",
      attempts: 38,
      avgScore: 8.2,
      createdAt: "17/11/2026",
    },
  ]);

  // State luu cau hinh De thi dang tao trong Wizard 4 buoc
  const [examConfig, setExamConfig] = useState({
    title: "",
    grade: "Khoi 10",
    duration: 45,
    linkedLesson: "Bai 1: Cau tao nguyen tu va Hat nhan",
    matrix: {
      nhanBiet: 4,
      thongHieu: 3,
      vanDung: 2,
      vanDungCao: 1,
    },
    shuffleMode: "101-104", // '101-104' hoac '101-404'
    shuffleQuestions: true,
    shuffleOptions: true,
    password: "",
    questions: [
      {
        id: 1,
        level: "Nhan biet",
        content: "Hat nhan cua hau het cac nguyen tu duoc cau tao boi cac loai hat nao sau day?",
        options: [
          "Electron va proton",
          "Proton va neutron",
          "Neutron va electron",
          "Chi co proton",
        ],
        correct: "B",
      },
      {
        id: 2,
        level: "Thong hieu",
        content: "Nguyen tu Sodium (Na) co Z = 11 va so khoi A = 23. So hat neutron trong nguyen tu Na la:",
        options: ["11", "12", "23", "34"],
        correct: "B",
      },
      {
        id: 3,
        level: "Van dung",
        content: "Cho 5,6 gam sat (Fe) tac dung hoan toan voi dung dich HCl du. The tich khi H2 (dktc) thu duoc la:",
        options: ["2,24 lit", "2,479 lit", "4,48 lit", "1,12 lit"],
        correct: "B",
      },
    ],
  });

  // Tinh tong so cau hoi trong Ma tran nhan thuc
  const totalMatrixQuestions =
    Number(examConfig.matrix.nhanBiet) +
    Number(examConfig.matrix.thongHieu) +
    Number(examConfig.matrix.vanDung) +
    Number(examConfig.matrix.vanDungCao);

  // Ham AI Tu dong sinh bo cau hoi Hoa hoc theo Ma tran nhan thuc o Buoc 2
  const handleAIGenerateQuestionsByMatrix = () => {
    const samplePool = [
      {
        level: "Nhan biet",
        content: "Trong nguyen tu, hat mang dien tich am la:",
        options: ["Proton", "Neutron", "Electron", "Hat nhan"],
        correct: "C",
      },
      {
        level: "Nhan biet",
        content: "Cong thuc phan tu cua Ethyl acetate la:",
        options: ["C2H4O2", "C4H8O2", "C3H6O2", "C4H6O2"],
        correct: "B",
      },
      {
        level: "Thong hieu",
        content: "Thuy phan ester CH3COOC2H5 trong dung dich NaOH thu duoc muoi va alcohol nao?",
        options: [
          "CH3COONa va C2H5OH",
          "HCOONa va C2H5OH",
          "CH3COONa va CH3OH",
          "C2H5COONa va CH3OH",
        ],
        correct: "A",
      },
      {
        level: "Van dung",
        content: "Dot chay hoan toan 0,1 mol mot ester no, don chuc, mach ho thu duoc 0,3 mol CO2. Cong thuc ester la:",
        options: ["HCOOCH3", "CH3COOCH3", "CH3COOC2H5", "C2H5COOC2H5"],
        correct: "B",
      },
      {
        level: "Van dung cao",
        content: "Xa phong hoa hoan toan 17,6 gam ethyl acetate bang 300 ml dung dich NaOH 1M. Khoi luong chat ran khan sau khi co can la:",
        options: ["16,4 gam", "20,4 gam", "24,6 gam", "18,2 gam"],
        correct: "B",
      },
    ];

    const generated = [];
    for (let i = 0; i < totalMatrixQuestions; i++) {
      const template = samplePool[i % samplePool.length];
      generated.push({
        id: i + 1,
        level: template.level,
        content: `[Cau ${i + 1} - ${examConfig.linkedLesson}] ${template.content}`,
        options: [...template.options],
        correct: template.correct,
      });
    }
    setExamConfig((prev) => ({ ...prev, questions: generated }));
  };

  // Ham them 1 cau hoi thu cong o Buoc 2
  const handleAddManualQuestion = () => {
    setExamConfig((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: prev.questions.length + 1,
          level: "Nhan biet",
          content: "Nhap noi dung cau hoi Hoa hoc moi...",
          options: ["Phuong an A", "Phuong an B", "Phuong an C", "Phuong an D"],
          correct: "A",
        },
      ],
    }));
  };

  // Ham hoan tat Wizard va xuat ban De thi
  const handlePublishExam = () => {
    if (!examConfig.title.trim()) {
      alert("Vui long nhap Ten ky thi / Kiem tra o Buoc 1!");
      return;
    }
    const newExam = {
      id: `EX-CHEM-${Math.floor(100 + Math.random() * 900)}`,
      title: examConfig.title,
      grade: examConfig.grade,
      duration: examConfig.duration,
      questionCount: examConfig.questions.length,
      examCodes:
        examConfig.shuffleMode === "101-104"
          ? ["101", "102", "103", "104"]
          : ["101", "202", "303", "404"],
      password: examConfig.password,
      status: "Da xuat ban",
      attempts: 0,
      avgScore: 0,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };
    setExams((prev) => [newExam, ...prev]);
    setViewMode("list");
    setWizardStep(1);
  };

  // Loc danh sach de thi
  const filteredExams = exams.filter((ex) => {
    const matchGrade = selectedGrade === "All" || ex.grade === selectedGrade;
    const matchSearch = ex.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchGrade && matchSearch;
  });

  // ============================================================================
  // GIAO DIEN 1: WIZARD 4 BUOC THIET KE & TRON DE THI HOA HOC
  // ============================================================================
  if (viewMode === "wizard") {
    return (
      <div className="space-y-6">
        {/* Header Wizard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <button
              onClick={() => setViewMode("list")}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 mb-1"
            >
              [Quay lai Danh sach De thi]
            </button>
            <h1 className="text-2xl font-bold text-slate-800">
              Trinh Thiet ke De thi & Ma tran Nhan thuc (Wizard 4 Buoc)
            </h1>
          </div>
          <button
            onClick={handlePublishExam}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700"
          >
            Xuat ban De thi & Cap Ma QR
          </button>
        </div>

        {/* Thanh Stepper 4 Buoc */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200">
          {[
            { num: 1, title: "Buoc 1: Thong tin & Ma tran" },
            { num: 2, title: "Buoc 2: Soan / Sinh Cau hoi" },
            { num: 3, title: "Buoc 3: Tron Ma de & Bao mat" },
            { num: 4, title: "Buoc 4: Xuat ban & In De thi" },
          ].map((st) => (
            <button
              key={st.num}
              onClick={() => setWizardStep(st.num)}
              className={`p-3 rounded-lg text-left border ${
                wizardStep === st.num
                  ? "bg-blue-50 border-blue-600 text-blue-700 font-bold"
                  : wizardStep > st.num
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}
            >
              <div className="text-xs uppercase mb-1">
                {wizardStep > st.num ? "[Hoan thanh]" : `[Buoc ${st.num}]`}
              </div>
              <div className="text-sm">{st.title}</div>
            </button>
          ))}
        </div>

        {/* BUOC 1: THONG TIN KY THI & MA TRAN NHAN THUC */}
        {wizardStep === 1 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-3">
              1. Thiet lap Thong tin & Ma tran Nhan thuc Hoa hoc
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Ten De Kiem tra / Ky thi *
                </label>
                <input
                  type="text"
                  value={examConfig.title}
                  onChange={(e) => setExamConfig({ ...examConfig, title: e.target.value })}
                  placeholder="VD: Kiem tra 45 phut Chuong 1 - Hoa 10"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Khoi lop
                </label>
                <select
                  value={examConfig.grade}
                  onChange={(e) => setExamConfig({ ...examConfig, grade: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm"
                >
                  <option value="Khoi 10">Khoi 10</option>
                  <option value="Khoi 11">Khoi 11</option>
                  <option value="Khoi 12">Khoi 12</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Thoi gian lam bai (Phut)
                </label>
                <input
                  type="number"
                  value={examConfig.duration}
                  onChange={(e) =>
                    setExamConfig({ ...examConfig, duration: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>
            </div>

            {/* Lien ket voi Giao an da tao */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Lien ket voi Ke hoach Bai day (Giao an AI da soan)
              </label>
              <select
                value={examConfig.linkedLesson}
                onChange={(e) =>
                  setExamConfig({ ...examConfig, linkedLesson: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm"
              >
                <option value="Bai 1: Cau tao nguyen tu va Hat nhan">
                  Bai 1: Cau tao nguyen tu va Hat nhan (Khoi 10)
                </option>
                <option value="Bai 5: Ester - Lipid va Ung dung">
                  Bai 5: Ester - Lipid va Ung dung (Khoi 12)
                </option>
                <option value="Bai: Can bang Hoa hoc va Nguyen ly Le Chatelier">
                  Bai: Can bang Hoa hoc va Nguyen ly Le Chatelier (Khoi 11)
                </option>
              </select>
            </div>

            {/* Ma tran 4 Muc do Nhan thuc */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 uppercase">
                  Cau hinh Ma tran Nhan thuc (4 Muc do)
                </h3>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  Tong so cau theo Ma tran: {totalMatrixQuestions} cau
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: "nhanBiet", label: "Nhan biet (40%)" },
                  { key: "thongHieu", label: "Thong hieu (30%)" },
                  { key: "vanDung", label: "Van dung (20%)" },
                  { key: "vanDungCao", label: "Van dung cao (10%)" },
                ].map((lv) => (
                  <div key={lv.key} className="bg-white p-3 rounded-lg border border-slate-200">
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      {lv.label}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={examConfig.matrix[lv.key]}
                      onChange={(e) =>
                        setExamConfig({
                          ...examConfig,
                          matrix: {
                            ...examConfig.matrix,
                            [lv.key]: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded border border-slate-300 text-sm font-bold"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BUOC 2: CHE DO AI TRO LY SINH CAU HOI HOAC SOAN THU CONG */}
        {wizardStep === 2 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCreationMode("ai")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${
                    creationMode === "ai"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Che do 1: AI Tro ly Sinh theo Ma tran
                </button>
                <button
                  onClick={() => setCreationMode("manual")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${
                    creationMode === "manual"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Che do 2: Them / Chinh sua Thu cong
                </button>
              </div>

              {creationMode === "ai" ? (
                <button
                  onClick={handleAIGenerateQuestionsByMatrix}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700"
                >
                  [AI Sinh tu dong {totalMatrixQuestions} Cau hoi theo Ma tran]
                </button>
              ) : (
                <button
                  onClick={handleAddManualQuestion}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                >
                  + Them 1 Cau hoi Thu cong
                </button>
              )}
            </div>

            {/* Danh sach cau hoi trong de thi */}
            <div className="space-y-4">
              {examConfig.questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-800">
                      Cau {idx + 1} - Muc do: {q.level}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      Dap an dung: {q.correct}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={q.content}
                    onChange={(e) => {
                      const updated = [...examConfig.questions];
                      updated[idx].content = e.target.value;
                      setExamConfig({ ...examConfig, questions: updated });
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["A", "B", "C", "D"].map((letter, optIdx) => (
                      <div key={letter} className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const updated = [...examConfig.questions];
                            updated[idx].correct = letter;
                            setExamConfig({ ...examConfig, questions: updated });
                          }}
                          className={`px-2.5 py-1.5 rounded text-xs font-bold ${
                            q.correct === letter
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {letter}
                        </button>
                        <input
                          type="text"
                          value={q.options[optIdx]}
                          onChange={(e) => {
                            const updated = [...examConfig.questions];
                            updated[idx].options[optIdx] = e.target.value;
                            setExamConfig({ ...examConfig, questions: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded border border-slate-300 bg-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUOC 3: TRON 4 MA DE & THIET LAP MAT KHAU BAO VE */}
        {wizardStep === 3 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-3">
              3. Cau hinh Tron 4 Ma de & Bao mat Ky thi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-800">
                  Quy tac Sinh 4 Ma de Tu dong
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="shuffleMode"
                      checked={examConfig.shuffleMode === "101-104"}
                      onChange={() =>
                        setExamConfig({ ...examConfig, shuffleMode: "101-104" })
                      }
                    />
                    <span>Bo ma de lien tiep: <strong>101, 102, 103, 104</strong></span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="shuffleMode"
                      checked={examConfig.shuffleMode === "101-404"}
                      onChange={() =>
                        setExamConfig({ ...examConfig, shuffleMode: "101-404" })
                      }
                    />
                    <span>Bo ma de phan biet: <strong>101, 202, 303, 404</strong></span>
                  </label>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={examConfig.shuffleQuestions}
                      onChange={(e) =>
                        setExamConfig({
                          ...examConfig,
                          shuffleQuestions: e.target.checked,
                        })
                      }
                    />
                    <span>Dao thu tu cac cau hoi giua cac ma de</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={examConfig.shuffleOptions}
                      onChange={(e) =>
                        setExamConfig({
                          ...examConfig,
                          shuffleOptions: e.target.checked,
                        })
                      }
                    />
                    <span>Dao thu tu dap an A, B, C, D trong tung cau</span>
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-800">
                  Mat khau Bao ve De thi (Tuy chon)
                </h3>
                <p className="text-xs text-slate-500">
                  Dat mat khau de kiem soat thoi diem hoc sinh duoc phep mo de thi hoac tai phieu tra loi.
                </p>
                <input
                  type="text"
                  value={examConfig.password}
                  onChange={(e) =>
                    setExamConfig({ ...examConfig, password: e.target.value })
                  }
                  placeholder="De trong neu khong dat mat khau (VD: HOA10A1)"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* BUOC 4: XEM TRUOC, CAP PHAT LINK / MA QR & IN PHIEU TRA LOI OCR */}
        {wizardStep === 4 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
              <div>
                <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                  San sang Xuat ban
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {examConfig.title || "De Kiem tra Hoa hoc THPT"}
                </h2>
                <p className="text-xs text-slate-500">
                  {examConfig.grade} | Thoi gian: {examConfig.duration} phut | Tong so:{" "}
                  {examConfig.questions.length} cau hoi | 4 Ma de:{" "}
                  {examConfig.shuffleMode === "101-104"
                    ? "101, 102, 103, 104"
                    : "101, 202, 303, 404"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white text-xs font-bold hover:bg-slate-900"
                >
                  [In 4 Ma de + Phieu To Dap an OCR]
                </button>
              </div>
            </div>

            {/* Khu vuc Ma Chia se & Link Truc tuyen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-sm font-bold text-blue-900">
                  Cong Cap phat De thi & Dong bo May cham OCR
                </h3>
                <p className="text-xs text-blue-700">
                  Ma De thi nay da duoc dong bo sang phan he Cham thi OCR (OcrGrading). Giao vien co the in Phieu tra loi trac nghiem theo 4 ma de de phat cho hoc sinh.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={`https://planbookai.edu.vn/exam/${examConfig.grade.replace(" ", "")}-${examConfig.shuffleMode}`}
                    className="w-full px-3 py-1.5 rounded border border-blue-300 bg-white text-xs font-mono"
                  />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 border-2 border-dashed border-slate-400 rounded flex items-center justify-center text-xs font-mono font-bold text-slate-600">
                  [MA QR DE THI]
                </div>
                <span className="text-xs font-bold text-slate-600 mt-2">
                  Mat khau: {examConfig.password || "Khong co"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Thanh dieu huong Buoc Truoc / Tiep theo */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
          <button
            disabled={wizardStep === 1}
            onClick={() => setWizardStep((p) => p - 1)}
            className="px-5 py-2 rounded-lg border border-slate-300 text-sm font-semibold disabled:opacity-40"
          >
            Buoc truoc
          </button>
          <span className="text-xs font-bold text-slate-500">
            Buoc {wizardStep} / 4
          </span>
          {wizardStep < 4 ? (
            <button
              onClick={() => setWizardStep((p) => p + 1)}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
            >
              Buoc tiep theo
            </button>
          ) : (
            <button
              onClick={handlePublishExam}
              className="px-6 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold"
            >
              Hoan tat & Luu De thi
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============================================================================
  // GIAO DIEN 2: DANH SACH DE THI + 4 THE KPI + GRID/LIST TOGGLE
  // ============================================================================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Thiet ke & Tron De thi Hoa hoc THPT
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tao de thi tu Ma tran nhan thuc, tron 4 ma de tu dong va dong bo dap an sang he thong cham OCR
          </p>
        </div>
        <button
          onClick={() => setViewMode("wizard")}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700"
        >
          + Thiet ke De thi Moi (Wizard 4 Buoc)
        </button>
      </div>

      {/* 4 The KPI Thong ke */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tong De thi Hoa hoc", value: `${exams.length} Bo de`, sub: "4 Ma de / Bo" },
          { label: "Kho Cau hoi Kha dung", value: "240 Cau", sub: "Chuan Chuong trinh 2018" },
          { label: "Tong Luot Cham bai", value: "80 Bai", sub: "Dong bo tu OCR" },
          { label: "Diem Trung binh Khoi", value: "8.0 / 10", sub: "Ty le Dat: 92%" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase">{kpi.label}</div>
            <div className="text-2xl font-bold text-slate-800 mt-1">{kpi.value}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Thanh Cong cu Tim kiem, Loc Khoi lop va Chuyen doi Grid/List */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Khoi 10", "Khoi 11", "Khoi 12"].map((gr) => (
            <button
              key={gr}
              onClick={() => setSelectedGrade(gr)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold ${
                selectedGrade === gr
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {gr === "All" ? "Tat ca Khoi" : gr}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Tim kiem de thi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm w-56"
          />
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setLayoutType("grid")}
              className={`px-3 py-1 rounded text-xs font-bold ${
                layoutType === "grid" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"
              }`}
            >
              Luoi
            </button>
            <button
              onClick={() => setLayoutType("list")}
              className={`px-3 py-1 rounded text-xs font-bold ${
                layoutType === "list" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"
              }`}
            >
              Bang
            </button>
          </div>
        </div>
      </div>

      {/* Danh sach De thi */}
      <div
        className={
          layoutType === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-5"
            : "flex flex-col gap-3"
        }
      >
        {filteredExams.map((ex) => (
          <div
            key={ex.id}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                  {ex.grade} • {ex.duration} Phut • {ex.questionCount} Cau
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  {ex.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{ex.title}</h3>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-500">Bo Ma de da tron:</span>
                {ex.examCodes.map((code) => (
                  <span
                    key={code}
                    className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-700"
                  >
                    Ma {code}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Da cham: <strong>{ex.attempts} bai</strong> | Diem TB:{" "}
                <strong>{ex.avgScore}</strong>
              </span>
              <button
                onClick={() => setViewMode("wizard")}
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100"
              >
                Mo Wizard / In De
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamGenerator;