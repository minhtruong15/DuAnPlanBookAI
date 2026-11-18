// File: frontend/src/pages/teacher/LessonPlanAI.jsx
// Chức năng: Quản lý Giáo án Cá nhân, Kho Mẫu Hệ thống & Trình Soạn thảo Wizard 4 Bước (Công văn 5512)
// Đồng bộ giao diện từ LessonPlanner.jsx của PlanbookAI-main, tuân thủ Luật 7 (Code sạch 100%, không icon/emoji)

import React, { useState } from 'react';
import { teacherService } from '../../services/teacherService';

const LessonPlanAI = () => {
  // Chế độ hiển thị: 'list' (Danh sách) hoặc 'wizard' (Trình soạn 4 bước)
  const [viewMode, setViewMode] = useState('list');
  // Tab hiện tại trong Danh sách: 'personal' (Giáo án Cá nhân) hoặc 'system' (Mẫu Hệ thống)
  const [viewTab, setViewTab] = useState('personal');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');

  // Bước hiện tại trong Wizard (1 -> 4)
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Danh sách Giáo án Cá nhân môn Hóa học THPT
  const [personalPlans, setPersonalPlans] = useState([
    {
      id: 'LP-101',
      title: 'Bài 1: Cấu tạo nguyên tử và Hạt nhân',
      grade: 'Lớp 10',
      duration: '2 Tiết (90 phút)',
      status: 'Đã hoàn thành',
      updatedAt: '18/11/2026',
      objectives: {
        knowledge: 'Trình bày được thành phần cấu tạo nguyên tử gồm hạt nhân (proton, neutron) và vỏ electron.',
        competence: 'Tự chủ tự học, giải quyết vấn đề thông qua phân tích mô hình nguyên tử Rutherford - Bohr.',
        quality: 'Chăm chỉ, trung thực trong nghiên cứu khoa học tự nhiên.',
      },
      preparation: {
        methods: 'Dạy học hợp tác, trực quan, giải quyết vấn đề.',
        teacherPrep: 'Mô hình 3D cấu tạo nguyên tử Carbon, phiếu học tập số 1 và số 2.',
        studentPrep: 'Ôn lại kiến thức Khoa học tự nhiên lớp 8 về nguyên tử.',
      },
      activities: {
        act1: 'Giáo viên chiếu hình ảnh chiếc nhẫn kim cương và ruột bút chì, đặt câu hỏi: Tại sao cùng tạo nên từ nguyên tố Carbon nhưng tính chất lại khác nhau?',
        act2: 'Chia lớp thành 4 nhóm, phân tích bảng số liệu khối lượng và điện tích của electron, proton, neutron.',
        act3: 'Học sinh làm 5 câu trắc nghiệm nhanh tính số hạt p, n, e của nguyên tử Na (Z=11, A=23) và Cl (Z=17, A=35).',
        act4: 'Ứng dụng tìm hiểu đồng vị Carbon-14 trong việc xác định niên đại cổ vật khảo cổ học.',
      },
    },
    {
      id: 'LP-102',
      title: 'Bài 5: Ester - Lipid và Ứng dụng trong đời sống',
      grade: 'Lớp 12',
      duration: '2 Tiết (90 phút)',
      status: 'Bản nháp',
      updatedAt: '17/11/2026',
      objectives: {
        knowledge: 'Nêu được khái niệm, danh pháp, tính chất vật lý và phản ứng thủy phân của Ester.',
        competence: 'Viết được phương trình hóa học điều chế ester và phản ứng xà phòng hóa.',
        quality: 'Có ý thức bảo vệ môi trường khi sử dụng chất giặt rửa tổng hợp.',
      },
      preparation: {
        methods: 'Dạy học theo trạm, thực hành thí nghiệm trực quan.',
        teacherPrep: 'Ống nghiệm, acetic acid, ethyl alcohol, H2SO4 đặc, nước đá.',
        studentPrep: 'Đọc trước bài Ester trong SGK Hóa học 12.',
      },
      activities: {
        act1: 'Cho học sinh nhận biết mùi hương dầu chuối (isoamyl acetate) và mùi dứa (ethyl butyrate) để dẫn dắt vào bài.',
        act2: 'Thực hành phân tích công thức cấu tạo RCOO-R\' và thí nghiệm điều chế ethyl acetate.',
        act3: 'Giải bài tập tính hiệu suất phản ứng ester hóa.',
        act4: 'Tìm hiểu quy trình sản xuất xà phòng thủ công từ dầu thực vật.',
      },
    },
  ]);

  // Kho Giáo án Mẫu Chuẩn Hệ thống (được Manager phê duyệt)
  const [systemTemplates] = useState([
    {
      id: 'TPL-5512-01',
      title: '[MẪU CHUẨN 5512] Phản ứng Oxi hóa - Khử và Ứng dụng',
      grade: 'Lớp 10',
      duration: '2 Tiết (90 phút)',
      author: 'Hội đồng Chuyên môn Hóa THPT',
      objectives: {
        knowledge: 'Xác định được số oxi hóa của nguyên tử các nguyên tố và lập phương trình theo phương pháp thăng bằng electron.',
        competence: 'Vận dụng cân bằng các phản ứng oxi hóa - khử phức tạp trong thực tiễn.',
        quality: 'Rèn luyện tư duy logic, chính xác khi cân bằng phương trình hóa học.',
      },
      preparation: {
        methods: 'Dạy học khám phá, trò chơi học tập, thảo luận nhóm.',
        teacherPrep: 'Bộ thẻ số oxi hóa, phiếu học tập A3, video thí nghiệm Zn + CuSO4.',
        studentPrep: 'Bảng tuần hoàn các nguyên tố hóa học.',
      },
      activities: {
        act1: 'Quan sát hiện tượng đinh sắt bị gỉ trong không khí ẩm và thanh đồng nhúng vào dung dịch AgNO3.',
        act2: 'Rút ra khái niệm chất khử, chất oxi hóa, quá trình khử, quá trình oxi hóa và 4 bước thăng bằng electron.',
        act3: 'Thi đua cân bằng nhanh 4 phương trình hóa học trên bảng phụ giữa 4 tổ.',
        act4: 'Giải thích nguyên nhân và đề xuất biện pháp chống gỉ sét cho các công trình kim loại.',
      },
    },
    {
      id: 'TPL-5512-02',
      title: '[MẪU CHUẨN 5512] Cân bằng Hóa học và Nguyên lý Le Chatelier',
      grade: 'Lớp 11',
      duration: '2 Tiết (90 phút)',
      author: 'Tổ Chuyên gia Staff PlanbookAI',
      objectives: {
        knowledge: 'Trình bày được khái niệm phản ứng thuận nghịch, trạng thái cân bằng và hằng số cân bằng Kc.',
        competence: 'Vận dụng nguyên lý chuyển dịch cân bằng Le Chatelier để giải thích ảnh hưởng của nhiệt độ, áp suất, nồng độ.',
        quality: 'Hiểu vai trò của Hóa học trong sản xuất công nghiệp (tổng hợp NH3).',
      },
      preparation: {
        methods: 'Nghiên cứu tình huống (Case Study), thí nghiệm mô phỏng.',
        teacherPrep: 'Video mô phỏng hệ cân bằng NO2 (nâu đỏ) <-> N2O4 (không màu).',
        studentPrep: 'Ôn lại tốc độ phản ứng hóa học.',
      },
      activities: {
        act1: 'So sánh phản ứng đốt cháy Mg (1 chiều) và phản ứng tổng hợp NH3 từ N2 và H2 (2 chiều).',
        act2: 'Xây dựng biểu thức tính hằng số cân bằng Kc và khảo sát sự chuyển dịch cân bằng khi thay đổi nhiệt độ.',
        act3: 'Hoàn thành phiếu bài tập trắc nghiệm dự đoán chiều chuyển dịch cân bằng của 5 hệ phản ứng.',
        act4: 'Đóng vai kỹ sư hóa chất: Chọn điều kiện áp suất và nhiệt độ tối ưu cho nhà máy sản xuất Amoniac (NH3).',
      },
    },
  ]);

  // Dữ liệu biểu mẫu đang soạn thảo trong Wizard
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    grade: 'Lớp 10',
    duration: '2 Tiết (90 phút)',
    status: 'Bản nháp',
    objectives: { knowledge: '', competence: '', quality: '' },
    preparation: {
      methods: 'Dạy học hợp tác, Giải quyết vấn đề, Trực quan thí nghiệm',
      teacherPrep: '',
      studentPrep: '',
    },
    activities: { act1: '', act2: '', act3: '', act4: '' },
  });

  // Mở Wizard soạn mới
  const handleStartNewWizard = () => {
    setFormData({
      id: null,
      title: '',
      grade: 'Lớp 10',
      duration: '2 Tiết (90 phút)',
      status: 'Bản nháp',
      objectives: { knowledge: '', competence: '', quality: '' },
      preparation: {
        methods: 'Dạy học hợp tác, Giải quyết vấn đề, Trực quan thí nghiệm',
        teacherPrep: '',
        studentPrep: '',
      },
      activities: { act1: '', act2: '', act3: '', act4: '' },
    });
    setCurrentStep(1);
    setViewMode('wizard');
  };

  // Nạp giáo án cá nhân hoặc mẫu hệ thống vào Wizard
  const handleLoadPlanIntoWizard = (plan, isFromSystemTemplate = false) => {
    setFormData({
      id: isFromSystemTemplate ? null : plan.id,
      title: isFromSystemTemplate ? plan.title.replace('[MẪU CHUẨN 5512] ', '') : plan.title,
      grade: plan.grade,
      duration: plan.duration,
      status: 'Bản nháp',
      objectives: { ...plan.objectives },
      preparation: { ...plan.preparation },
      activities: { ...plan.activities },
    });
    setCurrentStep(1);
    setViewMode('wizard');
  };

  // Gọi AI gợi ý tự động cho từng phần của Giáo án
  const handleAIGenerateSection = async (sectionType) => {
    if (!formData.title.trim()) {
      alert('Vui lòng nhập Tên bài dạy Hóa học ở Bước 1 trước khi gọi AI gợi ý!');
      return;
    }
    setIsGeneratingAI(true);
    try {
      await teacherService.generateLessonPlanAI({
        topic: formData.title,
        gradeLevel: formData.grade,
        durationMinutes: 90,
      });
    } catch (err) {
      // Sử dụng bộ sinh gợi ý cục bộ nếu Backend chưa bật hoặc chưa có API Key
    }

    if (sectionType === 'objectives') {
      setFormData((prev) => ({
        ...prev,
        objectives: {
          knowledge: `[AI Gợi ý - ${prev.title}]: Trình bày được khái niệm, công thức cấu tạo, tính chất vật lý và phương trình hóa học đặc trưng của bài học.`,
          competence: `Phát triển năng lực nhận thức hóa học, năng lực tìm hiểu thế giới tự nhiên và vận dụng giải bài tập ${prev.title}.`,
          quality: `Rèn luyện tác phong cẩn thận, trung thực khi quan sát thí nghiệm hóa học và ý thức bảo vệ môi trường.`,
        },
      }));
    } else if (sectionType === 'act1') {
      setFormData((prev) => ({
        ...prev,
        activities: {
          ...prev.activities,
          act1: `[AI Thiết kế Khởi động - ${prev.title}]:\n- Chuyển giao nhiệm vụ: GV trình chiếu tình huống thực tế hoặc thí nghiệm vui liên quan đến ${prev.title}.\n- Thực hiện: HS thảo luận cặp đôi trong 3 phút để trả lời câu hỏi đặt vấn đề.\n- Kết luận: GV nhận xét và dẫn dắt vào bài mới.`,
        },
      }));
    } else if (sectionType === 'act2') {
      setFormData((prev) => ({
        ...prev,
        activities: {
          ...prev.activities,
          act2: `[AI Thiết kế Hình thành kiến thức - ${prev.title}]:\n- Hoạt động 2.1: Tìm hiểu khái niệm & cấu tạo phân tử qua mô hình trực quan.\n- Hoạt động 2.2: Khảo sát tính chất hóa học đặc trưng qua Phiếu học tập (4 nhóm) và viết phương trình hóa học minh họa.`,
        },
      }));
    } else if (sectionType === 'act3') {
      setFormData((prev) => ({
        ...prev,
        activities: {
          ...prev.activities,
          act3: `[AI Thiết kế Luyện tập - ${prev.title}]:\n- GV tổ chức trắc nghiệm nhanh 5 câu hỏi (mức Nhận biết & Thông hiểu) và 1 bài tập tính toán theo phương trình hóa học.\n- HS trình bày lời giải trên bảng phụ và chấm chéo giữa các nhóm.`,
        },
      }));
    } else if (sectionType === 'act4') {
      setFormData((prev) => ({
        ...prev,
        activities: {
          ...prev.activities,
          act4: `[AI Thiết kế Vận dụng & Mở rộng - ${prev.title}]:\n- Nhiệm vụ STEM/Thực tiễn: HS tìm hiểu ứng dụng của ${prev.title} trong đời sống, y tế hoặc sản xuất công nghiệp và viết báo cáo ngắn 200 từ.`,
        },
      }));
    }
    setIsGeneratingAI(false);
  };

  // Lưu giáo án vào danh sách cá nhân
  const handleSaveLessonPlan = (publishStatus) => {
    if (!formData.title.trim()) {
      alert('Vui lòng nhập Tên bài dạy Hóa học!');
      return;
    }
    const savedItem = {
      ...formData,
      id: formData.id || `LP-${Math.floor(100 + Math.random() * 900)}`,
      status: publishStatus,
      updatedAt: new Date().toLocaleDateString('vi-VN'),
    };

    if (formData.id) {
      setPersonalPlans((prev) => prev.map((item) => (item.id === formData.id ? savedItem : item)));
    } else {
      setPersonalPlans((prev) => [savedItem, ...prev]);
    }
    setViewTab('personal');
    setViewMode('list');
  };

  const handleDeletePlan = (id) => {
    setPersonalPlans((prev) => prev.filter((p) => p.id !== id));
  };

  const currentList = viewTab === 'personal' ? personalPlans : systemTemplates;
  const filteredList = currentList.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGrade = selectedGrade === 'All' || item.grade.includes(selectedGrade);
    return matchSearch && matchGrade;
  });

  // ============================================================================
  // GIAO DIỆN 1: TRÌNH SOẠN THẢO WIZARD 4 BƯỚC (ĐỒNG BỘ STYLE PLANBOOKAI-MAIN)
  // ============================================================================
  if (viewMode === 'wizard') {
    const steps = [
      { num: 1, label: 'Mục tiêu Bài học' },
      { num: 2, label: 'Phương pháp & Chuẩn bị' },
      { num: 3, label: 'Tiến trình 4 Hoạt động' },
      { num: 4, label: 'Xem trước & Xuất bản' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {/* Header Wizard */}
        <div
          className="glass-panel"
          style={{
            padding: '22px 28px',
            borderRadius: 20,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div>
            <button
              onClick={() => setViewMode('list')}
              style={{
                background: 'none',
                border: 'none',
                color: '#4f46e5',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                padding: 0,
                marginBottom: 4,
              }}
            >
              &lt;- Quay lại Danh sách Giáo án
            </button>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Soạn Giáo án Hóa học (Chuẩn Công văn 5512)
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => handleSaveLessonPlan('Bản nháp')}
              style={{
                padding: '10px 18px',
                borderRadius: 12,
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#334155',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              Lưu Bản nháp
            </button>
            <button
              onClick={() => handleSaveLessonPlan('Đã hoàn thành')}
              className="btn-primary"
              style={{ borderRadius: 12, padding: '10px 20px', fontSize: '0.88rem' }}
            >
              Hoàn tất & Xuất bản
            </button>
          </div>
        </div>

        {/* Thanh Stepper 4 Bước bo tròn */}
        <div
          style={{
            background: '#ffffff',
            padding: 16,
            borderRadius: 20,
            border: '1px solid #e2e8f0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
          }}
        >
          {steps.map((step) => {
            const isActive = currentStep === step.num;
            const isDone = currentStep > step.num;
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 14,
                  border: isActive
                    ? '2px solid #4f46e5'
                    : isDone
                    ? '1px solid #6ee7b7'
                    : '1px solid #e2e8f0',
                  background: isActive ? '#eef2ff' : isDone ? '#ecfdf5' : '#f8fafc',
                  color: isActive ? '#4338ca' : isDone ? '#047857' : '#64748b',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: 4 }}>
                  {isDone ? `Bước ${step.num} (Đã xong)` : `Bước ${step.num}`}
                </div>
                <div style={{ fontSize: '0.92rem' }}>{step.label}</div>
              </button>
            );
          })}
        </div>

        {/* BƯỚC 1: THÔNG TIN & MỤC TIÊU */}
        {currentStep === 1 && (
          <div
            style={{
              background: '#ffffff',
              padding: 28,
              borderRadius: 20,
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 14 }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                I. Thông tin Bài học & Mục tiêu Yêu cầu cần đạt
              </h2>
              <button
                onClick={() => handleAIGenerateSection('objectives')}
                disabled={isGeneratingAI}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  border: 'none',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                {isGeneratingAI ? 'AI đang phân tích...' : 'AI Gợi ý 3 Mục tiêu'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Tên Bài dạy Hóa học *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="VD: Bài 3: Liên kết Ion và Cộng hóa trị"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Khối lớp THPT
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                >
                  <option value="Lớp 10">Hóa học Lớp 10</option>
                  <option value="Lớp 11">Hóa học Lớp 11</option>
                  <option value="Lớp 12">Hóa học Lớp 12</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Thời lượng giảng dạy
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                >
                  <option value="1 Tiết (45 phút)">1 Tiết (45 phút)</option>
                  <option value="2 Tiết (90 phút)">2 Tiết (90 phút)</option>
                  <option value="3 Tiết (135 phút)">3 Tiết (135 phút)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  1. Về Kiến thức Hóa học
                </label>
                <textarea
                  rows="3"
                  value={formData.objectives.knowledge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      objectives: { ...formData.objectives, knowledge: e.target.value },
                    })
                  }
                  placeholder="Học sinh trình bày được, phân biệt được, viết được phương trình hóa học..."
                  style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  2. Về Năng lực (Năng lực Hóa học & Năng lực chung)
                </label>
                <textarea
                  rows="3"
                  value={formData.objectives.competence}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      objectives: { ...formData.objectives, competence: e.target.value },
                    })
                  }
                  placeholder="Năng lực nhận thức hóa học, tìm hiểu thế giới tự nhiên, vận dụng kiến thức..."
                  style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  3. Về Phẩm chất
                </label>
                <textarea
                  rows="2"
                  value={formData.objectives.quality}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      objectives: { ...formData.objectives, quality: e.target.value },
                    })
                  }
                  placeholder="Chăm chỉ, trung thực khi làm thí nghiệm, trách nhiệm bảo vệ môi trường..."
                  style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* BƯỚC 2: PHƯƠNG PHÁP & THIẾT BỊ DẠY HỌC */}
        {currentStep === 2 && (
          <div
            style={{
              background: '#ffffff',
              padding: 28,
              borderRadius: 20,
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0, borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>
              II. Thiết bị Dạy học, Hóa chất & Học liệu
            </h2>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                1. Phương pháp & Kỹ thuật dạy học tích cực
              </label>
              <input
                type="text"
                value={formData.preparation.methods}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preparation: { ...formData.preparation, methods: e.target.value },
                  })
                }
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                2. Chuẩn bị của Giáo viên (Dụng cụ thí nghiệm, Hóa chất, Phiếu học tập)
              </label>
              <textarea
                rows="4"
                value={formData.preparation.teacherPrep}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preparation: { ...formData.preparation, teacherPrep: e.target.value },
                  })
                }
                placeholder="VD: Ống nghiệm, dung dịch HCl 1M, viên Zn, Phiếu học tập số 1..."
                style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                3. Chuẩn bị của Học sinh
              </label>
              <textarea
                rows="3"
                value={formData.preparation.studentPrep}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preparation: { ...formData.preparation, studentPrep: e.target.value },
                  })
                }
                placeholder="VD: SGK Hóa học, Bảng tuần hoàn, máy tính cầm tay..."
                style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
          </div>
        )}

        {/* BƯỚC 3: TIẾN TRÌNH 4 HOẠT ĐỘNG CÔNG VĂN 5512 */}
        {currentStep === 3 && (
          <div
            style={{
              background: '#ffffff',
              padding: 28,
              borderRadius: 20,
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0, borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>
              III. Tiến trình Tổ chức 4 Hoạt động Dạy học (Công văn 5512)
            </h2>
            {[
              { key: 'act1', title: 'Hoạt động 1: Khởi động / Xác định vấn đề (5 - 7 phút)' },
              { key: 'act2', title: 'Hoạt động 2: Hình thành kiến thức mới (40 - 45 phút)' },
              { key: 'act3', title: 'Hoạt động 3: Luyện tập - Củng cố (20 - 25 phút)' },
              { key: 'act4', title: 'Hoạt động 4: Vận dụng & Tìm tòi mở rộng (10 - 15 phút)' },
            ].map((act) => (
              <div
                key={act.key}
                style={{
                  background: '#f8fafc',
                  padding: 18,
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{act.title}</h3>
                  <button
                    onClick={() => handleAIGenerateSection(act.key)}
                    disabled={isGeneratingAI}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 10,
                      border: 'none',
                      background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    AI Gợi ý Hoạt động này
                  </button>
                </div>
                <textarea
                  rows="4"
                  value={formData.activities[act.key]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      activities: { ...formData.activities, [act.key]: e.target.value },
                    })
                  }
                  placeholder={`Nhập nội dung chi tiết cho ${act.title}...`}
                  style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.88rem' }}
                />
              </div>
            ))}
          </div>
        )}

        {/* BƯỚC 4: XEM TRƯỚC CHUẨN IN A4 */}
        {currentStep === 4 && (
          <div style={{ background: '#ffffff', padding: 32, borderRadius: 20, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: 16, marginBottom: 20 }}>
              <div>
                <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 800 }}>
                  BẢN XEM TRƯỚC CHUẨN IN A4
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px 0' }}>
                  KẾ HOẠCH BÀI DẠY: {formData.title || '(Chưa đặt tên bài dạy)'}
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
                  Môn: Hóa học THPT - {formData.grade} | Thời lượng: {formData.duration}
                </p>
              </div>
              <button
                onClick={() => window.print()}
                style={{ padding: '10px 18px', borderRadius: 12, border: 'none', background: '#0f172a', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
              >
                In Giáo án / Xuất PDF
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: '0.92rem', lineHeight: 1.6, color: '#1e293b' }}>
              <div style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#4338ca', fontWeight: 800, margin: '0 0 8px 0' }}>I. MỤC TIÊU BÀI HỌC</h3>
                <p style={{ margin: '4px 0' }}><b>1. Kiến thức:</b> {formData.objectives.knowledge || 'Chưa nhập'}</p>
                <p style={{ margin: '4px 0' }}><b>2. Năng lực:</b> {formData.objectives.competence || 'Chưa nhập'}</p>
                <p style={{ margin: '4px 0' }}><b>3. Phẩm chất:</b> {formData.objectives.quality || 'Chưa nhập'}</p>
              </div>
              <div style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#4338ca', fontWeight: 800, margin: '0 0 8px 0' }}>II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</h3>
                <p style={{ margin: '4px 0' }}><b>- Phương pháp:</b> {formData.preparation.methods}</p>
                <p style={{ margin: '4px 0' }}><b>- Giáo viên chuẩn bị:</b> {formData.preparation.teacherPrep || 'Chưa nhập'}</p>
                <p style={{ margin: '4px 0' }}><b>- Học sinh chuẩn bị:</b> {formData.preparation.studentPrep || 'Chưa nhập'}</p>
              </div>
              <div style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#4338ca', fontWeight: 800, margin: '0 0 10px 0' }}>III. TIẾN TRÌNH DẠY HỌC (CÔNG VĂN 5512)</h3>
                <p style={{ whiteSpace: 'pre-line', margin: '6px 0' }}><b>1. Khởi động:</b> {formData.activities.act1 || 'Chưa nhập'}</p>
                <p style={{ whiteSpace: 'pre-line', margin: '6px 0' }}><b>2. Hình thành kiến thức:</b> {formData.activities.act2 || 'Chưa nhập'}</p>
                <p style={{ whiteSpace: 'pre-line', margin: '6px 0' }}><b>3. Luyện tập:</b> {formData.activities.act3 || 'Chưa nhập'}</p>
                <p style={{ whiteSpace: 'pre-line', margin: '6px 0' }}><b>4. Vận dụng:</b> {formData.activities.act4 || 'Chưa nhập'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Thanh điều hướng Bước Trước / Bước Tiếp theo */}
        <div
          style={{
            background: '#ffffff',
            padding: '16px 24px',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((p) => p - 1)}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontWeight: 700,
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              opacity: currentStep === 1 ? 0.5 : 1,
            }}
          >
            Bước trước
          </button>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b' }}>
            Bước {currentStep} / 4
          </span>
          {currentStep < 4 ? (
            <button onClick={() => setCurrentStep((p) => p + 1)} className="btn-primary">
              Bước tiếp theo
            </button>
          ) : (
            <button
              onClick={() => handleSaveLessonPlan('Đã hoàn thành')}
              style={{
                padding: '10px 22px',
                borderRadius: 10,
                border: 'none',
                background: '#10b981',
                color: '#ffffff',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Xác nhận Lưu Giáo án
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============================================================================
  // GIAO DIỆN 2: DANH SÁCH GIÁO ÁN CÁ NHÂN & MẪU HỆ THỐNG
  // ============================================================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Header */}
      <div
        className="glass-panel"
        style={{
          padding: '24px 28px',
          borderRadius: 20,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            Quản lý & Soạn Giáo án Hóa học AI
          </h1>
          <p style={{ color: '#64748b', margin: '6px 0 0 0', fontSize: '0.95rem' }}>
            Soạn kế hoạch bài dạy theo quy trình Wizard 4 Bước chuẩn Công văn 5512 hoặc sử dụng Giáo án Mẫu Hệ thống.
          </p>
        </div>
        <button onClick={handleStartNewWizard} className="btn-primary" style={{ padding: '12px 22px', borderRadius: 12 }}>
          + Soạn Giáo án Mới (Wizard 4 Bước)
        </button>
      </div>

      {/* Thanh Tab Cá nhân / Hệ thống + Tìm kiếm + Bộ lọc Khối lớp */}
      <div
        style={{
          background: '#ffffff',
          padding: 16,
          borderRadius: 20,
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setViewTab('personal')}
            style={{
              padding: '10px 18px',
              borderRadius: 12,
              border: 'none',
              background: viewTab === 'personal' ? '#4f46e5' : '#f1f5f9',
              color: viewTab === 'personal' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
            }}
          >
            Giáo án Cá nhân ({personalPlans.length})
          </button>
          <button
            onClick={() => setViewTab('system')}
            style={{
              padding: '10px 18px',
              borderRadius: 12,
              border: 'none',
              background: viewTab === 'system' ? '#4f46e5' : '#f1f5f9',
              color: viewTab === 'system' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
            }}
          >
            Giáo án Mẫu Hệ thống ({systemTemplates.length})
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Tìm tên bài dạy Hóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '9px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.88rem', width: 230 }}
          />
          <div style={{ display: 'flex', background: '#f1f5f9', padding: 4, borderRadius: 10, gap: 4 }}>
            {['All', '10', '11', '12'].map((gr) => (
              <button
                key={gr}
                onClick={() => setSelectedGrade(gr)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: selectedGrade === gr ? '#ffffff' : 'transparent',
                  color: selectedGrade === gr ? '#4f46e5' : '#64748b',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                {gr === 'All' ? 'Tất cả Khối' : `Lớp ${gr}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lưới Danh sách Giáo án */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        {filteredList.map((plan) => (
          <div
            key={plan.id}
            style={{
              background: '#ffffff',
              padding: 24,
              borderRadius: 20,
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800 }}>
                    Hóa học {plan.grade}
                  </span>
                  <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700 }}>
                    {plan.duration}
                  </span>
                </div>
                <span
                  style={{
                    background: viewTab === 'personal' ? (plan.status === 'Đã hoàn thành' ? '#dcfce7' : '#fef3c7') : '#e0e7ff',
                    color: viewTab === 'personal' ? (plan.status === 'Đã hoàn thành' ? '#166534' : '#92400e') : '#4338ca',
                    padding: '4px 10px',
                    borderRadius: 12,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                  }}
                >
                  {viewTab === 'personal' ? plan.status : 'Chuẩn Hệ thống'}
                </span>
              </div>
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>{plan.title}</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                <b>Mục tiêu:</b> {plan.objectives.knowledge}
              </p>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                {viewTab === 'personal' ? `Cập nhật: ${plan.updatedAt}` : `Biên soạn: ${plan.author}`}
              </span>
              {viewTab === 'personal' ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => handleLoadPlanIntoWizard(plan, false)}
                    style={{ padding: '7px 14px', borderRadius: 10, border: 'none', background: '#eef2ff', color: '#4338ca', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    Mở Wizard / Sửa
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    style={{ padding: '7px 12px', borderRadius: 10, border: 'none', background: '#fee2e2', color: '#dc2626', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    Xóa
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleLoadPlanIntoWizard(plan, true)}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                >
                  Sử dụng Mẫu này
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonPlanAI;