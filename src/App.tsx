/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ClassroomProvider } from './context/ClassroomContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { CoursesCatalogPage } from './pages/CoursesCatalogPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ClassroomLessonPage } from './pages/ClassroomLessonPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { LiveRoomPage } from './pages/LiveRoomPage';
import { TasksPage } from './pages/TasksPage';
import { ForumsPage } from './pages/ForumsPage';
import { CreateCoursePage } from './pages/CreateCoursePage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <ClassroomProvider>
            <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Rutas Públicas */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cursos" element={<CoursesCatalogPage />} />
                  <Route path="/cursos/:courseId" element={<CourseDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/registro" element={<RegisterPage />} />

                  {/* Rutas Privadas / Protegidas */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cursos/:courseId/aula"
                    element={
                      <ProtectedRoute>
                        <ClassroomLessonPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/videoconferencias"
                    element={
                      <ProtectedRoute>
                        <LiveRoomPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/tareas"
                    element={
                      <ProtectedRoute>
                        <TasksPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/foros"
                    element={
                      <ProtectedRoute>
                        <ForumsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/crear-curso"
                    element={
                      <ProtectedRoute>
                        <CreateCoursePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/perfil"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Not Found & Redirections */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ClassroomProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
