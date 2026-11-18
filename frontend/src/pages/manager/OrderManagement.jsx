import React, { useState } from 'react';
import { formatCurrencyVND } from '../../utils/formatters';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';

export default function OrderManagement() {
  // Danh sách đơn hàng đăng ký gói dịch vụ của Giáo viên
  const [orders, setOrders] = useState([
    {
      id: 501,
      teacherName: 'Thầy Nguyễn Văn Hóa',
      schoolName: 'THPT Chuyên Lê Hồng Phong',
      packageName: 'Gói Pro Giáo viên Hóa học',
      amountVND: 299000,
      createdAt: '15/11/2026',
      status: 'PAID',
    },
    {
      id: 502,
      teacherName: 'Cô Lê Thị Minh Châu',
      schoolName: 'THPT Nguyễn Thị Minh Khai',
      packageName: 'Gói Tổ Bộ môn Hóa THPT',
      amountVND: 999000,
      createdAt: '18/11/2026',
      status: 'PENDING',
    },
    {
      id: 503,
      teacherName: 'Thầy Trần Quốc Tuấn',
      schoolName: 'THPT Gia Định',
      packageName: 'Gói Pro Giáo viên Hóa học',
      amountVND: 299000,
      createdAt: '18/11/2026',
      status: 'PENDING',
    },
  ]);

  // Xử lý xác nhận thanh toán đơn hàng và kích hoạt cộng Credit AI cho Giáo viên
  const handleConfirmOrder = (orderId) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: 'PAID' } : o)));
  };

  const columns = [
    { header: 'Mã ĐH', accessor: 'id' },
    { header: 'Giáo viên đăng ký', accessor: 'teacherName' },
    { header: 'Trường THPT', accessor: 'schoolName' },
    { header: 'Gói dịch vụ', accessor: 'packageName' },
    {
      header: 'Số tiền',
      accessor: 'amountVND',
      render: (row) => <span className="font-bold text-slate-800">{formatCurrencyVND(row.amountVND)}</span>,
    },
    { header: 'Ngày đăng ký', accessor: 'createdAt' },
    {
      header: 'Trạng thái',
      accessor: 'status',
      render: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
            row.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}
        >
          {row.status === 'PAID' ? 'Đã thanh toán' : 'Chờ xác nhận'}
        </span>
      ),
    },
    {
      header: 'Thao tác',
      accessor: 'actions',
      render: (row) =>
        row.status === 'PENDING' ? (
          <Button variant="success" onClick={() => handleConfirmOrder(row.id)} className="px-3 py-1 text-xs">
            Xác nhận & Kích hoạt
          </Button>
        ) : (
          <span className="text-xs text-slate-400">Đã hoàn tất</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Theo Dõi Đơn Hàng & Đăng Ký Thuê Bao</h2>
        <p className="text-sm text-slate-500 mt-1">
          Kiểm tra các đơn đăng ký gói dịch vụ của Giáo viên và xác nhận kích hoạt cộng lượt Credit AI
        </p>
      </div>

      <DataTable columns={columns} data={orders} />
    </div>
  );
}