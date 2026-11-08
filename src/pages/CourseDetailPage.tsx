import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  ShieldCheck,
  PlayCircle,
  CheckCircle,
  FileText,
  Calendar,
  Share2,
  Bookmark,
  Award,
} from 'lucide-react';
import { useClassroom } from '../context/ClassroomContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, enrollCourse, getCourseProgress } = useClassroom();
  const { user, isAuthenticated, toggleFavorite } = useAuth();
  const { showToast } = useNotification();

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Capacitación no encontrada</h2>
        <p className="text-sm text-slate-400">
          El curso solicitado no existe o ha sido modificado.
        </p>
        <Link
          to="/cursos"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-red-600 text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </Link>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourseIds.includes(course.id);
  const isFavorite = user?.favoriteCourseIds.includes(course.id);
  const progress = isEnrolled ? getCourseProgress(course.id) : 0;

  const handleEnroll = () => {
    if (!isAuthenticated) {
      showToast('Por favor inicia sesión para matricularte', 'info');
      navigate('/login', { state: { from: { pathname: `/cursos/${course.id}` } } });
      return;
    }
    enrollCourse(course.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Enlace del curso copiado al portapapeles', 'success');
    }
  };

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/cursos" className="hover:text-white flex items-center gap-1 transition">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver a cursos
        </Link>
        <span>/</span>
        <span className="text-slate-300 capitalize">{course.categoryLabel}</span>
        <span>/</span>
        <span className="text-white font-medium truncate max-w-xs">{course.title}</span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Info & Syllabus */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/40">
                {course.categoryLabel}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Nivel {course.level}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {course.durationHours} horas estimadas
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              {course.description}
            </p>

            {/* Ratings & Enrolled Meta */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-current text-amber-400" />
                <span>{course.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">calificación de estudiantes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-slate-200 font-bold">{course.totalStudents}</span>
                <span>brigadistas y alumnos matriculados</span>
              </div>
            </div>
          </div>

          {/* Instructor Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src={course.instructorAvatar}
              alt={course.instructorName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-red-500/40 shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left flex-1">
              <span className="text-[11px] uppercase tracking-wider font-bold text-red-400">
                Docente / Instructor Titular
              </span>
              <h3 className="text-base font-bold text-white">{course.instructorName}</h3>
              <p className="text-xs text-slate-400">{course.instructorRole}</p>
              <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                Especialista con amplia trayectoria en rescate prehospitalario, entrenamiento de brigadas de primera respuesta y gestión de riesgos ante catástrofes.
              </p>
            </div>
          </div>

          {/* Syllabus / Modules Accordion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Programa de Estudios y Lecciones</h3>
                <p className="text-xs text-slate-400">
                  {course.modules.length} módulos • {totalLessons} lecciones interactivas
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, mIdx) => (
                <div
                  key={module.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
                >
                  <div className="p-4 bg-slate-800/40 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{module.title}</span>
                    <span className="text-xs text-slate-400 font-medium">
                      {module.lessons.length} lecciones
                    </span>
                  </div>

                  <div className="divide-y divide-slate-800/60">
                    {module.lessons.map((lesson, lIdx) => (
                      <div key={lesson.id} className="p-4 space-y-2 hover:bg-slate-800/20 transition">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                              {lIdx + 1}
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-white">{lesson.title}</h4>
                          </div>
                          <span className="text-xs font-medium text-slate-400 shrink-0">
                            {lesson.duration}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 pl-8 leading-relaxed">
                          {lesson.summary}
                        </p>

                        <div className="pl-8 pt-1">
                          <ul className="space-y-1">
                            {lesson.keyPoints.map((point, pIdx) => (
                              <li key={pIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Action Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-slate-950">
            {/* Video / Cover preview */}
            <div className="relative aspect-video bg-slate-950">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-600/50 transition cursor-pointer">
                  <PlayCircle className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Progress if enrolled */}
              {isEnrolled ? (
                <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" /> Matriculado
                    </span>
                    <span className="font-bold text-white">{progress}% completado</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <Link
                    to={`/cursos/${course.id}/aula`}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center justify-center gap-2 shadow-lg transition"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Entrar al Aula de Aprendizaje</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center sm:text-left">
                    <span className="text-2xl font-black text-white">Acceso 100% Gratuito</span>
                    <p className="text-xs text-slate-400 mt-1">
                      Financiado para formación comunitaria y respuesta en emergencias.
                    </p>
                  </div>

                  <button
                    onClick={handleEnroll}
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Matricularme Ahora</span>
                  </button>
                </div>
              )}

              {/* What includes */}
              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                  Esta capacitación incluye:
                </h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{totalLessons} clases prácticas en video alta definición</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acceso a talleres sincrónicos por videoconferencia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tareas prácticas con evaluación y feedback docente</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Insignia oficial: <strong>{course.badgeName}</strong></span>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => toggleFavorite(course.id)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    isFavorite
                      ? 'bg-red-950/60 text-red-300 border-red-700/60'
                      : 'border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                  <span>{isFavorite ? 'Guardado' : 'Guardar'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center gap-1.5 transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
