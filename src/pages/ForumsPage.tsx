import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Search,
  PlusCircle,
  ThumbsUp,
  X,
  Send,
  Pin,
  Clock,
  User,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useClassroom } from '../context/ClassroomContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { ForumThread } from '../types';
import { ThreadCard } from '../components/forum/ThreadCard';

export const ForumsPage: React.FC = () => {
  const { threads, addForumThread, addForumReply } = useClassroom();
  const { user } = useAuth();
  const { showToast } = useNotification();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeThread, setActiveThread] = useState<ForumThread | null>(null);

  // New Thread Modal
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Primeros Auxilios');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('RCP, Emergencia');

  // Reply Form
  const [replyContent, setReplyContent] = useState('');

  const categories = ['Todos', 'Primeros Auxilios', 'Sismos', 'Incendios', 'Equipamiento'];

  const filteredThreads = useMemo(() => {
    return threads.filter((t) => {
      const matchesCat =
        selectedCategory === 'Todos' ||
        t.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.content.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });
  }, [threads, selectedCategory, searchQuery]);

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Por favor completa el título y la descripción del caso', 'error');
      return;
    }

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addForumThread({
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      tags: tagsArray.length > 0 ? tagsArray : ['Emergencia'],
    });

    setNewTitle('');
    setNewContent('');
    setIsNewThreadOpen(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !activeThread) return;

    addForumReply(activeThread.id, replyContent.trim());
    setReplyContent('');

    // Update active thread locally
    const updated = threads.find((t) => t.id === activeThread.id);
    if (updated) {
      setActiveThread(updated);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-red-950/60 text-red-400 border border-red-800/40">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Debate Asíncrono y Casos de Estudio</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Foros de Autoprotección Comunitaria
          </h1>
          <p className="text-sm text-slate-400">
            Comparte dudas, experiencias en simulacros y coordina respuestas de emergencia con docentes y compañeros.
          </p>
        </div>

        <button
          onClick={() => setIsNewThreadOpen(true)}
          className="px-5 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Nuevo Tema de Debate</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por caso, término o etiqueta..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Threads List */}
      <div className="space-y-4">
        {filteredThreads.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            onSelect={(t) => setActiveThread(t)}
          />
        ))}

        {filteredThreads.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-sm">
            No hay temas que coincidan con la búsqueda. ¡Sé el primero en iniciar una conversación!
          </div>
        )}
      </div>

      {/* Thread Discussion Detail Modal */}
      {activeThread && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setActiveThread(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-md font-bold bg-slate-800 text-slate-300">
                  {activeThread.category}
                </span>
                <span className="text-slate-400">• {activeThread.createdAt}</span>
              </div>
              <h2 className="text-xl font-bold text-white leading-snug">{activeThread.title}</h2>
            </div>

            {/* Original Post */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-xs">
                <img
                  src={activeThread.authorAvatar}
                  alt={activeThread.authorName}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-700"
                />
                <div>
                  <span className="font-bold text-white block">{activeThread.authorName}</span>
                  <span className="text-[10px] text-slate-400">{activeThread.authorRole}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{activeThread.content}</p>
            </div>

            {/* Replies List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Respuestas e Intervenciones ({activeThread.replies.length}):
              </h4>

              {activeThread.replies.map((rep) => (
                <div
                  key={rep.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={rep.authorAvatar}
                        alt={rep.authorName}
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-700"
                      />
                      <div>
                        <span className="font-bold text-slate-200">{rep.authorName}</span>
                        <span className="text-[10px] text-slate-400 block">{rep.authorRole}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500">{rep.createdAt}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-8">{rep.content}</p>
                </div>
              ))}

              {activeThread.replies.length === 0 && (
                <p className="text-xs text-slate-500 italic py-2">
                  Aún no hay respuestas en este debate. ¡Aporta con tu conocimiento!
                </p>
              )}
            </div>

            {/* Answer Input */}
            <form onSubmit={handleSendReply} className="pt-2 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                required
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Escribe tu respuesta o recomendación técnica..."
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Responder</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New Thread Modal */}
      {isNewThreadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsNewThreadOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Nuevo Tema de Discusión</h3>
              <p className="text-xs text-slate-400">
                Plantea una situación de emergencia, pregunta clínica o protocolo operativo
              </p>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Título de la Consulta</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="ej: ¿Cómo actuar si el paciente tiene fractura expuesta y sangrado?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Categoría</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Primeros Auxilios">Primeros Auxilios</option>
                    <option value="Sismos">Sismos y Terremotos</option>
                    <option value="Incendios">Incendios y Evacuación</option>
                    <option value="Equipamiento">Equipamiento y DEA</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Etiquetas (separadas por coma)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="RCP, Trauma, Shock"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Contenido o Descripción del Caso</label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe el contexto, la duda o la experiencia a debatir..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewThreadOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30"
                >
                  Publicar en el Foro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
