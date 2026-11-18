// File: frontend/src/pages/teacher/QuestionBank.jsx
// Chuc nang: Ngan hang Cau hoi Hoa hoc THPT cua Giao vien + Thong ke 4 Muc do + Sua truc tiep (Inline Edit) & Copy nhanh
// Nang cap tu QuestionBank.jsx cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";

const QuestionBank = () => {
  // State bo loc theo Khoi lop, Muc do nhan thuc va Tu khoa
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // State luu ID cau hoi dang duoc Sua truc tiep (Inline Editing)
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  // State bat/tat form Them cau hoi moi
  const [showAddForm, setShowAddForm] = useState(false);

  // Danh sach cau hoi Hoa hoc THPT trong Ngan hang cua Giao vien
  const [questions, setQuestions] = useState([
    {
      id: "QB-101",
      grade: "Khoi 10",
      topic: "Cau tao nguyen tu",
      level: "Nhan biet",
      content: "Hat mang dien tich duong trong hat nhan nguyen tu la:",
      options: ["Electron", "Proton", "Neutron", "Phan tu"],
      correct: "B",
      explanation: "Proton mang dien tich +1, electron mang dien tich -1, neutron khong mang dien.",
    },
    {
      id: "QB-102",
      grade: "Khoi 10",
      topic: "Bang tuan hoan",
      level: "Thong hieu",
      content: "Nguyen to X co Z = 17 (Chlorine). Vi tri cua X trong Bang tuan hoan la:",
      options: [
        "Chu ky 3, nhom VIIA",
        "Chu ky 3, nhom VA",
        "Chu ky 2, nhom VIIA",
        "Chu ky 4, nhom IIA",
      ],
      correct: "A",
      explanation: "Cau hinh e cua Cl (Z=17): 1s2 2s2 2p6 3s2 3p5 -> 3 lop e (Chu ky 3), 7e lop ngoai cung (Nhom VIIA).",
    },
    {
      id: "QB-103",
      grade: "Khoi 11",
      topic: "Can bang hoa hoc",
      level: "Van dung",
      content: "Cho can bang: N2(g) + 3H2(g) <-> 2NH3(g) (Delta H < 0). Can bang chuyen dich theo chieu thuan khi:",
      options: [
        "Tang nhiet do va giam ap suat",
        "Hạ nhiet do va tang ap suat",
        "Tang nhiet do va tang ap suat",
        "Them chat xuc tac Fe",
      ],
      correct: "B",
      explanation: "Phan ung toa nhiet (Delta H < 0) va giam so mol khi, nen ha nhiet do va tang ap suat se chuyen dich theo chieu thuan.",
    },
    {
      id: "QB-104",
      grade: "Khoi 12",
      topic: "Ester - Lipid",
      level: "Van dung cao",
      content: "Thuy phan hoan toan 8,8 gam ethyl acetate trong 200 ml dung dich NaOH 1M, co can thu duoc bao nhieu gam chat ran khan?",
      options: ["8,2 gam", "12,2 gam", "10,4 gam", "16,4 gam"],
      correct: "B",
      explanation: "n(ester) = 0,1 mol; n(NaOH) = 0,2 mol -> NaOH du 0,1 mol. Chat ran gom CH3COONa (0,1 mol = 8,2g) + NaOH du (0,1 mol = 4,0g) = 12,2 gam.",
    },
  ]);

  // State form tao cau hoi moi
  const [newQ, setNewQ] = useState({
    grade: "Khoi 10",
    topic: "Lien ket hoa hoc",
    level: "Nhan biet",
    content: "",
    options: ["", "", "", ""],
    correct: "A",
    explanation: "",
  });

  // Ham bat dau Sua truc tiep (Inline Edit)
  const handleStartEdit = (q) => {
    setEditingId(q.id);
    setEditDraft({ ...q, options: [...q.options] });
  };

  // Ham luu cau hoi sau khi Sua truc tiep
  const handleSaveEdit = () => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === editingId ? editDraft : q))
    );
    setEditingId(null);
    setEditDraft(null);
  };

  // Ham sao chep nhanh noi dung cau hoi vao Clipboard
  const handleCopyQuestion = (q) => {
    const text = `${q.content}\nA. ${q.options[0]}\nB. ${q.options[1]}\nC. ${q.options[2]}\nD. ${q.options[3]}\nDap an: ${q.correct}`;
    navigator.clipboard.writeText(text);
    alert(`Da sao chep cau hoi [${q.id}] vao Clipboard!`);
  };

  // Ham them cau hoi moi vao Ngan hang
  const handleCreateQuestion = () => {
    if (!newQ.content.trim()) {
      alert("Vui long nhap noi dung cau hoi Hoa hoc!");
      return;
    }
    const created = {
      ...newQ,
      id: `QB-${Math.floor(105 + Math.random() * 800)}`,
    };
    setQuestions((prev) => [created, ...prev]);
    setNewQ({
      grade: "Khoi 10",
      topic: "Lien ket hoa hoc",
      level: "Nhan biet",
      content: "",
      options: ["", "", "", ""],
      correct: "A",
      explanation: "",
    });
    setShowAddForm(false);
  };

  // Loc danh sach cau hoi
  const filteredQuestions = questions.filter((q) => {
    const matchGrade = selectedGrade === "All" || q.grade === selectedGrade;
    const matchLevel = selectedLevel === "All" || q.level === selectedLevel;
    const matchSearch =
      q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchGrade && matchLevel && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Ngan hang Cau hoi Hoa hoc THPT (Question Bank)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quan ly kho cau hoi theo 4 muc do nhan thuc, ho tro chinh sua truc tiep (Inline Edit) va sao chep nhanh
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700"
        >
          {showAddForm ? "[Dong Form Them]" : "+ Them Cau hoi Hoa hoc Moi"}
        </button>
      </div>

      {/* 4 The Thong ke So luong theo Muc do Nhan thuc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tong Cau hoi", count: questions.length, color: "text-slate-800" },
          {
            label: "Muc Nhan biet",
            count: questions.filter((q) => q.level === "Nhan biet").length,
            color: "text-emerald-600",
          },
          {
            label: "Muc Thong hieu",
            count: questions.filter((q) => q.level === "Thong hieu").length,
            color: "text-blue-600",
          },
          {
            label: "Van dung & VDC",
            count: questions.filter((q) => q.level.includes("Van dung")).length,
            color: "text-indigo-600",
          },
        ].map((st, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase">{st.label}</div>
            <div className={`text-2xl font-bold mt-1 ${st.color}`}>{st.count} Cau</div>
          </div>
        ))}
      </div>

      {/* Form Them Cau hoi Moi */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border-2 border-blue-500 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-800 border-b pb-2">
            Them Cau hoi Trac nghiem Hoa hoc Moi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Khoi lop</label>
              <select
                value={newQ.grade}
                onChange={(e) => setNewQ({ ...newQ, grade: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
              >
                <option value="Khoi 10">Khoi 10</option>
                <option value="Khoi 11">Khoi 11</option>
                <option value="Khoi 12">Khoi 12</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Chuyen de</label>
              <input
                type="text"
                value={newQ.topic}
                onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Muc do Nhan thuc</label>
              <select
                value={newQ.level}
                onChange={(e) => setNewQ({ ...newQ, level: e.target.value })}
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
                value={newQ.correct}
                onChange={(e) => setNewQ({ ...newQ, correct: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
              >
                <option value="A">Dap an A</option>
                <option value="B">Dap an B</option>
                <option value="C">Dap an C</option>
                <option value="D">Dap an D</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Noi dung Cau hoi *</label>
            <textarea
              rows="2"
              value={newQ.content}
              onChange={(e) => setNewQ({ ...newQ, content: e.target.value })}
              placeholder="Nhap de bai cau hoi Hoa hoc..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["A", "B", "C", "D"].map((char, idx) => (
              <div key={char} className="flex items-center gap-2">
                <span className="text-xs font-bold w-6">{char}.</span>
                <input
                  type="text"
                  value={newQ.options[idx]}
                  onChange={(e) => {
                    const opts = [...newQ.options];
                    opts[idx] = e.target.value;
                    setNewQ({ ...newQ, options: opts });
                  }}
                  placeholder={`Nhap phuong an ${char}...`}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCreateQuestion}
              className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
            >
              Luu vao Ngan hang Cau hoi
            </button>
          </div>
        </div>
      )}

      {/* Bo loc Khoi lop, Muc do & Tim kiem */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Khoi 10", "Khoi 11", "Khoi 12"].map((gr) => (
            <button
              key={gr}
              onClick={() => setSelectedGrade(gr)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                selectedGrade === gr
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {gr === "All" ? "Tat ca Khoi" : gr}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
          >
            <option value="All">Tat ca Muc do</option>
            <option value="Nhan biet">Nhan biet</option>
            <option value="Thong hieu">Thong hieu</option>
            <option value="Van dung">Van dung</option>
            <option value="Van dung cao">Van dung cao</option>
          </select>
          <input
            type="text"
            placeholder="Tim noi dung hoac chuyen de..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs w-56"
          />
        </div>
      </div>

      {/* Danh sach Cau hoi + Tinh nang Sua truc tiep (Inline Edit) */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isEditing = editingId === q.id;
          return (
            <div
              key={q.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-slate-100 font-mono text-xs font-bold text-slate-700">
                    {q.id}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                    {q.grade} • {q.topic}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold">
                    Muc do: {q.level}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                      >
                        [Luu thay doi]
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold"
                      >
                        [Huy]
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleCopyQuestion(q)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                      >
                        [Sao chep]
                      </button>
                      <button
                        onClick={() => handleStartEdit(q)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100"
                      >
                        [Sua truc tiep]
                      </button>
                      <button
                        onClick={() =>
                          setQuestions((prev) => prev.filter((item) => item.id !== q.id))
                        }
                        className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100"
                      >
                        [Xoa]
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Noi dung cau hoi & 4 Phuong an */}
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editDraft.content}
                    onChange={(e) =>
                      setEditDraft({ ...editDraft, content: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-blue-400 text-sm font-bold"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["A", "B", "C", "D"].map((char, idx) => (
                      <div key={char} className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setEditDraft({ ...editDraft, correct: char })
                          }
                          className={`px-2.5 py-1 rounded text-xs font-bold ${
                            editDraft.correct === char
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {char}
                        </button>
                        <input
                          type="text"
                          value={editDraft.options[idx]}
                          onChange={(e) => {
                            const updatedOpts = [...editDraft.options];
                            updatedOpts[idx] = e.target.value;
                            setEditDraft({ ...editDraft, options: updatedOpts });
                          }}
                          className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold text-slate-800">{q.content}</p>
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
                  <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <strong>Giai thich Hoa hoc:</strong> {q.explanation}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionBank;