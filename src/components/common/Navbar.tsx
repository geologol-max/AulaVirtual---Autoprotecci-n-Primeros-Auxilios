import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  BookOpen,
  LayoutDashboard,
  Video,
  FileCheck2,
  MessageSquare,
  PlusCircle,
  User,
  LogOut,
  Menu,
  X,
  HeartPulse,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, loginAsDemo } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showToast('Has cerrado sesión correctamente', 'info');
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
      isActive
        ? 'bg-red-500/15 text-red-400 border border-red-500/30'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
      isActive
        ? 'bg-red-500 text-white font-semibold shadow-md shadow-red-500/20'
        : 'text-slate-300 hover:text-white hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      {/* Top micro-banner for evaluator testing */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-red-600/20 text-red-400 border border-red-600/40">
              Hito 2 Frontend
            </span>
            <span className="hidden sm:inline text-slate-400">
              Aula Virtual de Autoprotección, Emergencias y Primeros Auxilios
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 hidden md:inline">Acceso rápido para evaluación:</span>
            <button
              onClick={() => {
                loginAsDemo('brigadista');
                showToast('Sesión activa: Brigadista Camila Ríos', 'success');
              }}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Cargar usuario brigadista con cursos y tareas entregadas"
            >
              Demo: Alumna/Brigadista
            </button>
            <button
              onClick={() => {
                loginAsDemo('instructor');
                showToast('Sesión activa: Dr. Alejandro Morales (Instructor)', 'success');
              }}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition"
              title="Cargar usuario instructor docente"
            >
              Demo: Instructor SAMU
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-lg shadow-red-600/25 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white">Aula</span>
                <span className="text-lg font-black tracking-tight text-red-500">Virtual</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Autoprotección & Emergencias
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLink to="/" className={navLinkClass}>
              Inicio
            </NavLink>
            <NavLink to="/cursos" className={navLinkClass}>
              <BookOpen className="w-4 h-4 text-slate-400" />
              Cursos
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  <LayoutDashboard className="w-4 h-4 text-slate-400" />
                  Dashboard
                </NavLink>
                <NavLink to="/videoconferencias" className={navLinkClass}>
                  <div className="relative">
                    <Video className="w-4 h-4 text-slate-400" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  </div>
                  Clases en Vivo
                </NavLink>
                <NavLink to="/tareas" className={navLinkClass}>
                  <FileCheck2 className="w-4 h-4 text-slate-400" />
                  Tareas & Notas
                </NavLink>
                <NavLink to="/foros" className={navLinkClass}>
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  Foros
                </NavLink>
                <NavLink to="/crear-curso" className={navLinkClass}>
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  Publicar
                </NavLink>
              </>
            )}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/perfil"
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition group"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-red-500/40"
                  />
                  <div className="text-left text-xs">
                    <div className="font-semibold text-white group-hover:text-red-400 transition truncate max-w-[120px]">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-slate-400 capitalize flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {user.role}
                    </div>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Cerrar Sesión"
                  className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-900 border border-slate-800 transition"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white rounded-xl hover:bg-slate-800/80 transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-xl shadow-lg shadow-red-600/30 transition transform hover:-translate-y-0.5"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && user && (
              <Link to="/perfil" className="shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-red-500/40"
                />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2 animate-in fade-in">
          {isAuthenticated && user && (
            <div className="flex items-center justify-between p-3 mb-2 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-lg object-cover ring-2 ring-red-500"
                />
                <div>
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{user.role} • {user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-950/40 border border-red-900"
              >
                <LogOut className="w-3.5 h-3.5" />
                Salir
              </button>
            </div>
          )}

          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            <ShieldAlert className="w-5 h-5 text-red-500" />
            Inicio
          </NavLink>
          <NavLink to="/cursos" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            <BookOpen className="w-5 h-5 text-blue-400" />
            Catálogo de Cursos
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                Dashboard Académico
              </NavLink>
              <NavLink to="/videoconferencias" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                <Video className="w-5 h-5 text-rose-400" />
                Clases en Vivo (Sincrónicas)
              </NavLink>
              <NavLink to="/tareas" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                <FileCheck2 className="w-5 h-5 text-emerald-400" />
                Tareas & Calificaciones
              </NavLink>
              <NavLink to="/foros" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                <MessageSquare className="w-5 h-5 text-amber-400" />
                Foros de Discusión
              </NavLink>
              <NavLink to="/crear-curso" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                Publicar Nuevo Curso / Capacitación
              </NavLink>
              <NavLink to="/perfil" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                <User className="w-5 h-5 text-purple-400" />
                Mi Perfil y Credenciales
              </NavLink>
            </>
          ) : (
            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/registro"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold rounded-xl bg-red-600 text-white"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
