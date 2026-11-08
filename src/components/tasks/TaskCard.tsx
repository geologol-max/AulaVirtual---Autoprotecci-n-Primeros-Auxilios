import React from 'react';
import { Calendar, CheckCircle2, Clock, FileText, Award, AlertCircle, ArrowRight } from 'lucide-react';
import { Task, TaskSubmission } from '../../types';

interface TaskCardProps {
  task: Task;
  submission?: TaskSubmission;
  onOpenSubmissionModal: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  submission,
  onOpenSubmissionModal,
}) => {
  const isSubmitted = !!submission;
  const isGraded = submission?.status === 'calificada' && submission.grade !== undefined;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between gap-4">
      <div className="space-y-3">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
            {task.type}
          </span>

          {isGraded ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Nota: {submission.grade} / {task.points} pts
            </span>
          ) : isSubmitted ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-700/60">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Entregada (En Revisión)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-950/80 text-red-300 border border-red-700/60">
              <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              Pendiente de Entrega
            </span>
          )}
        </div>

        {/* Title & Course */}
        <div>
          <h3 className="text-base font-bold text-white leading-snug">{task.title}</h3>
          <p className="text-xs font-medium text-red-400 mt-1">{task.courseTitle}</p>
        </div>

        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
          {task.instructions}
        </p>
      </div>

      {/* Due Date & Submission details */}
      <div className="pt-3 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Fecha límite: <strong className="text-slate-300">{task.dueDate}</strong>
          </span>
          <span className="font-semibold text-slate-300">{task.points} puntos</span>
        </div>

        {submission?.feedback && (
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <p className="font-semibold text-emerald-400 flex items-center gap-1 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Retroalimentación Docente:
            </p>
            <p className="text-slate-300 italic">"{submission.feedback}"</p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => onOpenSubmissionModal(task)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
            isGraded
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              : isSubmitted
              ? 'bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-600/40'
              : 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>
            {isGraded
              ? 'Ver Detalles y Retroalimentación'
              : isSubmitted
              ? 'Actualizar Envío de Tarea'
              : 'Subir Entrega de Tarea'}
          </span>
          <ArrowRight className="w-3.5 h-3.5 ml-auto" />
        </button>
      </div>
    </div>
  );
};
