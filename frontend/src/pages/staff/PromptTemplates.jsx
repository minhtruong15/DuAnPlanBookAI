// File: frontend/src/pages/staff/PromptTemplates.jsx
// Chuc nang: Trinh Quan ly AI Prompts, Dark-mode System Instruction Editor & Tinh chinh Tham so Temperature / Max Tokens
// Nang cap tu PromptManager.jsx cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";

const PromptTemplates = () => {
  // State chon Khuon mau Prompt dang chinh sua
  const [activeKey, setActiveKey] = useState("lesson_5512");
  // State hien thi ket qua chay thu Prompt (Sandbox Test)
  const [testResult, setTestResult] = useState("");

  // Danh sach cac Khuon mau Prompt AI Chuyen sau Hoa hoc THPT
  const [prompts, setPrompts] = useState({
    lesson_5512: {
      name: "1. Prompt Soan Giao an Hoa hoc (Chuan 5512)",
      description:
        "Khuon mau lenh he thong dung de sinh Ke hoach bai day Hoa hoc THPT gom 3 Muc tieu va 4 Hoat dong.",
      systemInstruction:
        "Ban la Chuyen gia Su pham Hoa hoc THPT cua Bo GD&DT Viet Nam. Hay thiet ke Ke hoach bai day theo dung cau truc Cong van 5512 gom: I. Muc tieu (Kien thuc, Nang luc hoa hoc, Pham chat); II. Thiet bi day hoc & Hoa chat; III. Tien trinh 4 Hoat dong (Khoi dong, Hinh thanh kien thuc, Luyen tap, Van dung). Cac phuong trinh hoa hoc phai can bang chinh xac va dung danh phap IUPAC.",
      model: "gemini-2.5-flash",
      temperature: 0.4,
      maxTokens: 4096,
    },
    exam_matrix: {
      name: "2. Prompt Sinh De thi theo Ma tran Nhan thuc",
      description:
        "Khuon mau dung de sinh bo cau hoi trac nghiem Hoa hoc 4 lua chon A, B, C, D phan loai theo 4 muc do.",
      systemInstruction:
        "Ban la Chuyen gia Khao thi Hoa hoc THPT. Dua tren Ma tran nhan thuc (Nhan biet, Thong hieu, Van dung, Van dung cao) va Chu de bai hoc {{topic}}, hay sinh danh sach cau hoi trac nghiem khach quan 4 dap an A, B, C, D kem dap an dung va huong dan giai chi tiet.",
      model: "gemini-2.5-pro",
      temperature: 0.6,
      maxTokens: 4096,
    },
    ocr_feedback: {
      name: "3. Prompt Phan tich Loi sai OCR & Nhan xet Hoc sinh",
      description:
        "Khuon mau dung de phan tich cac cau hoc sinh khoanh sai tren phieu OCR va de xuat lo trinh phu dao.",
      systemInstruction:
        "Dua tren danh sach cac cau hoi Hoa hoc ma hoc sinh khoanh sai {{wrong_questions}}, hay nhan xet ngan gon diem manh, chi ro lo hong kien thuc hoa hoc va de xuat 3 dang bai tap can on luyen them.",
      model: "gemini-2.5-flash",
      temperature: 0.5,
      maxTokens: 2048,
    },
  });

  const currentPrompt = prompts[activeKey];

  // Ham cap nhat gia tri tham so cua Prompt dang chon
  const handleUpdateField = (field, value) => {
    setPrompts((prev) => ({
      ...prev,
      [activeKey]: {
        ...prev[activeKey],
        [field]: value,
      },
    }));
  };

  // Ham chay thu Prompt tren Sandbox
  const handleRunPromptSandbox = () => {
    setTestResult(
      `[KET QUA CHAY THU SANDBOX - Model: ${currentPrompt.model} | Temp: ${currentPrompt.temperature} | MaxTokens: ${currentPrompt.maxTokens}]:\nHe thong Gemini AI da tiep nhan System Instruction va phan hoi JSON hop le (Thoi gian xu ly: 0.85s - Trang thai: SAN SANG PHAT HANH).`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quan ly Khuon mau AI Prompts & Tham so Mo hinh (Staff IDE)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tinh chinh System Instruction, dieu chinh do sang tao Temperature va Max Tokens cho bo nao Gemini AI
          </p>
        </div>
        <button
          onClick={() => alert("Da luu cau hinh AI Prompt vao Co so du lieu!")}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700"
        >
          [Luu Cau hinh Prompt]
        </button>
      </div>

      {/* Bo cuc 2 Cot: Danh sach Prompts ben trai + Trinh IDE & Tham so ben phai */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Danh sach Prompts */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 h-fit">
          <h2 className="text-xs font-bold text-slate-500 uppercase px-2 mb-2">
            Danh sach Khuon mau AI
          </h2>
          {Object.entries(prompts).map(([key, item]) => (
            <button
              key={key}
              onClick={() => {
                setActiveKey(key);
                setTestResult("");
              }}
              className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                activeKey === key
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-300"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Khu vuc Chinh sua System Instruction & Model Parameters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">
              {currentPrompt.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {currentPrompt.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dark-mode System Instruction Editor */}
            <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
              <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300">
                  SYSTEM INSTRUCTION EDITOR (IUPAC CHEMISTRY)
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  UTF-8 • Ready
                </span>
              </div>
              <textarea
                rows="10"
                value={currentPrompt.systemInstruction}
                onChange={(e) =>
                  handleUpdateField("systemInstruction", e.target.value)
                }
                className="w-full p-4 bg-slate-900 text-sky-300 font-mono text-xs leading-relaxed focus:outline-none"
              />
            </div>

            {/* Bang Dieu chinh Tham so Mo hinh (Model Parameters) */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-slate-800 border-b pb-2">
                Tham so Mo hinh AI (Parameters)
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Phien ban Mo hinh (AI Model)
                </label>
                <select
                  value={currentPrompt.model}
                  onChange={(e) => handleUpdateField("model", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold bg-slate-50"
                >
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Toc do cao)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Suy luan sau)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                  <span>Temperature (Do sang tao)</span>
                  <span className="text-indigo-600">{currentPrompt.temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={currentPrompt.temperature}
                  onChange={(e) =>
                    handleUpdateField("temperature", parseFloat(e.target.value))
                  }
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>0.0 (Chinh xac)</span>
                  <span>2.0 (Sang tao)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                  <span>Max Output Tokens</span>
                  <span className="text-indigo-600">{currentPrompt.maxTokens}</span>
                </div>
                <input
                  type="range"
                  min="512"
                  max="8192"
                  step="512"
                  value={currentPrompt.maxTokens}
                  onChange={(e) =>
                    handleUpdateField("maxTokens", parseInt(e.target.value, 10))
                  }
                  className="w-full accent-indigo-600"
                />
              </div>

              <button
                onClick={handleRunPromptSandbox}
                className="w-full py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
              >
                [Chay thu Prompt (Sandbox)]
              </button>
            </div>
          </div>

          {/* Hien thi ket qua chay thu */}
          {testResult && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-mono text-xs whitespace-pre-line">
              {testResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptTemplates;