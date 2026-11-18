import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import MainPortalLayout from './layouts/MainPortalLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/guards/ProtectedRoute';

// 1. Nhập trọn bộ 7 màn hình của Actor TEACHER
import TeacherWorkspace from './pages/teacher/TeacherWorkspace';
import LessonPlanAI from './pages/teacher/LessonPlanAI';
import ExerciseCreator from './pages/teacher/ExerciseCreator';
import QuestionBank from './pages/teacher/QuestionBank';
import ExamGenerator from './pages/teacher/ExamGenerator';
import OcrGrading from './pages/teacher/OcrGrading';
import StudentAnalytics from './pages/teacher/StudentAnalytics';

// 2. Nhập trọn bộ 3 màn hình của Actor STAFF
import SampleLessonPlans from './pages/staff/SampleLessonPlans';
import StaffQuestionBank from './pages/staff/StaffQuestionBank';
import PromptTemplates from './pages/staff/PromptTemplates';

// 3. Nhập trọn bộ 3 màn hình của Actor MANAGER
import PackageManagement from './pages/manager/PackageManagement';
import OrderManagement from './pages/manager/OrderManagement';
import ContentApproval from './pages/manager/ContentApproval';

// 4. Nhập trọn bộ 4 màn hình của Actor ADMIN
import UserManagement from './pages/admin/UserManagement';
import SystemSettings from './pages/admin/SystemSettings';
import FrameworkConfig from './pages/admin/FrameworkConfig';
import RevenueDashboard from './pages/admin/RevenueDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Nhóm đường dẫn Công khai (Đăng nhập / Đăng ký) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Khu vực của TEACHER (Đầy đủ 7/7 màn hình) */}
          <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
            <Route element={<MainPortalLayout />}>
              <Route path="/teacher/workspace" element={<TeacherWorkspace />} />
              <Route path="/teacher/lesson-plan-ai" element={<LessonPlanAI />} />
              <Route path="/teacher/exercise-creator" element={<ExerciseCreator />} />
              <Route path="/teacher/question-bank" element={<QuestionBank />} />
              <Route path="/teacher/exam-generator" element={<ExamGenerator />} />
              <Route path="/teacher/ocr-grading" element={<OcrGrading />} />
              <Route path="/teacher/analytics" element={<StudentAnalytics />} />
              <Route path="/teacher/*" element={<Navigate to="/teacher/workspace" replace />} />
            </Route>
          </Route>

          {/* Khu vực của STAFF (Đầy đủ 3/3 màn hình) */}
          <Route element={<ProtectedRoute allowedRoles={['STAFF']} />}>
            <Route element={<MainPortalLayout />}>
              <Route path="/staff/lesson-plans" element={<SampleLessonPlans />} />
              <Route path="/staff/questions" element={<StaffQuestionBank />} />
              <Route path="/staff/prompts" element={<PromptTemplates />} />
              <Route path="/staff/*" element={<Navigate to="/staff/lesson-plans" replace />} />
            </Route>
          </Route>

          {/* Khu vực của MANAGER (Đầy đủ 3/3 màn hình) */}
          <Route element={<ProtectedRoute allowedRoles={['MANAGER']} />}>
            <Route element={<MainPortalLayout />}>
              <Route path="/manager/packages" element={<PackageManagement />} />
              <Route path="/manager/orders" element={<OrderManagement />} />
              <Route path="/manager/approvals" element={<ContentApproval />} />
              <Route path="/manager/*" element={<Navigate to="/manager/packages" replace />} />
            </Route>
          </Route>

          {/* Khu vực của ADMIN (Đầy đủ 4/4 màn hình) */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route element={<MainPortalLayout />}>
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/settings" element={<SystemSettings />} />
              <Route path="/admin/frameworks" element={<FrameworkConfig />} />
              <Route path="/admin/revenue" element={<RevenueDashboard />} />
              <Route path="/admin/*" element={<Navigate to="/admin/users" replace />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}