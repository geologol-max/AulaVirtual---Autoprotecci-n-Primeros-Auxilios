import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { useClassroom } from '../context/ClassroomContext';
import { useAuth } from '../context/AuthContext';
import { CourseCard } from '../components/courses/CourseCard';
import { CourseFilter } from '../components/courses/CourseFilter';

export const CoursesCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'todos';

  const { courses } = useClassroom();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState('Todos');

  // Handle category change and sync with search params
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'todos') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat });
    }
  };

  // Filter courses reactively using useMemo
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'todos' || course.category === selectedCategory;

      // Level filter
      const matchesLevel =
        selectedLevel === 'Todos' || course.level === selectedLevel;

      // Search query filter (title, description, tags, instructor)
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.shortDescription.toLowerCase().includes(q) ||
        course.instructorName.toLowerCase().includes(q) ||
        course.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesLevel && matchesQuery;
    });
  }, [courses, selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-red-950/60 text-red-400 border border-red-800/40">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Galería de Publicaciones y Cursos</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Catálogo de Capacitaciones en Emergencias
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Selecciona una capacitación para inscribirte de forma inmediata, acceder a los materiales de estudio interactivos y participar en los talleres de simulación sincrónica.
        </p>
      </div>

      {/* Filters */}
      <CourseFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>
          Mostrando <strong className="text-white font-bold">{filteredCourses.length}</strong> de {courses.length} capacitaciones
        </span>
        {(searchQuery || selectedCategory !== 'todos' || selectedLevel !== 'Todos') && (
          <button
            onClick={() => {
              setSearchQuery('');
              handleCategoryChange('todos');
              setSelectedLevel('Todos');
            }}
            className="text-red-400 hover:text-red-300 font-semibold underline underline-offset-2"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={user?.enrolledCourseIds.includes(course.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-white">No se encontraron cursos coincidentes</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No hay capacitaciones con los criterios de búsqueda actuales. Intenta cambiar de categoría o buscar con otra palabra clave.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              handleCategoryChange('todos');
              setSelectedLevel('Todos');
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}
    </div>
  );
};
