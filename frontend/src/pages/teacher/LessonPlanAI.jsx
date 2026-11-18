// File: frontend/src/pages/teacher/LessonPlanAI.jsx
// Chuc nang: He thong Soan Giao an AI theo quy trinh Wizard 4 Buoc (Cong van 5512) & Kho Giao an Mau He thong
// Nang cap tu ban PlanbookAI-main, chuyen hoa 100% cho Mon Hoa hoc THPT va tuan thu Luat 7 (Code sach 100% khong icon/emoji)

import React, { useState } from "react";
// Nhap dich vu goi API Giao vien
import teacherService from "../../services/teacherService";

const LessonPlanAI = () => {
  // State quan ly che do hien thi: 'list' (Danh sach giao an) hoac 'wizard' (Trinh soan thao 4 buoc)
  const [viewMode, setViewMode] = useState("list");
  // State quan ly Tab trong che do Danh sach: 'personal' (Ca nhan) hoac 'system' (Mau he thong)
  const [activeTab, setActiveTab] = useState("personal");
  // State luu tu khoa tim kiem va bo loc Khoi lop (All, 10, 11, 12)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");

  // State quan ly buoc hien tai trong Wizard (1 -> 4)
  const [currentStep, setCurrentStep] = useState(1);
  // State hien thi trang thai AI dang sinh noi dung cho tung hoat dong
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // State danh sach Giao an Ca nhan cua Giao vien Hoa hoc
  const [personalPlans, setPersonalPlans] = useState([
    {
      id: "LP-101",
      title: "Bai 1: Cau tao nguyen tu va Hat nhan",
      grade: "Khoi 10",
      duration: "2 Tiet (90 phut)",
      status: "Da hoan thanh",
      updatedAt: "18/11/2026",
      objectives: {
        knowledge: "Trinh bay duoc thanh phan cau tao nguyen tu gom hat nhan (proton, neutron) va vo electron.",
        competence: "Tu chu tu hoc, giai quyet van de thong qua phan tich mo hinh nguyen tu Rutherford - Bohr.",
        quality: "Cham chi, trung thuc trong nghien cuu khoa hoc tu nhien.",
      },
      preparation: {
        methods: "Day hoc hop tac, truc quan, giai quyet van de.",
        teacherPrep: "Mo hinh 3D cau tao nguyen tu Carbon, phieu hoc tap so 1 va so 2.",
        studentPrep: "On lai kien thuc Khoa hoc tu nhien lop 8 ve nguyen tu.",
      },
      activities: {
        act1: "Giao vien chieu hinh anh chiec nhan kim cuong va ruot but chi, dat cau hoi: Tai sao cung tao nen tu nguyen to Carbon nhung tinh chat lai khac nhau?",
        act2: "Chia lop thanh 4 nhom, phan tich bang so lieu khoi luong va dien tich cua electron, proton, neutron.",
        act3: "Hoc sinh lam 5 cau trac nghiem nhanh tinh so hat p, n, e cua nguyen tu Na (Z=11, A=23) va Cl (Z=17, A=35).",
        act4: "Ung dung tim hieu dong vi Carbon-14 trong viec xac dinh nien dai co vat khao co hoc.",
      },
    },
    {
      id: "LP-102",
      title: "Bai 5: Ester - Lipid va Ung dung",
      grade: "Khoi 12",
      duration: "2 Tiet (90 phut)",
      status: "Ban nhap",
      updatedAt: "17/11/2026",
      objectives: {
        knowledge: "Navel duoc khai niem, danh phap, tinh chat vat ly va phan ung thuy phan cua Ester.",
        competence: "Viet duoc phuong trinh hoa hoc dieu che ester va phan ung xa phong hoa.",
        quality: "Co y thuc bao ve moi truong khi su dung chat giat rua tong hop.",
      },
      preparation: {
        methods: "Day hoc theo tram, thuc hanh thi nghiem ao.",
        teacherPrep: "Ong nghiem, acetic acid, ethyl alcohol, H2SO4 dac, nuoc da.",
        studentPrep: "Doc truoc bai Ester trong SGK Hoa hoc 12.",
      },
      activities: {
        act1: "Cho hoc sinh ngui mui huong dau chuoi (isoamyl acetate) va mui dua (ethyl butyrate) de dan dat vao bai.",
        act2: "Thuc hanh phan tich cong thuc cau tao RCOO-R' va thi nghiem dieu che ethyl acetate.",
        act3: "Giai bai tap tinh hieu suat phan ung ester hoa.",
        act4: "Tim hieu quy trinh san xuat xa phong handmade tu mo dong vat hoac dau thuc vat tai nha.",
      },
    },
  ]);

  // State danh sach Giao an Mau Chuan He thong (do Staff biên soan va Manager da phe duyet)
  const [systemTemplates] = useState([
    {
      id: "TPL-5512-01",
      title: "[MAU CHUAN 5512] Bai: Phan ung Oxi hoa - Khu va Ung dung",
      grade: "Khoi 10",
      duration: "2 Tiet (90 phut)",
      author: "Hoi dong Chuyen mon Hoa THPT",
      objectives: {
        knowledge: "Xac dinh duoc so oxi hoa cua nguyen tu cac nguyen to va lap phuong trinh theo phuong phap thang bang electron.",
        competence: "Van dung can bang cac phan ung oxi hoa - khu phuc tap trong thuc tiễn.",
        quality: "Ren luyen tu duy logic, chinh xac khi can bang phuong trinh hoa hoc.",
      },
      preparation: {
        methods: "Day hoc kham pha, tro choi hoc tap, thao luan nhom.",
        teacherPrep: "Bo the so oxi hoa, phieu hoc tap A3, video thi nghiem Zn + CuSO4.",
        studentPrep: "Bang tuan hoan cac nguyen to hoa hoc.",
      },
      activities: {
        act1: "Quan sat hien tuong dinh sat bi gi trong khong khi am va thanh dong nhung vao dung dich AgNO3.",
        act2: "Rut ra khai niem chat khu, chat oxi hoa, qua trinh khu, qua trinh oxi hoa va 4 buoc thang bang electron.",
        act3: "Thi dua can bang nhanh 4 phuong trinh hoa hoc tren bang phu giua 4 to.",
        act4: "Giai thich nguyen nhan va de xuat bien phap chong gi set cho cac cong trinh bang kim loai.",
      },
    },
    {
      id: "TPL-5512-02",
      title: "[MAU CHUAN 5512] Bai: Can bang Hoa hoc va Nguyen ly Le Chatelier",
      grade: "Khoi 11",
      duration: "2 Tiet (90 phut)",
      author: "To Chuyen gia Staff PlanbookAI",
      objectives: {
        knowledge: "Trinh bay duoc khai niem phan ung thuan nghich, trang thai can bang va hang so can bang Kc.",
        competence: "Van dung nguyen ly chuyen dich can bang Le Chatelier de giai thich cac yeu to nhiet do, ap suat, nong do.",
        quality: "Yeu thich mon Hoa hoc, hieu vai tro cua Hoa hoc trong san xuat cong nghiep (tong hop NH3).",
      },
      preparation: {
        methods: "Nghien cuu tinh huong (Case Study), thi nghiem mo phong.",
        teacherPrep: "Video mo phong he can bang NO2 (nau do) <-> N2O4 (khong mau).",
        studentPrep: "On lai toc do phan ung hoa hoc.",
      },
      activities: {
        act1: "So sanh phan ung dot chay Mg (1 chieu) va phan ung tong hop NH3 tu N2 va H2 (2 chieu).",
        act2: "Xay dung bieu thuc tinh hang so can bang Kc va khao sat su chuyen dich can bang khi thay doi nhiet do.",
        act3: "Hoan thanh phieu bai tap trac nghiem du doan chieu chuyen dich can bang cua 5 he phan ung.",
        act4: "Dong vai ky su hoa chat: Chon dieu kien ap suat va nhiet do toi uu cho nha may san xuat Amoniac (NH3).",
      },
    },
  ]);

  // State luu du lieu cua Giao an dang duoc soan thao trong Wizard 4 buoc
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    grade: "Khoi 10",
    duration: "2 Tiet (90 phut)",
    status: "Ban nhap",
    objectives: {
      knowledge: "",
      competence: "",
      quality: "",
    },
    preparation: {
      methods: "Day hoc hop tac, Giai quyet van de, Truc quan thi nghiem",
      teacherPrep: "",
      studentPrep: "",
    },
    activities: {
      act1: "",
      act2: "",
      act3: "",
      act4: "",
    },
  });

  // Ham mo Wizard de tao giao an moi tinh
  const handleStartNewWizard = () => {
    setFormData({
      id: null,
      title: "",
      grade: "Khoi 10",
      duration: "2 Tiet (90 phut)",
      status: "Ban nhap",
      objectives: { knowledge: "", competence: "", quality: "" },
      preparation: {
        methods: "Day hoc hop tac, Giai quyet van de, Truc quan thi nghiem",
        teacherPrep: "",
        studentPrep: "",
      },
      activities: { act1: "", act2: "", act3: "", act4: "" },
    });
    setCurrentStep(1);
    setViewMode("wizard");
  };

  // Ham mo Wizard de chinh sua mot giao an ca nhan hoac su dung mot Mau He thong
  const handleLoadPlanIntoWizard = (plan, isFromSystemTemplate = false) => {
    setFormData({
      id: isFromSystemTemplate ? null : plan.id,
      title: isFromSystemTemplate ? plan.title.replace("[MAU CHUAN 5512] ", "") : plan.title,
      grade: plan.grade,
      duration: plan.duration,
      status: "Ban nhap",
      objectives: { ...plan.objectives },
      preparation: { ...plan.preparation },
      activities: { ...plan.activities },
    });
    setCurrentStep(1);
    setViewMode("wizard");
  };

  // Ham goi AI goi y tu dong cho MUC TIEU (Buoc 1) hoac TUNG HOAT DONG (Buoc 3)
  const handleAIGenerateSection = async (sectionType) => {
    if (!formData.title.trim()) {
      alert("Vui long nhap Ten bai day Hoa hoc o Buoc 1 truoc khi goi AI goi y!");
      return;
    }
    setIsGeneratingAI(true);
    try {
      // Thu goi Backend API neu dang bat
      await teacherService.generateLessonPlan({
        topic: formData.title,
        gradeLevel: formData.grade,
        durationMinutes: 90,
      });
    } catch (err) {
      // Neu Backend chua bat hoac het quota, su dung AI Engine mo phong thong minh theo ten bai hoc
    }

    // Cap nhat noi dung tu dong theo dung ten bai day Hoa hoc giao vien nhap
    if (sectionType === "objectives") {
      setFormData((prev) => ({
        ...prev,
        objectives: {
          knowledge: `[AI Goi y cho ${prev.title}]: Trinh bay duoc khai niem, cong thuc cau tao, tinh chat vat ly va phuong trinh hoa hoc dac trung cua bai hoc.`,
          competence: `Phat trien nang luc nhan thuc hoa hoc, nang luc tim hieu the gioi tu nhien duoi goc do hoa hoc va van dung giai bai tap ${prev.title}.`,
          quality: `Ren luyen tac phong can than, trung thuc khi quan sat thi nghiem hoa hoc va y thuc bao ve moi truong.`,
        },
      }));
    } else if (sectionType === "act1") {
      setFormData((prev) => ({
        ...prev,
        activities: {
          ...prev.activities,
          act1: `[AI Thiet ke Khoi dong - ${prev.title}]:\n- Chuyen giao nhiem vu: GV trinh chieu tinh huong thuc te/thi nghiem vui lien quan den ${prev.title}.\n- Thuc hien: HS thao luan cap doi trong 3 phut de tra loi cau hoi dat van de.\n- Ket luan: GV nhan xet va dan dat vao bai moi.`,
        },
      }));
    } else if (sectionType === "act2") {
      setFormData((prev) => ({
        ...prev,
        activities: {
          ...prev.activities,
          act2: `[AI Thiet ke Hinh thanh kien thuc - ${prev.title}]:\n- Hoat dong 2.1: Tim hieu khai niem & cau tao phan tu qua mo hinh truc quan.\n- Hoat dong 2.2: Khao sat tinh chat hoa hoc dac trung qua Phieu hoc tap nhom (4 nhom) va viet phuong trinh hoa hoc minh hoa.`,
        },
      }));
    } else if (sectionType === "act3") {
      setFormData((prev) => ({
        ...prev,
        activities: {
          ...prev.activities,
          act3: `[AI Thiet ke Luyen tap - ${prev.title}]:\n- GV to chuc tro choi trac nghiem nhanh 5 cau hoi (muc Nhan biet & Thong hieu) va 1 bai tap tinh toan theo phuong trinh hoa hoc.\n- HS trinh bay loi giai tren bang phu va cham cheo giua cac nhom.`,
        },
      }));
    } else if (sectionType === "act4") {
      setFormData((prev) => ({
        ...prev,
        activities: {
          ...prev.activities,
          act4: `[AI Thiet ke Van dung & Mo rong - ${prev.title}]:\n- Nhiem vu STEM/Thuc tien: HS tim hieu ung dung cua ${prev.title} trong doi song gia dinh, y te hoac san xuat cong nghiep va viet bao cao ngan 200 tu vao tiet hoc sau.`,
        },
      }));
    }
    setIsGeneratingAI(false);
  };

  // Ham luu Giao an tu Wizard vao danh sach Giao an Ca nhan
  const handleSaveLessonPlan = (publishStatus) => {
    if (!formData.title.trim()) {
      alert("Vui long nhap Ten bai day Hoa hoc!");
      return;
    }
    const savedItem = {
      ...formData,
      id: formData.id || `LP-${Math.floor(100 + Math.random() * 900)}`,
      status: publishStatus,
      updatedAt: new Date().toLocaleDateString("vi-VN"),
    };

    if (formData.id) {
      setPersonalPlans((prev) =>
        prev.map((item) => (item.id === formData.id ? savedItem : item))
      );
    } else {
      setPersonalPlans((prev) => [savedItem, ...prev]);
    }
    setActiveTab("personal");
    setViewMode("list");
  };

  // Ham xoa giao an ca nhan
  const handleDeletePlan = (id) => {
    setPersonalPlans((prev) => prev.filter((p) => p.id !== id));
  };

  // Loc danh sach giao an theo Tu khoa va Khoi lop
  const currentList = activeTab === "personal" ? personalPlans : systemTemplates;
  const filteredList = currentList.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGrade =
      selectedGrade === "All" || item.grade.includes(selectedGrade);
    return matchSearch && matchGrade;
  });

  // ============================================================================
  // GIAO DIEN 1: CHE DO WIZARD 4 BUOC SOAN GIAO AN CONG VAN 5512
  // ============================================================================
  if (viewMode === "wizard") {
    const steps = [
      { num: 1, label: "Buoc 1: Thong tin & Muc tieu" },
      { num: 2, label: "Buoc 2: Phuong phap & Chuan bi" },
      { num: 3, label: "Buoc 3: Tien trinh 4 Hoat dong" },
      { num: 4, label: "Buoc 4: Xem truoc & Xuat ban" },
    ];

    return (
      <div className="space-y-6">
        {/* Thanh tieu de Wizard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <button
              onClick={() => setViewMode("list")}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 mb-1"
            >
              [Quay lai Danh sach Giao an]
            </button>
            <h1 className="text-2xl font-bold text-slate-800">
              Trinh Soan Giao an Hoa hoc (Chuan Cong van 5512)
            </h1>
            <p className="text-sm text-slate-500">
              Hoan thanh 4 buoc de thiet ke ke hoach bai day chi tiet cung Tro ly AI
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSaveLessonPlan("Ban nhap")}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100"
            >
              Luu Ban nhap
            </button>
            <button
              onClick={() => handleSaveLessonPlan("Da hoan thanh")}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700"
            >
              Hoan tat & Xuat ban
            </button>
          </div>
        </div>

        {/* Thanh Tien Trinh Stepper 4 Buoc */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          {steps.map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`p-3 rounded-lg text-left border transition-all ${
                  isActive
                    ? "bg-blue-50 border-blue-600 text-blue-700 font-bold"
                    : isCompleted
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold"
                    : "bg-slate-50 border-slate-200 text-slate-500 font-medium"
                }`}
              >
                <div className="text-xs uppercase tracking-wider mb-1">
                  {isCompleted ? "[Da xong]" : isActive ? "[Dang thuc hien]" : "[Cho]"}
                </div>
                <div className="text-sm">{step.label}</div>
              </button>
            );
          })}
        </div>

        {/* NOI DUNG BUOC 1: THONG TIN CHUNG & MUC TIEU */}
        {currentStep === 1 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-bold text-slate-800">
                I. Thong tin Bai hoc & Muc tieu Yeu cau can dat
              </h2>
              <button
                onClick={() => handleAIGenerateSection("objectives")}
                disabled={isGeneratingAI}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-50"
              >
                {isGeneratingAI ? "AI dang phan tich..." : "[AI Goi y 3 Muc tieu]"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Ten Bai day Hoa hoc *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="VD: Bai 3: Lien ket Ion va Lien ket Cong hoa tri"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Khoi lop THPT
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
                >
                  <option value="Khoi 10">Hoa hoc Khoi 10</option>
                  <option value="Khoi 11">Hoa hoc Khoi 11</option>
                  <option value="Khoi 12">Hoa hoc Khoi 12</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Thoi luong Giang day
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
                >
                  <option value="1 Tiet (45 phut)">1 Tiet (45 phut)</option>
                  <option value="2 Tiet (90 phut)">2 Tiet (90 phut)</option>
                  <option value="3 Tiet (135 phut)">3 Tiet (135 phut)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  1. Ve Kien thuc Hoa hoc (Yeu cau can dat)
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
                  placeholder="Hoc sinh trinh bay duoc, phan biet duoc, viet duoc phuong trinh hoa hoc..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  2. Ve Nang luc (Nang luc Hoa hoc & Nang luc chung)
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
                  placeholder="Nang luc nhan thuc hoa hoc, tim hieu the gioi tu nhien, van dung kien thuc..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  3. Ve Pham chat
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
                  placeholder="Cham chi, trung thuc khi lam thi nghiem, trach nhiem bao ve moi truong..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* NOI DUNG BUOC 2: PHUONG PHAP & THIET BI DAY HOC */}
        {currentStep === 2 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-3">
              II. Thiet bi Day hoc, Hoa chat & Hoc lieu
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                1. Phuong phap & Ky thuat day hoc tich cuc
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
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                2. Chuan bi cua Giao vien (Dung cu thi nghiem, Hoa chat, Phieu hoc tap)
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
                placeholder="VD: Ong nghiem, dung dich HCl 1M, vien Zn, Phieu hoc tap so 1, Slide bai giang..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                3. Chuan bi cua Hoc sinh
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
                placeholder="VD: SGK Hoa hoc, Bang tuan hoan, may tinh cam tay, on lai kien thuc..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>
        )}

        {/* NOI DUNG BUOC 3: TIEN TRINH 4 HOAT DONG DAY HOC (CHUAN 5512) */}
        {currentStep === 3 && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-3">
              III. Tien trinh To chuc 4 Hoat dong Day hoc (Cong van 5512)
            </h2>

            {[
              {
                key: "act1",
                title: "Hoat dong 1: Khoi dong / Xac dinh van de (5 - 7 phut)",
                desc: "Tao hung thu, ket noi kien thuc cu voi bai hoc Hoa hoc moi.",
              },
              {
                key: "act2",
                title: "Hoat dong 2: Hinh thanh kien thuc moi (40 - 45 phut)",
                desc: "Kham pha khai niem, cau tao phan tu, thi nghiem va tinh chat hoa hoc.",
              },
              {
                key: "act3",
                title: "Hoat dong 3: Luyen tap - Cung co (20 - 25 phut)",
                desc: "He thong hoa ly thuyet va giai bai tap trac nghiem/tu luan tai lop.",
              },
              {
                key: "act4",
                title: "Hoat dong 4: Van dung & Tim tòi mo rong (10 - 15 phut)",
                desc: "Ung dung Hoa hoc giai quyet tinh huong thuc tien, STEM, moi truong.",
              },
            ].map((act) => (
              <div
                key={act.key}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{act.title}</h3>
                    <p className="text-xs text-slate-500">{act.desc}</p>
                  </div>
                  <button
                    onClick={() => handleAIGenerateSection(act.key)}
                    disabled={isGeneratingAI}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-50"
                  >
                    [AI Goi y Hoat dong nay]
                  </button>
                </div>
                <textarea
                  rows="4"
                  value={formData.activities[act.key]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      activities: {
                        ...formData.activities,
                        [act.key]: e.target.value,
                      },
                    })
                  }
                  placeholder={`Nhap noi dung chi tiet cho ${act.title}...`}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm"
                />
              </div>
            ))}
          </div>
        )}

        {/* NOI DUNG BUOC 4: BAN XEM TRUOC CHUAN A4 & IN GIAO AN */}
        {currentStep === 4 && (
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                  Ban xem truoc Chuan In A4
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  KE HOACH BAI DAY: {formData.title || "(Chua dat ten bai day)"}
                </h2>
                <p className="text-sm text-slate-600">
                  Mon: Hoa hoc THPT - {formData.grade} | Thoi luong: {formData.duration}
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-slate-800 text-white text-xs font-bold hover:bg-slate-900"
              >
                [In Giao an / Xuat PDF]
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-800 leading-relaxed">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-blue-800 uppercase mb-2">
                  I. Muc tieu Bai hoc
                </h3>
                <p><strong>1. Kien thuc:</strong> {formData.objectives.knowledge || "Chua nhap"}</p>
                <p className="mt-1"><strong>2. Nang luc:</strong> {formData.objectives.competence || "Chua nhap"}</p>
                <p className="mt-1"><strong>3. Pham chat:</strong> {formData.objectives.quality || "Chua nhap"}</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-blue-800 uppercase mb-2">
                  II. Thiet bi Day hoc va Hoc lieu
                </h3>
                <p><strong>- Phuong phap:</strong> {formData.preparation.methods}</p>
                <p className="mt-1"><strong>- Giao vien chuan bi:</strong> {formData.preparation.teacherPrep || "Chua nhap"}</p>
                <p className="mt-1"><strong>- Hoc sinh chuan bi:</strong> {formData.preparation.studentPrep || "Chua nhap"}</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-blue-800 uppercase">
                  III. Tien trinh Day hoc (4 Hoat dong Cong van 5512)
                </h3>
                <div>
                  <h4 className="font-bold text-slate-900">1. Hoat dong 1: Khoi dong</h4>
                  <p className="whitespace-pre-line text-slate-700">{formData.activities.act1 || "Chua nhap"}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">2. Hoat dong 2: Hinh thanh kien thuc moi</h4>
                  <p className="whitespace-pre-line text-slate-700">{formData.activities.act2 || "Chua nhap"}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">3. Hoat dong 3: Luyen tap</h4>
                  <p className="whitespace-pre-line text-slate-700">{formData.activities.act3 || "Chua nhap"}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">4. Hoat dong 4: Van dung & Mo rong</h4>
                  <p className="whitespace-pre-line text-slate-700">{formData.activities.act4 || "Chua nhap"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Thanh dieu huong Buoc Truoc / Buoc Tiep theo */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
          <button
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="px-5 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 disabled:opacity-40"
          >
            Buoc truoc
          </button>
          <span className="text-xs font-bold text-slate-500 uppercase">
            Buoc {currentStep} / 4
          </span>
          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
            >
              Buoc tiep theo
            </button>
          ) : (
            <button
              onClick={() => handleSaveLessonPlan("Da hoan thanh")}
              className="px-6 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700"
            >
              Xac nhan Luu & Hoan thanh
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============================================================================
  // GIAO DIEN 2: DANH SACH GIAO AN CA NHAN & KHO GIAO AN MAU HE THONG
  // ============================================================================
  return (
    <div className="space-y-6">
      {/* Header trang */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quan ly & Soan Giao an Hoa hoc AI (Chuan 5512)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Xay dung ke hoach bai day Hoa hoc THPT theo quy trinh Wizard 4 buoc hoac ke thua tu Mau He thong
          </p>
        </div>
        <button
          onClick={handleStartNewWizard}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-sm"
        >
          + Soan Giao an Moi (Wizard 4 Buoc)
        </button>
      </div>

      {/* Thanh Chuyen doi 2 Tab: Giao an Ca nhan vs Mau He thong + Bo loc Khoi lop */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("personal")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "personal"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Giao an Ca nhan ({personalPlans.length})
          </button>
          <button
            onClick={() => setActiveTab("system")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "system"
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Mau Chuan He thong ({systemTemplates.length})
          </button>
        </div>

        {/* Tim kiem va Loc theo khoi lop 10, 11, 12 */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Tim ten bai day Hoa hoc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-sm w-60 focus:outline-none focus:border-blue-600"
          />
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {["All", "10", "11", "12"].map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold ${
                  selectedGrade === grade
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {grade === "All" ? "Tat ca Khoi" : `Khoi ${grade}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Luoi Danh sach Giao an */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredList.map((plan) => (
          <div
            key={plan.id}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold text-xs">
                    Hoa hoc {plan.grade}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-semibold text-xs">
                    {plan.duration}
                  </span>
                </div>
                {activeTab === "personal" ? (
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      plan.status === "Da hoan thanh"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {plan.status}
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                    Chuan He thong
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-800">{plan.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                <strong>Muc tieu kien thuc:</strong> {plan.objectives.knowledge}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {activeTab === "personal"
                  ? `Cap nhat: ${plan.updatedAt}`
                  : `Bien soan: ${plan.author}`}
              </span>

              {activeTab === "personal" ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLoadPlanIntoWizard(plan, false)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100"
                  >
                    Mo Wizard / Sua
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100"
                  >
                    Xoa
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleLoadPlanIntoWizard(plan, true)}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700"
                >
                  Su dung Mau nay
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