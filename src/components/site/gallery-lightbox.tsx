import { useEffect, useRef } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { assetUrl } from "@/lib/site"
import type { GalleryItem, SiteDictionary } from "@/types/portfolio"

interface GalleryLightboxProps {
  items: GalleryItem[]
  index: number | null
  projectTitle: string
  labels: SiteDictionary["a11y"]
  onIndexChange: (index: number | null) => void
}

export function GalleryLightbox({
  items,
  index,
  projectTitle,
  labels,
  onIndexChange,
}: GalleryLightboxProps) {
  const pointerStart = useRef<number | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const open = index !== null

  // Remember what opened the dialog (it is opened programmatically, not via a Trigger).
  if (open && opener.current === null && typeof document !== "undefined") {
    opener.current = document.activeElement as HTMLElement | null
  }
  const total = items.length
  const item = index !== null ? items[index] : undefined

  const go = (delta: number) => {
    if (index === null) return
    onIndexChange((index + delta + total) % total)
  }

  useEffect(() => {
    if (index === null || typeof Image === "undefined") return
    ;[index - 1, index + 1].forEach((neighbour) => {
      const next = items[(neighbour + total) % total]
      if (next) {
        const preload = new Image()
        preload.src = assetUrl(next.image)
      }
    })
  }, [index, items, total])

  const counter = labels.imageCounter
    .replace("{current}", String((index ?? 0) + 1))
    .replace("{total}", String(total))
  const isPortrait = item ? item.height > item.width : false

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? undefined : onIndexChange(null))}>
      <DialogContent
        closeLabel={labels.closeDialog}
        className="inset-2 grid grid-rows-[minmax(11rem,1fr)_auto] overflow-y-auto border-2 border-foreground bg-background shadow-[8px_8px_0_var(--primary)] sm:inset-6 lg:inset-10"
        onCloseAutoFocus={(event) => {
          const target = opener.current
          opener.current = null
          if (target && document.contains(target)) {
            event.preventDefault()
            target.focus()
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault()
            go(1)
          } else if (event.key === "ArrowLeft") {
            event.preventDefault()
            go(-1)
          }
        }}
      >
        {item ? (
          <>
            <div
              className="media-grid relative flex min-h-0 touch-pan-y items-center justify-center overflow-hidden p-3 pt-14 sm:p-6 sm:pt-16"
              onPointerDown={(event) => {
                pointerStart.current = event.clientX
              }}
              onPointerUp={(event) => {
                if (pointerStart.current === null) return
                const delta = event.clientX - pointerStart.current
                pointerStart.current = null
                if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1)
              }}
            >
              <img
                key={item.image}
                src={assetUrl(item.image)}
                alt={item.title}
                width={item.width}
                height={item.height}
                className={
                  isPortrait
                    ? "frame-phone h-full max-h-full w-auto max-w-full object-contain p-1"
                    : "h-auto max-h-full w-auto max-w-full border-2 border-foreground object-contain shadow-[5px_5px_0_var(--foreground)]"
                }
              />
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {item.title} · {counter}
            </p>
            <div className="flex flex-col gap-4 border-t-2 border-foreground bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="min-w-0">
                <p className="text-[0.62rem] font-black tracking-[0.12em] text-muted-foreground uppercase">
                  {projectTitle} · <span className="tabular-nums">{counter}</span>
                </p>
                <DialogTitle className="mt-1 font-heading text-2xl leading-tight font-semibold tracking-[-0.03em] break-words sm:text-3xl">
                  {item.title}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </DialogDescription>
              </div>
              {total > 1 ? (
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="grid size-11 place-items-center border-2 border-foreground bg-background shadow-[3px_3px_0_var(--foreground)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary"
                  >
                    <ChevronLeftIcon className="size-5" />
                    <span className="sr-only">{labels.previousImage}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="grid size-11 place-items-center border-2 border-foreground bg-primary shadow-[3px_3px_0_var(--foreground)] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
                  >
                    <ChevronRightIcon className="size-5" />
                    <span className="sr-only">{labels.nextImage}</span>
                  </button>
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
