import { useLayoutEffect, type DependencyList, type RefObject } from "react"

import { gsap, ScrollTrigger } from "@/lib/gsap"

export function prefersReducedMotion() {
  return (
    typeof window.matchMedia !== "function" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/**
 * Scroll-triggered entrance for every `[data-reveal]` inside `scope`.
 * - Skipped entirely under reduced motion (and in jsdom), so content is always visible.
 * - Animates opacity only (never visibility), so links and buttons stay in the Tab order;
 *   focusing a still-hidden element reveals it immediately.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: DependencyList) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) {
      return
    }

    const show = (targets: Element[] | Element) =>
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        overwrite: true,
        // Removes GSAP's inline transform/translate so Tailwind hover utilities work again.
        clearProps: "all",
      })

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root)
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 28 })
        ScrollTrigger.batch(items, {
          // clamp() keeps triggers near the page bottom reachable at max scroll.
          start: "clamp(top 92%)",
          once: true,
          onEnter: (batch) => show(batch),
        })
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal-line]", root).forEach((line) => {
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
    }, root)

    const onFocusIn = (event: FocusEvent) => {
      const target = (event.target as Element | null)?.closest("[data-reveal]")
      if (target && Number(getComputedStyle(target).opacity) < 1) {
        show(target)
      }
    }
    root.addEventListener("focusin", onFocusIn)

    // Web fonts change line heights after first paint; re-measure once they land.
    let cancelled = false
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh()
    }
    document.fonts?.ready.then(refresh)
    window.addEventListener("load", refresh)

    return () => {
      cancelled = true
      root.removeEventListener("focusin", onFocusIn)
      window.removeEventListener("load", refresh)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
