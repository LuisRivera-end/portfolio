import { useEffect, useState } from "react"

/**
 * Tracks which of the given element ids is currently in the upper part of
 * the viewport. Returns `undefined` until one is visible.
 */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState<string | undefined>(undefined)
  const key = ids.join("|")

  useEffect(() => {
    if (!enabled || typeof window.IntersectionObserver !== "function") {
      setActive(undefined)
      return
    }

    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting))
        // Clear when nothing is in the band (e.g. back at the hero).
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
