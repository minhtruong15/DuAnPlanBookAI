import React from 'react';
import DataTable from '../../components/common/DataTable';

export default function StudentAnalytics() {
  // Danh sách kết quả học tập môn Hóa học của học sinh sau các đợt chấm OCR
  const studentRecords = [
    {
      id: 1,
      studentName: 'Trần Minh Khôi',
      className: '12A1',
      examCode: '101',
      score: 9.0,
      weakTopic: 'Không có (Nắm vững toàn diện)',
      rank: 'Giỏi',
    },
    {
      id: 2,
      studentName: 'Nguyễn Thị Mai Anh',
      className: '12A1',
      examCode: '102',
      score: 7.5,
      weakTopic: 'Pin điện và Điện phân',
      rank: 'Khá',
    },
    {
      id: 3,
      studentName: 'Lê Hoàng Nam',
      className: '12A1',
      examCode: '101',
      score: 5.5,
      weakTopic: 'Bài toán Thủy phân Ester vận dụng',
      rank: 'Đạt',
    },
    {
      id: 4,
      studentName: 'Phạm Gia Bảo',
      className: '12A1',
      examCode: '102',
      score: 8.5,
      weakTopic: 'Polymer và Vật liệu Polymer',
      rank: 'Giỏi',
    },
  ];

  const columns = [
    { header: 'Họ và tên Học sinh', accessor: 'studentName' },
    { header: 'Lớp', accessor: 'className' },
    { header: 'Mã đề đã làm', accessor: 'examCode' },
    {
      header: 'Điểm số OCR',
      accessor: 'score',
      render: (row) => <span className="font-bold text-indigo-700">{row.score} / 10</span>,
    },
    { header: 'Chủ đề Hóa học cần củng cố thêm', accessor: 'weakTopic' },
    {
      header: 'Xếp loại học lực',
      accessor: 'rank',
      render: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
            row.rank === 'Giỏi'
              ? 'bg-emerald-100 text-emerald-700'
              : row.rank === 'Khá'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {row.rank}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Theo Dõi Điểm Số & Phân Tích Học Tập Học Sinh</h2>
        <p className="text-sm text-slate-500 mt-1">
          Thống kê phổ điểm từ kết quả chấm OCR và phát hiện sớm các chuyên đề Hóa học học sinh còn yếu
        </p>
      </div>

      {/* 3 Thẻ chỉ số học tập của lớp */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-500">Điểm trung bình toàn lớp</div>
          <div className="text-2xl font-bold text-indigo-700 mt-2">7.63 / 10</div>
          <div className="text-xs text-slate-400 mt-1">Tăng +0.8 điểm so với bài kiểm tra trước</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-500">Tỷ lệ học sinh Khá - Giỏi</div>
          <div className="text-2xl font-bold text-emerald-700 mt-2">75.0%</div>
          <div className="text-xs text-slate-400 mt-1">3/4 học sinh đạt từ 7.0 điểm trở lên</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-500">Chuyên đề sai nhiều nhất</div>
          <div className="text-lg font-bold text-amber-700 mt-2">Pin điện & Điện phân (Hóa 12)</div>
          <div className="text-xs text-slate-400 mt-1">Đề xuất: Tạo thêm bài tập thông minh mức Thông hiểu</div>
        </div>
      </div>

      {/* Bảng chi tiết điểm số và phân tích từng học sinh */}
      <div>
        <h3 className="text-base font-bold text-slate-800 mb-3">Bảng tổng hợp kết quả học tập cá nhân hóa</h3>
        <DataTable columns={columns} data={studentRecords} />
      </div>
    </div>
  );
}