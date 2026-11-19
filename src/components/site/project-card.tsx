import { ArrowUpRightIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { CoverStack } from "@/components/site/project-media"
import { projectIconMap } from "@/components/site/project-icons"
import { getStatusVariant } from "@/lib/site"
import { cn } from "@/lib/utils"
import type { ProjectEntry, SiteDictionary } from "@/types/portfolio"

export type ProjectCardVariant = "flagship" | "feature" | "compact" | "wide"

interface ProjectCardProps {
  dictionary: SiteDictionary
  project: ProjectEntry
  index: number
  variant: ProjectCardVariant
  className?: string
}

export function ProjectCard({ dictionary, project, index, variant, className }: ProjectCardProps) {
  const Icon = projectIconMap[project.icon]
  const number = String(index + 1).padStart(2, "0")
  const isFlagship = variant === "flagship"
  const isWide = variant === "wide"
  const chipCount = isFlagship ? 7 : 4

  return (
    <article
      data-reveal
      className={cn(
        "group relative flex min-w-0 flex-col overflow-hidden border-2 border-foreground bg-card shadow-[7px_7px_0_var(--foreground)] transition-[translate,box-shadow] duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[11px_11px_0_var(--foreground)] focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-[11px_11px_0_var(--foreground)]",
        isWide && "md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:flex",
        isFlagship && "lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative border-b-2 border-foreground media-grid p-4 pb-7 sm:p-5 sm:pb-8",
          isFlagship && "lg:flex lg:flex-col lg:justify-center lg:border-r-2 lg:border-b-0 lg:p-8 lg:pb-12",
          isWide && "md:border-r-2 md:border-b-0 lg:border-r-0 lg:border-b-2",
        )}
      >
        <div
          aria-hidden="true"
          className="absolute -right-10 -top-10 size-36 rounded-full bg-primary/50 blur-2xl transition-colors duration-500 group-hover:bg-ice"
        />
        <CoverStack
          cover={project.cover}
          title={project.title}
          showPhone={variant !== "compact"}
          className="relative"
          frameClassName="aspect-[16/10] shadow-[4px_4px_0_var(--foreground)] transition-colors"
          imageClassName="transition-[object-position,scale] duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:object-[50%_28%] motion-reduce:transition-none"
          phoneClassName={isFlagship ? "w-[18%] max-w-40" : undefined}
        />
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className="outline-numeral font-sans text-5xl leading-none font-black tracking-[-0.04em]"
          >
            {number}
          </span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {isFlagship ? (
              <Badge
                variant="outline"
                className="rounded-none border border-foreground bg-primary px-2 py-1 text-[0.6rem] font-black tracking-[0.08em] text-foreground uppercase"
              >
                {dictionary.labels.flagship}
              </Badge>
            ) : null}
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

        <p className="mt-5 flex items-center gap-2 text-xs font-black tracking-[0.12em] text-muted-foreground uppercase">
          <Icon className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="min-w-0">
            {project.type} · {project.year}
          </span>
        </p>
        <h3
          className={cn(
            "mt-3 font-heading font-semibold tracking-[-0.05em] break-words hyphens-auto text-foreground",
            isFlagship
              ? "text-[clamp(2.75rem,8vw,4.5rem)] leading-[0.88]"
              : "text-[clamp(2.25rem,7vw,3rem)] leading-[0.92]",
          )}
        >
          <Link
            to={`/projects/${project.slug}`}
            aria-label={`${dictionary.actions.viewCase}: ${project.title}`}
            className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline focus-visible:decoration-primary focus-visible:decoration-4 focus-visible:underline-offset-4"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
          {project.featuredSummary}
        </p>

        {isFlagship ? (
          <ul className="mt-5 hidden flex-col gap-2 sm:flex" aria-label={dictionary.labels.highlights}>
            {project.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex gap-2.5 text-sm leading-6">
                <span aria-hidden="true" className="mt-2 size-2 shrink-0 rotate-45 bg-foreground" />
                <span className="min-w-0">{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {project.platforms ? (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={dictionary.labels.platforms}>
            {project.platforms.map((platform) => (
              <li
                key={platform}
                className="border border-foreground bg-ice px-2 py-1 text-[0.62rem] font-black tracking-[0.06em] uppercase"
              >
                {platform}
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={dictionary.labels.technologies}>
          {project.stack.slice(0, chipCount).map((item) => (
            <li
              key={item}
              className="border border-foreground/20 bg-background px-2.5 py-1 text-[0.66rem] font-bold text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-1 items-end">
          <div className="flex w-full items-center justify-between gap-4 border-t-2 border-foreground pt-4">
          <span className="min-w-0 text-xs font-bold text-muted-foreground">
            {project.role}
          </span>
          <span
            aria-hidden="true"
            className="inline-flex size-11 shrink-0 items-center justify-center border-2 border-foreground bg-primary shadow-[3px_3px_0_var(--foreground)] transition-transform duration-300 group-hover:rotate-45"
          >
            <ArrowUpRightIcon className="size-4" />
          </span>
          </div>
        </div>
      </div>
    </article>
  )
}
