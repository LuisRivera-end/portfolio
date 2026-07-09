import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description: string
  align?: "left" | "center"
  actions?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  actions,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
      )}
    >
      <div className="flex max-w-2xl flex-col gap-3">
        <p className="section-kicker">{eyebrow}</p>
        <h2 className="font-heading text-balance text-4xl leading-[0.92] font-semibold tracking-[-0.04em] text-foreground md:text-6xl">
          {title}
        </h2>
        <p className="max-w-xl text-pretty text-base leading-8 text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  )
}
