import { ArrowLeftIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import type { SiteDictionary } from "@/types/portfolio"

interface NotFoundPageProps {
  dictionary: SiteDictionary
}

export function NotFoundPage({ dictionary }: NotFoundPageProps) {
  const copy = dictionary.notFound

  return (
    <main className="mx-auto flex min-h-[70svh] w-full max-w-7xl items-center px-5 py-16 sm:px-6 lg:px-10">
      <section className="relative w-full overflow-hidden border-2 border-foreground bg-card p-7 shadow-[8px_8px_0_var(--foreground)] sm:p-12">
        <span
          aria-hidden="true"
          className="outline-numeral pointer-events-none absolute -right-4 -bottom-10 font-heading text-[clamp(8rem,28vw,18rem)] leading-none font-semibold opacity-30"
        >
          404
        </span>
        <div className="relative">
          <p className="editorial-kicker">{copy.eyebrow}</p>
          <h1 className="mt-6 max-w-3xl font-heading text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.06em] break-words">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">{copy.body}</p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 rounded-none border-2 border-foreground bg-primary px-5 font-black text-primary-foreground shadow-[4px_4px_0_var(--foreground)] hover:bg-primary"
          >
            <Link to="/">
              <ArrowLeftIcon data-icon="inline-start" />
              {copy.cta}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
