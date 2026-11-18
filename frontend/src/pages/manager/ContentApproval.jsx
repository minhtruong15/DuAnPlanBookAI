import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { managerService } from '../../services/managerService';

export default function ContentApproval() {
  // Hàng đợi các nội dung do Staff tạo đang chờ Manager phê duyệt (Giáo án mẫu, Câu hỏi, Prompt AI)
  const [items, setItems] = useState([
    {
      id: 1,
      type: 'Giáo án mẫu Hóa học',
      title: 'Kế hoạch bài dạy Hóa 10: Phản ứng Oxi hóa - Khử (Chuẩn Công văn 5512)',
      author: 'Chuyên viên Học liệu Hóa học (Staff)',
      summary: 'Đầy đủ 4 hoạt động dạy học, phiếu học tập cân bằng phương trình theo phương pháp thăng bằng electron.',
      status: 'PENDING',
    },
    {
      id: 2,
      type: 'Ngân hàng Câu hỏi gốc',
      title: 'Bộ 15 câu hỏi vận dụng Ester - Lipid ôn thi Tốt nghiệp THPT Hóa 12',
      author: 'Chuyên viên Học liệu Hóa học (Staff)',
      summary: 'Bao gồm các bài toán thủy phân ester trong môi trường kiềm và bài toán đốt cháy chất béo.',
      status: 'PENDING',
    },
    {
      id: 3,
      type: 'Template Prompt AI',
      title: 'Prompt Sinh Bài Tập Điền Khuyết Phương Trình Hóa Hữu Cơ Lớp 11',
      author: 'Chuyên viên Học liệu Hóa học (Staff)',
      summary: 'Khuôn mẫu lệnh giúp Gemini AI tạo chuỗi phản ứng hóa học Hydrocarbon kèm điều kiện xúc tác chuẩn.',
      status: 'APPROVED',
    },
  ]);

  // Xử lý Phê duyệt (APPROVED) hoặc Từ chối (REJECTED) nội dung
  const handleApproval = async (id, newStatus) => {
    try {
      await managerService.approveContent(id, newStatus);
    } catch (err) {
      // Cập nhật trực tiếp trên state
    }
    setItems(items.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Phê Duyệt Nội Dung Học Liệu & Prompt AI</h2>
        <p className="text-sm text-slate-500 mt-1">
          Kiểm duyệt chất lượng Giáo án mẫu, Ngân hàng câu hỏi Hóa học và Template Prompt AI do Staff biên soạn trước khi xuất bản cho Giáo viên
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold">
                  {item.type}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                    item.status === 'APPROVED'
                      ? 'bg-emerald-100 text-emerald-700'
                      : item.status === 'REJECTED'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.status === 'APPROVED'
                    ? 'Đã phê duyệt'
                    : item.status === 'REJECTED'
                    ? 'Đã từ chối'
                    : 'Đang chờ duyệt'}
                </span>
              </div>
              <span className="text-xs text-slate-400">Người gửi: {item.author}</span>
            </div>

            <h3 className="text-base font-bold text-slate-800 mt-2">{item.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{item.summary}</p>

            {item.status === 'PENDING' && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2">
                <Button variant="danger" onClick={() => handleApproval(item.id, 'REJECTED')} className="px-3 py-1.5 text-xs">
                  Từ chối (Yêu cầu sửa lại)
                </Button>
                <Button variant="success" onClick={() => handleApproval(item.id, 'APPROVED')} className="px-3 py-1.5 text-xs">
                  Phê duyệt xuất bản
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}