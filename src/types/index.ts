export type UserRole = 'estudiante' | 'brigadista' | 'instructor' | 'administrador';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  institution?: string;
  enrolledCourseIds: string[];
  favoriteCourseIds: string[];
  certificatesEarned: Certificate[];
  createdAt: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  code: string;
  badgeUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  summary: string;
  keyPoints: string[];
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: 'primeros-auxilios' | 'incendios' | 'sismos' | 'autoproteccion' | 'psicologia-emergencia';
  categoryLabel: string;
  description: string;
  shortDescription: string;
  instructorName: string;
  instructorRole: string;
  instructorAvatar: string;
  coverImage: string;
  durationHours: number;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  modules: CourseModule[];
  badgeName: string;
  tags: string[];
  rating: number;
  totalStudents: number;
  isPopular?: boolean;
  publishedDate: string;
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  fileAttachmentName?: string;
  grade?: number; // 1 to 7 or 0 to 100
  feedback?: string;
  status: 'entregada' | 'calificada' | 'pendiente';
}

export interface Task {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  instructions: string;
  dueDate: string;
  points: number;
  type: 'Simulacro Práctico' | 'Auditoría Técnica' | 'Protocolo Escrito' | 'Evaluación Rápida';
}

export interface ForumReply {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface ForumThread {
  id: string;
  courseId?: string;
  courseTitle?: string;
  category: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  createdAt: string;
  replies: ForumReply[];
  tags: string[];
  views: number;
  isPinned?: boolean;
}

export interface LiveSession {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: 'en-vivo' | 'programada' | 'finalizada';
  description: string;
  participantsCount: number;
}

export interface LiveChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  text: string;
  timestamp: string;
  isInstructor?: boolean;
}
