import { useEffect, useState } from "react"

/**
 * Tracks which of the given element ids is in the upper part of the viewport.
 * Returns `null` until the observer first reports (so callers can fall back to
 * the URL hash), then the visible id or `undefined` when none is in the band.
 */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState<string | undefined | null>(null)
  const key = ids.join("|")

  useEffect(() => {
    setActive(null)
    if (!enabled || typeof window.IntersectionObserver !== "function") {
      return
    }

    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting))
        setActive(ids.find((id) => visible.get(id)))
      },
      { rootMargin: "-30% 0px -60% 0px" },
    )

    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled])

  return active
}
