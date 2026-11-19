import { assetUrl } from "@/lib/site"
import { cn } from "@/lib/utils"
import type { ProjectCover, ProjectImage } from "@/types/portfolio"

interface BrowserFrameProps {
  image: ProjectImage
  label: string
  alt: string
  className?: string
  imageClassName?: string
  eager?: boolean
}

export function BrowserFrame({
  image,
  label,
  alt,
  className,
  imageClassName,
  eager = false,
}: BrowserFrameProps) {
  return (
    <figure
      className={cn(
        "flex min-w-0 flex-col overflow-hidden border-2 border-foreground bg-card",
        className,
      )}
    >
      <div className="frame-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{label}</span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <img
          src={assetUrl(image.image)}
          alt={alt}
          width={image.width}
          height={image.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={cn("block size-full object-cover object-top", imageClassName)}
        />
      </div>
    </figure>
  )
}

interface PhoneFrameProps {
  image: ProjectImage
  alt: string
  className?: string
  eager?: boolean
}

export function PhoneFrame({ image, alt, className, eager = false }: PhoneFrameProps) {
  return (
    <figure className={cn("frame-phone", className)}>
      <img
        src={assetUrl(image.image)}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block aspect-[390/844] w-full object-cover object-top"
      />
    </figure>
  )
}

interface CoverStackProps {
  cover: ProjectCover
  title: string
  className?: string
  frameClassName?: string
  imageClassName?: string
  phoneClassName?: string
  showPhone?: boolean
  eager?: boolean
}

/** Desktop screenshot in a browser frame, with an optional phone layered on top. */
export function CoverStack({
  cover,
  title,
  className,
  frameClassName,
  imageClassName,
  phoneClassName,
  showPhone = true,
  eager = false,
}: CoverStackProps) {
  return (
    <div className={cn("relative", className)}>
      <BrowserFrame
        image={cover}
        label={cover.label}
        alt={title}
        eager={eager}
        className={frameClassName}
        imageClassName={imageClassName}
      />
      {showPhone && cover.phone ? (
        <PhoneFrame
          image={cover.phone}
          alt=""
          eager={eager}
          className={cn(
            "pointer-events-none absolute -bottom-4 right-3 w-[22%] min-w-16 max-w-36",
            phoneClassName,
          )}
        />
      ) : null}
    </div>
  )
}
