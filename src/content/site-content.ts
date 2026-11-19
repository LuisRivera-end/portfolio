import type {
  GalleryItem,
  Locale,
  ProjectCover,
  ProjectEntry,
  ProjectIcon,
  ProjectImage,
  ProjectStatus,
  SiteDictionary,
} from "@/types/portfolio"

const email = "leliezerrivera@gmail.com"
const githubUrl = "https://github.com/LuisRivera-end"
const linkedinUrl = "https://www.linkedin.com/in/luis-rivera-dev/"
const facsaUrl = "https://facsa.ujed.mx/"
const openfyRepoUrl = "https://github.com/LuisRivera-end/openfy"
const openfyReleasesUrl = "https://github.com/LuisRivera-end/openfy/releases"
const openfyLandingUrl = "https://luisrivera-end.github.io/openfy/"
const bloomwishUrl = "https://fur1us.pythonanywhere.com/"
const estacionamientoRepoUrl =
  "https://github.com/LuisRivera-end/Estacionamiento-Arduino"
const integracionRepoUrl =
  "https://github.com/LuisRivera-end/Proyecto-Integracion/tree/prod1"

export const cvFileNames: Record<Locale, string> = {
  es: "cv-luis-eliezer-rivera-gamez.pdf",
  en: "cv-luis-eliezer-rivera-gamez-en.pdf",
}

const img = (name: string, width: number, height: number): ProjectImage => ({
  image: `projects/${name}.webp`,
  width,
  height,
})

/**
 * Locale-independent project data: links, media, status and stack.
 * Copy lives in the per-locale entries below and is merged by slug.
 */
interface ProjectBase {
  slug: string
  title: string
  icon: ProjectIcon
  status: ProjectStatus[]
  stack: string[]
  repositoryUrl?: string
  liveUrl?: string
  releaseUrl?: string
  cover: Omit<ProjectCover, "label"> & { label: string }
  galleryImages: ProjectImage[]
}

const projectBases: ProjectBase[] = [
  {
    slug: "facsa",
    title: "FACSA",
    icon: "facsa",
    status: ["live", "institutional", "private"],
    liveUrl: facsaUrl,
    stack: [
      "Nuxt 3",
      "Vue 3",
      "Pinia",
      "Tailwind CSS",
      "Express 5",
      "MariaDB",
      "JWT",
      "RBAC",
      "TipTap",
      "Docker",
      "Vitest",
      "Playwright",
    ],
    cover: {
      ...img("facsa-public", 1440, 900),
      label: "facsa.ujed.mx",
      phone: img("facsa-mobile", 390, 844),
    },
    galleryImages: [
      img("facsa-public", 1440, 900),
      img("facsa-admin", 1280, 800),
      img("facsa-admissions", 1264, 649),
      img("facsa-mobile", 390, 844),
    ],
  },
  {
    slug: "openfy",
    title: "Openfy",
    icon: "openfy",
    status: ["live", "publicRepo", "personal"],
    liveUrl: openfyLandingUrl,
    repositoryUrl: openfyRepoUrl,
    releaseUrl: openfyReleasesUrl,
    stack: [
      "Nuxt 4",
      "Nitro",
      "SQLite",
      "Drizzle",
      ".NET 10 · WinUI 3",
      "Kotlin · Compose",
      "FFmpeg",
      "Service Worker",
      "Vitest",
      "Playwright",
    ],
    cover: {
      ...img("openfy-library", 1440, 900),
      label: "openfy · localhost",
      phone: img("openfy-mobile-player", 390, 844),
    },
    galleryImages: [
      img("openfy-library", 1440, 900),
      img("openfy-album", 1440, 900),
      img("openfy-player", 1440, 900),
      img("openfy-mobile-library", 390, 844),
      img("openfy-mobile-player", 390, 844),
    ],
  },
  {
    slug: "viczy",
    title: "VICZY",
    icon: "viczy",
    status: ["private", "academic"],
    stack: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Next.js 14",
      "Three.js · R3F",
      "TypeScript",
      "Swagger",
      "Docker Compose",
    ],
    cover: {
      ...img("viczy-home", 1440, 900),
      label: "viczy · demo local",
      phone: img("viczy-mobile", 390, 844),
    },
    galleryImages: [
      img("viczy-home", 1440, 900),
      img("viczy-shop", 1440, 900),
      img("viczy-product", 1440, 900),
      img("viczy-avatar", 1440, 900),
    ],
  },
  {
    slug: "turnos",
    title: "Turnos UAL",
    icon: "turnos",
    status: ["publicRepo", "academic"],
    repositoryUrl: integracionRepoUrl,
    stack: [
      "FastAPI",
      "Nuxt 3",
      "MariaDB",
      "WebSockets",
      "SQLAlchemy",
      "Nginx",
      "Docker Compose",
      "Node.js",
      "pytest",
    ],
    cover: {
      ...img("turnos-queue", 1280, 800),
      label: "turnos · demo",
    },
    galleryImages: [
      img("turnos-queue", 1280, 800),
      img("turnos-ticket", 1264, 649),
      img("turnos-operator", 1280, 800),
    ],
  },
  {
    slug: "estacionamiento",
    title: "Estacionamiento",
    icon: "estacionamiento",
    status: ["publicRepo", "academic"],
    repositoryUrl: estacionamientoRepoUrl,
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Alembic",
      "Supabase Auth",
      "Next.js 16",
      "Chakra UI",
      "Arduino",
      "Docker Compose",
    ],
    cover: {
      ...img("estacionamiento-dashboard", 1280, 800),
      label: "estacionamiento · demo",
    },
    galleryImages: [
      img("estacionamiento-dashboard", 1280, 800),
      img("estacionamiento-monitor", 1264, 649),
      img("estacionamiento-circuit", 1600, 912),
    ],
  },
  {
    slug: "bloomwish",
    title: "Bloomwish",
    icon: "bloomwish",
    status: ["live", "academic"],
    liveUrl: bloomwishUrl,
    stack: [
      "Flask",
      "Python",
      "SQLite",
      "Jinja",
      "Tailwind CSS",
      "GSAP",
      "Lenis",
      "unittest",
    ],
    cover: {
      ...img("bloomwish-home", 1440, 900),
      label: "fur1us.pythonanywhere.com",
      phone: img("bloomwish-mobile", 390, 844),
    },
    galleryImages: [
      img("bloomwish-home", 1440, 900),
      img("bloomwish-menu", 1440, 900),
      img("bloomwish-product", 1440, 900),
      img("bloomwish-customizer", 1440, 900),
      img("bloomwish-cart", 1440, 900),
      img("bloomwish-mobile", 390, 844),
      img("bloomwish-mobile-menu", 390, 844),
    ],
  },
]

type ProjectCopy = Omit<
  ProjectEntry,
  | "slug"
  | "title"
  | "icon"
  | "status"
  | "stack"
  | "repositoryUrl"
  | "liveUrl"
  | "releaseUrl"
  | "cover"
  | "gallery"
> & {
  /** One [title, description] pair per gallery image, in the same order. */
  gallery: [string, string][]
}

function buildProjects(copy: Record<string, ProjectCopy>): ProjectEntry[] {
  return projectBases.map((base) => {
    const text = copy[base.slug]
    if (!text) {
      throw new Error(`Missing copy for project "${base.slug}"`)
    }
    if (text.gallery.length !== base.galleryImages.length) {
      throw new Error(`Gallery copy mismatch for project "${base.slug}"`)
    }
    const gallery: GalleryItem[] = base.galleryImages.map((image, index) => ({
      ...image,
      title: text.gallery[index][0],
      description: text.gallery[index][1],
    }))
    const { galleryImages: _galleryImages, ...rest } = base
    void _galleryImages
    return { ...rest, ...text, gallery }
  })
}

const esProjects = buildProjects({
  facsa: {
    summary:
      "Portal institucional en producción y panel administrativo para la Facultad de Ciencias de la Salud de la UJED: más de 60 páginas públicas, API propia y publicación sin ayuda técnica.",
    featuredSummary:
      "Portal en producción con más de 60 páginas, API en Express con RBAC y un panel con editor, revisiones y respaldos.",
    role: "Desarrollador principal full stack",
    period: "2026 – Actualidad",
    team: "Desarrollador principal · 467 de 473 commits",
    type: "Portal institucional",
    year: "2026",
    repoNote: "Repositorio privado",
    highlights: [
      "Más de 60 páginas públicas en Nuxt, Pinia y Tailwind CSS para oferta educativa, admisiones, investigación y congresos.",
      "Backend en Express y MariaDB con más de 30 controladores REST, autenticación JWT/bcrypt, RBAC y bitácora de auditoría.",
      "Panel administrativo con editor enriquecido (TipTap), historial y papelera de revisiones, gestión de medios y respaldos programados.",
      "Más de 300 archivos de pruebas (Vitest, Supertest, Playwright) y despliegue con Docker con migraciones y plan de reversión.",
    ],
    challenge:
      "La facultad necesitaba un portal moderno y seguro para comunicar información institucional, publicar avisos y abrir servicios clave al público, con un equipo administrativo capaz de actualizarlo sin depender de un desarrollador.",
    solution:
      "Diseñé y construí la plataforma completa: frontend público en Nuxt, API en Express sobre MariaDB y un panel con permisos por rol. El contenido se edita con un editor enriquecido que guarda revisiones, y cada cambio queda registrado en la bitácora de auditoría.",
    impact:
      "El portal está en producción en facsa.ujed.mx. El personal publica noticias, convocatorias y galerías por su cuenta, y la base de pruebas automatizadas permite seguir creciendo sin romper lo que ya funciona.",
    architecture: [
      {
        title: "Nuxt 3",
        subtitle: "Frontend público",
        detail: "Más de 60 páginas con Pinia, Tailwind CSS y renderizado del lado del servidor.",
      },
      {
        title: "Express 5",
        subtitle: "API",
        detail: "Más de 30 controladores REST, JWT/bcrypt y recuperación de credenciales.",
      },
      {
        title: "MariaDB",
        subtitle: "Datos",
        detail: "Contenido, usuarios, permisos, revisiones y bitácora de auditoría.",
      },
      {
        title: "RBAC + TipTap",
        subtitle: "Panel administrativo",
        detail: "Roles, editor enriquecido, papelera, medios y respaldos programados.",
      },
      {
        title: "Calidad + Docker",
        subtitle: "Entrega",
        detail: "Vitest, Supertest y Playwright; despliegue en contenedores con migraciones.",
      },
    ],
    impactMetrics: [
      {
        label: "Páginas públicas",
        value: "60+",
        detail: "Oferta educativa, admisiones, investigación y congresos.",
      },
      {
        label: "Controladores REST",
        value: "30+",
        detail: "API propia con autenticación y control de acceso por roles.",
      },
      {
        label: "Archivos de pruebas",
        value: "300+",
        detail: "Pruebas unitarias, de API y de extremo a extremo.",
      },
    ],
    gallery: [
      [
        "Portal institucional",
        "Página de inicio del sitio en producción en facsa.ujed.mx.",
      ],
      [
        "Panel administrativo (demo)",
        "Panel real en estado demo, con métricas, módulos y accesos por rol.",
      ],
      [
        "Admisiones",
        "Página pública con requisitos, fichas y acceso al proceso de ingreso.",
      ],
      [
        "Vista móvil",
        "El mismo portal en un teléfono, con navegación adaptada.",
      ],
    ],
  },
  openfy: {
    summary:
      "Biblioteca musical personal con cuatro clientes sobre una misma colección: servidor Nuxt/Nitro con SQLite, PWA instalable en iPhone, app nativa de Windows (WinUI 3) y app Android (Jetpack Compose).",
    featuredSummary:
      "Mi propia alternativa a un servicio de streaming: un servidor y cuatro clientes, con descargas sin conexión, letras sincronizadas y conversión de audio.",
    role: "Autor · desarrollo de punta a punta",
    period: "2026",
    team: "Proyecto personal open source",
    type: "Biblioteca musical multiplataforma",
    year: "2026",
    repoNote: "Repositorio público",
    platforms: ["Windows", "Android", "iPhone (PWA)", "Web"],
    highlights: [
      "Importación con lectura de metadatos y deduplicación por SHA-256; conversión de FLAC a AAC en cola con FFmpeg.",
      "Streaming con rangos HTTP, búsqueda en YouTube Music y letras sincronizadas.",
      "Descargas sin conexión verificadas por SHA-256 mediante service worker, con estadísticas de escucha y recomendaciones.",
      "App de Windows con instalador y auto-actualización; más de 80 archivos de pruebas y CI que protege la rama principal.",
    ],
    challenge:
      "Quería escuchar mi propia colección en la computadora, el teléfono y el iPhone con la experiencia de un servicio comercial, pero sin depender de uno: misma biblioteca, mismas listas y modo sin conexión en todos los dispositivos.",
    solution:
      "Construí un servidor Nuxt/Nitro con SQLite y Drizzle que administra la biblioteca, y cuatro clientes encima: una PWA instalable, una app nativa de Windows en WinUI 3 y una app Android en Kotlin con Compose que se sincroniza con la PC.",
    impact:
      "Openfy es el proyecto que uso a diario y el más ambicioso técnicamente: abarca web, escritorio nativo y móvil, con publicaciones versionadas (v0.5.4) y pruebas automatizadas en cada cambio.",
    architecture: [
      {
        title: "Nuxt 4 + Nitro",
        subtitle: "Servidor",
        detail: "API, streaming con rangos HTTP e importación de archivos.",
      },
      {
        title: "SQLite + Drizzle",
        subtitle: "Datos",
        detail: "Biblioteca, listas, estadísticas de escucha y letras.",
      },
      {
        title: "FFmpeg",
        subtitle: "Procesamiento",
        detail: "Cola de conversión FLAC → AAC y deduplicación por SHA-256.",
      },
      {
        title: "WinUI 3 · Compose · PWA",
        subtitle: "Clientes",
        detail: "Windows nativo, Android nativo y PWA sin conexión para iPhone.",
      },
    ],
    impactMetrics: [
      {
        label: "Clientes",
        value: "4",
        detail: "Servidor, Windows, Android y PWA sobre una misma biblioteca.",
      },
      {
        label: "Archivos de pruebas",
        value: "80+",
        detail: "Vitest y Playwright, con CI en la rama principal.",
      },
      {
        label: "Versión",
        value: "v0.5.4",
        detail: "Publicaciones versionadas con auto-actualización en Windows.",
      },
    ],
    gallery: [
      [
        "Biblioteca",
        "Vista de álbumes con portadas generadas para la demo (datos de prueba).",
      ],
      [
        "Álbum en reproducción",
        "Detalle de álbum con la barra de reproducción activa.",
      ],
      [
        "Reproductor ampliado",
        "Modo inmersivo con el color de la portada como fondo.",
      ],
      [
        "Biblioteca en el teléfono",
        "La PWA en un iPhone, con navegación inferior y mini reproductor.",
      ],
      [
        "Reproductor móvil",
        "Reproductor a pantalla completa de la PWA.",
      ],
    ],
  },
  viczy: {
    summary:
      "Plataforma de e-commerce de moda construida como monolito modular, con persistencia híbrida (PostgreSQL, MongoDB y Redis), motor de recomendaciones explicable y probador virtual 3D.",
    featuredSummary:
      "E-commerce de moda con tres bases de datos, recomendaciones explicables, motor de conjuntos por color y probador 3D en el navegador.",
    role: "Líder técnico · full stack",
    period: "2026",
    team: "3 personas · 19 de 28 commits",
    type: "E-commerce de moda",
    year: "2026",
    repoNote: "Repositorio privado",
    highlights: [
      "Monolito modular en NestJS y Prisma: PostgreSQL para transacciones, MongoDB para telemetría y Redis para caché.",
      "Recomendaciones explicables (patrón Strategy) con perfiles de afinidad que decaen con el tiempo.",
      "Motor de conjuntos con reglas de color en OKLCH y probador virtual 3D con avatares paramétricos (Three.js / React Three Fiber).",
      "Proceso de compra idempotente, límites de peticiones, puntos y niveles de lealtad. El pago es simulado.",
    ],
    challenge:
      "Diseñar una tienda de moda que fuera más allá del catálogo: recomendar prendas que combinen, explicar por qué y dejar que la persona las vea en un avatar antes de comprar.",
    solution:
      "Separé el sistema en módulos de NestJS con tres almacenes según el tipo de dato: transacciones en PostgreSQL, eventos de comportamiento en MongoDB y caché en Redis. El frontend en Next.js muestra las recomendaciones con su explicación y un probador 3D.",
    impact:
      "Es el proyecto donde más trabajé la arquitectura de backend: idempotencia, consistencia de inventario y una capa de recomendaciones que se puede auditar.",
    architecture: [
      {
        title: "NestJS + Prisma",
        subtitle: "Monolito modular",
        detail: "Auth, catálogo, inventario, pedidos, lealtad y recomendaciones.",
      },
      {
        title: "PostgreSQL",
        subtitle: "Transacciones",
        detail: "Usuarios, variantes, stock, carrito y pedidos.",
      },
      {
        title: "MongoDB + Redis",
        subtitle: "Comportamiento y caché",
        detail: "Eventos de interacción, perfiles de afinidad y catálogo en caché.",
      },
      {
        title: "Next.js 14 + R3F",
        subtitle: "Frontend",
        detail: "Tienda editorial, recomendaciones explicadas y probador 3D.",
      },
    ],
    impactMetrics: [
      {
        label: "Bases de datos",
        value: "3",
        detail: "Cada tipo de dato en el almacén que mejor le sirve.",
      },
      {
        label: "Recomendaciones",
        value: "Explicables",
        detail: "Cada sugerencia muestra la razón que la produjo.",
      },
      {
        label: "Probador",
        value: "3D",
        detail: "Avatares paramétricos renderizados en el navegador.",
      },
    ],
    gallery: [
      ["Inicio", "Portada editorial con la tarjeta de miembro, puntos y nivel de lealtad (datos de demostración)."],
      ["Catálogo", "Listado de prendas con filtros por categoría y paleta de color."],
      ["Detalle de prenda", "Ficha con variantes de talla, stock y puntos que otorga la compra."],
      ["Armador de conjuntos y probador 3D", "Maniquí 3D con Three.js y puntuación de armonía del look explicada."],
    ],
  },
  turnos: {
    summary:
      "Sistema de turnos y tickets para la Universidad Autónoma de La Laguna (UAL): generación de tickets, pantalla pública con anuncio por voz y panel de ventanilla sincronizados en tiempo real.",
    featuredSummary:
      "Turnos en tiempo real con WebSockets, anuncio por voz e impresión en tickets POS, desarrollado con un equipo de 5 personas.",
    role: "Líder técnico · full stack",
    period: "2025 – 2026",
    team: "5 personas · 55+ pull requests integrados",
    type: "Sistema de turnos",
    year: "2026",
    repoNote: "Repositorio público",
    highlights: [
      "Pantalla pública, generación de tickets y panel de ventanilla sincronizados con WebSockets.",
      "API asíncrona en FastAPI y MariaDB con autenticación, gestión de empleados y ventanillas, panel de control y reportes PDF.",
      "Servicio de impresión en Node.js compilado a ejecutable de Windows para impresoras térmicas POS.",
      "Pruebas con pytest y despliegue con Docker Compose detrás de Nginx con HTTPS.",
    ],
    challenge:
      "La universidad necesitaba ordenar la atención en ventanillas: que cada persona tuviera un turno, que la pantalla anunciara a quién le toca y que el personal pudiera llamar, completar y supervisar turnos sin perder el hilo.",
    solution:
      "Coordiné a un equipo de 5 personas y construimos una API asíncrona en FastAPI, un frontend en Nuxt y comunicación en tiempo real con WebSockets. Agregué un servicio de impresión para tickets físicos y anuncios por voz en la pantalla pública.",
    impact:
      "El sistema cubre el flujo completo de atención, del ticket impreso al cierre en ventanilla, y fue mi primera experiencia liderando integración, revisiones y despliegue de un equipo.",
    architecture: [
      {
        title: "Nuxt 3",
        subtitle: "Frontend",
        detail: "Kiosco de tickets, pantalla pública y panel de ventanilla.",
      },
      {
        title: "FastAPI + MariaDB",
        subtitle: "API asíncrona",
        detail: "Autenticación, ventanillas, panel de control y reportes PDF.",
      },
      {
        title: "WebSockets",
        subtitle: "Tiempo real",
        detail: "Cada llamada se refleja al instante en todas las pantallas.",
      },
      {
        title: "Impresión POS + Nginx",
        subtitle: "Operación",
        detail: "Servicio .exe para impresoras térmicas; HTTPS con Docker Compose.",
      },
    ],
    impactMetrics: [
      {
        label: "Equipo",
        value: "5",
        detail: "Personas coordinadas con ramas, revisiones e integración.",
      },
      {
        label: "Pull requests",
        value: "55+",
        detail: "Integrados en la rama de producción.",
      },
      {
        label: "Sincronización",
        value: "Tiempo real",
        detail: "Pantallas y ventanillas conectadas por WebSockets.",
      },
    ],
    gallery: [
      [
        "Monitor de cola (demo)",
        "Pantalla pública con turnos, sectores, ventanillas y tiempos de espera.",
      ],
      [
        "Generación de ticket",
        "Kiosco para elegir un departamento y generar un turno de atención.",
      ],
      [
        "Panel de ventanilla (demo)",
        "Flujo para llamar, completar y supervisar turnos.",
      ],
    ],
  },
  estacionamiento: {
    summary:
      "Estacionamiento inteligente con unidades Arduino en entrada y salida, un puente serial→HTTP y una API en FastAPI que alimenta el cobro de boletos y un panel operativo en Next.js.",
    featuredSummary:
      "IoT de punta a punta: Arduino en los accesos, API en FastAPI con tareas programadas y un panel operativo en Next.js.",
    role: "Desarrollador full stack + hardware",
    period: "2026",
    team: "Proyecto académico",
    type: "IoT + web",
    year: "2026",
    repoNote: "Repositorio público",
    highlights: [
      "Unidades Arduino con sensores IR, servomotores, LCD y teclado matricial en entrada y salida.",
      "Puente serial→HTTP que convierte los eventos físicos en llamadas a la API.",
      "API en FastAPI con migraciones Alembic sobre PostgreSQL y un proceso programado que vence boletos.",
      "Consulta y pago simulado de boletos con descuentos, y panel operativo con autenticación de Supabase.",
    ],
    challenge:
      "Conectar el mundo físico, sensores y barreras en los accesos, con una aplicación web donde se puedan consultar boletos, cobrar y ver la ocupación del día.",
    solution:
      "Dividí el sistema en capas: firmware en Arduino, un puente que traduce eventos seriales a HTTP, una API en FastAPI con tareas programadas y un frontend en Next.js con Chakra UI, todo orquestado con Docker Compose.",
    impact:
      "Fue el proyecto donde integré hardware y software de punta a punta, con un flujo completo desde que entra el auto hasta que se paga el boleto.",
    architecture: [
      {
        title: "Arduino C++",
        subtitle: "Accesos",
        detail: "Sensores IR, servomotores, LCD y teclado en entrada y salida.",
      },
      {
        title: "Puente serial → HTTP",
        subtitle: "Integración",
        detail: "Convierte eventos del hardware en llamadas a la API.",
      },
      {
        title: "FastAPI + PostgreSQL",
        subtitle: "Backend",
        detail: "Boletos, pagos, migraciones con Alembic y vencimiento programado.",
      },
      {
        title: "Next.js 16 + Chakra UI",
        subtitle: "Frontend",
        detail: "Consulta y pago de boletos, y panel con Supabase Auth.",
      },
    ],
    impactMetrics: [
      {
        label: "Capas",
        value: "4",
        detail: "Firmware, puente, API y frontend.",
      },
      {
        label: "Commits",
        value: "90+",
        detail: "Historial público en GitHub.",
      },
      {
        label: "Dominio",
        value: "IoT",
        detail: "Hardware y software en un mismo flujo.",
      },
    ],
    gallery: [
      [
        "Panel operativo",
        "Ocupación, boletos e indicadores del día con datos de prueba.",
      ],
      [
        "Consulta y pago de ticket",
        "Flujo público para consultar un boleto e iniciar el pago.",
      ],
      [
        "Circuitos de entrada y salida",
        "Diagrama de ambos accesos con Arduino UNO, LCD, sensores IR, servomotores y teclado matricial.",
      ],
    ],
  },
  bloomwish: {
    summary:
      "Tienda en línea de una cafetería, publicada en PythonAnywhere: menú con búsqueda y filtros, personalización de productos, carrito y seguimiento de pedidos, sobre un backend en Flask.",
    featuredSummary:
      "Tienda en línea publicada, con personalización de productos, carrito y precios calculados en el servidor, animada con GSAP y Lenis.",
    role: "Desarrollador full stack",
    period: "2026",
    team: "Proyecto académico",
    type: "Tienda en línea",
    year: "2026",
    repoNote: "Repositorio privado",
    highlights: [
      "Menú con búsqueda, filtros por categoría y productos agotados que se desactivan solos.",
      "Personalización de productos con toppings y carrito persistente con resumen de pedido.",
      "Precios calculados en el servidor en centavos, stock ligado a recetas y pedidos idempotentes.",
      "Migraciones versionadas de SQLite, 94 pruebas con unittest e interfaz animada con GSAP y Lenis.",
    ],
    challenge:
      "Crear una tienda en línea con personalidad para una cafetería, que se sintiera viva en el teléfono y que no permitiera errores en precios ni inventario.",
    solution:
      "Construí la tienda en Flask con plantillas Jinja y Tailwind CSS. Los precios y el stock se resuelven en el servidor dentro de transacciones, y la interfaz usa GSAP y Lenis para darle movimiento sin sacrificar rendimiento.",
    impact:
      "La tienda está publicada y se puede visitar. Combina una identidad visual llamativa con reglas de negocio cuidadas en el backend.",
    architecture: [
      {
        title: "Flask + Jinja",
        subtitle: "Aplicación",
        detail: "Rutas públicas, plantillas y API del carrito.",
      },
      {
        title: "SQLite",
        subtitle: "Datos",
        detail: "Catálogo, recetas, stock y pedidos con migraciones versionadas.",
      },
      {
        title: "Reglas de negocio",
        subtitle: "Servidor",
        detail: "Precios en centavos, cupones e idempotencia en pedidos.",
      },
      {
        title: "Tailwind CSS + GSAP",
        subtitle: "Interfaz",
        detail: "Diseño llamativo con animaciones y desplazamiento suave.",
      },
    ],
    impactMetrics: [
      {
        label: "Estado",
        value: "En línea",
        detail: "Publicada en PythonAnywhere.",
      },
      {
        label: "Pruebas",
        value: "94",
        detail: "Casos con unittest para precios, stock y pedidos.",
      },
      {
        label: "Productos",
        value: "12",
        detail: "Menú real con categorías y personalización.",
      },
    ],
    gallery: [
      ["Inicio", "Portada con carrusel de productos destacados."],
      ["Menú", "Catálogo con búsqueda y filtros por categoría."],
      ["Producto", "Ficha con descripción, alérgenos y personalización."],
      ["Personalizar", "Selección de toppings antes de agregar al pedido."],
      ["Carrito", "Resumen del pedido con totales calculados."],
      ["Inicio en el teléfono", "La portada adaptada a pantallas pequeñas."],
      ["Menú en el teléfono", "Tarjetas de producto a una columna."],
    ],
  },
})

const enProjects = buildProjects({
  facsa: {
    summary:
      "Production institutional portal and admin panel for the Faculty of Health Sciences at UJED: 60+ public pages, its own API, and publishing without technical help.",
    featuredSummary:
      "Production portal with 60+ pages, an Express API with RBAC, and an admin panel with an editor, revisions and backups.",
    role: "Lead full stack developer",
    period: "2026 – Present",
    team: "Lead developer · 467 of 473 commits",
    type: "Institutional portal",
    year: "2026",
    repoNote: "Private repository",
    highlights: [
      "60+ public pages built with Nuxt, Pinia and Tailwind CSS covering programs, admissions, research and conferences.",
      "Express and MariaDB backend with 30+ REST controllers, JWT/bcrypt authentication, RBAC and audit logging.",
      "Admin panel with a rich-text editor (TipTap), revision history and trash, media management and scheduled backups.",
      "300+ test files (Vitest, Supertest, Playwright) and Docker deployment with schema migrations and rollback plans.",
    ],
    challenge:
      "The faculty needed a modern, secure portal to share institutional information, publish announcements and open key services to the public, with administrative staff able to update it without relying on a developer.",
    solution:
      "I designed and built the whole platform: a public Nuxt frontend, an Express API on MariaDB and an admin panel with role-based permissions. Content is edited in a rich-text editor that keeps revisions, and every change is recorded in the audit log.",
    impact:
      "The portal is live at facsa.ujed.mx. Staff publish news, calls and galleries on their own, and the automated test suite lets the product keep growing without breaking what already works.",
    architecture: [
      {
        title: "Nuxt 3",
        subtitle: "Public frontend",
        detail: "60+ pages with Pinia, Tailwind CSS and server-side rendering.",
      },
      {
        title: "Express 5",
        subtitle: "API",
        detail: "30+ REST controllers, JWT/bcrypt and credential recovery.",
      },
      {
        title: "MariaDB",
        subtitle: "Data",
        detail: "Content, users, permissions, revisions and audit log.",
      },
      {
        title: "RBAC + TipTap",
        subtitle: "Admin panel",
        detail: "Roles, rich-text editor, trash, media and scheduled backups.",
      },
      {
        title: "Quality + Docker",
        subtitle: "Delivery",
        detail: "Vitest, Supertest and Playwright; containerized deployment with migrations.",
      },
    ],
    impactMetrics: [
      {
        label: "Public pages",
        value: "60+",
        detail: "Programs, admissions, research and conferences.",
      },
      {
        label: "REST controllers",
        value: "30+",
        detail: "Its own API with authentication and role-based access.",
      },
      {
        label: "Test files",
        value: "300+",
        detail: "Unit, API and end-to-end tests.",
      },
    ],
    gallery: [
      [
        "Institutional portal",
        "Home page of the production site at facsa.ujed.mx.",
      ],
      [
        "Admin panel (demo)",
        "The real dashboard in a demo state, with metrics, modules and role-based access.",
      ],
      [
        "Admissions",
        "Public page with requirements, application slots and access to the enrollment process.",
      ],
      [
        "Mobile view",
        "The same portal on a phone, with adapted navigation.",
      ],
    ],
  },
  openfy: {
    summary:
      "Personal music library with four clients over one collection: a Nuxt/Nitro server with SQLite, an installable iPhone PWA, a native Windows app (WinUI 3) and an Android app (Jetpack Compose).",
    featuredSummary:
      "My own alternative to a streaming service: one server and four clients, with offline downloads, synced lyrics and audio conversion.",
    role: "Author · end-to-end development",
    period: "2026",
    team: "Open-source personal project",
    type: "Cross-platform music library",
    year: "2026",
    repoNote: "Public repository",
    platforms: ["Windows", "Android", "iPhone (PWA)", "Web"],
    highlights: [
      "Imports with metadata extraction and SHA-256 deduplication; queued FLAC-to-AAC conversion with FFmpeg.",
      "HTTP range streaming, YouTube Music search and synced lyrics.",
      "Offline downloads verified by SHA-256 through a service worker, with listening stats and recommendations.",
      "Windows app with installer and auto-update; 80+ test files and CI protecting the main branch.",
    ],
    challenge:
      "I wanted to listen to my own collection on my PC, my phone and an iPhone with the experience of a commercial service, without depending on one: the same library, the same playlists and offline mode on every device.",
    solution:
      "I built a Nuxt/Nitro server with SQLite and Drizzle that manages the library, and four clients on top: an installable PWA, a native Windows app in WinUI 3 and an Android app in Kotlin with Compose that syncs with the PC.",
    impact:
      "Openfy is the project I use every day and my most technically ambitious one: it spans web, native desktop and mobile, with versioned releases (v0.5.4) and automated tests on every change.",
    architecture: [
      {
        title: "Nuxt 4 + Nitro",
        subtitle: "Server",
        detail: "API, HTTP range streaming and file imports.",
      },
      {
        title: "SQLite + Drizzle",
        subtitle: "Data",
        detail: "Library, playlists, listening stats and lyrics.",
      },
      {
        title: "FFmpeg",
        subtitle: "Processing",
        detail: "FLAC → AAC conversion queue and SHA-256 deduplication.",
      },
      {
        title: "WinUI 3 · Compose · PWA",
        subtitle: "Clients",
        detail: "Native Windows, native Android and an offline iPhone PWA.",
      },
    ],
    impactMetrics: [
      {
        label: "Clients",
        value: "4",
        detail: "Server, Windows, Android and PWA over one library.",
      },
      {
        label: "Test files",
        value: "80+",
        detail: "Vitest and Playwright, with CI on the main branch.",
      },
      {
        label: "Version",
        value: "v0.5.4",
        detail: "Versioned releases with auto-update on Windows.",
      },
    ],
    gallery: [
      [
        "Library",
        "Album view with covers generated for the demo (test data).",
      ],
      [
        "Album playing",
        "Album detail with the playback bar active.",
      ],
      [
        "Expanded player",
        "Immersive mode using the cover color as the background.",
      ],
      [
        "Library on the phone",
        "The PWA on an iPhone, with bottom navigation and a mini player.",
      ],
      [
        "Mobile player",
        "The PWA's full-screen player.",
      ],
    ],
  },
  viczy: {
    summary:
      "Fashion e-commerce platform built as a modular monolith, with hybrid persistence (PostgreSQL, MongoDB and Redis), an explainable recommendation engine and a 3D virtual fitting room.",
    featuredSummary:
      "Fashion e-commerce with three databases, explainable recommendations, a color-based outfit engine and a 3D fitting room in the browser.",
    role: "Tech lead · full stack",
    period: "2026",
    team: "3 people · 19 of 28 commits",
    type: "Fashion e-commerce",
    year: "2026",
    repoNote: "Private repository",
    highlights: [
      "Modular monolith in NestJS and Prisma: PostgreSQL for transactions, MongoDB for telemetry and Redis for caching.",
      "Explainable recommendations (Strategy pattern) with affinity profiles that decay over time.",
      "Outfit engine with OKLCH color rules and a 3D fitting room with parametric avatars (Three.js / React Three Fiber).",
      "Idempotent checkout, rate limiting, loyalty points and tiers. Payments are simulated.",
    ],
    challenge:
      "Design a fashion store that goes beyond the catalog: recommend pieces that work together, explain why, and let people see them on an avatar before buying.",
    solution:
      "I split the system into NestJS modules backed by three stores by data type: transactions in PostgreSQL, behavior events in MongoDB and caching in Redis. The Next.js frontend shows recommendations with their explanation and a 3D fitting room.",
    impact:
      "This is the project where I worked most on backend architecture: idempotency, inventory consistency and a recommendation layer that can be audited.",
    architecture: [
      {
        title: "NestJS + Prisma",
        subtitle: "Modular monolith",
        detail: "Auth, catalog, inventory, orders, loyalty and recommendations.",
      },
      {
        title: "PostgreSQL",
        subtitle: "Transactions",
        detail: "Users, variants, stock, cart and orders.",
      },
      {
        title: "MongoDB + Redis",
        subtitle: "Behavior and cache",
        detail: "Interaction events, affinity profiles and cached catalog.",
      },
      {
        title: "Next.js 14 + R3F",
        subtitle: "Frontend",
        detail: "Editorial storefront, explained recommendations and 3D fitting room.",
      },
    ],
    impactMetrics: [
      {
        label: "Databases",
        value: "3",
        detail: "Each kind of data in the store that serves it best.",
      },
      {
        label: "Recommendations",
        value: "Explainable",
        detail: "Every suggestion shows the reason behind it.",
      },
      {
        label: "Fitting room",
        value: "3D",
        detail: "Parametric avatars rendered in the browser.",
      },
    ],
    gallery: [
      ["Home", "Editorial storefront with the member card, points and loyalty tier (demo data)."],
      ["Catalog", "Product listing with category and color palette filters."],
      ["Product detail", "Product page with size variants, stock and the points a purchase earns."],
      ["Outfit builder and 3D fitting room", "3D mannequin built with Three.js and an explained harmony score for the look."],
    ],
  },
  turnos: {
    summary:
      "Queue and ticketing system for Universidad Autónoma de La Laguna (UAL): ticket generation, a public display with voice announcements and a desk panel, all synced in real time.",
    featuredSummary:
      "Real-time queues over WebSockets, voice announcements and POS ticket printing, built with a 5-person team.",
    role: "Tech lead · full stack",
    period: "2025 – 2026",
    team: "5 people · 55+ merged pull requests",
    type: "Queue system",
    year: "2026",
    repoNote: "Public repository",
    highlights: [
      "Public display, ticket kiosk and desk panel synced over WebSockets.",
      "Async FastAPI and MariaDB API with authentication, staff and desk management, dashboard and PDF reports.",
      "Node.js print service compiled to a Windows executable for thermal POS printers.",
      "Tested with pytest and deployed with Docker Compose behind Nginx with HTTPS.",
    ],
    challenge:
      "The university needed to organize service at its desks: give every visitor a ticket, have the display announce who is next, and let staff call, complete and supervise tickets without losing track.",
    solution:
      "I coordinated a 5-person team and we built an async FastAPI API, a Nuxt frontend and real-time communication over WebSockets. I added a print service for physical tickets and voice announcements on the public display.",
    impact:
      "The system covers the full service flow, from the printed ticket to closing at the desk, and it was my first experience leading integration, reviews and deployment for a team.",
    architecture: [
      {
        title: "Nuxt 3",
        subtitle: "Frontend",
        detail: "Ticket kiosk, public display and desk panel.",
      },
      {
        title: "FastAPI + MariaDB",
        subtitle: "Async API",
        detail: "Authentication, desks, dashboard and PDF reports.",
      },
      {
        title: "WebSockets",
        subtitle: "Real time",
        detail: "Every call shows up instantly on every screen.",
      },
      {
        title: "POS printing + Nginx",
        subtitle: "Operations",
        detail: "Windows print service for thermal printers; HTTPS with Docker Compose.",
      },
    ],
    impactMetrics: [
      {
        label: "Team",
        value: "5",
        detail: "People coordinated through branches, reviews and integration.",
      },
      {
        label: "Pull requests",
        value: "55+",
        detail: "Merged into the production branch.",
      },
      {
        label: "Sync",
        value: "Real time",
        detail: "Displays and desks connected over WebSockets.",
      },
    ],
    gallery: [
      [
        "Queue monitor (demo)",
        "Public display with tickets, sections, desks and wait times.",
      ],
      [
        "Ticket generation",
        "Kiosk to choose a department and generate a service ticket.",
      ],
      [
        "Desk panel (demo)",
        "Flow to call, complete and supervise tickets.",
      ],
    ],
  },
  estacionamiento: {
    summary:
      "Smart parking system with Arduino units at the entrance and exit, a serial-to-HTTP bridge and a FastAPI API that powers ticket payment and a Next.js dashboard.",
    featuredSummary:
      "End-to-end IoT: Arduino at the gates, a FastAPI API with scheduled jobs and an operations dashboard in Next.js.",
    role: "Full stack + hardware developer",
    period: "2026",
    team: "Academic project",
    type: "IoT + web",
    year: "2026",
    repoNote: "Public repository",
    highlights: [
      "Arduino units with IR sensors, servo motors, LCDs and a keypad at the entrance and exit.",
      "Serial-to-HTTP bridge that turns physical events into API calls.",
      "FastAPI API with Alembic migrations on PostgreSQL and a scheduled job that expires tickets.",
      "Ticket lookup and simulated payment with discounts, plus an operations dashboard with Supabase auth.",
    ],
    challenge:
      "Connect the physical world, sensors and gates at the entrances, with a web app where people can look up tickets, pay and see the day's occupancy.",
    solution:
      "I split the system into layers: Arduino firmware, a bridge that translates serial events into HTTP, a FastAPI API with scheduled jobs and a Next.js frontend with Chakra UI, all orchestrated with Docker Compose.",
    impact:
      "This is the project where I integrated hardware and software end to end, with a complete flow from the moment a car enters until the ticket is paid.",
    architecture: [
      {
        title: "Arduino C++",
        subtitle: "Gates",
        detail: "IR sensors, servo motors, LCDs and keypad at entrance and exit.",
      },
      {
        title: "Serial → HTTP bridge",
        subtitle: "Integration",
        detail: "Turns hardware events into API calls.",
      },
      {
        title: "FastAPI + PostgreSQL",
        subtitle: "Backend",
        detail: "Tickets, payments, Alembic migrations and scheduled expiry.",
      },
      {
        title: "Next.js 16 + Chakra UI",
        subtitle: "Frontend",
        detail: "Ticket lookup and payment, plus a dashboard with Supabase Auth.",
      },
    ],
    impactMetrics: [
      {
        label: "Layers",
        value: "4",
        detail: "Firmware, bridge, API and frontend.",
      },
      {
        label: "Commits",
        value: "90+",
        detail: "Public history on GitHub.",
      },
      {
        label: "Domain",
        value: "IoT",
        detail: "Hardware and software in one flow.",
      },
    ],
    gallery: [
      [
        "Operations dashboard",
        "Occupancy, tickets and daily indicators with test data.",
      ],
      [
        "Ticket lookup and payment",
        "Public flow to look up a ticket and start the payment.",
      ],
      [
        "Entrance and exit circuits",
        "Diagram of both gates with Arduino UNO, LCDs, IR sensors, servo motors and a keypad.",
      ],
    ],
  },
  bloomwish: {
    summary:
      "Online store for a café, published on PythonAnywhere: a menu with search and filters, product customization, a cart and order tracking, on a Flask backend.",
    featuredSummary:
      "A published online store with product customization, a cart and server-side pricing, animated with GSAP and Lenis.",
    role: "Full stack developer",
    period: "2026",
    team: "Academic project",
    type: "Online store",
    year: "2026",
    repoNote: "Private repository",
    highlights: [
      "Menu with search, category filters and sold-out products that switch themselves off.",
      "Product customization with toppings and a persistent cart with an order summary.",
      "Server-side prices in cents, stock tied to recipes and idempotent orders.",
      "Versioned SQLite migrations, 94 unittest tests and an interface animated with GSAP and Lenis.",
    ],
    challenge:
      "Build an online store with personality for a café, one that feels alive on a phone and leaves no room for pricing or inventory mistakes.",
    solution:
      "I built the store in Flask with Jinja templates and Tailwind CSS. Prices and stock are resolved on the server inside transactions, and the interface uses GSAP and Lenis for motion without giving up performance.",
    impact:
      "The store is published and can be visited. It pairs a bold visual identity with careful business rules on the backend.",
    architecture: [
      {
        title: "Flask + Jinja",
        subtitle: "Application",
        detail: "Public routes, templates and the cart API.",
      },
      {
        title: "SQLite",
        subtitle: "Data",
        detail: "Catalog, recipes, stock and orders with versioned migrations.",
      },
      {
        title: "Business rules",
        subtitle: "Server",
        detail: "Prices in cents, coupons and idempotent orders.",
      },
      {
        title: "Tailwind CSS + GSAP",
        subtitle: "Interface",
        detail: "Bold design with animations and smooth scrolling.",
      },
    ],
    impactMetrics: [
      {
        label: "Status",
        value: "Live",
        detail: "Published on PythonAnywhere.",
      },
      {
        label: "Tests",
        value: "94",
        detail: "unittest cases for prices, stock and orders.",
      },
      {
        label: "Products",
        value: "12",
        detail: "Real menu with categories and customization.",
      },
    ],
    gallery: [
      ["Home", "Landing page with a featured products carousel."],
      ["Menu", "Catalog with search and category filters."],
      ["Product", "Product page with description, allergens and customization."],
      ["Customize", "Choosing toppings before adding to the order."],
      ["Cart", "Order summary with calculated totals."],
      ["Home on a phone", "The landing page adapted to small screens."],
      ["Menu on a phone", "Single-column product cards."],
    ],
  },
})

export const dictionaries: Record<Locale, SiteDictionary> = {
  es: {
    localeName: "Español",
    seo: {
      title: "Luis Rivera | Portafolio de Desarrollo Web",
      description:
        "Portafolio de Luis Eliezer Rivera Gamez, desarrollador web full stack: portales en producción, apps multiplataforma, e-commerce e IoT.",
    },
    brand: {
      name: "Luis Eliezer Rivera Gamez",
      monogram: "LR",
      role: "Desarrollador web full stack · Estudiante de ISC",
      city: "Gómez Palacio, DGO",
      siteLabel: "LR / Portafolio",
    },
    navigation: {
      projects: "Proyectos",
      experience: "Experiencia",
      stack: "Stack",
      certifications: "Credenciales",
      contact: "Contacto",
      backToProjects: "Volver a proyectos",
      onThisPage: "En esta página",
    },
    a11y: {
      primaryNav: "Navegación principal",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      language: "Idioma",
      sectionNav: "Secciones del caso",
      openImage: "Ampliar imagen",
      closeDialog: "Cerrar",
      previousImage: "Imagen anterior",
      nextImage: "Imagen siguiente",
      imageCounter: "{current} de {total}",
      projectPreview: "Vista previa de proyectos",
    },
    actions: {
      viewCv: "CV en español",
      contact: "Contactarme",
      downloadCv: "Descargar CV en español",
      visitLiveSite: "Visitar sitio",
      viewRepo: "Ver repositorio",
      viewReleases: "Ver versiones",
      viewCase: "Ver caso",
      viewAllProjects: "Explorar proyectos",
      viewCredential: "Ver certificado",
    },
    labels: {
      live: "En línea",
      private: "Privado",
      publicRepo: "Repo público",
      institutional: "Institucional",
      academic: "Académico",
      personal: "Personal",
      flagship: "Destacado",
      current: "Actual",
      quickOverview: "Seis proyectos reales, del portal en producción al hardware.",
      selectedProjects: "Proyectos seleccionados",
      challenge: "Reto",
      solution: "Solución",
      highlights: "Lo más destacado",
      architecture: "Arquitectura",
      impact: "Impacto",
      gallery: "Galería",
      role: "Rol",
      period: "Periodo",
      team: "Equipo",
      stack: "Stack",
      platforms: "Plataformas",
      projectLinks: "Enlaces del proyecto",
      projectType: "Tipo de proyecto",
      year: "Año",
      technologies: "Tecnologías",
      repositoryPrivate: "Repositorio privado",
      cvFormat: "PDF · Español",
      previousProject: "Proyecto anterior",
      nextProject: "Siguiente proyecto",
      education: "Educación",
    },
    hero: {
      title: "Sistemas web que hacen el trabajo.",
      titleAccent: "el trabajo.",
      body:
        "Diseño y construyo productos web claros, mantenibles y listos para operar: desde un portal institucional en producción hasta apps nativas, e-commerce e IoT.",
      github: "GitHub",
      linkedin: "LinkedIn",
      stats: [
        { value: "1.5+", label: "años de experiencia" },
        { value: "60+", label: "páginas en producción" },
        { value: "4", label: "plataformas en Openfy" },
      ],
    },
    featured: {
      eyebrow: "Trabajo destacado",
      title: "Trabajo que puedo defender con detalle.",
      description:
        "Seis proyectos con código, capturas reales y decisiones técnicas que puedo explicar de principio a fin.",
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Experiencia con contexto.",
      description:
        "Roles donde he convertido requisitos ambiguos en software que otras personas pueden usar y mantener.",
      entries: [
        {
          company: "Facultad de Ciencias de la Salud · UJED",
          role: "Desarrollador Web Full Stack",
          period: "2026 – Actualidad",
          arrangement: "Híbrido",
          location: "Durango, México",
          summary:
            "Desarrollador principal del portal institucional en producción: más de 60 páginas públicas, API en Express con RBAC y bitácora de auditoría, panel administrativo con editor y respaldos, y más de 300 archivos de pruebas.",
          stack: ["Nuxt", "Express", "MariaDB", "Tailwind CSS", "Docker", "Playwright"],
          current: true,
        },
        {
          company: "IT Soluciones",
          role: "Desarrollador Web Jr.",
          period: "Feb 2025 – May 2026",
          arrangement: "Remoto",
          location: "Durango, México",
          summary:
            "Formulario clínico de varios pasos para la plataforma de campañas de VOSH, con validaciones y expedientes en PDF, y módulos de e-commerce en Nuxt (carrito, categorías y carrusel) integrados con Supabase y Stripe.",
          stack: ["React", "TypeScript", "Chakra UI", "Nuxt", "Supabase", "Stripe"],
        },
      ],
      education: {
        school: "Universidad Autónoma de La Laguna (UAL)",
        degree: "Ingeniería en Sistemas Computacionales",
        period: "Egreso: Jun 2027",
        location: "Torreón, Coah.",
        detail: "Inglés intermedio · Español nativo",
      },
    },
    stackSection: {
      eyebrow: "Stack técnico",
      title: "Herramientas con propósito.",
      description:
        "Tecnologías que he usado en proyectos reales, agrupadas por la capa del producto que resuelven.",
      groups: [
        {
          title: "Frontend",
          description: "Interfaces claras, rápidas y mantenibles.",
          items: [
            "React",
            "TypeScript",
            "Nuxt",
            "Next.js",
            "Tailwind CSS",
            "Chakra UI",
            "GSAP",
            "Three.js",
          ],
        },
        {
          title: "Backend",
          description: "APIs y servicios con reglas de negocio claras.",
          items: [
            "Node.js",
            "Express",
            "NestJS",
            "Python",
            "FastAPI",
            "Flask",
            "REST",
            "WebSockets",
            "JWT",
            "RBAC",
          ],
        },
        {
          title: "Datos",
          description: "Cada dato en el almacén que mejor le sirve.",
          items: [
            "SQL",
            "PostgreSQL",
            "MariaDB",
            "MySQL",
            "MongoDB",
            "Redis",
            "SQLite",
            "Supabase",
            "Prisma",
          ],
        },
        {
          title: "Pruebas y DevOps",
          description: "Entrega confiable y colaboración ordenada.",
          items: [
            "Vitest",
            "Playwright",
            "pytest",
            "Docker",
            "Docker Compose",
            "Nginx",
            "Git",
            "GitHub Actions",
            "Figma",
          ],
        },
      ],
    },
    certifications: {
      eyebrow: "Credenciales",
      title: "Aprendizaje que se puede comprobar.",
      description:
        "Cursos completados que complementan mi práctica de producto, desarrollo y herramientas de IA.",
      entries: [
        {
          issuer: "Google",
          title: "Inteligencia Artificial y productividad",
          completedOn: "22 jul 2024",
          detail: "4 horas · 4 módulos · Autoevaluación",
          proofId: "OA-2024-0722000067143",
          fileName: "certificates/google-ai-productivity-certificate.pdf",
        },
        {
          issuer: "DataCamp",
          title: "Introduction to Agent Skills",
          completedOn: "7 jun 2026",
          detail: "2 h 30 min · Curso completado",
          proofId: "#48,236,111",
          fileName: "certificates/datacamp-introduction-to-agent-skills.pdf",
        },
      ],
    },
    contactSection: {
      eyebrow: "Contacto",
      title: "Hablemos de lo que sigue.",
      description:
        "Estoy abierto a oportunidades para construir software útil, interfaces precisas y productos que evolucionen bien.",
      methods: [
        {
          kind: "email",
          href: `mailto:${email}`,
          label: "Email",
          value: email,
        },
        {
          kind: "github",
          href: githubUrl,
          label: "GitHub",
          value: "github.com/LuisRivera-end",
        },
        {
          kind: "linkedin",
          href: linkedinUrl,
          label: "LinkedIn",
          value: "linkedin.com/in/luis-rivera-dev",
        },
      ],
    },
    notFound: {
      eyebrow: "Error 404",
      title: "Esta página no existe.",
      body: "Puede que el enlace haya cambiado. Los proyectos siguen en la página principal.",
      cta: "Volver al inicio",
    },
    footer: "Diseñado y construido con React, Tailwind CSS y GSAP.",
    projects: esProjects,
  },
  en: {
    localeName: "English",
    seo: {
      title: "Luis Rivera | Web Development Portfolio",
      description:
        "Portfolio of Luis Eliezer Rivera Gamez, full stack web developer: production portals, cross-platform apps, e-commerce and IoT.",
    },
    brand: {
      name: "Luis Eliezer Rivera Gamez",
      monogram: "LR",
      role: "Full stack web developer · Computer Systems Engineering student",
      city: "Gómez Palacio, DGO",
      siteLabel: "LR / Portfolio",
    },
    navigation: {
      projects: "Projects",
      experience: "Experience",
      stack: "Stack",
      certifications: "Credentials",
      contact: "Contact",
      backToProjects: "Back to projects",
      onThisPage: "On this page",
    },
    a11y: {
      primaryNav: "Primary navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
      sectionNav: "Case study sections",
      openImage: "Enlarge image",
      closeDialog: "Close",
      previousImage: "Previous image",
      nextImage: "Next image",
      imageCounter: "{current} of {total}",
      projectPreview: "Project preview",
    },
    actions: {
      viewCv: "English CV",
      contact: "Contact me",
      downloadCv: "Download English CV",
      visitLiveSite: "Visit site",
      viewRepo: "View repository",
      viewReleases: "View releases",
      viewCase: "View case",
      viewAllProjects: "Explore projects",
      viewCredential: "View certificate",
    },
    labels: {
      live: "Live",
      private: "Private",
      publicRepo: "Public repo",
      institutional: "Institutional",
      academic: "Academic",
      personal: "Personal",
      flagship: "Featured",
      current: "Current",
      quickOverview: "Six real projects, from a production portal to hardware.",
      selectedProjects: "Selected projects",
      challenge: "Challenge",
      solution: "Solution",
      highlights: "Highlights",
      architecture: "Architecture",
      impact: "Impact",
      gallery: "Gallery",
      role: "Role",
      period: "Period",
      team: "Team",
      stack: "Stack",
      platforms: "Platforms",
      projectLinks: "Project links",
      projectType: "Project type",
      year: "Year",
      technologies: "Technologies",
      repositoryPrivate: "Private repository",
      cvFormat: "PDF · English",
      previousProject: "Previous project",
      nextProject: "Next project",
      education: "Education",
    },
    hero: {
      title: "Web systems that do the work.",
      titleAccent: "the work.",
      body:
        "I design and build web products that are clear, maintainable and ready to operate: from an institutional portal in production to native apps, e-commerce and IoT.",
      github: "GitHub",
      linkedin: "LinkedIn",
      stats: [
        { value: "1.5+", label: "years of experience" },
        { value: "60+", label: "pages in production" },
        { value: "4", label: "platforms in Openfy" },
      ],
    },
    featured: {
      eyebrow: "Featured work",
      title: "Work I can defend in detail.",
      description:
        "Six projects with code, real screenshots and technical decisions I can explain from start to finish.",
    },
    experience: {
      eyebrow: "Experience",
      title: "Experience with context.",
      description:
        "Roles where I have turned ambiguous requirements into software other people can use and maintain.",
      entries: [
        {
          company: "Faculty of Health Sciences · UJED",
          role: "Full Stack Web Developer",
          period: "2026 – Present",
          arrangement: "Hybrid",
          location: "Durango, Mexico",
          summary:
            "Lead developer of the production institutional portal: 60+ public pages, an Express API with RBAC and audit logging, an admin panel with an editor and backups, and 300+ test files.",
          stack: ["Nuxt", "Express", "MariaDB", "Tailwind CSS", "Docker", "Playwright"],
          current: true,
        },
        {
          company: "IT Soluciones",
          role: "Junior Web Developer",
          period: "Feb 2025 – May 2026",
          arrangement: "Remote",
          location: "Durango, Mexico",
          summary:
            "Multi-step clinical intake form for VOSH's campaign platform, with validations and PDF patient records, and Nuxt e-commerce modules (cart, categories and carousel) integrated with Supabase and Stripe.",
          stack: ["React", "TypeScript", "Chakra UI", "Nuxt", "Supabase", "Stripe"],
        },
      ],
      education: {
        school: "Universidad Autónoma de La Laguna (UAL)",
        degree: "B.S. in Computer Systems Engineering",
        period: "Expected Jun 2027",
        location: "Torreón, Coah.",
        detail: "English (intermediate) · Spanish (native)",
      },
    },
    stackSection: {
      eyebrow: "Tech stack",
      title: "Tools with purpose.",
      description:
        "Technologies I have used in real projects, grouped by the product layer they solve.",
      groups: [
        {
          title: "Frontend",
          description: "Clear, fast and maintainable interfaces.",
          items: [
            "React",
            "TypeScript",
            "Nuxt",
            "Next.js",
            "Tailwind CSS",
            "Chakra UI",
            "GSAP",
            "Three.js",
          ],
        },
        {
          title: "Backend",
          description: "APIs and services with clear business rules.",
          items: [
            "Node.js",
            "Express",
            "NestJS",
            "Python",
            "FastAPI",
            "Flask",
            "REST",
            "WebSockets",
            "JWT",
            "RBAC",
          ],
        },
        {
          title: "Data",
          description: "Every piece of data in the store that serves it best.",
          items: [
            "SQL",
            "PostgreSQL",
            "MariaDB",
            "MySQL",
            "MongoDB",
            "Redis",
            "SQLite",
            "Supabase",
            "Prisma",
          ],
        },
        {
          title: "Testing & DevOps",
          description: "Reliable delivery and organized collaboration.",
          items: [
            "Vitest",
            "Playwright",
            "pytest",
            "Docker",
            "Docker Compose",
            "Nginx",
            "Git",
            "GitHub Actions",
            "Figma",
          ],
        },
      ],
    },
    certifications: {
      eyebrow: "Credentials",
      title: "Learning you can verify.",
      description:
        "Completed courses that support my product, development and AI tooling practice.",
      entries: [
        {
          issuer: "Google",
          title: "Artificial Intelligence and Productivity",
          completedOn: "Jul 22, 2024",
          detail: "4 hours · 4 modules · Self-assessment",
          proofId: "OA-2024-0722000067143",
          fileName: "certificates/google-ai-productivity-certificate.pdf",
        },
        {
          issuer: "DataCamp",
          title: "Introduction to Agent Skills",
          completedOn: "Jun 7, 2026",
          detail: "2 h 30 min · Course completed",
          proofId: "#48,236,111",
          fileName: "certificates/datacamp-introduction-to-agent-skills.pdf",
        },
      ],
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Let's talk about what's next.",
      description:
        "I'm open to opportunities to build useful software, precise interfaces and products that evolve well.",
      methods: [
        {
          kind: "email",
          href: `mailto:${email}`,
          label: "Email",
          value: email,
        },
        {
          kind: "github",
          href: githubUrl,
          label: "GitHub",
          value: "github.com/LuisRivera-end",
        },
        {
          kind: "linkedin",
          href: linkedinUrl,
          label: "LinkedIn",
          value: "linkedin.com/in/luis-rivera-dev",
        },
      ],
    },
    notFound: {
      eyebrow: "Error 404",
      title: "This page doesn't exist.",
      body: "The link may have changed. The projects are still on the home page.",
      cta: "Back to home",
    },
    footer: "Designed and built with React, Tailwind CSS and GSAP.",
    projects: enProjects,
  },
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
