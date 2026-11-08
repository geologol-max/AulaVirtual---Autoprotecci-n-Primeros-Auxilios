import React, { useState } from 'react';
import {
  FileCheck2,
  Calendar,
  Clock,
  Award,
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Filter,
} from 'lucide-react';
import { useClassroom } from '../context/ClassroomContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Task, TaskSubmission } from '../types';
import { TaskCard } from '../components/tasks/TaskCard';

export const TasksPage: React.FC = () => {
  const { tasks, submissions, submitTask } = useClassroom();
  const { user } = useAuth();
  const { showToast } = useNotification();

  const [filterStatus, setFilterStatus] = useState<'todas' | 'pendientes' | 'entregadas' | 'calificadas'>('todas');
  const [selectedTaskForModal, setSelectedTaskForModal] = useState<Task | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User submissions map
  const userSubmissions = submissions.filter((s) => s.studentId === user?.id);

  const getSubmissionForTask = (taskId: string): TaskSubmission | undefined => {
    return userSubmissions.find((s) => s.taskId === taskId);
  };

  const filteredTasks = tasks.filter((task) => {
    const sub = getSubmissionForTask(task.id);
    if (filterStatus === 'todas') return true;
    if (filterStatus === 'pendientes') return !sub;
    if (filterStatus === 'entregadas') return sub && sub.status === 'entregada';
    if (filterStatus === 'calificadas') return sub && sub.status === 'calificada';
    return true;
  });

  const handleOpenModal = (task: Task) => {
    setSelectedTaskForModal(task);
    const existing = getSubmissionForTask(task.id);
    if (existing) {
      setSubmissionText(existing.content);
      setFileName(existing.fileAttachmentName || '');
    } else {
      setSubmissionText('');
      setFileName('');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskForModal) return;

    if (!submissionText.trim()) {
      showToast('Por favor escribe una descripción del trabajo o simulacro realizado', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitTask(
        selectedTaskForModal.id,
        submissionText,
        fileName || 'reporte_practica_firmado.pdf'
      );
      setIsSubmitting(false);
      setSelectedTaskForModal(null);
    }, 500);
  };

  const selectedTaskSubmission = selectedTaskForModal
    ? getSubmissionForTask(selectedTaskForModal.id)
    : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Módulo de Evaluación y Aprendizaje Práctico</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Entrega de Tareas y Calificaciones
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Sube tus simulacros, auditorías de seguridad y croquis de evacuación para ser evaluados por los instructores de urgencias y rescate.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'todas', label: 'Todas las Actividades' },
          { id: 'pendientes', label: 'Pendientes de Entrega' },
          { id: 'entregadas', label: 'Entregadas (En Revisión)' },
          { id: 'calificadas', label: 'Calificadas con Nota' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              filterStatus === tab.id
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            submission={getSubmissionForTask(task.id)}
            onOpenSubmissionModal={handleOpenModal}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-sm">
          No hay tareas en la categoría seleccionada.
        </div>
      )}

      {/* Submission Modal */}
      {selectedTaskForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedTaskForModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-950 text-red-400 border border-red-800">
                {selectedTaskForModal.type}
              </span>
              <h3 className="text-lg font-bold text-white pt-1">
                {selectedTaskForModal.title}
              </h3>
              <p className="text-xs text-red-400">{selectedTaskForModal.courseTitle}</p>
            </div>

            {/* Instructions */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-slate-300 block">Instrucciones del Instructor:</span>
              <p className="text-slate-400 leading-relaxed">
                {selectedTaskForModal.instructions}
              </p>
              <div className="pt-2 flex items-center justify-between text-slate-400 text-[11px] border-t border-slate-800/80">
                <span>Fecha Límite: <strong className="text-slate-200">{selectedTaskForModal.dueDate}</strong></span>
                <span>Puntaje Máximo: <strong className="text-slate-200">{selectedTaskForModal.points} pts</strong></span>
              </div>
            </div>

            {/* Teacher Feedback (if already graded) */}
            {selectedTaskSubmission?.grade !== undefined && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Calificación Obtenida:
                  </span>
                  <span className="font-black text-emerald-300 text-sm">
                    {selectedTaskSubmission.grade} / {selectedTaskForModal.points} pts
                  </span>
                </div>
                {selectedTaskSubmission.feedback && (
                  <p className="text-slate-200 italic pt-1">
                    "{selectedTaskSubmission.feedback}"
                  </p>
                )}
              </div>
            )}

            {/* Submission Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Descripción o Registro del Procedimiento Realizado
                </label>
                <textarea
                  rows={4}
                  required
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Detalla los pasos que seguiste, hallazgos, tiempos cronometrados y conclusiones..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 leading-relaxed"
                />
              </div>

              {/* Simulated File Attachment */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Adjuntar Archivo (PDF, Video MP4 o Imagen del Croquis)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      placeholder="ej: simulacro_familiar_croquis.pdf"
                      className="w-full pl-3 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFileName('evidencia_primeros_auxilios_firmada.pdf');
                      showToast('Archivo simulado adjunto', 'info');
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Auto-Adjuntar</span>
                  </button>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTaskForModal(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white shadow-lg shadow-red-600/30 flex items-center gap-1.5"
                >
                  {isSubmitting ? 'Enviando...' : 'Confirmar Envío de Tarea'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
