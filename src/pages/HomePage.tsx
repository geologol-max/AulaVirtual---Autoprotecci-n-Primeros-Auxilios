import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Flame,
  Activity,
  ShieldCheck,
  Video,
  FileCheck2,
  Users,
  Award,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { useClassroom } from '../context/ClassroomContext';
import { useAuth } from '../context/AuthContext';
import { CourseCard } from '../components/courses/CourseCard';
import { LiveSessionCard } from '../components/live/LiveSessionCard';

export const HomePage: React.FC = () => {
  const { courses, liveSessions, joinLiveSession } = useClassroom();
  const { isAuthenticated, user } = useAuth();

  const featuredCourses = courses.slice(0, 3);
  const nextLive = liveSessions[0];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-12 pb-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.25),rgba(255,255,255,0))]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-700/60 text-red-300 text-xs font-bold uppercase tracking-wider">
                <HeartPulse className="w-4 h-4 text-red-400 animate-pulse" />
                <span>Formación Práctica que Salva Vidas</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Aula Virtual de <span className="text-red-500">Autoprotección</span> y Primeros Auxilios
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Capacítate en técnicas actualizadas de RCP y DEA, evacuación en incendios, respuesta inmediata ante sismos y contención de hemorragias. Clases sincrónicas en vivo, simulación de casos y evaluaciones prácticas certificadas.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-xl shadow-red-600/30 flex items-center gap-2 transition transform hover:-translate-y-0.5"
                  >
                    <span>Ir a Mi Centro de Comando</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    to="/registro"
                    className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-xl shadow-red-600/30 flex items-center gap-2 transition transform hover:-translate-y-0.5"
                  >
                    <span>Inscribirme en el Aula Virtual</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                <Link
                  to="/cursos"
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition"
                >
                  Explorar Catálogo de Cursos
                </Link>
              </div>

              {/* Key Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Protocolos ERC / AHA</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clases en Vivo con SAMU</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certificación por Módulos</span>
                </div>
              </div>
            </div>

            {/* Right Live Card Preview */}
            <div className="lg:col-span-5">
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-red-950/40">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Próxima Transmisión Sincrónica
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">Aula Virtual 1</span>
                </div>

                {nextLive && (
                  <div className="mt-4 space-y-4">
                    <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-800 group">
                      <img
                        src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&auto=format&fit=crop&q=80"
                        alt="Taller en vivo"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/50 mb-2">
                          <Video className="w-6 h-6 animate-pulse" />
                        </div>
                        <p className="text-xs font-bold text-white uppercase tracking-wider">
                          Taller Clínico en Tiempo Real
                        </p>
                        <p className="text-[11px] text-slate-300 mt-1 max-w-xs">{nextLive.title}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white leading-tight">{nextLive.title}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-2">
                        <span>{nextLive.instructor}</span> •{' '}
                        <span className="text-red-400 font-semibold">{nextLive.participantsCount} personas esperando</span>
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        to="/videoconferencias"
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition"
                      >
                        <Video className="w-4 h-4" />
                        <span>Entrar a la Sala de Videoconferencia</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-800/40">
            Ejes de Formación
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Preparados para Actuar en Momentos Decisivos
          </h2>
          <p className="text-sm text-slate-400">
            El Aula Virtual cubre de forma integral las 4 fases críticas del ciclo de emergencias y autoprotección comunitaria:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-red-500/50 transition group">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Primeros Auxilios &amp; RCP</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maniobras de resucitación cardiopulmonar, operación de DEA y desobstrucción de vía aérea por asfixia.
            </p>
            <Link
              to="/cursos?cat=primeros-auxilios"
              className="mt-4 text-xs font-bold text-red-400 hover:text-red-300 inline-flex items-center gap-1"
            >
              Ver cursos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/50 transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Combate de Fuego &amp; Humo</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uso de extintores portátiles PQS y CO2, rutas de evacuación expeditas y control de amagos iniciales.
            </p>
            <Link
              to="/cursos?cat=incendios"
              className="mt-4 text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
            >
              Ver cursos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Autoprotección Sísmica</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identificación de zonas de seguridad estructural, preparación de mochila de 72 horas y corte de servicios básicos.
            </p>
            <Link
              to="/cursos?cat=sismos"
              className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
            >
              Ver cursos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Planes de Emergencia</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diseño de mapas de evacuación familiar y comunitaria, asignación de roles de brigadistas y protocolos vecinales.
            </p>
            <Link
              to="/cursos"
              className="mt-4 text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              Ver cursos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              Formación Destacada
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1">
              Cursos y Capacitaciones Principales
            </h2>
          </div>
          <Link
            to="/cursos"
            className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 shrink-0"
          >
            <span>Ver todos los cursos ({courses.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={user?.enrolledCourseIds.includes(course.id)}
            />
          ))}
        </div>
      </section>

      {/* Virtual Classroom Feature Grid (Hito 1 Prototype requirements) */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Arquitectura del Aula Virtual
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Diseñada para la integración de aprendizaje autónomo y actividades sincrónicas supervisadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Videoconferencias en Vivo</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interacción directa con paramédicos e instructores bomberiles. Chat sincrónico, opción de levantar la mano y simulación de incidentes.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Entrega de Tareas y Notas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Envía tus croquis de evacuación, videos de simulación de RCP y auditorías de extintores para recibir retroalimentación docente calificada.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Comunidad y Foros de Caso</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Plantea tus dudas sobre situaciones reales, comparte experiencias comunitarias y debate las mejores prácticas ante catástrofes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-red-900 via-rose-900 to-slate-900 border border-red-700/50 p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              ¿Listo para convertirte en un respondedor de emergencias?
            </h2>
            <p className="text-sm text-red-100">
              Crea tu cuenta gratuita hoy mismo, inscríbete en nuestros cursos y participa en los próximos simulacros en vivo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/registro"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-100 text-red-900 shadow-xl transition"
            >
              Registrarme Gratis
            </Link>
            <Link
              to="/cursos"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-red-950/80 hover:bg-red-950 text-white border border-red-700 transition"
            >
              Ver Cursos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
