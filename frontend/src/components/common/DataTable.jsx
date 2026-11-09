import React from 'react';

// Component Bảng dữ liệu chuẩn hóa dùng cho Quản lý User, Đơn hàng, Ngân hàng câu hỏi
// columns: mảng cấu hình cột [{ header: 'Tên cột', accessor: 'tên_trường', render: hàm_vẽ_riêng }]
// data: mảng dữ liệu các dòng
export default function DataTable({ columns, data, emptyMessage = 'Chưa có dữ liệu nào.' }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        {/* Phần đầu bảng (Header) */}
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase text-slate-600">
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3.5">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        {/* Phần thân bảng (Body) */}
        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
          {data && data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr key={row.id || rowIdx} className="hover:bg-slate-50/80 transition">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-4 py-3">
                    {/* Nếu cột có hàm render riêng (ví dụ vẽ nhãn màu) thì gọi hàm render, ngược lại in giá trị chữ */}
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}