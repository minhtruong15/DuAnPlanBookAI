import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import MainPortalLayout from './layouts/MainPortalLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/guards/ProtectedRoute';

// Nhập 3 màn hình đầu tiên của Giáo viên Hóa học (Tuần 2 - Thành viên 1)
import TeacherWorkspace from './pages/teacher/TeacherWorkspace';
import LessonPlanAI from './pages/teacher/LessonPlanAI';
import ExerciseCreator from './pages/teacher/ExerciseCreator';

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

          {/* Khu vực của TEACHER */}
          <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
            <Route element={<MainPortalLayout />}>
              <Route path="/teacher/workspace" element={<TeacherWorkspace />} />
              <Route path="/teacher/lesson-plan-ai" element={<LessonPlanAI />} />
              <Route path="/teacher/exercise-creator" element={<ExerciseCreator />} />
              <Route
                path="/teacher/*"
                element={
                  <div className="p-6 bg-white rounded-xl border border-slate-200 font-semibold text-slate-700">
                    Tính năng này của Teacher sẽ được hoàn thiện tiếp ở Tuần 3.
                  </div>
                }
              />
            </Route>
          </Route>

          {/* Khu vực của STAFF */}
          <Route element={<ProtectedRoute allowedRoles={['STAFF']} />}>
            <Route element={<MainPortalLayout />}>
              <Route
                path="/staff/*"
                element={
                  <div className="p-6 bg-white rounded-xl border border-slate-200 font-semibold text-blue-700">
                    Khung giao diện Staff đã sẵn sàng.
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
                    Khung giao diện Manager đã sẵn sàng.
                  </div>
                }
              />
            </Route>
          </Route>

          {/* Khu vực của ADMIN */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route element={<MainPortalLayout />}>
              <Route
                path="/admin/*"
                element={
                  <div className="p-6 bg-white rounded-xl border border-slate-200 font-semibold text-purple-700">
                    Khung giao diện Admin đã sẵn sàng.
                  </div>
                }
              />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}