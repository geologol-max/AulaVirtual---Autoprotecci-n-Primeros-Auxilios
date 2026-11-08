import React from 'react';
import { Search, Filter, ShieldAlert, Flame, Activity, Brain } from 'lucide-react';

interface CourseFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export const CourseFilter: React.FC<CourseFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
}) => {
  const categories = [
    { id: 'todos', label: 'Todos los Cursos', icon: null },
    { id: 'primeros-auxilios', label: 'Primeros Auxilios & RCP', icon: ShieldAlert },
    { id: 'incendios', label: 'Incendios & Evacuación', icon: Flame },
    { id: 'sismos', label: 'Sismos & Terremotos', icon: Activity },
    { id: 'psicologia-emergencia', label: 'Psicología de Emergencia', icon: Brain },
  ];

  const levels = ['Todos', 'Básico', 'Intermedio', 'Avanzado'];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-5">
      {/* Search Input & Level Selector */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por técnica (ej: RCP, extintor, torniquete, sismos)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-400">Nivel:</span>
            <select
              value={selectedLevel}
              onChange={(e) => onLevelChange(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl} className="bg-slate-900 text-white">
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800/80">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25 border border-red-500'
                  : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
