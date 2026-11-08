import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Bookmark, PlayCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { Course } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useClassroom } from '../../context/ClassroomContext';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  progress?: number;
  showEnrollButton?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled = false,
  progress = 0,
  showEnrollButton = true,
}) => {
  const { user, isAuthenticated, toggleFavorite } = useAuth();
  const { enrollCourse } = useClassroom();
  const navigate = useNavigate();

  const isFavorite = user?.favoriteCourseIds.includes(course.id);

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    enrollCourse(course.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toggleFavorite(course.id);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'primeros-auxilios':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'incendios':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'sismos':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'psicologia-emergencia':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      default:
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="group flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-red-950/20 transition-all duration-300 overflow-hidden">
      {/* Course Image & Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border backdrop-blur-md uppercase tracking-wider ${getCategoryColor(
              course.category
            )}`}
          >
            {course.categoryLabel}
          </span>
          {course.isPopular && (
            <span className="px-2 py-1 text-[10px] font-black rounded-lg bg-red-600 text-white shadow uppercase tracking-wider">
              Destacado
            </span>
          )}
        </div>

        {/* Favorite Bookmark Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
          aria-label={isFavorite ? 'Quitar de guardados' : 'Guardar curso'}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Level & Duration */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-700/60 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.durationHours} horas</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-lg backdrop-blur-sm border border-slate-700/60 font-medium text-amber-300">
            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>{course.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/cursos/${course.id}`} className="block group/link">
            <h3 className="text-base font-bold text-white group-hover/link:text-red-400 transition-colors line-clamp-2 leading-snug">
              {course.title}
            </h3>
          </Link>
          <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Progress Bar (if enrolled) */}
        {isEnrolled && (
          <div className="space-y-1.5 pt-1 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Progreso del aula:</span>
              <span className={`font-bold ${progress === 100 ? 'text-emerald-400' : 'text-red-400'}`}>
                {progress}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-red-600 to-rose-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Instructor & Meta */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={course.instructorAvatar}
              alt={course.instructorName}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-700"
            />
            <div className="text-[11px] leading-tight">
              <p className="text-slate-200 font-medium truncate max-w-[120px]">{course.instructorName}</p>
              <p className="text-slate-500 truncate max-w-[120px]">{course.instructorRole}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>{course.totalStudents}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isEnrolled ? (
            <Link
              to={`/cursos/${course.id}/aula`}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-950 transition"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Continuar Aprendizaje</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                to={`/cursos/${course.id}`}
                className="py-2 px-3 rounded-xl text-xs font-semibold text-center border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                Ver Detalle
              </Link>
              {showEnrollButton && (
                <button
                  onClick={handleEnrollClick}
                  className="py-2 px-3 rounded-xl text-xs font-bold text-center bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20 transition flex items-center justify-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Inscribirse
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
