import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { teacherService } from '../../services/teacherService';

export default function ExamGenerator() {
  // Cấu hình ma trận đề thi trắc nghiệm Hóa học
  const [examTitle, setExamTitle] = useState('Kiểm tra Định kỳ Hóa học 12 - Chuyên đề Ester & Carbohydrate');
  const [grade, setGrade] = useState('12');
  const [durationMins, setDurationMins] = useState(45);
  const [versionCount, setVersionCount] = useState(2); // Số lượng mã đề cần trộn (101, 102...)

  // Danh sách các mã đề đã sinh ra và mã đề đang được chọn để xem trước
  const [examVersions, setExamVersions] = useState([]);
  const [activeCode, setActiveCode] = useState('101');

  // Bộ câu hỏi gốc dùng để trộn ra nhiều mã đề khác nhau
  const samplePool = [
    {
      content: 'Chất nào sau đây thuộc loại ester no, đơn chức, mạch hở?',
      choices: [
        { text: 'CH3COOC2H5 (Ethyl acetate)', isCorrect: true },
        { text: 'CH3COOH (Acetic acid)', isCorrect: false },
        { text: 'C2H5OH (Ethanol)', isCorrect: false },
        { text: 'HCHO (Formaldehyde)', isCorrect: false },
      ],
    },
    {
      content: 'Thủy phân hoàn toàn Saccharose trong môi trường acid thu được sản phẩm gồm:',
      choices: [
        { text: 'Glucose và Fructose', isCorrect: true },
        { text: 'Chỉ có Glucose', isCorrect: false },
        { text: 'Chỉ có Fructose', isCorrect: false },
        { text: 'Tinh bột và Cellulose', isCorrect: false },
      ],
    },
    {
      content: 'Kim loại nào sau đây có tính dẫn điện tốt nhất trong tất cả các kim loại?',
      choices: [
        { text: 'Bạc (Ag)', isCorrect: true },
        { text: 'Đồng (Cu)', isCorrect: false },
        { text: 'Vàng (Au)', isCorrect: false },
        { text: 'Nhôm (Al)', isCorrect: false },
      ],
    },
    {
      content: 'Ở điều kiện thường, chất nào sau đây làm mất màu dung dịch nước Bromine (Br2)?',
      choices: [
        { text: 'Ethylene (C2H4)', isCorrect: true },
        { text: 'Methane (CH4)', isCorrect: false },
        { text: 'Ethane (C2H6)', isCorrect: false },
        { text: 'Benzene (C6H6)', isCorrect: false },
      ],
    },
  ];

  // Hàm đảo ngẫu nhiên mảng (Thuật toán Fisher-Yates Shuffle)
  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Xử lý trộn câu hỏi và đảo đáp án A, B, C, D để xuất ra nhiều mã đề (101, 102, 103, 104)
  const handleGenerateExams = async (e) => {
    e.preventDefault();
    try {
      const res = await teacherService.generateExamVersions({
        title: examTitle,
        grade: Number(grade),
        durationMins: Number(durationMins),
        versionCount: Number(versionCount),
      });
      if (res.versions && res.versions.length > 0) {
        setExamVersions(res.versions);
        setActiveCode(res.versions[0].examCode);
        return;
      }
    } catch (err) {
      // Nếu Backend chưa bật, chạy thuật toán đảo đề trực tiếp
    }

    const codes = ['101', '102', '103', '104'].slice(0, Number(versionCount));
    const labels = ['A', 'B', 'C', 'D'];

    const generated = codes.map((code) => {
      // Đảo thứ tự câu hỏi cho mã đề này
      const shuffledQuestions = shuffleArray(samplePool).map((q, qIdx) => {
        // Đảo thứ tự 4 đáp án A, B, C, D bên trong từng câu hỏi
        const shuffledChoices = shuffleArray(q.choices);
        const correctIdx = shuffledChoices.findIndex((c) => c.isCorrect);
        return {
          number: qIdx + 1,
          content: q.content,
          options: shuffledChoices.map((c, idx) => `${labels[idx]}. ${c.text}`),
          correctLetter: labels[correctIdx],
        };
      });

      return {
        examCode: code,
        questions: shuffledQuestions,
      };
    });

    setExamVersions(generated);
    setActiveCode(generated[0].examCode);
  };

  const currentVersion = examVersions.find((v) => v.examCode === activeCode);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Tạo & Trộn Đề Thi Trắc Nghiệm Hóa Học Nhiều Mã Đề</h2>
        <p className="text-sm text-slate-500 mt-1">
          Tự động rút câu hỏi từ Ngân hàng câu hỏi, đảo thứ tự câu và đảo đáp án A/B/C/D tạo ra các mã đề 101, 102, 103, 104
        </p>

        <form onSubmit={handleGenerateExams} className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề đề kiểm tra</label>
            <input
              type="text"
              required
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Khối lớp</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="10">Hóa học Lớp 10</option>
              <option value="11">Hóa học Lớp 11</option>
              <option value="12">Hóa học Lớp 12</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Số lượng mã đề cần trộn</label>
            <select
              value={versionCount}
              onChange={(e) => setVersionCount(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value={2}>2 Mã đề (101, 102)</option>
              <option value={4}>4 Mã đề (101, 102, 103, 104)</option>
            </select>
          </div>

          <div className="md:col-span-4 flex justify-end">
            <Button type="submit">Tạo & Trộn Mã Đề Thi</Button>
          </div>
        </form>
      </div>

      {/* Khu vực hiển thị các mã đề sau khi trộn */}
      {examVersions.length > 0 && currentVersion && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600 mr-2">Chọn xem Mã đề:</span>
              {examVersions.map((ver) => (
                <button
                  key={ver.examCode}
                  onClick={() => setActiveCode(ver.examCode)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition ${
                    activeCode === ver.examCode
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Mã đề {ver.examCode}
                </button>
              ))}
            </div>

            <Button variant="secondary" onClick={() => window.print()}>
              In Mã Đề {activeCode}
            </Button>
          </div>

          {/* Nội dung đề thi của Mã đề đang chọn */}
          <div>
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 uppercase">{examTitle}</h3>
              <p className="text-sm text-slate-600 mt-1">
                Môn: Hóa học Lớp {grade} | Thời gian: {durationMins} phút | <strong>MÃ ĐỀ: {currentVersion.examCode}</strong>
              </p>
            </div>

            <div className="space-y-4">
              {currentVersion.questions.map((q) => (
                <div key={q.number} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-bold text-slate-800">
                    Câu {q.number}: {q.content}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-slate-700">
                    {q.options.map((opt, idx) => (
                      <div key={idx}>{opt}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bảng đáp án chuẩn của Mã đề đang chọn (Phục vụ đối chiếu chấm OCR) */}
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <h4 className="text-sm font-bold text-emerald-800 mb-2">
                Bảng đáp án chuẩn của Mã đề {currentVersion.examCode} (Dùng để đối chiếu chấm OCR):
              </h4>
              <div className="flex flex-wrap gap-3">
                {currentVersion.questions.map((q) => (
                  <span
                    key={q.number}
                    className="px-3 py-1 bg-white border border-emerald-300 rounded text-xs font-bold text-emerald-700"
                  >
                    Câu {q.number}: {q.correctLetter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}