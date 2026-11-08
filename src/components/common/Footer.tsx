import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, PhoneCall, ShieldCheck, Flame, Activity, Siren, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      {/* Emergency Hotlines Strip */}
      <div className="bg-red-950/40 border-b border-red-900/30 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2 text-red-300">
            <Siren className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="font-bold uppercase tracking-wider">Líneas de Emergencia Inmediata:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-red-900/50">
              <HeartPulse className="w-3.5 h-3.5 text-red-400" />
              <strong>SAMU Ambulancias:</strong> 131
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-amber-900/50">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <strong>Bomberos:</strong> 132
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-blue-900/50">
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              <strong>Carabineros:</strong> 133
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-emerald-900/50">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <strong>CONAF Incendios Forestales:</strong> 130
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                AulaVirtual <span className="text-red-500">Autoprotección</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Plataforma e-learning para la formación ciudadana y técnica en primeros auxilios, autoprotección ante sismos, protocolos de incendios y respuesta en emergencias.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              Contenidos basados en guías ERC &amp; AHA
            </div>
          </div>

          {/* Column 2: Cursos y Especialidades */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Especialidades</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cursos?cat=primeros-auxilios" className="hover:text-white transition">
                  Soporte Vital Básico &amp; RCP
                </Link>
              </li>
              <li>
                <Link to="/cursos?cat=incendios" className="hover:text-white transition">
                  Uso de Extintores &amp; Evacuación
                </Link>
              </li>
              <li>
                <Link to="/cursos?cat=sismos" className="hover:text-white transition">
                  Autoprotección Sísmica 72h
                </Link>
              </li>
              <li>
                <Link to="/cursos?cat=primeros-auxilios" className="hover:text-white transition">
                  Control de Hemorragias
                </Link>
              </li>
              <li>
                <Link to="/cursos?cat=psicologia-emergencia" className="hover:text-white transition">
                  Primeros Auxilios Psicológicos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Módulos del Aula */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Navegación del Aula</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Centro de Comando (Dashboard)
                </Link>
              </li>
              <li>
                <Link to="/videoconferencias" className="hover:text-white transition">
                  Videoconferencias en Vivo
                </Link>
              </li>
              <li>
                <Link to="/tareas" className="hover:text-white transition">
                  Entrega de Tareas &amp; Evaluaciones
                </Link>
              </li>
              <li>
                <Link to="/foros" className="hover:text-white transition">
                  Foros de Discusión &amp; Casos
                </Link>
              </li>
              <li>
                <Link to="/crear-curso" className="hover:text-white transition">
                  Publicar Nueva Capacitación
                </Link>
              </li>
              <li>
                <Link to="/perfil" className="hover:text-white transition">
                  Mi Perfil &amp; Certificados
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Proyecto & Hitos */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Marco del Proyecto</h4>
            <p className="text-xs text-slate-400">
              Desarrollado bajo los requerimientos de los <strong>Hitos 1 y 2</strong> de la Carrera de Desarrollo Full Stack:
            </p>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span>Hito 1: Prototipo y Arquitectura</span>
                <span className="text-emerald-400 font-bold">100%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Hito 2: Desarrollo Frontend React</span>
                <span className="text-emerald-400 font-bold">Completado</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Hitos 3, 4 y 5: Backend &amp; DB</span>
                <span>Próximamente</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Incluye React Router, Context API, Redirección Programática, Componentes Reutilizables y Custom Hooks.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AulaVirtual Autoprotección y Primeros Auxilios. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            <span>Diseñado con vocación comunitaria y prevención de desastres.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
