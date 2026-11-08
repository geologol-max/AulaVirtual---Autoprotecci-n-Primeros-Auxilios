import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Image as ImageIcon, BookOpen, Clock, Award, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useClassroom } from '../context/ClassroomContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Course } from '../types';

export const CreateCoursePage: React.FC = () => {
  const navigate = useNavigate();
  const { createCourse } = useClassroom();
  const { user } = useAuth();
  const { showToast } = useNotification();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'primeros-auxilios' | 'incendios' | 'sismos' | 'autoproteccion' | 'psicologia-emergencia'>('autoproteccion');
  const [level, setLevel] = useState<'Básico' | 'Intermedio' | 'Avanzado'>('Básico');
  const [durationHours, setDurationHours] = useState(8);
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80');
  const [badgeName, setBadgeName] = useState('Certificación en Autoprotección Comunitaria');
  const [initialLessonTitle, setInitialLessonTitle] = useState('1. Protocolo de Evaluación Inicial de Riesgos');
  const [keyPoint1, setKeyPoint1] = useState('Verificación del perímetro y evaluación de peligros secundarios');
  const [keyPoint2, setKeyPoint2] = useState('Comunicación inmediata y delimitación de la zona de seguridad');
  const [tags, setTags] = useState('Autoprotección, Seguridad, Prevención');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imagePresets = [
    { label: 'Brigada', url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80' },
    { label: 'Primeros Auxilios', url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&auto=format&fit=crop&q=80' },
    { label: 'Fuego', url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&auto=format&fit=crop&q=80' },
    { label: 'Sismos', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80' },
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'primeros-auxilios': return 'Primeros Auxilios';
      case 'incendios': return 'Incendios & Fuego';
      case 'sismos': return 'Sismos & Terremotos';
      case 'psicologia-emergencia': return 'Psicología de Emergencia';
      default: return 'Autoprotección';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !shortDescription.trim()) {
      showToast('Por favor completa el título y el resumen de la capacitación', 'error');
      return;
    }

    setIsSubmitting(true);

    const tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean);

    const newCourseData: Partial<Course> = {
      title: title.trim(),
      category,
      categoryLabel: getCategoryLabel(category),
      level,
      durationHours: Number(durationHours),
      shortDescription: shortDescription.trim(),
      description: description.trim() || shortDescription.trim(),
      coverImage,
      badgeName: badgeName.trim(),
      tags: tagsArray,
      modules: [
        {
          id: `mod-${Date.now()}`,
          title: 'Módulo 1: Fundamentos y Procedimientos Operativos',
          lessons: [
            {
              id: `les-${Date.now()}-1`,
              title: initialLessonTitle.trim(),
              duration: '20 min',
              summary: 'Introducción teórica y aplicación práctica en el terreno.',
              keyPoints: [keyPoint1.trim(), keyPoint2.trim()],
              completed: false,
            },
          ],
        },
      ],
    };

    setTimeout(() => {
      createCourse(newCourseData);
      setIsSubmitting(false);
      // Programmatic redirection to catalog
      navigate('/cursos');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Formulario de Publicación Oficial</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Publicar Nueva Capacitación o Curso de Emergencia
        </h1>
        <p className="text-sm text-slate-400">
          Como instructor o brigadista acreditado, puedes diseñar nuevos módulos formativos y ponerlos a disposición de toda la comunidad del Aula Virtual.
        </p>
      </div>

      {/* Main Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Título de la Capacitación / Publicación
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ej: Guía Operativa de Evacuación en Establecimientos Educacionales"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Category, Level, Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Especialidad</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="primeros-auxilios">Primeros Auxilios</option>
                <option value="incendios">Incendios & Evacuación</option>
                <option value="sismos">Sismos & Terremotos</option>
                <option value="autoproteccion">Autoprotección General</option>
                <option value="psicologia-emergencia">Psicología de Emergencia</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Nivel de Dificultad</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Duración Estimada (Horas)</label>
              <input
                type="number"
                min={1}
                max={100}
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Resumen Corto (Mostrado en la tarjeta del catálogo)
            </label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Aprende a planificar y liderar la evacuación ante amagos de incendio y emergencias estructurales."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Descripción Detallada y Objetivos Pedagógicos
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalla los contenidos específicos, requisitos, simulacros contemplados y competencias que desarrollará el brigadista..."
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 leading-relaxed"
            />
          </div>

          {/* Cover Image & Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Imagen de Portada (URL)</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[11px] text-slate-500">Imágenes sugeridas:</span>
              <div className="flex items-center gap-2">
                {imagePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCoverImage(preset.url)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                      coverImage === preset.url
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Badge name & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Nombre de la Insignia / Certificado
              </label>
              <input
                type="text"
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Etiquetas / Tags (separadas por coma)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Module 1 & Initial Lesson Setup */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Contenido Inicial: Lección 1 del Módulo
            </h4>
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 font-semibold">Título de la Lección</label>
              <input
                type="text"
                value={initialLessonTitle}
                onChange={(e) => setInitialLessonTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Punto Clave 1</label>
                <input
                  type="text"
                  value={keyPoint1}
                  onChange={(e) => setKeyPoint1(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Punto Clave 2</label>
                <input
                  type="text"
                  value={keyPoint2}
                  onChange={(e) => setKeyPoint2(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => navigate('/cursos')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white shadow-lg shadow-red-600/30 transition flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Publicando...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publicar Capacitación en el Aula</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
