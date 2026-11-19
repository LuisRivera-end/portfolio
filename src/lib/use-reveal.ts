import { useLayoutEffect, type DependencyList, type RefObject } from "react"

import { gsap, ScrollTrigger } from "@/lib/gsap"

/**
 * Scroll-triggered entrance for every `[data-reveal]` inside `scope`.
 * Initial hidden state is only applied inside the matchMedia callback, so
 * reduced-motion users (and jsdom) always see the content.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: DependencyList) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root || typeof window.matchMedia !== "function") {
      return
    }

    const mm = gsap.matchMedia(root)

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root)
      if (items.length) {
        gsap.set(items, { autoAlpha: 0, y: 28 })
        ScrollTrigger.batch(items, {
          // clamp() keeps triggers near the page bottom reachable at max scroll.
          start: "clamp(top 92%)",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            }),
        })
      }

      const lines = gsap.utils.toArray<HTMLElement>("[data-reveal-line]", root)
      lines.forEach((line) => {
        const vertical = line.dataset.revealLine === "y"
        gsap.fromTo(
          line,
          vertical ? { scaleY: 0 } : { scaleX: 0 },
          {
            ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: vertical ? "bottom 60%" : "top 55%",
              scrub: true,
            },
          },
        )
      })

      ScrollTrigger.refresh()
    })

    // Web fonts change line heights after first paint; re-measure once they land.
    let cancelled = false
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh()
    }
    document.fonts?.ready.then(refresh)
    window.addEventListener("load", refresh)

    return () => {
      cancelled = true
      window.removeEventListener("load", refresh)
      mm.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
