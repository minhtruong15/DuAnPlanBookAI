import React from 'react';
import { formatCurrencyVND } from '../../utils/formatters';
import DataTable from '../../components/common/DataTable';

export default function RevenueDashboard() {
  // Dữ liệu thống kê doanh thu theo tháng và hiệu quả các gói dịch vụ
  const monthlyRevenue = [
    { id: 1, month: 'Tháng 09/2026', ordersCount: 42, packageBestSeller: 'Gói Pro Giáo viên Hóa học', totalAmount: 12558000 },
    { id: 2, month: 'Tháng 10/2026', ordersCount: 68, packageBestSeller: 'Gói Pro Giáo viên Hóa học', totalAmount: 20332000 },
    { id: 3, month: 'Tháng 11/2026', ordersCount: 95, packageBestSeller: 'Gói Tổ Bộ môn Hóa THPT', totalAmount: 34850000 },
  ];

  const columns = [
    { header: 'Kỳ thống kê', accessor: 'month' },
    { header: 'Số đơn hàng thanh toán', accessor: 'ordersCount' },
    { header: 'Gói dịch vụ bán chạy nhất', accessor: 'packageBestSeller' },
    {
      header: 'Doanh thu đạt được',
      accessor: 'totalAmount',
      render: (row) => (
        <span className="font-bold text-emerald-700">{formatCurrencyVND(row.totalAmount)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Theo Dõi Doanh Thu & Hiệu Quả Gói Dịch Vụ</h2>
        <p className="text-sm text-slate-500 mt-1">
          Tổng hợp doanh thu bán gói thuê bao AI cho Giáo viên và các Tổ bộ môn Hóa học THPT
        </p>
      </div>

      {/* 3 Thẻ chỉ số tài chính trọng tâm (KPI Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-500">Tổng doanh thu lũy kế</div>
          <div className="text-2xl font-bold text-emerald-700 mt-2">{formatCurrencyVND(67740000)}</div>
          <div className="text-xs text-slate-400 mt-1">Tăng trưởng +32% so với tháng trước</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-500">Tổng số đơn đăng ký gói Pro</div>
          <div className="text-2xl font-bold text-indigo-700 mt-2">205 đơn hàng</div>
          <div className="text-xs text-slate-400 mt-1">Tỷ lệ thanh toán thành công: 98.5%</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-500">Giáo viên Hóa THPT đang hoạt động</div>
          <div className="text-2xl font-bold text-slate-800 mt-2">340 Giáo viên</div>
          <div className="text-xs text-slate-400 mt-1">Trên 48 trường THPT toàn quốc</div>
        </div>
      </div>

      {/* Bảng chi tiết doanh thu theo từng tháng */}
      <div>
        <h3 className="text-base font-bold text-slate-800 mb-3">Bảng kê doanh thu chi tiết theo tháng</h3>
        <DataTable columns={columns} data={monthlyRevenue} />
      </div>
    </div>
  );
}