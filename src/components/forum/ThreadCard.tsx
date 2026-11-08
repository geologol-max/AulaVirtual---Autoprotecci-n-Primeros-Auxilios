import React from 'react';
import { MessageSquare, Eye, Pin, User, Clock, ChevronRight } from 'lucide-react';
import { ForumThread } from '../../types';

interface ThreadCardProps {
  thread: ForumThread;
  onSelect: (thread: ForumThread) => void;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({ thread, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(thread)}
      className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-slate-950"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          {/* Header metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {thread.isPinned && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold text-[11px] bg-red-500/20 text-red-400 border border-red-500/30">
                <Pin className="w-3 h-3" /> Fijado
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {thread.category}
            </span>
            {thread.courseTitle && (
              <span className="text-slate-400 truncate max-w-[200px] hidden sm:inline">
                • {thread.courseTitle}
              </span>
            )}
          </div>

          {/* Title & Preview */}
          <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
            {thread.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {thread.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {thread.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[11px] bg-slate-950 text-slate-400 border border-slate-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1 transition shrink-0 mt-2" />
      </div>

      {/* Footer meta info */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <img
            src={thread.authorAvatar}
            alt={thread.authorName}
            className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-700"
          />
          <span className="text-slate-300 font-medium">{thread.authorName}</span>
          <span className="text-slate-500 hidden sm:inline">({thread.authorRole})</span>
          <span className="text-slate-500">• {thread.createdAt}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-red-400" />
            {thread.replies.length} respuestas
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Eye className="w-3.5 h-3.5" />
            {thread.views}
          </span>
        </div>
      </div>
    </div>
  );
};
