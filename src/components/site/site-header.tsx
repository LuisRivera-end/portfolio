import { MenuIcon, SparklesIcon } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getSectionHash } from "@/lib/site"
import type { Locale, SiteDictionary } from "@/types/portfolio"

interface SiteHeaderProps {
  dictionary: SiteDictionary
  locale: Locale
  cvHref: string
  onLocaleChange: (locale: Locale) => void
}

const navSections = ["projects", "experience", "stack", "contact"] as const

export function SiteHeader({
  dictionary,
  locale,
  cvHref,
  onLocaleChange,
}: SiteHeaderProps) {
  const navLabels = dictionary.navigation

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/70 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-full transition hover:opacity-90"
        >
          <Avatar className="size-12 border border-white/10 bg-white/5 shadow-[0_0_35px_rgba(38,113,255,0.18)]">
            <AvatarFallback className="bg-transparent font-heading text-xl font-semibold tracking-tight text-foreground">
              {dictionary.brand.monogram}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col sm:flex">
            <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
              Luis Rivera
            </span>
            <span className="text-sm text-muted-foreground">
              {dictionary.brand.role}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navSections.map((section) => (
            <NavLink
              key={section}
              to={{ pathname: "/", hash: getSectionHash(section) }}
              className="text-sm font-medium tracking-wide text-white/72 transition hover:text-white"
            >
              {navLabels[section]}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="glass-inline flex items-center gap-1 rounded-full p-1">
            <LocaleButton
              active={locale === "es"}
              onClick={() => onLocaleChange("es")}
            >
              ES
            </LocaleButton>
            <LocaleButton
              active={locale === "en"}
              onClick={() => onLocaleChange("en")}
            >
              EN
            </LocaleButton>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full px-5 shadow-[0_0_30px_rgba(38,113,255,0.42)]"
          >
            <a href={cvHref} target="_blank" rel="noreferrer">
              <SparklesIcon data-icon="inline-start" />
              {dictionary.actions.viewCv}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <div className="glass-inline flex items-center gap-1 rounded-full p-1">
            <LocaleButton
              active={locale === "es"}
              onClick={() => onLocaleChange("es")}
            >
              ES
            </LocaleButton>
            <LocaleButton
              active={locale === "en"}
              onClick={() => onLocaleChange("en")}
            >
              EN
            </LocaleButton>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="border-white/10 bg-slate-950/90 p-0 backdrop-blur-2xl">
              <SheetHeader className="border-b border-white/10">
                <SheetTitle>{dictionary.brand.name}</SheetTitle>
                <SheetDescription>{dictionary.brand.role}</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-3 p-4">
                {navSections.map((section) => (
                  <Button key={section} variant="ghost" asChild className="justify-start">
                    <Link to={{ pathname: "/", hash: getSectionHash(section) }}>
                      {navLabels[section]}
                    </Link>
                  </Button>
                ))}
                <Button asChild className="mt-2">
                  <a href={cvHref} target="_blank" rel="noreferrer">
                    <SparklesIcon data-icon="inline-start" />
                    {dictionary.actions.viewCv}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

interface LocaleButtonProps {
  active: boolean
  children: string
  onClick: () => void
}

function LocaleButton({ active, children, onClick }: LocaleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1 text-xs font-semibold tracking-[0.2em] transition",
        active
          ? "bg-primary text-primary-foreground shadow-[0_0_18px_rgba(38,113,255,0.4)]"
          : "text-white/60 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  )
}
