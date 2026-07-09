import type { Locale, NavSection, ProjectEntry, ProjectStatus } from "@/types/portfolio"

import { cvFileName, dictionaries } from "@/content/site-content"

const LOCALE_STORAGE_KEY = "portfolio-locale"

export function resolveBasePath(repositoryName?: string) {
  if (!repositoryName) {
    return "/"
  }

  return repositoryName.endsWith(".github.io")
    ? "/"
    : `/${repositoryName.replace(/^\/+|\/+$/g, "")}/`
}

export function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "es"
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)

  return storedLocale === "en" ? "en" : "es"
}

export function persistLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  }
}

export function getCvPath(baseUrl: string) {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`

  return `${normalizedBase}${cvFileName}`
}

export function getStatusVariant(status: ProjectStatus) {
  switch (status) {
    case "live":
      return "bg-emerald-500/12 text-emerald-200 ring-emerald-400/20"
    case "private":
      return "bg-amber-400/10 text-amber-200 ring-amber-400/25"
    case "institutional":
      return "bg-sky-500/10 text-sky-200 ring-sky-400/25"
    case "publicRepo":
      return "bg-blue-500/12 text-blue-100 ring-blue-300/25"
    default:
      return "bg-secondary text-secondary-foreground"
  }
}

export function getSectionHash(section: NavSection) {
  return `#${section}`
}

export function getProject(locale: Locale, slug: string): ProjectEntry | undefined {
  return dictionaries[locale].projects.find((project) => project.slug === slug)
}
