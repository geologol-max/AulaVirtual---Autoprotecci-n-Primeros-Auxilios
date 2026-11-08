import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Hand,
  PhoneOff,
  Share2,
  Users,
  MessageSquare,
  Radio,
  Send,
  ShieldAlert,
  Sparkles,
  Maximize2,
  Volume2,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useClassroom } from '../context/ClassroomContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const LiveRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    liveSessions,
    activeMeeting,
    joinLiveSession,
    leaveLiveSession,
    liveChatMessages,
    sendLiveChatMessage,
    isHandRaised,
    toggleHandRaise,
  } = useClassroom();
  const { showToast } = useNotification();

  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'participants' | 'notes'>('chat');

  // If no meeting active, default to first live session
  const currentSession = activeMeeting || liveSessions[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendLiveChatMessage(chatInput.trim());
    setChatInput('');
  };

  const handleLeave = () => {
    leaveLiveSession();
    navigate('/dashboard');
  };

  const participantsList = [
    { name: currentSession.instructor, role: 'Instructor SAMU (Docente)', isHost: true, isSpeaking: true },
    { name: user ? `${user.name} (Tú)` : 'Tú', role: user?.role || 'Estudiante', isHost: false, handRaised: isHandRaised },
    { name: 'Capitán Marcelo Valenzuela', role: 'Docente Bomberos', isHost: true },
    { name: 'Andrea Valenzuela', role: 'Brigadista Cruz Roja', isHost: false },
    { name: 'Matías Silva', role: 'Estudiante', isHost: false },
    { name: 'Esteban Paredes', role: 'Brigadista Vecinal', isHost: false },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 flex flex-col">
      {/* Room Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-600 text-white shadow animate-pulse">
            <Radio className="w-3.5 h-3.5" /> EN VIVO
          </span>
          <div>
            <h1 className="text-sm font-bold text-white truncate max-w-sm sm:max-w-xl">
              {currentSession.title}
            </h1>
            <p className="text-[11px] text-slate-400">
              Docente: <strong className="text-slate-200">{currentSession.instructor}</strong> • {currentSession.courseTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentSession.participantsCount + 1} en sala</span>
          </span>
          <button
            onClick={handleLeave}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 transition shadow"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>Salir</span>
          </button>
        </div>
      </div>

      {/* Main Classroom Videoconference Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Stage Video Stream */}
        <div className="lg:col-span-8 p-4 flex flex-col justify-between gap-4 bg-slate-950">
          <div className="relative flex-1 rounded-2xl bg-black border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[360px] sm:min-h-[460px]">
            {/* Simulated Live Broadcast Feed */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80"
                alt="Docente en videoconferencia"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
            </div>

            {/* Top Stream Overlays */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded-md flex items-center gap-1 shadow">
                  <Radio className="w-3 h-3 animate-ping" />
                  Docente Transmitiendo
                </span>
                <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
                  {currentSession.instructor} (SAMU Urgencias)
                </span>
              </div>

              {isHandRaised && (
                <div className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg animate-bounce">
                  <Hand className="w-4 h-4" />
                  <span>Tu mano está levantada</span>
                </div>
              )}
            </div>

            {/* Small Picture-in-Picture of current user */}
            <div className="absolute bottom-4 right-4 z-10 w-28 sm:w-36 aspect-video rounded-xl bg-slate-900 border-2 border-slate-700 overflow-hidden shadow-2xl">
              {isVideoOn ? (
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                  alt="Tu cámara"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900 text-[10px]">
                  <VideoOff className="w-4 h-4 mb-1" />
                  <span>Cámara apagada</span>
                </div>
              )}
              <div className="absolute bottom-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] text-white font-medium">
                Tú {!isMicOn && '🔇'}
              </div>
            </div>

            {/* Live Scenario Overlay */}
            <div className="relative z-10 p-4 max-w-lg">
              <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-3 text-xs text-white space-y-1">
                <p className="font-bold text-red-400 uppercase tracking-wider text-[10px]">
                  Demostración Práctica Actual:
                </p>
                <p className="font-medium">
                  "Uso correcto del Desfibrilador (DEA) en presencia de humedad o marcapasos."
                </p>
              </div>
            </div>
          </div>

          {/* Meeting Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Mic */}
              <button
                onClick={() => {
                  setIsMicOn(!isMicOn);
                  showToast(isMicOn ? 'Micrófono silenciado' : 'Micrófono activado', 'info');
                }}
                className={`p-3 rounded-xl transition ${
                  isMicOn
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'bg-red-600/20 text-red-400 border border-red-600/40 hover:bg-red-600/30'
                }`}
                title={isMicOn ? 'Silenciar micrófono' : 'Activar micrófono'}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              {/* Video Cam */}
              <button
                onClick={() => {
                  setIsVideoOn(!isVideoOn);
                  showToast(isVideoOn ? 'Cámara apagada' : 'Cámara encendida', 'info');
                }}
                className={`p-3 rounded-xl transition ${
                  isVideoOn
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'bg-red-600/20 text-red-400 border border-red-600/40 hover:bg-red-600/30'
                }`}
                title={isVideoOn ? 'Apagar cámara' : 'Encender cámara'}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              {/* Share screen */}
              <button
                onClick={() => {
                  setIsScreenSharing(!isScreenSharing);
                  showToast(isScreenSharing ? 'Pantalla compartida finalizada' : 'Compartiendo pantalla', 'info');
                }}
                className={`p-3 rounded-xl hidden sm:flex transition ${
                  isScreenSharing
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Compartir pantalla"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Raise Hand & Reaction */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleHandRaise}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                  isHandRaised
                    ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <Hand className="w-4 h-4" />
                <span>{isHandRaised ? 'Bajar la Mano' : 'Levantar la Mano'}</span>
              </button>
            </div>

            {/* End call */}
            <div>
              <button
                onClick={handleLeave}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-2 shadow-lg shadow-red-600/20 transition"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Abandonar Sala</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Live Chat & Participants Tab */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/60 flex flex-col h-[500px] lg:h-auto">
          {/* Tab selector */}
          <div className="flex border-b border-slate-800 bg-slate-900">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'border-red-500 text-red-400 bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat en Vivo</span>
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
                activeTab === 'participants'
                  ? 'border-red-500 text-red-400 bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Participantes ({participantsList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
                activeTab === 'notes'
                  ? 'border-red-500 text-red-400 bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Notas de Simulación</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden p-4 space-y-4">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {liveChatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-xl text-xs space-y-1 ${
                      msg.isInstructor
                        ? 'bg-red-950/50 border border-red-800/60 text-red-100'
                        : 'bg-slate-950 border border-slate-800/80 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold flex items-center gap-1">
                        {msg.senderName}
                        {msg.isInstructor && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-600 text-white font-extrabold uppercase">
                            DOCENTE
                          </span>
                        )}
                      </span>
                      <span className="text-slate-500">{msg.timestamp}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Enviar consulta al instructor..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {activeTab === 'participants' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {participantsList.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{p.name}</span>
                    <span className="text-[11px] text-slate-400">{p.role}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {p.isHost && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                        Anfitrión
                      </span>
                    )}
                    {p.handRaised && (
                      <span className="text-amber-400" title="Mano levantada">
                        ✋
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white">Preguntas de Examen Sincrónico:</h4>
                <ul className="space-y-1.5 text-slate-300 list-disc pl-4">
                  <li>¿Cuál es la profundidad recomendada en compresiones para un lactante menor de 1 año?</li>
                  <li>Mencione los 3 pasos antes de accionar la descarga del DEA.</li>
                  <li>¿Qué hacer si el suelo donde está la víctima tiene agua?</li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                <p className="font-bold">Asistencia Registrada:</p>
                <p className="text-[11px] text-emerald-300 mt-1">
                  Tu permanencia en este taller otorga 2 horas de crédito práctico para la certificación de brigadista.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
