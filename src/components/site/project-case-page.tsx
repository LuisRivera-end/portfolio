import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BriefcaseBusinessIcon,
  CalendarRangeIcon,
  CarFrontIcon,
  DropletsIcon,
  ExternalLinkIcon,
  HeartPulseIcon,
  Layers3Icon,
  Link2Icon,
  LockIcon,
  UsersRoundIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getStatusVariant } from "@/lib/site"
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

export function ProjectCasePage({
  dictionary,
  project,
}: ProjectCasePageProps) {
  const Icon = iconMap[project.icon] ?? Layers3Icon

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-10">
      <div className="flex min-w-0 flex-col gap-7">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 shadow-[0_0_60px_rgba(38,113,255,0.14)] backdrop-blur-xl md:p-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
          >
            <ArrowLeftIcon className="size-4" />
            {dictionary.navigation.backToProjects}
          </Link>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-start">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                {project.status.map((status) => (
                  <Badge
                    key={`${project.slug}-status-${status}`}
                    variant="outline"
                    className={getStatusVariant(status)}
                  >
                    {dictionary.labels[status]}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-heading text-6xl leading-[0.88] font-semibold tracking-[-0.05em] text-foreground md:text-7xl">
                  {project.title}
                </h1>
                <p className="max-w-3xl text-pretty text-lg leading-8 text-muted-foreground">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.liveUrl ? (
                  <Button asChild size="lg" className="rounded-full px-6">
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
                  className="rounded-full px-6"
                  disabled={!project.repositoryUrl}
                >
                  {project.repositoryUrl ? (
                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                      <Link2Icon data-icon="inline-start" />
                      {dictionary.actions.viewRepo}
                    </a>
                  ) : (
                    <span>
                      <LockIcon data-icon="inline-start" />
                      {dictionary.actions.viewRepo}
                    </span>
                  )}
                </Button>
              </div>
              {!project.repositoryUrl ? (
                <p className="text-sm text-white/45">{dictionary.labels.repositoryPrivate}</p>
              ) : null}
            </div>

            <div className="glass-card flex aspect-[1.08] items-center justify-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(81,137,255,0.28),transparent_42%),linear-gradient(145deg,rgba(10,18,37,0.96),rgba(5,9,18,0.92))] p-6 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="glass-icon flex size-18 items-center justify-center rounded-[1.75rem] border border-white/12 bg-white/5 text-blue-100 shadow-[0_0_40px_rgba(38,113,255,0.22)]">
                  <Icon className="size-9" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-heading text-5xl font-semibold tracking-[-0.05em] text-foreground">
                    {project.title}
                  </span>
                  <span className="text-sm tracking-[0.22em] text-blue-100/65 uppercase">
                    {project.type}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <FactCard
              icon={BriefcaseBusinessIcon}
              label={dictionary.labels.role}
              value={project.role}
            />
            <FactCard
              icon={CalendarRangeIcon}
              label={dictionary.labels.period}
              value={project.period}
            />
            <FactCard
              icon={UsersRoundIcon}
              label={dictionary.labels.team}
              value={project.team}
            />
            <FactCard
              icon={Layers3Icon}
              label={dictionary.labels.stack}
              value={project.stack.slice(0, 4).join(", ")}
            />
          </div>
        </div>

        <CaseSection id="challenge" title={dictionary.labels.challenge}>
          <p className="case-paragraph">{project.challenge}</p>
        </CaseSection>

        <CaseSection id="solution" title={dictionary.labels.solution}>
          <p className="case-paragraph">{project.solution}</p>
        </CaseSection>

        <CaseSection id="architecture" title={dictionary.labels.architecture}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {project.architecture.map((node) => (
              <Card
                key={node.title}
                className="glass-card border-white/10 bg-slate-950/65"
              >
                <CardHeader className="gap-2">
                  <CardTitle className="text-2xl text-foreground">{node.title}</CardTitle>
                  <CardDescription className="text-base text-blue-100/75">
                    {node.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-white/68">{node.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CaseSection>

        <CaseSection id="impact" title={dictionary.labels.impact}>
          <p className="case-paragraph max-w-4xl">{project.impact}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {project.impactMetrics.map((metric) => (
              <Card
                key={metric.label}
                className="glass-card border-white/10 bg-slate-950/65"
              >
                <CardHeader className="gap-2">
                  <CardDescription className="text-sm tracking-[0.18em] text-blue-100/65 uppercase">
                    {metric.label}
                  </CardDescription>
                  <CardTitle className="text-3xl text-foreground">{metric.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-white/65">{metric.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CaseSection>

        <CaseSection id="gallery" title={dictionary.labels.gallery}>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
            <GalleryPanel
              title={project.gallery[0]?.title ?? project.title}
              description={project.gallery[0]?.description ?? project.summary}
              large
              image={project.gallery[0]?.image}
              project={project}
            />
            <div className="grid gap-4">
              {project.gallery.slice(1).map((item) => (
                <GalleryPanel
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  project={project}
                />
              ))}
            </div>
          </div>
        </CaseSection>
      </div>

      <aside className="hidden lg:block">
        <div className="glass-card sticky top-28 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/72 p-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              {dictionary.navigation.onThisPage}
            </h2>
            <nav className="flex flex-col gap-2">
              {sectionKeys.map((sectionKey) => (
                <a
                  key={sectionKey}
                  href={`#${sectionKey}`}
                  className="rounded-full px-3 py-2 text-sm text-white/62 transition hover:bg-white/[0.04] hover:text-white"
                >
                  {dictionary.labels[sectionKey]}
                </a>
              ))}
            </nav>
          </div>

          <Separator className="bg-white/10" />

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              {dictionary.labels.technologies}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium tracking-wide text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              {dictionary.labels.projectLinks}
            </h2>
            {project.liveUrl ? (
              <Button variant="ghost" asChild className="justify-between rounded-full">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  {dictionary.actions.visitLiveSite}
                  <ArrowUpRightIcon />
                </a>
              </Button>
            ) : null}
            <Button
              variant="ghost"
              asChild={Boolean(project.repositoryUrl)}
              disabled={!project.repositoryUrl}
              className={cn(
                "justify-between rounded-full",
                !project.repositoryUrl && "opacity-60",
              )}
            >
              {project.repositoryUrl ? (
                <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                  {dictionary.actions.viewRepo}
                  <ArrowUpRightIcon />
                </a>
              ) : (
                <span>
                  {dictionary.actions.viewRepo}
                  <LockIcon />
                </span>
              )}
            </Button>
          </div>

          <Separator className="bg-white/10" />

          <div className="flex flex-col gap-2">
            <span className="text-sm text-white/45">{dictionary.labels.projectType}</span>
            <span className="text-base text-foreground">{project.type}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-white/45">{dictionary.labels.year}</span>
            <span className="text-base text-foreground">{project.year}</span>
          </div>
        </div>
      </aside>
    </main>
  )
}

interface FactCardProps {
  icon: typeof BriefcaseBusinessIcon
  label: string
  value: string
}

function FactCard({ icon: Icon, label, value }: FactCardProps) {
  return (
    <div className="glass-card rounded-[1.55rem] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-3">
        <div className="glass-icon flex size-10 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-blue-100">
          <Icon className="size-4.5" />
        </div>
        <span className="text-sm text-white/55">{label}</span>
      </div>
      <p className="mt-4 text-base leading-7 text-foreground">{value}</p>
    </div>
  )
}

interface CaseSectionProps {
  children: React.ReactNode
  id: string
  title: string
}

function CaseSection({ children, id, title }: CaseSectionProps) {
  return (
    <section
      id={id}
      className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 md:p-8"
    >
      <div className="flex flex-col gap-6">
        <h2 className="font-heading text-4xl font-semibold tracking-[-0.04em] text-foreground">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

interface GalleryPanelProps {
  title: string
  description: string
  large?: boolean
  image?: string
  project: ProjectEntry
}

function GalleryPanel({
  title,
  description,
  large = false,
  image,
  project,
}: GalleryPanelProps) {
  return (
    <div className="glass-card overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950/65">
      <div
        className={cn(
          "relative flex items-end overflow-hidden bg-[radial-gradient(circle_at_top,rgba(83,139,255,0.26),transparent_36%),linear-gradient(155deg,rgba(10,18,37,0.96),rgba(5,9,18,0.92))] p-5",
          large ? "min-h-[24rem]" : "min-h-[11.75rem]",
        )}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
        ) : null}
        <div className="relative z-10 flex max-w-sm flex-col gap-2">
          <span className="text-xs font-semibold tracking-[0.22em] text-blue-100/70 uppercase">
            {project.title}
          </span>
          <span className="font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground">
            {title}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-7 text-white/65">{description}</p>
      </div>
    </div>
  )
}
