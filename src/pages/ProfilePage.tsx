import React, { useState } from 'react';
import {
  User as UserIcon,
  Mail,
  Building,
  Award,
  ShieldCheck,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Lock,
  Save,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useClassroom } from '../context/ClassroomContext';
import { useNotification } from '../context/NotificationContext';
import { CourseCard } from '../components/courses/CourseCard';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { courses, getCourseProgress } = useClassroom();
  const { showToast } = useNotification();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [institution, setInstitution] = useState(user?.institution || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [newPassword, setNewPassword] = useState('');
  const [notifyForums, setNotifyForums] = useState(true);
  const [notifyTasks, setNotifyTasks] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const enrolledCourses = courses.filter((c) => user.enrolledCourseIds.includes(c.id));
  const favoriteCourses = courses.filter((c) => user.favoriteCourseIds.includes(c.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateProfile({
        name: name.trim(),
        bio: bio.trim(),
        institution: institution.trim(),
        avatar: avatar.trim(),
      });
      setIsSaving(false);
      showToast('¡Perfil y preferencias actualizados correctamente!', 'success');
      if (newPassword) {
        setNewPassword('');
        showToast('Clave de acceso actualizada', 'success');
      }
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-red-500/30 shadow-2xl"
          />
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-white">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
            </p>
            <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
              <Building className="w-3.5 h-3.5 text-red-400" />
              <span>{user.institution || 'Comité de Autoprotección'}</span>
            </p>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Matriculados</span>
            <span className="text-lg font-black text-white">{enrolledCourses.length}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Insignias</span>
            <span className="text-lg font-black text-emerald-400">{user.certificatesEarned.length}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Favoritos</span>
            <span className="text-lg font-black text-amber-400">{favoriteCourses.length}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Settings & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Personal Data & Credentials Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-red-400" />
              <span>Administración de Datos Personales</span>
            </h2>
            <p className="text-xs text-slate-400">
              Actualiza tus credenciales, institución de pertenencia y preferencias de notificación.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Nombre Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Institución / Comunidad</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Biografía / Perfil de Rescate</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500 leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">URL del Avatar</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Password update */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Actualizar Clave de Acceso (Opcional)</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva clave secreta..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Notification checkboxes (as per Hito 1 wireframe page 4) */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Configuración de Alertas
              </h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyForums}
                    onChange={(e) => setNotifyForums(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-950 border-slate-800"
                  />
                  <span>Recibir alertas en tiempo real sobre respuestas a mis temas en foros</span>
                </label>
                <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyTasks}
                    onChange={(e) => setNotifyTasks(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-950 border-slate-800"
                  />
                  <span>Notificarme cuando un instructor califique mis simulacros o tareas</span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white shadow-lg shadow-red-600/30 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 5 Cols: Certificates & Insignias */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>Certificaciones &amp; Insignias</span>
              </h3>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
                Acreditado
              </span>
            </div>

            <div className="space-y-3">
              {user.certificatesEarned.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white leading-snug">{cert.courseTitle}</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-0.5 pt-1">
                    <p>Fecha de emisión: <strong className="text-slate-300">{cert.issueDate}</strong></p>
                    <p>Código de verificación: <code className="text-emerald-400 font-mono">{cert.code}</code></p>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs space-y-2">
                <span className="font-bold text-slate-300 block">Próxima Insignia por Obtener:</span>
                <p className="text-slate-400">
                  "Brigadista Contra Incendios Nivel I" al completar el curso de extintores y evacuación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
