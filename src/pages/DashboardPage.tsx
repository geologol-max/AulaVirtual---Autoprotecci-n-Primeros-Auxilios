import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  FileCheck2,
  Award,
  Clock,
  Calendar,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  PlusCircle,
  Radio,
  Bookmark,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useClassroom } from '../context/ClassroomContext';
import { CourseCard } from '../components/courses/CourseCard';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { courses, tasks, submissions, liveSessions, getCourseProgress } = useClassroom();

  if (!user) return null;

  // Enrolled courses list
  const enrolledCourses = courses.filter((c) => user.enrolledCourseIds.includes(c.id));
  const favoriteCourses = courses.filter((c) => user.favoriteCourseIds.includes(c.id));

  // User pending and submitted tasks
  const userSubmissions = submissions.filter((s) => s.studentId === user.id);
  const pendingTasks = tasks.filter(
    (t) => !userSubmissions.some((s) => s.taskId === t.id)
  );

  // Calculate average grade
  const gradedSubmissions = userSubmissions.filter((s) => s.grade !== undefined);
  const averageGrade =
    gradedSubmissions.length > 0
      ? Math.round(
          gradedSubmissions.reduce((acc, s) => acc + (s.grade || 0), 0) /
            gradedSubmissions.length
        )
      : null;

  const nextLiveSession = liveSessions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 border border-red-900/40 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-red-500 shadow-xl shadow-red-600/20"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Hola, {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-600 text-white shadow">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {user.institution || 'Comité de Autoprotección y Emergencias'} • {user.email}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/videoconferencias"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 flex items-center gap-2 transition"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Unirme a Clase en Vivo</span>
            </Link>

            <Link
              to="/crear-curso"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Publicar Capacitación</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Counter Strip (Center of Command) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Cursos Activos</span>
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white">{enrolledCourses.length}</p>
          <span className="text-[11px] text-slate-500">En aprendizaje</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Tareas Pendientes</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">{pendingTasks.length}</p>
          <span className="text-[11px] text-slate-500">Por entregar</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Promedio Práctico</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">
            {averageGrade !== null ? `${averageGrade} pts` : '—'}
          </p>
          <span className="text-[11px] text-slate-500">
            {gradedSubmissions.length} evaluaciones
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Certificados</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-purple-400">
            {user.certificatesEarned.length}
          </p>
          <span className="text-[11px] text-slate-500">Insignias oficiales</span>
        </div>
      </div>

      {/* Next Live Class Alert Banner */}
      {nextLiveSession && (
        <div className="bg-slate-900 border border-red-600/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-red-950/20">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 border border-red-600/40 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white">
                  {nextLiveSession.status === 'en-vivo' ? 'En Vivo Ahora' : 'Próxima Clase'}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {nextLiveSession.date} • {nextLiveSession.time}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-0.5">{nextLiveSession.title}</h3>
            </div>
          </div>

          <Link
            to="/videoconferencias"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center justify-center gap-1.5 shadow-md shadow-red-600/20 transition shrink-0"
          >
            <span>Ingresar a la Sala</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Main Grid: My Courses vs Right Column Calendar & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Enrolled Courses */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Mis Cursos y Capacitaciones Activas</h2>
              <p className="text-xs text-slate-400">
                Continúa con tu plan de aprendizaje y autoprotección
              </p>
            </div>
            <Link
              to="/cursos"
              className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              <span>Ver catálogo completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={true}
                  progress={getCourseProgress(course.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
              <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No tienes cursos matriculados</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explora el catálogo de primeros auxilios, incendios y sismos para comenzar tu formación comunitaria.
              </p>
              <Link
                to="/cursos"
                className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold bg-red-600 text-white"
              >
                Explorar Cursos Disponibles
              </Link>
            </div>
          )}

          {/* Bookmarked / Favorite Courses */}
          {favoriteCourses.length > 0 && (
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Bookmark className="w-4 h-4 text-amber-400 fill-current" />
                <span>Capacitaciones Guardadas en Favoritos</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favoriteCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{course.title}</h4>
                        <span className="text-[10px] text-slate-400">{course.categoryLabel}</span>
                      </div>
                    </div>
                    <Link
                      to={`/cursos/${course.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shrink-0"
                    >
                      Ver
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Tareas & Calendario Resumido */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tareas del Alumno */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                Actividades y Tareas
              </h3>
              <Link to="/tareas" className="text-xs text-red-400 font-semibold hover:underline">
                Ver todas
              </Link>
            </div>

            <div className="space-y-3">
              {tasks.slice(0, 3).map((task) => {
                const sub = userSubmissions.find((s) => s.taskId === task.id);
                return (
                  <div
                    key={task.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                        {task.type}
                      </span>
                      {sub?.status === 'calificada' ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {sub.grade} pts
                        </span>
                      ) : sub ? (
                        <span className="text-amber-400 font-medium">Entregada</span>
                      ) : (
                        <span className="text-red-400 font-bold">Pendiente</span>
                      )}
                    </div>
                    <h4 className="font-bold text-white line-clamp-1">{task.title}</h4>
                    <p className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Vence: {task.dueDate}</span>
                      <Link to="/tareas" className="text-red-400 hover:underline font-semibold">
                        {sub ? 'Revisar' : 'Entregar'}
                      </Link>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Emergency Protocol Box */}
          <div className="bg-gradient-to-br from-red-950/60 to-slate-900 border border-red-900/50 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Protocolo de Emergencia Rápido</span>
            </div>
            <h4 className="text-sm font-bold text-white">¿Presenciaste una emergencia?</h4>
            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal pl-4">
              <li><strong>Proteger:</strong> Asegura la zona antes de acercarte.</li>
              <li><strong>Avisar:</strong> Llama al 131 (SAMU) o 132 (Bomberos).</li>
              <li><strong>Socorrer:</strong> Aplica RCP solo con las manos si no respira.</li>
            </ol>
            <Link
              to="/cursos/c1/aula"
              className="mt-2 block w-full py-2 px-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-600/40 text-center text-xs font-bold transition"
            >
              Repasar Guía Rápida de RCP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
