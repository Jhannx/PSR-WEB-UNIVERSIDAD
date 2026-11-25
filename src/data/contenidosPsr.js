/* contenidosPsr.js - datos estructurados y enlaces multimedia desde Cloudflare R2 */

export const R2_BASE_URL =
  "https://pub-d18bad3a62a14a5782da8b0cf5ee37cf.r2.dev/psr-nuevo-contenido";

export const fotoProfesoresNosotros = R2_BASE_URL + "/profesores-psr.PNG";

export const cifrasInicio = [
  {
    numero: "16",
    titulo: "Años de Trayectoria",
    descripcion:
      "Formando generaciones de bailarines y apasionados por el arte del movimiento en Sincelejo desde 2010."
  },
  {
    numero: "6",
    titulo: "Profesores de Danza",
    descripcion:
      "Equipo de instructores dedicados a la formación técnica en ritmos latinos, rumba y trabajo corporal."
  },
  {
    numero: "4",
    titulo: "Categorías por Edad",
    descripcion:
      "Programas estructurados desde preinfantil (3 a 5 años) hasta adultos, adaptados al ritmo de cada alumno."
  }
];

export const programasPrincipales = [
  {
    id: "academia",
    titulo: "Academia Regular",
    badge: "Por categorías de edad",
    tipoBadge: "",
    imagen: "/img/salsa-ensamble.jpg",
    alt: "Clase grupal y ensamble de estudiantes de baile",
    descripcion:
      "Clases continuas tres días a la semana organizadas por grupos: preinfantil, infantil, juvenil y adultos, con formación técnica y coreográfica.",
    ruta: "/academia",
    textoEnlace: "Ver horarios y niveles"
  },
  {
    id: "rumba",
    titulo: "Rumba Aeróbica",
    badge: "$4.000 COP por clase",
    tipoBadge: "psr-badge-orange",
    imagen: "/img/rumba-clase.jpg",
    alt: "Sesión de rumba aeróbica y ejercicio en salón con espejos",
    descripcion:
      "Acondicionamiento físico y quema de calorías bailando al ritmo latino. Lunes a jueves de 7:00 a 8:00 p. m. Pago directo por clase, sin mensualidades.",
    ruta: "/rumba-aerobica",
    textoEnlace: "Conocer dinámica de rumba"
  },
  {
    id: "personalizadas",
    titulo: "Clases Personalizadas",
    badge: "Individual o en pareja",
    tipoBadge: "psr-badge-cyan",
    imagen: "/img/salsa-social.jpg",
    alt: "Pareja practicando pasos de salsa en clase privada",
    descripcion:
      "Aprende salsa, bachata o champeta a tu propio ritmo con la atención exclusiva de un instructor y horarios adaptados a tu agenda diaria.",
    ruta: "/personalizadas",
    textoEnlace: "Solicitar clase particular"
  }
];

export const beneficiosAcademia = [
  {
    icono: "ph-music-notes",
    titulo: "Formación Artística",
    descripcion:
      "Clases guiadas para desarrollar técnica corporal, musicalidad, coordinación y presencia escénica desde el primer mes."
  },
  {
    icono: "ph-star",
    titulo: "Disciplina y Postura",
    descripcion:
      "Herramientas físicas para proyectar elegancia, seguridad y control corporal tanto en la danza como en tu vida diaria."
  },
  {
    icono: "ph-users-three",
    titulo: "Comunidad y Amistad",
    descripcion:
      "Ensayos dinámicos en grupos organizados de hasta 30 estudiantes para compartir la pasión por el baile en equipo."
  },
  {
    icono: "ph-medal",
    titulo: "Escenario y Muestras",
    descripcion:
      "Oportunidad de participar en festivales y presentaciones culturales para celebrar tus avances frente al público."
  }
];

export const momentosAcademia = [
  {
    id: "academia-infantil",
    tipo: "video",
    url: R2_BASE_URL + "/que-es-la-danza-para-las-ni%C3%B1as.mp4",
    ariaLabel: "Video sobre la danza para las niñas",
    badge: "Preinfantil e Infantil",
    tipoBadge: "psr-badge-orange",
    titulo: "La danza desde la infancia",
    descripcion:
      "Un vistazo a la expresión, el movimiento y el aprendizaje en los grupos infantiles de PSR."
  },
  {
    id: "academia-voces",
    tipo: "video",
    url: R2_BASE_URL + "/opinion-personas-academia.mp4",
    ariaLabel: "Opiniones de personas de la academia PSR",
    badge: "Voces PSR",
    tipoBadge: "psr-badge-cyan",
    titulo: "La experiencia de nuestra comunidad",
    descripcion:
      "Alumnos y personas cercanas comparten lo que significa bailar y aprender en PSR."
  }
];

export const horariosAcademia = [
  {
    id: "infantil",
    titulo: "Preinfantil e Infantil · 3 a 12 años",
    horario: "Lunes, miércoles y jueves, de 4:00 p. m. a 6:00 p. m.",
    descripcion:
      "Iniciación al ritmo, motricidad, expresión corporal y primeros pasos de salsa y géneros tropicales en un entorno seguro y divertido."
  },
  {
    id: "juvenil",
    titulo: "Juvenil · 13 a 17 años",
    horario: "Martes, jueves y sábados, de 6:00 p. m. a 8:00 p. m.",
    descripcion:
      "Entrenamiento técnico en salsa y ritmos modernos, desarrollo de velocidad de pies, giros y montajes coreográficos para presentaciones."
  },
  {
    id: "adultos",
    titulo: "Adultos · 18 años en adelante",
    horario: "Martes, jueves y viernes, alrededor de las 8:00 p. m.",
    descripcion:
      "Baile social, salsa en línea y caleña, bachata y acondicionamiento. Diseñado para aprender desde cero o perfeccionar tu estilo en la pista."
  }
];

export const faqAcademia = [
  {
    id: "faq-1",
    pregunta: "¿Necesito experiencia previa para ingresar?",
    respuesta:
      "No necesitas ninguna experiencia previa. Todas las categorías inician desde los pasos fundamentales y la postura básica, acompañándote según tu propio ritmo."
  },
  {
    id: "faq-2",
    pregunta: "¿Cómo funciona el proceso de matrícula?",
    respuesta:
      "La matrícula previa es obligatoria para reservar el cupo formal del estudiante y ser ingresado al grupo oficial de comunicación de la academia antes de iniciar los entrenamientos."
  },
  {
    id: "faq-3",
    pregunta: "¿Se pueden reponer clases por inasistencias individuales?",
    respuesta:
      "Al tratarse de una formación grupal continua con grupos de alrededor de 30 estudiantes, no se realizan reposiciones individuales por faltas personales; sin embargo, los instructores siempre dedican minutos de repaso para nivelar al alumno en la siguiente sesión."
  },
  {
    id: "faq-4",
    pregunta: "¿Puedo asistir a una clase de prueba antes de inscribirme?",
    respuesta:
      "¡Claro que sí! Puedes dejarnos tus datos en el formulario de abajo indicando que deseas una inducción, y te asignaremos un día para que vivas la experiencia en nuestra sede del Centro."
  }
];

export const momentosRumba = [
  {
    id: "rumba-retro",
    tipo: "video",
    url: R2_BASE_URL + "/aerobicos-rumba-retro.mp4",
    ariaLabel: "Sesión de rumba aeróbica con música retro",
    badge: "Rumba retro",
    tipoBadge: "psr-badge-orange",
    titulo: "Aeróbicos al ritmo de siempre",
    descripcion:
      "Una muestra de la energía y el ambiente de nuestras sesiones de rumba."
  },
  {
    id: "rumba-octubre",
    tipo: "video",
    url: R2_BASE_URL + "/tematica-octubre--Mes%20de%20octubre,%20a%20despelucarse.mp4",
    ariaLabel: "Jornada temática de rumba aeróbica del mes de octubre",
    badge: "Jornada temática",
    tipoBadge: "psr-badge-cyan",
    titulo: "Octubre: a despelucarse",
    descripcion:
      "Una de las actividades temáticas que también hace parte de la experiencia de Aeróbicos y Rumba."
  }
];

export const ritmosPersonalizadas = [
  {
    id: "salsa",
    valorSelect: "salsa",
    titulo: "Salsa (Línea y Estilo Libre)",
    badge: "Salsa Social",
    tipoBadge: "",
    imagen: "/img/salsa-social.jpg",
    alt: "Clase particular de salsa en línea en pareja",
    descripcion:
      "Aprende a escuchar el tiempo musical, domina las vueltas básicas, el cross body lead y desenvuélvete con soltura y elegancia en cualquier pista de baile social.",
    metaEtiqueta: "Para:",
    metaValor: "Principiantes y nivel intermedio."
  },
  {
    id: "bachata",
    valorSelect: "bachata",
    titulo: "Bachata Tradicional y Sensual",
    badge: "Bachata",
    tipoBadge: "psr-badge-orange",
    imagen: "/img/bachata-pareja.jpg",
    alt: "Pareja bailando bachata sensual y moderna en salón",
    descripcion:
      "Enfocada en la disociación corporal, movimiento de cadera, técnica de brazos y conexión de pareja para bailar con naturalidad y fluidez.",
    metaEtiqueta: "Para:",
    metaValor: "Parejas o solistas."
  },
  {
    id: "champeta",
    valorSelect: "champeta",
    titulo: "Champeta y Ritmos Urbanos",
    badge: "Ritmo Caribe",
    tipoBadge: "psr-badge-cyan",
    imagen: "/img/urbano-champeta.jpg",
    alt: "Bailarín ejecutando pasos de champeta y ritmos urbanos",
    descripcion:
      "Aprende los pases clásicos y modernos de champeta criolla y urbana. Mejora tu coordinación motriz, rapidez en los pies y soltura al compás de la música caribeña.",
    metaEtiqueta: "Para:",
    metaValor: "Todas las edades."
  }
];

export const catalogoVestuarios = [
  {
    id: "salsa-pareja",
    genero: "salsa",
    valorSelect: "salsa-pareja",
    titulo: "Salsa en Pareja",
    badge: "Salsa de Gala",
    tipoBadge: "",
    imagen: "/img/salsa-pareja-show.jpg",
    alt: "Trajes de salsa en pareja con vestido corto de giro en escenario",
    descripcion:
      "Juego a juego para hombre y mujer. Vestido corto con pedrería y flecos con movimiento para ella, y camisa a tono con pantalón de vestir para él.",
    metaEtiqueta: "Tallas:",
    metaValor: "XS, S, M, L."
  },
  {
    id: "salsa-grupal",
    genero: "salsa",
    valorSelect: "salsa-grupal",
    titulo: "Salsa Show Grupal",
    badge: "Ensamble Grupal",
    tipoBadge: "psr-badge-orange",
    imagen: "/img/salsa-ensamble.jpg",
    alt: "Vestuario uniforme para ensamble grupal de bailarines de salsa",
    descripcion:
      "Conjuntos idénticos para elencos de competencia o shows masivos. Combinaciones en tonos vivos (rojo, dorado, azul eléctrico y fucsia).",
    metaEtiqueta: "Disponibilidad:",
    metaValor: "Hasta 16 juegos."
  },
  {
    id: "bachata",
    genero: "bachata",
    valorSelect: "bachata",
    titulo: "Línea Bachata",
    badge: "Bachata y Sensual",
    tipoBadge: "psr-badge-cyan",
    imagen: "/img/bachata-pareja.jpg",
    alt: "Vestuarios fluidos para bachata y ritmos sensuales en pareja",
    descripcion:
      "Prendas ligeras y ceñidas con caída fluida que permiten apreciar la disociación corporal y giros continuos en ritmos caribeños.",
    metaEtiqueta: "Tallas:",
    metaValor: "S, M, L."
  },
  {
    id: "solista",
    genero: "fantasia",
    valorSelect: "solista",
    titulo: "Solistas y Dúos",
    badge: "Fantasía Escénica",
    tipoBadge: "",
    imagen: "/img/solista-escena.jpg",
    alt: "Bailarina solista en presentación escénica",
    descripcion:
      "Diseños exclusivos con trabajo manual en cristales y lentejuelas, pensados para aperturas de quinceañeros o festivales de solistas.",
    metaEtiqueta: "Uso:",
    metaValor: "Presentaciones estelares."
  }
];

export const formatosContratar = [
  {
    id: "pareja",
    valorSelect: "pareja",
    titulo: "Show de Pareja (Salsa o Bachata)",
    badge: "Elegancia y Gala",
    tipoBadge: "",
    imagen: "/img/salsa-pareja-show.jpg",
    alt: "Pareja de bailarines de salsa en presentación en vivo",
    descripcion:
      "Puesta en escena íntima y refinada para bodas, cenas de aniversario y recepciones. Incluye rutina coreográfica y vals o apertura de pista guiada con los homenajeados.",
    metaEtiqueta: "Duración aprox.:",
    metaValor: "15 a 25 minutos."
  },
  {
    id: "grupal",
    valorSelect: "grupal",
    titulo: "Ensamble Grupal de Salsa",
    badge: "Impacto Escénico",
    tipoBadge: "psr-badge-orange",
    imagen: "/img/salsa-ensamble.jpg",
    alt: "Ensamble coreográfico completo de salsa en tarima",
    descripcion:
      "Entre 6 y 16 bailarines en tarima ejecutando montajes de salsa libre, mambo y fusiones caribeñas con cambios de vestuario brillante y sincronía de alta exigencia.",
    metaEtiqueta: "Duración aprox.:",
    metaValor: "20 a 40 minutos."
  },
  {
    id: "hora-loca",
    valorSelect: "hora-loca",
    titulo: "Hora Loca y Animación",
    badge: "Pista Llena",
    tipoBadge: "psr-badge-cyan",
    imagen: "/img/hora-loca-fiesta.jpg",
    alt: "Animación de fiesta y celebración con público y confeti",
    descripcion:
      "Bailarines profesionales que prenden la fiesta, invitan a todos los asistentes a la pista y dirigen dinámicas de salsa, champeta y ritmos tropicales garantizando alegría total.",
    metaEtiqueta: "Duración aprox.:",
    metaValor: "45 a 60 minutos."
  }
];

export const muestrasContratar = [
  {
    id: "show-yeison-bertha",
    tipo: "video",
    url:
      R2_BASE_URL +
      "/arrollando/presentacion-yeison-y-bertha-campeon-nacional-salsa-cabaret-adulto-amateur-2025.mp4",
    ariaLabel: "Presentación de Yeison y Bertha, campeones nacionales 2025",
    badge: "Show de pareja",
    tipoBadge: "",
    titulo: "Salsa cabaret · Adulto amateur",
    descripcion: "Presentación de Yeison y Bertha, campeones nacionales 2025."
  },
  {
    id: "show-urban-latin",
    tipo: "video",
    url: R2_BASE_URL + "/presentacion-urban-latin-dance.mp4",
    ariaLabel: "Presentación Urban Latin Dance de PSR",
    badge: "Ensamble grupal",
    tipoBadge: "psr-badge-orange",
    titulo: "Urban Latin Dance",
    descripcion: "Una muestra de los montajes grupales disponibles para eventos."
  },
  {
    id: "show-comparsa",
    tipo: "video",
    url: R2_BASE_URL + "/video-comparsa-nueva--opiniones-personas.mp4",
    ariaLabel: "Comparsa nueva de PSR con opiniones de asistentes",
    badge: "Animación",
    tipoBadge: "psr-badge-cyan",
    titulo: "Comparsa y alegría para tu evento",
    descripcion: "Una muestra de la comparsa y de la respuesta del público."
  },
  {
    id: "show-arrollando-2024",
    tipo: "video",
    url: R2_BASE_URL + "/arrollando/arrollandodance-2024-yeison.mp4",
    ariaLabel: "Presentación Arrollando Dance 2024",
    badge: "Montaje escénico",
    tipoBadge: "",
    titulo: "Arrollando Dance · 2024",
    descripcion: "Registro de una de las presentaciones de nuestro elenco."
  },
  {
    id: "show-javier-sofia",
    tipo: "video",
    url:
      R2_BASE_URL +
      "/arrollando/presentacion-javier-y-sofia-subcampeon-nacional-salsa-cabaret-adulto-amateur-2025.mp4",
    ariaLabel: "Presentación de Javier y Sofía, subcampeones nacionales 2025",
    badge: "Show de pareja",
    tipoBadge: "psr-badge-orange",
    titulo: "Javier y Sofía · Salsa cabaret",
    descripcion: "Muestra de pareja adulta con reconocimiento nacional en 2025."
  },
  {
    id: "show-juan-mariapaz",
    tipo: "video",
    url:
      R2_BASE_URL +
      "/arrollando/presentacion-juan-y-maria-paz-subcampeon-nacional-salsa-cabaret-juvenil-principiante-2025.mp4",
    ariaLabel: "Presentación de Juan y María Paz, subcampeones juveniles 2025",
    badge: "Show juvenil",
    tipoBadge: "",
    titulo: "Juan y María Paz · Salsa cabaret",
    descripcion: "Presentación juvenil reconocida en el Campeonato Nacional 2025."
  }
];

export const modalidadesTalleres = [
  {
    id: "colegio",
    valorSelect: "colegio",
    titulo: "Talleres Escolares y Juveniles",
    badge: "Colegios y Universidades",
    tipoBadge: "",
    imagen: R2_BASE_URL + "/foto-talleres-2025.PNG",
    alt: "Taller de baile con jóvenes estudiantes en el salón de PSR",
    descripcion:
      "Iniciación a los ritmos latinos, desarrollo psicomotriz y fomento del arte como alternativa saludable para estudiantes de primaria, secundaria y educación superior.",
    metaEtiqueta: "Enfoque:",
    metaValor: "Convivencia, ritmo y cultura."
  },
  {
    id: "empresa",
    valorSelect: "empresa",
    titulo: "Pausas Activas y Clima Laboral",
    badge: "Bienestar Laboral",
    tipoBadge: "psr-badge-orange",
    imagen: "/img/rumba-clase.jpg",
    alt: "Actividad de pausa activa y baile grupal en salón",
    descripcion:
      "Jornadas de integración empresarial donde la rumba y el movimiento ayudan a desestresar equipos de trabajo, mejorar la postura y fortalecer lazos de compañerismo.",
    metaEtiqueta: "Enfoque:",
    metaValor: "Salud ocupacional y energía."
  },
  {
    id: "masterclass",
    valorSelect: "universidad",
    titulo: "Masterclasses y Clínicas",
    badge: "Técnica Avanzada",
    tipoBadge: "psr-badge-cyan",
    imagen: "/img/salsa-social.jpg",
    alt: "Clase intensiva de salsa y técnica en pareja",
    descripcion:
      "Sesiones intensivas dictadas por nuestros maestros para grupos de danza locales o casas de cultura que deseen profundizar en técnica de salsa en línea, mambo y giros.",
    metaEtiqueta: "Enfoque:",
    metaValor: "Perfeccionamiento escénico."
  }
];

export const galeriaTalleres = [
  {
    id: "taller-foto-2025",
    tipo: "imagen",
    url: R2_BASE_URL + "/foto-talleres-2025.PNG",
    alt: "Participantes durante los talleres de PSR en 2025",
    badge: "Talleres PSR",
    tipoBadge: "",
    titulo: "Jornadas de formación 2025",
    descripcion:
      "Una mirada a los espacios de aprendizaje y encuentro que construimos con cada grupo."
  },
  {
    id: "taller-video-grupal",
    tipo: "video",
    url: R2_BASE_URL + "/video-grupal-taller-studio110-dance-2025.mp4",
    ariaLabel: "Taller grupal de Studio 110 Dance en 2025",
    badge: "Práctica grupal",
    tipoBadge: "psr-badge-orange",
    titulo: "Taller grupal · Studio 110 Dance",
    descripcion:
      "Trabajo coreográfico y energía colectiva durante el taller de 2025."
  },
  {
    id: "taller-video-solo",
    tipo: "video",
    url: R2_BASE_URL + "/video-solo-taller-studio110dance-2025.mp4",
    ariaLabel: "Presentación individual del taller Studio 110 Dance en 2025",
    badge: "Presentación individual",
    tipoBadge: "psr-badge-cyan",
    titulo: "Taller Studio 110 Dance",
    descripcion:
      "Una muestra individual del trabajo realizado en la jornada de formación."
  }
];

export const profesoresNosotros = [
  {
    id: "prof-1",
    titulo: "Maestro Principal de Salsa",
    badge: "Dirección y Salsa",
    tipoBadge: "",
    imagen: "/img/salsa-pareja-show.jpg",
    alt: "Profesor de Salsa Estilo Libre y Director",
    descripcion:
      "Fundador y coreógrafo con más de 16 años de experiencia escénica. Lidera el elenco mayor y las clases avanzadas de salsa en línea y estilo libre."
  },
  {
    id: "prof-2",
    titulo: "Docente de Preinfantil e Infantil",
    badge: "Formación Infantil",
    tipoBadge: "psr-badge-orange",
    imagen: "/img/solista-escena.jpg",
    alt: "Profesora de Formación Infantil y Expresión Corporal",
    descripcion:
      "Licenciada en pedagogía artística infantil. Encargada de la iniciación al ritmo, motricidad básica y primeras coreografías de niños de 3 a 12 años."
  },
  {
    id: "prof-3",
    titulo: "Instructor de Rumba Aeróbica",
    badge: "Rumba y Fitness",
    tipoBadge: "psr-badge-cyan",
    imagen: "/img/rumba-clase.jpg",
    alt: "Instructor de Rumba Aeróbica y Acondicionamiento",
    descripcion:
      "Especialista en entrenamiento físico y salud cardiovascular mediante el baile. Dirige las sesiones grupales de lunes a jueves en horario nocturno."
  },
  {
    id: "prof-4",
    titulo: "Docente de Bachata y Parejas",
    badge: "Bachata y Sensual",
    tipoBadge: "",
    imagen: "/img/bachata-pareja.jpg",
    alt: "Profesor de Bachata Tradicional y Sensual",
    descripcion:
      "Formador enfocado en conexión de pareja, musicalidad y técnica de giros en bachata tradicional y moderna para jóvenes y adultos."
  },
  {
    id: "prof-5",
    titulo: "Docente Juvenil y Ritmos Caribe",
    badge: "Juvenil y Champeta",
    tipoBadge: "psr-badge-orange",
    imagen: "/img/urbano-champeta.jpg",
    alt: "Docente de Categoría Juvenil, Champeta y Fusiones Urbanas",
    descripcion:
      "Bailarina y coreógrafa de ritmos afrocaribeños, champeta y fusiones urbanas, guiando a la categoría juvenil hacia su proyección en tarima."
  },
  {
    id: "prof-6",
    titulo: "Docente de Técnica y Montajes",
    badge: "Técnica Escénica",
    tipoBadge: "psr-badge-cyan",
    imagen: "/img/salsa-ensamble.jpg",
    alt: "Profesor de Montaje Escénico y Competencia",
    descripcion:
      "Encargado de la postura, alineación corporal y sincronía grupal para festivales y presentaciones de espectáculos corporativos."
  }
];

export const momentosBlog = [
  {
    id: "momento-escena",
    tipo: "imagen",
    url: R2_BASE_URL + "/competicion-chile-vi%C3%B1a-del-mar.PNG",
    alt: "Competencia de PSR en Viña del Mar, Chile",
    badge: "Presentaciones",
    tipoBadge: "",
    titulo: "PSR en escena",
    ruta: "/blog/presentaciones#galeria-presentaciones",
    textoEnlace: "Ver fotos y videos"
  },
  {
    id: "momento-talleres",
    tipo: "imagen",
    url: R2_BASE_URL + "/foto-talleres-2025.PNG",
    alt: "Participantes en los talleres de PSR de 2025",
    badge: "Talleres",
    tipoBadge: "psr-badge-orange",
    titulo: "Aprender en movimiento",
    ruta: "/talleres#galeria-talleres",
    textoEnlace: "Ver talleres"
  },
  {
    id: "momento-rumba",
    tipo: "imagen",
    url: "/img/rumba-clase.jpg",
    alt: "Grupo de estudiantes durante una sesión de rumba aeróbica",
    badge: "Aeróbicos y Rumba",
    tipoBadge: "psr-badge-cyan",
    titulo: "Ritmo para compartir",
    ruta: "/rumba-aerobica#momentos-rumba",
    textoEnlace: "Ver sesiones"
  },
  {
    id: "momento-profesores",
    tipo: "imagen",
    url: R2_BASE_URL + "/profesores-psr.PNG",
    alt: "Profesores de danza de PSR",
    badge: "Academia",
    tipoBadge: "",
    titulo: "Personas que enseñan",
    ruta: "/nosotros#equipo-titulo",
    textoEnlace: "Conocer al equipo"
  }
];

export const articulosBlog = [
  {
    slug: "anuncios",
    categoria: "Anuncios",
    tipoBadge: "",
    fechaIso: "2026-10-15",
    fechaTexto: "15 de octubre de 2026",
    titulo: "Apertura de Nuevos Ciclos de Formación en Todas las Categorías",
    resumen:
      "Abrimos convocatorias para los grupos Preinfantil, Infantil, Juvenil y Adultos. Revisa las fechas límite de matrícula y los requisitos para ingresar a la academia.",
    subtitulo:
      "La Escuela de Baile Pioneros de la Salsa y Ritmos (PSR) abre formalmente el periodo de inscripciones para sus cuatro categorías formativas en la sede Centro de Sincelejo.",
    imagen: R2_BASE_URL + "/foto-talleres-2025.PNG",
    alt: "Clase grupal de baile en el salón de la escuela PSR",
    pieImagen:
      "Estudiantes de la academia durante un ensayo general de técnica y coordinación.",
    textoEnlace: "Leer comunicado completo",
    introduccion:
      "Nos alegra anunciar a toda la comunidad de Sincelejo y municipios cercanos que a partir de esta semana se encuentran habilitados los cupos para ingresar a nuestros programas regulares de formación dancística. Este nuevo ciclo está pensado para personas con o sin experiencia previa que deseen aprender con un método ordenado y progresivo.",
    secciones: [
      {
        subtitulo: "Categorías y Horarios Confirmados",
        parrafos: [
          "Contamos con grupos divididos estrictamente por rangos de edad para asegurar que la pedagogía y el esfuerzo físico se adapten al desarrollo de cada bailarín:"
        ],
        lista: [
          "Preinfantil (3 a 5 años) e Infantil (6 a 12 años): Lunes, miércoles y jueves de 4:00 p. m. a 6:00 p. m.",
          "Juvenil (13 a 17 años): Martes, jueves y sábados de 6:00 p. m. a 8:00 p. m.",
          "Adultos (18 años en adelante): Martes, jueves y viernes a partir de las 8:00 p. m."
        ]
      },
      {
        subtitulo: "Proceso de Inscripción y Requisitos",
        parrafos: [
          "Para apartar el cupo, el aspirante o acudiente debe diligenciar el formulario de inscripción en línea o acercarse directamente a nuestra sede en la Calle 20 #25-39, segundo piso (sobre la floristería Jaiber).",
          "Recordamos que la matrícula es obligatoria y previa al ingreso para garantizar la inclusión en los listados del salón y el acceso al grupo informativo de la academia."
        ]
      }
    ],
    cita: "El baile no solo enseña pasos técnicos; cultiva disciplina corporal, seguridad personal y un profundo sentido de pertenencia familiar en cada ensayo.",
    ctaTitulo: "¿Listo para comenzar a bailar?",
    ctaDescripcion:
      "Los cupos por grupo son limitados para mantener la calidad de la enseñanza.",
    ctaTexto: "Diligenciar formulario de inscripción",
    ctaRuta: "/academia#inscripcion"
  },
  {
    slug: "clases",
    categoria: "Novedades de Clases",
    tipoBadge: "psr-badge-orange",
    fechaIso: "2026-10-08",
    fechaTexto: "8 de octubre de 2026",
    titulo: "Consejos Clave para tu Primera Clase de Salsa y Bachata",
    resumen:
      "Si vas a empezar a bailar por primera vez, te compartimos recomendaciones prácticas sobre calzado adecuado, postura corporal y cómo disfrutar el ritmo sin frustrarte.",
    subtitulo:
      "Dar el primer paso en una pista de baile genera emoción e incertidumbre. Aquí te dejamos una guía práctica para aprovechar al máximo tu inicio en la academia.",
    imagen: "/img/salsa-social.jpg",
    alt: "Pareja practicando pasos básicos de salsa en el salón",
    pieImagen:
      "Práctica guiada de desplazamiento y postura para principiantes en PSR.",
    textoEnlace: "Leer artículo",
    introduccion:
      "Muchas personas postergan su deseo de aprender a bailar por miedo a tener dos pies izquierdos o por creer que necesitan llevar pareja obligatoriamente. En la Escuela de Baile PSR derribamos esos mitos desde la primera sesión: todos empezamos desde cero y en un ambiente de apoyo colectivo.",
    secciones: [
      {
        subtitulo: "1. La Ropa y el Calzado Adecuado",
        parrafos: [
          "Para tus primeras semanas no requieres zapatos profesionales de baile. Lo fundamental es llevar calzado cómodo con suela lisa (preferiblemente que no se pegue al piso de madera o baldosa) para permitir giros naturales sin forzar las rodillas ni los tobillos. Viste ropa transpirable que te permita estirarte y mover los brazos con soltura."
        ]
      },
      {
        subtitulo: "2. Escucha la Clave y el Tiempo",
        parrafos: [
          "Antes de preocuparte por vueltas complejas, el secreto de la salsa y la bachata radica en educar el oído. En nuestras clases dedicamos los primeros minutos a identificar el conteo rítmico (1-2-3, 5-6-7 en salsa; 1-2-3-tap en bachata). Sentir el pulso de la percusión hace que los pies sigan la música de forma intuitiva."
        ]
      },
      {
        subtitulo: "3. No te Juzgues: El Proceso es Gradual",
        parrafos: [
          "El cerebro necesita tiempo para coordinar el oído con las extremidades. Equivocarse en un conteo o perder el paso es parte natural del aprendizaje. Nuestros 6 profesores están formados pedagógicamente para corregir tu postura con paciencia y celebrar cada pequeño avance."
        ]
      }
    ],
    galeria: {
      id: "momentos-clases",
      eyebrow: "CLASES Y AERÓBICOS",
      titulo: "La danza en movimiento",
      descripcion:
        "Conoce actividades de formación infantil y momentos de nuestras sesiones de Aeróbicos y Rumba.",
      items: [
        {
          id: "clase-ninas",
          tipo: "video",
          url: R2_BASE_URL + "/que-es-la-danza-para-las-ni%C3%B1as.mp4",
          ariaLabel: "Danza y expresión para las niñas",
          badge: "Formación infantil",
          tipoBadge: "psr-badge-orange",
          titulo: "La danza para las niñas"
        },
        {
          id: "clase-rumba-retro",
          tipo: "video",
          url: R2_BASE_URL + "/aerobicos-rumba-retro.mp4",
          ariaLabel: "Sesión de Aeróbicos y Rumba retro",
          badge: "Aeróbicos y Rumba",
          tipoBadge: "psr-badge-cyan",
          titulo: "Rumba retro"
        },
        {
          id: "clase-rumba-octubre",
          tipo: "video",
          url:
            R2_BASE_URL +
            "/tematica-octubre--Mes%20de%20octubre,%20a%20despelucarse.mp4",
          ariaLabel: "Temática de octubre de Aeróbicos y Rumba",
          badge: "Aeróbicos y Rumba",
          tipoBadge: "psr-badge-cyan",
          titulo: "Octubre: a despelucarse"
        }
      ]
    },
    cita: "Bailar bien no consiste en hacer muchas figuras difíciles, sino en ejecutar el paso básico con peso, tiempo y disfrute genuino.",
    ctaTitulo: "¿Prefieres atención personalizada?",
    ctaDescripcion:
      "Ofrecemos clases individuales o en pareja en Salsa, Bachata y Champeta con horarios flexibles.",
    ctaTexto: "Ver clases personalizadas",
    ctaRuta: "/personalizadas"
  },
  {
    slug: "comunidad",
    categoria: "Comunidad PSR",
    tipoBadge: "psr-badge-cyan",
    fechaIso: "2026-09-28",
    fechaTexto: "28 de septiembre de 2026",
    titulo: "El Baile como Espacio de Integración y Bienestar en Sincelejo",
    resumen:
      "Más que pasos coreográficos, la danza en PSR es un punto de encuentro para desconectar de la rutina diaria, mejorar la salud física y forjar amistades duraderas.",
    subtitulo:
      "En nuestra sede Centro, la danza se ha consolidado como un canal transformador para mejorar la calidad de vida, liberar el estrés y construir comunidad.",
    imagen: "/img/rumba-clase.jpg",
    alt: "Estudiantes en el salón de baile durante su sesión grupal",
    pieImagen: "Sesión de baile y bienestar en la sede de PSR en Sincelejo.",
    textoEnlace: "Leer artículo",
    introduccion:
      "En una sociedad con ritmos acelerados de estudio y trabajo, encontrar un espacio donde el cuerpo se exprese con libertad y la mente se desconecte de las pantallas es indispensable. Desde hace 16 años, la Escuela PSR ha sido el punto de encuentro de cientos de familias sincelejanas que encuentran en el ritmo una fuente de salud física y emocional.",
    secciones: [
      {
        subtitulo: "Salud Cardiovascular y Energía Diaria",
        parrafos: [
          "Bailar una hora de salsa, bachata o rumba aeróbica activa la circulación, fortalece el tono muscular y quema entre 400 y 600 calorías sin la monotonía de las máquinas de gimnasio. Pero lo más valioso no es el gasto calórico, sino la liberación de endorfinas que transforman el estado de ánimo al instante."
        ]
      },
      {
        subtitulo: "Un Entorno Inclusivo y Seguro",
        parrafos: [
          "En nuestro salón no hay distinciones de edad ni de experiencia. Comparten clase profesionales, estudiantes universitarios, madres y abuelos, todos unidos por el deseo de superarse y aprender juntos. Ese sentido de colectividad convierte a los compañeros de baile en amigos entrañables."
        ]
      },
      {
        subtitulo: "Rumba Aeróbica: La Puerta de Entrada",
        parrafos: [
          "Para quienes desean iniciarse de manera flexible, nuestras sesiones de Rumba Aeróbica de lunes a jueves a las 7:00 p. m. con tarifa de $4.000 COP por clase son la oportunidad perfecta para integrarse sin ataduras de mensualidades ni contratos."
        ]
      }
    ],
    galeria: {
      id: "momentos-comunidad",
      eyebrow: "ENCUENTROS Y CELEBRACIONES",
      titulo: "Momentos de nuestra comunidad",
      descripcion:
        "Celebraciones, opiniones y experiencias compartidas dentro y fuera del salón.",
      items: [
        {
          id: "comunidad-amor-amistad",
          tipo: "video",
          url: R2_BASE_URL + "/amor%20y%20amistad.mp4",
          ariaLabel: "Celebración de Amor y Amistad en PSR",
          badge: "Celebraciones",
          tipoBadge: "psr-badge-cyan",
          titulo: "Amor y Amistad en PSR"
        },
        {
          id: "comunidad-opiniones",
          tipo: "video",
          url: R2_BASE_URL + "/opinion-personas-academia.mp4",
          ariaLabel: "Opiniones de personas de la academia",
          badge: "Voces PSR",
          tipoBadge: "",
          titulo: "La experiencia de nuestra comunidad"
        },
        {
          id: "comunidad-comparsa",
          tipo: "video",
          url: R2_BASE_URL + "/video-comparsa-nueva--opiniones-personas.mp4",
          ariaLabel: "Comparsa nueva y opiniones del público",
          badge: "Comparsa",
          tipoBadge: "psr-badge-orange",
          titulo: "Una comparsa para celebrar"
        },
        {
          id: "comunidad-foto-taller",
          tipo: "imagen",
          url: R2_BASE_URL + "/foto-talleres-2025.PNG",
          alt: "Participantes de los talleres de PSR en 2025",
          badge: "Talleres",
          tipoBadge: "",
          titulo: "Aprendizaje compartido en 2025",
          ruta: "/talleres#galeria-talleres",
          textoEnlace: "Ver la galería de talleres"
        },
        {
          id: "comunidad-taller-grupal",
          tipo: "video",
          url: R2_BASE_URL + "/video-grupal-taller-studio110-dance-2025.mp4",
          ariaLabel: "Taller grupal de Studio 110 Dance en 2025",
          badge: "Talleres",
          tipoBadge: "psr-badge-orange",
          titulo: "Taller grupal · Studio 110 Dance",
          ruta: "/talleres#galeria-talleres",
          textoEnlace: "Ver en la sección Talleres"
        },
        {
          id: "comunidad-taller-solo",
          tipo: "video",
          url: R2_BASE_URL + "/video-solo-taller-studio110dance-2025.mp4",
          ariaLabel: "Presentación individual del taller Studio 110 Dance en 2025",
          badge: "Talleres",
          tipoBadge: "psr-badge-cyan",
          titulo: "Muestra individual · Studio 110 Dance",
          ruta: "/talleres#galeria-talleres",
          textoEnlace: "Ver en la sección Talleres"
        }
      ]
    },
    cita: "Llegar a la academia después de un día difícil y escuchar la percusión es recargar la vida de energía. PSR es mi segundo hogar en Sincelejo.",
    ctaTitulo: "Ven y prueba una clase de Rumba Aeróbica",
    ctaDescripcion:
      "De lunes a jueves, 7:00 p. m. a 8:00 p. m. en la Calle 20 #25-39, Centro.",
    ctaTexto: "Ver horarios de rumba aeróbica",
    ctaRuta: "/rumba-aerobica"
  },
  {
    slug: "presentaciones",
    categoria: "Presentaciones",
    tipoBadge: "",
    fechaIso: "2026-09-15",
    fechaTexto: "15 de septiembre de 2026",
    titulo: "Nuestra Participación en la Muestra Coreográfica Regional",
    resumen:
      "El elenco de la academia representó a PSR con montajes de salsa y ritmos afroantillanos. Conoce los detalles de la puesta en escena y la preparación de los alumnos.",
    subtitulo:
      "El elenco mayor y juvenil de PSR deslumbró al público con un montaje de salsa en línea y ritmos caribeños en el principal escenario cultural de Sucre.",
    imagen: "/img/festival-1.jpeg",
    alt: "Bailarines de PSR en plena presentación escénica en el festival",
    pieImagen:
      "Puesta en escena del ensamble representativo de la Escuela de Baile PSR.",
    textoEnlace: "Ver reseña y galería",
    introduccion:
      "El pasado fin de semana, más de 25 bailarines de nuestra escuela subieron al escenario para representar el trabajo formativo y la pasión que caracteriza a PSR. La muestra congregó a las principales agrupaciones dancísticas del departamento, destacando el nivel técnico y la sincronía de nuestro elenco.",
    secciones: [
      {
        subtitulo: "Un Montaje Fruto de Meses de Ensayo",
        parrafos: [
          "La coreografía presentada fusionó la velocidad y precisión de la salsa en línea con la alegría y espontaneidad de los ritmos afroantillanos. Bajo la dirección de nuestros maestros coreógrafos, los bailarines demostraron disciplina postural, manejo de figuras en pareja y una presencia escénica arrolladora que puso de pie al auditorio."
        ]
      },
      {
        subtitulo: "Shows Profesionales para Todo Tipo de Eventos",
        parrafos: [
          "Además de las competencias y festivales culturales, nuestro elenco está disponible para contrataciones en eventos corporativos, matrimonios, quinceañeros, celebraciones familiares y eventos especiales, llevando espectáculos de alta calidad con vestuarios vistosos."
        ]
      }
    ],
    galeria: {
      id: "galeria-presentaciones",
      eyebrow: "GALERÍA PSR",
      titulo: "Competencias y montajes en escena",
      descripcion:
        "Registros de nuestras participaciones, parejas y propuestas coreográficas.",
      items: [
        {
          id: "pres-chile-1",
          esFigura: true,
          url: R2_BASE_URL + "/competicion-chile-vi%C3%B1a-del-mar.PNG",
          alt: "Competición de PSR en Viña del Mar, Chile",
          descripcion: "PSR en competencia en Viña del Mar, Chile."
        },
        {
          id: "pres-chile-2",
          esFigura: true,
          url: R2_BASE_URL + "/competicion-chile-vi%C3%B1a-del-mar-2.PNG",
          alt: "Segunda imagen de la competición de PSR en Viña del Mar, Chile",
          descripcion: "Otra mirada a la experiencia competitiva de PSR en Chile."
        },
        {
          id: "pres-arrollando-2024",
          tipo: "video",
          url: R2_BASE_URL + "/arrollando/arrollandodance-2024-yeison.mp4",
          ariaLabel: "Presentación Arrollando Dance 2024",
          badge: "Arrollando Dance",
          tipoBadge: "",
          titulo: "Presentación 2024"
        },
        {
          id: "pres-javier-sofia",
          tipo: "video",
          url:
            R2_BASE_URL +
            "/arrollando/presentacion-javier-y-sofia-subcampeon-nacional-salsa-cabaret-adulto-amateur-2025.mp4",
          ariaLabel:
            "Javier y Sofía, subcampeones nacionales de salsa cabaret 2025",
          badge: "Adulto amateur",
          tipoBadge: "psr-badge-orange",
          titulo: "Javier y Sofía · Subcampeones nacionales 2025",
          ruta: "/contratar#muestras-shows",
          textoEnlace: "Ver muestras de shows"
        },
        {
          id: "pres-juan-mariapaz",
          tipo: "video",
          url:
            R2_BASE_URL +
            "/arrollando/presentacion-juan-y-maria-paz-subcampeon-nacional-salsa-cabaret-juvenil-principiante-2025.mp4",
          ariaLabel:
            "Juan y María Paz, subcampeones nacionales juveniles de salsa cabaret 2025",
          badge: "Juvenil principiante",
          tipoBadge: "psr-badge-orange",
          titulo: "Juan y María Paz · Subcampeones nacionales 2025"
        },
        {
          id: "pres-yeison-bertha",
          tipo: "video",
          url:
            R2_BASE_URL +
            "/arrollando/presentacion-yeison-y-bertha-campeon-nacional-salsa-cabaret-adulto-amateur-2025.mp4",
          ariaLabel:
            "Yeison y Bertha, campeones nacionales de salsa cabaret 2025",
          badge: "Adulto amateur",
          tipoBadge: "",
          titulo: "Yeison y Bertha · Campeones nacionales 2025",
          ruta: "/contratar#muestras-shows",
          textoEnlace: "Ver muestras de shows"
        },
        {
          id: "pres-urban-latin",
          tipo: "video",
          url: R2_BASE_URL + "/presentacion-urban-latin-dance.mp4",
          ariaLabel: "Presentación Urban Latin Dance de PSR",
          badge: "Montaje grupal",
          tipoBadge: "psr-badge-cyan",
          titulo: "Urban Latin Dance",
          ruta: "/contratar#muestras-shows",
          textoEnlace: "Ver muestras de shows"
        }
      ]
    },
    cita: "Ver a jóvenes que llegaron sin saber marcar un paso básico hoy adueñarse del escenario con tanta seguridad es la mayor recompensa a nuestros 16 años de labor docente.",
    ctaTitulo: "¿Deseas contratar un show de baile para tu evento?",
    ctaDescripcion:
      "Diseñamos presentaciones coreográficas a la medida de tu celebración.",
    ctaTexto: "Cotizar show para evento",
    ctaRuta: "/contratar"
  }
];
