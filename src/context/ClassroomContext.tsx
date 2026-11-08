import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Course,
  Task,
  TaskSubmission,
  ForumThread,
  LiveSession,
  LiveChatMessage,
} from '../types';
import {
  INITIAL_COURSES,
  INITIAL_TASKS,
  INITIAL_SUBMISSIONS,
  INITIAL_LIVE_SESSIONS,
  INITIAL_FORUM_THREADS,
} from '../data/initialData';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';

interface ClassroomContextType {
  courses: Course[];
  tasks: Task[];
  submissions: TaskSubmission[];
  threads: ForumThread[];
  liveSessions: LiveSession[];
  activeMeeting: LiveSession | null;
  liveChatMessages: LiveChatMessage[];
  isHandRaised: boolean;
  toggleHandRaise: () => void;
  enrollCourse: (courseId: string) => void;
  createCourse: (newCourseData: Partial<Course>) => void;
  toggleLessonCompletion: (courseId: string, lessonId: string) => void;
  submitTask: (taskId: string, content: string, fileAttachmentName?: string) => void;
  addForumThread: (data: { title: string; content: string; category: string; tags: string[]; courseId?: string }) => void;
  addForumReply: (threadId: string, content: string) => void;
  joinLiveSession: (sessionId: string) => void;
  leaveLiveSession: () => void;
  sendLiveChatMessage: (text: string) => void;
  getCourseProgress: (courseId: string) => number;
  getTaskSubmission: (taskId: string) => TaskSubmission | undefined;
}

const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined);

const STORAGE_COURSES = 'aula_virtual_courses';
const STORAGE_SUBMISSIONS = 'aula_virtual_submissions';
const STORAGE_THREADS = 'aula_virtual_threads';

export const ClassroomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, enrollInCourse: authEnroll } = useAuth();
  const { showToast } = useNotification();

  // State initialization with localStorage fallback
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COURSES);
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [tasks] = useState<Task[]>(INITIAL_TASKS);

  const [submissions, setSubmissions] = useState<TaskSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SUBMISSIONS);
      return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
    } catch {
      return INITIAL_SUBMISSIONS;
    }
  });

  const [threads, setThreads] = useState<ForumThread[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THREADS);
      return saved ? JSON.parse(saved) : INITIAL_FORUM_THREADS;
    } catch {
      return INITIAL_FORUM_THREADS;
    }
  });

  const [liveSessions] = useState<LiveSession[]>(INITIAL_LIVE_SESSIONS);
  const [activeMeeting, setActiveMeeting] = useState<LiveSession | null>(null);
  const [isHandRaised, setIsHandRaised] = useState<boolean>(false);
  const [liveChatMessages, setLiveChatMessages] = useState<LiveChatMessage[]>([
    {
      id: 'msg-1',
      senderName: 'Dr. Alejandro Morales',
      senderRole: 'Instructor Urgenciólogo',
      text: '¡Bienvenidos al taller en vivo! Por favor asegúrense de tener a mano sus apuntes de la clase 2.',
      timestamp: '19:01',
      isInstructor: true,
    },
    {
      id: 'msg-2',
      senderName: 'Brigadista Andrés',
      senderRole: 'Estudiante',
      text: 'Buenas tardes doctor y compañeros. Presente desde la 5ta Compañía.',
      timestamp: '19:02',
    },
  ]);

  // Persist modified states
  useEffect(() => {
    localStorage.setItem(STORAGE_COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_THREADS, JSON.stringify(threads));
  }, [threads]);

  // Enroll in a course
  const enrollCourse = useCallback((courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    authEnroll(courseId);
    // Increment student count
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, totalStudents: c.totalStudents + 1 } : c))
    );

    showToast(`¡Te has matriculado exitosamente en "${course.title}"!`, 'success');
  }, [courses, authEnroll, showToast]);

  // Create course / publication (Hito 1 & 2 requirement)
  const createCourse = useCallback((newCourseData: Partial<Course>) => {
    const newCourse: Course = {
      id: `c-${Date.now().toString().slice(-4)}`,
      slug: (newCourseData.title || 'curso-emergencia').toLowerCase().replace(/\s+/g, '-'),
      title: newCourseData.title || 'Capacitación en Emergencias',
      category: newCourseData.category || 'autoproteccion',
      categoryLabel: newCourseData.categoryLabel || 'Autoprotección',
      shortDescription: newCourseData.shortDescription || 'Módulo de formación especializada en autoprotección y respuesta rápida.',
      description: newCourseData.description || 'Descripción completa del módulo de capacitación.',
      instructorName: user ? user.name : 'Instructor Certificado',
      instructorRole: user?.role === 'instructor' ? 'Instructor Titular' : 'Brigadista Capacitador',
      instructorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      coverImage: newCourseData.coverImage || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80',
      durationHours: newCourseData.durationHours || 10,
      level: newCourseData.level || 'Básico',
      badgeName: newCourseData.badgeName || 'Insignia de Autoprotección',
      tags: newCourseData.tags && newCourseData.tags.length > 0 ? newCourseData.tags : ['Emergencia', 'Seguridad'],
      rating: 5.0,
      totalStudents: 1,
      publishedDate: new Date().toISOString().split('T')[0],
      modules: newCourseData.modules || [
        {
          id: `mod-${Date.now()}`,
          title: 'Módulo 1: Fundamentos y Procedimientos Operativos',
          lessons: [
            {
              id: `les-${Date.now()}-1`,
              title: '1. Introducción al protocolo de seguridad',
              duration: '15 min',
              summary: 'Conceptos clave y delimitación del área de riesgo.',
              keyPoints: ['Evaluación situacional 360 grados', 'Comunicación radial'],
              completed: false,
            },
          ],
        },
      ],
    };

    setCourses((prev) => [newCourse, ...prev]);
    authEnroll(newCourse.id);
    showToast('¡Tu publicación/curso ha sido creada y publicada exitosamente!', 'success');
  }, [user, authEnroll, showToast]);

  // Toggle lesson completed status
  const toggleLessonCompletion = useCallback((courseId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const updatedModules = c.modules.map((m) => ({
          ...m,
          lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, completed: !l.completed } : l)),
        }));
        return { ...c, modules: updatedModules };
      })
    );
  }, []);

  // Calculate course completion progress percentage
  const getCourseProgress = useCallback(
    (courseId: string): number => {
      const course = courses.find((c) => c.id === courseId);
      if (!course || !course.modules.length) return 0;
      let totalLessons = 0;
      let completedLessons = 0;

      course.modules.forEach((mod) => {
        mod.lessons.forEach((l) => {
          totalLessons++;
          if (l.completed) completedLessons++;
        });
      });

      if (totalLessons === 0) return 0;
      return Math.round((completedLessons / totalLessons) * 100);
    },
    [courses]
  );

  // Submit a task / assignment
  const submitTask = useCallback(
    (taskId: string, content: string, fileAttachmentName?: string) => {
      if (!user) {
        showToast('Debes iniciar sesión para entregar la tarea', 'error');
        return;
      }

      const existingIndex = submissions.findIndex((s) => s.taskId === taskId && s.studentId === user.id);
      const newSubmission: TaskSubmission = {
        id: existingIndex >= 0 ? submissions[existingIndex].id : `sub-${Date.now()}`,
        taskId,
        studentId: user.id,
        studentName: user.name,
        submittedAt: new Date().toLocaleString('es-CL'),
        content,
        fileAttachmentName: fileAttachmentName || 'informe_practica_firmado.pdf',
        grade: undefined,
        feedback: undefined,
        status: 'entregada',
      };

      if (existingIndex >= 0) {
        setSubmissions((prev) => {
          const copy = [...prev];
          copy[existingIndex] = newSubmission;
          return copy;
        });
      } else {
        setSubmissions((prev) => [newSubmission, ...prev]);
      }

      showToast('¡Tarea entregada con éxito! Queda pendiente de revisión por el instructor.', 'success');
    },
    [user, submissions, showToast]
  );

  const getTaskSubmission = useCallback(
    (taskId: string): TaskSubmission | undefined => {
      if (!user) return undefined;
      return submissions.find((s) => s.taskId === taskId && s.studentId === user.id);
    },
    [user, submissions]
  );

  // Forum actions
  const addForumThread = useCallback(
    (data: { title: string; content: string; category: string; tags: string[]; courseId?: string }) => {
      if (!user) {
        showToast('Debes iniciar sesión para publicar en el foro', 'error');
        return;
      }

      const newThread: ForumThread = {
        id: `f-${Date.now()}`,
        title: data.title,
        content: data.content,
        category: data.category,
        tags: data.tags,
        courseId: data.courseId,
        authorId: user.id,
        authorName: user.name,
        authorRole: user.role === 'instructor' ? 'Instructor Docente' : 'Brigadista / Alumno',
        authorAvatar: user.avatar,
        createdAt: 'Hace instantes',
        views: 1,
        replies: [],
      };

      setThreads((prev) => [newThread, ...prev]);
      showToast('¡Pregunta publicada en el foro de debate!', 'success');
    },
    [user, showToast]
  );

  const addForumReply = useCallback(
    (threadId: string, content: string) => {
      if (!user) {
        showToast('Debes iniciar sesión para responder', 'error');
        return;
      }

      const reply = {
        id: `rep-${Date.now()}`,
        authorId: user.id,
        authorName: user.name,
        authorRole: user.role === 'instructor' ? 'Instructor Docente' : 'Brigadista / Alumno',
        authorAvatar: user.avatar,
        content,
        createdAt: 'Hace un momento',
        likes: 0,
      };

      setThreads((prev) =>
        prev.map((t) => (t.id === threadId ? { ...t, replies: [...t.replies, reply] } : t))
      );

      showToast('¡Respuesta enviada al hilo de discusión!', 'success');
    },
    [user, showToast]
  );

  // Live sessions
  const joinLiveSession = useCallback(
    (sessionId: string) => {
      const session = liveSessions.find((s) => s.id === sessionId);
      if (session) {
        setActiveMeeting(session);
        setIsHandRaised(false);
        showToast(`Conectado a la videoconferencia en vivo: ${session.title}`, 'info');
      }
    },
    [liveSessions, showToast]
  );

  const leaveLiveSession = useCallback(() => {
    setActiveMeeting(null);
    setIsHandRaised(false);
    showToast('Has salido de la videoconferencia', 'info');
  }, [showToast]);

  const toggleHandRaise = useCallback(() => {
    setIsHandRaised((prev) => {
      const next = !prev;
      showToast(next ? 'Has levantado la mano para participar.' : 'Has bajado la mano.', 'info');
      return next;
    });
  }, [showToast]);

  const sendLiveChatMessage = useCallback(
    (text: string) => {
      if (!text.trim() || !user) return;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newMsg: LiveChatMessage = {
        id: `msg-${Date.now()}`,
        senderName: user.name,
        senderRole: user.role,
        text: text.trim(),
        timestamp: timeStr,
        isInstructor: user.role === 'instructor',
      };

      setLiveChatMessages((prev) => [...prev, newMsg]);
    },
    [user]
  );

  return (
    <ClassroomContext.Provider
      value={{
        courses,
        tasks,
        submissions,
        threads,
        liveSessions,
        activeMeeting,
        liveChatMessages,
        isHandRaised,
        toggleHandRaise,
        enrollCourse,
        createCourse,
        toggleLessonCompletion,
        submitTask,
        addForumThread,
        addForumReply,
        joinLiveSession,
        leaveLiveSession,
        sendLiveChatMessage,
        getCourseProgress,
        getTaskSubmission,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
};

export const useClassroom = (): ClassroomContextType => {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error('useClassroom debe ser utilizado dentro de un ClassroomProvider');
  }
  return context;
};
