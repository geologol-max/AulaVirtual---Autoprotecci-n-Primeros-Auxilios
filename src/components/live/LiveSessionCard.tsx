import React from 'react';
import { Video, Calendar, Clock, Users, ArrowRight, Radio } from 'lucide-react';
import { LiveSession } from '../../types';

interface LiveSessionCardProps {
  session: LiveSession;
  onJoin: (sessionId: string) => void;
}

export const LiveSessionCard: React.FC<LiveSessionCardProps> = ({ session, onJoin }) => {
  const isLive = session.status === 'en-vivo';

  return (
    <div
      className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all duration-300 ${
        isLive
          ? 'bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 border-red-600/60 shadow-lg shadow-red-950/30'
          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="space-y-3">
        {/* Status Badge */}
        <div className="flex items-center justify-between gap-2">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-red-600 text-white shadow-md shadow-red-600/30">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              EN VIVO AHORA
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Programada
            </span>
          )}

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{session.participantsCount} inscritos</span>
          </div>
        </div>

        {/* Title & Course */}
        <div>
          <span className="text-xs font-medium text-red-400 block mb-1">{session.courseTitle}</span>
          <h3 className="text-base font-bold text-white leading-snug">{session.title}</h3>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
          {session.description}
        </p>
      </div>

      {/* Meta & Join Button */}
      <div className="pt-3 border-t border-slate-800/80 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <img
              src={session.instructorAvatar}
              alt={session.instructor}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-700"
            />
            <span className="font-medium">{session.instructor}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {session.date} • {session.time} ({session.durationMinutes} min)
            </span>
          </div>
        </div>

        <button
          onClick={() => onJoin(session.id)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
            isLive
              ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 animate-pulse'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>{isLive ? 'Ingresar al Aula en Vivo' : 'Configurar Recordatorio & Acceso'}</span>
          <ArrowRight className="w-4 h-4 ml-auto" />
        </button>
      </div>
    </div>
  );
};
