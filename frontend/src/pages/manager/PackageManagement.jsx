import React, { useState } from 'react';
import { formatCurrencyVND } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { managerService } from '../../services/managerService';

export default function PackageManagement() {
  // Danh sách các gói dịch vụ và gói thuê bao do Manager quản lý
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Gói Cơ bản (Trải nghiệm)',
      priceVND: 0,
      aiCredits: 50,
      durationDays: 30,
      description: 'Dành cho Giáo viên mới đăng ký trải nghiệm soạn giáo án AI và quét OCR cơ bản.',
    },
    {
      id: 2,
      name: 'Gói Pro Giáo viên Hóa học',
      priceVND: 299000,
      aiCredits: 300,
      durationDays: 180,
      description: 'Mở khóa toàn bộ tính năng trộn đề thi nhiều mã đề và chấm bài bằng Gemini Vision OCR.',
    },
    {
      id: 3,
      name: 'Gói Tổ Bộ môn Hóa THPT',
      priceVND: 999000,
      aiCredits: 1500,
      durationDays: 365,
      description: 'Dành cho Tổ chuyên môn Hóa học trường THPT, dùng chung kho câu hỏi và thống kê toàn khối.',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPkg, setNewPkg] = useState({
    name: '',
    priceVND: 199000,
    aiCredits: 200,
    durationDays: 90,
    description: '',
  });

  // Xử lý tạo gói dịch vụ mới
  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      await managerService.createPackage(newPkg);
    } catch (err) {
      // Cập nhật trực tiếp trên state khi chạy độc lập
    }
    const created = {
      id: Date.now(),
      ...newPkg,
      priceVND: Number(newPkg.priceVND),
      aiCredits: Number(newPkg.aiCredits),
      durationDays: Number(newPkg.durationDays),
    };
    setPackages([...packages, created]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quản Lý Gói Dịch Vụ & Gói Thuê Bao</h2>
          <p className="text-sm text-slate-500 mt-1">
            Thiết lập mức giá, thời hạn sử dụng và hạn mức lượt Credit AI / OCR cho từng gói cước
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Tạo gói dịch vụ mới</Button>
      </div>

      {/* Danh sách các thẻ Gói dịch vụ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold">
                Thời hạn: {pkg.durationDays} ngày
              </span>
              <h3 className="text-lg font-bold text-slate-800 mt-3">{pkg.name}</h3>
              <div className="text-2xl font-bold text-emerald-700 mt-2">
                {formatCurrencyVND(pkg.priceVND)}
              </div>
              <p className="text-xs font-semibold text-indigo-600 mt-1">
                Cấp ngay: {pkg.aiCredits} lượt Credit AI & OCR
              </p>
              <p className="text-sm text-slate-600 mt-3">{pkg.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
              <span>Trạng thái: Đang mở bán</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal tạo gói dịch vụ mới */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thêm gói dịch vụ thuê bao mới">
        <form onSubmit={handleCreatePackage} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên gói dịch vụ</label>
            <input
              type="text"
              required
              value={newPkg.name}
              onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })}
              placeholder="Ví dụ: Gói Luyện thi Tốt nghiệp Hóa 12"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Giá tiền (VNĐ)</label>
              <input
                type="number"
                required
                value={newPkg.priceVND}
                onChange={(e) => setNewPkg({ ...newPkg, priceVND: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Số lượt Credit AI</label>
              <input
                type="number"
                required
                value={newPkg.aiCredits}
                onChange={(e) => setNewPkg({ ...newPkg, aiCredits: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả quyền lợi gói</label>
            <textarea
              rows={3}
              required
              value={newPkg.description}
              onChange={(e) => setNewPkg({ ...newPkg, description: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Lưu gói dịch vụ</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}