import { startTransition, useEffect, useState } from "react"
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom"

import { HomePage } from "@/components/site/home-page"
import { NotFoundPage } from "@/components/site/not-found-page"
import { ProjectCasePage } from "@/components/site/project-case-page"
import { SiteHeader } from "@/components/site/site-header"
import { getDictionary } from "@/content/site-content"
import {
  getCvPath,
  getInitialLocale,
  getProject,
  persistLocale,
} from "@/lib/site"
import type { Locale } from "@/types/portfolio"

const routerBaseName =
  import.meta.env.BASE_URL === "/"
    ? "/"
    : import.meta.env.BASE_URL.replace(/\/$/, "")

function App() {
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale())

  useEffect(() => {
    document.documentElement.lang = locale
    persistLocale(locale)
  }, [locale])

  const dictionary = getDictionary(locale)
  const baseUrl = import.meta.env.BASE_URL
  const cvHref = getCvPath(baseUrl, locale)

  return (
    <div className="min-h-svh bg-background text-foreground">
      <BrowserRouter basename={routerBaseName}>
        <PortfolioRoutes
          baseUrl={baseUrl}
          cvHref={cvHref}
          dictionary={dictionary}
          locale={locale}
          onLocaleChange={(nextLocale) => {
            startTransition(() => {
              setLocale(nextLocale)
            })
          }}
        />
      </BrowserRouter>
    </div>
  )
}

interface PortfolioRoutesProps {
  baseUrl: string
  cvHref: string
  dictionary: ReturnType<typeof getDictionary>
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

function PortfolioRoutes({
  baseUrl,
  cvHref,
  dictionary,
  locale,
  onLocaleChange,
}: PortfolioRoutesProps) {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "")
      requestAnimationFrame(() => {
        const target = document.getElementById(sectionId)
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      })

      return
    }

    window.scrollTo({ top: 0, left: 0 })
  }, [location.hash, location.pathname])

  useEffect(() => {
    const currentProject = location.pathname.startsWith("/projects/")
      ? getProject(locale, location.pathname.replace("/projects/", ""))
      : undefined

    document.title = currentProject
      ? `${currentProject.title} | ${dictionary.brand.name}`
      : dictionary.seo.title
  }, [dictionary.brand.name, dictionary.seo.title, locale, location.pathname])

  return (
    <>
      <SiteHeader
        dictionary={dictionary}
        locale={locale}
        cvHref={cvHref}
        onLocaleChange={onLocaleChange}
      />
      <Routes>
        <Route
          index
          element={<HomePage baseUrl={baseUrl} dictionary={dictionary} cvHref={cvHref} />}
        />
        <Route
          path="projects/:slug"
          element={<ProjectRoute dictionary={dictionary} locale={locale} />}
        />
        <Route path="*" element={<NotFoundPage dictionary={dictionary} locale={locale} />} />
      </Routes>
      <footer className="border-t-2 border-foreground bg-card">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-muted-foreground sm:px-6 lg:px-10 md:flex-row md:items-center md:justify-between">
          <span>{dictionary.footer}</span>
          <span>{dictionary.brand.city}</span>
        </div>
      </footer>
    </>
  )
}

interface ProjectRouteProps {
  dictionary: ReturnType<typeof getDictionary>
  locale: Locale
}

function ProjectRoute({ dictionary, locale }: ProjectRouteProps) {
  const { slug } = useParams()
  const project = slug ? getProject(locale, slug) : undefined

  if (!project) {
    return <NotFoundPage dictionary={dictionary} locale={locale} />
  }

  return <ProjectCasePage dictionary={dictionary} project={project} />
}

export default App
