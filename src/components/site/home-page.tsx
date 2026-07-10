import { useLayoutEffect, useRef } from "react"
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BriefcaseBusinessIcon,
  Code2Icon,
  DownloadIcon,
  ExternalLinkIcon,
  FileCheck2Icon,
  MailIcon,
  SparklesIcon,
} from "lucide-react"
import gsap from "gsap"
import { Link } from "react-router-dom"

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"
import { ProjectCard } from "@/components/site/project-card"
import { GitHubMark, LinkedInMark } from "@/components/site/social-icons"
import { getAssetPath } from "@/lib/site"
import { cn } from "@/lib/utils"
import type { CertificateEntry, SiteDictionary } from "@/types/portfolio"

interface HomePageProps {
  baseUrl: string
  dictionary: SiteDictionary
  cvHref: string
}

export function HomePage({ baseUrl, dictionary, cvHref }: HomePageProps) {
  const heroRef = useRef<HTMLElement>(null)
  const emailContact = dictionary.contactSection.methods.find(
    (method) => method.kind === "email",
  )

  useLayoutEffect(() => {
    const scope = heroRef.current
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!scope || reduceMotion) {
      return
    }

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-reveal]", {
          duration: 0.72,
          stagger: 0.1,
          y: 26,
        })
        .from(
          "[data-hero-card]",
          {
            duration: 0.74,
            rotate: 1.5,
            scale: 0.96,
            y: 34,
          },
          "-=0.56",
        )

      gsap.to("[data-hero-orbit]", {
        duration: 24,
        ease: "none",
        repeat: -1,
        rotate: 360,
      })
    }, scope)

    return () => context.revert()
  }, [dictionary.hero.title])

  return (
    <main className="overflow-hidden">
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
        <div className="hero-light hero-light-one" />
        <div className="hero-light hero-light-two" />
        <div
          data-hero-orbit
          aria-hidden="true"
          className="pointer-events-none absolute -right-26 top-32 size-72 rounded-full border border-foreground/20"
        >
          <span className="absolute -left-2 top-1/2 size-4 -translate-y-1/2 border-2 border-foreground bg-primary shadow-[2px_2px_0_var(--foreground)]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-18 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.72fr)] lg:px-10 lg:py-28">
          <div className="flex max-w-4xl flex-col items-start">
            <p data-hero-reveal className="editorial-kicker">
              {dictionary.brand.role} · {dictionary.brand.city}
            </p>
            <h1
              data-hero-reveal
              className="mt-6 font-heading text-balance text-[clamp(4.25rem,10.8vw,9.5rem)] leading-[0.76] font-semibold tracking-[-0.075em] text-foreground"
            >
              {dictionary.hero.title}
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
            <div data-hero-reveal className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
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

          <aside data-hero-card className="hero-index-card self-end">
            <div className="flex items-start justify-between gap-6 border-b border-foreground/20 pb-5">
              <div>
                <p className="editorial-kicker">{dictionary.labels.selectedProjects}</p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                  {dictionary.labels.quickOverview}
                </p>
              </div>
              <ArrowDownRightIcon className="size-5 shrink-0" />
            </div>
            <div className="mt-4 divide-y divide-foreground/15">
              {dictionary.projects.slice(0, 3).map((project, index) => (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className="group flex items-center justify-between gap-5 py-4 transition hover:pl-1"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="text-xs font-black text-muted-foreground">0{index + 1}</span>
                    <span className="truncate font-heading text-2xl font-semibold tracking-[-0.04em]">
                      {project.title}
                    </span>
                  </div>
                  <ArrowUpRightIcon className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-foreground/20 pt-5">
              {dictionary.certifications.entries.map((certificate) => (
                <span
                  key={certificate.proofId}
                  className="border border-foreground/20 bg-background/55 px-2.5 py-2 text-[0.62rem] font-bold leading-4 tracking-[0.08em] text-muted-foreground uppercase"
                >
                  {certificate.issuer}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        id="projects"
        className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-22 sm:px-6 lg:px-10"
      >
        <SectionIntro
          eyebrow={dictionary.featured.eyebrow}
          title={dictionary.featured.title}
          description={dictionary.featured.description}
          number="01"
        />
        <div className="grid gap-5 xl:grid-cols-2">
          {dictionary.projects.map((project) => (
            <ProjectCard key={project.slug} dictionary={dictionary} project={project} />
          ))}
        </div>
      </section>

      <section
        id="experience"
        className="border-y-2 border-foreground bg-card/64 py-22"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-6 lg:px-10">
          <SectionIntro
            eyebrow={dictionary.experience.eyebrow}
            title={dictionary.experience.title}
            description={dictionary.experience.description}
            number="02"
          />
          <div className="border-t-2 border-foreground">
            {dictionary.experience.entries.map((entry) => (
              <article
                key={`${entry.company}-${entry.period}`}
                className="grid gap-6 border-b border-foreground/25 py-7 lg:grid-cols-[180px_minmax(0,1fr)_minmax(190px,0.55fr)]"
              >
                <div>
                  <span className="text-sm font-black tracking-[0.08em] text-foreground">
                    {entry.period}
                  </span>
                  <p className="mt-1 text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">
                    {entry.arrangement}
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-3xl font-semibold tracking-[-0.045em]">
                    {entry.company}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-foreground">{entry.role}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {entry.summary}
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:items-end">
                  <span className="inline-flex w-fit items-center gap-2 border border-foreground/20 bg-background px-2.5 py-1.5 text-xs font-bold">
                    <BriefcaseBusinessIcon className="size-3.5" />
                    {entry.location}
                  </span>
                  <div className="flex flex-wrap gap-1.5 lg:justify-end">
                    {entry.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-foreground/15 px-2 py-1 text-[0.66rem] font-semibold text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stack"
        className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-22 sm:px-6 lg:px-10"
      >
        <SectionIntro
          eyebrow={dictionary.stackSection.eyebrow}
          title={dictionary.stackSection.title}
          description={dictionary.stackSection.description}
          number="03"
        />
        <div className="grid gap-px border-2 border-foreground bg-foreground lg:grid-cols-3">
          {dictionary.stackSection.groups.map((group, index) => (
            <article key={group.title} className="bg-background p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 place-items-center border-2 border-foreground bg-primary shadow-[3px_3px_0_var(--foreground)]">
                  <Code2Icon className="size-5" />
                </span>
                <span className="text-xs font-black text-muted-foreground">0{index + 1}</span>
              </div>
              <h3 className="mt-8 font-heading text-4xl font-semibold tracking-[-0.05em]">
                {group.title}
              </h3>
              <p className="mt-3 min-h-14 text-sm leading-6 text-muted-foreground">
                {group.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border border-foreground/20 bg-card px-2.5 py-1.5 text-xs font-bold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="certifications"
        className="relative isolate border-y-2 border-foreground bg-foreground py-22 text-background"
      >
        <div className="certificate-light" />
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
        className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-22 sm:px-6 lg:px-10"
      >
        <SectionIntro
          eyebrow={dictionary.contactSection.eyebrow}
          title={dictionary.contactSection.title}
          description={dictionary.contactSection.description}
          number="05"
        />
        <div className="grid gap-px border-2 border-foreground bg-foreground lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.2fr)]">
          {dictionary.contactSection.methods.map((method) => (
            <a
              key={method.kind}
              href={method.href}
              target={method.kind === "email" ? undefined : "_blank"}
              rel={method.kind === "email" ? undefined : "noreferrer"}
              className="group flex min-h-56 flex-col justify-between bg-background p-6 transition hover:bg-primary"
            >
              {method.kind === "email" ? (
                <MailIcon className="size-6" />
              ) : method.kind === "github" ? (
                <GitHubMark className="size-6" />
              ) : (
                <LinkedInMark className="size-6" />
              )}
              <div>
                <span className="text-xs font-black tracking-[0.12em] text-muted-foreground uppercase">
                  {method.label}
                </span>
                <span className="mt-2 block break-all text-sm font-bold">{method.value}</span>
                <ArrowUpRightIcon className="mt-5 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
          <a
            href={cvHref}
            target="_blank"
            rel="noreferrer"
            className="group relative flex min-h-56 flex-col justify-between overflow-hidden bg-card p-6 transition hover:bg-primary"
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

interface SectionIntroProps {
  dark?: boolean
  eyebrow: string
  title: string
  description: string
  number: string
}

function SectionIntro({ dark = false, eyebrow, title, description, number }: SectionIntroProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.48fr)] lg:items-end">
      <div>
        <p className={cn("editorial-kicker", dark && "text-primary before:border-background")}>
          {eyebrow}
        </p>
        <h2
          className={cn(
            "mt-5 max-w-3xl font-heading text-balance text-[clamp(3rem,6vw,5.6rem)] leading-[0.84] font-semibold tracking-[-0.065em]",
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
      href={getAssetPath(baseUrl, certificate.fileName)}
      target="_blank"
      rel="noreferrer"
      className="group relative flex min-h-72 flex-col justify-between overflow-hidden border border-background/35 bg-background/8 p-6 backdrop-blur-sm transition hover:-translate-x-1 hover:-translate-y-1 hover:bg-background/12"
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
        <h3 className="mt-3 max-w-md font-heading text-4xl leading-[0.9] font-semibold tracking-[-0.055em] text-background">
          {certificate.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-background/70">{certificate.detail}</p>
        <div className="mt-6 flex items-center justify-between border-t border-background/25 pt-4 text-xs font-bold">
          <span>{certificate.proofId}</span>
          <span className="inline-flex items-center gap-2">
            {actionLabel}
            <ExternalLinkIcon className="size-3.5" />
          </span>
        </div>
      </div>
    </a>
  )
}
