import {
  ArrowUpRightIcon,
  CalendarRangeIcon,
  CarFrontIcon,
  DropletsIcon,
  HeartPulseIcon,
  TicketIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
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
    <article className="group relative flex min-h-full flex-col overflow-hidden border-2 border-foreground bg-card p-5 shadow-[7px_7px_0_var(--foreground)] transition duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[11px_11px_0_var(--foreground)] sm:p-6">
      <div className="absolute right-0 top-0 size-22 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/60 blur-2xl transition group-hover:bg-sky-200/75" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="grid size-12 place-items-center border-2 border-foreground bg-background shadow-[3px_3px_0_var(--foreground)]">
          <Icon className="size-5" />
        </div>
        <div className="flex max-w-[65%] flex-wrap justify-end gap-1.5">
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
      </div>

      <div className="relative mt-12">
        <p className="text-xs font-black tracking-[0.12em] text-muted-foreground uppercase">
          {project.type} · {project.year}
        </p>
        <h3 className="mt-3 font-heading text-5xl leading-[0.82] font-semibold tracking-[-0.065em] text-foreground">
          {project.title}
        </h3>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
          {project.featuredSummary}
        </p>
      </div>

      <div className="relative mt-8 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((item) => (
          <span
            key={item}
            className="border border-foreground/20 bg-background px-2.5 py-1 text-[0.66rem] font-bold text-foreground"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="relative mt-auto flex items-center justify-between border-t-2 border-foreground pt-5">
        <span className="text-xs font-bold text-muted-foreground">{project.role}</span>
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex size-10 items-center justify-center border-2 border-foreground bg-primary shadow-[3px_3px_0_var(--foreground)] transition group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0_var(--foreground)]"
          aria-label={`${dictionary.actions.viewCase}: ${project.title}`}
        >
          <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>
    </article>
  )
}
