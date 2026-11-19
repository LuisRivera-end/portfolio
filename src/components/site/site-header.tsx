import { useState } from "react"
import { FileTextIcon, MenuIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

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
import { useActiveSection } from "@/lib/use-active-section"
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
  const location = useLocation()
  const isHome = location.pathname === "/"
  const spied = useActiveSection(navSections, isHome)
  const hashSection = location.hash.replace("#", "")
  const activeSection = isHome ? (spied ?? (hashSection || undefined)) : undefined
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-10">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3 text-xs font-black tracking-[0.14em] uppercase"
        >
          <span className="grid size-8 place-items-center border-2 border-foreground bg-primary text-[0.63rem] shadow-[3px_3px_0_var(--foreground)] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
            {dictionary.brand.monogram}
          </span>
          <span className="hidden sm:inline lg:hidden xl:inline">{dictionary.brand.siteLabel}</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label={dictionary.a11y.primaryNav}>
          {navSections.map((section) => {
            const isActive = activeSection === section
            return (
              <Link
                key={section}
                to={{ pathname: "/", hash: getSectionHash(section) }}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative py-1 text-[0.69rem] font-bold tracking-[0.1em] text-muted-foreground uppercase transition hover:text-foreground",
                  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:content-['']",
                  isActive && "text-foreground after:scale-x-100",
                )}
              >
                {navLabels[section]}
              </Link>
            )
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <span className="hidden text-[0.6rem] font-black tracking-[0.1em] text-muted-foreground uppercase 2xl:block">
            {dictionary.brand.city}
          </span>
          <LocaleSwitch
            label={dictionary.a11y.language}
            locale={locale}
            onLocaleChange={onLocaleChange}
          />
          <Button
            asChild
            size="lg"
            className="h-10 rounded-none border-2 border-foreground bg-primary px-3 text-xs font-black tracking-[0.08em] text-primary-foreground uppercase shadow-[4px_4px_0_var(--foreground)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary xl:px-4"
          >
            <a href={cvHref} target="_blank" rel="noreferrer" aria-label={dictionary.actions.viewCv}>
              <FileTextIcon data-icon="inline-start" />
              <span className="sr-only xl:not-sr-only">{dictionary.actions.viewCv}</span>
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitch
            label={dictionary.a11y.language}
            locale={locale}
            onLocaleChange={onLocaleChange}
            compact
          />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-none border-2 border-foreground bg-card shadow-[3px_3px_0_var(--foreground)]"
              >
                <MenuIcon />
                <span className="sr-only">{dictionary.a11y.openMenu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              closeLabel={dictionary.a11y.closeMenu}
              className="border-l-2 border-foreground bg-background p-0 text-foreground"
            >
              <SheetHeader className="border-b-2 border-foreground p-6 text-left">
                <SheetTitle className="font-sans text-sm font-black tracking-[0.14em] uppercase">
                  {dictionary.brand.siteLabel}
                </SheetTitle>
                <SheetDescription className="text-muted-foreground">
                  {dictionary.brand.city}
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-2 p-5" aria-label={dictionary.a11y.primaryNav}>
                {navSections.map((section, index) => (
                  <Button
                    key={section}
                    variant="ghost"
                    asChild
                    className="h-12 justify-between rounded-none border border-transparent px-3 text-left font-bold tracking-wide hover:border-foreground hover:bg-card"
                  >
                    <Link
                      to={{ pathname: "/", hash: getSectionHash(section) }}
                      onClick={() => setMenuOpen(false)}
                    >
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

interface LocaleSwitchProps {
  label: string
  locale: Locale
  compact?: boolean
  onLocaleChange: (locale: Locale) => void
}

function LocaleSwitch({ label, locale, compact = false, onLocaleChange }: LocaleSwitchProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex border-2 border-foreground bg-card p-0.5 shadow-[3px_3px_0_var(--foreground)]",
        compact && "shadow-[2px_2px_0_var(--foreground)]",
      )}
      aria-label={label}
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
