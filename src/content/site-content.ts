import type { Locale, SiteDictionary } from "@/types/portfolio"

const email = "leliezerrivera@gmail.com"
const githubUrl = "https://github.com/LuisRivera-end"
const linkedinUrl = "https://www.linkedin.com/in/luis-rivera-dev/"
const facsaUrl = "https://facsa.ujed.mx/"
const estacionamientoRepoUrl =
  "https://github.com/LuisRivera-end/Estacionamiento-Arduino"
const integracionRepoUrl =
  "https://github.com/LuisRivera-end/Proyecto-Integracion/tree/prod1"

export const cvFileNames: Record<Locale, string> = {
  es: "cv-luis-eliezer-rivera-gamez.pdf",
  en: "cv-luis-eliezer-rivera-gamez-en.pdf",
}

export const dictionaries: Record<Locale, SiteDictionary> = {
  es: {
    localeName: "Español",
    seo: {
      title: "Luis Rivera | Portafolio de Desarrollo Web",
      description:
        "Portafolio bilingüe de Luis Eliezer Rivera Gámez, desarrollador web enfocado en productos confiables, arquitectura limpia y experiencia de usuario precisa.",
    },
    brand: {
      name: "Luis Eliezer Rivera Gámez",
      monogram: "LR",
      role: "Desarrollador web full stack · Estudiante de ISC",
      city: "Gómez Palacio, DGO",
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
    actions: {
      viewCv: "CV en español",
      contact: "Contactarme",
      downloadCv: "Descargar CV en español",
      visitLiveSite: "Visitar sitio",
      viewRepo: "Ver repositorio",
      viewCase: "Ver caso",
      viewAllProjects: "Explorar proyectos",
      viewCredential: "Ver certificado",
    },
    labels: {
      live: "Live",
      private: "Privado",
      publicRepo: "Repo público",
      institutional: "Institucional",
      quickOverview: "Selección reciente de trabajo real.",
      selectedProjects: "Proyectos seleccionados",
      challenge: "Reto",
      solution: "Solución",
      architecture: "Arquitectura",
      impact: "Impacto",
      gallery: "Galería y pantallas",
      role: "Rol",
      period: "Periodo",
      team: "Equipo",
      stack: "Stack",
      projectLinks: "Enlaces del proyecto",
      projectType: "Tipo de proyecto",
      year: "Año",
      technologies: "Tecnologías",
      repositoryPrivate: "Repositorio privado",
      cvFormat: "PDF · Español",
    },
    hero: {
      title: "Sistemas web que hacen el trabajo.",
      body:
        "Diseño y construyo productos web claros, mantenibles y listos para operar. Mi trabajo une interfaces cuidadas, lógica de negocio y una entrega que no se queda en el mockup.",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    featured: {
      eyebrow: "Trabajo destacado",
      title: "Trabajo que puedo defender con detalle.",
      description:
        "Productos institucionales, operativos y técnicos construidos para resolver un problema concreto.",
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Experiencia con contexto.",
      description:
        "Roles donde he convertido requisitos ambiguos en software que otras personas pueden usar y mantener.",
      entries: [
        {
          company: "IT Soluciones",
          role: "Desarrollador Web Jr.",
          period: "Feb 2025 – May 2026",
          arrangement: "Remoto",
          location: "Durango, México",
          summary:
            "Desarrollo de aplicaciones full stack responsivas, prototipado de interfaces en Figma y consumo de APIs REST para productos internos y comerciales.",
          stack: ["React", "Node.js", "Tailwind CSS", "PostgreSQL"],
        },
        {
          company: "Facultad de Ciencias de la Salud UJED",
          role: "Desarrollador Web",
          period: "2026 – Actualidad",
          arrangement: "Híbrido",
          location: "Durango, México",
          summary:
            "Desarrollo del portal institucional público y del panel administrativo, con control de acceso por roles, gestión de contenido académico y despliegue continuo.",
          stack: ["Nuxt 3", "TypeScript", "Tailwind CSS", "GitHub Actions"],
        },
      ],
    },
    stackSection: {
      eyebrow: "Stack técnico",
      title: "Herramientas con propósito.",
      description:
        "Tecnologías elegidas por el problema que resuelven, no por llenar una lista.",
      groups: [
        {
          title: "Frontend",
          description: "Interfaces claras, rápidas y mantenibles.",
          items: [
            "React",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "shadcn/ui",
            "Magic UI",
            "GSAP",
            "Nuxt 3",
          ],
        },
        {
          title: "Backend & Data",
          description: "Servicios y datos enfocados en estructura y estabilidad.",
          items: [
            "Node.js",
            "Express",
            "MariaDB",
            "MySQL",
            "FastAPI",
            "JWT",
            "RBAC",
            "REST API",
          ],
        },
        {
          title: "Herramientas",
          description: "Entrega, colaboración y diseño del producto.",
          items: [
            "Git",
            "GitHub",
            "GitHub Actions",
            "Docker",
            "Docker Compose",
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
    footer: "Sitio personal diseñado y construido con React, Tailwind, Magic UI y GSAP.",
    projects: [
      {
        slug: "facsa",
        title: "FACSA",
        summary:
          "Portal institucional público y panel administrativo con RBAC para la Facultad de Ciencias de la Salud de la UJED.",
        featuredSummary:
          "Proyecto institucional en producción con frontend en Nuxt 3, backend en Express y despliegue automatizado.",
        role: "Desarrollador full stack",
        period: "2026 – Actualidad",
        team: "3 personas",
        type: "Portal institucional",
        year: "2026",
        repoNote: "Repositorio privado",
        liveUrl: facsaUrl,
        stack: [
          "Nuxt 3",
          "Express",
          "MariaDB",
          "Tailwind CSS",
          "JWT",
          "RBAC",
          "Docker",
          "GitHub Actions",
        ],
        status: ["live", "institutional", "private"],
        icon: "facsa",
        challenge:
          "FACSA necesitaba una plataforma moderna, segura y mantenible para comunicar información institucional, publicar avisos y ofrecer acceso público a servicios clave sin comprometer administración ni rendimiento.",
        solution:
          "Diseñé y desarrollé una solución full stack con frontend en Nuxt 3, backend en Express y base de datos MariaDB. El proyecto integra control de acceso por roles, módulos administrativos y una estructura pensada para escalar contenido académico e institucional.",
        impact:
          "El portal mejoró la claridad de la presencia institucional, simplificó la operación editorial y dejó una base más consistente para seguridad, accesibilidad y crecimiento del producto.",
        architecture: [
          {
            title: "Nuxt 3",
            subtitle: "Frontend público",
            detail: "SSR/SSG, experiencia pública y navegación clara.",
          },
          {
            title: "Express",
            subtitle: "Backend",
            detail: "REST API, autenticación y módulos administrativos.",
          },
          {
            title: "MariaDB",
            subtitle: "Datos",
            detail: "Contenido institucional, usuarios y permisos.",
          },
          {
            title: "RBAC",
            subtitle: "Seguridad",
            detail: "Roles, permisos y flujos protegidos por JWT.",
          },
          {
            title: "GitHub Actions",
            subtitle: "CI/CD",
            detail: "Automatización de build y despliegues.",
          },
        ],
        impactMetrics: [
          {
            label: "Plataforma",
            value: "En producción",
            detail: "Portal público disponible para usuarios reales.",
          },
          {
            label: "Acceso",
            value: "RBAC",
            detail: "Gestión segura de permisos y administración.",
          },
          {
            label: "Arquitectura",
            value: "Escalable",
            detail: "Separación clara entre frontend, API y datos.",
          },
        ],
        gallery: [
          {
            title: "Sitio público",
            description:
              "Experiencia pública para contenido académico e institucional.",
          },
          {
            title: "Panel administrativo",
            description:
              "Operación interna con módulos, permisos y flujos controlados.",
          },
          {
            title: "Módulos de transparencia",
            description:
              "Información crítica organizada con navegación más clara.",
          },
        ],
      },
      {
        slug: "presion",
        title: "Presión",
        summary:
          "Aplicación para registrar presión arterial, consultar historial y exportar reportes PDF con Supabase y Next.js.",
        featuredSummary:
          "Producto especializado con autenticación por enlace mágico, reportes y foco en UX clínica ligera.",
        role: "Desarrollador full stack",
        period: "2026",
        team: "Individual",
        type: "Producto especializado",
        year: "2026",
        repoNote: "Repositorio privado",
        stack: [
          "Next.js",
          "TypeScript",
          "Supabase",
          "Chakra UI",
          "PostgreSQL",
          "jsPDF",
        ],
        status: ["private"],
        icon: "presion",
        challenge:
          "Crear un flujo simple para capturar mediciones, revisar histórico y exportar información sin fricción para usuarios no técnicos.",
        solution:
          "Construí una app con App Router, Supabase Auth, RLS por usuario y exportación PDF, con formularios claros y feedback inmediato en una interfaz responsiva.",
        impact:
          "El producto concentra captura, consulta y exportación en una sola experiencia, con una arquitectura lista para escalar autenticación y reglas por usuario.",
        architecture: [
          {
            title: "Next.js",
            subtitle: "App Router",
            detail: "Interfaz y route handlers para el flujo principal.",
          },
          {
            title: "Supabase Auth",
            subtitle: "Acceso",
            detail: "Enlace mágico y manejo simple de sesiones.",
          },
          {
            title: "Postgres + RLS",
            subtitle: "Datos",
            detail: "Lecturas aisladas por usuario y persistencia segura.",
          },
        ],
        impactMetrics: [
          {
            label: "Seguridad",
            value: "RLS",
            detail: "Cada usuario opera solo sobre sus mediciones.",
          },
          {
            label: "Exportación",
            value: "PDF",
            detail: "Historial listo para compartir o archivar.",
          },
          {
            label: "Flujo",
            value: "1 dashboard",
            detail: "Captura, filtros y consulta en una sola vista.",
          },
        ],
        gallery: [
          {
            title: "Dashboard de lecturas",
            description: "Vista principal para registrar y consultar datos.",
          },
          {
            title: "Filtros por fecha",
            description:
              "Búsqueda focalizada por periodos usando zona horaria local.",
          },
          {
            title: "Exportación PDF",
            description: "Salida lista para reportes o seguimiento.",
          },
        ],
      },
      {
        slug: "estacionamiento",
        title: "Estacionamiento",
        summary:
          "Sistema inteligente de estacionamiento con sensores, lógica de control y visualización del estado disponible.",
        featuredSummary:
          "Proyecto técnico orientado a hardware/software para control de disponibilidad y automatización.",
        role: "Desarrollador",
        period: "2026",
        team: "Académico",
        type: "Sistema inteligente",
        year: "2026",
        repoNote: "Repositorio público",
        repositoryUrl: estacionamientoRepoUrl,
        stack: ["Python", "Arduino", "Sensores", "Lógica de control"],
        status: ["publicRepo"],
        icon: "estacionamiento",
        challenge:
          "Conectar lógica de sensores y representación visual de espacios disponibles en un flujo entendible y accionable.",
        solution:
          "Organicé el proyecto como un sistema de monitoreo y control con componentes físicos y software para mostrar disponibilidad y automatizar decisiones básicas.",
        impact:
          "Sirvió como proyecto técnico para integrar capas físicas y digitales, y como evidencia de resolución de problemas fuera del front-end puro.",
        architecture: [
          {
            title: "Sensores",
            subtitle: "Entrada",
            detail: "Detección del estado de espacios físicos.",
          },
          {
            title: "Arduino",
            subtitle: "Control",
            detail: "Orquestación de señales y acciones básicas.",
          },
          {
            title: "Python",
            subtitle: "Visualización",
            detail: "Lógica de apoyo y representación del estado.",
          },
        ],
        impactMetrics: [
          {
            label: "Dominio",
            value: "Hardware + software",
            detail: "Integración de sensores y lógica de aplicación.",
          },
          {
            label: "Visibilidad",
            value: "Tiempo real",
            detail: "Estado operativo más claro del sistema.",
          },
          {
            label: "Código",
            value: "Público",
            detail: "Repositorio disponible para revisión técnica.",
          },
        ],
        gallery: [
          {
            title: "Modelo de disponibilidad",
            description:
              "Representación del estado de espacios y control asociado.",
          },
          {
            title: "Lógica de sensores",
            description: "Conexión entre lectura física y decisiones del sistema.",
          },
          {
            title: "Integración académica",
            description:
              "Ejemplo de trabajo práctico fuera del entorno web tradicional.",
          },
        ],
      },
      {
        slug: "turnos",
        title: "Turnos / Integración",
        summary:
          "Sistema de turnos, tickets e impresión con frontend en Nuxt y servicios backend para flujos operativos.",
        featuredSummary:
          "Producto operativo con frontend, backend e integración de impresión para flujos de atención y permisos.",
        role: "Desarrollador full stack",
        period: "2026",
        team: "Proyecto académico / operativo",
        type: "Sistema de turnos",
        year: "2026",
        repoNote: "Repositorio público",
        repositoryUrl: integracionRepoUrl,
        stack: [
          "Nuxt 3",
          "Node.js",
          "FastAPI",
          "Tailwind CSS",
          "WebSockets",
          "Impresión POS",
        ],
        status: ["publicRepo"],
        icon: "turnos",
        challenge:
          "Coordinar flujos de atención, permisos y salida impresa dentro de una interfaz capaz de operar en tiempo real.",
        solution:
          "Estructuré una solución con frontend en Nuxt, servicios backend y soporte de impresión para tickets, buscando claridad operativa y un flujo entendible para usuarios internos.",
        impact:
          "El proyecto demuestra integración entre UI, lógica de negocio, procesos operativos e infraestructura complementaria más allá del simple CRUD.",
        architecture: [
          {
            title: "Nuxt 3",
            subtitle: "Frontend",
            detail: "Interfaz operativa para colas y estados.",
          },
          {
            title: "Servicios",
            subtitle: "Backend",
            detail: "Lógica, permisos e integraciones del flujo.",
          },
          {
            title: "Impresión POS",
            subtitle: "Salida",
            detail: "Tickets y soporte para operación presencial.",
          },
        ],
        impactMetrics: [
          {
            label: "Operación",
            value: "Tiempo real",
            detail: "Estados y flujos visibles para atención.",
          },
          {
            label: "Integración",
            value: "Impresión",
            detail: "Salida física incorporada al producto.",
          },
          {
            label: "Código",
            value: "Público",
            detail: "Repositorio visible para inspección técnica.",
          },
        ],
        gallery: [
          {
            title: "Pantalla de turnos",
            description:
              "Gestión de estados, colas y visibilidad del flujo operativo.",
          },
          {
            title: "Servicios conectados",
            description:
              "Relación entre frontend, backend e impresión física.",
          },
          {
            title: "Permisos y control",
            description:
              "Flujos protegidos para diferentes tipos de operador.",
          },
        ],
      },
    ],
  },
  en: {
    localeName: "English",
    seo: {
      title: "Luis Rivera | Web Development Portfolio",
      description:
        "Bilingual portfolio of Luis Eliezer Rivera Gámez, a web developer focused on reliable products, clean architecture, and precise user interfaces.",
    },
    brand: {
      name: "Luis Eliezer Rivera Gamez",
      monogram: "LR",
      role: "Full stack web developer · Computer Systems Engineering student",
      city: "Gómez Palacio, DGO",
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
    actions: {
      viewCv: "English CV",
      contact: "Contact me",
      downloadCv: "Download English CV",
      visitLiveSite: "Visit live site",
      viewRepo: "View repository",
      viewCase: "Open case study",
      viewAllProjects: "Explore projects",
      viewCredential: "View certificate",
    },
    labels: {
      live: "Live",
      private: "Private",
      publicRepo: "Public repo",
      institutional: "Institutional",
      quickOverview: "A quick overview of recent shipped work.",
      selectedProjects: "Selected projects",
      challenge: "Challenge",
      solution: "Solution",
      architecture: "Architecture",
      impact: "Impact",
      gallery: "Gallery & screens",
      role: "Role",
      period: "Period",
      team: "Team",
      stack: "Stack",
      projectLinks: "Project links",
      projectType: "Project type",
      year: "Year",
      technologies: "Technologies",
      repositoryPrivate: "Private repository",
      cvFormat: "PDF · English",
    },
    hero: {
      title: "Web systems that do the work.",
      body:
        "I design and build clear, maintainable web products ready to operate. My work brings together thoughtful interfaces, business logic, and delivery beyond the mockup.",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    featured: {
      eyebrow: "Featured work",
      title: "Work I can defend in detail.",
      description:
        "Institutional, operational, and technical products built to solve a concrete problem.",
    },
    experience: {
      eyebrow: "Experience",
      title: "Experience with context.",
      description:
        "Roles where I have turned ambiguous requirements into software people can use and maintain.",
      entries: [
        {
          company: "IT Soluciones",
          role: "Junior Web Developer",
          period: "Feb 2025 – May 2026",
          arrangement: "Remote",
          location: "Durango, Mexico",
          summary:
            "Built responsive full stack applications, prototyped interfaces in Figma, and consumed REST APIs for internal and commercial products.",
          stack: ["React", "Node.js", "Tailwind CSS", "PostgreSQL"],
        },
        {
          company: "Faculty of Health Sciences UJED",
          role: "Web Developer",
          period: "2026 – Present",
          arrangement: "Hybrid",
          location: "Durango, Mexico",
          summary:
            "Developing the public institutional portal and admin panel with role-based access, academic content management, and continuous delivery.",
          stack: ["Nuxt 3", "TypeScript", "Tailwind CSS", "GitHub Actions"],
        },
      ],
    },
    stackSection: {
      eyebrow: "Tech stack",
      title: "Tools with a purpose.",
      description:
        "Technologies selected for the problem they solve, not to fill a list.",
      groups: [
        {
          title: "Frontend",
          description: "Clear, fast, maintainable interfaces.",
          items: [
            "React",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "shadcn/ui",
            "Magic UI",
            "GSAP",
            "Nuxt 3",
          ],
        },
        {
          title: "Backend & Data",
          description: "Services and data shaped around structure and stability.",
          items: [
            "Node.js",
            "Express",
            "MariaDB",
            "MySQL",
            "FastAPI",
            "JWT",
            "RBAC",
            "REST API",
          ],
        },
        {
          title: "Tools",
          description: "Delivery, collaboration, and product design.",
          items: [
            "Git",
            "GitHub",
            "GitHub Actions",
            "Docker",
            "Docker Compose",
            "Figma",
          ],
        },
      ],
    },
    certifications: {
      eyebrow: "Credentials",
      title: "Learning you can verify.",
      description:
        "Completed courses that complement my product practice, development work, and AI tooling.",
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
          detail: "2 h 30 min · Completed course",
          proofId: "#48,236,111",
          fileName: "certificates/datacamp-introduction-to-agent-skills.pdf",
        },
      ],
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Let's talk about what is next.",
      description:
        "I am open to opportunities to build useful software, precise interfaces, and products that evolve well.",
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
    footer: "Personal site designed and built with React, Tailwind, Magic UI, and GSAP.",
    projects: [
      {
        slug: "facsa",
        title: "FACSA",
        summary:
          "Public institutional portal and RBAC admin panel for the Faculty of Health Sciences at UJED.",
        featuredSummary:
          "Production institutional product built with Nuxt 3, Express, and automated delivery.",
        role: "Full stack developer",
        period: "2026 – Present",
        team: "3 people",
        type: "Institutional portal",
        year: "2026",
        repoNote: "Private repository",
        liveUrl: facsaUrl,
        stack: [
          "Nuxt 3",
          "Express",
          "MariaDB",
          "Tailwind CSS",
          "JWT",
          "RBAC",
          "Docker",
          "GitHub Actions",
        ],
        status: ["live", "institutional", "private"],
        icon: "facsa",
        challenge:
          "FACSA needed a modern, secure, maintainable platform to communicate institutional information, publish updates, and provide public access to key services without sacrificing administration or performance.",
        solution:
          "I designed and built a full stack solution with a Nuxt 3 frontend, Express backend, and MariaDB database. The product integrates role-based access, admin modules, and a structure ready to scale academic and institutional content.",
        impact:
          "The platform improved the clarity of the institution's public presence, simplified editorial operations, and established a stronger foundation for security, accessibility, and future growth.",
        architecture: [
          {
            title: "Nuxt 3",
            subtitle: "Public frontend",
            detail: "SSR/SSG, public experience, and clear navigation.",
          },
          {
            title: "Express",
            subtitle: "Backend",
            detail: "REST API, authentication, and admin modules.",
          },
          {
            title: "MariaDB",
            subtitle: "Data",
            detail: "Institutional content, users, and permissions.",
          },
          {
            title: "RBAC",
            subtitle: "Security",
            detail: "Roles, permissions, and JWT-protected flows.",
          },
          {
            title: "GitHub Actions",
            subtitle: "CI/CD",
            detail: "Automated build and deployment pipelines.",
          },
        ],
        impactMetrics: [
          {
            label: "Platform",
            value: "In production",
            detail: "Public portal serving real users.",
          },
          {
            label: "Access",
            value: "RBAC",
            detail: "Secure permission and admin management.",
          },
          {
            label: "Architecture",
            value: "Scalable",
            detail: "Clear separation between frontend, API, and data.",
          },
        ],
        gallery: [
          {
            title: "Public website",
            description:
              "Public-facing experience for academic and institutional content.",
          },
          {
            title: "Admin panel",
            description:
              "Internal operations with modules, permissions, and controlled flows.",
          },
          {
            title: "Transparency modules",
            description:
              "Critical information organized with clearer navigation.",
          },
        ],
      },
      {
        slug: "presion",
        title: "Presion",
        summary:
          "Blood pressure tracking application with history filters and PDF export powered by Supabase and Next.js.",
        featuredSummary:
          "Specialized product with magic-link authentication, reporting, and a lightweight clinical UX.",
        role: "Full stack developer",
        period: "2026",
        team: "Solo",
        type: "Specialized product",
        year: "2026",
        repoNote: "Private repository",
        stack: [
          "Next.js",
          "TypeScript",
          "Supabase",
          "Chakra UI",
          "PostgreSQL",
          "jsPDF",
        ],
        status: ["private"],
        icon: "presion",
        challenge:
          "The goal was to create a simple flow for capturing readings, browsing history, and exporting information without friction for non-technical users.",
        solution:
          "I built the app with the App Router, Supabase Auth, per-user RLS, and PDF export, focusing on clear forms and immediate feedback across responsive layouts.",
        impact:
          "The product consolidates capture, filtering, and reporting in one experience, with an architecture ready to grow around authentication and per-user rules.",
        architecture: [
          {
            title: "Next.js",
            subtitle: "App Router",
            detail: "Interface and route handlers for the main flow.",
          },
          {
            title: "Supabase Auth",
            subtitle: "Access",
            detail: "Magic-link sign in and lightweight session handling.",
          },
          {
            title: "Postgres + RLS",
            subtitle: "Data",
            detail: "Per-user persistence and secure data isolation.",
          },
        ],
        impactMetrics: [
          {
            label: "Security",
            value: "RLS",
            detail: "Each user can access only their own readings.",
          },
          {
            label: "Export",
            value: "PDF",
            detail: "History is ready for sharing or archiving.",
          },
          {
            label: "Workflow",
            value: "1 dashboard",
            detail: "Capture, filters, and consultation in one view.",
          },
        ],
        gallery: [
          {
            title: "Readings dashboard",
            description: "Primary surface for input and review.",
          },
          {
            title: "Date filters",
            description:
              "Focused search by period using the local time zone.",
          },
          {
            title: "PDF export",
            description: "Report output ready to share or store.",
          },
        ],
      },
      {
        slug: "estacionamiento",
        title: "Estacionamiento",
        summary:
          "Smart parking system combining sensors, control logic, and status visualization for available spaces.",
        featuredSummary:
          "Technical project bridging hardware and software for control and monitoring.",
        role: "Developer",
        period: "2026",
        team: "Academic",
        type: "Smart system",
        year: "2026",
        repoNote: "Public repository",
        repositoryUrl: estacionamientoRepoUrl,
        stack: ["Python", "Arduino", "Sensors", "Control logic"],
        status: ["publicRepo"],
        icon: "estacionamiento",
        challenge:
          "The challenge was to connect sensor logic with a clear visual representation of parking availability in a way that felt actionable and understandable.",
        solution:
          "I organized the project as a monitoring and control system with physical components and software to visualize occupancy and automate basic decisions.",
        impact:
          "It demonstrates problem solving beyond pure web interfaces and shows how I approach systems that span physical and digital layers.",
        architecture: [
          {
            title: "Sensors",
            subtitle: "Input",
            detail: "Physical-state detection of parking spaces.",
          },
          {
            title: "Arduino",
            subtitle: "Control",
            detail: "Signal orchestration and basic automation.",
          },
          {
            title: "Python",
            subtitle: "Visualization",
            detail: "Logic support and state representation.",
          },
        ],
        impactMetrics: [
          {
            label: "Domain",
            value: "Hardware + software",
            detail: "Sensor integration plus application logic.",
          },
          {
            label: "Visibility",
            value: "Real-time",
            detail: "Clearer operational system status.",
          },
          {
            label: "Code",
            value: "Public",
            detail: "Repository available for technical review.",
          },
        ],
        gallery: [
          {
            title: "Availability model",
            description:
              "Representation of parking state and its control layer.",
          },
          {
            title: "Sensor logic",
            description:
              "Connection between physical reads and system decisions.",
          },
          {
            title: "Academic integration",
            description:
              "Practical work outside a traditional web-only environment.",
          },
        ],
      },
      {
        slug: "turnos",
        title: "Turnos / Integración",
        summary:
          "Queue, ticketing, and printing system with a Nuxt frontend and backend services for operational workflows.",
        featuredSummary:
          "Operational product combining frontend, backend, and ticket-printing flows.",
        role: "Full stack developer",
        period: "2026",
        team: "Academic / operational project",
        type: "Queue management system",
        year: "2026",
        repoNote: "Public repository",
        repositoryUrl: integracionRepoUrl,
        stack: [
          "Nuxt 3",
          "Node.js",
          "FastAPI",
          "Tailwind CSS",
          "WebSockets",
          "POS printing",
        ],
        status: ["publicRepo"],
        icon: "turnos",
        challenge:
          "The system had to coordinate service queues, permissions, and printed output inside an interface capable of operating in real time.",
        solution:
          "I structured the product with a Nuxt frontend, backend services, and ticket printing support, aiming for operational clarity and a flow that internal users could trust.",
        impact:
          "This project demonstrates integration between UI, business logic, operational processes, and supporting infrastructure beyond a basic CRUD product.",
        architecture: [
          {
            title: "Nuxt 3",
            subtitle: "Frontend",
            detail: "Operational interface for queues and status changes.",
          },
          {
            title: "Services",
            subtitle: "Backend",
            detail: "Workflow logic, permissions, and integrations.",
          },
          {
            title: "POS printing",
            subtitle: "Output",
            detail: "Ticket generation for in-person workflows.",
          },
        ],
        impactMetrics: [
          {
            label: "Operation",
            value: "Real-time",
            detail: "Visible state and flow for on-site attention.",
          },
          {
            label: "Integration",
            value: "Printing",
            detail: "Physical ticket output built into the product.",
          },
          {
            label: "Code",
            value: "Public",
            detail: "Repository available for technical inspection.",
          },
        ],
        gallery: [
          {
            title: "Queue screen",
            description:
              "Visibility into states, queues, and the operational flow.",
          },
          {
            title: "Connected services",
            description:
              "Relationship between frontend, backend, and printed output.",
          },
          {
            title: "Permissions and control",
            description:
              "Protected flows for different operator roles.",
          },
        ],
      },
    ],
  },
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
