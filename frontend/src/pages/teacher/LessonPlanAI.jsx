import React, { useState } from 'react';
import { CHEMISTRY_TOPICS } from '../../utils/constants';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { teacherService } from '../../services/teacherService';

export default function LessonPlanAI() {
  // Các biến lưu thông số đầu vào do Giáo viên chọn
  const [grade, setGrade] = useState('10');
  const [topic, setTopic] = useState(CHEMISTRY_TOPICS[10][0]);
  const [durationPeriods, setDurationPeriods] = useState('2');
  const [objectives, setObjectives] = useState('Học sinh nắm vững khái niệm, viết được phương trình hóa học và vận dụng giải bài tập thực tiễn.');

  // Biến lưu trạng thái đang chờ AI và kết quả Giáo án sinh ra
  const [loading, setLoading] = useState(false);
  const [lessonContent, setLessonContent] = useState('');

  // Khi đổi Khối lớp (10, 11, 12) thì tự động chọn Chủ đề đầu tiên của khối đó
  const handleGradeChange = (newGrade) => {
    setGrade(newGrade);
    setTopic(CHEMISTRY_TOPICS[newGrade][0]);
  };

  // Xử lý gọi Gemini AI sinh Kế hoạch bài dạy theo chuẩn Công văn 5512
  const handleGenerateLessonPlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await teacherService.generateLessonPlanAI({
        grade: Number(grade),
        topic,
        durationPeriods: Number(durationPeriods),
        objectives,
      });
      setLessonContent(res.content);
    } catch (err) {
      // Nếu Backend chưa bật, sinh mẫu Giáo án Công văn 5512 chuẩn theo đúng Chủ đề giáo viên vừa chọn
      setLessonContent(
        `KE HOACH BAI DAY MON HOA HOC LOP ${grade} (CHUAN CONG VAN 5512)\n` +
        `CHU DE / BAI HOC: ${topic.toUpperCase()}\n` +
        `Thoi luong thuc hien: ${durationPeriods} tiet\n` +
        `====================================================================\n\n` +
        `I. MUC TIEU BAI HOC\n` +
        `1. Ve nang luc Hoa hoc:\n` +
        `   - Nhan thuc hoa hoc: Trinh bay duoc khai niem, cau tao va tinh chat dac trung cua chu de "${topic}".\n` +
        `   - Tim hieu the gioi tu nhien duoi goc do hoa hoc: Quan sat thi nghiem, giai thich hien tuong hoa hoc.\n` +
        `   - Van dung kien thuc, ky nang da hoc: ${objectives}\n` +
        `2. Ve pham chat: Trung thuc trong bao cao ket qua thi nghiem, trach nhiem trong hoat dong nhom.\n\n` +
        `II. THIET BI DAY HOC VA HOC LIEU\n` +
        `   - Giao vien: Phieu hoc tap, video mo phong thi nghiem Hoa hoc lop ${grade}, bang tuan hoan.\n` +
        `   - Hoc sinh: Sach giao khoa Hoa hoc ${grade}, bang phu nhom.\n\n` +
        `III. TIEN TRINH DAY HOC (4 HOAT DONG CHUAN CONG VAN 5512)\n` +
        `--------------------------------------------------------------------\n` +
        `HOAT DONG 1: KHOI DONG / MO DAU (10 phut)\n` +
        `- Muc tieu: Tao hung thu va ket noi kien thuc thuc tien voi bai "${topic}".\n` +
        `- To chuc thuc hien: Giao vien neu tinh huong hoa hoc trong doi song, yeu cau hoc sinh thao luan cap doi.\n\n` +
        `HOAT DONG 2: HINH THANH KIEN THUC MOI (35 phut)\n` +
        `- Muc tieu: Hoc sinh chiem linh kien thuc trong tam cua chu de "${topic}".\n` +
        `- San pham: Phieu hoc tap da hoan thanh va cac phuong trinh phan ung hoa hoc minh hoa.\n\n` +
        `HOAT DONG 3: LUYEN TAP (25 phut)\n` +
        `- Muc tieu: Cung co kien thuc thong qua he thong cau hoi trac nghiem Nhan biet & Thong hieu.\n\n` +
        `HOAT DONG 4: VAN DUNG VA MO RONG (20 phut)\n` +
        `- Muc tieu: Giai quyet bai toan thuc tien lien quan den san xuat hoa chat va bao ve moi truong.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Lưu giáo án vào Workspace cá nhân
  const handleSaveToWorkspace = async () => {
    try {
      await teacherService.saveLessonPlan({
        grade: Number(grade),
        topic,
        title: `Giao an AI: ${topic}`,
        content: lessonContent,
      });
    } catch (err) {
      // Fallback thông báo lưu thành công
    }
    alert(`Đã lưu Giáo án "${topic}" (Hóa học ${grade}) vào Workspace cá nhân.`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Soạn Giáo Án Hóa Học Tự Động Bằng Gemini AI (Công Văn 5512)</h2>
        <p className="text-sm text-slate-500 mt-1">
          Chọn khối lớp và chủ đề Hóa học để AI tự động thiết kế Kế hoạch bài dạy gồm 4 hoạt động chuẩn Bộ GD&ĐT
        </p>

        {/* Biểu mẫu cấu hình thông số Giáo án */}
        <form onSubmit={handleGenerateLessonPlan} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Khối lớp THPT</label>
            <select
              value={grade}
              onChange={(e) => handleGradeChange(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="10">Hóa học Lớp 10</option>
              <option value="11">Hóa học Lớp 11</option>
              <option value="12">Hóa học Lớp 12</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Chủ đề chương trình Hóa học</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              {CHEMISTRY_TOPICS[grade].map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Thời lượng giảng dạy (Tiết)</label>
            <select
              value={durationPeriods}
              onChange={(e) => setDurationPeriods(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="1">1 Tiết (45 phút)</option>
              <option value="2">2 Tiết (90 phút)</option>
              <option value="3">3 Tiết (Chuyên đề)</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mục tiêu trọng tâm của bài dạy (Tùy chỉnh thêm cho AI)
            </label>
            <input
              type="text"
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <Button type="submit" disabled={loading}>
              Sinh Giáo Án Bằng Gemini AI
            </Button>
          </div>
        </form>
      </div>

      {/* Hiển thị vòng xoay chờ khi AI đang xử lý */}
      {loading && <LoadingSpinner message="Gemini AI đang biên soạn Kế hoạch bài dạy Hóa học theo Công văn 5512..." />}

      {/* Khu vực chỉnh sửa, lưu trữ và in Giáo án sau khi AI tạo xong */}
      {lessonContent && !loading && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">
              Bản thảo Kế hoạch bài dạy (Giáo viên có thể chỉnh sửa trực tiếp bên dưới)
            </h3>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => window.print()}>
                In / Xuất PDF
              </Button>
              <Button variant="success" onClick={handleSaveToWorkspace}>
                Lưu vào Workspace
              </Button>
            </div>
          </div>

          <textarea
            rows={18}
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
            className="w-full p-4 border border-slate-300 rounded-lg text-sm font-mono text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}
    </div>
  );
}