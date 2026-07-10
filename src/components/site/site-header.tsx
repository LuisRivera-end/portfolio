import { FileTextIcon, MenuIcon } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

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
import { cn } from "@/lib/utils"
import type { Locale, SiteDictionary } from "@/types/portfolio"

interface SiteHeaderProps {
  dictionary: SiteDictionary
  locale: Locale
  cvHref: string
  onLocaleChange: (locale: Locale) => void
}

const navSections = [
  "projects",
  "experience",
  "stack",
  "certifications",
  "contact",
] as const

export function SiteHeader({
  dictionary,
  locale,
  cvHref,
  onLocaleChange,
}: SiteHeaderProps) {
  const navLabels = dictionary.navigation

  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-10">
        <Link
          to="/"
          className="group flex items-center gap-3 text-xs font-black tracking-[0.14em] uppercase"
        >
          <span className="grid size-7 place-items-center border-2 border-foreground bg-primary text-[0.63rem] shadow-[3px_3px_0_var(--foreground)] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
            LR
          </span>
          <span>LR / Portfolio</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {navSections.map((section) => (
            <NavLink
              key={section}
              to={{ pathname: "/", hash: getSectionHash(section) }}
              className={({ isActive }) =>
                cn(
                  "text-[0.69rem] font-bold tracking-[0.1em] text-muted-foreground uppercase transition hover:text-foreground",
                  isActive && "text-foreground",
                )
              }
            >
              {navLabels[section]}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="hidden text-[0.6rem] font-black tracking-[0.1em] text-muted-foreground uppercase xl:block">
            {dictionary.brand.city} · 2026
          </span>
          <LocaleSwitch locale={locale} onLocaleChange={onLocaleChange} />
          <Button
            asChild
            size="lg"
            className="h-10 rounded-none border-2 border-foreground bg-primary px-4 text-xs font-black tracking-[0.08em] text-primary-foreground uppercase shadow-[4px_4px_0_var(--foreground)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary"
          >
            <a href={cvHref} target="_blank" rel="noreferrer">
              <FileTextIcon data-icon="inline-start" />
              {dictionary.actions.viewCv}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitch locale={locale} onLocaleChange={onLocaleChange} compact />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-none border-2 border-foreground bg-card shadow-[3px_3px_0_var(--foreground)]"
              >
                <MenuIcon />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="border-l-2 border-foreground bg-background p-0 text-foreground">
              <SheetHeader className="border-b-2 border-foreground p-6 text-left">
                <SheetTitle className="font-sans text-sm font-black tracking-[0.14em] uppercase">
                  LR / Portfolio
                </SheetTitle>
                <SheetDescription className="text-muted-foreground">
                  {dictionary.brand.city}
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-2 p-5">
                {navSections.map((section, index) => (
                  <Button
                    key={section}
                    variant="ghost"
                    asChild
                    className="h-12 justify-between rounded-none border border-transparent px-3 text-left font-bold tracking-wide hover:border-foreground hover:bg-card"
                  >
                    <Link to={{ pathname: "/", hash: getSectionHash(section) }}>
                      <span>{navLabels[section]}</span>
                      <span className="text-xs text-muted-foreground">0{index + 1}</span>
                    </Link>
                  </Button>
                ))}
                <Button
                  asChild
                  className="mt-4 h-12 rounded-none border-2 border-foreground bg-primary font-black text-primary-foreground shadow-[4px_4px_0_var(--foreground)] hover:bg-primary"
                >
                  <a href={cvHref} target="_blank" rel="noreferrer">
                    <FileTextIcon data-icon="inline-start" />
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

interface LocaleSwitchProps {
  locale: Locale
  compact?: boolean
  onLocaleChange: (locale: Locale) => void
}

function LocaleSwitch({ locale, compact = false, onLocaleChange }: LocaleSwitchProps) {
  return (
    <div
      className={cn(
        "flex border-2 border-foreground bg-card p-0.5 shadow-[3px_3px_0_var(--foreground)]",
        compact && "shadow-[2px_2px_0_var(--foreground)]",
      )}
      aria-label="Language"
    >
      {(["es", "en"] as const).map((nextLocale) => (
        <button
          key={nextLocale}
          type="button"
          aria-pressed={locale === nextLocale}
          onClick={() => onLocaleChange(nextLocale)}
          className={cn(
            "px-2 py-1 text-[0.62rem] font-black tracking-[0.16em] uppercase transition",
            locale === nextLocale
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {nextLocale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
