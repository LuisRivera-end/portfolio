export type Locale = "es" | "en"

export type NavSection = "projects" | "experience" | "stack" | "contact"

export type ProjectStatus = "live" | "private" | "publicRepo" | "institutional"

export type ProjectIcon =
  | "facsa"
  | "presion"
  | "estacionamiento"
  | "turnos"

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
}

export interface StackGroup {
  title: string
  description: string
  items: string[]
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

export interface GalleryItem {
  title: string
  description: string
  image?: string
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
  stack: string[]
  status: ProjectStatus[]
  icon: ProjectIcon
  challenge: string
  solution: string
  impact: string
  architecture: ArchitectureNode[]
  impactMetrics: ImpactMetric[]
  gallery: GalleryItem[]
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
  }
  navigation: {
    projects: string
    experience: string
    stack: string
    contact: string
    backToProjects: string
    onThisPage: string
  }
  actions: {
    viewCv: string
    contact: string
    downloadCv: string
    visitLiveSite: string
    viewRepo: string
    viewCase: string
    viewAllProjects: string
  }
  labels: {
    live: string
    private: string
    publicRepo: string
    institutional: string
    quickOverview: string
    selectedProjects: string
    challenge: string
    solution: string
    architecture: string
    impact: string
    gallery: string
    role: string
    period: string
    team: string
    stack: string
    projectLinks: string
    projectType: string
    year: string
    technologies: string
    repositoryPrivate: string
    bilingualPdf: string
  }
  hero: {
    title: string
    body: string
    github: string
    linkedin: string
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
  }
  stackSection: {
    eyebrow: string
    title: string
    description: string
    groups: StackGroup[]
  }
  contactSection: {
    eyebrow: string
    title: string
    description: string
    methods: ContactMethod[]
  }
  footer: string
  projects: ProjectEntry[]
}
