import bcrypt from 'bcryptjs';
import prisma from '../src/config/database.js';

// Hàm kịch bản nạp dữ liệu mồi (Seed Data) chuẩn môn Hóa học THPT vào 10 bảng MySQL
async function main() {
  console.log('🌱 Bắt đầu nạp dữ liệu mẫu môn Hóa học THPT cho PlanbookAI...');

  // 1. Tạo mật khẩu mặc định "123456" đã mã hóa bằng bcrypt cho cả 4 tài khoản mẫu
  const passwordHash = await bcrypt.hash('123456', 10);

  // 2. Nạp 4 tài khoản đại diện cho 4 Actors (ADMIN, MANAGER, STAFF, TEACHER)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@planbookai.vn' },
    update: {},
    create: {
      fullName: 'Quản trị viên Hệ thống',
      email: 'admin@planbookai.vn',
      passwordHash,
      role: 'ADMIN',
      aiCredits: 9999,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@planbookai.vn' },
    update: {},
    create: {
      fullName: 'Trưởng phòng Quản lý Nội dung & Gói cước',
      email: 'manager@planbookai.vn',
      passwordHash,
      role: 'MANAGER',
      aiCredits: 999,
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: 'staff@planbookai.vn' },
    update: {},
    create: {
      fullName: 'Chuyên viên Học liệu Hóa học',
      email: 'staff@planbookai.vn',
      passwordHash,
      role: 'STAFF',
      aiCredits: 500,
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@planbookai.vn' },
    update: {},
    create: {
      fullName: 'Thầy Nguyễn Văn Hóa',
      email: 'teacher@planbookai.vn',
      passwordHash,
      role: 'TEACHER',
      schoolName: 'THPT Chuyên Lê Hồng Phong',
      aiCredits: 150,
    },
  });

  // 3. Nạp 3 Gói dịch vụ thuê bao (Bảng Package)
  await prisma.package.createMany({
    data: [
      { name: 'Gói Cơ bản (Trải nghiệm)', priceVND: 0, aiCredits: 50, durationDays: 30 },
      { name: 'Gói Pro Giáo viên Hóa học', priceVND: 299000, aiCredits: 300, durationDays: 180 },
      { name: 'Gói Tổ Bộ môn Hóa THPT', priceVND: 999000, aiCredits: 1500, durationDays: 365 },
    ],
    skipDuplicates: true,
  });

  // 4. Nạp Khung chương trình Giáo án chuẩn Công văn 5512 (Bảng CurriculumFramework)
  await prisma.curriculumFramework.createMany({
    data: [
      {
        grade: 10,
        subject: 'Hóa học',
        title: 'Khung Kế hoạch bài dạy Hóa học 10 - Công văn 5512',
        structure: 'I. Mục tiêu (Kiến thức, Năng lực hóa học, Phẩm chất) -> II. Thiết bị dạy học & Học liệu -> III. Tiến trình dạy học (HĐ1: Mở đầu, HĐ2: Hình thành kiến thức mới, HĐ3: Luyện tập, HĐ4: Vận dụng)',
      },
      {
        grade: 12,
        subject: 'Hóa học',
        title: 'Khung Kế hoạch bài dạy Hóa học 12 - Công văn 5512',
        structure: 'I. Mục tiêu -> II. Học liệu thí nghiệm Hóa 12 -> III. Tiến trình 4 hoạt động chuẩn Bộ GD&ĐT',
      },
    ],
  });

  // 5. Nạp Mẫu câu lệnh Prompt AI chuẩn (Bảng PromptTemplate)
  await prisma.promptTemplate.createMany({
    data: [
      {
        name: 'Prompt Soạn Giáo án Hóa học Công văn 5512',
        category: 'LESSON_PLAN',
        promptContent: 'Bạn là Chuyên gia Sư phạm Hóa học THPT. Hãy soạn giáo án chuẩn Công văn 5512 cho môn Hóa học lớp {{grade}}, bài "{{topic}}" gồm đầy đủ Mục tiêu và 4 Hoạt động dạy học.',
        approvalStatus: 'APPROVED',
      },
      {
        name: 'Prompt Tạo Bài tập Hóa học phân hóa 3 mức độ',
        category: 'EXERCISE',
        promptContent: 'Hãy tạo bộ bài tập Hóa học lớp {{grade}} chủ đề "{{topic}}" ở mức độ {{level}} kèm phương trình phản ứng và lời giải chi tiết.',
        approvalStatus: 'APPROVED',
      },
    ],
  });

  // 6. Nạp Bộ câu hỏi trắc nghiệm Hóa học THPT mẫu (Bảng Question - Đủ khối 10, 11, 12)
  await prisma.question.createMany({
    data: [
      {
        creatorId: staff.id,
        grade: 10,
        topic: 'Cấu tạo nguyên tử',
        difficulty: 'NHAN_BIET',
        content: 'Hạt mang điện tích dương trong hạt nhân nguyên tử là hạt nào sau đây?',
        optionA: 'Proton (p)',
        optionB: 'Neutron (n)',
        optionC: 'Electron (e)',
        optionD: 'Phân tử',
        correctAnswer: 'A',
        explanation: 'Hạt nhân nguyên tử cấu tạo bởi hạt Proton mang điện dương (+) và Neutron không mang điện.',
        approvalStatus: 'APPROVED',
      },
      {
        creatorId: staff.id,
        grade: 11,
        topic: 'Cân bằng hóa học',
        difficulty: 'THONG_HIEU',
        content: 'Dung dịch chất nào sau đây làm quỳ tím chuyển sang màu đỏ?',
        optionA: 'NaOH',
        optionB: 'H2SO4 loãng',
        optionC: 'NaCl',
        optionD: 'K2SO4',
        correctAnswer: 'B',
        explanation: 'H2SO4 là acid mạnh, phân li ra ion H+ làm quỳ tím hóa đỏ.',
        approvalStatus: 'APPROVED',
      },
      {
        creatorId: teacher.id,
        grade: 12,
        topic: 'Ester - Lipid',
        difficulty: 'VAN_DUNG',
        content: 'Thủy phân hoàn toàn 8,8 gam Ethyl acetate (CH3COOC2H5) trong dung dịch NaOH dư đun nóng, thu được bao nhiêu gam muối Sodium acetate (CH3COONa)?',
        optionA: '8,2 gam',
        optionB: '4,6 gam',
        optionC: '9,6 gam',
        optionD: '12,4 gam',
        correctAnswer: 'A',
        explanation: 'Số mol CH3COOC2H5 (M=88) = 8,8 / 88 = 0,1 mol. Phương trình: CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH. Khối lượng muối CH3COONa (M=82) = 0,1 * 82 = 8,2 gam.',
        approvalStatus: 'APPROVED',
      },
    ],
  });

  console.log('✅ Đã nạp thành công toàn bộ dữ liệu mồi Hóa học THPT cho 4 Actors!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi nạp dữ liệu seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });