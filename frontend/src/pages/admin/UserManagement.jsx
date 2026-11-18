import React, { useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { adminService } from '../../services/adminService';

export default function UserManagement() {
  // Danh sách người dùng đại diện cho 4 Actors trong hệ thống
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: 'Quản trị viên Hệ thống',
      email: 'admin@planbookai.vn',
      role: 'ADMIN',
      schoolName: 'Ban Quản trị PlanbookAI',
      aiCredits: 9999,
      isActive: true,
    },
    {
      id: 2,
      fullName: 'Trưởng phòng Quản lý Nội dung',
      email: 'manager@planbookai.vn',
      role: 'MANAGER',
      schoolName: 'Phòng Học liệu & Gói cước',
      aiCredits: 999,
      isActive: true,
    },
    {
      id: 3,
      fullName: 'Chuyên viên Học liệu Hóa học',
      email: 'staff@planbookai.vn',
      role: 'STAFF',
      schoolName: 'Tổ Chuyên môn Hóa THPT',
      aiCredits: 500,
      isActive: true,
    },
    {
      id: 4,
      fullName: 'Thầy Nguyễn Văn Hóa',
      email: 'teacher@planbookai.vn',
      role: 'TEACHER',
      schoolName: 'THPT Chuyên Lê Hồng Phong',
      aiCredits: 150,
      isActive: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    role: 'TEACHER',
    schoolName: '',
    aiCredits: 50,
  });

  // Hàm xử lý thay đổi quyền (Role) của người dùng ngay trên bảng
  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, newRole);
    } catch (err) {
      // Cập nhật trực tiếp trên state khi chạy độc lập
    }
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  // Hàm xử lý Khóa hoặc Mở khóa tài khoản
  const handleToggleActive = (userId) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u)));
  };

  // Hàm xử lý tạo người dùng mới từ Modal của Admin
  const handleCreateUser = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      ...newUser,
      aiCredits: Number(newUser.aiCredits),
      isActive: true,
    };
    setUsers([created, ...users]);
    setNewUser({ fullName: '', email: '', role: 'TEACHER', schoolName: '', aiCredits: 50 });
    setIsModalOpen(false);
  };

  // Lọc danh sách người dùng theo ô tìm kiếm
  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cấu hình các cột cho bảng DataTable
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Họ và tên', accessor: 'fullName' },
    { header: 'Email đăng nhập', accessor: 'email' },
    { header: 'Đơn vị / Trường THPT', accessor: 'schoolName' },
    {
      header: 'Phân quyền (Role)',
      accessor: 'role',
      render: (row) => (
        <select
          value={row.role}
          onChange={(e) => handleRoleChange(row.id, e.target.value)}
          className="px-2.5 py-1 border border-slate-300 rounded text-xs font-semibold bg-white text-slate-800"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
          <option value="STAFF">STAFF</option>
          <option value="TEACHER">TEACHER</option>
        </select>
      ),
    },
    {
      header: 'Credit AI',
      accessor: 'aiCredits',
      render: (row) => <span className="font-semibold text-indigo-700">{row.aiCredits} lượt</span>,
    },
    {
      header: 'Trạng thái',
      accessor: 'isActive',
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded text-xs font-semibold ${
            row.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {row.isActive ? 'Đang hoạt động' : 'Đã khóa'}
        </span>
      ),
    },
    {
      header: 'Thao tác',
      accessor: 'actions',
      render: (row) => (
        <Button
          variant={row.isActive ? 'danger' : 'success'}
          onClick={() => handleToggleActive(row.id)}
          className="px-2.5 py-1 text-xs"
        >
          {row.isActive ? 'Khóa' : 'Mở khóa'}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quản Lý Người Dùng & Phân Quyền RBAC</h2>
          <p className="text-sm text-slate-500 mt-1">
            Tạo mới tài khoản, cấp quyền 4 Actors (Admin, Manager, Staff, Teacher) và quản lý trạng thái hoạt động
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Tạo tài khoản mới</Button>
      </div>

      {/* Thanh tìm kiếm người dùng */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo họ tên hoặc địa chỉ email..."
          className="w-full md:w-96 px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
        />
        <span className="text-xs font-semibold text-slate-500">
          Tổng số: {filteredUsers.length} tài khoản
        </span>
      </div>

      {/* Bảng hiển thị danh sách người dùng */}
      <DataTable columns={columns} data={filteredUsers} />

      {/* Cửa sổ Modal tạo tài khoản mới */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tạo tài khoản người dùng mới"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
            <input
              type="text"
              required
              value={newUser.fullName}
              onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email đăng nhập</label>
            <input
              type="email"
              required
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vai trò (Role)</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="TEACHER">TEACHER (Giáo viên Hóa THPT)</option>
              <option value="STAFF">STAFF (Nhân viên học liệu)</option>
              <option value="MANAGER">MANAGER (Quản lý gói cước & duyệt bài)</option>
              <option value="ADMIN">ADMIN (Quản trị hệ thống)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Đơn vị / Trường THPT</label>
            <input
              type="text"
              required
              value={newUser.schoolName}
              onChange={(e) => setNewUser({ ...newUser, schoolName: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Lưu tài khoản</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}