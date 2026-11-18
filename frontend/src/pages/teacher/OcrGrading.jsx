// File: frontend/src/pages/teacher/OcrGrading.jsx
// Chuc nang: He thong Cham Phieu Trac nghiem Hoa hoc bang AI OCR + Thanh tien trinh + Modal Soi loi & Ban do Dap an
// Nang cap tu OcrGrading.jsx cua PlanbookAI-main, tuan thu Luat 7 (Code sach 100%, khong icon/emoji)

import React, { useState } from "react";

const OcrGrading = () => {
  // State chon De thi Hoa hoc can cham
  const [selectedExam, setSelectedExam] = useState("EX-CHEM-101");
  // State tien trinh quet OCR (0 -> 100%)
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  // State luu Bai lam cua hoc sinh dang duoc mo trong Modal "Soi loi chi tiet"
  const [inspectingSheet, setInspectingSheet] = useState(null);

  // Danh sach ket qua cham phieu trac nghiem OCR cua hoc sinh
  const [gradedSheets, setGradedSheets] = useState([
    {
      id: "OCR-01",
      studentCode: "HS10A1-01",
      studentName: "Nguyen Minh Anh",
      examCode: "101",
      score: 9.0,
      correctCount: 9,
      totalQuestions: 10,
      aiComment:
        "Nam rat vung kien thuc Cau tao nguyen tu va Bang tuan hoan. Chi nham 1 cau Van dung cao ve tinh phan tram dong vi.",
      details: [
        { q: 1, picked: "B", correct: "B", isCorrect: true, topic: "Hat nhan nguyen tu" },
        { q: 2, picked: "B", correct: "B", isCorrect: true, topic: "Tinh so hat p, n, e" },
        { q: 3, picked: "C", correct: "C", isCorrect: true, topic: "Cau hinh electron" },
        { q: 4, picked: "A", correct: "A", isCorrect: true, topic: "Dong vi hoa hoc" },
        { q: 5, picked: "D", correct: "D", isCorrect: true, topic: "Chu ky & Nhom" },
        { q: 6, picked: "B", correct: "B", isCorrect: true, topic: "Ban kinh nguyen tu" },
        { q: 7, picked: "A", correct: "A", isCorrect: true, topic: "Do am dien" },
        { q: 8, picked: "C", correct: "C", isCorrect: true, topic: "Lien ket ion" },
        { q: 9, picked: "B", correct: "B", isCorrect: true, topic: "Bai toan khi H2" },
        { q: 10, picked: "A", correct: "D", isCorrect: false, topic: "Nguyen tu khoi trung binh" },
      ],
    },
    {
      id: "OCR-02",
      studentCode: "HS10A1-02",
      studentName: "Tran Hoang Bao",
      examCode: "102",
      score: 7.0,
      correctCount: 7,
      totalQuestions: 10,
      aiComment:
        "Nam duoc ly thuyet co ban nhung con lung tung o cac cau viet cau hinh electron phan lop d va bai toan dong vi.",
      details: [
        { q: 1, picked: "A", correct: "A", isCorrect: true, topic: "Hat nhan nguyen tu" },
        { q: 2, picked: "C", correct: "C", isCorrect: true, topic: "Tinh so hat p, n, e" },
        { q: 3, picked: "B", correct: "D", isCorrect: false, topic: "Cau hinh electron" },
        { q: 4, picked: "A", correct: "A", isCorrect: true, topic: "Dong vi hoa hoc" },
        { q: 5, picked: "B", correct: "B", isCorrect: true, topic: "Chu ky & Nhom" },
        { q: 6, picked: "C", correct: "C", isCorrect: true, topic: "Ban kinh nguyen tu" },
        { q: 7, picked: "D", correct: "A", isCorrect: false, topic: "Do am dien" },
        { q: 8, picked: "B", correct: "B", isCorrect: true, topic: "Lien ket ion" },
        { q: 9, picked: "A", correct: "A", isCorrect: true, topic: "Bai toan khi H2" },
        { q: 10, picked: "C", correct: "B", isCorrect: false, topic: "Nguyen tu khoi trung binh" },
      ],
    },
    {
      id: "OCR-03",
      studentCode: "HS10A1-03",
      studentName: "Le Thu Cuc",
      examCode: "103",
      score: 4.0,
      correctCount: 4,
      totalQuestions: 10,
      aiComment:
        "Can phu dao gap: Hoc sinh chua phan biet duoc so hieu nguyen tu Z va so khoi A, sai nhieu cau Thong hieu va Van dung.",
      details: [
        { q: 1, picked: "B", correct: "B", isCorrect: true, topic: "Hat nhan nguyen tu" },
        { q: 2, picked: "A", correct: "D", isCorrect: false, topic: "Tinh so hat p, n, e" },
        { q: 3, picked: "C", correct: "A", isCorrect: false, topic: "Cau hinh electron" },
        { q: 4, picked: "B", correct: "B", isCorrect: true, topic: "Dong vi hoa hoc" },
        { q: 5, picked: "A", correct: "C", isCorrect: false, topic: "Chu ky & Nhom" },
        { q: 6, picked: "D", correct: "D", isCorrect: true, topic: "Ban kinh nguyen tu" },
        { q: 7, picked: "B", correct: "C", isCorrect: false, topic: "Do am dien" },
        { q: 8, picked: "A", correct: "A", isCorrect: true, topic: "Lien ket ion" },
        { q: 9, picked: "D", correct: "B", isCorrect: false, topic: "Bai toan khi H2" },
        { q: 10, picked: "A", correct: "C", isCorrect: false, topic: "Nguyen tu khoi trung binh" },
      ],
    },
  ]);

  // Ham mo phong Tien trinh Quet OCR Hang loat (0% -> 100%)
  const handleRunBatchOcrScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    let current = 0;
    const timer = setInterval(() => {
      current += 25;
      setScanProgress(current);
      if (current >= 100) {
        clearInterval(timer);
        setIsScanning(false);
        // Them 1 phieu moi vua quet xong vao danh sach
        const newId = `OCR-0${gradedSheets.length + 1}`;
        setGradedSheets((prev) => [
          {
            id: newId,
            studentCode: `HS10A1-0${prev.length + 1}`,
            studentName: "Pham Quoc Dat (Vua quet OCR)",
            examCode: "104",
            score: 8.0,
            correctCount: 8,
            totalQuestions: 10,
            aiComment:
              "Ket qua quet OCR chinh xac 100%. Hoc sinh lam tot phan Lien ket hoa hoc, can ren them bai toan tinh hieu suat.",
            details: prev[0].details.map((d, idx) =>
              idx === 8 ? { ...d, picked: "D", isCorrect: false } : d
            ),
          },
          ...prev,
        ]);
      }
    }, 350);
  };

  // Ham xuat file CSV So diem
  const handleExportGradebookCSV = () => {
    const headers = "Ma HS,Ho va Ten,Ma De,So Cau Dung,Diem So,Nhan xet AI\n";
    const rows = gradedSheets
      .map(
        (s) =>
          `${s.studentCode},"${s.studentName}",${s.examCode},${s.correctCount}/${s.totalQuestions},${s.score},"${s.aiComment}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `So_Diem_OCR_${selectedExam}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Tinh cac chi so KPI
  const avgScore = (
    gradedSheets.reduce((acc, s) => acc + s.score, 0) / gradedSheets.length
  ).toFixed(1);
  const passCount = gradedSheets.filter((s) => s.score >= 5.0).length;
  const passRate = Math.round((passCount / gradedSheets.length) * 100);
  const needTutoringCount = gradedSheets.filter((s) => s.score < 5.0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Cham Phieu Trac nghiem Hoa hoc Tu dong (AI Vision OCR)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Nhan dien ma de, cham diem hang loat, soi loi tung o dap an va sinh nhan xet nang luc
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportGradebookCSV}
            className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
          >
            [Xuat So diem CSV]
          </button>
          <button
            onClick={handleRunBatchOcrScan}
            disabled={isScanning}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 disabled:opacity-50"
          >
            {isScanning
              ? `Dang quet OCR (${scanProgress}%)...`
              : "+ Quet & Cham Lo Phieu Moi"}
          </button>
        </div>
      </div>

      {/* Khu vuc Chon De thi & Thanh tien trinh Quet OCR */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Chon Ky thi / Bo De Hoa hoc de doi chieu Dap an
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
            >
              <option value="EX-CHEM-101">
                [EX-CHEM-101] De Kiem tra Giua Ky 1 - Hoa hoc 10 (Ma 101 - 104)
              </option>
              <option value="EX-CHEM-102">
                [EX-CHEM-102] De Kiem tra 15 Phut - Hoa hoc 12 Chuong Ester
              </option>
            </select>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>Trang thai AI Vision Engine</span>
              <span>{scanProgress}% Hoan tat</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 The Thong ke KPI Ket qua Cham */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">So Phieu Da Cham</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">
            {gradedSheets.length} Phieu
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Diem Trung Binh Lop</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{avgScore} / 10</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Ty le Dat (&gt;= 5.0)</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{passRate}%</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Can Phu dao (&lt; 5.0)</div>
          <div className="text-2xl font-bold text-rose-600 mt-1">
            {needTutoringCount} Hoc sinh
          </div>
        </div>
      </div>

      {/* Bang Ket qua Cham & Nut "Soi loi bai lam chi tiet" */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">
            Bang Ket qua Quet Phieu Tra loi Trac nghiem
          </h2>
          <span className="text-xs text-slate-500">
            Bam vao [Soi loi bai lam] de xem Ban do Dap an Xanh/Do tung cau
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold text-slate-600 uppercase border-b border-slate-200">
                <th className="p-4">Ma HS</th>
                <th className="p-4">Ho va Ten Hoc sinh</th>
                <th className="p-4">Ma De</th>
                <th className="p-4">So Cau Dung</th>
                <th className="p-4">Diem So</th>
                <th className="p-4">Nhan xet AI</th>
                <th className="p-4 text-right">Thao tac</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {gradedSheets.map((sheet) => (
                <tr key={sheet.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-xs font-bold text-slate-600">
                    {sheet.studentCode}
                  </td>
                  <td className="p-4 font-bold text-slate-800">{sheet.studentName}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded bg-slate-100 font-mono text-xs font-bold">
                      Ma {sheet.examCode}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-700">
                    {sheet.correctCount} / {sheet.totalQuestions}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        sheet.score >= 8
                          ? "bg-emerald-100 text-emerald-800"
                          : sheet.score >= 5
                          ? "bg-blue-100 text-blue-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {sheet.score.toFixed(1)} diem
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-600 max-w-md">
                    {sheet.aiComment}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setInspectingSheet(sheet)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100"
                    >
                      [Soi loi bai lam]
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUA SO MODAL: SOI LOI BAI LAM CHI TIET & BAN DO DAP AN XANH / DO */}
      {inspectingSheet && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-indigo-100 text-indigo-800">
                  Chi tiet Phieu OCR: {inspectingSheet.id}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Hoc sinh: {inspectingSheet.studentName} ({inspectingSheet.studentCode})
                </h3>
                <p className="text-xs text-slate-500">
                  Ma de: {inspectingSheet.examCode} | Ket qua:{" "}
                  <strong>
                    {inspectingSheet.correctCount}/{inspectingSheet.totalQuestions} cau dung
                  </strong>{" "}
                  ({inspectingSheet.score.toFixed(1)} diem)
                </p>
              </div>
              <button
                onClick={() => setInspectingSheet(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                [Dong cua so]
              </button>
            </div>

            {/* Ban do Dap an Truc quan (O Xanh = Dung, O Do = Sai) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase">
                1. Ban do Dap an Tren Phieu To (Xanh = Dung, Do = Sai)
              </h4>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {inspectingSheet.details.map((item) => (
                  <div
                    key={item.q}
                    className={`p-2.5 rounded-lg text-center border font-bold text-xs ${
                      item.isCorrect
                        ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                        : "bg-rose-50 border-rose-400 text-rose-800"
                    }`}
                  >
                    <div>Cau {item.q}</div>
                    <div className="text-sm mt-0.5">{item.picked}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bang Doi chieu Tung Cau Hoi */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase">
                2. Bang Doi chieu Dap an & Phan tich Chu de Kien thuc
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 font-bold text-slate-600 border-b">
                    <tr>
                      <th className="p-3">Cau</th>
                      <th className="p-3">Chuyen de Hoa hoc</th>
                      <th className="p-3">Hoc sinh Khoanh</th>
                      <th className="p-3">Dap an Dung</th>
                      <th className="p-3">Ket qua</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inspectingSheet.details.map((d) => (
                      <tr key={d.q}>
                        <td className="p-3 font-bold">Cau {d.q}</td>
                        <td className="p-3 text-slate-700">{d.topic}</td>
                        <td className="p-3 font-mono font-bold">{d.picked}</td>
                        <td className="p-3 font-mono font-bold text-emerald-700">
                          {d.correct}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              d.isCorrect
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {d.isCorrect ? "Chinh xac" : "Sai"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Nhan xet AI */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
              <strong>AI Nhan xet & Goi y Phu dao: </strong>
              {inspectingSheet.aiComment}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OcrGrading;