import type { Locale, NavSection, ProjectEntry, ProjectStatus } from "@/types/portfolio"

import { cvFileNames, dictionaries } from "@/content/site-content"

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

export function getAssetPath(baseUrl: string, fileName: string) {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`

  return `${normalizedBase}${fileName}`
}

export function getCvPath(baseUrl: string, locale: Locale) {
  return getAssetPath(baseUrl, cvFileNames[locale])
}

export function getStatusVariant(status: ProjectStatus) {
  switch (status) {
    case "live":
      return "border-emerald-700/20 bg-emerald-100 text-emerald-950"
    case "private":
      return "border-amber-700/20 bg-amber-100 text-amber-950"
    case "institutional":
      return "border-sky-700/20 bg-sky-100 text-sky-950"
    case "publicRepo":
      return "border-indigo-700/20 bg-indigo-100 text-indigo-950"
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
