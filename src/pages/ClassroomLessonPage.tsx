import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize2,
  ChevronRight,
  ChevronLeft,
  FileCheck2,
  Video,
  BookmarkCheck,
  AlertTriangle,
} from 'lucide-react';
import { useClassroom } from '../context/ClassroomContext';
import { useNotification } from '../context/NotificationContext';
import { Lesson } from '../types';

export const ClassroomLessonPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, toggleLessonCompletion, getCourseProgress } = useClassroom();
  const { showToast } = useNotification();

  const course = courses.find((c) => c.id === courseId);

  // Flatten lessons for easy indexing
  const allLessons = useMemo(() => {
    if (!course) return [];
    const list: { lesson: Lesson; moduleTitle: string; index: number }[] = [];
    course.modules.forEach((mod) => {
      mod.lessons.forEach((les) => {
        list.push({ lesson: les, moduleTitle: mod.title, index: list.length });
      });
    });
    return list;
  }, [course]);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);

  if (!course || allLessons.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Aula de aprendizaje no disponible</h2>
        <Link to="/cursos" className="text-red-400 underline text-sm">
          Volver a la galería de cursos
        </Link>
      </div>
    );
  }

  const currentItem = allLessons[currentLessonIndex] || allLessons[0];
  const { lesson, moduleTitle } = currentItem;
  const courseProgress = getCourseProgress(course.id);

  const handleToggleComplete = () => {
    toggleLessonCompletion(course.id, lesson.id);
    const willBeCompleted = !lesson.completed;
    showToast(
      willBeCompleted
        ? `¡Lección marcada como completada! Progreso: ${getCourseProgress(course.id)}%`
        : 'Lección marcada como pendiente',
      willBeCompleted ? 'success' : 'info'
    );
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setIsPlaying(false);
    } else {
      showToast('¡Has llegado al final de las lecciones de este curso!', 'success');
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to={`/cursos/${course.id}`}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Volver al detalle del curso"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white truncate max-w-sm sm:max-w-md">
              {course.title}
            </h1>
            <p className="text-[11px] text-slate-400 truncate">{moduleTitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-slate-400">Progreso general:</span>
            <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-400">{courseProgress}%</span>
          </div>

          <Link
            to="/videoconferencias"
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600/20 text-red-400 border border-red-600/40 hover:bg-red-600/30 transition flex items-center gap-1.5"
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sala en Vivo</span>
          </Link>
        </div>
      </div>

      {/* Main Classroom Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Player & Lesson Content */}
        <div className="lg:col-span-8 p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          {/* Simulated Video Player */}
          <div className="relative aspect-video w-full rounded-2xl bg-black border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between group">
            {/* Background Simulated Video Image */}
            <div className="absolute inset-0">
              <img
                src={course.coverImage}
                alt={lesson.title}
                className="w-full h-full object-cover filter brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
            </div>

            {/* Video Top Bar */}
            <div className="relative z-10 p-4 flex items-center justify-between text-xs text-white drop-shadow">
              <span className="font-semibold bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                {lesson.title}
              </span>
              <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
                HD 1080p
              </span>
            </div>

            {/* Big Center Play Button */}
            <div className="relative z-10 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-600/40 transition transform hover:scale-110"
                aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </div>

            {/* Video Bottom Controls */}
            <div className="relative z-10 p-4 space-y-2 bg-gradient-to-t from-black/95 to-transparent">
              {/* Progress Bar scrubber */}
              <div
                className="w-full bg-white/20 hover:bg-white/30 h-1.5 rounded-full cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPercent = Math.round((clickX / rect.width) * 100);
                  setVideoProgress(Math.max(0, Math.min(100, newPercent)));
                }}
              >
                <div
                  className="bg-red-600 h-full rounded-full relative"
                  style={{ width: `${videoProgress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white pt-1">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-red-400">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setVideoProgress(0)}
                    className="hover:text-red-400"
                    title="Reiniciar video"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-slate-300" />
                    <span>04:12 / {lesson.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-semibold">
                    1.0x
                  </span>
                  <button className="hover:text-red-400">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Actions & Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  Lección {currentLessonIndex + 1} de {allLessons.length}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{lesson.title}</h2>
              </div>

              <button
                onClick={handleToggleComplete}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  lesson.completed
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {lesson.completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Lección Completada</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>Marcar como Completada</span>
                  </>
                )}
              </button>
            </div>

            {/* Key Emergency Points */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-red-400" />
                Puntos Críticos de Actuación:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-5 h-5 rounded-full bg-red-600/20 text-red-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Protocol Tip */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Recordatorio de Seguridad Operativa:</strong>
                <p className="leading-relaxed text-amber-200/90">
                  Nunca intentes realizar maniobras avanzadas de rescate sin haber asegurado primero la escena (Regla PAS). Tu integridad es la prioridad número uno en cualquier incidente.
                </p>
              </div>
            </div>

            {/* Lesson Navigation Bottom Controls */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={handlePrevLesson}
                disabled={currentLessonIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-white border border-slate-700 flex items-center gap-1.5 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Lección Anterior</span>
              </button>

              <button
                onClick={handleNextLesson}
                disabled={currentLessonIndex === allLessons.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:pointer-events-none text-white shadow-md shadow-red-600/20 flex items-center gap-1.5 transition"
              >
                <span>Siguiente Lección</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Module & Lessons Sidebar Playlist */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/50 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-120px)] space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Contenido del Curso</h3>
            <p className="text-xs text-slate-400">
              {allLessons.filter((l) => l.lesson.completed).length} de {allLessons.length} lecciones completadas
            </p>
          </div>

          <div className="space-y-4">
            {course.modules.map((mod) => (
              <div key={mod.id} className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {mod.title}
                </span>

                <div className="space-y-1.5">
                  {mod.lessons.map((les) => {
                    const idx = allLessons.findIndex((item) => item.lesson.id === les.id);
                    const isSelected = idx === currentLessonIndex;

                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setCurrentLessonIndex(idx);
                          setIsPlaying(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs transition flex items-start gap-3 ${
                          isSelected
                            ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/20'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {les.completed ? (
                            <CheckCircle2
                              className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-400'}`}
                            />
                          ) : (
                            <Circle
                              className={`w-4 h-4 ${isSelected ? 'text-white/80' : 'text-slate-600'}`}
                            />
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="leading-snug">{les.title}</p>
                          <span
                            className={`text-[10px] mt-1 block ${
                              isSelected ? 'text-red-100' : 'text-slate-500'
                            }`}
                          >
                            {les.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick links to assignments and forum */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <Link
              to="/tareas"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-2 transition"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Ver Tareas Prácticas de este Curso</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
