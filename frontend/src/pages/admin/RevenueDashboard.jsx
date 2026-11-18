// File: frontend/src/pages/admin/RevenueDashboard.jsx
// Chức năng: Tổng quan Hệ thống, Biểu đồ cột đỏ tương tác theo ngày, Cơ cấu 4 Actor & Nhật ký Hoạt động
// Đồng bộ giao diện từ AdminDashboard.jsx của PlanbookAI-main, tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';

const RevenueDashboard = () => {
  const [selectedDays, setSelectedDays] = useState(7);

  // Dữ liệu tần suất hoạt động & doanh thu 7 ngày qua
  const dailyStats = [
    {
      date: '12/11/2026',
      label: 'Thứ 5',
      activities: 42,
      revenue: '1.980.000 VNĐ',
      logs: [
        { id: 1, time: '08:15:20', user: 'teacher@planbookai.vn', action: 'Soạn Giáo án AI Bài 1: Cấu tạo nguyên tử (Lớp 10)', status: 'Thành công' },
        { id: 2, time: '10:30:05', user: 'staff@planbookai.vn', action: 'Gửi duyệt 15 câu hỏi Hóa 12 Chương Ester', status: 'Thành công' },
      ],
    },
    {
      date: '13/11/2026',
      label: 'Thứ 6',
      activities: 65,
      revenue: '2.970.000 VNĐ',
      logs: [
        { id: 3, time: '09:10:12', user: 'manager@planbookai.vn', action: 'Phê duyệt Mẫu Giáo án 5512: Phản ứng Oxi hóa - Khử', status: 'Thành công' },
        { id: 4, time: '14:22:40', user: 'teacher@planbookai.vn', action: 'Trộn 4 Mã đề (101 - 104) Kiểm tra Giữa kỳ Hóa 10', status: 'Thành công' },
      ],
    },
    {
      date: '14/11/2026',
      label: 'Thứ 7',
      activities: 58,
      revenue: '2.450.000 VNĐ',
      logs: [
        { id: 5, time: '11:05:00', user: 'teacher@planbookai.vn', action: 'Quét OCR lô 35 phiếu trả lời trắc nghiệm Lớp 10A1', status: 'Thành công' },
      ],
    },
    {
      date: '15/11/2026',
      label: 'Chủ Nhật',
      activities: 35,
      revenue: '1.490.000 VNĐ',
      logs: [
        { id: 6, time: '20:00:00', user: 'admin@planbookai.vn', action: 'Sao lưu Cơ sở dữ liệu MySQL (Prisma Snapshot)', status: 'Thành công' },
      ],
    },
    {
      date: '16/11/2026',
      label: 'Thứ 2',
      activities: 88,
      revenue: '4.150.000 VNĐ',
      logs: [
        { id: 7, time: '07:45:10', user: 'teacher@planbookai.vn', action: 'Nâng cấp Gói Vàng - Pro Hóa học (99.000 VNĐ)', status: 'Thành công' },
        { id: 8, time: '15:18:33', user: 'staff@planbookai.vn', action: 'Cập nhật System Prompt: Sinh Đề thi theo Ma trận', status: 'Thành công' },
      ],
    },
    {
      date: '17/11/2026',
      label: 'Thứ 3',
      activities: 76,
      revenue: '3.560.000 VNĐ',
      logs: [
        { id: 9, time: '13:12:45', user: 'manager@planbookai.vn', action: 'Xác nhận đơn hàng #ORD-2026-89 cho Tổ Hóa THPT Lê Hồng Phong', status: 'Thành công' },
      ],
    },
    {
      date: '18/11/2026',
      label: 'Hôm nay',
      activities: 95,
      revenue: '4.950.000 VNĐ',
      logs: [
        { id: 10, time: '08:00:15', user: 'teacher@planbookai.vn', action: 'Xuất Báo cáo Phân tích Tiến bộ Học sinh Lớp 10A1', status: 'Thành công' },
        { id: 11, time: '09:25:50', user: 'manager@planbookai.vn', action: 'Duyệt 20 câu hỏi Vận dụng cao Hóa học 12', status: 'Thành công' },
        { id: 12, time: '14:50:10', user: 'admin@planbookai.vn', action: 'Kiểm tra kết nối Gemini AI Engine & Docker Containers', status: 'Thành công' },
      ],
    },
  ];

  const [selectedDate, setSelectedDate] = useState('18/11/2026');
  const currentDayData = dailyStats.find((d) => d.date === selectedDate) || dailyStats[dailyStats.length - 1];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header giống AdminDashboard.jsx */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            Tổng quan Hệ thống & Doanh thu
          </h1>
          <p style={{ color: '#64748b', marginTop: 6, marginBottom: 0, fontSize: '0.98rem' }}>
            Theo dõi sức khỏe hệ thống, doanh thu gói cước và nhật ký hoạt động theo thời gian thực.
          </p>
        </div>
        <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '8px 16px', borderRadius: 12, fontWeight: 800, fontSize: '0.84rem' }}>
          Server Uptime: 99.99%
        </span>
      </div>

      {/* 4 Thẻ KPI phong cách AdminDashboard.jsx */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {[
          { title: 'Tổng Doanh thu Tháng', value: '48.500.000 VNĐ', change: '+18% so với tháng trước', bg: '#eff6ff', color: '#2563eb' },
          { title: 'Tổng Người dùng (4 Actors)', value: '320', change: '+12% so với tháng trước', bg: '#f5f3ff', color: '#7c3aed' },
          { title: 'Database Size (MySQL)', value: '245 MB', change: '+2% so với tháng trước', bg: '#ecfdf5', color: '#059669' },
          { title: 'Lượt gọi Gemini AI / Ngày', value: '1.420', change: 'Phản hồi TB: 1.2s', bg: '#fffbeb', color: '#d97706' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#ffffff', padding: 22, borderRadius: 20, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
            <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, marginBottom: 6 }}>{stat.title}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1e293b' }}>{stat.value}</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: stat.color, marginTop: 6 }}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Biểu đồ Cột Đỏ Tương tác & Cơ cấu 4 Actor */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        <div style={{ background: '#ffffff', padding: 28, borderRadius: 24, border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                Tần suất Hoạt động Hệ thống
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '4px 0 0 0' }}>
                Nhấp chọn cột bất kỳ để xem nhật ký hoạt động chi tiết trong ngày.
              </p>
            </div>
            <select
              value={selectedDays}
              onChange={(e) => setSelectedDays(Number(e.target.value))}
              style={{ padding: '7px 12px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700, fontSize: '0.82rem' }}
            >
              <option value={7}>7 Ngày qua (Tuần này)</option>
              <option value={30}>30 Ngày qua</option>
            </select>
          </div>

          <div style={{ height: 240, background: '#f8fafc', borderRadius: 18, display: 'flex', alignItems: 'flex-end', padding: '24px 20px 14px', gap: 12, border: '1px solid #f1f5f9' }}>
            {dailyStats.map((day) => {
              const isSelected = day.date === selectedDate;
              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  style={{
                    flex: 1,
                    height: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: 0,
                  }}
                >
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isSelected ? '#ef4444' : '#64748b', marginBottom: 6 }}>
                    {day.activities}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      height: `${day.activities}%`,
                      borderRadius: '8px 8px 0 0',
                      background: isSelected
                        ? 'linear-gradient(to top, #ef4444, #f87171)'
                        : 'linear-gradient(to top, #fca5a5, #fecaca)',
                      boxShadow: isSelected ? '0 8px 16px rgba(239, 68, 68, 0.3)' : 'none',
                      transition: 'all 0.25s',
                    }}
                  />
                  <span
                    style={{
                      marginTop: 8,
                      fontSize: '0.74rem',
                      fontWeight: isSelected ? 800 : 600,
                      color: isSelected ? '#ef4444' : '#64748b',
                      background: isSelected ? '#fee2e2' : 'transparent',
                      padding: '2px 6px',
                      borderRadius: 6,
                    }}
                  >
                    {day.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cơ cấu 4 Actor chuẩn Đề cương */}
        <div style={{ background: '#ffffff', padding: 28, borderRadius: 24, border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Cơ cấu người dùng (4 Actors)
          </h3>
          {[
            { name: 'Giáo viên (Teacher)', count: 285, color: '#3b82f6', percent: 89 },
            { name: 'Nhân viên (Staff)', count: 25, color: '#10b981', percent: 8 },
            { name: 'Quản lý vận hành (Manager)', count: 7, color: '#8b5cf6', percent: 2 },
            { name: 'Admin tối cao', count: 3, color: '#ef4444', percent: 1 },
          ].map((role, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700 }}>
                <span style={{ color: '#475569' }}>{role.name}</span>
                <span style={{ color: '#1e293b' }}>{role.count} ({role.percent}%)</span>
              </div>
              <div style={{ width: '100%', height: 9, background: '#f1f5f9', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ width: `${role.percent}%`, height: '100%', background: role.color, borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chi tiết Nhật ký Hoạt động theo ngày được chọn */}
      <div style={{ background: '#ffffff', padding: 28, borderRadius: 24, border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 16, marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1e293b', margin: 0 }}>
            Chi tiết Nhật ký Hoạt động - {currentDayData.label} ({currentDayData.date}) • Doanh thu: {currentDayData.revenue}
          </h3>
          <span style={{ background: '#fee2e2', color: '#ef4444', padding: '5px 14px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 800 }}>
            {currentDayData.logs.length} hoạt động ghi nhận
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {currentDayData.logs.map((log) => (
            <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, padding: '14px 18px', background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.94rem' }}>{log.action}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 4 }}>
                  Thực hiện bởi: <b>{log.user}</b>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 800 }}>
                  {log.status}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', fontFamily: 'monospace' }}>
                  {log.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;