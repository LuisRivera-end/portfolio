import { useRef, useState } from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  CalendarRangeIcon,
  ExternalLinkIcon,
  Layers3Icon,
  Link2Icon,
  LockIcon,
  PackageIcon,
  UsersRoundIcon,
  ZoomInIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GalleryLightbox } from "@/components/site/gallery-lightbox"
import { CoverStack } from "@/components/site/project-media"
import { projectIconMap } from "@/components/site/project-icons"
import { assetUrl, getStatusVariant } from "@/lib/site"
import { useActiveSection } from "@/lib/use-active-section"
import { useReveal } from "@/lib/use-reveal"
import { cn } from "@/lib/utils"
import type { GalleryItem, ProjectEntry, SiteDictionary } from "@/types/portfolio"

interface ProjectCasePageProps {
  dictionary: SiteDictionary
  project: ProjectEntry
}

const sectionKeys = [
  "challenge",
  "solution",
  "highlights",
  "architecture",
  "impact",
  "gallery",
] as const

export function ProjectCasePage({ dictionary, project }: ProjectCasePageProps) {
  const mainRef = useRef<HTMLElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const activeSection = useActiveSection(sectionKeys)
  const Icon = projectIconMap[project.icon]

  useReveal(mainRef, [project.slug, dictionary.localeName])

  const projects = dictionary.projects
  const position = projects.findIndex((entry) => entry.slug === project.slug)
  const previous = projects[(position - 1 + projects.length) % projects.length]
  const next = projects[(position + 1) % projects.length]

  const indexed = project.gallery.map((item, index) => ({ item, index }))
  const [lead, ...rest] = indexed
  const landscape = rest.filter(({ item }) => item.width >= item.height)
  const portrait = rest.filter(({ item }) => item.height > item.width)

  return (
    <main
      ref={mainRef}
      className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_250px] lg:px-10 lg:py-14"
    >
      <div className="min-w-0">
        <section className="relative overflow-hidden border-2 border-foreground bg-card p-5 shadow-[8px_8px_0_var(--foreground)] sm:p-8">
          <div aria-hidden="true" className="absolute -right-18 -top-18 size-72 rounded-full bg-ice/80 blur-3xl" />
          <div className="relative">
            <Link
              to={{ pathname: "/", hash: "#projects" }}
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeftIcon className="size-4" />
              {dictionary.navigation.backToProjects}
            </Link>

            <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] xl:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="grid size-12 shrink-0 place-items-center border-2 border-foreground bg-primary shadow-[3px_3px_0_var(--foreground)]">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <p className="min-w-0 text-xs font-black tracking-[0.14em] text-muted-foreground uppercase">
                    {project.type} · {project.year}
                  </p>
                </div>
                <h1 className="mt-5 font-heading text-[clamp(2.75rem,8vw,5.6rem)] leading-[0.88] font-semibold tracking-[-0.06em] break-words hyphens-auto">
                  {project.title}
                </h1>
                <div className="mt-5 flex flex-wrap gap-1.5">
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
                <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                  {project.summary}
                </p>
                {project.platforms ? (
                  <div className="mt-5">
                    <p className="text-[0.62rem] font-black tracking-[0.12em] text-muted-foreground uppercase">
                      {dictionary.labels.platforms}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {project.platforms.map((platform) => (
                        <li
                          key={platform}
                          className="border border-foreground bg-ice px-2 py-1 text-[0.62rem] font-black tracking-[0.06em] uppercase"
                        >
                          {platform}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
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
                  {project.repositoryUrl ? (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-11 rounded-none border-2 border-foreground bg-background px-4 font-bold shadow-[4px_4px_0_var(--foreground)] hover:bg-background"
                    >
                      <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                        <Link2Icon data-icon="inline-start" />
                        {dictionary.actions.viewRepo}
                      </a>
                    </Button>
                  ) : (
                    <span className="inline-flex h-11 items-center gap-2 border-2 border-dashed border-foreground/50 px-4 text-sm font-bold text-muted-foreground">
                      <LockIcon className="size-4" />
                      {dictionary.labels.repositoryPrivate}
                    </span>
                  )}
                  {project.releaseUrl ? (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-11 rounded-none border-2 border-foreground bg-ice px-4 font-bold shadow-[4px_4px_0_var(--foreground)] hover:bg-ice"
                    >
                      <a href={project.releaseUrl} target="_blank" rel="noreferrer">
                        <PackageIcon data-icon="inline-start" />
                        {dictionary.actions.viewReleases}
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="media-grid -mx-1 border-2 border-foreground p-4 pb-8 sm:mx-0 sm:p-6 sm:pb-10">
                <CoverStack
                  cover={project.cover}
                  title={project.title}
                  eager
                  frameClassName="aspect-[16/10] shadow-[4px_4px_0_var(--foreground)]"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-px border-2 border-foreground bg-foreground sm:grid-cols-2 xl:grid-cols-4">
          <FactBlock icon={BriefcaseBusinessIcon} label={dictionary.labels.role}>
            {project.role}
          </FactBlock>
          <FactBlock icon={CalendarRangeIcon} label={dictionary.labels.period}>
            {project.period}
          </FactBlock>
          <FactBlock icon={UsersRoundIcon} label={dictionary.labels.team}>
            {project.team}
          </FactBlock>
          <FactBlock icon={Layers3Icon} label={dictionary.labels.stack}>
            <span className="mt-1 flex flex-wrap gap-1">
              {project.stack.slice(0, 4).map((item) => (
                <span key={item} className="border border-foreground/20 bg-card px-1.5 py-0.5 text-xs">
                  {item}
                </span>
              ))}
            </span>
          </FactBlock>
        </div>

        <nav
          aria-label={dictionary.a11y.sectionNav}
          className="sticky top-[var(--header-h)] z-40 -mx-5 mt-8 border-y-2 border-foreground bg-background/92 backdrop-blur-xl sm:-mx-6 lg:hidden"
        >
          <ul data-scroll-x className="flex snap-x gap-2 overflow-x-auto px-5 py-2.5 [scrollbar-width:none] sm:px-6">
            {sectionKeys.map((key, index) => (
              <li key={key} className="snap-start">
                <a
                  href={`#${key}`}
                  aria-current={activeSection === key ? "location" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 border-2 border-foreground px-3 py-1.5 text-xs font-black whitespace-nowrap transition-colors",
                    activeSection === key ? "bg-primary" : "bg-card",
                  )}
                >
                  <span className="text-[0.6rem] text-muted-foreground">0{index + 1}</span>
                  {dictionary.labels[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-14 lg:mt-14">
          <CaseSection id="challenge" index="01" title={dictionary.labels.challenge}>
            <p className="case-paragraph">{project.challenge}</p>
          </CaseSection>

          <CaseSection id="solution" index="02" title={dictionary.labels.solution}>
            <p className="case-paragraph">{project.solution}</p>
          </CaseSection>

          <CaseSection id="highlights" index="03" title={dictionary.labels.highlights}>
            <ol className="grid gap-px border-2 border-foreground bg-foreground md:grid-cols-2">
              {project.highlights.map((highlight, index) => (
                <li key={highlight} data-reveal className="flex gap-4 bg-background p-5">
                  <span className="grid size-8 shrink-0 place-items-center border-2 border-foreground bg-primary text-xs font-black shadow-[2px_2px_0_var(--foreground)]">
                    {index + 1}
                  </span>
                  <p className="min-w-0 text-sm leading-7">{highlight}</p>
                </li>
              ))}
            </ol>
          </CaseSection>

          <CaseSection id="architecture" index="04" title={dictionary.labels.architecture}>
            <ol className="grid gap-px border-2 border-foreground bg-foreground md:grid-cols-2">
              {project.architecture.map((node, index) => (
                <li
                  key={node.title}
                  data-reveal
                  className={cn(
                    "bg-background p-5",
                    project.architecture.length % 2 === 1 &&
                      index === project.architecture.length - 1 &&
                      "md:col-span-2",
                  )}
                >
                  <span className="text-xs font-black tracking-[0.12em] text-muted-foreground uppercase">
                    {String(index + 1).padStart(2, "0")} · {node.subtitle}
                  </span>
                  <h3 className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-[-0.04em] break-words">
                    {node.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{node.detail}</p>
                </li>
              ))}
            </ol>
          </CaseSection>

          <CaseSection id="impact" index="05" title={dictionary.labels.impact}>
            <p className="case-paragraph max-w-4xl">{project.impact}</p>
            <div className="mt-7 grid gap-px border-2 border-foreground bg-foreground md:grid-cols-3">
              {project.impactMetrics.map((metric) => (
                <article key={metric.label} data-reveal className="min-w-0 bg-background p-5">
                  <span className="text-xs font-black tracking-[0.12em] text-muted-foreground uppercase">
                    {metric.label}
                  </span>
                  <p className="mt-4 font-heading text-[clamp(2.5rem,5vw,3.25rem)] leading-none font-semibold tracking-[-0.05em] break-words">
                    {metric.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{metric.detail}</p>
                </article>
              ))}
            </div>
          </CaseSection>

          <CaseSection id="gallery" index="06" title={dictionary.labels.gallery}>
            <div className="flex flex-col gap-6">
              {lead ? (
                <GalleryTile
                  item={lead.item}
                  openLabel={dictionary.a11y.openImage}
                  onOpen={() => setLightboxIndex(lead.index)}
                  large
                />
              ) : null}
              {landscape.length ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {landscape.map(({ item, index }) => (
                    <GalleryTile
                      key={item.image}
                      item={item}
                      openLabel={dictionary.a11y.openImage}
                      onOpen={() => setLightboxIndex(index)}
                    />
                  ))}
                </div>
              ) : null}
              {portrait.length ? (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                  {portrait.map(({ item, index }) => (
                    <GalleryTile
                      key={item.image}
                      item={item}
                      openLabel={dictionary.a11y.openImage}
                      onOpen={() => setLightboxIndex(index)}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </CaseSection>
        </div>

        <nav
          aria-label={`${dictionary.labels.previousProject} / ${dictionary.labels.nextProject}`}
          className="mt-16 grid gap-5 sm:grid-cols-2"
        >
          <AdjacentProject direction="previous" label={dictionary.labels.previousProject} project={previous} />
          <AdjacentProject direction="next" label={dictionary.labels.nextProject} project={next} />
        </nav>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-h)+1.5rem)] border-2 border-foreground bg-background p-5 shadow-[5px_5px_0_var(--foreground)]">
          <p className="text-xs font-black tracking-[0.13em] text-muted-foreground uppercase">
            {dictionary.navigation.onThisPage}
          </p>
          <nav aria-label={dictionary.navigation.onThisPage} className="mt-4 flex flex-col border-t border-foreground/25">
            {sectionKeys.map((sectionKey, index) => (
              <a
                key={sectionKey}
                href={`#${sectionKey}`}
                aria-current={activeSection === sectionKey ? "location" : undefined}
                className={cn(
                  "flex items-center justify-between border-b border-foreground/25 px-1 py-2.5 text-sm font-bold transition-[padding,background-color] hover:pl-2",
                  activeSection === sectionKey && "bg-primary pl-2",
                )}
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
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="border border-foreground/20 bg-card px-2 py-1 text-[0.62rem] font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <GalleryLightbox
        items={project.gallery}
        index={lightboxIndex}
        projectTitle={project.title}
        labels={dictionary.a11y}
        onIndexChange={setLightboxIndex}
      />
    </main>
  )
}

interface FactBlockProps {
  icon: typeof BriefcaseBusinessIcon
  label: string
  children: React.ReactNode
}

function FactBlock({ icon: Icon, label, children }: FactBlockProps) {
  return (
    <article className="min-w-0 bg-background p-4">
      <Icon className="size-4.5" aria-hidden="true" />
      <p className="mt-6 text-[0.62rem] font-black tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </p>
      <div className="mt-2 text-sm leading-6 font-bold break-words">{children}</div>
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
    // <html> already pads by the header height; only the mobile chip bar needs extra room.
    <section id={id} className="scroll-mt-16 lg:scroll-mt-0">
      <div data-reveal className="mb-6 flex items-end justify-between gap-5 border-b-2 border-foreground pb-4">
        <h2 className="min-w-0 font-heading text-[clamp(2.4rem,6vw,3.25rem)] leading-none font-semibold tracking-[-0.055em] break-words">
          {title}
        </h2>
        <span className="shrink-0 text-xs font-black tracking-[0.12em] text-muted-foreground">{index}</span>
      </div>
      {children}
    </section>
  )
}

interface GalleryTileProps {
  item: GalleryItem
  openLabel: string
  onOpen: () => void
  large?: boolean
}

function GalleryTile({ item, openLabel, onOpen, large = false }: GalleryTileProps) {
  const isPortrait = item.height > item.width

  return (
    <figure data-reveal className="group flex min-w-0 flex-col">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${openLabel}: ${item.title}`}
        className={cn(
          "media-grid relative block w-full overflow-hidden border-2 border-foreground text-left shadow-[5px_5px_0_var(--foreground)] transition-[translate,box-shadow] duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--foreground)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-primary",
          isPortrait ? "p-3" : large ? "p-3 sm:p-5" : "p-3",
        )}
      >
        {isPortrait ? (
          <span className="frame-phone mx-auto block max-w-52">
            <img
              src={assetUrl(item.image)}
              alt={item.title}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              className="block aspect-[390/844] w-full object-cover object-top"
            />
          </span>
        ) : (
          <img
            src={assetUrl(item.image)}
            alt={item.title}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full border-2 border-foreground bg-card object-contain"
          />
        )}
        <span
          aria-hidden="true"
          className="absolute top-5 right-5 grid size-9 place-items-center border-2 border-foreground bg-primary opacity-0 shadow-[2px_2px_0_var(--foreground)] transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <ZoomInIcon className="size-4" />
        </span>
      </button>
      <figcaption className="mt-4">
        <p className={cn("font-heading font-semibold tracking-[-0.03em]", large ? "text-3xl" : "text-2xl")}>
          {item.title}
        </p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
      </figcaption>
    </figure>
  )
}

interface AdjacentProjectProps {
  direction: "previous" | "next"
  label: string
  project: ProjectEntry
}

function AdjacentProject({ direction, label, project }: AdjacentProjectProps) {
  const isNext = direction === "next"

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        "group flex min-w-0 items-center gap-4 border-2 border-foreground bg-card p-4 shadow-[5px_5px_0_var(--foreground)] transition-[translate,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--foreground)]",
        isNext && "sm:flex-row-reverse sm:text-right",
      )}
    >
      <img
        src={assetUrl(project.cover.image)}
        alt=""
        width={project.cover.width}
        height={project.cover.height}
        loading="lazy"
        className="hidden aspect-[16/10] w-24 shrink-0 border-2 border-foreground object-cover object-top min-[400px]:block sm:w-28"
      />
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "flex items-center gap-1.5 text-[0.62rem] font-black tracking-[0.12em] text-muted-foreground uppercase",
            isNext && "sm:justify-end",
          )}
        >
          {!isNext ? <ArrowLeftIcon className="size-3.5" /> : null}
          {label}
          {isNext ? <ArrowRightIcon className="size-3.5" /> : null}
        </span>
        <span className="mt-1 block font-heading text-[1.75rem] leading-tight font-semibold tracking-[-0.04em] hyphens-auto [overflow-wrap:anywhere] sm:text-3xl">
          {project.title}
        </span>
      </span>
    </Link>
  )
}
