import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import MainPortalLayout from './layouts/MainPortalLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/guards/ProtectedRoute';

// Nhập trọn bộ 7 màn hình của Actor TEACHER (Giáo viên Hóa học THPT)
import TeacherWorkspace from './pages/teacher/TeacherWorkspace';
import LessonPlanAI from './pages/teacher/LessonPlanAI';
import ExerciseCreator from './pages/teacher/ExerciseCreator';
import QuestionBank from './pages/teacher/QuestionBank';
import ExamGenerator from './pages/teacher/ExamGenerator';
import OcrGrading from './pages/teacher/OcrGrading';
import StudentAnalytics from './pages/teacher/StudentAnalytics';

// Nhập trọn bộ 4 màn hình của Actor ADMIN
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

          {/* Khu vực của TEACHER (Đã hoàn thiện đủ 7/7 màn hình chính thức) */}
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

          {/* Khu vực của STAFF */}
          <Route element={<ProtectedRoute allowedRoles={['STAFF']} />}>
            <Route element={<MainPortalLayout />}>
              <Route
                path="/staff/*"
                element={
                  <div className="p-6 bg-white rounded-xl border border-slate-200 font-semibold text-blue-700">
                    Khung giao diện Staff đã sẵn sàng (Sẽ gắn ở bước Thành viên 2 - Tuần 3).
                  </div>
                }
              />
            </Route>
          </Route>

          {/* Khu vực của MANAGER */}
          <Route element={<ProtectedRoute allowedRoles={['MANAGER']} />}>
            <Route element={<MainPortalLayout />}>
              <Route
                path="/manager/*"
                element={
                  <div className="p-6 bg-white rounded-xl border border-slate-200 font-semibold text-amber-700">
                    Khung giao diện Manager đã sẵn sàng (Sẽ gắn ở bước Thành viên 2 - Tuần 3).
                  </div>
                }
              />
            </Route>
          </Route>

          {/* Khu vực của ADMIN (Đã hoàn thiện đủ 4/4 màn hình chính thức) */}
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