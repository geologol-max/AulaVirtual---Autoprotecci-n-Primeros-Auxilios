import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USER } from '../data/initialData';

interface LoginPayload {
  email: string;
  password?: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  institution?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<{ success: boolean; error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  toggleFavorite: (courseId: string) => void;
  enrollInCourse: (courseId: string) => void;
  loginAsDemo: (role?: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'aula_virtual_user';
const STORAGE_KEY_TOKEN = 'aula_virtual_token';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session on load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      const storedToken = localStorage.getItem(STORAGE_KEY_TOKEN);
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } else {
        // By default, keep logged in as demo student/brigadista for frictionless UX, or start logged in
        setUser(INITIAL_USER);
        setToken('token-jwt-simulado-estudiante-2026');
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(INITIAL_USER));
        localStorage.setItem(STORAGE_KEY_TOKEN, 'token-jwt-simulado-estudiante-2026');
      }
    } catch {
      setUser(INITIAL_USER);
      setToken('token-jwt-simulado-estudiante-2026');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async ({ email, password }: LoginPayload): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate API request delay compliant with POST /login contract
    await new Promise((r) => setTimeout(r, 600));

    if (!email || !email.includes('@')) {
      setIsLoading(false);
      return { success: false, error: 'Por favor ingresa un correo electrónico válido' };
    }

    if (password && password.length < 4) {
      setIsLoading(false);
      return { success: false, error: 'La contraseña debe contener al menos 4 caracteres' };
    }

    // Generate authenticated user session
    const determinedRole: UserRole = email.toLowerCase().includes('prof') || email.toLowerCase().includes('instructor')
      ? 'instructor'
      : email.toLowerCase().includes('brigada') || email.toLowerCase().includes('bombero')
      ? 'brigadista'
      : 'estudiante';

    const authenticatedUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()),
      email,
      role: determinedRole,
      avatar: determinedRole === 'instructor'
        ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: 'Miembro activo del Aula Virtual de Autoprotección y Emergencias.',
      institution: 'Comité de Emergencia & Protección Civil',
      enrolledCourseIds: ['c1', 'c3'],
      favoriteCourseIds: ['c1', 'c2'],
      certificatesEarned: [],
      createdAt: new Date().toISOString()
    };

    const dummyToken = `jwt-token-${Date.now()}`;
    setUser(authenticatedUser);
    setToken(dummyToken);

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(authenticatedUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, dummyToken);
    setIsLoading(false);

    return { success: true };
  }, []);

  const register = useCallback(async (payload: RegisterPayload): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    if (!payload.name || payload.name.trim().length < 3) {
      setIsLoading(false);
      return { success: false, error: 'Por favor indica tu nombre completo (mínimo 3 caracteres)' };
    }

    if (!payload.email || !payload.email.includes('@')) {
      setIsLoading(false);
      return { success: false, error: 'Por favor ingresa un correo electrónico válido' };
    }

    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: payload.name.trim(),
      email: payload.email.trim(),
      role: payload.role || 'estudiante',
      avatar: payload.avatar || (payload.role === 'instructor'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'),
      bio: 'Estudiante comprometido con el aprendizaje de primeros auxilios y respuesta ante desastres.',
      institution: payload.institution || 'Comunidad Vecinal / Institución Educativa',
      enrolledCourseIds: ['c1'], // Automatically enroll in basic CPR as first course
      favoriteCourseIds: ['c1'],
      certificatesEarned: [],
      createdAt: new Date().toISOString()
    };

    const dummyToken = `jwt-token-${Date.now()}`;
    setUser(newUser);
    setToken(dummyToken);

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, dummyToken);
    setIsLoading(false);

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((courseId: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const exists = prev.favoriteCourseIds.includes(courseId);
      const updatedFavs = exists
        ? prev.favoriteCourseIds.filter((id) => id !== courseId)
        : [...prev.favoriteCourseIds, courseId];
      const updated = { ...prev, favoriteCourseIds: updatedFavs };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const enrollInCourse = useCallback((courseId: string) => {
    setUser((prev) => {
      if (!prev) return null;
      if (prev.enrolledCourseIds.includes(courseId)) return prev;
      const updated = { ...prev, enrolledCourseIds: [...prev.enrolledCourseIds, courseId] };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const loginAsDemo = useCallback((role: UserRole = 'brigadista') => {
    const demoUser: User = {
      id: role === 'instructor' ? 'usr-prof-1' : 'usr-101',
      name: role === 'instructor' ? 'Dr. Alejandro Morales' : 'Camila Ríos Donoso',
      email: role === 'instructor' ? 'alejandro.morales@samu.cl' : 'camila.rios@aulavirtual.cl',
      role,
      avatar: role === 'instructor'
        ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: role === 'instructor'
        ? 'Médico instructor de Soporte Vital y Gestión de Emergencias Prehospitalarias.'
        : 'Brigadista comunitaria certificada en RCP y prevención sísmica.',
      institution: role === 'instructor' ? 'Hospital de Urgencias & SAMU' : 'Comité de Autoprotección Vecinal',
      enrolledCourseIds: ['c1', 'c2', 'c3'],
      favoriteCourseIds: ['c1', 'c3'],
      certificatesEarned: [
        {
          id: 'cert-01',
          courseId: 'c1',
          courseTitle: 'Soporte Vital Básico, RCP y Manejo del Desfibrilador (DEA)',
          issueDate: '2026-02-05',
          code: 'AV-RCP-2026-88192'
        }
      ],
      createdAt: '2026-01-10'
    };

    const demoToken = `jwt-demo-${role}`;
    setUser(demoUser);
    setToken(demoToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(demoUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, demoToken);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        toggleFavorite,
        enrollInCourse,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
