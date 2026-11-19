import { useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  ArrowUpRightIcon,
  BriefcaseBusinessIcon,
  Code2Icon,
  DatabaseIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileCheck2Icon,
  FlaskConicalIcon,
  GraduationCapIcon,
  LayoutTemplateIcon,
  MailIcon,
  ServerIcon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"
import { ProjectCard, type ProjectCardVariant } from "@/components/site/project-card"
import { GitHubMark, LinkedInMark } from "@/components/site/social-icons"
import { gsap } from "@/lib/gsap"
import { assetUrl, getAssetPath } from "@/lib/site"
import { prefersReducedMotion, useReveal } from "@/lib/use-reveal"
import { cn } from "@/lib/utils"
import type { CertificateEntry, SiteDictionary } from "@/types/portfolio"

interface HomePageProps {
  baseUrl: string
  dictionary: SiteDictionary
  cvHref: string
}

/** Bento placement by position in the project list (layout lives here, order in content). */
const bentoSlots: { variant: ProjectCardVariant; className: string }[] = [
  { variant: "flagship", className: "md:col-span-2 lg:col-span-12" },
  { variant: "feature", className: "lg:col-span-6" },
  { variant: "feature", className: "lg:col-span-6" },
  { variant: "compact", className: "lg:col-span-4" },
  { variant: "compact", className: "lg:col-span-4" },
  { variant: "wide", className: "md:col-span-2 lg:col-span-4" },
]

const stackIcons: LucideIcon[] = [LayoutTemplateIcon, ServerIcon, DatabaseIcon, FlaskConicalIcon]

export function HomePage({ baseUrl, dictionary, cvHref }: HomePageProps) {
  const mainRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const emailContact = dictionary.contactSection.methods.find(
    (method) => method.kind === "email",
  )

  useReveal(mainRef, [dictionary.localeName])

  useLayoutEffect(() => {
    const scope = heroRef.current
    if (!scope || prefersReducedMotion()) {
      return
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out", clearProps: "all" } })
        .from("[data-hero-reveal]", { opacity: 0, duration: 0.72, stagger: 0.09, y: 26 })
        .from(
          "[data-hero-card]",
          { opacity: 0, duration: 0.8, rotate: 1.5, scale: 0.96, y: 34 },
          "-=0.55",
        )

      gsap.to("[data-hero-orbit]", { duration: 24, ease: "none", repeat: -1, rotate: 360 })
    }, scope)

    return () => ctx.revert()
  }, [dictionary.localeName])

  const { title, titleAccent } = dictionary.hero
  const accentIndex = title.lastIndexOf(titleAccent)

  return (
    <main ref={mainRef} className="overflow-x-clip">
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden border-b-2 border-foreground"
      >
        <AnimatedGridPattern
          aria-hidden="true"
          className="hero-grid text-foreground"
          duration={6}
          maxOpacity={0.16}
          numSquares={20}
          repeatDelay={1.8}
        />
        <div aria-hidden="true" className="hero-light hero-light-one" />
        <div aria-hidden="true" className="hero-light hero-light-two" />
        <div
          data-hero-orbit
          aria-hidden="true"
          className="pointer-events-none absolute -right-26 top-32 -z-10 hidden size-72 rounded-full border border-foreground/20 xl:block"
        >
          <span className="absolute -left-2 top-1/2 size-4 -translate-y-1/2 border-2 border-foreground bg-primary shadow-[2px_2px_0_var(--foreground)]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:px-10 lg:py-24">
          <div className="flex min-w-0 flex-col items-start">
            <p data-hero-reveal className="editorial-kicker items-start leading-5 before:mt-1 before:shrink-0">
              <span className="min-w-0">{dictionary.brand.role}</span>
            </p>
            <h1
              data-hero-reveal
              className="mt-6 max-w-full font-heading text-[clamp(3.4rem,9.2vw,8.4rem)] leading-[0.86] font-semibold tracking-[-0.065em] break-words hyphens-auto text-balance text-foreground"
            >
              {accentIndex >= 0 ? (
                <>
                  {title.slice(0, accentIndex)}
                  <span className="accent-mark">{titleAccent}</span>
                </>
              ) : (
                title
              )}
            </h1>
            <p
              data-hero-reveal
              className="mt-8 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg"
            >
              {dictionary.hero.body}
            </p>
            <div data-hero-reveal className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none border-2 border-foreground bg-primary px-5 font-black text-primary-foreground shadow-[5px_5px_0_var(--foreground)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary"
              >
                <a href={cvHref} target="_blank" rel="noreferrer">
                  <DownloadIcon data-icon="inline-start" />
                  {dictionary.actions.viewCv}
                </a>
              </Button>
              {emailContact ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-none border-2 border-foreground bg-card px-5 font-bold shadow-[5px_5px_0_var(--foreground)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-card"
                >
                  <a href={emailContact.href}>
                    <MailIcon data-icon="inline-start" />
                    {dictionary.actions.contact}
                  </a>
                </Button>
              ) : null}
            </div>

            <dl data-hero-reveal className="mt-10 grid w-full max-w-xl grid-cols-3 gap-2 sm:gap-3">
              {dictionary.hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 border-2 border-foreground bg-card/80 px-2.5 py-3 shadow-[3px_3px_0_var(--foreground)] sm:p-4"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-3xl leading-none font-semibold tracking-[-0.05em] sm:text-4xl">
                    {stat.value}
                  </dd>
                  <dd
                    aria-hidden="true"
                    className="mt-2 text-[0.56rem] leading-4 font-black tracking-[0.02em] text-muted-foreground uppercase [overflow-wrap:anywhere] min-[400px]:text-[0.6rem] sm:text-[0.64rem] sm:tracking-[0.08em]"
                  >
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div data-hero-reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {dictionary.contactSection.methods
                .filter((method) => method.kind !== "email")
                .map((method) => (
                  <a
                    key={method.kind}
                    href={method.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-foreground"
                  >
                    {method.kind === "github" ? (
                      <GitHubMark className="size-4" />
                    ) : (
                      <LinkedInMark className="size-4" />
                    )}
                    {method.label}
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                ))}
            </div>
          </div>

          <HeroShowcase dictionary={dictionary} />
        </div>
      </section>

      <section
        id="projects"
        className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-20 sm:px-6 lg:px-10 lg:py-24"
      >
        <SectionIntro
          eyebrow={dictionary.featured.eyebrow}
          title={dictionary.featured.title}
          description={dictionary.featured.description}
          number="01"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {dictionary.projects.map((project, index) => {
            const slot = bentoSlots[index] ?? bentoSlots[3]
            return (
              <ProjectCard
                key={project.slug}
                dictionary={dictionary}
                project={project}
                index={index}
                variant={slot.variant}
                className={slot.className}
              />
            )
          })}
        </div>
      </section>

      <section id="experience" className="border-y-2 border-foreground bg-card/64 py-20 lg:py-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-6 lg:px-10">
          <SectionIntro
            eyebrow={dictionary.experience.eyebrow}
            title={dictionary.experience.title}
            description={dictionary.experience.description}
            number="02"
          />
          <div className="relative">
            <span
              aria-hidden="true"
              data-reveal-line="y"
              className="absolute top-2 bottom-2 left-[0.4rem] w-0.5 origin-top bg-foreground sm:left-[0.55rem]"
            />
            <ol className="flex flex-col gap-6">
              {dictionary.experience.entries.map((entry) => (
                <li key={`${entry.company}-${entry.period}`} data-reveal className="relative pl-8 sm:pl-12">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-7 left-0 size-3.5 border-2 border-foreground sm:size-4.5",
                      entry.current ? "bg-primary shadow-[2px_2px_0_var(--foreground)]" : "bg-background",
                    )}
                  />
                  <article className="grid gap-6 border-2 border-foreground bg-background p-5 shadow-[5px_5px_0_var(--foreground)] sm:p-6 lg:grid-cols-[170px_minmax(0,1fr)_minmax(190px,0.55fr)]">
                    <div>
                      <span className="text-sm font-black tracking-[0.06em] text-foreground">
                        {entry.period}
                      </span>
                      <p className="mt-1 text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">
                        {entry.arrangement}
                      </p>
                      {entry.current ? (
                        <span className="mt-3 inline-flex border border-foreground bg-primary px-2 py-0.5 text-[0.6rem] font-black tracking-[0.1em] uppercase">
                          {dictionary.labels.current}
                        </span>
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-3xl leading-[0.95] font-semibold tracking-[-0.045em] break-words">
                        {entry.company}
                      </h3>
                      <p className="mt-2 text-sm font-bold text-foreground">{entry.role}</p>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                        {entry.summary}
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 lg:items-end">
                      <span className="inline-flex w-fit items-center gap-2 border border-foreground/20 bg-card px-2.5 py-1.5 text-xs font-bold">
                        <BriefcaseBusinessIcon className="size-3.5" />
                        {entry.location}
                      </span>
                      <ul className="flex flex-wrap gap-1.5 lg:justify-end" aria-label={dictionary.labels.stack}>
                        {entry.stack.map((item) => (
                          <li
                            key={item}
                            className="border border-foreground/15 px-2 py-1 text-[0.66rem] font-semibold text-muted-foreground"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              ))}
              <li data-reveal className="relative pl-8 sm:pl-12">
                <span
                  aria-hidden="true"
                  className="absolute top-7 left-0 size-3.5 rotate-45 border-2 border-foreground bg-ice sm:size-4.5"
                />
                <article className="flex flex-col gap-5 border-2 border-dashed border-foreground bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center border-2 border-foreground bg-ice shadow-[3px_3px_0_var(--foreground)]">
                      <GraduationCapIcon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-black tracking-[0.12em] text-muted-foreground uppercase">
                        {dictionary.labels.education}
                      </p>
                      <h3 className="mt-1 font-heading text-2xl leading-tight font-semibold tracking-[-0.03em] break-words sm:text-3xl">
                        {dictionary.experience.education.degree}
                      </h3>
                      <p className="mt-1 text-sm font-bold">{dictionary.experience.education.school}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {dictionary.experience.education.detail}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                    <span className="border border-foreground bg-background px-2.5 py-1 text-xs font-black whitespace-nowrap">
                      {dictionary.experience.education.period}
                    </span>
                    <span className="text-xs font-bold whitespace-nowrap text-muted-foreground">
                      {dictionary.experience.education.location}
                    </span>
                  </div>
                </article>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section
        id="stack"
        className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-20 sm:px-6 lg:px-10 lg:py-24"
      >
        <SectionIntro
          eyebrow={dictionary.stackSection.eyebrow}
          title={dictionary.stackSection.title}
          description={dictionary.stackSection.description}
          number="03"
        />
        <div className="grid gap-px border-2 border-foreground bg-foreground md:grid-cols-2 xl:grid-cols-4">
          {dictionary.stackSection.groups.map((group, index) => {
            const Icon = stackIcons[index] ?? Code2Icon
            return (
              <article key={group.title} data-reveal className="flex flex-col bg-background p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center border-2 border-foreground bg-primary shadow-[3px_3px_0_var(--foreground)]">
                    <Icon className="size-5" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="outline-numeral font-sans text-4xl leading-none font-black"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-heading text-4xl leading-none font-semibold tracking-[-0.05em] break-words">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border border-foreground/20 bg-card px-2.5 py-1.5 text-xs font-bold transition-colors hover:border-foreground hover:bg-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      <section
        id="certifications"
        className="relative isolate overflow-hidden border-y-2 border-foreground bg-foreground py-20 text-background lg:py-24"
      >
        <div aria-hidden="true" className="certificate-light" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-6 lg:px-10">
          <SectionIntro
            dark
            eyebrow={dictionary.certifications.eyebrow}
            title={dictionary.certifications.title}
            description={dictionary.certifications.description}
            number="04"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {dictionary.certifications.entries.map((certificate) => (
              <CertificateCard
                key={certificate.proofId}
                baseUrl={baseUrl}
                certificate={certificate}
                actionLabel={dictionary.actions.viewCredential}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-20 sm:px-6 lg:px-10 lg:py-24"
      >
        <SectionIntro
          eyebrow={dictionary.contactSection.eyebrow}
          title={dictionary.contactSection.title}
          description={dictionary.contactSection.description}
          number="05"
        />
        <div
          data-reveal
          className="grid gap-px border-2 border-foreground bg-foreground sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.2fr)]"
        >
          {dictionary.contactSection.methods.map((method) => (
            <a
              key={method.kind}
              href={method.href}
              target={method.kind === "email" ? undefined : "_blank"}
              rel={method.kind === "email" ? undefined : "noreferrer"}
              className="group flex min-h-48 min-w-0 flex-col justify-between bg-background p-6 transition hover:bg-primary sm:min-h-56"
            >
              {method.kind === "email" ? (
                <MailIcon className="size-6" />
              ) : method.kind === "github" ? (
                <GitHubMark className="size-6" />
              ) : (
                <LinkedInMark className="size-6" />
              )}
              <div className="min-w-0">
                <span className="text-xs font-black tracking-[0.12em] text-muted-foreground uppercase">
                  {method.label}
                </span>
                <span className="mt-2 block text-sm font-bold [overflow-wrap:anywhere]">
                  {method.value}
                </span>
                <ArrowUpRightIcon className="mt-5 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
          <a
            href={cvHref}
            target="_blank"
            rel="noreferrer"
            className="group relative flex min-h-48 flex-col justify-between overflow-hidden bg-primary p-6 transition hover:bg-ice sm:min-h-56"
          >
            <ShineBorder
              borderWidth={1}
              duration={12}
              shineColor={["transparent", "#dfff3d", "transparent"]}
            />
            <FileCheck2Icon className="relative size-6" />
            <div className="relative">
              <span className="text-xs font-black tracking-[0.12em] text-muted-foreground uppercase">
                {dictionary.labels.cvFormat}
              </span>
              <span className="mt-2 block text-lg font-black">{dictionary.actions.downloadCv}</span>
              <ArrowUpRightIcon className="mt-5 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </a>
        </div>
      </section>
    </main>
  )
}

function HeroShowcase({ dictionary }: { dictionary: SiteDictionary }) {
  const projects = dictionary.projects
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || prefersReducedMotion()) {
      return
    }
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActive((current) => (current + 1) % projects.length)
      }
    }, 4200)
    return () => window.clearInterval(timer)
  }, [paused, projects.length])

  const current = projects[active] ?? projects[0]

  return (
    <aside
      data-hero-card
      aria-label={dictionary.labels.selectedProjects}
      className="hero-index-card min-w-0 self-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-foreground/20 pb-4">
        <div className="min-w-0">
          <p className="editorial-kicker">{dictionary.labels.selectedProjects}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            {dictionary.labels.quickOverview}
          </p>
        </div>
        <span className="shrink-0 font-heading text-3xl leading-none font-semibold tabular-nums">
          {String(active + 1).padStart(2, "0")}
          <span className="text-base text-muted-foreground">/{String(projects.length).padStart(2, "0")}</span>
        </span>
      </div>

      <div
        className="mt-4 overflow-hidden border-2 border-foreground bg-card"
        role="img"
        aria-label={`${dictionary.a11y.projectPreview}: ${current.title}`}
      >
        <div className="frame-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>{current.cover.label}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {projects.map((project, index) => (
            <img
              key={project.slug}
              src={assetUrl(project.cover.image)}
              alt=""
              width={project.cover.width}
              height={project.cover.height}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className={cn(
                "absolute inset-0 size-full object-cover object-top transition-[opacity,scale] duration-700 ease-out",
                index === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
              )}
            />
          ))}
        </div>
      </div>

      <ul className="mt-3 divide-y divide-foreground/15">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Link
              to={`/projects/${project.slug}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              aria-current={index === active ? "true" : undefined}
              className={cn(
                "group flex items-center justify-between gap-4 px-1 py-2.5 transition-[padding,background-color]",
                index === active && "bg-primary/45 pl-2",
              )}
            >
              <span className="flex min-w-0 items-baseline gap-3">
                <span className="text-xs font-black text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-xl leading-tight font-semibold tracking-[-0.03em] break-words sm:text-2xl">
                  {project.title}
                </span>
                <span className="hidden min-w-0 truncate text-[0.62rem] font-bold tracking-[0.08em] text-muted-foreground uppercase sm:inline">
                  {project.type}
                </span>
              </span>
              <ArrowUpRightIcon className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

interface SectionIntroProps {
  dark?: boolean
  eyebrow: string
  title: string
  description: string
  number: string
}

function SectionIntro({ dark = false, eyebrow, title, description, number }: SectionIntroProps) {
  return (
    <div data-reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.48fr)] lg:items-end">
      <div className="min-w-0">
        <p className={cn("editorial-kicker", dark && "text-primary before:border-background")}>
          {eyebrow}
        </p>
        <h2
          className={cn(
            "mt-5 max-w-3xl font-heading text-[clamp(2.75rem,6vw,5.6rem)] leading-[0.9] font-semibold tracking-[-0.06em] break-words text-balance",
            dark && "text-background",
          )}
        >
          {title}
        </h2>
      </div>
      <div className={cn("border-l-2 border-foreground/20 pl-5", dark && "border-background/25")}>
        <span
          className={cn(
            "text-xs font-black tracking-[0.14em] text-muted-foreground uppercase",
            dark && "text-background/60",
          )}
        >
          {number}
        </span>
        <p className={cn("mt-3 text-sm leading-7 text-muted-foreground", dark && "text-background/75")}>
          {description}
        </p>
      </div>
    </div>
  )
}

interface CertificateCardProps {
  actionLabel: string
  baseUrl: string
  certificate: CertificateEntry
}

function CertificateCard({ actionLabel, baseUrl, certificate }: CertificateCardProps) {
  return (
    <a
      data-reveal
      href={getAssetPath(baseUrl, certificate.fileName)}
      target="_blank"
      rel="noreferrer"
      className="group relative flex min-h-72 flex-col justify-between gap-8 overflow-hidden border border-background/35 bg-background/8 p-6 backdrop-blur-sm transition-[translate,background-color] hover:-translate-x-1 hover:-translate-y-1 hover:bg-background/12"
    >
      <ShineBorder
        borderWidth={1}
        duration={10}
        shineColor={["transparent", "#dfff3d", "transparent"]}
      />
      <div className="relative flex items-start justify-between gap-5">
        <span className="grid size-11 place-items-center border border-background/50 bg-primary text-foreground shadow-[3px_3px_0_#f7f7f1]">
          <SparklesIcon className="size-5" />
        </span>
        <span className="text-right text-[0.65rem] font-black tracking-[0.12em] text-background/60 uppercase">
          {certificate.completedOn}
        </span>
      </div>
      <div className="relative">
        <p className="text-xs font-black tracking-[0.14em] text-primary uppercase">
          {certificate.issuer}
        </p>
        <h3 className="mt-3 max-w-md font-heading text-4xl leading-[0.92] font-semibold tracking-[-0.05em] break-words text-background">
          {certificate.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-background/70">{certificate.detail}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-background/25 pt-4 text-xs font-bold">
          <span className="[overflow-wrap:anywhere]">{certificate.proofId}</span>
          <span className="inline-flex items-center gap-2">
            {actionLabel}
            <ExternalLinkIcon className="size-3.5" />
          </span>
        </div>
      </div>
    </a>
  )
}
