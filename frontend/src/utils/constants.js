// Định nghĩa 4 Tác nhân (4 Actors) chuẩn của hệ thống PlanbookAI
export const ROLES = {
  ADMIN: 'ADMIN',       // Quản trị viên hệ thống
  MANAGER: 'MANAGER',   // Quản lý gói cước, đơn hàng & duyệt nội dung
  STAFF: 'STAFF',       // Nhân viên xây dựng học liệu mẫu & prompt AI
  TEACHER: 'TEACHER',   // Giáo viên Hóa học THPT
};

// Danh sách Khối lớp và Chủ đề môn Hóa học THPT (Theo Chương trình GDPT 2018)
export const CHEMISTRY_TOPICS = {
  10: [
    'Cấu tạo nguyên tử',
    'Bảng tuần hoàn các nguyên tố hóa học',
    'Liên kết hóa học',
    'Phản ứng oxi hóa - khử',
    'Năng lượng hóa học',
    'Tốc độ phản ứng hóa học',
    'Nguyên tố nhóm VIIA (Halogen)',
  ],
  11: [
    'Cân bằng hóa học',
    'Nitrogen và Sulfur',
    'Đại cương hóa học hữu cơ',
    'Hydrocarbon (Alkane, Alkene, Alkyne, Arene)',
    'Dẫn xuất Halogen - Alcohol - Phenol',
    'Hợp chất Carbonyl (Aldehyde - Ketone) - Carboxylic Acid',
  ],
  12: [
    'Ester - Lipid',
    'Carbohydrate (Glucose, Fructose, Saccharose, Tinh bột, Cellulose)',
    'Hợp chất chứa Nitrogen (Amine, Amino acid, Peptide, Protein)',
    'Polymer và Vật liệu Polymer',
    'Pin điện và Điện phân',
    'Đại cương về Kim loại & Hợp kim',
    'Nguyên tố nhóm IA và nhóm IIA',
  ],
};

// 3 Mức độ nhận thức chuẩn dùng để phân loại Ngân hàng câu hỏi & Tạo đề thi
export const DIFFICULTY_LEVELS = [
  { value: 'NHAN_BIET', label: 'Nhận biết', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'THONG_HIEU', label: 'Thông hiểu', color: 'bg-blue-100 text-blue-700' },
  { value: 'VAN_DUNG', label: 'Vận dụng', color: 'bg-amber-100 text-amber-700' },
];