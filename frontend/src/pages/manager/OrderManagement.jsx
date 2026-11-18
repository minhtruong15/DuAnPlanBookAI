// File: frontend/src/pages/manager/OrderManagement.jsx
// Chức năng: Quản lý Đơn hàng, Lọc theo Gói dịch vụ, Sắp xếp & Gia hạn ngày sử dụng đồng bộ từ OrderTracking.jsx của PlanbookAI-main
// Tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';
import { formatCurrencyVND } from '../../utils/formatters';

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPackage, setFilterPackage] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const [orders, setOrders] = useState([
    {
      id: 501,
      teacherName: 'Thầy Nguyễn Văn Hóa',
      email: 'teacher@planbookai.vn',
      schoolName: 'THPT Chuyên Lê Hồng Phong',
      packageName: 'Gói Vàng (Pro Hóa học)',
      amountVND: 99000,
      createdAt: '15/11/2026',
      endDate: '2026-12-15',
      status: 'PAID',
    },
    {
      id: 502,
      teacherName: 'Cô Lê Thị Minh Châu',
      email: 'minhchau@thpt.edu.vn',
      schoolName: 'THPT Nguyễn Thị Minh Khai',
      packageName: 'Gói Kim Cương (Tổ Bộ môn)',
      amountVND: 199000,
      createdAt: '18/11/2026',
      endDate: '2027-02-18',
      status: 'PENDING',
    },
    {
      id: 503,
      teacherName: 'Thầy Trần Quốc Tuấn',
      email: 'quoctuan@thpt.edu.vn',
      schoolName: 'THPT Gia Định',
      packageName: 'Gói Vàng (Pro Hóa học)',
      amountVND: 99000,
      createdAt: '18/11/2026',
      endDate: '2026-12-18',
      status: 'PENDING',
    },
  ]);

  const [editingOrder, setEditingOrder] = useState(null);

  const handleConfirmOrder = (orderId) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: 'PAID' } : o)));
  };

  const handleSaveEditOrder = () => {
    setOrders(orders.map((o) => (o.id === editingOrder.id ? editingOrder : o)));
    setEditingOrder(null);
  };

  let processedOrders = orders.filter(
    (o) =>
      o.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filterPackage !== 'All') {
    processedOrders = processedOrders.filter((o) => o.packageName === filterPackage);
  }

  processedOrders.sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'oldest') return a.id - b.id;
    if (sortBy === 'priceDesc') return b.amountVND - a.amountVND;
    if (sortBy === 'priceAsc') return a.amountVND - b.amountVND;
    return 0;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#1e3a8a', margin: 0 }}>
          Quản lý Đơn hàng & Đăng ký Gói VIP
        </h1>
        <p style={{ color: '#64748b', marginTop: 6, marginBottom: 0, fontSize: '0.98rem' }}>
          Theo dõi thanh toán, kích hoạt Credit AI cho giáo viên và điều chỉnh thời hạn gói cước.
        </p>
      </div>

      {/* Bộ lọc Tìm kiếm + Gói + Sắp xếp giống OrderTracking.jsx */}
      <div style={{ background: '#ffffff', padding: 16, borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Tìm tên giáo viên, email, trường THPT..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.88rem', minWidth: 260, flex: 1 }}
        />
        <select value={filterPackage} onChange={(e) => setFilterPackage(e.target.value)} style={{ padding: '9px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '0.86rem' }}>
          <option value="All">Tất cả Gói dịch vụ</option>
          <option value="Gói Vàng (Pro Hóa học)">Gói Vàng (Pro Hóa học)</option>
          <option value="Gói Kim Cương (Tổ Bộ môn)">Gói Kim Cương (Tổ Bộ môn)</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '9px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '0.86rem' }}>
          <option value="newest">Mới nhất trước</option>
          <option value="oldest">Cũ nhất trước</option>
          <option value="priceDesc">Giá trị cao nhất</option>
          <option value="priceAsc">Giá trị thấp nhất</option>
        </select>
      </div>

      {/* Bảng Đơn hàng */}
      <div style={{ background: '#ffffff', borderRadius: 20, border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 18px' }}>Mã ĐH</th>
              <th style={{ padding: '14px 18px' }}>Giáo viên & Trường</th>
              <th style={{ padding: '14px 18px' }}>Gói đăng ký</th>
              <th style={{ padding: '14px 18px' }}>Số tiền</th>
              <th style={{ padding: '14px 18px' }}>Hết hạn</th>
              <th style={{ padding: '14px 18px' }}>Trạng thái</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {processedOrders.map((o) => (
              <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
                <td style={{ padding: '14px 18px', fontFamily: 'monospace', fontWeight: 800 }}>#{o.id}</td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{o.teacherName}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{o.schoolName} ({o.email})</div>
                </td>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#1e40af' }}>{o.packageName}</td>
                <td style={{ padding: '14px 18px', fontWeight: 800 }}>{formatCurrencyVND(o.amountVND)}</td>
                <td style={{ padding: '14px 18px', fontFamily: 'monospace', fontSize: '0.84rem' }}>{o.endDate}</td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ background: o.status === 'PAID' ? '#dcfce7' : '#fef3c7', color: o.status === 'PAID' ? '#166534' : '#92400e', padding: '4px 10px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 800 }}>
                    {o.status === 'PAID' ? 'Đã thanh toán' : 'Chờ xác nhận'}
                  </span>
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    {o.status !== 'PAID' && (
                      <button onClick={() => handleConfirmOrder(o.id)} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', background: '#10b981', color: '#ffffff', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>
                        Kích hoạt
                      </button>
                    )}
                    <button onClick={() => setEditingOrder({ ...o })} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', background: '#eff6ff', color: '#1d4ed8', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>
                      Gia hạn / Sửa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Gia hạn / Chỉnh sửa Đơn hàng */}
      {editingOrder && (
        <div onClick={() => setEditingOrder(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 1000 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', borderRadius: 20, maxWidth: 440, width: '100%', padding: 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Điều chỉnh Đơn hàng #{editingOrder.id}</h3>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6 }}>Ngày hết hạn gói dịch vụ</label>
              <input type="date" value={editingOrder.endDate} onChange={(e) => setEditingOrder({ ...editingOrder, endDate: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6 }}>Trạng thái thanh toán</label>
              <select value={editingOrder.status} onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1px solid #cbd5e1', fontWeight: 700 }}>
                <option value="PAID">Đã thanh toán (PAID)</option>
                <option value="PENDING">Chờ xác nhận (PENDING)</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setEditingOrder(null)} style={{ padding: '9px 16px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>Hủy</button>
              <button onClick={handleSaveEditOrder} style={{ padding: '9px 18px', borderRadius: 10, border: 'none', background: '#1d4ed8', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>Lưu thay đổi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}