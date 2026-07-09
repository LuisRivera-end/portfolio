import {
  ArrowRightIcon,
  CalendarRangeIcon,
  CarFrontIcon,
  DropletsIcon,
  ExternalLinkIcon,
  HeartPulseIcon,
  TicketIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getStatusVariant } from "@/lib/site"
import type { ProjectEntry, SiteDictionary } from "@/types/portfolio"

interface ProjectCardProps {
  dictionary: SiteDictionary
  project: ProjectEntry
}

const iconMap = {
  facsa: DropletsIcon,
  presion: HeartPulseIcon,
  estacionamiento: CarFrontIcon,
  turnos: CalendarRangeIcon,
}

export function ProjectCard({ dictionary, project }: ProjectCardProps) {
  const Icon = iconMap[project.icon] ?? TicketIcon

  return (
    <Card className="glass-card group/card min-h-full border-white/10 bg-slate-950/65">
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="glass-icon flex size-14 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-blue-200 shadow-[0_0_30px_rgba(38,113,255,0.2)]">
            <Icon className="size-6" />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {project.status.map((status) => (
              <Badge
                key={status}
                variant="outline"
                className={getStatusVariant(status)}
              >
                {dictionary.labels[status]}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <CardTitle className="text-2xl text-foreground">{project.title}</CardTitle>
          <CardDescription className="text-base leading-7 text-muted-foreground">
            {project.featuredSummary}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="project-preview flex min-h-52 items-end rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(70,115,255,0.26),transparent_45%),linear-gradient(160deg,rgba(8,17,38,0.98),rgba(6,10,20,0.9))] p-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold tracking-[0.22em] text-blue-200/85 uppercase">
              {project.type}
            </p>
            <p className="max-w-sm text-sm leading-6 text-white/70">
              {project.summary}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/70"
            >
              {item}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3 bg-white/[0.02]">
        <Button asChild size="lg" className="rounded-full">
          <Link to={`/projects/${project.slug}`}>
            <ArrowRightIcon data-icon="inline-end" />
            {dictionary.actions.viewCase}
          </Link>
        </Button>
        {project.liveUrl ? (
          <Button variant="ghost" asChild className="rounded-full">
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLinkIcon data-icon="inline-end" />
              {dictionary.actions.visitLiveSite}
            </a>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}
