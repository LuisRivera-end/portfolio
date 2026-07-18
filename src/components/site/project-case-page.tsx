import {
  ArrowLeftIcon,
  BriefcaseBusinessIcon,
  CalendarRangeIcon,
  CarFrontIcon,
  DropletsIcon,
  ExternalLinkIcon,
  HeartPulseIcon,
  Layers3Icon,
  Link2Icon,
  LockIcon,
  TicketIcon,
  UsersRoundIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAssetPath, getStatusVariant } from "@/lib/site"
import { cn } from "@/lib/utils"
import type { ProjectEntry, SiteDictionary } from "@/types/portfolio"

interface ProjectCasePageProps {
  dictionary: SiteDictionary
  project: ProjectEntry
}

const iconMap = {
  facsa: DropletsIcon,
  presion: HeartPulseIcon,
  estacionamiento: CarFrontIcon,
  turnos: CalendarRangeIcon,
}

const sectionKeys = [
  "challenge",
  "solution",
  "architecture",
  "impact",
  "gallery",
] as const

export function ProjectCasePage({ dictionary, project }: ProjectCasePageProps) {
  const Icon = iconMap[project.icon] ?? TicketIcon

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:px-10 lg:py-16">
      <div className="min-w-0">
        <section className="relative overflow-hidden border-2 border-foreground bg-card p-6 shadow-[8px_8px_0_var(--foreground)] sm:p-8">
          <div className="absolute -right-18 -top-18 size-72 rounded-full bg-sky-200/80 blur-3xl" />
          <div className="relative">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeftIcon className="size-4" />
              {dictionary.navigation.backToProjects}
            </Link>

            <div className="mt-10 flex flex-wrap gap-1.5">
              {project.status.map((status) => (
                <Badge
                  key={status}
                  variant="outline"
                  className={`rounded-none border px-2 py-1 text-[0.6rem] font-black tracking-[0.08em] uppercase ${getStatusVariant(status)}`}
                >
                  {dictionary.labels[status]}
                </Badge>
              ))}
            </div>

            <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1fr)_230px] xl:items-end">
              <div>
                <p className="text-xs font-black tracking-[0.14em] text-muted-foreground uppercase">
                  {project.type} · {project.year}
                </p>
                <h1 className="mt-4 font-heading text-[clamp(2.5rem,7vw,5.8rem)] leading-[0.88] font-semibold tracking-[-0.06em] break-words">
                  {project.title}
                </h1>
                <p className="mt-8 max-w-3xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                  {project.summary}
                </p>
              </div>
              <div className="grid aspect-square place-items-center border-2 border-foreground bg-primary shadow-[5px_5px_0_var(--foreground)]">
                <Icon className="size-14" strokeWidth={1.5} />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-none border-2 border-foreground bg-primary px-4 font-black text-primary-foreground shadow-[4px_4px_0_var(--foreground)] hover:bg-primary"
                >
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLinkIcon data-icon="inline-start" />
                    {dictionary.actions.visitLiveSite}
                  </a>
                </Button>
              ) : null}
              <Button
                asChild={Boolean(project.repositoryUrl)}
                size="lg"
                variant="outline"
                disabled={!project.repositoryUrl}
                className="h-11 rounded-none border-2 border-foreground bg-background px-4 font-bold shadow-[4px_4px_0_var(--foreground)] hover:bg-background"
              >
                {project.repositoryUrl ? (
                  <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                    <Link2Icon data-icon="inline-start" />
                    {dictionary.actions.viewRepo}
                  </a>
                ) : (
                  <span>
                    <LockIcon data-icon="inline-start" />
                    {dictionary.labels.repositoryPrivate}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-px border-2 border-foreground bg-foreground sm:grid-cols-2 xl:grid-cols-4">
          <FactBlock icon={BriefcaseBusinessIcon} label={dictionary.labels.role} value={project.role} />
          <FactBlock icon={CalendarRangeIcon} label={dictionary.labels.period} value={project.period} />
          <FactBlock icon={UsersRoundIcon} label={dictionary.labels.team} value={project.team} />
          <FactBlock
            icon={Layers3Icon}
            label={dictionary.labels.stack}
            value={project.stack.slice(0, 4).join(" · ")}
          />
        </div>

        <div className="mt-14 flex flex-col gap-12">
          <CaseSection id="challenge" index="01" title={dictionary.labels.challenge}>
            <p className="case-paragraph">{project.challenge}</p>
          </CaseSection>

          <CaseSection id="solution" index="02" title={dictionary.labels.solution}>
            <p className="case-paragraph">{project.solution}</p>
          </CaseSection>

          <CaseSection id="architecture" index="03" title={dictionary.labels.architecture}>
            <div className="grid gap-px border-2 border-foreground bg-foreground md:grid-cols-2">
              {project.architecture.map((node, index) => (
                <article
                  key={node.title}
                  className={cn(
                    "bg-card p-5",
                    project.architecture.length % 2 === 1 &&
                      index === project.architecture.length - 1 &&
                      "md:col-span-2",
                  )}
                >
                  <span className="text-xs font-black tracking-[0.12em] text-muted-foreground uppercase">
                    {node.subtitle}
                  </span>
                  <h3 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.04em]">
                    {node.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{node.detail}</p>
                </article>
              ))}
            </div>
          </CaseSection>

          <CaseSection id="impact" index="04" title={dictionary.labels.impact}>
            <p className="case-paragraph max-w-4xl">{project.impact}</p>
            <div className="mt-7 grid gap-px border-2 border-foreground bg-foreground md:grid-cols-3">
              {project.impactMetrics.map((metric) => (
                <article key={metric.label} className="bg-background p-5">
                  <span className="text-xs font-black tracking-[0.12em] text-muted-foreground uppercase">
                    {metric.label}
                  </span>
                  <h3 className="mt-5 font-heading text-5xl leading-none font-semibold tracking-[-0.06em]">
                    {metric.value}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{metric.detail}</p>
                </article>
              ))}
            </div>
          </CaseSection>

          <CaseSection id="gallery" index="05" title={dictionary.labels.gallery}>
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.82fr)]">
              <GalleryPanel
                description={project.gallery[0]?.description ?? project.summary}
                image={project.gallery[0]?.image}
                large
                project={project}
                title={project.gallery[0]?.title ?? project.title}
              />
              <div className="grid gap-5">
                {project.gallery.slice(1).map((item) => (
                  <GalleryPanel
                    key={item.title}
                    description={item.description}
                    image={item.image}
                    project={project}
                    title={item.title}
                  />
                ))}
              </div>
            </div>
          </CaseSection>
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-24 border-2 border-foreground bg-background p-5 shadow-[5px_5px_0_var(--foreground)]">
          <p className="text-xs font-black tracking-[0.13em] text-muted-foreground uppercase">
            {dictionary.navigation.onThisPage}
          </p>
          <nav className="mt-5 flex flex-col border-t border-foreground/25">
            {sectionKeys.map((sectionKey, index) => (
              <a
                key={sectionKey}
                href={`#${sectionKey}`}
                className="flex items-center justify-between border-b border-foreground/25 py-3 text-sm font-bold transition hover:pl-1"
              >
                <span>{dictionary.labels[sectionKey]}</span>
                <span className="text-xs text-muted-foreground">0{index + 1}</span>
              </a>
            ))}
          </nav>
          <div className="mt-6 border-t border-foreground/25 pt-5">
            <p className="text-xs font-black tracking-[0.13em] text-muted-foreground uppercase">
              {dictionary.labels.technologies}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border border-foreground/20 bg-card px-2 py-1 text-[0.62rem] font-bold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </main>
  )
}

interface FactBlockProps {
  icon: typeof BriefcaseBusinessIcon
  label: string
  value: string
}

function FactBlock({ icon: Icon, label, value }: FactBlockProps) {
  return (
    <article className="bg-background p-4">
      <Icon className="size-4.5" />
      <p className="mt-7 text-[0.62rem] font-black tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 font-bold">{value}</p>
    </article>
  )
}

interface CaseSectionProps {
  children: React.ReactNode
  id: string
  index: string
  title: string
}

function CaseSection({ children, id, index, title }: CaseSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-6 flex items-end justify-between gap-5 border-b-2 border-foreground pb-4">
        <h2 className="font-heading text-5xl leading-none font-semibold tracking-[-0.06em]">
          {title}
        </h2>
        <span className="text-xs font-black tracking-[0.12em] text-muted-foreground">{index}</span>
      </div>
      {children}
    </section>
  )
}

interface GalleryPanelProps {
  description: string
  image?: string
  large?: boolean
  project: ProjectEntry
  title: string
}

function GalleryPanel({ description, image, large = false, project, title }: GalleryPanelProps) {
  const resolvedImage = image ? getAssetPath(import.meta.env.BASE_URL, image) : undefined

  return (
    <article className="group overflow-hidden border-2 border-foreground bg-card shadow-[5px_5px_0_var(--foreground)]">
      <div
        className={cn(
          "relative flex items-end overflow-hidden border-b-2 border-foreground bg-[linear-gradient(135deg,rgba(223,255,61,0.78),rgba(201,236,255,0.88)_46%,rgba(247,247,241,0.9))] p-5",
          large ? "min-h-80" : "min-h-44",
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,15,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,15,0.14)_1px,transparent_1px)] bg-[size:28px_28px] opacity-55" />
        {resolvedImage ? (
          <>
            <img
              src={resolvedImage}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20 transition-opacity duration-300 group-hover:opacity-90" />
          </>
        ) : null}
        <div className={cn("relative max-w-md", resolvedImage ? "text-white" : "text-foreground")}>
          <span
            className={cn(
              "text-[0.62rem] font-black tracking-[0.12em] uppercase",
              resolvedImage ? "text-primary" : "text-foreground/80",
            )}
          >
            {project.title}
          </span>
          <h3 className="mt-3 font-heading text-4xl leading-[0.86] font-semibold tracking-[-0.055em]">
            {title}
          </h3>
        </div>
      </div>
      <p className="p-5 text-sm leading-7 text-muted-foreground">{description}</p>
    </article>
  )
}
