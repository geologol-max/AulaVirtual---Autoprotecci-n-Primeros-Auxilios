import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, BookOpen } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-red-600/20 text-red-400 border border-red-600/30 flex items-center justify-center mx-auto shadow-xl">
          <AlertTriangle className="w-8 h-8 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white">404</h1>
          <h2 className="text-xl font-bold text-white">Ruta no encontrada</h2>
          <p className="text-xs text-slate-400">
            La página del aula virtual a la que intentas acceder no existe o fue reubicada en otro módulo.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 transition shadow"
          >
            <Home className="w-4 h-4" />
            <span>Ir al Inicio</span>
          </Link>
          <Link
            to="/cursos"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-1.5 transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>Ver Cursos</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
