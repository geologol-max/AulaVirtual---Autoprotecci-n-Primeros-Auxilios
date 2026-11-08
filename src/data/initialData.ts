import { Course, Task, TaskSubmission, ForumThread, LiveSession, User } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Soporte Vital Básico, RCP y Manejo del Desfibrilador (DEA)',
    slug: 'rcp-soporte-vital-basico',
    category: 'primeros-auxilios',
    categoryLabel: 'Primeros Auxilios',
    shortDescription: 'Aprende a reconocer una parada cardiorrespiratoria, realizar compresiones torácicas efectivas de alta calidad y operar con seguridad un DEA.',
    description: 'Este curso fundamental capacita a cualquier ciudadano o brigadista para intervenir de forma inmediata en los primeros 4 minutos críticos ante un paro cardíaco. Se abordan las técnicas actualizadas de compresión torácica, ventilación asistida, desobstrucción de vía aérea por asfixia (Maniobra de Heimlich) y uso seguro del Desfibrilador Externo Automático (DEA).',
    instructorName: 'Dr. Alejandro Morales',
    instructorRole: 'Médico Urgencista & Paramédico SAMU',
    instructorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&auto=format&fit=crop&q=80',
    durationHours: 12,
    level: 'Básico',
    badgeName: 'Certificación en RCP & DEA',
    tags: ['RCP', 'DEA', 'Paro Cardíaco', 'Heimlich', 'Soporte Vital'],
    rating: 4.9,
    totalStudents: 1420,
    isPopular: true,
    publishedDate: '2026-01-15',
    modules: [
      {
        id: 'm1-1',
        title: 'Módulo 1: Cadena de Supervivencia y Evaluación Primaria',
        lessons: [
          {
            id: 'l1-1',
            title: '1. Reconocimiento de la emergencia y seguridad de la escena (PAS)',
            duration: '18 min',
            summary: 'Aprende la regla de oro: Proteger, Avisar y Socorrer. Evaluación de riesgos inminentes antes de tocar a la víctima.',
            keyPoints: [
              'Asegurar el entorno para no convertirse en una segunda víctima.',
              'Llamar al número de emergencias médicas (131) indicando dirección exacta y estado de consciencia.',
              'Comprobación de respuesta y respiración en menos de 10 segundos.'
            ],
            completed: true
          },
          {
            id: 'l1-2',
            title: '2. Compresiones torácicas efectivas en adultos: ritmo y profundidad',
            duration: '24 min',
            summary: 'Técnica precisa de posición de manos en el tercio inferior del esternón, profundidad de 5 a 6 cm y frecuencia de 100 a 120 cpm.',
            keyPoints: [
              'Permitir la descompresión torácica completa después de cada compresión.',
              'Minimizar interrupciones en las compresiones a menos de 10 segundos.',
              'Ritmo de canciones de referencia (Stayin Alive de Bee Gees).'
            ],
            completed: true
          }
        ]
      },
      {
        id: 'm1-2',
        title: 'Módulo 2: Desfibrilación Temprana y Casos Especiales',
        lessons: [
          {
            id: 'l1-3',
            title: '3. Operación guiada del Desfibrilador Externo Automático (DEA)',
            duration: '22 min',
            summary: 'Encendido, colocación de parches en tórax desnudo, análisis del ritmo y protocolo de descarga sin contacto físico.',
            keyPoints: [
              'Parche superior derecho bajo la clavícula y parche inferior izquierdo anterolateral.',
              'Instrucción verbal enérgica: ¡Nadie toque al paciente!',
              'Reanudar inmediatamente RCP tras la descarga o si no está indicada.'
            ],
            completed: false
          },
          {
            id: 'l1-4',
            title: '4. Obstrucción de Vía Aérea por Cuerpo Extraño (OVACE)',
            duration: '20 min',
            summary: 'Identificación de tos inefectiva y aplicación de compresiones abdominales rápidas (Maniobra de Heimlich) en adultos y lactantes.',
            keyPoints: [
              'Diferencia entre atragantamiento parcial y total.',
              'Posición de puño y mano de refuerzo entre ombligo y apéndice xifoides.',
              'Actuación en caso de pérdida de conciencia.'
            ],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Prevención de Incendios, Manejo de Extintores y Evacuación',
    slug: 'prevencion-incendios-extintores',
    category: 'incendios',
    categoryLabel: 'Incendios & Fuego',
    shortDescription: 'Domina la química del fuego, identifica las clases de fuego (A, B, C, D, K) y practica el método PASS con extintores portátiles.',
    description: 'Capacitación exhaustiva dirigida a brigadistas y ciudadanos para detectar riesgos de ignición, seleccionar el extintor adecuado según el tipo de combustible y liderar una evacuación ordenada en edificios residenciales o comerciales.',
    instructorName: 'Capitán Marcelo Valenzuela',
    instructorRole: 'Oficial de Bomberos & Experto en Prevención de Riesgos',
    instructorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&auto=format&fit=crop&q=80',
    durationHours: 10,
    level: 'Intermedio',
    badgeName: 'Brigadista Contra Incendios Nivel I',
    tags: ['Fuego', 'Extintores PQS', 'CO2', 'Evacuación', 'Triángulo del Fuego'],
    rating: 4.8,
    totalStudents: 980,
    isPopular: true,
    publishedDate: '2026-02-01',
    modules: [
      {
        id: 'm2-1',
        title: 'Módulo 1: Teoría del Fuego y Clases de Combustibles',
        lessons: [
          {
            id: 'l2-1',
            title: '1. El tetraedro del fuego y fuentes de calor comunes',
            duration: '15 min',
            summary: 'Comprensión de combustible, comburente, calor y reacción en cadena para extinguir por enfriamiento, sofocación o inhibición química.',
            keyPoints: [
              'Identificación de riesgos eléctricos y acumulación de gases.',
              'Mantenimiento preventivo de instalaciones domiciliarias.'
            ],
            completed: false
          },
          {
            id: 'l2-2',
            title: '2. Clasificación de fuegos: A, B, C, D y K',
            duration: '20 min',
            summary: 'Por qué nunca se debe echar agua sobre aceites calientes de cocina (Clase K) ni sobre equipos energizados (Clase C).',
            keyPoints: [
              'Fuego Clase A: sólidos combustibles (madera, papel).',
              'Fuego Clase B: líquidos inflamables (gasolina, solventes).',
              'Fuego Clase C: equipos eléctricos energizados.'
            ],
            completed: false
          }
        ]
      },
      {
        id: 'm2-2',
        title: 'Módulo 2: Uso Práctico del Extintor y Protocolos de Humo',
        lessons: [
          {
            id: 'l2-3',
            title: '3. Método PASS / TAPE para descarga segura',
            duration: '18 min',
            summary: 'Tirar del pasador, apuntar a la base de la llama, presionar la manilla y esparcir en abanico.',
            keyPoints: [
              'Distancia segura de 2 a 3 metros a favor del viento.',
              'Nunca dar la espalda a un foco de incendio residual.'
            ],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'c3',
    title: 'Protocolos de Autoprotección ante Sismos y Terremotos Mayores',
    slug: 'autoproteccion-sismos-terremotos',
    category: 'sismos',
    categoryLabel: 'Sismos & Terremotos',
    shortDescription: 'Estrategias probadas para antes, durante y después de un movimiento telúrico de gran magnitud. Zonas seguras y mochila de emergencia.',
    description: 'En zonas sísmicas activas, saber cómo reaccionar en los primeros 60 segundos define la seguridad de tu familia o compañeros de trabajo. Aprende la técnica Agáchate, Cúbrete y Sujétate, la preparación del kit de 72 horas y el corte preventivo de suministros básicos.',
    instructorName: 'Geóloga Elena Soto & Ing. Sismorresistente',
    instructorRole: 'Especialista en Gestión de Riesgo de Desastres',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    durationHours: 8,
    level: 'Básico',
    badgeName: 'Especialista en Prevención Sísmica',
    tags: ['Sismos', 'Terremoto', 'Evacuación Vertical', 'Mochila 72h', 'Zonas Seguras'],
    rating: 4.95,
    totalStudents: 2150,
    isPopular: true,
    publishedDate: '2026-01-20',
    modules: [
      {
        id: 'm3-1',
        title: 'Módulo 1: Comportamiento Durante el Movimiento',
        lessons: [
          {
            id: 'l3-1',
            title: '1. Agacharse, Cubrirse y Sujetarse vs mitos peligrosos',
            duration: '22 min',
            summary: 'Desmitificación del "triángulo de la vida" y explicación de por qué proteger cabeza y cuello bajo estructuras sólidas salva vidas.',
            keyPoints: [
              'Mantenerse alejado de ventanales y objetos en altura.',
              'No intentar bajar escaleras ni usar ascensores durante el sismo.',
              'Procedimiento en la vía pública o conduciendo un vehículo.'
            ],
            completed: true
          }
        ]
      },
      {
        id: 'm3-2',
        title: 'Módulo 2: El Minuto Después y Plan 72 Horas',
        lessons: [
          {
            id: 'l3-2',
            title: '2. Inspección rápida de fugas de gas y daño estructural',
            duration: '25 min',
            summary: 'Protocolo de corte de llaves de paso, linternas sin chispa y evaluación de grietas en X en muros portantes.',
            keyPoints: [
              'Cerrar llave de paso de gas inmediatamente si se percibe olor.',
              'No encender fósforos, velas ni interruptores de luz.',
              'Punto de encuentro familiar establecido previamente.'
            ],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'c4',
    title: 'Control de Hemorragias Masivas y Manejo de Traumatismos',
    slug: 'control-hemorragias-stop-the-bleed',
    category: 'primeros-auxilios',
    categoryLabel: 'Primeros Auxilios',
    shortDescription: 'Implementación del protocolo internacional STOP THE BLEED: empaquetamiento de heridas, apósitos hemostáticos y uso de torniquetes.',
    description: 'Una hemorragia severa no controlada puede causar el fallecimiento en menos de 3 minutos. Aprende a evaluar el sangrado exanguinante, aplicar presión directa con vendajes compresivos y colocar correctamente un torniquete táctico CAT o SOF-T.',
    instructorName: 'Enf. Patricia Campos',
    instructorRole: 'Instructora Trauma TCCC & Cuidados Críticos',
    instructorAvatar: 'https://images.unsplash.com/photo-1594824813593-36652433bb08?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    durationHours: 14,
    level: 'Avanzado',
    badgeName: 'Operador en Control de Hemorragias',
    tags: ['Hemorragias', 'Torniquete CAT', 'Presión Directa', 'Trauma', 'Shock'],
    rating: 4.9,
    totalStudents: 840,
    isPopular: false,
    publishedDate: '2026-02-10',
    modules: [
      {
        id: 'm4-1',
        title: 'Módulo 1: Identificación y Presión Directa',
        lessons: [
          {
            id: 'l4-1',
            title: '1. Diferenciación de sangrado arterial, venoso y capilar',
            duration: '16 min',
            summary: 'Signos de sangrado exanguinante y fisiopatología del shock hipovolémico.',
            keyPoints: [
              'Sangrado en chorro pulsátil (arterial) requiere intervención inmediata.',
              'Uso de guantes protectores de nitrilo.'
            ],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'c5',
    title: 'Primeros Auxilios Psicológicos (PAP) en Catástrofes',
    slug: 'primeros-auxilios-psicologicos',
    category: 'psicologia-emergencia',
    categoryLabel: 'Psicología de Emergencia',
    shortDescription: 'Herramientas de contención emocional, alivio inmediato y escucha activa para personas en estado de shock por desastres.',
    description: 'Aprende el modelo de las 5 fases de los Primeros Auxilios Psicológicos: contacto y acercamiento, seguridad y alivio, estabilización, recopilación de necesidades y conexión con redes de apoyo social.',
    instructorName: 'Ps. Cristóbal Morales',
    instructorRole: 'Especialista en Psicología de la Emergencia y Cruz Roja',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80',
    durationHours: 8,
    level: 'Intermedio',
    badgeName: 'Facilitador de Apoyo Psicosocial',
    tags: ['Salud Mental', 'Crisis', 'Contención', 'Resiliencia'],
    rating: 4.85,
    totalStudents: 610,
    isPopular: false,
    publishedDate: '2026-02-18',
    modules: [
      {
        id: 'm5-1',
        title: 'Módulo 1: Estabilización Emocional',
        lessons: [
          {
            id: 'l5-1',
            title: '1. Técnicas de respiración diafragmática y anclaje sensorial',
            duration: '20 min',
            summary: 'Cómo calmar a un niño o adulto hiperventilando tras una réplica sísmica o pérdida material.',
            keyPoints: [
              'Regla del 5-4-3-2-1 para reconectar con el presente.',
              'Validar emociones sin prometer lo que no se puede cumplir.'
            ],
            completed: false
          }
        ]
      }
    ]
  }
];

export const INITIAL_USER: User = {
  id: 'usr-101',
  name: 'Camila Ríos Donoso',
  email: 'camila.rios@aulavirtual.cl',
  role: 'brigadista',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  bio: 'Brigadista comunitaria interesada en gestión de emergencias sísmicas y soporte vital prehospitalario.',
  institution: 'Comité Barrial de Seguridad y Emergencia',
  enrolledCourseIds: ['c1', 'c3'],
  favoriteCourseIds: ['c1', 'c2', 'c3'],
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

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    courseId: 'c1',
    courseTitle: 'Soporte Vital Básico, RCP y Manejo del Desfibrilador (DEA)',
    title: 'Registro de Video: Simulación de Compresiones Torácicas y Ciclo 30:2',
    instructions: 'Graba o sube una descripción detallada de tu técnica simulando 5 ciclos ininterrumpidos de RCP (30 compresiones y 2 ventilaciones) sobre un cojín o maniquí de práctica, cronometrando no exceder los 2 minutos.',
    dueDate: '2026-11-20',
    points: 100,
    type: 'Simulacro Práctico'
  },
  {
    id: 't2',
    courseId: 'c3',
    courseTitle: 'Protocolos de Autoprotección ante Sismos y Terremotos Mayores',
    title: 'Croquis del Plan de Evacuación Familiar y Punto de Encuentro Seguro',
    instructions: 'Diseña y documenta el croquis de tu hogar o lugar de trabajo indicando: Zonas de seguridad interna, vías de escape expeditas, ubicación de llaves de corte de gas/luz y punto de reunión exterior.',
    dueDate: '2026-11-25',
    points: 100,
    type: 'Protocolo Escrito'
  },
  {
    id: 't3',
    courseId: 'c2',
    courseTitle: 'Prevención de Incendios, Manejo de Extintores y Evacuación',
    title: 'Auditoría Técnica de Extintores y Detección de Fuego en tu Edificio',
    instructions: 'Revisa la etiqueta de un extintor cercano: tipo de agente (PQS, CO2), manómetro (zona verde), fecha de mantención y despeje de 1 metro alrededor.',
    dueDate: '2026-12-02',
    points: 100,
    type: 'Auditoría Técnica'
  }
];

export const INITIAL_SUBMISSIONS: TaskSubmission[] = [
  {
    id: 'sub-1',
    taskId: 't1',
    studentId: 'usr-101',
    studentName: 'Camila Ríos Donoso',
    submittedAt: '2026-11-04 18:30',
    content: 'He grabado y enviado la demostración en formato mp4. Realicé 5 ciclos completos con ritmo metrónomo de 110 cpm manteniendo una profundidad constante y respetando la reexpansión torácica.',
    fileAttachmentName: 'demostracion_rcp_camila_rios.mp4',
    grade: 95,
    feedback: 'Excelente postura de brazos rectos y bloqueo de codos. El ritmo fue constante y las interrupciones mínimas. ¡Aprobado con distinción!',
    status: 'calificada'
  }
];

export const INITIAL_LIVE_SESSIONS: LiveSession[] = [
  {
    id: 'live-1',
    courseId: 'c1',
    courseTitle: 'Soporte Vital Básico, RCP y Manejo del Desfibrilador (DEA)',
    title: 'Taller Sincrónico: Simulación de Casos Críticos y Resolución de Dudas con SAMU',
    instructor: 'Dr. Alejandro Morales',
    instructorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    date: 'Hoy',
    time: '19:00 hrs GMT-3',
    durationMinutes: 60,
    status: 'en-vivo',
    description: 'Sesión interactiva en vivo con demostración en maniquí de alta fidelidad, conexión de parches pediátricos y análisis de ritmos desfibrilables.',
    participantsCount: 38
  },
  {
    id: 'live-2',
    courseId: 'c3',
    courseTitle: 'Protocolos de Autoprotección ante Sismos y Terremotos Mayores',
    title: 'Mesa Redonda: Lecciones Aprendidas del Terremoto 8.8 y Tsunami',
    instructor: 'Geóloga Elena Soto',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    date: '12 de Noviembre',
    time: '20:00 hrs GMT-3',
    durationMinutes: 90,
    status: 'programada',
    description: 'Análisis de fallas comunes en evacuaciones verticales y coordinación vecinal durante emergencias complejas.',
    participantsCount: 114
  }
];

export const INITIAL_FORUM_THREADS: ForumThread[] = [
  {
    id: 'f1',
    courseId: 'c3',
    courseTitle: 'Protocolos de Autoprotección ante Sismos y Terremotos Mayores',
    category: 'Sismos',
    title: '¿Qué hacer si una persona sufre convulsiones o crisis de pánico en pleno sismo?',
    content: 'Hola a todos los brigadistas y docentes. En un simulacro reciente en mi oficina, una colega tuvo una crisis de pánico y quedó paralizada en una zona vidriada. ¿Cuál es el protocolo recomendado para moverla sin exponernos ambos?',
    authorId: 'usr-102',
    authorName: 'Rodrigo Araya',
    authorRole: 'Estudiante',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: 'Hace 2 horas',
    views: 145,
    isPinned: true,
    tags: ['Sismos', 'Crisis de Pánico', 'Evacuación Segura'],
    replies: [
      {
        id: 'rep-1',
        authorId: 'usr-prof-1',
        authorName: 'Dr. Alejandro Morales',
        authorRole: 'Instructor Médico',
        authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
        content: 'Estimado Rodrigo: La seguridad de la escena prima. Si la persona está bajo riesgo inminente de cristales rotos, se debe usar una orden verbal corta y firme (ej. "¡Mírame, agáchate aquí conmigo!"). Si no reacciona, se aplica tracción por los hombros hacia un pilar estructural.',
        createdAt: 'Hace 45 minutos',
        likes: 12
      },
      {
        id: 'rep-2',
        authorId: 'usr-101',
        authorName: 'Camila Ríos Donoso',
        authorRole: 'Brigadista',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        content: 'En nuestro comité practicamos la técnica de "escudo de cuerpo" guiando con mano firme el dorso hacia la zona segura. Es clave que los brigadistas no se contagien del estado de pánico.',
        createdAt: 'Hace 20 minutos',
        likes: 5
      }
    ]
  },
  {
    id: 'f2',
    courseId: 'c2',
    courseTitle: 'Prevención de Incendios, Manejo de Extintores y Evacuación',
    category: 'Incendios',
    title: '¿Por qué no usar extintor de agua en baterías de litio (scooters / celulares)?',
    content: 'He visto que cada vez hay más incendios por baterías de ion-litio en departamentos. ¿El polvo químico seco estándar (PQS) es suficiente o se requiere un extintor especial clase F/K?',
    authorId: 'usr-103',
    authorName: 'Matías Silva',
    authorRole: 'Estudiante',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdAt: 'Ayer',
    views: 290,
    isPinned: false,
    tags: ['Incendios', 'Baterías Litio', 'Extintores'],
    replies: [
      {
        id: 'rep-3',
        authorId: 'usr-bombero-1',
        authorName: 'Capitán Marcelo Valenzuela',
        authorRole: 'Instructor Bombero',
        authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
        content: 'Las baterías de litio sufren desbocamiento térmico (thermal runaway) y generan su propio oxígeno internamente. El PQS solo apaga los materiales plásticos externos, pero el módulo se reinflama. Se requiere inundación continua de agua para enfriar o agentes encapsulantes F-500.',
        createdAt: 'Ayer',
        likes: 18
      }
    ]
  }
];
