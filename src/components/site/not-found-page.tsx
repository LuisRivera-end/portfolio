import { ArrowLeftIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import type { Locale, SiteDictionary } from "@/types/portfolio"

interface NotFoundPageProps {
  dictionary: SiteDictionary
  locale: Locale
}

export function NotFoundPage({ dictionary, locale }: NotFoundPageProps) {
  const description =
    locale === "en"
      ? "The page you requested is not part of the portfolio currently published."
      : "La pagina solicitada no forma parte del portafolio publicado actualmente."

  return (
    <main className="mx-auto flex min-h-[70svh] w-full max-w-7xl items-center px-5 py-16 sm:px-6 lg:px-10">
      <div className="glass-card flex w-full flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/65 p-8 backdrop-blur-2xl md:p-12">
        <p className="section-kicker">{dictionary.featured.eyebrow}</p>
        <h1 className="font-heading text-5xl leading-[0.9] font-semibold tracking-[-0.05em] text-foreground md:text-7xl">
          404
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          {description}
        </p>
        <div>
          <Button asChild size="lg" className="rounded-full px-6">
            <Link to="/">
              <ArrowLeftIcon data-icon="inline-start" />
              {dictionary.navigation.backToProjects}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
