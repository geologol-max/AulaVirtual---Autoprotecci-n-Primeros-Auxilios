# AulaVirtual - Autoprotección, Emergencias y Primeros Auxilios 🚑🔥
**Proyecto Formativo Full Stack - Hito 1 & Hito 2: Desarrollo Frontend en React**

---

## 📌 1. Información General del Proyecto

- **Nombre de la Plataforma:** AulaVirtual - Autoprotección & Primeros Auxilios
- **Temática:** Plataforma interactiva e-learning diseñada para la capacitación ciudadana y comunitaria en materias de soporte vital básico (RCP y DEA), uso de extintores y evacuación en incendios, protocolos de seguridad ante sismos y terremotos, contención de hemorragias y primeros auxilios psicológicos.
- **Alcance Actual:** Cumplimiento total de los requerimientos y rúbricas de evaluación del **Hito 1 (Diseño y Prototipo)** y **Hito 2 (Desarrollo Frontend con React)**, con arquitectura preparada para su posterior conexión a backend y base de datos relacional en los **Hitos 3, 4 y 5**.

---

## 📋 2. Guía de Evaluación para el Docente (Mapeo con la Rúbrica Hito 2)

A continuación se detalla cómo se cumple cada uno de los criterios evaluativos para alcanzar el **puntaje máximo (10 Puntos)**:

| Criterio de la Rúbrica | Puntaje Máximo | Implementación en este Proyecto | Ubicación en el Código |
| :--- | :---: | :--- | :--- |
| **1. Crear un nuevo proyecto usando npx e instalar dependencias** | **1 Punto** | Proyecto inicializado con dependencias completas instaladas: `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `lucide-react`, `motion`, `typescript`. | `package.json` |
| **2. Utilizar React Router para la navegación entre rutas** | **3 Puntos** | Declaración integral del enrutador con `BrowserRouter`, `Routes` y `Route`. Componentes `Link` y `NavLink` con estilos de ruta activa. **Redirección programática** con `useNavigate` en login, registro, envío de tareas, creación de publicaciones y salida de salas. Rutas privadas protegidas mediante `ProtectedRoute`. | `src/App.tsx`<br>`src/components/common/ProtectedRoute.tsx`<br>`src/pages/LoginPage.tsx` |
| **3. Reutilizar componentes haciendo uso del paso de props y renderización dinámica** | **1 Punto** | Componentes modulares reutilizables con interfaces TypeScript (`props`): tarjetas de cursos, filtros de búsqueda, tarjetas de tareas con estados dinámicos, hilos de debate en foros, badges y sala de videoconferencia. Renderizado dinámico con `.map()` y llaves únicas. | `src/components/courses/CourseCard.tsx`<br>`src/components/tasks/TaskCard.tsx`<br>`src/components/forum/ThreadCard.tsx`<br>`src/components/live/LiveSessionCard.tsx` |
| **4. Hacer uso de los hooks para un desarrollo ágil y reactivo** | **2 Puntos** | Empleo activo de `useState`, `useEffect`, `useContext`, `useMemo` (para filtrado de catálogo y cálculo de promedios de notas), `useCallback`, `useNavigate`, `useLocation` y `useParams`. Custom hooks: `useAuth`, `useClassroom`, `useNotification`. | `src/pages/CoursesCatalogPage.tsx`<br>`src/context/ClassroomContext.tsx`<br>`src/context/AuthContext.tsx` |
| **5. Utilizar Context para el manejo del estado global** | **3 Puntos** | Manejo de estado global mediante Context API: **`AuthContext`** (autenticación persistente con `localStorage`, simulación de contrato JWT, roles y cambio de usuario demo), **`ClassroomContext`** (cursos, progreso porcentual, tareas, foros y videoconferencias sincrónicas) y **`NotificationContext`** (alertas toast flotantes). | `src/context/AuthContext.tsx`<br>`src/context/ClassroomContext.tsx`<br>`src/context/NotificationContext.tsx` |

---

## 🏛️ 3. Cumplimiento de Pantallas y Requerimientos del Hito 1

El Hito 1 y su documento de *Prototipo y Diseño de Interfaz para Aula Virtual* exigían una serie de pantallas y dos grupos de navegación (Públicas y Privadas):

### A. Vistas Públicas (Acceso Libre y sin restricciones)
1. **Página Principal (Landing Page) (`/`)**:
   - Hero section de alto impacto con mensaje de autoprotección comunitaria.
   - Vitrina de especialidades (RCP, Incendios, Sismos, Planes de Emergencia).
   - Acceso directo a transmisión en vivo y llamados a la acción de registro/inicio de sesión.
   - Enlace permanente con los teléfonos de emergencia oficiales en el pie de página (SAMU 131, Bomberos 132, Carabineros 133, CONAF 130).
2. **Galería de Publicaciones / Cursos (`/cursos`)**:
   - Catálogo completo con buscador en tiempo real por palabra clave y selector por categorías y niveles.
3. **Vista de Detalle de una Publicación (`/cursos/:courseId`)**:
   - Ficha técnica de la capacitación, desglose del programa de estudios (módulos y lecciones), perfil del docente instructor y botón de matrícula gratuita.
4. **Inicio de Sesión (`/login`)**:
   - Formulario acorde al boceto del Hito 1 (Email, Password, Iniciar Sesión, Volver) con validaciones y botones de acceso rápido de 1 clic para la revisión docente.
5. **Registro de Usuarios (`/registro`)**:
   - Formulario acorde al boceto del Hito 1 (Nombre, Email, Password, Confirmación, Avatar URL y selección de Rol).

### B. Vistas Privadas (Requieren Autenticación Previa)
6. **Dashboard Principal (Centro de Comando) (`/dashboard`)**:
   - Vista solicitada en la lámina 4 del Hito 1: Cursos activos, progreso porcentual, tareas pendientes, promedio de notas, notificación de clases programadas y accesos rápidos.
7. **Aula de Aprendizaje Interactivo (`/cursos/:courseId/aula`)**:
   - Reproductor interactivo de video formativo (con controles de play/pausa, scrubber de tiempo y velocidad), lista de lecciones con verificación de estado completado y puntos clave del protocolo de emergencias.
8. **Videoconferencia en Vivo (`/videoconferencias`)**:
   - Sala interactiva sincrónica (lámina 5 del Hito 1): simulación de transmisión en directo, controles de micrófono y cámara, **botón para levantar la mano**, lista de participantes y **chat en tiempo real**.
9. **Entrega de Tareas y Notas (`/tareas`)**:
   - Panel de actividades prácticas con pestañas por estado (*Todas*, *Pendientes*, *Entregadas*, *Calificadas*).
   - Modal interactivo para redactar el procedimiento realizado, adjuntar un archivo simulado (croquis o video) y visualizar la nota y retroalimentación docente.
10. **Foro de Discusión (`/foros`)**:
    - Debate asíncrono sobre casos de estudio en emergencias, modal para publicar nuevos temas, categorización por etiquetas y respuestas anidadas.
11. **Formulario para Crear una Publicación (`/crear-curso`)**:
    - Permite al usuario/instructor crear y publicar una nueva capacitación comunitaria (título, especialidad, horas, nivel, lección inicial, imagen y puntos clave), guardándose en el estado global y redirigiendo a la galería.
12. **Mi Perfil (`/perfil`)**:
    - Vista de perfil (lámina 4 del Hito 1): administración de datos personales, clave, configuración de alertas y galería de certificaciones e insignias obtenidas con código de verificación.

---

## 🧪 4. Guía Paso a Paso para la Revisión del Docente

Para agilizar su evaluación, se incorporó una **barra de evaluación rápida en la cabecera superior**:

1. **Prueba de Autenticación Rápida (1 Clic):**
   - Haga clic en el botón superior **"Demo: Alumna/Brigadista"** para iniciar sesión como *Camila Ríos* (cuenta con cursos inscritos y tareas entregadas).
   - O haga clic en **"Demo: Instructor SAMU"** para iniciar sesión como *Dr. Alejandro Morales* (docente titular).
2. **Verificación de Redirección Programática:**
   - Cierre sesión mediante el botón de salida. Intente ingresar a `/dashboard` escribiéndolo en el navegador: el sistema activará el `ProtectedRoute` y lo redirigirá programáticamente a `/login`.
   - Inicie sesión en `/login`: será redirigido automáticamente al `/dashboard`.
3. **Verificación de Dinamismo y Reactividad de Cursos:**
   - Vaya a **Cursos (`/cursos`)**, filtre por "Sismos" o escriba "RCP" en el buscador: observe el filtrado reactivo mediante `useMemo`.
   - Ingrese al detalle de un curso no matriculado y presione **"Matricularme Ahora"**: se disparará una notificación Toast (`NotificationContext`) y el curso se vinculará a su perfil.
4. **Verificación del Aula y Progreso:**
   - Ingrese a **"Continuar Aprendizaje"** en cualquier curso: marque o desmarque una lección como completada; observe cómo el porcentaje de avance se actualiza inmediatamente en el encabezado y en el dashboard.
5. **Verificación de la Sala de Videoconferencias (`/videoconferencias`):**
   - Encienda o apague la cámara y micrófono simulados.
   - Presione el botón **"Levantar la Mano"**: observe el indicador visual y la notificación.
   - Envíe un mensaje en el **Chat en Vivo**: el mensaje aparecerá inmediatamente en el historial de la sala.
6. **Verificación de Entrega de Tareas (`/tareas`):**
   - Seleccione una tarea pendiente, complete la descripción y presione **"Confirmar Envío de Tarea"**: pasará al estado "Entregada" de forma reactiva.
7. **Verificación de Publicación (`/crear-curso`):**
   - Complete el formulario de nueva capacitación y presione **"Publicar Capacitación en el Aula"**: el nuevo curso se sumará a la lista global y el enrutador lo redirigirá a la galería.

---

## 📁 5. Estructura del Código Fuente

```text
/
├── index.html                     # Punto de entrada HTML con metadatos actualizados
├── metadata.json                  # Metadatos del aplicativo para AI Studio
├── package.json                   # Dependencias oficiales (React 19, React Router, Tailwind, Lucide)
├── tsconfig.json                  # Configuración estricta de TypeScript
├── vite.config.ts                 # Configuración de Vite y Tailwind v4
└── src/
    ├── main.tsx                   # Renderizado raíz de React 19
    ├── App.tsx                    # Declaración de rutas públicas/privadas y Providers
    ├── index.css                  # Estilos globales con Tailwind CSS
    ├── types/
    │   └── index.ts               # Interfaces TypeScript (User, Course, Task, Forum, LiveSession)
    ├── data/
    │   └── initialData.ts         # Datos iniciales simulados conforme al contrato REST del Hito 1
    ├── context/
    │   ├── AuthContext.tsx        # Contexto global de autenticación, sesión y roles
    │   ├── ClassroomContext.tsx   # Contexto global de cursos, tareas, foros y videoconferencias
    │   └── NotificationContext.tsx# Contexto de notificaciones y alertas tipo Toast
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.tsx         # Barra de navegación con control de sesión y menú móvil
    │   │   ├── Footer.tsx         # Pie de página con teléfonos oficiales de emergencia
    │   │   └── ProtectedRoute.tsx # Guardián de rutas con redirección programática
    │   ├── courses/
    │   │   ├── CourseCard.tsx     # Componente reutilizable para tarjetas de cursos
    │   │   └── CourseFilter.tsx   # Barra de filtros y búsqueda reactiva
    │   ├── tasks/
    │   │   └── TaskCard.tsx       # Tarjetas de tareas con notas y estados
    │   ├── forum/
    │   │   └── ThreadCard.tsx     # Tarjetas de debate y consultas ciudadanas
    │   └── live/
    │       └── LiveSessionCard.tsx# Tarjeta de estado de clases sincrónicas
    └── pages/
        ├── HomePage.tsx           # Página principal (Landing Page pública)
        ├── CoursesCatalogPage.tsx # Galería de cursos con filtrado dinámico
        ├── CourseDetailPage.tsx  # Vista detallada de una capacitación
        ├── ClassroomLessonPage.tsx# Aula interactiva con reproductor y lecciones
        ├── LoginPage.tsx          # Formulario de inicio de sesión con redirección
        ├── RegisterPage.tsx       # Formulario de registro con selección de rol
        ├── DashboardPage.tsx      # Centro de comando del estudiante/brigadista
        ├── LiveRoomPage.tsx       # Sala de videoconferencia en vivo sincrónica
        ├── TasksPage.tsx          # Módulo de tareas, calificaciones y retroalimentación
        ├── ForumsPage.tsx         # Foros de debate de casos de emergencias
        ├── CreateCoursePage.tsx   # Formulario para publicar una nueva capacitación
        ├── ProfilePage.tsx        # Mi perfil, datos personales y certificaciones
        └── NotFoundPage.tsx       # Manejo de error 404
```

---

## 🚀 6. Continuidad Hacia los Hitos 3, 4 y 5

La arquitectura implementada en este Hito 2 fue diseñada siguiendo el **contrato de datos de la API REST** y el **modelo entidad-relación** del Hito 1:
- Las llamadas dentro de los contextos (`AuthContext` y `ClassroomContext`) están modularizadas para reemplazar fácilmente los datos locales con llamadas `fetch` / `axios` al servidor **Node.js + Express** en el **Hito 3**.
- Las estructuras de datos (`User`, `Course`, `Task`, `Submission`, `ForumThread`, `LiveSession`) corresponden a las tablas relacionales proyectadas para la base de datos PostgreSQL en el **Hito 4**.
- La persistencia actual mediante `localStorage` permite validar el flujo completo sin requerir de momento el backend activo.
