import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, LogIn, HeartPulse, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsDemo } = useAuth();
  const { showToast } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Target path for programmatic redirection
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result = await login({ email, password });
    setIsLoading(false);

    if (result.success) {
      showToast('¡Bienvenido(a) al Aula Virtual de Autoprotección!', 'success');
      // Programmatic redirection
      navigate(from, { replace: true });
    } else {
      setErrorMessage(result.error || 'Error al autenticar credenciales');
      showToast(result.error || 'Error al iniciar sesión', 'error');
    }
  };

  const handleQuickDemo = (role: 'brigadista' | 'instructor') => {
    loginAsDemo(role);
    showToast(
      role === 'instructor'
        ? 'Iniciando sesión como Instructor Dr. Alejandro Morales'
        : 'Iniciando sesión como Brigadista Camila Ríos',
      'success'
    );
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Card Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition">
              <HeartPulse className="w-7 h-7" />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">Iniciar Sesión</h1>
          <p className="text-xs text-slate-400">
            Ingresa a tu centro de comando y módulos de autoprotección
          </p>
        </div>

        {/* Quick Demo Access Pills */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Acceso Rápido para Evaluación (1 Clic):
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('brigadista')}
              className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-left transition"
            >
              <span className="block font-bold text-white text-[11px]">Estudiante / Brigadista</span>
              <span className="text-[10px] text-slate-400">Camila Ríos</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('instructor')}
              className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-left transition"
            >
              <span className="block font-bold text-amber-200 text-[11px]">Docente Instructor</span>
              <span className="text-[10px] text-slate-400">Dr. Alejandro Morales</span>
            </button>
          </div>
        </div>

        {/* Form Card (matching Hito 1 wireframe image 3 specs: Email, Password, Iniciar Sesión, Volver) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300" htmlFor="email">
                Correo Electrónico (Email address)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300" htmlFor="password">
                  Contraseña (Password)
                </label>
                <span className="text-[11px] text-slate-500">Mín. 4 caracteres</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <Link
                to="/"
                className="py-3 px-4 rounded-xl text-xs font-bold text-center bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver</span>
              </Link>

              <button
                type="submit"
                disabled={isLoading}
                className="py-3 px-4 rounded-xl text-xs font-bold text-center bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Iniciar Sesión</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            ¿Aún no tienes una cuenta?{' '}
            <Link to="/registro" className="font-bold text-red-400 hover:text-red-300 underline">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
