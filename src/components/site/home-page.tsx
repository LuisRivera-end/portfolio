import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  Code2Icon,
  DownloadIcon,
  ExternalLinkIcon,
  MailIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { BlurFade } from "@/components/ui/blur-fade"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NoiseTexture } from "@/components/ui/noise-texture"
import { Separator } from "@/components/ui/separator"
import { ProjectCard } from "@/components/site/project-card"
import { SectionHeading } from "@/components/site/section-heading"
import { GitHubMark, LinkedInMark } from "@/components/site/social-icons"
import { getStatusVariant } from "@/lib/site"
import type { SiteDictionary } from "@/types/portfolio"

interface HomePageProps {
  dictionary: SiteDictionary
  cvHref: string
}

export function HomePage({ dictionary, cvHref }: HomePageProps) {
  const emailContact = dictionary.contactSection.methods.find(
    (method) => method.kind === "email",
  )

  return (
    <main className="overflow-hidden">
      <section className="relative isolate overflow-hidden border-b border-white/8">
        <NoiseTexture className="opacity-18" frequency={0.7} slope={0.12} />
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="hero-lines pointer-events-none absolute inset-y-0 left-0 w-1/2" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_26%,rgba(56,116,255,0.28),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(87,148,255,0.22),transparent_22%),radial-gradient(circle_at_82%_86%,rgba(23,93,225,0.18),transparent_20%)]" />

        <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(480px,0.9fr)] lg:px-10 lg:py-24">
          <div className="relative flex flex-col gap-8">
            <BlurFade className="relative flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="hero-monogram flex size-28 items-center justify-center rounded-[2rem] border border-white/12 bg-white/[0.03] shadow-[0_0_80px_rgba(38,113,255,0.15)]">
                    <span className="font-heading text-7xl leading-none font-semibold tracking-[-0.06em] text-white/85">
                      {dictionary.brand.monogram}
                    </span>
                  </div>
                  <div className="max-w-sm text-sm leading-7 text-white/55">
                    {dictionary.brand.city}
                    <br />
                    {dictionary.brand.role}
                  </div>
                </div>

                <h1 className="font-heading text-balance text-[clamp(3.8rem,11vw,7.4rem)] leading-[0.86] font-semibold tracking-[-0.055em] text-foreground">
                  {dictionary.hero.title}
                </h1>
                <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
                  {dictionary.hero.body}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-6 shadow-[0_0_35px_rgba(38,113,255,0.4)]"
                >
                  <a href={cvHref} target="_blank" rel="noreferrer">
                    <DownloadIcon data-icon="inline-start" />
                    {dictionary.actions.viewCv}
                  </a>
                </Button>
                {emailContact ? (
                  <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                    <a href={emailContact.href}>
                      <MailIcon data-icon="inline-start" />
                      {dictionary.actions.contact}
                    </a>
                  </Button>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                {dictionary.contactSection.methods
                  .filter((method) => method.kind !== "email")
                  .map((method, index, collection) => (
                    <div key={method.kind} className="flex items-center gap-4">
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 rounded-full transition hover:text-white"
                      >
                        {method.kind === "github" ? (
                          <GitHubMark className="size-5" />
                        ) : (
                          <LinkedInMark className="size-5" />
                        )}
                        <span>{method.label}</span>
                        <ExternalLinkIcon className="size-4" />
                      </a>
                      {index < collection.length - 1 ? (
                        <Separator orientation="vertical" className="h-5 bg-white/12" />
                      ) : null}
                    </div>
                  ))}
              </div>
            </BlurFade>
          </div>

          <BlurFade delay={0.08} className="relative">
            <div className="hero-panel glass-card relative overflow-hidden rounded-[2.2rem] border border-blue-200/20 bg-slate-950/55 p-6 shadow-[0_0_80px_rgba(38,113,255,0.2)]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(120,168,255,0.08),transparent_18%),radial-gradient(circle_at_top_right,rgba(73,132,255,0.22),transparent_28%)]" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-blue-200/75 uppercase">
                    {dictionary.labels.selectedProjects}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {dictionary.labels.quickOverview}
                  </p>
                </div>
                <div className="glass-icon flex size-11 items-center justify-center rounded-2xl border border-white/12 bg-white/5">
                  <ArrowDownRightIcon className="size-5 text-white/85" />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {dictionary.projects.map((project, index) => (
                  <BlurFade key={project.slug} delay={index * 0.06} inView>
                    <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />
                            <p className="text-xl font-semibold text-white">{project.title}</p>
                          </div>
                          <p className="max-w-md text-sm leading-7 text-white/66">
                            {project.summary}
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2">
                          {project.status.map((status) => (
                            <Badge
                              key={`${project.slug}-${status}`}
                              variant="outline"
                              className={getStatusVariant(status)}
                            >
                              {dictionary.labels[status]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="projects" className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-20 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow={dictionary.featured.eyebrow}
          title={dictionary.featured.title}
          description={dictionary.featured.description}
          actions={
            <Button variant="outline" asChild className="rounded-full">
              <Link to="/projects/facsa">
                <ArrowRightIcon data-icon="inline-end" />
                {dictionary.actions.viewAllProjects}
              </Link>
            </Button>
          }
        />
        <div className="grid gap-6 xl:grid-cols-2">
          {dictionary.projects.map((project, index) => (
            <BlurFade key={project.slug} delay={index * 0.06} inView>
              <ProjectCard dictionary={dictionary} project={project} />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-12 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow={dictionary.experience.eyebrow}
          title={dictionary.experience.title}
          description={dictionary.experience.description}
        />
        <div className="grid gap-6">
          {dictionary.experience.entries.map((entry, index) => (
            <BlurFade key={entry.company} delay={index * 0.08} inView>
              <Card className="glass-card overflow-visible border-white/10 bg-slate-950/60">
                <CardContent className="grid gap-6 px-6 py-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-start">
                  <div className="flex flex-col gap-3 border-blue-400/25 lg:pr-8 lg:[border-right:1px_solid_rgba(84,139,255,0.12)]">
                    <span className="text-lg font-semibold text-blue-200">
                      {entry.period}
                    </span>
                    <span className="text-sm uppercase tracking-[0.22em] text-white/45">
                      {entry.arrangement}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-semibold text-foreground">
                          {entry.company}
                        </h3>
                        <p className="text-base text-blue-100/80">{entry.role}</p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/65">
                        <BriefcaseBusinessIcon className="size-4" />
                        {entry.location}
                      </div>
                    </div>
                    <p className="max-w-3xl text-pretty text-base leading-7 text-muted-foreground">
                      {entry.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {entry.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-white/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="stack" className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-12 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow={dictionary.stackSection.eyebrow}
          title={dictionary.stackSection.title}
          description={dictionary.stackSection.description}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {dictionary.stackSection.groups.map((group, index) => (
            <BlurFade key={group.title} delay={index * 0.08} inView>
              <Card className="glass-card border-white/10 bg-slate-950/60">
                <CardHeader className="gap-3">
                  <div className="glass-icon flex size-12 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-blue-200 shadow-[0_0_30px_rgba(38,113,255,0.15)]">
                    <Code2Icon className="size-5" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">{group.title}</CardTitle>
                  <CardDescription className="text-base leading-7 text-muted-foreground">
                    {group.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium tracking-wide text-white/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-16 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow={dictionary.contactSection.eyebrow}
          title={dictionary.contactSection.title}
          description={dictionary.contactSection.description}
        />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-4 md:grid-cols-3">
            {dictionary.contactSection.methods.map((method, index) => (
              <BlurFade key={method.kind} delay={index * 0.05} inView>
                <a
                  href={method.href}
                  target={method.kind === "email" ? undefined : "_blank"}
                  rel={method.kind === "email" ? undefined : "noreferrer"}
                  className="glass-card flex h-full flex-col justify-between rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-5 transition hover:-translate-y-0.5 hover:border-blue-300/25 hover:bg-slate-950/72"
                >
                  <div className="glass-icon mb-6 flex size-12 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-blue-200 shadow-[0_0_30px_rgba(38,113,255,0.15)]">
                    {method.kind === "email" ? (
                      <MailIcon className="size-5" />
                    ) : method.kind === "github" ? (
                      <GitHubMark className="size-5" />
                    ) : (
                      <LinkedInMark className="size-5" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-white/55">{method.label}</span>
                    <span className="text-base leading-7 text-foreground">{method.value}</span>
                  </div>
                </a>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.1} inView>
            <Card className="glass-card relative overflow-hidden border-blue-300/14 bg-slate-950/72">
              <NoiseTexture className="opacity-20" frequency={0.56} />
              <CardHeader className="gap-4">
                <div className="glass-icon flex size-14 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-blue-200 shadow-[0_0_30px_rgba(38,113,255,0.18)]">
                  <DownloadIcon className="size-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-3xl text-foreground">
                    {dictionary.actions.downloadCv}
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-muted-foreground">
                    {dictionary.labels.bilingualPdf}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild size="lg" className="w-full rounded-full">
                  <a href={cvHref} target="_blank" rel="noreferrer">
                    <DownloadIcon data-icon="inline-start" />
                    {dictionary.actions.viewCv}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </section>
    </main>
  )
}
