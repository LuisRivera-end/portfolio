export type Locale = "es" | "en"

export type NavSection =
  | "projects"
  | "experience"
  | "stack"
  | "certifications"
  | "contact"

export type ProjectStatus =
  | "live"
  | "private"
  | "publicRepo"
  | "institutional"
  | "academic"
  | "personal"

export type ProjectIcon =
  | "facsa"
  | "openfy"
  | "viczy"
  | "turnos"
  | "estacionamiento"
  | "bloomwish"

export type MediaFrame = "browser" | "phone"

export interface ContactMethod {
  href: string
  label: string
  value: string
  kind: "email" | "github" | "linkedin"
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  arrangement: string
  location: string
  summary: string
  stack: string[]
  current?: boolean
}

export interface EducationEntry {
  school: string
  degree: string
  period: string
  location: string
  detail: string
}

export interface StackGroup {
  title: string
  description: string
  items: string[]
}

export interface CertificateEntry {
  issuer: string
  title: string
  completedOn: string
  detail: string
  proofId: string
  fileName: string
}

export interface ArchitectureNode {
  title: string
  subtitle: string
  detail: string
}

export interface ImpactMetric {
  label: string
  value: string
  detail: string
}

export interface ProjectImage {
  image: string
  width: number
  height: number
}

export interface GalleryItem extends ProjectImage {
  title: string
  description: string
}

export interface ProjectCover extends ProjectImage {
  /** Label drawn in the fake browser address bar. */
  label: string
  /** Optional phone screenshot layered over the desktop one. */
  phone?: ProjectImage
}

export interface ProjectEntry {
  slug: string
  title: string
  summary: string
  featuredSummary: string
  role: string
  period: string
  team: string
  type: string
  year: string
  repoNote: string
  repositoryUrl?: string
  liveUrl?: string
  releaseUrl?: string
  platforms?: string[]
  stack: string[]
  status: ProjectStatus[]
  icon: ProjectIcon
  cover: ProjectCover
  highlights: string[]
  challenge: string
  solution: string
  impact: string
  architecture: ArchitectureNode[]
  impactMetrics: ImpactMetric[]
  gallery: GalleryItem[]
}

export interface HeroStat {
  value: string
  label: string
}

export interface SiteDictionary {
  localeName: string
  seo: {
    title: string
    description: string
  }
  brand: {
    name: string
    monogram: string
    role: string
    city: string
    siteLabel: string
  }
  navigation: {
    projects: string
    experience: string
    stack: string
    certifications: string
    contact: string
    backToProjects: string
    onThisPage: string
  }
  a11y: {
    primaryNav: string
    openMenu: string
    closeMenu: string
    language: string
    sectionNav: string
    openImage: string
    closeDialog: string
    previousImage: string
    nextImage: string
    imageCounter: string
    projectPreview: string
  }
  actions: {
    viewCv: string
    contact: string
    downloadCv: string
    visitLiveSite: string
    viewRepo: string
    viewReleases: string
    viewCase: string
    viewAllProjects: string
    viewCredential: string
  }
  labels: {
    live: string
    private: string
    publicRepo: string
    institutional: string
    academic: string
    personal: string
    flagship: string
    current: string
    quickOverview: string
    selectedProjects: string
    challenge: string
    solution: string
    highlights: string
    architecture: string
    impact: string
    gallery: string
    role: string
    period: string
    team: string
    stack: string
    platforms: string
    projectLinks: string
    projectType: string
    year: string
    technologies: string
    repositoryPrivate: string
    cvFormat: string
    previousProject: string
    nextProject: string
    education: string
  }
  hero: {
    title: string
    titleAccent: string
    body: string
    github: string
    linkedin: string
    stats: HeroStat[]
  }
  featured: {
    eyebrow: string
    title: string
    description: string
  }
  experience: {
    eyebrow: string
    title: string
    description: string
    entries: ExperienceEntry[]
    education: EducationEntry
  }
  stackSection: {
    eyebrow: string
    title: string
    description: string
    groups: StackGroup[]
  }
  certifications: {
    eyebrow: string
    title: string
    description: string
    entries: CertificateEntry[]
  }
  contactSection: {
    eyebrow: string
    title: string
    description: string
    methods: ContactMethod[]
  }
  notFound: {
    eyebrow: string
    title: string
    body: string
    cta: string
  }
  footer: string
  projects: ProjectEntry[]
}
